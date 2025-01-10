import { ApiService } from "./apiService";
import {
  clearAllDataByLanguage,
  getRecentSyncDetails,
  saveRecentSyncDetails,
  storeWords,
} from "@/utils/indexedDb";
import { Language } from "@/types";

export class SyncService {
  constructor(
    private readonly apiService: ApiService,
    private readonly language: Language
  ) {}

  private async delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  private async syncWordsByVersion(
    version: string,
    dataStructureVersion: string,
    startPage = 1
  ) {
    let page = startPage;
    let hasMoreData = true;
    const latestSync = await getRecentSyncDetails(this.language);

    while (hasMoreData) {
      const { words, lastPage, error } = await this.apiService.fetchWords(
        this.language,
        version,
        page
      );

      hasMoreData = !error && page < lastPage && words.length > 0;
      if (hasMoreData) page++;

      // Save data to storage
      try {
        await storeWords(this.language, words);

        // Save sync details
        let versionsDone = latestSync?.versionsDone || [];
        if (!hasMoreData && !error) {
          versionsDone = [...versionsDone, version];
        }
        await saveRecentSyncDetails(this.language, {
          succeeded: !error,
          dataStructureVersion,
          lastVersion: version,
          lastPage: hasMoreData ? page - 1 : page,
          versionsDone,
          timestamp: Date.now(),
        });
      } catch (storageError) {
        console.error(
          "[syncWordsByVersion] Error storing words:",
          storageError
        );

        import("@/utils/reportError").then(({ default: report }) => {
          report(storageError);
        });
      }

      // Avoid rate limits
      await this.delay(100);
    }
  }

  private async syncVersions(versions: string[], dataStructureVersion: string) {
    for (const version of versions) {
      await this.syncWordsByVersion(version, dataStructureVersion);
    }
  }

  public async syncWordBank() {
    const recentSync = await getRecentSyncDetails(this.language);
    const { wordBankVersions, dataStructureVersion } =
      await this.apiService.fetchStatus();

    // possible scenarios:
    // 1. first time sync. recentSync is null
    if (!recentSync) {
      // sync all versions
      await this.syncVersions(wordBankVersions, dataStructureVersion);
      return;
    }

    // 2. data structure has changed. recentSync.dataStructureVersion !== dataStructureVersion
    if (dataStructureVersion !== recentSync.dataStructureVersion) {
      console.log("[syncWordBank] Clearing outdated data...");
      await clearAllDataByLanguage(this.language);
      // sync all versions
      await this.syncVersions(wordBankVersions, dataStructureVersion);
      return;
    }

    if (
      recentSync.lastVersion &&
      !recentSync.versionsDone.includes(recentSync.lastVersion)
    ) {
      // 3. last sync was successful. but lastSync.lastVersion is not in lastSync.versionsDone (sync of the last sync version was not completed)
      if (recentSync.succeeded) {
        // resume last version
        await this.syncWordsByVersion(
          recentSync.lastVersion,
          dataStructureVersion,
          recentSync.lastPage + 1
        );

        // 4. last sync was not successful. and lastSync.lastVersion is not in lastSync.versionsDone (sync of the last sync version was not completed)
      } else {
        // retry last version
        await this.syncWordsByVersion(
          recentSync.lastVersion,
          dataStructureVersion,
          recentSync.lastPage
        );
      }
    }

    // 5. last sync was successful. and lastSync.lastVersion is in lastSync.versionsDone (sync of the last sync version was completed) and there are more versions to sync
    const remainingVersions = wordBankVersions.filter(
      (version) => !recentSync.versionsDone.includes(version)
    );
    if (remainingVersions.length > 0) {
      // sync remaining versions
      await this.syncVersions(remainingVersions, dataStructureVersion);
    }
  }
}
