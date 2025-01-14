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

export type BaseWord = {
  word: string;
  category: string;
};

export type Word = BaseWord & {
  id: number;
  lang: Language;
};

export type WordBankStatus = {
  dataStructureVersion: string;
  wordBankVersions: string[];
};
