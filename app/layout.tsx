import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { Providers } from "./providers";

config.autoAddCss = false;

const dmSans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-dm-sans",
});

export const metadata: Metadata = {
  title: "Madeline - Strategic Partnerships & Operations Leader",
  description: "A strategic partnerships & operations leader with 10 years experience in nonprofits and EdTech",
  icons: {
    icon: "https://xbfnqjerifbssnbyfycd.supabase.co/storage/v1/object/public/mad-portfolio-images/school_headshot.jpg",
    apple: "https://xbfnqjerifbssnbyfycd.supabase.co/storage/v1/object/public/mad-portfolio-images/school_headshot.jpg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={dmSans.variable}>
      <body className={dmSans.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
