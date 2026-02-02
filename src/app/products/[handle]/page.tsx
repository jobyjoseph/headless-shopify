import { getProduct } from "@/integrations/shopify/product";
import { getProductsByTag } from "@/integrations/shopify/products-by-tag";
import { ImageGrid } from "./_components/ImageGrid";
import { ProductBadge } from "./_components/ProductBadge";
import { ProductDescription } from "./_components/ProductDescription";
import { ProductPrice } from "./_components/ProductPrice";
import { ProductTitle } from "./_components/ProductTitle";
import { SimilarItems } from "./_components/SimilarItems";
import { ProductActions } from "./_components/ProductActions";
import { getProductDisplayData } from "./_functions/getProductDisplayData";
import { DemoStoreNotice } from "./_components/DemoStoreNotice";
import {
  extractStyleId,
  extractCurrentProductColor,
} from "./_functions/extractStyleId";
import { extractColorsFromStyleProducts } from "./_functions/extractColorsFromStyleProducts";
import type { Metadata } from "next";

const similarProducts = [
  {
    id: "1",
    title: "Ribbed Prosper Tank",
    price: "$68.00",
    image:
      "https://cdn.shopify.com/s/files/1/2185/2813/files/W2799R_06661_b2_s1_a1_m191_640x.jpg?v=1768302759",
    handle: "ribbed-prosper-tank",
  },
  {
    id: "2",
    title: "Alosoft Crop Finesse Short Sleeve",
    price: "$58.00",
    image:
      "https://cdn.shopify.com/s/files/1/2185/2813/files/W1406R_06661_b1_s1_a4_m91_640x.jpg?v=1768292548",
    handle: "alosoft-crop-finesse-short-sleeve",
  },
  {
    id: "3",
    title: "Airbrush Streamlined Bra Tank",
    price: "$68.00",
    image:
      "https://cdn.shopify.com/s/files/1/2185/2813/files/W9538R_0998_b1_s1_a4_m91_640x.jpg?v=1768338651",
    handle: "airbrush-streamlined-bra-tank",
  },
  {
    id: "4",
    title: "Aspire Tank",
    price: "$58.00",
    image:
      "https://cdn.shopify.com/s/files/1/2185/2813/files/W2675RG_0930_b1_s1_a3_m261_640x.jpg?v=1763642268",
    handle: "aspire-tank",
  },
];

interface ProductPageProps {
  params: Promise<{ handle: string }>;
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { handle } = await params;
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
    console.log(styleId);
    // Fetch all products with the same style ID
    const styleProductsData = await getProductsByTag({
      query: `tag:'style:${styleId}'`,
      first: 50,
    });

    console.log(styleProductsData);

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

      <SimilarItems products={similarProducts} />
    </main>
  );
}
