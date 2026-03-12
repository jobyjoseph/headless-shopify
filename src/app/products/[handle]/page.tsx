import { getProduct } from "@/integrations/shopify/product";
import { getProductsByTag } from "@/integrations/shopify/products-by-tag";
import { ImageGrid } from "./_components/ImageGrid";
import { ProductBadge } from "./_components/ProductBadge";
import { ProductDescription } from "./_components/ProductDescription";
import { ProductPrice } from "./_components/ProductPrice";
import { ProductTitle } from "./_components/ProductTitle";
import { ProductActions } from "./_components/ProductActions";
import { getProductDisplayData } from "./_functions/getProductDisplayData";
import { DemoStoreNotice } from "./_components/DemoStoreNotice";
import { draftMode } from "next/headers";
import { getAdminProductByHandle } from "@/integrations/shopify-admin/get-product-by-handle";
import { getAdminProductDisplayData } from "./_functions/getAdminProductDisplayData";
import {
  extractStyleId,
  extractCurrentProductColor,
} from "./_functions/extractStyleId";
import { extractColorsFromStyleProducts } from "./_functions/extractColorsFromStyleProducts";
import type { Metadata } from "next";

interface ProductPageProps {
  params: Promise<{ handle: string }>;
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { handle } = await params;
  const isDraftMode = (await draftMode()).isEnabled;

  if (isDraftMode) {
    const adminProduct = await getAdminProductByHandle(handle);

    if (!adminProduct) {
      return {
        title: "Product Not Found - Headless",
      };
    }

    return {
      title: `${adminProduct.title} - Headless`,
    };
  }

  const data = await getProduct({ handle });

  if (!data?.product) {
    return {
      title: "Product Not Found - Headless",
    };
  }

  const { title: productTitle } = getProductDisplayData(data);

  return {
    title: `${productTitle} - Headless`,
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { handle } = await params;
  const isDraftMode = (await draftMode()).isEnabled;

  if (isDraftMode) {
    const adminProduct = await getAdminProductByHandle(handle);

    if (!adminProduct) {
      return <div>Product not found</div>;
    }

    const {
      title: productTitle,
      formattedPrice,
      images,
      description,
      colors,
      sizes,
      variants,
      badge,
      currentColor,
    } = getAdminProductDisplayData(adminProduct);

    return (
      <main className="px-5 py-8 lg:px-10 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          <div className="lg:col-span-2">
            <ImageGrid images={images} />
          </div>

          <div className="lg:col-span-1">
            {badge && <ProductBadge text={badge} />}
            <ProductTitle title={productTitle} />
            <div className="flex items-center gap-4 flex-wrap">
              <ProductPrice price={formattedPrice} />
            </div>
            <ProductActions
              colors={colors}
              sizes={sizes}
              variants={variants}
              currentColor={currentColor}
            />
            <DemoStoreNotice />
            <ProductDescription description={description} />
          </div>
        </div>
      </main>
    );
  }

  const data = await getProduct({ handle });

  if (!data?.product) {
    return <div>Product not found</div>;
  }

  const {
    title: productTitle,
    formattedPrice,
    images,
    description,
    colors,
    sizes,
    variants,
    badge,
  } = getProductDisplayData(data);

  // Extract style ID and fetch all products with same style
  const styleId = extractStyleId(data.product.tags);
  let styleColors = colors; // Default to current product colors
  let currentProductColor: string | null = null;

  if (styleId) {
    // Fetch all products with the same style ID
    const styleProductsData = await getProductsByTag({
      query: `tag:'style:${styleId}'`,
      first: 50,
    });

    // Extract all colors from products with same style
    styleColors = extractColorsFromStyleProducts(styleProductsData);

    // Get the current product's color
    currentProductColor = extractCurrentProductColor(data.product);
  }

  return (
    <main className="px-5 py-8 lg:px-10 lg:py-12">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
        {/* Image Grid - 2/3 width */}
        <div className="lg:col-span-2">
          <ImageGrid images={images} />
        </div>

        {/* Product Details - 1/3 width */}
        <div className="lg:col-span-1">
          {badge && <ProductBadge text={badge} />}
          <ProductTitle title={productTitle} />
          <div className="flex items-center gap-4 flex-wrap">
            <ProductPrice price={formattedPrice} />
            {/* <ProductRating
              rating={mockProduct.rating}
              reviewCount={mockProduct.reviewCount}
            /> */}
          </div>
          <ProductActions
            colors={styleColors}
            sizes={sizes}
            variants={variants}
            currentColor={currentProductColor}
          />
          <DemoStoreNotice />
          <ProductDescription description={description} />
        </div>
      </div>

      {/* TODO: <SimilarItems products={similarProducts} /> */}
    </main>
  );
}
