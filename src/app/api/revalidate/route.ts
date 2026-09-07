import { NextRequest, NextResponse } from "next/server";
import { revalidatePath, revalidateTag } from "next/cache";

export async function POST(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get("token") || request.headers.get("x-revalidate-token");
    const secret = process.env.REVALIDATE_SECRET_TOKEN || "kebongede-secret-token-2026";

    if (token !== secret) {
      return NextResponse.json({ message: "Invalid secret token" }, { status: 401 });
    }

    const body = await request.json().catch(() => ({}));
    const path = searchParams.get("path") || body.path;
    const tag = searchParams.get("tag") || body.tag;

    if (path) {
      revalidatePath(path);
      return NextResponse.json({ revalidated: true, path, now: Date.now() });
    }

    if (tag) {
      revalidateTag(tag, "max");
      return NextResponse.json({ revalidated: true, tag, now: Date.now() });
    }

    // Default revalidate home
    revalidatePath("/");
    return NextResponse.json({ revalidated: true, path: "/", now: Date.now() });
  } catch (error) {
    console.error("Revalidation error:", error);
    return NextResponse.json(
      { message: "Error revalidating", error: String(error) },
      { status: 500 }
    );
  }
}
