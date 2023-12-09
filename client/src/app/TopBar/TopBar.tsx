import { dictionaryType } from "@/get-dictionary";
import {
  topBar,
  simpleLogo as simpleLogoClass,
  languageMenuAndPhoneNumberContainer,
  languageMenu,
  phoneNumber,
  logoWide as logoWideClass,
} from "./TopBar.module.css";
import Image from "next/image";

import simpleLogo from "./assets/simpleLogo.svg";
import logoWide from "./assets/logoWide.svg";

import { LanguageMenu } from "@components/LanguageMenu/LanguageMenu";

export const TopBar = ({
  dictionary,
  className,
  lang,
}: {
  dictionary: dictionaryType;
  lang: string;
  className?: string;
}) => {
  return (
    <div className={`${topBar} ${className ?? ""}`}>
      <a className={simpleLogoClass}>
        <Image src={simpleLogo} alt="" fill sizes="30vw" />
      </a>
      <div className={languageMenuAndPhoneNumberContainer}>
        <LanguageMenu className={languageMenu} lang={lang} />
        <div className={phoneNumber}>+40 721 818 695</div>
      </div>
      <a className={logoWideClass}>
        <Image src={logoWide} alt="" fill sizes="30vw" />
      </a>
    </div>
  );
};
