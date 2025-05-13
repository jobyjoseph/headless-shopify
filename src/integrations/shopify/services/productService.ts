import { shopifyFetch } from "../storefrontClient";
import { print } from "graphql";
import getProductByHandleQuery from "./graphql/product.graphql";
import { Product } from "@/generated/shopifySchemaTypes";

interface GetProductByHandleResponse {
  product: Product | null;
}

export async function getProductByHandle(
  handle: string
): Promise<Product | null> {
  const data = await shopifyFetch<GetProductByHandleResponse>(
    print(getProductByHandleQuery),
    {
      handle,
    }
  );

  const product = data.product;

  if (!product) return null;

  return product;
}
