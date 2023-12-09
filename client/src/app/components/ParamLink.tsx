import Link from "next/link";
import { HTMLAttributeAnchorTarget, ReactNode, Suspense } from "react";
import { ParamLinkClientComponent } from "./ParamLinkClientComponent";

export const ParamLink = ({
  children,
  name,
  value,
  target,
  className,
  prefetch,
  forceReload = false,
}: {
  children: ReactNode;
  name: string;
  value: string;
  target?: HTMLAttributeAnchorTarget;
  className?: string;
  forceReload?: boolean;
  prefetch?: boolean;
}) => {
  // const searchParams = new URLSearchParams(window.location.search);
  // searchParams.append(name, value);

  return (
    <Suspense
      fallback={
        <Link
          href={{
            query: { [name]: value },
          }}
          scroll={false}
          prefetch={prefetch}
          {...(target ? { target } : {})}
          {...(className ? { className } : {})}
        >
          {children}
        </Link>
      }
    >
      <ParamLinkClientComponent
        prefetch={prefetch}
        forceReload={forceReload}
        className={className}
        target={target}
        value={value}
        name={name}
      >
        {children}
      </ParamLinkClientComponent>
    </Suspense>
  );
};
