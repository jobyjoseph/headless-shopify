import { NextResponse } from "next/server";
import { cartBuyerIdentityUpdate } from "@/integrations/shopify/cart-buyer-identity-update";

export async function POST(request: Request) {
  let cartId: string | undefined;

  try {
    const body = (await request.json()) as { cartId?: string };
    cartId = body?.cartId;
  } catch {
    cartId = undefined;
  }

  const response = NextResponse.json({ ok: true });

  response.cookies.set("shopifyCustomerAccessToken", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    expires: new Date(0),
  });

  if (!cartId) {
    return response;
  }

  try {
    const result = await cartBuyerIdentityUpdate(cartId, {
      customerAccessToken: null,
    });

    const userErrors = result?.cartBuyerIdentityUpdate?.userErrors ?? [];
    if (userErrors.length > 0) {
      return NextResponse.json(
        { error: userErrors[0]?.message || "Unable to clear buyer identity." },
        { status: 400 },
      );
    }

    return response;
  } catch (error) {
    console.error("Error clearing cart buyer identity:", error);
    return NextResponse.json(
      { error: "Unable to clear buyer identity." },
      { status: 500 },
    );
  }
}
