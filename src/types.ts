import { Locale } from "@/i18n/config";

export type Language = Locale;

export type RecentSyncDetails = {
  dataStructureVersion: string;
  succeeded: boolean;
  lastVersion: string | null;
  lastPage: number;
  versionsDone: string[];
  timestamp: number;
};

export type Word = {
  id: number;
  word: string;
  lang: Language;
};

export type WordBankStatus = {
  dataStructureVersion: string;
  wordBankVersions: string[];
};
