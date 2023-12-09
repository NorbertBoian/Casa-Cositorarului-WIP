import {
  information,
  generalInfo,
  facilitiesList,
  guesthouseDirectionsRow,
  a,
  b,
  c,
  d,
  e,
  f,
  o,
  barrier as barrierClass,
  barrierImage as barrierImageClass,
  firstRow,
  atmLine,
  taxisList,
  taxiEntry,
  taxiPhone,
  taxiApp,
  appStores,
  clockTower as clockTowerClass,
  redButton,
  parkingHeadline,
  parkingSpotsMap,
  openStreetViewButton,
  directionsButton,
  blueButton,
  atmName,
  brownButton,
  brownishButton,
  greenButton,
  turqoiseButton,
  goldButton,
  purpleButton,
  poiLine,
  atmList,
  someList,
} from "./Info.module.css";

import barrier from "./assets/barrier.png";
import barrierParking from "./assets/barrierParking.png";
import clockTower from "./assets/clockTower.png";
import octavianGogaSquare from "./assets/octavianGogaSquare.png";
import moriiStreet from "./assets/moriiStreet.png";
import churchOnTheHill from "./assets/churchOnTheHill.jpg";
import coveredStairway from "./assets/coveredStairway.jpg";
import breite from "./assets/breite.jpg";
import cemetery from "./assets/cemetery.jpg";
import museum from "./assets/museum.jpeg";
import schoolOnTheHill from "./assets/schoolOnTheHill.png";

import Image from "next/image";
import { getCrawledData } from "../[[...slug]]/getCrawledData";

