import type { Metadata } from "next";
import { blMelody, inter } from "@/ui/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "Fillout Editor",
  description: "Create and edit fillout forms",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${blMelody.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
