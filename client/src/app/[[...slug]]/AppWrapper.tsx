"use client";
import {
  ReactNode,
  useEffect,
  useLayoutEffect as clientUseLayoutEffect,
} from "react";
import { dictionaryType } from "@/get-dictionary";
import { CookieConsent } from "@components/CookieConsent/CookieConsent";

const useLayoutEffect =
  typeof window === "undefined" ? () => {} : clientUseLayoutEffect;

import { Playfair_Display } from "next/font/google";

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
});

import {
  horizontalWrapper,
  verticalWrapper,
  sideNavigation as sideNavigationLayout,
  mainContent,
} from "./layout.module.css";

import {
  contact as contactClass,
  home as homeClass,
  info as infoClass,
  menu as menuClass,
  photos as photosClass,
  rooms as roomsClass,
  iconContainer,
  sideNavigation,
  languageMenu,
  pageName,
  logoNarrow as logoNarrowClass,
  logoMediumWidth as logoMediumWidthClass,
  social,
  navPattern as navPatternClass,
  texture as textureClass,
  decoration as decorationClass,
  pageButton,
  pageButtons,
  toggleDrawerButton,
  instagramIcon as instagramIconClass,
  facebookIcon as facebookIconClass,
  pageButtonsContainer,
  verticalBarsIconContainer,
  link,
  triangleIconContainer,
  background,
  selected as selectedClass,
  pageButtonBackground,
  selectedPageButton,
  bookNow,
  pageNameContainer,
  phoneNumber,
  bookNowAndPhoneNumberContainer,
} from "../Navigation/Navigation.module.css";

import {
  animate,
  m,
  PanInfo,
  useMotionTemplate,
  useMotionValue,
  useTransform,
} from "framer-motion";

import contactIcon from "../Navigation/assets/icons/contact.svg";
import homeIcon from "../Navigation/assets/icons/home.svg";
import infoIcon from "../Navigation/assets/icons/info.svg";
import menuIcon from "../Navigation/assets/icons/menu.svg";
import photosIcon from "../Navigation/assets/icons/photos.svg";
import roomsIcon from "../Navigation/assets/icons/rooms.svg";

import verticalBarsIcon from "../Navigation/assets/icons/verticalBars.svg";
import triangleIcon from "../Navigation/assets/icons/triangle.svg";
import instagramIcon from "../Navigation/assets/icons/instagram.svg";
import facebookIcon from "../Navigation/assets/icons/facebook.svg";

import Image from "next/image";
import { LanguageMenu } from "../LanguageMenu/LanguageMenu";

import logoMediumWidth from "../Navigation/assets/logoMediumWidth3.svg";
import logoNarrow from "../Navigation/assets/logoNarrow2.svg";

import {
  createRef,
  useCallback,
  useRef,
  useState,
  MouseEvent as ReactMouseEvent,
} from "react";
import { AnalyticsScript } from "../Analytics/AnalyticsScript";
import { UiWrapper } from "../UiWrapperComponent/UiWrapper";
import { SomeClientComponent } from "./SomeClientComponent";
import { getRateLimitedFunction } from "../functions/getRateLimitedFunction";
import { AnalyticsPageViewTracking } from "@components/Analytics/AnalyticsPageViewTracking";

const classNames = {
  contact: contactClass,
  home: homeClass,
  information: infoClass,
  menu: menuClass,
  photos: photosClass,
  rooms: roomsClass,
};

const icons = {
  contact: contactIcon,
  home: homeIcon,
  information: infoIcon,
  menu: menuIcon,
  photos: photosIcon,
  rooms: roomsIcon,
};

const order = [
  "home",
  "menu",
  "rooms",
  "information",
  "contact",
  "photos",
] as const;

