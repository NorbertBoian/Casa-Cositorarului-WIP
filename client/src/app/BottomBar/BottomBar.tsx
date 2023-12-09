import { dictionaryType } from "@/get-dictionary";
import {
  bottomBar,
  phoneNumber,
  bookNow,
  curvedShapeContainer,
  bookNowLink,
} from "./BottomBar.module.css";
import Image from "next/image";

import curvedShape from "../Navigation/assets/curvedShape.svg";

export const BottomBar = ({
  dictionary,
  className,
}: {
  dictionary: dictionaryType;
  className?: string;
}) => {
  return (
    <div className={`${bottomBar} ${className ?? ""}`}>
      <div className={phoneNumber}>+40 721 818 695</div>
      <div className={bookNow}>
        <a className={bookNowLink}>Book now</a>
        <Image className={curvedShapeContainer} src={curvedShape} alt="" />
      </div>
    </div>
  );
};
