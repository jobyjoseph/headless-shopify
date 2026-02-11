import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { customerAddresses } from "@/integrations/shopify/customer-addresses";
import { customerAddressCreate } from "@/integrations/shopify/customer-address-create";
import type { MailingAddressInput } from "@/generated/shopifySchemaTypes";

export async function GET(request: Request) {
  try {
    const token = (await cookies()).get("shopifyCustomerAccessToken")?.value;

    if (!token) {
      return NextResponse.json(
        { addresses: [], defaultAddressId: null },
        { headers: { "Cache-Control": "no-store" } },
      );
    }

    const { searchParams } = new URL(request.url);
    const firstParam = searchParams.get("first");
    const after = searchParams.get("after") || undefined;
    const first = firstParam ? Number(firstParam) : 20;

    const data = await customerAddresses({
      customerAccessToken: token,
      first,
      after,
    });

    const edges = data?.customer?.addresses?.edges ?? [];
    const addresses = edges.map((edge) => edge.node);
    const defaultAddressId = data?.customer?.defaultAddress?.id ?? null;

    return NextResponse.json(
      { addresses, defaultAddressId },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch (error) {
    console.error("Error fetching customer addresses:", error);
    return NextResponse.json(
      { error: "Unable to fetch addresses." },
      { status: 500, headers: { "Cache-Control": "no-store" } },
    );
  }
}

export async function POST(request: Request) {
  try {
    const token = (await cookies()).get("shopifyCustomerAccessToken")?.value;

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const address = (await request.json()) as MailingAddressInput;

    const result = await customerAddressCreate(token, address);
    const payload = result?.customerAddressCreate;
    const userErrors = payload?.customerUserErrors ?? [];
    const customerAddress = payload?.customerAddress ?? null;

    if (userErrors.length > 0 || !customerAddress) {
      return NextResponse.json(
        { error: userErrors[0]?.message || "Unable to add address." },
        { status: 400 },
      );
    }

    return NextResponse.json({ address: customerAddress });
  } catch (error) {
    console.error("Error creating customer address:", error);
    return NextResponse.json(
      { error: "Unable to add address." },
      { status: 500 },
    );
  }
}
