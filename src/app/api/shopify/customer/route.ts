import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { customer } from "@/integrations/shopify/customer";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("shopifyCustomerAccessToken")?.value;

    if (!token) {
      return NextResponse.json(
        { error: "Missing Shopify customer token." },
        { status: 401 },
      );
    }

    const data = await customer({ customerAccessToken: token });
    const customerData = data?.customer ?? null;

    if (!customerData) {
      return NextResponse.json({ error: "Customer not found." }, { status: 404 });
    }

    return NextResponse.json({ customer: customerData });
  } catch (error) {
    console.error("Error fetching Shopify customer:", error);
    return NextResponse.json(
      { error: "Unable to fetch Shopify customer." },
      { status: 500 },
    );
  }
}
