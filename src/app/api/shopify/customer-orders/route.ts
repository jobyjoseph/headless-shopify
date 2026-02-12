import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { customerOrders } from "@/integrations/shopify/customer-orders";

export async function GET(request: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("shopifyCustomerAccessToken")?.value;

    if (!token) {
      return NextResponse.json(
        { orders: [] },
        { headers: { "Cache-Control": "no-store" } },
      );
    }

    const { searchParams } = new URL(request.url);
    const firstParam = searchParams.get("first");
    const after = searchParams.get("after") || undefined;
    const first = firstParam ? Number(firstParam) : 20;

    const data = await customerOrders({
      customerAccessToken: token,
      first,
      after,
    });

    const orders = data?.customer?.orders ?? null;

    if (!orders) {
      return NextResponse.json(
        { orders: [] },
        { headers: { "Cache-Control": "no-store" } },
      );
    }

    return NextResponse.json(
      { orders },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch (error) {
    console.error("Error fetching customer orders:", error);
    return NextResponse.json(
      { error: "Unable to fetch customer orders." },
      { status: 500, headers: { "Cache-Control": "no-store" } },
    );
  }
}
