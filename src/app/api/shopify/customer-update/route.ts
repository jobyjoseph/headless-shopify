import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { customerUpdate } from "@/integrations/shopify/customer-update";
import type { CustomerUpdateInput } from "@/generated/shopifySchemaTypes";

export async function POST(request: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("shopifyCustomerAccessToken")?.value;

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = (await request.json()) as CustomerUpdateInput & {
      password?: string | null;
    };

    const result = await customerUpdate(token, body);
    const payload = result?.customerUpdate;
    const userErrors = payload?.customerUserErrors ?? [];

    if (userErrors.length > 0 || !payload?.customer) {
      return NextResponse.json(
        { error: userErrors[0]?.message || "Unable to update customer." },
        { status: 400 },
      );
    }

    const newToken = payload?.customerAccessToken?.accessToken;
    const expiresAt = payload?.customerAccessToken?.expiresAt;

    if (newToken) {
      const response = NextResponse.json({ customer: payload.customer });
      response.cookies.set("shopifyCustomerAccessToken", newToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        expires: expiresAt ? new Date(expiresAt) : undefined,
      });
      return response;
    }

    return NextResponse.json({ customer: payload.customer });
  } catch (error) {
    console.error("Error updating customer:", error);
    return NextResponse.json(
      { error: "Unable to update customer." },
      { status: 500 },
    );
  }
}
