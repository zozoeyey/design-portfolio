// The H-1B deck is private: it renders only with ?key= matching MOVEMINT_REDESIGN_KEY (the Movemint take-home key),
// or in local dev. Without it, /deck?deck=h1b 404s and the slides aren't in the HTML at all.
export function h1bAllowed(key: string | string[] | undefined) {
  const secret = process.env.MOVEMINT_REDESIGN_KEY;
  return process.env.NODE_ENV === "development" || (!!secret && key === secret);
}
