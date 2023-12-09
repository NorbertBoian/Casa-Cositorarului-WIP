import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import flatCache from "flat-cache";
import path from "node:path";

const cache = flatCache.load("ticketCounter", path.resolve("./.cache"));

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    type: "OAuth2",
    user: process.env.EMAIL,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    refreshToken: process.env.REFRESH_TOKEN,
  },
});

export async function POST(request) {
  const countBeforeRequest = cache.getKey("count") ?? 0;
  const countAfterRequest = countBeforeRequest + 1;
  const res = await request.json();
  const { email, name, message, subject, recaptcha } = res;

  const verifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRETKEY}&response=${recaptcha}`;

  // create reusable transporter object using the default SMTP transport
  try {
    const recaptchaRes = await fetch(verifyUrl, { method: "POST" });

    const recaptchaJson = await recaptchaRes.json();

    console.dir(recaptchaJson);

    await transporter.sendMail({
      from: {
        name,
        address: process.env.EMAIL,
      },
      to: "casacositoraruluisighisoara@gmail.com",
      subject: `#${countAfterRequest} - ${subject}`,
      text: message,
      html: `<div>
    <div>
       ${message}
    </div>
<div style="margin-top:3em;position:relative;display: flow-root;">
<a href="mailto:${email}?subject=Re: #${countAfterRequest} - ${subject}&body=%0D%0A%0D%0AOriginal message:%0D%0A${message}"  style="font-size: 1.25em;padding: 0.3em 1.25em;border: 0;border-radius:5px;background-color: #000000;color: white;text-decoration: none;float: right;">Reply</a>
   </a>
   </div>
   <hr/>
   <div style="font-style:italic;">Do not use the native reply button</div>
   </div>`,
    });
    await transporter.sendMail({
      from: {
        name: "Casa Cositorarului - No Reply",
        address: process.env.EMAIL,
      },
      to: email,
      subject: `Confirmation of message #${countAfterRequest} - ${subject}`,
      text: message,
      html: `<div>
      <div>This is an automated response confirming we received your message, you can review it below:</div>
      <div>${message}</div>
      <div>Plesae do not reply to this email as it won't reach us, if you want to reach us use the following email: casacositoraruluisighisoara@gmail.com</div>
      </div>`,
    });
    cache.setKey("count", countAfterRequest);
    cache.save(true /* noPrune */);
    return NextResponse.json("Sent emails successfully");
  } catch (err) {
    return NextResponse.json(err);
  }
}
