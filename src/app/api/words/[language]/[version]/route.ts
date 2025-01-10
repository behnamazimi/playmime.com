import getPaginatedWords from "@/utils/getPaginatedWords";
import sendJsonErrorResponse from "@/utils/sendJsonErrorResponse";
import { Language } from "@/types";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ language: Language; version: string }> }
) {
  const language = (await params).language;
  const version = (await params).version;
  if (!version) {
    return sendJsonErrorResponse({
      error: "Version parameter is required",
      status: 500,
    });
  }
  const { searchParams } = new URL(request.url);
  const page = searchParams.get("page") ?? "1";
  const pageSize = searchParams.get("pageSize") ?? "200";
  const startIndex = (parseInt(page) - 1) * parseInt(pageSize);
  const chunkSize = parseInt(pageSize);

  const requestCacheKey = `words-${language}-${version}-${page}-${pageSize}`;
  let words: string[] = [];
  let lastPage = 1;
  try {
    const cachedPaginatedWords:
      | { words: string[]; lastPage: number }
      | undefined = global.cacheUser.get(requestCacheKey);
    if (cachedPaginatedWords) {
      words = cachedPaginatedWords.words;
      lastPage = cachedPaginatedWords.lastPage;
    } else {
      const paginatedWords = await getPaginatedWords(
        language,
        version,
        startIndex,
        chunkSize
      );
      words = paginatedWords.words;
      lastPage = paginatedWords.lastPage;
      global.cacheUser.set(requestCacheKey, paginatedWords, 60);
    }

    return Response.json({
      version,
      language,
      lastPage,
      words,
    });
  } catch (error) {
    return sendJsonErrorResponse({
      error,
      status: 500,
    });
  }
}
