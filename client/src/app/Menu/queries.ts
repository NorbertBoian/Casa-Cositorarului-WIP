const menuItemCurly = `computeAllergens,
    computeDiet,
    computeFrozen,
    "manualFrozen":frozen,
    "manualAllergens":allergens[]->name.en,
    "manualDiet":diet,
    name,
    description,
    price,
      "manualAlcohol":alcoholAndQuantity.alcohol,
"computeAlcohol":alcoholAndQuantity.computeAlcohol,
"computeQuantity":alcoholAndQuantity.computeQuantity,
"hideAlcohol":alcoholAndQuantity.hideAlcohol,
"hideQuantity":alcoholAndQuantity.hideQuantity,
"manualQuantity":alcoholAndQuantity.quantity,
"unit":alcoholAndQuantity.unit, 
"customUnit":alcoholAndQuantity.customUnit,
"ingredients":ingredientsDetails[]
    {
        "id":_key,
        or,
        orIngredientDetails[]
        {
            "id":_key,
       "alcohol":alcoholAndQuantity.alcohol,
"hideAlcohol":alcoholAndQuantity.hideAlcohol,
"hideQuantity":alcoholAndQuantity.hideQuantity,
"quantity":alcoholAndQuantity.quantity,
"unit":alcoholAndQuantity.unit,
"customUnit":alcoholAndQuantity.customUnit, 
"allergens":ingredient->allergens[]->name.en,
"diet":ingredient->.diet,
"frozen":ingredient->.frozen,
"name":ingredient->.name,
        },
        ingredientDetails
        {
            "id":ingredient._ref,
        "alcohol":alcoholAndQuantity.alcohol,
"hideAlcohol":alcoholAndQuantity.hideAlcohol,
"hideQuantity":alcoholAndQuantity.hideQuantity,
"quantity":alcoholAndQuantity.quantity,
"unit":alcoholAndQuantity.unit,
"customUnit":alcoholAndQuantity.customUnit,
"allergens":ingredient->allergens[]->name.en,
"diet":ingredient->.diet,
"frozen":ingredient->.frozen,
"name":ingredient->.name,
        }
    }`;

export const categoriesQuery = `*[_type == 'menuCategory'].name`;

export const allergensQuery = `*[_type == 'allergen']
{
  "id":_id,
  name
}`;

export const menuItemsQuery = `*[_type == 'menuItem']
{"categories": *[_type=='menuCategory'
&& references(^._id)].name,${menuItemCurly}}`;
