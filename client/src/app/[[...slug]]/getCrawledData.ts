import { viewerClient as sanity } from "@/app/sanityClient";

export const getCrawledData = async () => {
  try {
    const res = await sanity.fetch("*[_type == 'crawled'][0]");
    return res;
  } catch (err) {
    console.log(err);
    return "error";
  }
};
