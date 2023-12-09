import { MenuClient } from "./MenuClient";
import { getMenuItemsData } from "./getMenuItemsData";
import { getAllergensData } from "./getAllergensData";
import { create, insertBatch, save } from "@lyrasearch/lyra";
import { dictionaries } from "@/get-dictionary";
import { getMenuCategoriesData } from "./getMenuCategoriesData";

const menuItemsToLyraDocuments = async (menuItems, allergens) => {
  const allergensMap = {};

  const dictionariesSync = await Promise.all(
    Object.values(dictionaries).map((fn) => fn()),
  );

  for (const allergen of allergens) {
    allergensMap[allergen.name.en] = allergen.name;
  }
  return menuItems.map((item, i) => {
    return {
      id: `${i}`,
      categories: item.categories
        .map((category) =>
          Object.values(category)
            .filter((value) => value !== "localizedString")
            .join(" "),
        )
        .join(" "),
      description: Object.values(item.description)
        .filter((value) => value !== "localizedString")
        .join(" "),
      name: Object.values(item.name)
        .filter((value) => value !== "localizedString")
        .join(" "),
      allergens: item.allergens
        .map((allergen) =>
          Object.values(allergensMap[allergen])
            .filter((value) => value !== "localizedString")
            .join(" "),
        )
        .join(" "),
      diet: item.diet !== "none" ? item.diet : "",
      frozen: item.frozen
        ? dictionariesSync.map((dictionary) => dictionary.menu.frozen).join(" ")
        : "",
      price: `${item.price} lei`,
      ingredients: item.ingredients
        .map((ingredient) =>
          ingredient.ingredients
            .filter(
              (ingredient) =>
                ingredient.name.en !== "with" &&
                ingredient.name.en !== "withEnd",
            )
            .map((ingredient) =>
              Object.values(ingredient.name)
                .filter((value) => value !== "localizedString")
                .join(" "),
            )
            .join(" "),
        )
        .join(" "),
    };
  });
};

export const Menu = async ({ lang, dictionary, searchParams }) => {
  const menuItems = await getMenuItemsData();
  const allergens = await getAllergensData();
  const categories = await getMenuCategoriesData();

  const lyraDocuments = await menuItemsToLyraDocuments(menuItems, allergens);

  const menuItemsIndex = await create({
    schema: {
      id: "string",
      categories: "string",
      description: "string",
      name: "string",
      allergens: "string",
      diet: "string",
      frozen: "string",
      price: "string",
      ingredients: "string",
    },
  });

  await insertBatch(menuItemsIndex, lyraDocuments, { batchSize: 500 });

  const menuItemsIndexExport = JSON.stringify(await save(menuItemsIndex));

  const showMenu = searchParams.showMenu;
  const menuShown = showMenu === "true";

  return (
    <MenuClient
      menuItemsIndexExport={menuItemsIndexExport}
      menuItems={menuItems}
      allergens={allergens}
      categories={categories}
      dictionary={dictionary}
      forceShowMenu={menuShown}
    />
  );
};
