"use client";

import {
  allergenList,
  misc,
  legend,
  allergensTitle,
  legendIcon,
  legendTitle,
  allergenName,
  show,
  dialogClass,
  legendIconParent,
  dialogContent,
} from "./Legend.module.css";

import { leaf as leafClass, frozen } from "./Menu.module.css";

import { Playfair_Display } from "next/font/google";

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair-display",
});

import {
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
} from "./allergens.module.css";
import { createElement } from "react";

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

export const Legend = ({ dictionary, allergens, lang }) => {
  return (
    <div className={legend}>
      <div className={dialogContent}>
        <h1 className={`${playfairDisplay.className} ${legendTitle}`}>
          {dictionary.menu.legend}
        </h1>
        <ul className={misc}>
          <li>
            <div className={legendIconParent}>
              <div className={`${frozen} ${legendIcon}`}>
                <div></div>
              </div>
            </div>
            <div>{dictionary.menu.frozen}</div>
          </li>
          <li>
            <div className={legendIconParent}>
              <div className={`${leafClass} ${legendIcon}`}>
                <div></div>
              </div>
            </div>
            <div>{dictionary.menu.vegetarian}</div>
          </li>
          <li>
            <div className={legendIconParent}>
              <div className={`${leafClass} ${legendIcon}`}>
                <div></div>
              </div>
              <div className={`${leafClass} ${legendIcon}`}>
                <div></div>
              </div>
            </div>
            <div>{dictionary.menu.vegan}</div>
          </li>
        </ul>
        <h1 className={`${playfairDisplay.className} ${allergensTitle}`}>
          {dictionary.menu.allergens}
        </h1>
        <ul className={allergenList}>
          {allergens.map((allergen) => (
            <li key={allergen.name.en}>
              <div className={legendIconParent}>
                <div
                  className={`${
                    allergenClasses[allergen.name.en]
                  } ${legendIcon}`}
                >
                  <div></div>
                </div>
              </div>
              <div className={allergenName}>{allergen.name[lang]}</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );

};
