import "server-only";
import createShopifyAdminClient from "@/integrations/shopify-admin/shopify-admin-client";
import {
  AdminProductByHandleDocument,
  AdminProductByHandleQuery,
  AdminProductByHandleQueryVariables,
} from "@/generated/shopifyAdminSchemaTypes";

export interface AdminPreviewProduct {
  title: string;
  description: string;
  tags: string[];
  images: Array<{ src: string; alt: string }>;
  options: Array<{ name: string; values: string[] }>;
  variants: Array<{
    id: string;
    title: string;
    availableForSale: boolean;
    selectedOptions: Array<{ name: string; value: string }>;
    price: string;
  }>;
}

function stripHtml(input: string | null | undefined): string {
  if (!input) {
    return "";
  }

  return input
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function normalizeProduct(
  product: NonNullable<AdminProductByHandleQuery["productByIdentifier"]>,
): AdminPreviewProduct {
  return {
    title: product.title,
    description: stripHtml(product.description),
    tags: product.tags || [],
    images:
      product.images?.edges?.map((edge) => ({
        src: edge.node.url,
        alt: edge.node.altText || product.title,
      })) || [],
    options: product.options.map((option) => ({
      name: option.name,
      values: option.values,
    })),
    variants:
      product.variants?.edges?.map((edge) => {
        const variant = edge.node;

        return {
          id: variant.id,
          title: variant.title,
          availableForSale:
            (variant.inventoryQuantity || 0) > 0 ||
            variant.inventoryPolicy === "CONTINUE",
          selectedOptions: variant.selectedOptions,
          price: variant.price,
        };
      }) || [],
  };
}

export async function getAdminProductByHandle(
  handle: string,
): Promise<AdminPreviewProduct | null> {
  try {
    const client = createShopifyAdminClient();

    const { data } = await client.query<
      AdminProductByHandleQuery,
      AdminProductByHandleQueryVariables
    >({
      query: AdminProductByHandleDocument,
      variables: {
        handle,
      },
      fetchPolicy: "no-cache",
    });

    const product = data.productByIdentifier;
    if (!product) {
      return null;
    }

    return normalizeProduct(product);
  } catch (error) {
    console.error("Error fetching Shopify Admin product:", error);
    return null;
  }
}
