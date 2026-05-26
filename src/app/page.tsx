import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { Willkommen } from "@/components/Willkommen";
import { Prinzipien } from "@/components/Prinzipien";
import { Vorstand } from "@/components/Vorstand";
import { UnserHaus } from "@/components/UnserHaus";
import { UeberUns } from "@/components/UeberUns";
import { InstagramFeed } from "@/components/InstagramFeed";
import { Kontakt } from "@/components/Kontakt";
import { Footer } from "@/components/Footer";
import { SectionDivider } from "@/components/SectionDivider";
import { RoomBanner } from "@/components/RoomBanner";
import { Semesterprogramm } from "@/components/Semesterprogramm";
import { fetchInstagramPosts } from "@/lib/instagram";

export default async function Home() {
  const posts = await fetchInstagramPosts();

  return (
    <>
      <Navigation hasInstagramPosts={posts.length > 0} />
      <Hero />
      <Willkommen />
      <SectionDivider />
      <Semesterprogramm />
      <SectionDivider />
      <Kontakt />
      <SectionDivider />
      <Prinzipien />
      <SectionDivider />
      <Vorstand />
      <SectionDivider />
      <UnserHaus />
      <SectionDivider />
      <UeberUns />
      <SectionDivider />
      <InstagramFeed posts={posts} />
      <Footer />
      <RoomBanner />
    </>
  );
}
