import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

export const metadata: Metadata = {
  title: 'Lifestyle Leverage: Learn Valuable Skills',
  description: 'Discover a wide range of online courses and tutorials at Lifestyle Leverage, Nigeria\'s leading e-learning platform.',
  keywords: 'e-learning, online courses, skill development, personal growth, Nigeria',
  openGraph: {
    title: 'Lifestyle Leverage: Learn Valuable Skills',
    description: 'Discover a wide range of online courses and tutorials at Lifestyle Leverage, Nigeria\'s leading e-learning platform. LifestyleLeverage',
    url: 'https://lifestyleleverage.com.ng',
    images: [
      {
        url: 'https://lifestyleleverage.com.ng/images/hero.gif',
        alt: 'Lifestyle Leverage Hero Image',
        width: 1200,
        height: 627
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Lifestyle Leverage: Learn Valuable Skills',
    description: 'Discover a wide range of online courses and tutorials at Lifestyle Leverage, Nigeria\'s leading e-learning platform.',
    images: 'https://lifestyleleverage.com.ng/images/hero.gif'
  }
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body >{children}</body>
    </html>
  );
}
