"use client";

import { useContext, useEffect, useState, memo } from "react";
import { flushSync } from "react-dom";
import { OnlyRenderPageContext } from "./LazyMotionWrapper";

const shouldLoad = {
  home: false,
  menu: false,
  rooms: false,
  information: false,
  contact: false,
  photos: false,
};

let loaded = false;

const order = ["home", "menu", "rooms", "information", "contact", "photos"];

export const SomeClientComponent = memo(
  ({ pages, page, lang, searchParams }: any) => {
    if (typeof window !== "undefined") shouldLoad[page] = true;

    const reRender = useState([])[1];

    useEffect(() => {
      const reRenderIfNotLoaded = () => {
        if (loaded === false) {
          loaded = true;
          flushSync(() => {
            reRender([]);
          });
          document.querySelector(`#${page}`).scrollIntoView();
        }
      };
      for (const key in shouldLoad) {
        shouldLoad[key] = true;
      }

      window.addEventListener("touchstart", reRenderIfNotLoaded, {
        once: true,
      });
      window.addEventListener("touchmove", reRenderIfNotLoaded, { once: true });
      window.addEventListener("touchend", reRenderIfNotLoaded, { once: true });
      window.addEventListener("mousedown", reRenderIfNotLoaded, { once: true });
      window.addEventListener("mousemove", reRenderIfNotLoaded, { once: true });
      window.addEventListener("mouseup", reRenderIfNotLoaded, { once: true });
      window.addEventListener("keydown", reRenderIfNotLoaded, { once: true });
      window.addEventListener("keypress", reRenderIfNotLoaded, { once: true });
      window.addEventListener("keyup", reRenderIfNotLoaded, { once: true });
      window.addEventListener("scroll", reRenderIfNotLoaded, { once: true });
      window.addEventListener("load", reRenderIfNotLoaded, { once: true });
      setTimeout(reRenderIfNotLoaded, 10000);
      return () => {
        window.removeEventListener("touchstart", reRenderIfNotLoaded);
        window.removeEventListener("touchmove", reRenderIfNotLoaded);
        window.removeEventListener("touchend", reRenderIfNotLoaded);
        window.removeEventListener("mousedown", reRenderIfNotLoaded);
        window.removeEventListener("mousemove", reRenderIfNotLoaded);
        window.removeEventListener("mouseup", reRenderIfNotLoaded);
        window.removeEventListener("keydown", reRenderIfNotLoaded);
        window.removeEventListener("keypress", reRenderIfNotLoaded);
        window.removeEventListener("keyup", reRenderIfNotLoaded);
        window.removeEventListener("scroll", reRenderIfNotLoaded);
        window.removeEventListener("load", reRenderIfNotLoaded);
      };
    }, [page, reRender]);

    const { onlyRenderPage } = searchParams;

    return typeof window !== "undefined"
      ? onlyRenderPage
        ? pages[onlyRenderPage]
        : order.map((page) => (shouldLoad[page] ? pages[page] : null))
      : pages[page];
  },
);

SomeClientComponent.displayName = "SomeClientComponent";
