"use client";
import {
  thumbnail,
  bigImageContainer,
  galleryContainer,
  thumbnails,
  bigImageContainerWrapper,
  bigImage,
  thumbnailContainer,
  leftButton,
  rightButton,
  fullscreenAndCloseButtons,
  fullscreenButton,
  closeButton,
  leftButtonWrapper,
  rightButtonWrapper,
  selected,
  thumbnailsContainer,
  dialogContent,
  leftChevronIcon as leftChevronIconClass,
  rightChevronIcon as rightChevronIconClass,
  fullscreenIcon as fullscreenIconClass,
  closeIcon as closeIconClass,
} from "./Gallery.module.css";

import Image from "next/image";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

import closeIcon from "../Rooms/assets/close.svg";
import fullscreenIcon from "../Rooms/assets/fullscreen.svg";
import leftChevronIcon from "../Rooms/assets/leftChevron.svg";
import rightChevronIcon from "../Rooms/assets/rightChevron.svg";

export const Gallery = ({ images, modalRef, openAt = undefined }) => {
  const [selectedImage, setSelectedImage] = useState(0);

  const closeModal = () => {
    modalRef.current.close();
    if (document.fullscreenElement) document.exitFullscreen();
  };

  //temporary patch
  useLayoutEffect(() => {
    if (openAt !== undefined) setSelectedImage(openAt);
  }, [openAt]);

  const thumbnailsListRef = useRef<HTMLUListElement>(null);
  const dialogContentRef = useRef<HTMLDivElement>(null);

  const nextImage = () => {
    setSelectedImage((prevState) =>
      prevState + 1 > images.length - 1 ? 0 : prevState + 1,
    );
  };

  const prevImage = () => {
    setSelectedImage((prevState) =>
      prevState - 1 < 0 ? images.length - 1 : prevState - 1,
    );
  };

  const changeImage = (event) => {
    setSelectedImage(+event.currentTarget.dataset.index);
  };

  useEffect(() => {
    thumbnailsListRef.current?.children[selectedImage].scrollIntoView({
      inline: "center",
      block: "center",
    });
  }, [selectedImage]);

  const handleFullscreen = () => {
    if (document.fullscreenElement) document.exitFullscreen();
    else dialogContentRef.current?.requestFullscreen();
  };

  return (
    <dialog className={galleryContainer} ref={modalRef}>
      <div className={dialogContent} ref={dialogContentRef}>
        <div className={bigImageContainerWrapper}>
          <div className={bigImageContainer}>
            <Image
              className={bigImage}
              src={images[selectedImage]}
              alt=""
              fill
              sizes="100vw"
            />
          </div>
          <div className={leftButtonWrapper}>
            <button className={leftButton} onClick={prevImage}>
              <Image
                className={leftChevronIconClass}
                src={leftChevronIcon}
                alt=""
              />
            </button>
          </div>
          <div className={rightButtonWrapper}>
            <button className={rightButton} onClick={nextImage}>
              <Image
                className={rightChevronIconClass}
                src={rightChevronIcon}
                alt=""
              />
            </button>
          </div>
          <div className={fullscreenAndCloseButtons}>
            <button className={fullscreenButton} onClick={handleFullscreen}>
              <Image
                className={fullscreenIconClass}
                src={fullscreenIcon}
                alt=""
              />
            </button>
            <button className={closeButton} onClick={closeModal}>
              <Image className={closeIconClass} src={closeIcon} alt="" />
            </button>
          </div>
        </div>
        <div className={thumbnailsContainer}>
          <ul className={thumbnails} ref={thumbnailsListRef}>
            {images.map((image, index) => (
              <li
                className={`${thumbnailContainer} ${
                  index === selectedImage ? selected : ""
                }`}
                key={image.id ?? image.src}
                data-index={index}
                style={{ aspectRatio: image.width / image.height }}
                onClick={changeImage}
              >
                <Image src={image} alt="" fill sizes="10vw" />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </dialog>
  );
};
