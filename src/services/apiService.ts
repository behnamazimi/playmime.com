import { Language, WordBankStatus } from "@/types";

export class ApiService {
  constructor(private readonly signal: AbortSignal) {}
  async fetchStatus(): Promise<WordBankStatus> {
    const defaultStatus: WordBankStatus = {
      dataStructureVersion: "1.0.0",
      wordBankVersions: ["v1"],
    };
    try {
      const response = await fetch(`/api/words/status`, {
        signal: this.signal,
      });
      if (!response.ok) throw new Error(response.statusText);
      const data = await response.json();
      return { ...defaultStatus, ...data };
    } catch (error) {
      console.error("[fetchStatus]", error);
      import("@/utils/reportError").then(({ default: report }) => {
        report(error);
      });
      return defaultStatus;
    }
  }

  async fetchWords(language: Language, version: string, page: number) {
    try {
      const response = await fetch(
        `/api/words/${language}/${version}?page=${page}`,
        { signal: this.signal }
      );
      if (!response.ok) throw new Error(response.statusText);
      return await response.json();
    } catch (error) {
      console.error(`[fetchWords] Page ${page}`, error);
      import("@/utils/reportError").then(({ default: report }) => {
        report(error);
      });
      return { words: [], lastPage: 0, error: String(error) };
    }
  }
}
