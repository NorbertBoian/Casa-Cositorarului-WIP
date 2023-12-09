"use client";
import { i18n } from "@/i18n-config";
import { useContext, useState } from "react";
import { ParamLink } from "../components/ParamLink";
import {
  languageMenuContainer,
  selectedLanguage,
  languageOptions,
  languageOption,
  visibleLanguageOptions,
} from "./LanguageMenu.module.css";

import { m } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  ClientLangContext,
  SetClientLangContext,
} from "../[[...slug]]/LazyMotionWrapper";

const languageName = { ro: "Romana", en: "English" };

export const LanguageMenu = ({ className }: { className?: string }) => {
  const [shown, setShown] = useState(false);
  const lang = useContext(ClientLangContext);
  const setLang = useContext(SetClientLangContext);
  const toggleOptions = (event) => {
    const targetLang = event.target.dataset.locale;
    if (lang !== targetLang && targetLang) {
      document.cookie = `lang=${targetLang}`;
      history.replaceState(
        {},
        "",
        `/${targetLang}${window.location.pathname.slice(3)}`,
      );
      setLang(targetLang);
    }
    setShown((shown) => !shown);
  };
  const router = useRouter();

  return (
    <div className={className ?? ""}>
      <div className={languageMenuContainer}>
        <m.div
          className={`${languageOptions} ${
            shown ? visibleLanguageOptions : ""
          }`}
          layout="position"
        >
          {i18n.locales
            .filter((locale) => locale !== lang)
            .map((locale) => (
              <m.button
                className={languageOption}
                onClick={toggleOptions}
                key={locale}
                data-locale={locale}
                layout="position"
              >
                {languageName[locale]}
              </m.button>
            ))}
        </m.div>
        <button
          className={`${languageOption} ${selectedLanguage}`}
          onClick={toggleOptions}
        >
          {languageName[lang]}
        </button>
      </div>
    </div>
  );
};
