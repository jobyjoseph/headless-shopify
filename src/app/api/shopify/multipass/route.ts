import { NextResponse } from "next/server";
import { z } from "zod";

import { customerAccessTokenCreateWithMultipass } from "@/integrations/shopify/customer-access-token-create-with-multipass";
import { generateMultipassToken } from "@/lib/shopify/multipass";

const requestSchema = z.object({
  email: z.string(),
});

export async function POST(request: Request) {
  const parsed = requestSchema.safeParse(
    await request.json().catch(() => ({})),
  );

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid request body." },
      { status: 400 },
    );
  }

  const { email } = parsed.data;

  let multipassToken: string;

  try {
    multipassToken = generateMultipassToken(email);
  } catch (error) {
    console.error("Error generating multipass token:", error);
    return NextResponse.json(
      { error: "Multipass is not configured." },
      { status: 500 },
    );
  }

  try {
    const result = await customerAccessTokenCreateWithMultipass(multipassToken);
    const payload = result?.customerAccessTokenCreateWithMultipass;
    const userErrors = payload?.customerUserErrors ?? [];
    const token = payload?.customerAccessToken?.accessToken;
    const expiresAt = payload?.customerAccessToken?.expiresAt;

    if (userErrors.length || !token) {
      return NextResponse.json(
        { error: userErrors[0]?.message || "Unable to create access token." },
        { status: 401 },
      );
    }

    const response = NextResponse.json({ accessToken: token, expiresAt });

    response.cookies.set("shopifyCustomerAccessToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      expires: expiresAt ? new Date(expiresAt) : undefined,
    });

    return response;
  } catch (error) {
    console.error("Error creating access token with multipass:", error);
    return NextResponse.json(
      { error: "Unable to create access token." },
      { status: 500 },
    );
  }
}
