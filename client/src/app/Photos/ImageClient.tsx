"use client";
import Image from "next/image";

interface Params {
  src: string;
  width: number;
  quality?: number;
}

const imageLoader = ({ src, width, quality }: Params) => {
  const newSrc = src.replace(
    /(?<=^(?:[^/]*\/){5}[^/]*)\//,
    `/w_${width},q_${quality || 75}/`,
  );
  return newSrc;
};

export const ImageClient = ({ image }) => (
  <Image fill sizes="100vw" src={image.image} loader={imageLoader} alt="" />
);
