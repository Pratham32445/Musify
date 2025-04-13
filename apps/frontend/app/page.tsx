import FeatureRequest from "@/components/landing/FeatureRequest";
import Features from "@/components/landing/Features";
import Hero from "@/components/landing/Hero";
import HeroRoomSearch from "@/components/landing/HeroRoomSearch";
import Navbar from "@/components/landing/Navbar";
import Reviews from "@/components/landing/Reviews";
import ShowCase from "@/components/landing/ShowCase";

export default function Home() {
  return (
    <div className="max-w-4xl mx-auto w-full min-h-screen mb-10">
      <Navbar/>
      <Hero/>
      <HeroRoomSearch/>
      <ShowCase/>
      <Features/>
      <Reviews/>
      <FeatureRequest/>
    </div>
  );
}
