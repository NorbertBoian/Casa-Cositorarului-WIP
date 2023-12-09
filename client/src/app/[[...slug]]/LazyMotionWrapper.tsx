"use client";
import { LazyMotion } from "framer-motion";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
} from "react";
import { loadFramerMotion } from "./framerMotion/loadFramerMotion";
import { useParams } from "next/navigation";

export const ClientLangContext = createContext("en");
export const SetClientLangContext = createContext<
  Dispatch<SetStateAction<string>>
>(() => {});

export const HideUiContext = createContext(false);
export const SetHideUiContext = createContext<
  Dispatch<SetStateAction<boolean>>
>(() => {});

export const OnlyRenderPageContext = createContext<
  "home" | "menu" | "rooms" | "information" | "contact" | "photos" | false
>(false);
export const SetOnlyRenderPageContext = createContext<
  Dispatch<
    SetStateAction<
      "home" | "menu" | "rooms" | "information" | "contact" | "photos" | false
    >
  >
>(() => {});

export const LazyMotionWrapper = ({ children }: { children: ReactNode }) => {
  const params = useParams();
  const lang = params.slug[0] ?? "en";
  const [clientLang, setClientLang] = useState(lang);
  const [hideUi, setHideUi] = useState(false);
  const [onlyRenderPage, setOnlyRenderPage] = useState<
    "home" | "menu" | "rooms" | "information" | "contact" | "photos" | false
  >(false);
  return (
    <LazyMotion features={loadFramerMotion} strict>
      <ClientLangContext.Provider value={clientLang}>
        <SetClientLangContext.Provider value={setClientLang}>
          <HideUiContext.Provider value={hideUi}>
            <SetHideUiContext.Provider value={setHideUi}>
              <OnlyRenderPageContext.Provider value={onlyRenderPage}>
                <SetOnlyRenderPageContext.Provider value={setOnlyRenderPage}>
                  {children}
                </SetOnlyRenderPageContext.Provider>
              </OnlyRenderPageContext.Provider>
            </SetHideUiContext.Provider>
          </HideUiContext.Provider>
        </SetClientLangContext.Provider>
      </ClientLangContext.Provider>
    </LazyMotion>
  );
};
