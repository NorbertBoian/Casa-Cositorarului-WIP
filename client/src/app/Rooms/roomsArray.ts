import doubleRegular360 from "../Rooms/roomImages/doubleRegular/doubleRegular360.png";
import doubleRegularBathroom360 from "../Rooms/roomImages/doubleRegular/doubleRegularBathroom360.png";
import familyRoom360 from "../Rooms/roomImages/familySuperior/familyRoom360.png";
import familyRoomBathroom360 from "../Rooms/roomImages/familySuperior/familyRoomBathroom360.png";
import doubleRegular1 from "../Rooms/roomImages/doubleRegular/1.jpg";
import doubleRegular2 from "../Rooms/roomImages/doubleRegular/2.jpg";
import doubleRegular3 from "../Rooms/roomImages/doubleRegular/3.jpg";
import doubleRegular4 from "../Rooms/roomImages/doubleRegular/4.jpg";
import doubleRegular5 from "../Rooms/roomImages/doubleRegular/5.jpg";
import doubleRegular6 from "../Rooms/roomImages/doubleRegular/6.jpg";
import doubleRegular7 from "../Rooms/roomImages/doubleRegular/7.jpg";
import doubleRegular8 from "../Rooms/roomImages/doubleRegular/8.jpg";
import doubleRegular9 from "../Rooms/roomImages/doubleRegular/9.jpg";
import doubleRegular10 from "../Rooms/roomImages/doubleRegular/10.jpg";
import doubleSuperior1 from "../Rooms/roomImages/doubleSuperior/1.jpg";
import doubleSuperior2 from "../Rooms/roomImages/doubleSuperior/2.jpg";
import doubleSuperior3 from "../Rooms/roomImages/doubleSuperior/3.jpg";
import doubleSuperior4 from "../Rooms/roomImages/doubleSuperior/4.jpg";
import doubleSuperior5 from "../Rooms/roomImages/doubleSuperior/5.jpg";
import doubleSuperior6 from "../Rooms/roomImages/doubleSuperior/6.jpg";
import doubleSuperior7 from "../Rooms/roomImages/doubleSuperior/7.jpg";
import doubleSuperior8 from "../Rooms/roomImages/doubleSuperior/8.jpg";
import doubleSuperior9 from "../Rooms/roomImages/doubleSuperior/9.jpg";
import doubleSuperior10 from "../Rooms/roomImages/doubleSuperior/10.jpg";
import doubleSuperior11 from "../Rooms/roomImages/doubleSuperior/11.jpg";
import doubleSuperior12 from "../Rooms/roomImages/doubleSuperior/12.jpg";
import doubleSuperior13 from "../Rooms/roomImages/doubleSuperior/13.jpg";
import familySuperior1 from "../Rooms/roomImages/familySuperior/1.jpg";
import familySuperior2 from "../Rooms/roomImages/familySuperior/2.jpg";
import familySuperior3 from "../Rooms/roomImages/familySuperior/3.jpg";
import familySuperior4 from "../Rooms/roomImages/familySuperior/4.jpg";
import familySuperior5 from "../Rooms/roomImages/familySuperior/5.jpg";

export const roomsArray = [
  {
    shortName: { en: "Double regular", ro: "Dubla" },
    fullName: { en: "Regular double room", ro: "Camera dubla" },
    crawledDataPriceKey: "doubleRegularPrice",
    squareMeters: 25,
    guests: 2,
    mainImage: doubleRegular360,
    threeSixty: [doubleRegular360, doubleRegularBathroom360],
    images: [
      doubleRegular1,
      doubleRegular2,
      doubleRegular3,
      doubleRegular4,
      doubleRegular5,
      doubleRegular6,
      doubleRegular7,
      doubleRegular8,
      doubleRegular9,
      doubleRegular10,
    ],
    facilities: [
      "airConditioning",
      "freeWifi",
      "groundFloor",
      "ensuiteBathroom",
    ],
    beds: [
      { full: "extraLargeDoubleBed", short: "doubleBed", number: 1 },
      { full: "sofaBed", short: "sofaBed", number: 1 },
    ],
  },
  {
    shortName: { en: "Double superior", ro: "Dubla superioara" },
    fullName: { en: "Superior double room", ro: "Camera dubla superioara" },
    crawledDataPriceKey: "doubleSuperiorPrice",
    squareMeters: 35,
    guests: 2,
    mainImage: doubleSuperior12,
    threeSixty: [familyRoom360, familyRoomBathroom360], //filler
    images: [
      doubleSuperior1,
      doubleSuperior2,
      doubleSuperior3,
      doubleSuperior4,
      doubleSuperior5,
      doubleSuperior6,
      doubleSuperior7,
      doubleSuperior8,
      doubleSuperior9,
      doubleSuperior10,
      doubleSuperior11,
      doubleSuperior12,
      doubleSuperior13,
    ],
    facilities: [
      "airConditioning",
      "freeWifi",
      "groundFloor",
      "ensuiteBathroom",
    ],
    beds: [
      { full: "extraLargeDoubleBed", short: "doubleBed", number: 1 },
      { full: "sofaBed", short: "sofaBed", number: 1 },
    ],
  },
  {
    shortName: { en: "Family superior", ro: "Familie superioara" },
    fullName: { en: "Superior family room", ro: "Camera familie superioara" },
    crawledDataPriceKey: "familySuperiorPrice",
    squareMeters: 35,
    guests: 2,
    mainImage: familyRoom360,
    threeSixty: [familyRoom360, familyRoomBathroom360],
    images: [
      familySuperior1,
      familySuperior2,
      familySuperior3,
      familySuperior4,
      familySuperior5,
    ],
    facilities: [
      "airConditioning",
      "freeWifi",
      "groundFloor",
      "ensuiteBathroom",
    ],
    beds: [
      { full: "extraLargeDoubleBed", short: "doubleBed", number: 1 },
      { full: "sofaBed", short: "sofaBed", number: 1 },
    ],
  },
];
