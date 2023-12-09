"use client";

import { useEffect } from "react";

export const AnalyticsPageViewTracking = () => {
  useEffect(() => {
    const onRouteChange = () => {
      if (window.gtag)
        window.gtag("event", "page_view", {
          page_title: window.document.title,
          page_location: window.location.href,
        });
    };
    window.addEventListener("routeChange", onRouteChange);
    return () => window.removeEventListener("routeChange", onRouteChange);
  }, []);

  return null;
};
