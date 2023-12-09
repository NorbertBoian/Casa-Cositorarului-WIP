"use client";
import {
  rooms,
  photos,
  mainPhoto,
  container,
  photo,
  viewMore,
  nightlyPriceContainer,
  nightlyPriceText,
  nightlyPriceValueAndCurrency,
  breakfastPriceValueAndCurrency,
  nightlyPriceValue,
  breakfastPriceContainer,
  breakfastPriceText,
  breakfastPriceValue,
  open360Button,
  currency,
  roomNameAndBookNow,
  pricesContainer,
  roomNameAndSquareMeters,
  roomName,
  squareMeters,
  bookNow,
  mainPhotoContainer,
  roomFooter,
  guests,
  guestsValue,
  guestsText,
  roomFacilities,
  roomBeds,
  guestsAndFacilities,
  peopleIcon,
  peopleIcons,
  roomsList,
  roomSquareMeters,
  selectedRoomNameBig,
  rightSide,
  pricesAndOpen360,
  peopleIconsAndSquareMeters,
  open360AndBookNow,
  mainPhotoWrapper,
  selectedRoomNameMobile,
  morePhotos,
  guestsAndSquareMeters,
  line,
  selected,
} from "./Rooms.module.css";

import { cover, image1 as image1Class } from "./images.module.css";

import Image from "next/image";

import { useState, MouseEvent, useEffect, useRef, useContext } from "react";
import { Playfair_Display } from "next/font/google";
import { roomsArray } from "./roomsArray";
import { dictionaryType } from "@/get-dictionary";
import { Gallery } from "../components/Gallery";
import "./customPannellumStyles.css";
import { Gallery360 } from "../components/Gallery360";
import { ClientLangContext } from "../[[...slug]]/LazyMotionWrapper";

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair-display",
});

