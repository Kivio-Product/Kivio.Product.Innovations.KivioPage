import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { defaultLocale, isLocale } from "@/i18n/config";

export default async function RootPage() {
  const jar = await cookies();
  const stored = jar.get("kivio-lang")?.value;
  redirect(`/${stored && isLocale(stored) ? stored : defaultLocale}`);
}
