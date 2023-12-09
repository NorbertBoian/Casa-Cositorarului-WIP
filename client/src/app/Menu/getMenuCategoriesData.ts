import { viewerClient as sanity } from "@/app/sanityClient";
import { categoriesQuery } from "./queries";

export const getMenuCategoriesData = async () => {
  try {
    const res = await sanity.fetch(categoriesQuery);
    return res;
  } catch (err) {
    console.log(err);
    return "error";
  }
};
