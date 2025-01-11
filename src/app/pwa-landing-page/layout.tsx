import { redirect } from "next/navigation";
import { getUserLocale } from "@/i18n/utils";

export default async function RootLayout() {
  const locale = await getUserLocale();
  redirect(`/${locale}/play`);
}