export const Info = async () => {
  const crawledPrices = await getCrawledData();

  return (
    <section id="information" className={information}>
      <div className={guesthouseDirectionsRow}>
        <h3 className={parkingHeadline}>Guesthouse</h3>
        <button>Directions</button>
      </div>
      <div className={generalInfo}>
        <div>
          <h4>Address</h4>
          <div>Strada Cositorarilor 8-9, Sighișoara</div>
        </div>
        <div>
          <h4>Check In</h4>
          <div>14:00 - 22:00</div>
        </div>
        <div>
          <h4>Check Out</h4>
          <div>09:00 - 11:00</div>
        </div>
        <div>
          <h4>Restaurant hours</h4>
          <div>Monday-Sunday : 08:00 : 22:00</div>
        </div>
        <div>
          <h4>Accepted payment methods</h4>
          <div>Cash only</div>
        </div>
        <div>
          <h4>Languages spoken</h4>
          <div>English and Romanian</div>
        </div>
        <div>
          <h4>Pets</h4>
          <div>Pets are allowed on request. Charges may be applicable.</div>
        </div>
        <div>
          <h4>Children</h4>
          <div>Children below 2 years of age stay for free.</div>
        </div>
        <div>
          <h4>Highlighted facilities</h4>
          <ul className={facilitiesList}>
            <li>Family rooms</li>
            <li>Non-smoker rooms</li>
            <li>Free Wi-Fi in rooms</li>
            <li>Breakfast</li>
            <li>Café-bar</li>
            <li>Outdoor terrace</li>
          </ul>
        </div>
      </div>
      <div className={parkingSpotsMap}>
        <h4 className={parkingHeadline}>Parking spots and landmarks map</h4>
        <div className={b}>
          <button className={redButton}>Open</button>
          <button className={redButton}>Download</button>
        </div>
      </div>
      <div>
        <h3>Entering the citadel by car</h3>
        <div>
          There is only one car accessible entrace to the citadel, guarded by a
          barrier.
        </div>
        <div className={barrierClass}>
          <Image src={barrier} alt="bariera" className={barrierImageClass} />
          <button className={openStreetViewButton}>Open street view</button>
        </div>
        <div className={firstRow}>
          <div className={a}>
            <h5>Distance from guesthouse</h5>
            <div className={b}>
              <div>350 m</div>
              <div>6 minutes walk</div>
            </div>
          </div>
          <button className={directionsButton}>
            Directions to car entrance
          </button>
        </div>
        <div>
          The gatekeeper will open it for you, but you will need not to exceed
          20 minutes in the citadel before leaving.
          <br />
          You can use this time to carry your luggage to the guesthouse, then
          park the car at one of the places listed below.
        </div>
      </div>
      <div>
        <h3>Parking spots</h3>
        <div className={atmList}>
          <div>
            <h5>By the barrier</h5>
            <div className={barrierClass}>
              <Image
                src={barrierParking}
                alt="bariera"
                className={barrierImageClass}
              />
              <button className={openStreetViewButton}>Open street view</button>
            </div>
            <div className={firstRow}>
              <div className={e}>
                <div className={d}>
                  <h5>Distance from guesthouse</h5>
                  <div className={f}>
                    <div>350 m</div>
                    <div>6 minutes walk</div>
                  </div>
                </div>
                <div className={d}>
                  <h5>Price</h5>
                  <div>{`${crawledPrices.zoneA.dailyPrice} lei/day`}</div>
                </div>
              </div>
              <button className={directionsButton}>
                Directions to parking spot
              </button>
            </div>
          </div>
          <div>
            <h5>Octavian Goga Square</h5>
            <div className={barrierClass}>
              <Image
                src={octavianGogaSquare}
                alt="octavianGogaSquare"
                className={barrierImageClass}
              />
              <button className={openStreetViewButton}>Open street view</button>
            </div>
            <div className={firstRow}>
              <div className={e}>
                <div className={d}>
                  <h5>Distance from guesthouse</h5>
                  <div className={f}>
                    <div>350 m</div>
                    <div>6 minutes walk</div>
                  </div>
                </div>
                <div className={d}>
                  <h5>Price</h5>
                  <div>{`${crawledPrices.zoneB.dailyPrice} lei/day`}</div>
                </div>
              </div>
              <button className={directionsButton}>
                Directions to parking spot
              </button>
            </div>
          </div>
          <div>
            <h5>Morii Street</h5>
            <div className={barrierClass}>
              <Image
                src={moriiStreet}
                alt="moriiStreet"
                className={barrierImageClass}
              />
              <button className={openStreetViewButton}>Open street view</button>
            </div>
            <div className={firstRow}>
              <div className={e}>
                <div className={d}>
                  <h5>Distance from guesthouse</h5>
                  <div className={f}>
                    <div>350 m</div>
                    <div>6 minutes walk</div>
                  </div>
                </div>
                <div className={d}>
                  <h5>Price</h5>
                  <div>{`${crawledPrices.zoneC.dailyPrice} lei/day`}</div>
                </div>
              </div>
              <button className={directionsButton}>
                Directions to parking spot
              </button>
            </div>
          </div>
        </div>
      </div>
      <div>
        <h3>Parking app - TPark</h3>
        <div className={appStores}>
          <button className={blueButton}>iOS</button>
          <button className={blueButton}>Android</button>
        </div>
      </div>
      <div>
        <h3>Nearby ATMs</h3>
        <div>
          Beware! When withdrawing from a card issued in a foreign currency be
          sure to choose “Without conversion” or “Decline conversion” to avoid
          inflated conversion rates.
        </div>
      </div>
      <div className={atmList}>
        <div>
          <div className={atmLine}>
            <h3 className={atmName}>Banca Transilvania</h3>
          </div>
          <div className={atmLine}>
            <div className={a}>
              <h5>Distance from guesthouse</h5>
              <div className={b}>
                <div>350 m</div>
                <div>6 minutes walk</div>
              </div>
            </div>
            <button>Open maps</button>
          </div>
        </div>
        <div>
          <div className={atmLine}>
            <h3 className={atmName}>Raiffasisen Bank</h3>
          </div>
          <div className={atmLine}>
            <div className={a}>
              <h5>Distance from guesthouse</h5>
              <div className={b}>
                <div>350 m</div>
                <div>6 minutes walk</div>
              </div>
            </div>
            <button>Open maps</button>
          </div>
        </div>
        <div>
          <div className={atmLine}>
            <h3 className={atmName}>CEC</h3>
          </div>
          <div className={atmLine}>
            <div className={a}>
              <h5>Distance from guesthouse</h5>
              <div className={b}>
                <div>350 m</div>
                <div>6 minutes walk</div>
              </div>
            </div>
            <button>Open maps</button>
          </div>
        </div>
        <div>
          <div className={atmLine}>
            <h3 className={atmName}>BRD</h3>
          </div>
          <div className={atmLine}>
            <div className={a}>
              <h5>Distance from guesthouse</h5>
              <div className={b}>
                <div>350 m</div>
                <div>6 minutes walk</div>
              </div>
            </div>
            <button>Open maps</button>
          </div>
        </div>
        <div>
          <div className={atmLine}>
            <h3 className={atmName}>Unicredit</h3>
          </div>
          <div className={atmLine}>
            <div className={a}>
              <h5>Distance from guesthouse</h5>
              <div className={b}>
                <div>350 m</div>
                <div>6 minutes walk</div>
              </div>
            </div>
            <button>Open maps</button>
          </div>
        </div>
        <div>
          <div className={atmLine}>
            <h3 className={atmName}>Intesa Sanpaolo</h3>
          </div>
          <div className={atmLine}>
            <div className={a}>
              <h5>Distance from guesthouse</h5>
              <div className={b}>
                <div>350 m</div>
                <div>6 minutes walk</div>
              </div>
            </div>
            <button>Open maps</button>
          </div>
        </div>
        <div>
          <div className={atmLine}>
            <h3 className={atmName}>BCR</h3>
          </div>
          <div className={atmLine}>
            <div className={a}>
              <h5>Distance from guesthouse</h5>
              <div className={b}>
                <div>350 m</div>
                <div>6 minutes walk</div>
              </div>
            </div>
            <button>Open maps</button>
          </div>
        </div>
        <div>
          <div className={atmLine}>
            <h3 className={atmName}>Techventures</h3>
          </div>
          <div className={atmLine}>
            <div className={a}>
              <h5>Distance from guesthouse</h5>
              <div className={b}>
                <div>350 m</div>
                <div>6 minutes walk</div>
              </div>
            </div>
            <button>Open maps</button>
          </div>
        </div>
      </div>
      <div>
        Although there is a Euronet ATM in the citadel, we recommend avoiding it
        due to its predatory fees practiced on cards issued in foreign
        countries, always prefer the ones operated by banks.
      </div>
      <div>
        <div className={atmLine}>
          <h3 className={atmName}>Euronet</h3>
        </div>
        <div className={atmLine}>
          <div className={a}>
            <h5>Distance from guesthouse</h5>
            <div className={b}>
              <div>350 m</div>
              <div>6 minutes walk</div>
            </div>
          </div>
          <button>Open maps</button>
        </div>
      </div>
      <div>
        <h3>Taxis</h3>
        <div className={taxisList}>
          <div className={taxiEntry}>
            <div className={taxiPhone}>
              <h5>Chic Taxi</h5>
              <div>+40 740 779 000</div>
            </div>
            <div className={taxiApp}>
              <h5>Chic Taxi App</h5>
              <div className={appStores}>
                <button className={blueButton}>iOS</button>
                <button className={blueButton}>Android</button>
              </div>
            </div>
          </div>
          <div>
            <h5>Regal Taxi</h5>
            <div>+40 265 77 88 99</div>
          </div>
          <div>
            <h5>Royal Taxi</h5>
            <div>+40 265 77 77 76</div>
          </div>
          <div>
            <h5>Transaldea Taxi</h5>
            <div>+40 265 77 77 85</div>
          </div>
        </div>
      </div>
      <h3>Emergencies</h3>
      <div className={atmList}>
        <div>
          <h5>General emergencies</h5>
          <div className={taxiEntry}>
            <div className={taxiPhone}>
              <div>Phone Number</div>
              <h3>112</h3>
            </div>
            <div className={taxiApp}>
              <div>App</div>
              <div className={appStores}>
                <button className={redButton}>iOS</button>
                <button className={redButton}>Android</button>
              </div>
            </div>
          </div>
        </div>
        <div>
          <h5>Roadside assistance - ACR</h5>
          <div className={taxiPhone}>
            <div>Phone number</div>
            <div>+40 745 382 715</div>
          </div>
        </div>
      </div>
      <h5>Nearby airports</h5>
      <div className={atmList}>
        <div>
          <div className={firstRow}>
            <h6>Targu Mures (TGM)</h6>
          </div>
          <div className={c}>
            <div className={b}>
              <div>Distance</div>
              <div>66km</div>
            </div>
            <div>
              <span>1 hour</span>
              <span> </span>
              <span>by car</span>
            </div>
          </div>
          <div className={b}>
            <button className={greenButton}>Arrivals</button>
            <button className={brownButton}>Departures</button>
            <button>Open maps</button>
          </div>
        </div>
        <div>
          <div className={firstRow}>
            <h6>Sibiu (SBZ)</h6>
          </div>
          <div className={c}>
            <div className={b}>
              <div>Distance</div>
              <div>101km</div>
            </div>
            <div>
              <span>2 hours</span>
              <span> </span>
              <span>by car</span>
            </div>
          </div>
          <div className={b}>
            <button className={greenButton}>Arrivals</button>
            <button className={brownButton}>Departures</button>
            <button>Open maps</button>
          </div>
        </div>
        <div>
          <div className={firstRow}>
            <h6>Cluj Napoca (CLJ)</h6>
          </div>
          <div className={c}>
            <div className={b}>
              <div>Distance</div>
              <div>166km</div>
            </div>
            <div>
              <span>3 hours</span>
              <span> </span>
              <span>by car</span>
            </div>
          </div>
          <div className={b}>
            <button className={greenButton}>Arrivals</button>
            <button className={brownButton}>Departures</button>
            <button>Open maps</button>
          </div>
        </div>
      </div>
      <div className={firstRow}>
        <h3>Sighisoara Train Station</h3>
      </div>
      <div className={atmLine}>
        <div className={a}>
          <h5>Distance from guesthouse</h5>
          <div className={b}>
            <div>350 m</div>
            <div>6 minutes walk</div>
          </div>
        </div>
        <button>Open maps</button>
      </div>
      <div className={o}>
        <button className={turqoiseButton}>
          Domestic arrivals and departures
        </button>
        <button className={turqoiseButton}>
          International CFR Journey planner
        </button>
      </div>
      <h3>Domestic and international Buses</h3>
      <button className={brownishButton}>
        Sighisoara - Arrivals and departures
      </button>
      <h3>Useful links</h3>
      <div className={atmList}>
        <div>
          <div>General information and city essentials</div>
          <button className={purpleButton}>Romania Tourism</button>
        </div>
        <div>
          <div>Car rental</div>
          <button className={purpleButton}>AutoEurope Car Rental</button>
        </div>
        <div>
          <div>Pay Romanian Road Tax Online</div>
          <button className={purpleButton}>Roviniete.ro</button>
        </div>
        <div>
          <div>Exchange rates</div>
          <button className={purpleButton}>Romanian National Bank</button>
        </div>
      </div>
      <div>
        <h3>Sighisoara points of interest</h3>
        <div className={atmList}>
          <div>
            <h5>Clock tower</h5>
            <Image
              src={clockTower}
              alt="clockTower"
              className={clockTowerClass}
            />
            <div className={poiLine}>
              <div className={a}>
                <h5>Distance from guesthouse</h5>
                <div className={b}>
                  <div>350 m</div>
                  <div>6 minutes walk</div>
                </div>
              </div>
              <div className={b}>
                <button className={brownButton}>See on map</button>
                <button className={brownButton}>Directions </button>
              </div>
            </div>
          </div>
          <div>
            <h5>Church on the hill</h5>
            <Image
              src={churchOnTheHill}
              alt="churchOnTheHill"
              className={clockTowerClass}
            />
            <div className={poiLine}>
              <div className={a}>
                <h5>Distance from guesthouse</h5>
                <div className={b}>
                  <div>350 m</div>
                  <div>6 minutes walk</div>
                </div>
              </div>
              <div className={b}>
                <button className={brownButton}>See on map</button>
                <button className={brownButton}>Directions </button>
              </div>
            </div>
          </div>
          <div>
            <h5>School on the hill</h5>
            <Image
              src={schoolOnTheHill}
              alt="schoolOnTheHill"
              className={clockTowerClass}
            />
            <div className={poiLine}>
              <div className={a}>
                <h5>Distance from guesthouse</h5>
                <div className={b}>
                  <div>350 m</div>
                  <div>6 minutes walk</div>
                </div>
              </div>
              <div className={b}>
                <button className={brownButton}>See on map</button>
                <button className={brownButton}>Directions </button>
              </div>
            </div>
          </div>
          <div>
            <h5>Covered stairway</h5>
            <Image
              src={coveredStairway}
              alt="coveredStairway"
              className={clockTowerClass}
            />
            <div className={poiLine}>
              <div className={a}>
                <h5>Distance from guesthouse</h5>
                <div className={b}>
                  <div>350 m</div>
                  <div>6 minutes walk</div>
                </div>
              </div>
              <div className={b}>
                <button className={brownButton}>See on map</button>
                <button className={brownButton}>Directions </button>
              </div>
            </div>
          </div>
          <div>
            <h5>The History Museum</h5>
            <Image src={museum} alt="museum" className={clockTowerClass} />
            <div className={poiLine}>
              <div className={a}>
                <h5>Distance from guesthouse</h5>
                <div className={b}>
                  <div>350 m</div>
                  <div>6 minutes walk</div>
                </div>
              </div>
              <div className={b}>
                <button className={brownButton}>See on map</button>
                <button className={brownButton}>Directions </button>
              </div>
            </div>
          </div>
          <div>
            <h5>Breite Ancient Oak Tree Reserve</h5>
            <Image src={breite} alt="breite" className={clockTowerClass} />
            <div className={poiLine}>
              <div className={a}>
                <h5>Distance from guesthouse</h5>
                <div className={b}>
                  <div>350 m</div>
                  <div>6 minutes walk</div>
                </div>
              </div>
              <div className={b}>
                <button className={brownButton}>See on map</button>
                <button className={brownButton}>Directions </button>
              </div>
            </div>
          </div>
          <div>
            <h5>Saxon Cemetery</h5>
            <Image src={cemetery} alt="cemetery" className={clockTowerClass} />
            <div className={poiLine}>
              <div className={a}>
                <h5>Distance from guesthouse</h5>
                <div className={b}>
                  <div>350 m</div>
                  <div>6 minutes walk</div>
                </div>
              </div>
              <div className={b}>
                <button className={brownButton}>See on map</button>
                <button className={brownButton}>Directions </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <h3>Sighisoara Walking tours</h3>
      <div className={atmLine}>
        <div className={atmLine}>
          <h5>Framed Reality</h5>
          <div>2 minutes</div>
        </div>
        <button>Watch on Youtube</button>
      </div>
      <div className={atmLine}>
        <div className={atmLine}>
          <h5>Framed Reality</h5>
          <div>2 minutes</div>
        </div>
        <button>Watch on Youtube</button>
      </div>
      <div className={atmLine}>
        <div className={atmLine}>
          <h5>Framed Reality</h5>
          <div>2 minutes</div>
        </div>
        <button>Watch on Youtube</button>
      </div>
    </section>
  );
};
