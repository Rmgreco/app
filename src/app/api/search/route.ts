import { NextResponse } from "next/server";

import weather from "../../weather.json";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const name = searchParams.get("name");
  const weatherData = weather.filter((p) =>
    p.name.toLowerCase().includes(name?.toLowerCase() ?? "")
  );
  return NextResponse.json(weatherData);
}