import { cookies } from "next/headers";

import { ParamLink } from "../components/ParamLink";
import { container } from "./CookieConsent.module.css";

export const CookieConsent = ({ consented }: { consented: boolean }) => {
  return consented ? null : (
    <div className={container}>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque dolore
        itaque libero ab recusandae eveniet, dignissimos natus neque vero sunt
        deserunt ex vel rerum eligendi excepturi consequuntur quae quo tempore.
      </p>
      <ParamLink
        name="consented"
        value="true"
        prefetch={false}
        forceReload={true}
      >
        Accept
      </ParamLink>
      <ParamLink
        name="consented"
        value="false"
        prefetch={false}
        forceReload={true}
      >
        Decline
      </ParamLink>
    </div>
  );
};
