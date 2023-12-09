"use client";
import { useSearchParams } from "next/navigation";

export const UiWrapperClientComponent = ({
  children,
}: {
  children: JSX.Element;
}) => {
  const searchParams = useSearchParams();
  const hideUi = searchParams.get("hideUi");
  const uiHidden = hideUi === "true";

  return !uiHidden ? children : null;
};
