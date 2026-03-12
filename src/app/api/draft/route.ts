import { draftMode } from "next/headers";
import { NextResponse } from "next/server";

function resolveRedirectPath(searchParams: URLSearchParams): string | null {
  const handle = searchParams.get("handle");
  const path = searchParams.get("path");

  if (handle) {
    return `/products/${encodeURIComponent(handle)}`;
  }

  if (!path || !path.startsWith("/")) {
    return null;
  }

  return path;
}

function getSecret(searchParams: URLSearchParams): string | null {
  return searchParams.get("secret");
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const secret = getSecret(url.searchParams);
  const configuredSecret = process.env.SHOPIFY_PREVIEW_SECRET;

  if (!configuredSecret) {
    return NextResponse.json(
      { error: "Missing SHOPIFY_PREVIEW_SECRET." },
      { status: 500 },
    );
  }

  if (!secret || secret !== configuredSecret) {
    return NextResponse.json(
      { error: "Invalid preview secret." },
      { status: 401 },
    );
  }

  const redirectPath = resolveRedirectPath(url.searchParams);
  if (!redirectPath) {
    return NextResponse.json(
      { error: "Provide either a valid handle or path query param." },
      { status: 400 },
    );
  }

  const draft = await draftMode();
  draft.enable();

  return NextResponse.redirect(new URL(redirectPath, url.origin));
}
