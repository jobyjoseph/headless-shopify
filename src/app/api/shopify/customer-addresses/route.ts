import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { customerAddresses } from "@/integrations/shopify/customer-addresses";
import { customerAddressCreate } from "@/integrations/shopify/customer-address-create";
import { customerDefaultAddressUpdate } from "@/integrations/shopify/customer-default-address-update";
import { customerAddressUpdate } from "@/integrations/shopify/customer-address-update";
import { customerAddressDelete } from "@/integrations/shopify/customer-address-delete";
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

export async function PATCH(request: Request) {
  try {
    const token = (await cookies()).get("shopifyCustomerAccessToken")?.value;

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = (await request.json()) as { addressId?: string };
    const addressId = body.addressId;

    if (!addressId) {
      return NextResponse.json(
        { error: "Missing addressId." },
        { status: 400 },
      );
    }

    const result = await customerDefaultAddressUpdate(token, addressId);
    const payload = result?.customerDefaultAddressUpdate;
    const userErrors = payload?.customerUserErrors ?? [];

    if (userErrors.length > 0 || !payload?.customer) {
      return NextResponse.json(
        { error: userErrors[0]?.message || "Unable to set default address." },
        { status: 400 },
      );
    }

    const edges = payload.customer.addresses?.edges ?? [];
    const addresses = edges.map((edge) => edge.node);
    const defaultAddressId = payload.customer.defaultAddress?.id ?? null;

    return NextResponse.json({ addresses, defaultAddressId });
  } catch (error) {
    console.error("Error setting default address:", error);
    return NextResponse.json(
      { error: "Unable to set default address." },
      { status: 500 },
    );
  }
}

export async function PUT(request: Request) {
  try {
    const token = (await cookies()).get("shopifyCustomerAccessToken")?.value;

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = (await request.json()) as {
      addressId?: string;
      address?: MailingAddressInput;
    };

    const addressId = body.addressId;
    const address = body.address;

    if (!addressId || !address) {
      return NextResponse.json(
        { error: "Missing addressId or address." },
        { status: 400 },
      );
    }

    const result = await customerAddressUpdate(token, addressId, address);
    const payload = result?.customerAddressUpdate;
    const userErrors = payload?.customerUserErrors ?? [];
    const customerAddress = payload?.customerAddress ?? null;

    if (userErrors.length > 0 || !customerAddress) {
      return NextResponse.json(
        { error: userErrors[0]?.message || "Unable to update address." },
        { status: 400 },
      );
    }

    return NextResponse.json({ address: customerAddress });
  } catch (error) {
    console.error("Error updating customer address:", error);
    return NextResponse.json(
      { error: "Unable to update address." },
      { status: 500 },
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const token = (await cookies()).get("shopifyCustomerAccessToken")?.value;

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = (await request.json()) as { addressId?: string };
    const addressId = body.addressId;

    if (!addressId) {
      return NextResponse.json(
        { error: "Missing addressId." },
        { status: 400 },
      );
    }

    const result = await customerAddressDelete(token, addressId);
    const payload = result?.customerAddressDelete;
    const userErrors = payload?.customerUserErrors ?? [];

    if (userErrors.length > 0 || !payload?.deletedCustomerAddressId) {
      return NextResponse.json(
        { error: userErrors[0]?.message || "Unable to delete address." },
        { status: 400 },
      );
    }

    return NextResponse.json({
      deletedAddressId: payload.deletedCustomerAddressId,
    });
  } catch (error) {
    console.error("Error deleting customer address:", error);
    return NextResponse.json(
      { error: "Unable to delete address." },
      { status: 500 },
    );
  }
}
