"use client";

import Link from "next/link";
import type { ComponentProps } from "react";
import { useLanguage } from "@/i18n/LanguageProvider";

type Props = Omit<ComponentProps<typeof Link>, "href"> & { href: string };

/** next/link que mantiene el idioma actual: "/catalogo" → "/en/catalogo" en inglés. */
export function LocaleLink({ href, ...rest }: Props) {
  const { href: localize } = useLanguage();
  return <Link href={href.startsWith("/") ? localize(href) : href} {...rest} />;
}
