import { getProduct } from "@/integrations/shopify/product";
import { ImageGrid } from "./_components/ImageGrid";
import { ProductBadge } from "./_components/ProductBadge";
import { ProductDescription } from "./_components/ProductDescription";
import { ProductPrice } from "./_components/ProductPrice";
import { ProductTitle } from "./_components/ProductTitle";
import { SimilarItems } from "./_components/SimilarItems";
import { ProductActions } from "./_components/ProductActions";
import { getProductDisplayData } from "./_functions/getProductDisplayData";

// Mock product data
const mockProduct = {
  price: "$72.00",
  rating: 4.6,
  reviewCount: 128,
  colors: [
    { name: "Black", value: "#000000" },
    { name: "White", value: "#FFFFFF" },
    { name: "Navy", value: "#1e3a5f" },
    { name: "Burgundy", value: "#800020" },
    { name: "Olive", value: "#556B2F" },
  ],
  sizes: ["XXS", "XS", "S", "M", "L", "XL"],
  fit: "True to Size",
  description:
    "A seamless ribbed bra tank that combines comfort with style. Features a built-in shelf bra for light support, moisture-wicking fabric to keep you cool, and a flattering fit that moves with you from studio to street. The soft, stretchy ribbed fabric hugs your curves without digging in, while the seamless construction eliminates irritation for all-day comfort. Perfect for yoga, pilates, or everyday wear, this versatile tank pairs beautifully with high-waisted leggings or jeans. Machine washable and designed to maintain its shape wash after wash.",
};

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
  } = getProductDisplayData(data);

  return (
    <main className="px-5 py-8 lg:px-10 lg:py-12">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
        {/* Image Grid - 2/3 width */}
        <div className="lg:col-span-2">
          <ImageGrid images={images} />
        </div>

        {/* Product Details - 1/3 width */}
        <div className="lg:col-span-1">
          <ProductBadge text="Bestseller" />
          <ProductTitle title={productTitle} />
          <div className="flex items-center gap-4 flex-wrap">
            <ProductPrice price={formattedPrice} />
            {/* <ProductRating
              rating={mockProduct.rating}
              reviewCount={mockProduct.reviewCount}
            /> */}
          </div>
          <ProductActions
            colors={colors}
            sizes={sizes}
            fit={mockProduct.fit}
            variants={variants}
          />
          <ProductDescription description={description} />
        </div>
      </div>

      <SimilarItems products={similarProducts} />
    </main>
  );
}
