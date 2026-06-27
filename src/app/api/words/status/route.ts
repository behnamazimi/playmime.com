const CACHE_CONTROL =
  "public, s-maxage=86400, stale-while-revalidate=604800";

export async function GET() {
  try {
    return Response.json(
      {
        dataStructureVersion: process.env.DATA_STRUCTURE_VERSION ?? "1.0.0",
        wordBankVersions: process.env.VERSIONS
          ? process.env.VERSIONS.split(",")
          : ["v1"],
      },
      { headers: { "Cache-Control": CACHE_CONTROL } }
    );
  } catch (error) {
    return Response.json(
      { error: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}
