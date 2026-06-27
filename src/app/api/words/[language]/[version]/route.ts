import getPaginatedWords from "@/utils/getPaginatedWords";
import { BaseWord, Language } from "@/types";

const DEFAULT_PAGE_SIZE = 1500;

const CACHE_CONTROL =
  "public, s-maxage=31536000, stale-while-revalidate=86400";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ language: Language; version: string }> }
) {
  const { language, version } = await params;
  if (!version) {
    return Response.json(
      { error: "Version parameter is required" },
      { status: 400 }
    );
  }
  const { searchParams } = new URL(request.url);
  const page = searchParams.get("page") ?? "1";
  const pageSize = searchParams.get("pageSize") ?? String(DEFAULT_PAGE_SIZE);
  const startIndex = (parseInt(page) - 1) * parseInt(pageSize);
  const chunkSize = parseInt(pageSize);

  const requestCacheKey = `words-${language}-${version}-${page}-${pageSize}`;
  let words: BaseWord[] = [];
  let lastPage = 1;
  try {
    const cachedPaginatedWords:
      | { words: BaseWord[]; lastPage: number }
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

    return Response.json(
      {
        version,
        language,
        lastPage,
        words,
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
