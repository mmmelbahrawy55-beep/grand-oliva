import { NextResponse } from "next/server";
import { getOverrides, setOverride, removeOverride, resetOverrides } from "@/lib/redis";

export async function GET() {
  const overrides = await getOverrides();
  return NextResponse.json(overrides);
}

export async function POST(request: Request) {
  const body = await request.json();
  const { id, data, action } = body;

  if (action === "reset") {
    await resetOverrides();
    return NextResponse.json({ success: true });
  }

  if (action === "remove" && id) {
    await removeOverride(id);
    return NextResponse.json({ success: true });
  }

  if (id && data) {
    await setOverride(id, data);
    return NextResponse.json({ success: true });
  }

  return NextResponse.json({ error: "Invalid request" }, { status: 400 });
}
