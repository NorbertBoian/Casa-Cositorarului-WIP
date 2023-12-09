import { getDictionary } from "@/get-dictionary";
import { BottomBar } from "@components/BottomBar/BottomBar";
import { Contact } from "@components/Contact/Contact";
import { Home } from "@components/Home/Home";
import { Info } from "@components/Info/Info";
import { Menu } from "@components/Menu/Menu";
import { Photos } from "@components/Photos/Photos";
import { Rooms } from "@components/Rooms/Rooms";
import { TopBar } from "@components/TopBar/TopBar";
import { UiWrapper } from "@components/UiWrapperComponent/UiWrapper";
import { AppWrapper } from "./AppWrapper";
import { cookies } from "next/headers";

export default async function Page({
  params,
  searchParams,
}: {
  params: any;
  searchParams: any;
}) {
  const consented = cookies().get("consented")?.value === "true";

  const lang = params.slug?.[0] ?? "en";
  const page = params.slug?.[1] ?? "home";
  const dictionary = await getDictionary(lang);

  const pages = {
    home: <Home key="home" lang={lang} dictionary={dictionary} />,
    menu: (
      <Menu
        key="menu"
        lang={lang}
        dictionary={dictionary}
        searchParams={searchParams}
      />
    ),
    rooms: <Rooms key="rooms" lang={lang} dictionary={dictionary} />,
    information: <Info key="information" lang={lang} dictionary={dictionary} />,
    contact: <Contact key="contact" lang={lang} dictionary={dictionary} />,
    photos: <Photos key="photos" lang={lang} dictionary={dictionary} />,
  };

  return (
    <AppWrapper
      currentSegment={page}
      pages={pages}
      searchParams={searchParams}
      consented={consented}
      topBar={
        <UiWrapper searchParams={searchParams}>
          <TopBar dictionary={dictionary} lang={lang} />
        </UiWrapper>
      }
      bottomBar={
        <UiWrapper searchParams={searchParams}>
          <BottomBar dictionary={dictionary} />
        </UiWrapper>
      }
      dictionary={dictionary}
      lang={lang}
    />
  );
}
