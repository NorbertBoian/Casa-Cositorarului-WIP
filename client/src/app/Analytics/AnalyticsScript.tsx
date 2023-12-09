import Script from "next/script";
import { cookies } from "next/headers";

export const AnalyticsScript = () => {
  const consented = cookies().get("consented")?.value === "true";
  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
 
          gtag('consent', 'default', {
            'ad_storage': 'denied',
            'analytics_storage': 'denied'});

          gtag('consent', 'update', {
            'ad_storage': '${consented ? "granted" : "denied"}',
            'analytics_storage': '${consented ? "granted" : "denied"}'});

          gtag('config', '${
            process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_MEASUREMENT_ID
          }');
        `}
      </Script>
    </>
  );
};
