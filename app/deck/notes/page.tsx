import type { Metadata } from "next";
import Presenter from "./Presenter";
import "./notes.css";

export const metadata: Metadata = {
  title: "Speaker notes",
  robots: { index: false, follow: false },
};

// Presenter window: open it from the deck (N), keep it on your own screen, share only the deck window.
export default function NotesPage() {
  return <Presenter />;
}
