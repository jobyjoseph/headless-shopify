import Image from "next/image";
import SectionAddToCart from "./_components/section-add-to-cart/section-add-to-cart";
import { product } from "@/integrations/shopify/product";

export default async function Page({
  params,
}: {
  params: Promise<{ handle: string }>;
}) {
  const { handle } = await params;
  const data = await product({ handle });
  console.log(data);
  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">
        <div className="grid grid-cols-2 gap-4">
          {[
            "https://cdn.shopify.com/s/files/1/0136/6867/9739/files/W9616R_01_b2_s1_a2_m238_1500x.jpg?v=1759423417",
            "https://cdn.shopify.com/s/files/1/0136/6867/9739/files/W9616R_01_b1_s1_ai_m54_1500x.jpg?v=1759423417",
            "https://cdn.shopify.com/s/files/1/0136/6867/9739/files/W9616R_01_b1_s1_a3_m54_1500x.jpg?v=1759423417",
            "https://cdn.shopify.com/s/files/1/0136/6867/9739/files/W9616R_01_b1_s1_a5_m54_1500x.jpg?v=1759423417",
          ].map((src, i) => (
            <div key={i} className="overflow-hidden rounded-sm">
              <Image
                src={src}
                alt={`Product image ${i + 1}`}
                width={930}
                height={1395}
                className="h-full w-full aspect-[3/4] object-cover transition-transform duration-300 hover:scale-[1.02]"
              />
            </div>
          ))}
        </div>
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            {data.product.title}
          </h1>
          <p>{handle}</p>
          <p className="mt-2 text-xl font-medium">128 USD</p>
          <SectionAddToCart />
        </div>
      </div>
    </main>
  );
}
