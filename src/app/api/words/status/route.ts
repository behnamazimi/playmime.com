export async function GET() {
  try {
    return Response.json({
      dataStructureVersion: process.env.DATA_STRUCTURE_VERSION ?? "1.0.0",
      wordBankVersions: process.env.VERSIONS
        ? process.env.VERSIONS.split(",")
        : ["v1"],
    });
  } catch (error) {
    return Response.json(
      { error: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}
