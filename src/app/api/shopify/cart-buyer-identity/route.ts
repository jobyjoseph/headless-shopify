import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { cartBuyerIdentityUpdate } from "@/integrations/shopify/cart-buyer-identity-update";

export async function POST(request: Request) {
  try {
    const { cartId } = (await request.json()) as { cartId?: string };

    if (!cartId) {
      return NextResponse.json({ error: "Missing cartId." }, { status: 400 });
    }

    const cookieStore = await cookies();
    const token = cookieStore.get("shopifyCustomerAccessToken")?.value;

    if (!token) {
      return NextResponse.json(
        { error: "Missing Shopify customer token." },
        { status: 401 },
      );
    }

    const result = await cartBuyerIdentityUpdate(cartId, {
      customerAccessToken: token,
    });

    const payload = result?.cartBuyerIdentityUpdate;
    const userErrors = payload?.userErrors ?? [];

    if (userErrors.length > 0) {
      return NextResponse.json(
        { error: userErrors[0]?.message || "Unable to update buyer identity." },
        { status: 400 },
      );
    }

    return NextResponse.json({ cart: payload?.cart ?? null });
  } catch (error) {
    console.error("Error updating cart buyer identity:", error);
    return NextResponse.json(
      { error: "Unable to update buyer identity." },
      { status: 500 },
    );
  }
}
