/**
 * PHONE DOCTRINE — one canonical shape for every phone number on this build.
 *
 * Display is ALWAYS `(609) 388-9656`. Never dashes-only, never bare digits,
 * never a visible `+1`. Links are ALWAYS built from E.164 digits, because a
 * `tel:` href carrying spaces and parentheses is a coin flip on older Android
 * dialers. Display, href, and the booking-form mask all come out of this one
 * module so they can never drift apart.
 */

/** strip everything that is not a digit */
export function digitsOf(input: string): string {
  return input.replace(/\D+/g, "");
}

/** reduce any US input to its 10 significant digits (tolerates a leading 1) */
export function nationalDigits(input: string): string {
  const d = digitsOf(input);
  if (d.length === 11 && d.startsWith("1")) return d.slice(1);
  return d.slice(0, 10);
}

/** the one display format */
export function formatPhone(input: string): string {
  const d = nationalDigits(input);
  if (d.length !== 10) return input;
  return `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`;
}

/** progressive mask for a live <input>; never fights the caret */
export function formatAsYouType(input: string): string {
  const d = nationalDigits(input);
  if (d.length === 0) return "";
  if (d.length < 4) return `(${d}`;
  if (d.length <= 6) return `(${d.slice(0, 3)}) ${d.slice(3)}`;
  return `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6, 10)}`;
}

/** E.164, the only form that belongs inside a tel: or sms: href */
export function e164(input: string, country = "1"): string {
  return `+${country}${nationalDigits(input)}`;
}

export function telHref(input: string): string {
  return `tel:${e164(input)}`;
}

/**
 * `sms:` with a prefilled body. The separator is the gotcha: iOS wanted
 * `&body=` after a recipient, Android wanted `?body=`. `?&body=` is the
 * belt-and-braces form both parse.
 */
export function smsHref(input: string, body?: string): string {
  const base = `sms:${e164(input)}`;
  return body ? `${base}?&body=${encodeURIComponent(body)}` : base;
}

/** true once the input holds a complete US number */
export function isCompletePhone(input: string): boolean {
  return nationalDigits(input).length === 10;
}
