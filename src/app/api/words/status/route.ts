export async function GET() {
  return Response.json({
    dataStructureVersion: process.env.DATA_STRUCTURE_VERSION ?? "1.0.0",
    wordBankVersions: process.env.VERSIONS
      ? process.env.VERSIONS.split(",")
      : ["v1"],
  });
}
