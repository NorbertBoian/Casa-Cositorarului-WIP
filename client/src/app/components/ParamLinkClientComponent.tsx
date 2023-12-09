"use client";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { HTMLAttributeAnchorTarget, ReactNode } from "react";
import { useSearchParamsObject } from "@/hooks/useSearchParamsObject";

export const ParamLinkClientComponent = ({
  children,
  name,
  value,
  target,
  className,
  forceReload,
  prefetch,
}: {
  children: ReactNode;
  name: string;
  value: string;
  forceReload: boolean;
  target?: HTMLAttributeAnchorTarget;
  className?: string;
  prefetch?: boolean;
}) => {
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const urlSearchParams = new URLSearchParams(searchParams);
  urlSearchParams.append(name, value);
  const searchParamsObject = useSearchParamsObject();
  return forceReload ? (
    <a
      href={`${pathName}?${urlSearchParams.toString()}`}
      {...(target ? { target } : {})}
      {...(className ? { className } : {})}
    >
      {children}
    </a>
  ) : (
    <Link
      href={{
        pathname: pathName,
        query: { ...searchParamsObject, [name]: value },
      }}
      scroll={false}
      prefetch={prefetch}
      {...(target ? { target } : {})}
      {...(className ? { className } : {})}
    >
      {children}
    </Link>
  );
};
