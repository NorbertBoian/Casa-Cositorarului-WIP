"use client";

import Image from "next/image";

import {
  menu,
  firstRow,
  price,
  unit,
  ingredientQuantity,
  ingredientName,
  diet,
  time,
  alcohol,
  quantity,
  secondRow,
  currency,
  description,
  quantityName,
  leaf as leafClass,
  priceValue,
  quantityValue,
  alcoholWord,
  alcoholValue,
  timeWord,
  timeValue,
  timeAndDiet,
  priceContainer,
  menuItemNameContainer,
  menuItems as menuItemsClass,
  mainContainer,
  texture,
  allergenList,
  misc,
  legend,
  search as searchClass,
  menuCategories,
  menuItemsAndLegend,
  horizontalContainer,
  leftSide,
  allergensTitle,
  milk,
  eggs,
  nuts,
  gluten,
  peanuts,
  crustaceans,
  molluscs,
  lupin,
  mustard,
  fish,
  sesame,
  soy,
  celery,
  sulphur,
  legendIcon,
  frozen,
  dietIcon,
  showingSearchClass,
  selected,
  searchLabel,
  legendTitle,
  allergenName,
  legendDialog,
  menuItemNameAndDescription,
  menuCategoriesSmall,
  show,
  menuCategoriesWrapper,
  bottomNav,
  searchAndLegendUIContainer,
  menuBanner,
  menuWrapper,
  fullHeightMenu,
  searchIcon as searchIconClass,
  fullscreenIcon as fullscreenIconClass,
  backIcon as backIconClass,
  crossIcon as crossIconClass,
  closeSearchButton,
} from "./Menu.module.css";

import leaf from "@/app/[[...slug]]/assets/leaf.svg";
import searchIcon from "./assets/search.svg";
import fullscreenIcon from "./assets/fullscreen.svg";
import backIcon from "./assets/back.svg";
import crossIcon from "./assets/cross.svg";
import { dictionaryType } from "@/get-dictionary";
import { Ingredients } from "./Ingredients";
import { Playfair_Display } from "next/font/google";
import {
  useState,
  MouseEvent,
  useEffect,
  useLayoutEffect,
  useRef,
  ChangeEvent,
  useContext,
} from "react";

import { create, load, search } from "@lyrasearch/lyra";
import { Legend } from "./Legend";
import {
  ClientLangContext,
  SetHideUiContext,
  SetOnlyRenderPageContext,
} from "../[[...slug]]/LazyMotionWrapper";
import { getRateLimitedFunction } from "../functions/getRateLimitedFunction";
import { useRouter } from "next/navigation";

import { LayoutGroup, m } from "framer-motion";

const quantityNaming = {
  grams: { en: "Mass", ro: "Masa" },
  mililiters: { en: "Volume", ro: "Volum" },
  pieces: { en: "Pieces", ro: "Bucati" },
};

const quantityUnits = {
  grams: "gr",
  mililiters: "ml",
  pieces: "x",
};

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair-display",
});

const allergenClasses = {
  Milk: milk,
  Eggs: eggs,
  Nuts: nuts,
  Gluten: gluten,
  Peanuts: peanuts,
  Crustaceans: crustaceans,
  Molluscs: molluscs,
  Lupin: lupin,
  Mustard: mustard,
  Fish: fish,
  "Sesame seeds": sesame,
  Soy: soy,
  Celery: celery,
  "Sulphur dioxide": sulphur,
};

