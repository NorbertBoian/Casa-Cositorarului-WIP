"use client";

export const UiWrapper = ({
  children,
  searchParams,
}: {
  children: JSX.Element;
  searchParams: any;
}) => {
  const hideUi = searchParams.hideUi;
  const uiHidden = hideUi === "true";

  return !uiHidden ? children : null;
};
