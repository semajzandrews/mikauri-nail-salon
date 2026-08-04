import { formatPhone, telHref, smsHref } from "./phone";

/** digits only, declared exactly once for the whole site */
const PHONE = "6093889656";

export const site = {
  phone: formatPhone(PHONE),
  phoneDigits: PHONE,
  phoneHref: telHref(PHONE),
  /** Mikauri's own voice: a quiet, by-booking salon on Park Avenue */
  smsBody: "Hi Mikauri — here's the set I have in mind. Could you fit me in this week?",
  get smsHref() {
    return smsHref(PHONE, this.smsBody);
  },
};
