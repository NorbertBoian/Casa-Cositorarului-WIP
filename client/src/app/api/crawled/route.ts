import { viewerClient as sanity } from "@/app/sanityClient";
import { NextResponse } from "next/server";

export async function GET() {
  const res = await sanity.fetch("*[_type == 'crawled'][0]");
  return NextResponse.json(res);
}