export const Rooms = ({ dictionary }: { dictionary: dictionaryType }) => {
  const [selectedRoom, setSelectedRoom] = useState(0);
  const lang = useContext(ClientLangContext);
  const [crawledPrices, setCrawledPrices] = useState({});

  const handleSelectRoom = (event: MouseEvent<HTMLLIElement>) => {
    setSelectedRoom(+event.currentTarget.dataset.index);
  };

  const updatePrices = async () => {
    const crawledPricesResponse = await fetch(
      `${window.location.origin}/api/crawled`,
    );
    const crawledPrices = await crawledPricesResponse.json();
    setCrawledPrices(crawledPrices);
  };

  useEffect(() => {
    updatePrices();
  }, []);

  const regularGalleryModalRef = useRef<HTMLDialogElement>(null);
  const threeSixtyGalleryModalRef = useRef<HTMLDialogElement>(null);
  const threeSixtyGalleryViewerRef = useRef<HTMLDivElement>(null);

  const [open360, setOpen360] = useState(false);

  const openThreeSixty = () => {
    setOpen360(true);
  };

  const [openAtIndex, setOpenAtIndex] = useState<number | undefined>(undefined);

  const openGallery = (event) => {
    const index = Number(event.currentTarget.dataset.index ?? 0);
    setOpenAtIndex(index);
    regularGalleryModalRef.current?.showModal();
  };

  return (
    <section id="rooms" className={rooms}>
      <ul className={roomsList}>
        {roomsArray.map((room, index) => (
          <li
            onClick={handleSelectRoom}
            data-index={index}
            key={index}
            className={selectedRoom === index ? selected : ""}
          >
            <div className={roomName}>{room.shortName[lang]}</div>
            <div className={peopleIconsAndSquareMeters}>
              <div className={peopleIcons}>
                {Array.from({ length: room.guests }, (v, i) => (
                  <div className={peopleIcon} key={i}></div>
                ))}
              </div>
              <div className={roomSquareMeters}>{`${room.squareMeters}m²`}</div>
            </div>
          </li>
        ))}
      </ul>
      <div className={container}>
        <div className={mainPhotoContainer}>
          <div className={mainPhotoWrapper}>
            <div className={mainPhoto}>
              <Image
                src={roomsArray[selectedRoom].mainImage}
                alt=""
                fill
                sizes="100vw"
              />
            </div>
          </div>
        </div>
        <ul className={photos}>
          {roomsArray[selectedRoom].images.slice(0, 4).map((image, index) => (
            <li key={image.src} data-index={index} onClick={openGallery}>
              <div className={`${photo} ${image1Class} ${cover}`}>
                <Image src={image} alt="" fill sizes="20vw" />
              </div>
              {index === 3 ? (
                <div className={viewMore}>
                  {dictionary.rooms.viewXMorePhotos.replace(
                    "X",
                    `${roomsArray[selectedRoom].images.length - 4}`,
                  )}
                </div>
              ) : null}
            </li>
          ))}
        </ul>
        <div className={rightSide}>
          <div className={pricesAndOpen360}>
            <div className={pricesContainer}>
              <div className={nightlyPriceContainer}>
                <div className={nightlyPriceText}>
                  {dictionary.rooms.nightlyPrice}
                </div>
                <div className={nightlyPriceValueAndCurrency}>
                  <div className={nightlyPriceValue}>
                    {crawledPrices[
                      roomsArray[selectedRoom].crawledDataPriceKey
                    ] ?? ""}
                  </div>
                  <div className={currency}>Lei</div>
                </div>
              </div>
              <div className={breakfastPriceContainer}>
                <div className={breakfastPriceText}>
                  {dictionary.rooms.breakfast}
                </div>
                <div className={breakfastPriceValueAndCurrency}>
                  <div className={breakfastPriceValue}>
                    {crawledPrices.breakfastPrice ?? ""}
                  </div>
                  <div className={currency}>Lei</div>
                </div>
              </div>
            </div>
            <div className={open360AndBookNow}>
              <div className={open360Button} onClick={openThreeSixty}>
                {dictionary.rooms.open360View}
              </div>
              <div className={morePhotos} onClick={openGallery}>
                {dictionary.rooms.morePhotos}
              </div>
            </div>
          </div>
          <div className={roomNameAndBookNow}>
            <div className={bookNow}>{dictionary.rooms.bookThisRoom}</div>
            <div className={roomNameAndSquareMeters}>
              <div className={selectedRoomNameBig}>
                {roomsArray[selectedRoom].fullName[lang]}
              </div>
              <div
                className={squareMeters}
              >{`${roomsArray[selectedRoom].squareMeters} m²`}</div>
            </div>
          </div>
        </div>
      </div>
      <div className={roomFooter}>
        <div className={guestsAndFacilities}>
          <div
            className={`${selectedRoomNameMobile} ${playfairDisplay.className}`}
          >
            {roomsArray[selectedRoom].fullName[lang]}
          </div>
          <div className={guestsAndSquareMeters}>
            <div className={guests}>
              <div className={peopleIcons}>
                {Array.from(
                  { length: roomsArray[selectedRoom].guests },
                  (v, i) => (
                    <div className={peopleIcon} key={i}></div>
                  ),
                )}
              </div>
              <div className={guestsValue}>
                {roomsArray[selectedRoom].guests}
              </div>
              <div className={guestsText}>{dictionary.rooms.guests}</div>
            </div>
            <div
              className={squareMeters}
            >{`${roomsArray[selectedRoom].squareMeters} m²`}</div>
            <div className={roomBeds}>
              {roomsArray[selectedRoom].beds
                .map(
                  (bed, i, arr) =>
                    `${i === arr.length - 1 ? `${dictionary.rooms.and} ` : ""}${
                      bed.number
                    } ${dictionary.rooms[bed.short]}`,
                )
                .join(" ")}
            </div>
          </div>
          <div className={line}></div>
          <ul className={roomFacilities}>
            {roomsArray[selectedRoom].facilities.map((facility) => (
              <li key={facility}>{dictionary.rooms[facility]}</li>
            ))}
          </ul>
        </div>
        <div className={roomBeds}>
          {roomsArray[selectedRoom].beds
            .map(
              (bed, i, arr) =>
                `${i === arr.length - 1 ? `${dictionary.rooms.and} ` : ""}${
                  bed.number
                } ${dictionary.rooms[bed.full]}`,
            )
            .join(" ")}
        </div>
      </div>
      <Gallery
        openAt={openAtIndex}
        images={roomsArray[selectedRoom].images}
        modalRef={regularGalleryModalRef}
      />
      <Gallery360
        images={roomsArray[selectedRoom].threeSixty}
        modalRef={threeSixtyGalleryModalRef}
        viewerRef={threeSixtyGalleryViewerRef}
        open={open360}
        setOpen={setOpen360}
      />
    </section>
  );
};
