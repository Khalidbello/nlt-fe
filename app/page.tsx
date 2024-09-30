import Image from "next/image";
import Header from "@/components/landing-page/header";
import Hero from "@/components/landing-page/hero";
import OurFeatures from "@/components/landing-page/our-features";
import EasyUi from "@/components/landing-page/easy-ui";
import Instumental from "@/components/landing-page/instumental-paymnet";
import NewsLetter from "@/components/landing-page/news-letter";
import StudentsReview from "@/components/landing-page/testimonial/testimonial";
import Footer from "@/components/landing-page/footer";

// ngrok http --domain=weekly-settled-falcon.ngrok-free.app 3000

export const metadata = {
  title: 'LifeStyleLeverage landing page',
  description: 'A simple e learning platform that enable individuals to learn things that matters lifestylelevrage lifestylelevrage.com.ng life style leverage',
  favicon: '/favicon.png',
};

export default function LandigPage() {
  return (
    <>
      <Header />
      <Hero />
      <OurFeatures />
      <StudentsReview />
      <EasyUi />
      <Instumental />
      <NewsLetter />
      <Footer />
    </>
  );
}
