import { NextResponse } from "next/server";
import { editorClient as sanity } from "@/app/sanityClient";

export async function GET() {
  let doubleRegularPrice;
  let doubleSuperiorPrice;
  let familySuperiorPrice;
  let breakfastPrice;
  let isGeniusAffiliate;

  const date = new Date();
  const timer = () => new Promise((res) => setTimeout(res, 300));

  while (
    doubleRegularPrice === undefined ||
    doubleSuperiorPrice === undefined ||
    familySuperiorPrice === undefined ||
    breakfastPrice === undefined ||
    isGeniusAffiliate === undefined
  ) {
    await timer();

    const nextDate = new Date(date);
    nextDate.setDate(nextDate.getDate() + 1);
    const bookingPageResponse = await fetch(
      `https://www.booking.com/hotel/ro/casa-cositorarului.en-gb.html?checkin=${date.getFullYear()}-${
        date.getMonth() + 1
      }-${date.getDate()}&checkout=${nextDate.getFullYear()}-${
        nextDate.getMonth() + 1
      }-${nextDate.getDate()}&group_adults=2&group_children=0&no_rooms=1&selected_currency=RON`,
      {
        headers: {
          accept:
            "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
          "accept-language": "en-US,en;q=0.9",
          "cache-control": "no-cache",
          pragma: "no-cache",
          "sec-fetch-dest": "document",
          "sec-fetch-mode": "navigate",
          "sec-fetch-user": "?1",
          "upgrade-insecure-requests": "1",
          "User-Agent":
            "Mozilla/5.0 (Linux; U; Android 5.1; SAMSUNG SM-G925M Build/LRX22G) AppleWebKit/535.2 (KHTML, like Gecko)  Chrome/53.0.2037.220 Mobile Safari/601.8",
        },
      },
    );

    const bookingPageHtmlString = await bookingPageResponse.text();

    if (
      doubleRegularPrice === undefined ||
      doubleSuperiorPrice === undefined ||
      familySuperiorPrice === undefined
    ) {
      const bookingRoomsInfoString = bookingPageHtmlString.match(
        /(?<=b_room_blocks_json: ).*?(?=,?\n|$)/,
      );
      if (bookingRoomsInfoString) {
        const bookingRoomsInfo = JSON.parse(bookingRoomsInfoString[0]);

        for (const room in bookingRoomsInfo) {
          const { pricePerNight, roomName } = bookingRoomsInfo[room];
          if (
            roomName === "Superior Family Room" &&
            familySuperiorPrice === undefined
          )
            familySuperiorPrice = +pricePerNight;
          else if (
            roomName === "Superior Double Room" &&
            doubleSuperiorPrice === undefined
          )
            doubleSuperiorPrice = +pricePerNight;
          else if (
            roomName === "Double or Twin Room" &&
            doubleRegularPrice === undefined
          )
            doubleRegularPrice = +pricePerNight;
        }
      }
    }

    if (breakfastPrice === undefined) {
      const mealPlanPricesString = bookingPageHtmlString.match(
        /(?<=b_mealplan_prices\\":).*?(?=,?\\"b_|\n|$)/,
      );
      if (mealPlanPricesString) {
        const mealPlanPrices = JSON.parse(
          mealPlanPricesString[0].replaceAll("\\", ""),
        );

        breakfastPrice = +mealPlanPrices.breakfast.slice(0, -4);
      }
    }

    if (isGeniusAffiliate === undefined) {
      const isGeniusAffiliateMatch = bookingPageHtmlString.match(
        /(?<=isGeniusAffiliate":).*?(?=,|\n|$)/,
      );
      if (isGeniusAffiliateMatch)
        isGeniusAffiliate = isGeniusAffiliateMatch[0] === "true";
    }

    date.setDate(date.getDate() + 1);
  }

  doubleRegularPrice = Math.round(
    doubleRegularPrice * (1 - 0.1 * +isGeniusAffiliate),
  );
  doubleSuperiorPrice = Math.round(
    doubleSuperiorPrice * (1 - 0.1 * +isGeniusAffiliate),
  );
  familySuperiorPrice = Math.round(
    familySuperiorPrice * (1 - 0.1 * +isGeniusAffiliate),
  );

  try {
    await sanity
      .patch("9329b9b1-037b-4388-ad4f-ca332e963602") // Document ID to patch
      .set({
        doubleRegularPrice,
        doubleSuperiorPrice,
        familySuperiorPrice,
        breakfastPrice,
      }) // Shallow merge
      .commit();
    return NextResponse.json("Updated");
  } catch (err) {
    return NextResponse.json(err.message);
  }
}
