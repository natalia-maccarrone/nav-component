import { Inter } from "next/font/google";
import localFont from "next/font/local";

export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const blMelody = localFont({
  src: [
    {
      path: "../../../public/fonts/BLMelody-Medium.woff2",
      weight: "500",
      style: "normal",
    },
  ],
  variable: "--font-bl-melody",
});
