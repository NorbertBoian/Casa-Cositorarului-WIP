"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { imageGallery } from "./Photos.module.css";
import { Gallery } from "../components/Gallery";

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

export const PhotosClient = ({ images }) => {
  const imageGalleryRef = useRef<HTMLUListElement>(null);

  const [openAtIndex, setOpenAtIndex] = useState(undefined);

  const openGallery = (event) => {
    setOpenAtIndex(+event.currentTarget.dataset.index);
    imageGalleryRef.current.showModal();
  };
  return (
    <>
      <ul className={imageGallery} ref={imageGalleryRef}>
        {images.map((image, index) => (
          <li key={image.id} data-index={index} onClick={openGallery}>
            <Image
              fill
              sizes="30vw"
              src={image.src}
              loader={imageLoader}
              alt=""
            />
          </li>
        ))}
      </ul>
      <Gallery
        images={images}
        modalRef={imageGalleryRef}
        openAt={openAtIndex}
      />
    </>
  );
};