export const AppWrapper = ({
  searchParams,
  consented,
  topBar,
  bottomBar,
  pages,
  lang,
  dictionary,
  currentSegment,
}: {
  searchParams: any;
  firstHalf: ReactNode;
  secondHalf: ReactNode;
  dictionary: dictionaryType;
  lang: "en" | "ro";
  currentSegment: any;
}) => {
  const regularNames = dictionary.pages.regular;
  const partialShortNames = dictionary.pages.short;
  const shortNames = { ...regularNames, ...partialShortNames };

  const sideDrawerRef = useRef<HTMLElement>();
  const pageButtonsContainerRef = useRef<HTMLDivElement>();
  const textureRef = useRef<HTMLImageElement>();
  const navPatternRef = useRef<HTMLImageElement>();
  const toggleButtonRef = useRef<HTMLButtonElement>();
  const selectedRef = useRef<HTMLAnchorElement>();
  const decorationContainerRef = useRef<HTMLDivElement>();

  const baseWidth = "3vh";
  const widthGrowthFactor = 13;
  const maxWidthCalcString = `calc(${baseWidth} * ${widthGrowthFactor})`;

  const pageNamesRefsRef = useRef(order.map(() => createRef<HTMLDivElement>()));

  const pageButtonsRefsRef = useRef(
    order.map(() => createRef<HTMLAnchorElement>()),
  );
  const progress = useMotionValue(0);
  const pageNameLeftSiblingOffsets = useMotionValue(
    pageNamesRefsRef.current.map((a) => 0),
  );

  const decorationMaxTranslateX = useMotionValue(0);

  //@ts-ignore
  const decorationTranslateX = useTransform(
    [progress, decorationMaxTranslateX],
    ([latestProgress, latestDecorationMaxTranslateX]: [number, number]) =>
      (1 - latestProgress) * latestDecorationMaxTranslateX,
  );

  const decorationOpacity = useTransform(progress, [0, 0.3, 1], [0, 0, 1]);

  const decorationTranslateXString = useMotionTemplate`translate3d(${decorationTranslateX}px, 0, 0)`;

  const measureDistance = () => {
    const decorationElement = decorationContainerRef.current;
    if (decorationElement) {
      decorationMaxTranslateX.set(-decorationElement.offsetLeft);
    }

    const newPageNameLeftSiblingOffsets = pageNameLeftSiblingOffsets.get();
    pageNamesRefsRef.current.forEach((pageNameRef, index) => {
      const pageNameElement = pageNameRef.current;
      if (pageNameElement) {
        const childParentLeftOffset = pageNameElement.offsetLeft;
        const siblingParentRight =
          pageNameElement.parentElement?.previousElementSibling?.getBoundingClientRect()
            .right;
        if (siblingParentRight !== undefined) {
          const childSiblingLeftOffset =
            childParentLeftOffset - siblingParentRight;
          newPageNameLeftSiblingOffsets[index] = childSiblingLeftOffset - 10;
        }
      }
    });
    pageNameLeftSiblingOffsets.set(newPageNameLeftSiblingOffsets);
  };

  const pageNamesTranslateXProgress = useTransform(
    progress,
    [0, 0.1, 1],
    [0, 0.025, 1],
  );

  const pageNameContainerMask = useTransform(
    progress,
    [0, 0.1, 0.35, 0.7, 1],
    [0, 0, 100, 500, 2000],
  );

  const pageNameContainerMaskString = useMotionTemplate`linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0) ${pageNameContainerMask}%)`;

  //@ts-ignore
  const updatePageNamesTranslateX = useTransform(
    [pageNameLeftSiblingOffsets, pageNamesTranslateXProgress],
    ([latestPageNameLeftSiblingOffsets, latestPageNamesTranslateXProgress]: [
      number[],
      number,
    ]) => {
      pageNamesRefsRef.current.forEach((pageNameRef, index) => {
        if (pageNameRef.current) {
          pageNameRef.current.style.transform = `translate3d(${
            latestPageNameLeftSiblingOffsets[index] *
            (-1 + latestPageNamesTranslateXProgress)
          }px, 0, 0)`;
        }
      });
    },
  );

  const navPatternOpacity = useTransform(progress, [0, 1], [0, 0.01]);

  const pageButtonBackgroundOpacity = useTransform(
    progress,
    [0, 0.05, 1],
    [1, 0, 0],
  );

  const selectedPageButtonBackgroundOpacity = useTransform(
    progress,
    [0, 0.05, 0.4, 0.7],
    [0, 0, 0, 1],
  );

  const scaleX = useTransform(
    progress,
    (latestProgress) => 1 + (widthGrowthFactor - 1) * latestProgress,
  );

  const invertedScaleX = useTransform(
    scaleX,
    (latestScaleX) => 1 / latestScaleX,
  );

  const iconsTranslateX = useTransform(progress, [0, 1], ["0%", "200%"]);
  const iconsTranslateXString = useMotionTemplate`translate3d(${iconsTranslateX}, 0, 0)`;

  const contentTranslateXString = useMotionTemplate`translate3d(calc(${scaleX} * ${baseWidth} - ${baseWidth} ), 0, 0)`;
  const scaleXString = useMotionTemplate`scale3d(${scaleX}, 1, 1)`;
  const invertedScaleXString = useMotionTemplate`scale3d(${invertedScaleX}, 1, 1)`;

  const toggleDrawer = useCallback(() => {
    if (progress.get() === 1) {
      animate(progress, 0, { type: "tween" });
      if (mainContainerRef.current) {
        mainContainerRef.current.style.touchAction = "pan-y";
      }
    } else {
      if (mainContainerRef.current) {
        mainContainerRef.current.style.touchAction = "none";
      }
      animate(progress, 1, { type: "tween" });
    }
  }, [progress]);

  const arrowRef = useRef<HTMLImageElement>();
  const arrowS = useTransform(progress, (latestProgress) => {
    if (arrowRef.current)
      if (latestProgress === 1) {
        arrowRef.current.style.visibility = "visible";
        arrowRef.current.style.scale = "-1 1";
      } else if (latestProgress === 0) {
        arrowRef.current.style.visibility = "visible";
        arrowRef.current.style.scale = "1 1";
        arrowRef.current.style.order = "0";
      } else {
        arrowRef.current.style.order = "-1";
        arrowRef.current.style.visibility = "hidden";
      }
  });

  const panStartedRef = useRef(false);

  const onPan = (e: MouseEvent | TouchEvent | PointerEvent, i: PanInfo) => {
    if (
      panStartedRef.current === false &&
      Math.abs(i.velocity.x) - Math.abs(i.velocity.y) > 20
    ) {
      panStartedRef.current = true;
      measureDistance();
    }

    if (panStartedRef.current) {
      mainContainerRef.current.style.touchAction = "none";
    }

    const currentWidth = textureRef.current?.offsetWidth;
    if (currentWidth && panStartedRef.current) {
      const deltaX = i.delta.x;
      const percentage = deltaX / currentWidth;
      const latestProgress = progress.get();
      const capped = Math.max(Math.min(1, latestProgress + percentage), 0);
      progress.set(capped);
    }
  };

  const onPanEnd = (e: MouseEvent | TouchEvent | PointerEvent, i: PanInfo) => {
    panStartedRef.current = false;
    if (
      Math.abs(i.velocity.x) - Math.abs(i.velocity.y) > 20 &&
      i.velocity.x > 25
    )
      animate(progress, 1, { type: "tween" });
    else if (i.velocity.x < -25) {
      if (mainContainerRef.current) {
        mainContainerRef.current.style.touchAction = "pan-y";
      }
      animate(progress, 0, { type: "tween" });
    } else if (progress.get() > 1) {
      animate(progress, 1, { type: "tween" });
    } else {
      if (mainContainerRef.current) {
        mainContainerRef.current.style.touchAction = "pan-y";
      }
      animate(progress, 0, { type: "tween" });
    }
  };

  const [segment, setSegment] = useState(currentSegment);
  const prevSegmentRef = useRef(currentSegment);

  const handlePageButtonClick = (event: ReactMouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    const page = event.currentTarget.dataset.pageName;
    const pageIndex = event.currentTarget.dataset.pageButtonIndex;
    if (pageIndex !== undefined) {
      const pageSegmentElement = document.querySelector(`#${page}`);
      if (pageSegmentElement)
        pageSegmentElement.scrollIntoView({
          behavior: "smooth",
          block: "start",
          inline: "start",
        });
      animate(progress, 0, { type: "tween" });
    }
  };

  const mainContainerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const main = mainContainerRef.current;
      const home = document.querySelector("#home");
      const menu = document.querySelector("#menu");
      const rooms = document.querySelector("#rooms");
      const information = document.querySelector("#information");
      const contact = document.querySelector("#contact");
      const photos = document.querySelector("#photos");

      if (main) {
        const middle = Math.round(main.scrollTop + main.offsetHeight / 2);
        const homeRange = [
          home?.offsetTop,
          home?.offsetTop + home?.offsetHeight,
        ];
        const menuRange = [
          menu?.offsetTop,
          menu?.offsetTop + menu?.offsetHeight,
        ];
        const roomsRange = [
          rooms?.offsetTop,
          rooms?.offsetTop + rooms?.offsetHeight,
        ];
        const informationRange = [
          information?.offsetTop,
          information?.offsetTop + information?.offsetHeight,
        ];
        const contactRange = [
          contact?.offsetTop,
          contact?.offsetTop + contact?.offsetHeight,
        ];
        const photosRange = [
          photos?.offsetTop,
          photos?.offsetTop + photos?.offsetHeight,
        ];

        const ranges = {
          home: homeRange,
          menu: menuRange,
          rooms: roomsRange,
          information: informationRange,
          contact: contactRange,
          photos: photosRange,
        };

        for (const page in ranges) {
          if (middle >= ranges[page][0] && middle <= ranges[page][1]) {
            const possiblePageSegments = Object.keys(ranges);
            const pageSegmentRegEx = new RegExp(
              `(?!\/)(?:${possiblePageSegments.join("|")})(?=\/|$)`,
              "i",
            );
            const newPageUrlString = page === "home" ? "" : page;
            const pathName = window.location.pathname;
            const pathNameWithoutTrailingSlash =
              window.location.pathname.replace(/\/$/, "");
            const newPathName = `${pathName.replace(
              pageSegmentRegEx,
              newPageUrlString,
            )}`;
            if (pathName.match(pageSegmentRegEx))
              history.replaceState({}, "", newPathName);
            else
              history.replaceState(
                {},
                "",
                `${pathNameWithoutTrailingSlash}${
                  newPageUrlString ? `/${newPageUrlString}` : ""
                }`,
              );
            prevSegmentRef.current = page;
            setSegment(page);
          }
        }
      }
    };

    const rateLimitedOnScroll = getRateLimitedFunction(onScroll, 100);

    const mainContainerElement = mainContainerRef.current;

    mainContainerElement?.addEventListener("scroll", rateLimitedOnScroll);
    return () =>
      mainContainerElement?.removeEventListener("scroll", rateLimitedOnScroll);
  }, []);

  const hideUi = searchParams.hideUi;
  const uiHidden = hideUi === "true";

  return (
    <>
      <CookieConsent consented={consented} />
      <m.div className={horizontalWrapper} onPan={onPan} onPanEnd={onPanEnd}>
        <UiWrapper searchParams={searchParams}>
          <m.nav
            className={`${sideNavigation} ${sideNavigationLayout}`}
            style={{
              width: baseWidth,
              transform: scaleXString,
              originX: 0,
            }} //@ts-ignore
            ref={sideDrawerRef}
          >
            <m.div
              className={pageButtonsContainer}
              //@ts-ignore
              ref={pageButtonsContainerRef}
              style={{
                transform: invertedScaleXString,
                originX: 0,
                width: maxWidthCalcString,
              }}
            >
              <m.button //@ts-ignore
                ref={toggleButtonRef}
                className={toggleDrawerButton}
                onClick={toggleDrawer}
                style={{
                  transform: contentTranslateXString,
                }}
              >
                <Image
                  className={verticalBarsIconContainer}
                  src={verticalBarsIcon}
                  alt=""
                />
                <Image
                  className={triangleIconContainer}
                  src={triangleIcon} //@ts-ignore
                  ref={arrowRef}
                  alt=""
                />
              </m.button>
              <m.div className={background}></m.div>
              <m.div //@ts-ignore
                ref={navPatternRef}
                className={navPatternClass}
                alt=""
                style={{
                  opacity: navPatternOpacity,
                }}
              ></m.div>
              <Image className={logoNarrowClass} src={logoNarrow} alt="" />
              <Image
                className={logoMediumWidthClass}
                src={logoMediumWidth}
                alt=""
              />
              <LanguageMenu className={languageMenu} lang={lang} />
              <div className={bookNowAndPhoneNumberContainer}>
                <a className={`${bookNow} ${playfairDisplay.className}`}>
                  Book now
                </a>
                <a className={phoneNumber}>+40 721 818 695</a>
              </div>
              <m.div //@ts-ignore
                ref={decorationContainerRef}
                style={{
                  transform: decorationTranslateXString,
                  opacity: decorationOpacity,
                }}
                className={decorationClass}
              ></m.div>
              <m.div className={pageButtons}>
                {order.map((navItem, i) => (
                  <a
                    href={`${navItem}`}
                    key={i}
                    onClick={handlePageButtonClick}
                    className={`${classNames[navItem]} ${
                      navItem === segment ? selectedClass : ""
                    } ${link}`}
                    data-page-button-index={i}
                    data-page-name={navItem}
                    title={regularNames[navItem]}
                  >
                    <m.div
                      className={pageButton} //@ts-ignore
                      ref={
                        navItem !== segment
                          ? pageButtonsRefsRef.current[i]
                          : selectedRef
                      }
                    >
                      <m.div
                        className={pageButtonBackground}
                        style={{
                          opacity: pageButtonBackgroundOpacity,
                        }}
                      ></m.div>
                      {navItem === segment ? (
                        <m.div
                          className={selectedPageButton}
                          style={{
                            opacity: selectedPageButtonBackgroundOpacity,
                            maskImage: pageNameContainerMaskString,
                            WebkitMaskImage: pageNameContainerMaskString,
                          }}
                          animate
                          layout
                          layoutId="selectedBackground"
                        ></m.div>
                      ) : null}
                      <m.img
                        className={iconContainer}
                        src={icons[navItem].src}
                        style={{
                          transform: iconsTranslateXString,
                        }}
                        alt=""
                      />
                      <m.div className={pageNameContainer}>
                        <m.div
                          className={pageName}
                          data-short-name={shortNames[navItem]}
                          data-regular-name={regularNames[navItem]}
                          style={{
                            maskImage: pageNameContainerMaskString,
                            WebkitMaskImage: pageNameContainerMaskString,
                          }}
                          ref={pageNamesRefsRef.current[i]}
                        ></m.div>
                      </m.div>
                    </m.div>
                  </a>
                ))}
              </m.div>
            </m.div>
            <div className={social}>
              <a href="https://www.instagram.com/">
                <Image
                  className={instagramIconClass}
                  src={instagramIcon}
                  fill
                  sizes="3vh"
                  alt=""
                />
              </a>
              <a href="https://www.facebook.com/">
                <Image
                  className={facebookIconClass}
                  src={facebookIcon}
                  fill
                  sizes="3vh"
                  alt=""
                />
              </a>
            </div>
            <m.div //@ts-ignore
              ref={textureRef}
              className={textureClass}
              draggable={false}
              style={{
                transform: invertedScaleXString,
                originX: 0,
                width: maxWidthCalcString,
              }}
            ></m.div>
          </m.nav>
        </UiWrapper>
        <m.div
          className={verticalWrapper}
          style={
            uiHidden
              ? {}
              : {
                  transform: contentTranslateXString,
                }
          }
        >
          {topBar}
          <main className={mainContent} ref={mainContainerRef}>
            <SomeClientComponent
              page={currentSegment}
              pages={pages}
              lang={lang}
              searchParams={searchParams}
            />
          </main>
          {bottomBar}
        </m.div>
      </m.div>
    </>
  );
};