export const MenuClient = ({
  menuItemsIndexExport,
  menuItems,
  allergens,
  categories,
  dictionary,
  forceShowMenu,
}: {
  menuItemsIndexExport: any;
  menuItems: any;
  allergens: any;
  categories: any;
  dictionary: dictionaryType;
  forceShowMenu: boolean;
}) => {
  const lang = useContext(ClientLangContext);
  const menuItemsIndexRef = useRef<undefined | any>(undefined);

  const [selectedIndexes, setSelectedIndexes] = useState([]);

  const [selectedMenuCategory, setSelectedMenuCategory] = useState<
    number | undefined
  >(0);

  const [showingSearch, setShowingSearch] = useState(false);

  const restoreIndex = async () => {
    const index = await create({
      edge: true,
      schema: {
        __placeholder: "string",
      },
    });

    await load(index, JSON.parse(menuItemsIndexExport));
    menuItemsIndexRef.current = index;
    if (menuItemsIndexRef.current) {
      const searchResult = await search(menuItemsIndexRef.current, {
        term: categories[0].en,
        properties: ["categories"],
      });
      setSelectedIndexes(searchResult.hits.map((item) => item.id));
    }
  };

  useEffect(() => {
    restoreIndex();
  }, []);

  const renderMenuItems = () =>
    selectedIndexes.map((index) => {
      return (
        <li key={menuItems[index].name.en}>
          <div className={firstRow}>
            <div className={menuItemNameAndDescription}>
              <h1 className={playfairDisplay.className}>
                {menuItems[index].name[lang]}
              </h1>
              <div className={description}>
                {menuItems[index].description[lang]}
              </div>
            </div>
            <div className={price}>
              <div className={priceContainer}>
                <span className={priceValue}>{menuItems[index].price}</span>
                <span className={currency}>Lei</span>
              </div>
            </div>
          </div>
          <div className={secondRow}>
            {menuItems[index].quantity !== undefined ? (
              <div className={quantity}>
                <span className={quantityName}>
                  {menuItems[index].unit !== "grams" &&
                  menuItems[index].unit !== "mililiters" &&
                  menuItems[index].unit !== "pieces"
                    ? dictionary.menu.quantity
                    : quantityNaming[menuItems[index].unit][lang]}
                </span>
                <span className={quantityValue}>
                  {menuItems[index].quantity}
                </span>
                <span className={unit}>
                  {typeof menuItems[index].unit === "object"
                    ? menuItems[index].unit[lang]
                    : quantityUnits[menuItems[index].unit]}
                </span>
              </div>
            ) : null}
            {menuItems[index].alcohol !== undefined ? (
              <div className={alcohol}>
                <span className={alcoholWord}>Alcool</span>
                <span className={alcoholValue}>
                  {menuItems[index].alcohol}%
                </span>
              </div>
            ) : null}

            <div className={timeAndDiet}>
              <div className={time}>
                <span className={timeWord}>{dictionary.menu.time}</span>
                <span className={timeValue}>30&quot;</span>
              </div>
              <div className={diet}>
                {menuItems[index].diet === "vegan" ? (
                  <>
                    <div className={`${leafClass} ${dietIcon}`}>
                      <div></div>
                    </div>
                    <div className={`${leafClass} ${dietIcon}`}>
                      <div></div>
                    </div>
                  </>
                ) : menuItems[index].diet === "vegetarian" ? (
                  <div className={`${leafClass} ${dietIcon}`}>
                    <div></div>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
          <Ingredients
            ingredients={menuItems[index].ingredients}
            lang={lang}
            dictionary={dictionary}
          />
        </li>
      );
    });

  const [searchInput, setSearchInput] = useState("");

  const menuCategoriesRef = useRef<HTMLUListElement>(null);

  const menuSectionElementRef = useRef<HTMLElement>();

  const changeCategoryRef = useRef(
    async (event: MouseEvent<HTMLButtonElement>) => {
      const categoryIndex = +event.target.dataset.index;
      const searchResult = await search(menuItemsIndexRef.current, {
        term: categories[categoryIndex].en,
        properties: ["categories"],
      });
      setShowingSearch(false);
      setSearchInput("");
      setSelectedMenuCategory(+categoryIndex);

      if (menuCategoriesRef.current)
        menuSectionElementRef.current?.scrollIntoView({
          inline: "center",
          block: "start",
          behavior: "smooth",
        });

      setSelectedIndexes(searchResult.hits.map((item) => item.id));
    },
  );

  const handleSearch = async (event: ChangeEvent<HTMLInputElement>) => {
    setSearchInput(event.target.value);
    const searchResult = await search(menuItemsIndexRef.current, {
      term: event.target.value,
      properties: "*",
    });
    if (event.target.value === "") {
      setShowingSearch(false);
      if (selectedMenuCategory !== undefined) {
        const searchResult = await search(menuItemsIndexRef.current, {
          term: categories[selectedMenuCategory].en,
          properties: ["categories"],
        });
        setSelectedIndexes(searchResult.hits.map((item) => item.id));
      }
    } else {
      setShowingSearch(true);
      setSelectedIndexes(searchResult.hits.map((item) => item.id));
    }
  };

  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialogElement = dialogRef.current;

    const resizeObserver = new ResizeObserver((entries) => {
      if (entries.at(-1)?.contentRect.height === 0) dialogRef.current?.close();
    });
    if (dialogElement) {
      resizeObserver.observe(dialogElement);

      return () => resizeObserver.unobserve(dialogElement);
    }
  }, []);

  const handleLegendClick = () => dialogRef.current.showModal();

  const handleBackdropMouseDown = (event: MouseEvent<HTMLDialogElement>) => {
    if (event.target === event.currentTarget) dialogRef.current.close();
  };

  const mainContentRef = useRef<HTMLDivElement>(null);

  const handleFullscreen = () => {
    if (document.fullscreenElement) document.exitFullscreen();
    mainContentRef.current?.requestFullscreen();
  };

  const smallMenuCategoriesRef = useRef<HTMLUListElement>(null);

  const onResizeRef = useRef(() => {
    const availableWidth =
      smallMenuCategoriesRef.current?.getBoundingClientRect().width;
    const categoriesElements = smallMenuCategoriesRef.current?.children;
    let usedWidth = 0;
    if (categoriesElements)
      for (const categoryElement of categoriesElements) {
        if (categoryElement instanceof HTMLElement) {
          usedWidth += categoryElement.getBoundingClientRect().width;
          usedWidth += +getComputedStyle(categoryElement).marginLeft.slice(
            0,
            -2,
          );
          usedWidth += +getComputedStyle(categoryElement).marginRight.slice(
            0,
            -2,
          );
        }
      }
    if (availableWidth) {
      const ratio = availableWidth / usedWidth;
      const currentFontSize = +getComputedStyle(
        smallMenuCategoriesRef.current,
      ).fontSize.slice(0, -2);
      smallMenuCategoriesRef.current.style.fontSize = `${
        currentFontSize * ratio
      }px`;
    }
  });

  const rateLimitedOnResizeRef = useRef(
    getRateLimitedFunction(onResizeRef.current, 100),
  );

  useLayoutEffect(() => {
    onResizeRef.current();
  }, []);

  useEffect(() => {
    const rateLimitedOnResize = rateLimitedOnResizeRef.current;
    window.addEventListener("resize", rateLimitedOnResize);
    return () => {
      window.removeEventListener("resize", rateLimitedOnResize);
    };
  }, []);

  const [showMenuBanner, setShowMenuBanner] = useState(true);

  const router = useRouter();

  const handleMenuBannerClick = (e) => {
    e.preventDefault();
    router.push("/menu?hideUi=true&showMenu=true&onlyRenderPage=menu");
    document.documentElement.requestFullscreen();
  };

  const handleBack = () => {
    router.back();
  };

  const [showSearchbar, setShowSearchbar] = useState(false);

  const handleCloseSearch = () => {
    setShowSearchbar(false);
    setSearchInput("");
  };

  const searchInputRef = useRef<HTMLInputElement>(null);

  const handleShowSearchbar = () => {
    setShowSearchbar(true);
  };

  useEffect(() => {
    if (showSearchbar && searchInputRef.current) searchInputRef.current.focus();
  }, [showSearchbar]);

  return (
    <section
      id="menu"
      ref={menuSectionElementRef}
      className={`${menu} ${
        !showMenuBanner || forceShowMenu ? fullHeightMenu : ""
      }`}
    >
      {!forceShowMenu && showMenuBanner ? (
        <a
          className={menuBanner}
          onClick={handleMenuBannerClick}
          href={"/menu?hideUi=true&showMenu=true&onlyRenderPage=menu"}
        >
          Click here to open our menu
        </a>
      ) : null}
      <div
        ref={mainContentRef}
        className={`${mainContainer} ${
          !showMenuBanner || forceShowMenu ? show : ""
        }`}
      >
        <div className={menuCategoriesWrapper}>
          <ul
            className={`${menuCategories} ${playfairDisplay.className} ${
              showingSearch ? showingSearchClass : ""
            }`}
            ref={menuCategoriesRef}
          >
            {categories.map((category, i) => (
              <button
                className={selectedMenuCategory === i ? selected : ""}
                onClick={changeCategoryRef.current}
                data-index={i}
                key={category.en}
              >
                {category[lang]}
              </button>
            ))}
          </ul>
          <ul
            className={`${menuCategories} ${menuCategoriesSmall} ${
              playfairDisplay.className
            } ${showingSearch ? showingSearchClass : ""}`}
            ref={smallMenuCategoriesRef}
          >
            {categories.map((category, i) => (
              <button
                className={selectedMenuCategory === i ? selected : ""}
                onClick={changeCategoryRef.current}
                data-index={i}
                key={category.en}
              >
                {category[lang]}
              </button>
            ))}
          </ul>
        </div>
        <div className={horizontalContainer}>
          <div className={leftSide}>
            <div className={searchAndLegendUIContainer}>
              <label
                className={searchLabel}
              >{`${dictionary.menu.search} :`}</label>
              <input
                className={searchClass}
                onChange={handleSearch}
                value={searchInput}
              />
              <button onClick={handleLegendClick}>
                {dictionary.menu.legend}
              </button>
            </div>
            <ul className={menuItemsClass}>{renderMenuItems()}</ul>
          </div>
          <div className={legend}>
            <Legend dictionary={dictionary} allergens={allergens} lang={lang} />
          </div>
        </div>
        <LayoutGroup>
          <div className={bottomNav}>
            {showSearchbar ? (
              <>
                <m.input
                  ref={searchInputRef}
                  className={searchClass}
                  onChange={handleSearch}
                  value={searchInput}
                  layoutId="search"
                />
                <m.button
                  className={closeSearchButton}
                  onClick={handleCloseSearch}
                  layoutId="closeOrBack"
                >
                  <Image className={crossIconClass} src={crossIcon} alt="" />
                </m.button>
              </>
            ) : (
              <>
                <m.button onClick={handleShowSearchbar} layoutId="search">
                  <Image className={searchIconClass} src={searchIcon} alt="" />
                </m.button>
                <button onClick={handleLegendClick}>
                  {dictionary.menu.legend}
                </button>
                <button onClick={handleFullscreen}>
                  <Image
                    className={fullscreenIconClass}
                    src={fullscreenIcon}
                    alt=""
                  />
                </button>
                <m.button onClick={handleBack} layoutId="closeOrBack">
                  <Image className={backIconClass} src={backIcon} alt="" />
                </m.button>
              </>
            )}
          </div>
        </LayoutGroup>
      </div>
      <dialog
        className={legendDialog}
        ref={dialogRef}
        onMouseDown={handleBackdropMouseDown}
        open={false}
      >
        <Legend dictionary={dictionary} allergens={allergens} lang={lang} />
      </dialog>
    </section>
  );
};
