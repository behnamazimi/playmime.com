import { ApiService } from "@/services/apiService";
import { SyncService } from "@/services/syncService";
import { Language } from "@/types";
import isValidLocale from "@/utils/isValidLocale";

export async function syncWordBank(language: Language, signal: AbortSignal) {
  if (!isValidLocale(language)) {
    return;
  }
  const apiService = new ApiService(signal);
  const syncService = new SyncService(apiService, language);

  return await syncService.syncWordBank();
}
