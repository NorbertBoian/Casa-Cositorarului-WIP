import { viewerClient as sanity } from "@/app/sanityClient";
import { allergensQuery, menuItemsQuery } from "./queries";

export const getAllergensData = async () => {
  try {
    const res = await sanity.fetch(allergensQuery);
    return res;

    const proper = res.map((allergen) => {
      const {
        computeAlcohol,
        computeAllergens,
        computeDiet,
        computeFrozen,
        computeQuantity,
        customUnit,
        manualFrozen,
        hideAlcohol,
        hideQuantity,
        manualAlcohol,
        manualAllergens,
        manualDiet,
        manualQuantity,
        name,
        description,
        price,
        unit,
        ingredients,
      } = item;

      let computedQuantity = 0;
      let absoluteAlcoholSum = 0;
      let computedAllergens = new Set([]);
      let computedDiet = "vegan";
      let computedFrozen = false;

      const properIngredients = [];

      for (const ingredient of ingredients ?? []) {
        const { or, ingredientDetails, orIngredientDetails, id } = ingredient;
        const someIngredientDetails = or
          ? orIngredientDetails ?? []
          : ingredientDetails
          ? [ingredientDetails]
          : [];
        const properIngredient = [];
        for (const someIngredient of someIngredientDetails) {
          const {
            allergens,
            customUnit,
            diet,
            frozen,
            hideAlcohol,
            hideQuantity,
            alcohol,
            quantity,
            name,
            unit,
            id,
          } = someIngredient;
          const ingredient = {
            allergens: allergens
              ? allergens.filter((allergen) => allergen !== null)
              : [],
            unit:
              unit === "other"
                ? customUnit ?? { ro: "", en: "" }
                : unit ?? "grams",
            diet: diet ?? "none",
            frozen: frozen ?? false,
            alcohol: hideAlcohol ? undefined : alcohol ?? 0,
            quantity: hideQuantity ? undefined : quantity ?? 0,
            name: name ?? { ro: "", en: "" },
            id,
          };
          const properQuantity = isNaN(+quantity) ? 0 : +quantity;
          const properAlcohol = isNaN(+alcohol) ? 0 : +alcohol;
          computedQuantity += properQuantity;
          absoluteAlcoholSum += (properAlcohol / 100) * properQuantity;
          computedAllergens = new Set([
            ...computedAllergens,
            ...(allergens
              ? allergens.filter((allergen) => allergen !== null)
              : []),
          ]);
          computedDiet =
            computedDiet === "none" || diet === "none"
              ? "none"
              : computedDiet === "vegan"
              ? diet ?? "none"
              : computedDiet;
          properIngredient.push(ingredient);
          computedFrozen = frozen ? true : computedFrozen;
        }

        properIngredients.push({
          id,
          or,
          ingredients: properIngredient,
        });
      }

      const properQuantity = hideQuantity
        ? undefined
        : computeQuantity
        ? computedQuantity
        : manualQuantity ?? 0;

      const properAlcohol =
        hideAlcohol || !properQuantity || !absoluteAlcoholSum
          ? undefined
          : computeAlcohol
          ? (
              Math.round((absoluteAlcoholSum / properQuantity) * 200) / 2
            ).toFixed(1)
          : manualAlcohol ?? 0;

      const properItem = {
        name: name ?? { ro: "", en: "" },
        description: description ?? { ro: "", en: "" },
        quantity: properQuantity,
        alcohol: properAlcohol,
        allergens: computeAllergens
          ? [...computedAllergens]
          : manualAllergens
          ? manualAllergens.filter((allergen) => allergen !== null)
          : [],
        diet: computeDiet ? computedDiet : manualDiet ?? "none",
        frozen: computeFrozen ? computedFrozen : manualFrozen ?? false,
        price: price ?? 0,
        unit:
          unit === "other" ? customUnit ?? { ro: "", en: "" } : unit ?? "grams",
        ingredients: properIngredients ?? [],
      };

      return properItem;
    });

    return proper;
  } catch (err) {
    console.log(err);
    return "error";
  }
};
