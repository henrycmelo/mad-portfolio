import type { Metadata } from "next";
import { Archivo } from "next/font/google";
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { Providers } from "./providers";

config.autoAddCss = false;

// Stand-in for Sharp Grotesk, which is licence-restricted. Archivo is the
// closest free grotesque - sharp terminals, holds up at 800 weight and 72px.
const archivo = Archivo({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-archivo",
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
    <html lang="en" className={archivo.variable}>
      <body className={archivo.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
