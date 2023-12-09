import { dictionaryType } from "@/get-dictionary";
import { Locale } from "@/i18n-config";
import {
  unit,
  ingredientUnit,
  ingredientQuantityAndUnit,
  ingredientQuantity,
  ingredientName,
  ingredient as ingredientClass,
  alcohol,
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
  times,
  ingredientParent,
  or,
  withClass,
  withWord,
  ingredients as ingredientsClass,
  orWord,
  divider,
  and,
  leftMargin as leftMarginClass,
  frozen,
  ingredientIcon,
  ingredientAlcohol,
} from "./Menu.module.css";
import { Fragment } from "react";

type allergensType =
  | "Milk"
  | "Eggs"
  | "Nuts"
  | "Gluten"
  | "Peanuts"
  | "Crustaceans"
  | "Molluscs"
  | "Lupin"
  | "Mustard"
  | "Fish"
  | "Sesame seeds"
  | "Soy"
  | "Celery"
  | "Sulphur dioxide";

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

const quantityUnits = {
  grams: "gr",
  mililiters: "ml",
};

const ingredientUnits = (
  quantity: string | undefined,
  unit: string | { ro: string; en: string },
  lang: Locale,
) => {
  if (quantity === undefined) return null;
  if (typeof unit === "object")
    return (
      <div className={ingredientQuantityAndUnit}>
        <span className={ingredientQuantity}>{quantity}</span>
        <span className={ingredientUnit}>{unit[lang]}</span>
      </div>
    );
  if (unit === "pieces")
    return (
      <div className={ingredientQuantityAndUnit}>
        <span className={times}>x</span>
        <span className={ingredientQuantity}>{quantity}</span>
      </div>
    );
  return (
    <div className={ingredientQuantityAndUnit}>
      <span className={ingredientQuantity}>{quantity}</span>
      <span className={ingredientUnit}>{quantityUnits[unit]}</span>
    </div>
  );
};

const localizedNameKey = {
  ro: "nameRo",
  en: "nameEn",
} as const;

type Ingredient = {
  allergens: allergensType[];
  unit: string | { [key in Locale]: string };
  diet: "vegan" | "vegetarian" | "none";
  frozen: boolean;
  alcohol?: string;
  quantity?: string;
  name: { [key in Locale]: string };
  id: string;
};

type Ingredients = {
  id: string;
  or: boolean;
  ingredients: Ingredient[];
}[];

const parseIngredient = (
  ingredient: Ingredient,
  lang: Locale,
  appendDivider = false,
  leftMargin = false,
) => {
  return (
    <li
      className={`${ingredientClass} ${leftMargin ? leftMarginClass : ""}`}
      key={ingredient.id}
    >
      {ingredient.allergens.map((allergen) => (
        <div
          className={`${allergenClasses[allergen]} ${ingredientIcon}`}
          key={allergen}
        >
          <div></div>
        </div>
      ))}
      {ingredient.frozen ? (
        <div className={frozen} key="frozen">
          <div></div>
        </div>
      ) : null}
      <span className={ingredientName}>{ingredient.name[lang]}</span>
      {ingredientUnits(ingredient.quantity, ingredient.unit, lang)}
      {ingredient.alcohol !== undefined ? (
        <span className={ingredientAlcohol}>{ingredient.alcohol}%</span>
      ) : null}
      {appendDivider ? (
        <div key={`divider${ingredient.id}`} className={divider}></div>
      ) : null}
    </li>
  );
};

//With withing or , recursive with aren't handled

const segmentIngredients = (ingredients: Ingredients) => {
  const ingredientsSegments = [];
  let insideWith = false;
  let pushed = -1;
  ingredients.forEach((ingredient, index) => {
    if (
      ingredients[index + 1] &&
      !ingredients[index + 1].or &&
      ingredients[index + 1].ingredients[0].name.en === "with"
    ) {
      insideWith = true;
      pushed++;
    }
    if (ingredient.ingredients[0].name.en !== "withEnd") {
      if (insideWith) {
        ingredientsSegments[pushed] = {
          with: true,
          ingredients: [
            ...(ingredientsSegments[pushed]?.ingredients ?? []),
            ingredient,
          ],
        };
      } else {
        pushed++;
        ingredientsSegments.push({ ingredients: [ingredient] });
      }
    }
    if (
      ingredients[index + 1] &&
      !ingredients[index + 1].or &&
      ingredients[index + 1].ingredients[0].name.en === "withEnd"
    ) {
      insideWith = false;
    }
  });
  return ingredientsSegments;
};

const parseSegmentedIngredients = (
  segments: { with?: true; ingredients: Ingredients }[],
  lang: Locale,
  dictionary: dictionaryType,
) => {
  return segments.map((segment, index) => {
    return (
      <Fragment key={index}>
        {segment.ingredients.map((ingredient, i, a) => {
          if (ingredient.or) {
            return ingredient.ingredients.map((ingredient, j, array) => (
              <Fragment key={ingredient.id}>
                {parseIngredient(
                  ingredient,
                  lang,
                  array.length - 1 === j &&
                    a.length - 1 === i &&
                    segments.length - 1 !== index,
                  segment.with && i !== 0 && j === 0,
                )}

                {array.length - 1 !== j ? (
                  <li key={`or${j}`} className={orWord}>
                    {dictionary.menu.or}
                  </li>
                ) : null}
                {a.length - 2 === i &&
                array.length - 1 === j &&
                segment.with ? (
                  <li key={`and${j}`} className={`${and} ${leftMarginClass}`}>
                    {dictionary.menu.and}
                  </li>
                ) : null}
              </Fragment>
            ));
          } else if (ingredient.ingredients[0].name.en === "with") {
            return (
              <li key={`with${i}`} className={`${withWord} ${leftMarginClass}`}>
                {ingredient.ingredients[0].name[lang]}
              </li>
            );
          } else {
            return (
              <Fragment key={ingredient.id}>
                {parseIngredient(
                  ingredient.ingredients[0],
                  lang,
                  a.length - 1 === i && segments.length - 1 !== index,
                  segment.with && i !== 0,
                )}
                {a.length - 2 === i && segment.with ? (
                  <li key={`and${i}`} className={`${and} ${leftMarginClass}`}>
                    {dictionary.menu.and}
                  </li>
                ) : null}
              </Fragment>
            );
          }
        })}
      </Fragment>
    );
  });
};

type Props = {
  ingredients: Ingredients;
  lang: Locale;
  dictionary: dictionaryType;
};

export const Ingredients = ({ ingredients, lang, dictionary }: Props) => {
  const segmented = segmentIngredients(ingredients);
  return (
    <ul className={ingredientsClass}>
      {parseSegmentedIngredients(segmented, lang, dictionary)}
    </ul>
  );
};
