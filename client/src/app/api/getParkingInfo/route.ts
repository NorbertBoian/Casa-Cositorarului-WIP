import { NextResponse } from "next/server";
import { editorClient as sanity } from "@/app/sanityClient";
import { XMLParser as XMLParserCreator } from "fast-xml-parser";

const XMLParser = new XMLParserCreator();

export async function GET() {
  const parkingDataResponse = await fetch(
    "https://s3.eu-central-1.amazonaws.com/tpark-configs/TPARK/parcare.xml",
  );
  const parkingDataXML = await parkingDataResponse.text();
  const parkingData = XMLParser.parse(parkingDataXML);

  const sighisoaraData = parkingData.cities.city.find(
    (city) => city.cityname === "Sighișoara",
  );

  const zoneA = {};
  const zoneB = {};
  const zoneC = {};

  const zones = { A: zoneA, B: zoneB, C: zoneC };

  const dow = {
    dow1: "monday",
    dow2: "tuesday",
    dow3: "wednesday",
    dow4: "thursday",
    dow5: "friday",
    dow6: "saturday",
    dow7: "sunday",
  };

  const schedule = {};

  for (const day in sighisoaraData.zones.zone[0].schedule) {
    schedule[dow[day]] = sighisoaraData.zones.zone[0].schedule[day] || {
      start: "",
      end: "",
    };
  }

  sighisoaraData.zones.zone.forEach((zone) => {
    let payment;
    let duration;
    let priceKey;
    let zoneLetter;
    if (zone.sms === "Y") {
      payment = "sms";
      priceKey = "price";
    } else if (zone.card === "Y") {
      priceKey = "pricecard";
      payment = "card";
    }
    if (zone.durationminutes == 60) duration = "hourly";
    else if (zone.durationminutes == 1440 || zone.durationminutes == -2)
      duration = "daily";
    if (zone.name.includes("A")) zoneLetter = "A";
    else if (zone.name.includes("B")) zoneLetter = "B";
    else if (zone.name.includes("C")) zoneLetter = "C";
    if (payment && duration && priceKey && zoneLetter) {
      Object.assign(zones[zoneLetter], {
        [payment]: {
          ...(zones[zoneLetter][payment] ?? {}),
          [duration]: zone[priceKey],
        },
      });
    }
  });

  try {
    await sanity
      .patch("9329b9b1-037b-4388-ad4f-ca332e963602") // Document ID to patch
      .set({
        schedule,
        zoneA: { hourlyPrice: zoneA.card.hourly, dailyPrice: zoneA.card.daily },
        zoneB: { hourlyPrice: zoneB.card.hourly, dailyPrice: zoneB.card.daily },
        zoneC: { hourlyPrice: zoneC.card.hourly, dailyPrice: zoneC.card.daily },
      }) // Shallow merge
      .commit();
    return NextResponse.json("Updated");
  } catch (err) {
    return NextResponse.json(err.message);
  }
}
