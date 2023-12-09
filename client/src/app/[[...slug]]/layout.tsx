import "../globals.css";
import { AnalyticsScript } from "../Analytics/AnalyticsScript";

import { Barlow_Condensed } from "next/font/google";

import { ReactNode } from "react";
import { LazyMotionWrapper } from "./LazyMotionWrapper";
import Script from "next/script";

const barlowCondensed = Barlow_Condensed({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  display: "swap",
});

export async function generateStaticParams() {
  return [
    { slug: ["en"] },
    { slug: ["en", "home"] },
    { slug: ["en", "menu"] },
    { slug: ["en", "rooms"] },
    { slug: ["en", "information"] },
    { slug: ["en", "contact"] },
    { slug: ["en", "photos"] },
    { slug: ["ro"] },
    { slug: ["ro", "home"] },
    { slug: ["ro", "menu"] },
    { slug: ["ro", "rooms"] },
    { slug: ["ro", "information"] },
    { slug: ["ro", "contact"] },
    { slug: ["ro", "photos"] },
  ];
}

export default async function RootLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: any;
}) {
  const lang = params.slug[0];

  return (
    <html lang={lang} className={barlowCondensed.className}>
      <head />
      <body>
        <AnalyticsScript />
        <LazyMotionWrapper>{children}</LazyMotionWrapper>
      </body>
      <Script
        src={`https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITETKEY}`}
      />
    </html>
  );
}
