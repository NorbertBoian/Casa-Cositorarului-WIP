import Image from "next/image";

import {
  main,
  checkIn,
  checkOut,
  mainContent,
  paper,
  highlightedFacilities,
  reviewsList,
  skyContainer,
  sky,
  reviewsListBar,
  sighisoara,
  grunge,
  concentric,
  concentricWrapperContainer,
  restaurantHoursWeekdaysAndHours,
  scrollable,
  reviewScore,
  hours,
  concentricWrapper,
  firstRow,
  directionsButtonContainer,
  getDirections,
  floralPattern,
  bookingLogo,
  tripadvisorLogo,
  googleLogo,
  restaurantHoursHeadline,
  buttons,
  menuButton,
  roomsButton,
  restaurantHoursWeekdays,
  restaurantHoursHours,
  headline,
  keepScrolling,
  headlineContainer,
  headlineOutline,
  keepScrollingContainer,
  headlineAndConcentric,
  mainThing,
  purpleHaze,
  sighisoaraContainer,
  imageAndFacilities,
  triangleContainer,
  triangle,
  triangleBorder,
  background,
  checkInCheckOut,
  restaurantHours,
  headlineAndLion,
  lion as lionClass,
  texture,
  sighisoaraMobileContainer,
} from "./Home.module.css";

import { cloud } from "./clouds.module.css";

import concentricSvg from "@/app/[[...slug]]/assets/concentric.svg";
import bookingSvg from "@/app/[[...slug]]/assets/booking.svg";
import tripadvisorSvg from "@/app/[[...slug]]/assets/tripadvisor.svg";
import googleSvg from "@/app/[[...slug]]/assets/google.svg";
import cloudAvif from "@/app/[[...slug]]/assets/cloud3.avif";
import sighisoaraMedium from "@/app/[[...slug]]/assets/sighisoara12.avif";
import sighisoaraImage from "@/app/[[...slug]]/assets/sighisoarac4.avif";
import lion from "@/app/[[...slug]]/assets/lion2.avif";
import sighisoaraLarge from "@/app/[[...slug]]/assets/sighisoara17.avif";
import sighisoaraSmall from "@/app/[[...slug]]/assets/sighisoara18.avif";
import sighisoaraMobile from "@/app/[[...slug]]/assets/sighisoarat.avif";

import { Playfair_Display } from "next/font/google";

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair-display",
});

export const Home = () => {
  return (
    <section id="home" className={main}>
      <div className={grunge}></div>
      <div className={paper}></div>
      <div className={scrollable}>
        <div className={mainThing}>
          <ul className={reviewsList}>
            <li>
              <div className={bookingLogo}>
                <Image fill src={bookingSvg} alt="" sizes="10vw" />
              </div>
              <div className={reviewScore}>9.1/10</div>
            </li>
            <li>
              <div className={tripadvisorLogo}>
                <Image fill src={tripadvisorSvg} alt="" sizes="10vw" />
              </div>
              <div className={reviewScore}>4.2/5</div>
            </li>
            <li>
              <div className={googleLogo}>
                <Image fill src={googleSvg} alt="" sizes="10vw" />
              </div>
              <div className={reviewScore}>4.4/10</div>
            </li>
          </ul>
          <div className={mainContent}>
            <div className={headlineAndLion}>
              <div className={lionClass}>
                <Image src={lion} alt="" unoptimized fill sizes="10vw" />
              </div>
              <h1 className={`${headline} ${playfairDisplay.className}`}>
                Stay in the Heart of
                <br />
                Sighisoara Citadel at
                <br />
                <span>Casa Cositorarului.</span>
                <div className={headlineOutline}>
                  Stay in the Heart of
                  <br />
                  Sighisoara Citadel at
                  <br />
                  <span>Casa Cositorarului.</span>
                </div>
              </h1>
            </div>
            <div className={restaurantHours}>
              <h4
                className={`${restaurantHoursHeadline} ${playfairDisplay.className}`}
              >
                Restaurant hours
              </h4>
              <div className={restaurantHoursWeekdaysAndHours}>
                <div className={restaurantHoursWeekdays}>Monday-Sunday :</div>
                <div className={restaurantHoursHours}>08:00 : 22:00</div>
              </div>
            </div>

            <div className={checkInCheckOut}>
              <div className={checkIn}>
                <h4 className={playfairDisplay.className}>Check In</h4>
                <div>14:00 - 22:00</div>
              </div>

              <div className={checkOut}>
                <h4 className={playfairDisplay.className}>Check Out</h4>
                <div>09:00 - 11:00</div>
              </div>
            </div>
            <div className={`${buttons} ${playfairDisplay.variable}`}>
              <a className={getDirections}>Get directions</a>
              <a className={menuButton}>Restaurant menu</a>
              <a className={roomsButton}>Rooms</a>
            </div>
            <div className={keepScrolling}>Scroll for more information</div>
            <div className={sighisoaraMobileContainer}>
              <Image
                fill
                src={sighisoaraMobile}
                alt=""
                unoptimized
                sizes="100vw"
              />
            </div>
          </div>
          <div className={imageAndFacilities}>
            <div className={triangleContainer}>
              <div className={sighisoaraContainer}>
                <Image
                  fill
                  src={sighisoaraImage}
                  alt=""
                  unoptimized
                  sizes="100vw"
                />
              </div>
              <div className={triangleBorder}>
                <div className={triangle}></div>
              </div>
            </div>
            <ul className={highlightedFacilities}>
              <li>Pet friendly</li>
              <li>Family rooms</li>
              <li>Non-smoker rooms</li>
              <li>Free Wi-Fi in rooms</li>
              <li>Breakfast</li>
              <li>Café-bar</li>
              <li>Outdoor terrace</li>
            </ul>
          </div>
        </div>
        <div className={texture}></div>
      </div>
    </section>
  );
};
