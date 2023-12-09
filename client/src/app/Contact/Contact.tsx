"use client";

import { useCallback, useRef } from "react";
import {
  contact,
  horizontalContainer,
  labels,
  inputs,
  nameAndForename,
  forename as forenameClass,
  name as nameClass,
  headline,
  recaptchaDisclaimer,
  contactFooter,
} from "./Contact.module.css";
import { getRateLimitedFunction } from "../functions/getRateLimitedFunction";
import { useStateRef } from "../functions/useStateRef";

export const Contact = () => {
  const [name, setName, nameRef] = useStateRef("");
  const [forename, setForename, forenameRef] = useStateRef("");
  const [email, setEmail, emailRef] = useStateRef("");
  const [message, setMessage, messageRef] = useStateRef("");
  const [subject, setSubject, subjectRef] = useStateRef("");

  const submitCaptcha = useCallback(async () => {
    try {
      const token = await window.grecaptcha.execute(
        process.env.NEXT_PUBLIC_RECAPTCHA_SITETKEY,
        {
          action: "submit",
        },
      );
      fetch(`${window.location.origin}/api/contact`, {
        body: JSON.stringify({
          name: nameRef.current,
          email: emailRef.current,
          message: messageRef.current,
          subject: subjectRef.current,
          recaptcha: token,
        }),
        method: "POST",
      });
    } catch (err) {
      console.log(err);
    }
  }, [emailRef, messageRef, nameRef, subjectRef]);

  const postForm = useCallback(() => {
    if (window.grecaptcha) window.grecaptcha.ready(submitCaptcha);
  }, [submitCaptcha]);

  const rateLimitedOnSumbitRef = useRef(
    getRateLimitedFunction(postForm, 3000, false),
  );

  const onSubmit = useCallback(
    (event) => {
      event.preventDefault();
      if (!forenameRef.current) rateLimitedOnSumbitRef.current();
    },
    [forenameRef],
  );

  const onNameChange = (event) => setName(event.currentTarget.value);
  const onForenameChange = (event) => setForename(event.currentTarget.value);
  const onEmailChange = (event) => setEmail(event.currentTarget.value);
  const onSubjectChange = (event) => setSubject(event.currentTarget.value);
  const onMessageChange = (event) => setMessage(event.currentTarget.value);

  return (
    <section id="contact" className={contact}>
      <h1 className={headline}>Contact form</h1>
      <form onSubmit={onSubmit}>
        <div className={horizontalContainer}>
          <div className={labels}>
            <label>Name</label>
            <label>Email</label>
            <label>Subject</label>
            <label>Message</label>
          </div>
          <div className={inputs}>
            <div className={nameAndForename}>
              <div className={forenameClass}>
                <label>Forename</label>
                <input
                  tabIndex={-1}
                  value={forename}
                  onChange={onForenameChange}
                />
              </div>
              <input
                value={name}
                className={nameClass}
                onChange={onNameChange}
              />
            </div>
            <input value={email} onChange={onEmailChange} />
            <input value={subject} onChange={onSubjectChange} />
            <textarea value={message} onChange={onMessageChange} />
          </div>
        </div>
        <div className={contactFooter}>
          <button>Submit</button>
          <div className={recaptchaDisclaimer}>
            This site is protected by reCAPTCHA and the Google
            <a href="https://policies.google.com/privacy">Privacy Policy</a>and
            <a href="https://policies.google.com/terms">Terms of Service</a>
            apply.
          </div>
        </div>
      </form>
    </section>
  );
};
