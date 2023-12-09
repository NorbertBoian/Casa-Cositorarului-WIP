import { useSearchParams } from "next/navigation";

export const useSearchParamsObject = () => {
  const searchParams = useSearchParams();
  const searchParamsEntries = searchParams.entries();
  const searchParamsObject: { [key: string]: string } = {};
  for (const entry of searchParamsEntries) {
    searchParamsObject[entry[0]] = entry[1];
  }
  return searchParamsObject;
};
