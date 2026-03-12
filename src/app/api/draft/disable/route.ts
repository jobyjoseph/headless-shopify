import { draftMode } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const path = url.searchParams.get("path") || "/";

  if (!path.startsWith("/")) {
    return NextResponse.json({ error: "Invalid path." }, { status: 400 });
  }

  const draft = await draftMode();
  draft.disable();

  return NextResponse.redirect(new URL(path, url.origin));
}
