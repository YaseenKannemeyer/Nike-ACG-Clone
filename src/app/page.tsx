import HeroSection from "@/components/sections/HeroSection";
import EditorialSection from "@/components/sections/EditorialSection";
import CampaignBanner from "@/components/sections/CampaignBanner";
import FeaturedProducts from "@/components/sections/FeaturedProducts";
import CategoryGrid from "@/components/sections/CategoryGrid";

export default function HomePage() {
  return (
    <>
      {/* 1 — Full-viewport cinematic hero */}
      <HeroSection />

      {/* 2 — Bento category tiles */}
      <CategoryGrid />

      {/* 3 — Featured products from Supabase */}
      <FeaturedProducts />

      {/* 4 — Campaign banner: orange variant */}
      <CampaignBanner
        tag="SS26 Collection"
        headline="No Conditions Too Extreme."
        sub="Engineered for trail, peak, and everything in between. ACG gear that moves with you."
        cta="Explore the Collection"
        href="/shop"
        variant="orange"
      />

      {/* 5 — Alternating editorial story sections */}
      <EditorialSection />

      {/* 6 — Dark campaign closer */}
      <CampaignBanner
        tag="Nike Membership"
        headline="Join the Movement."
        sub="Exclusive access to new drops, member-only gear, and stories from the trail."
        cta="Become a Member"
        href="/join"
        variant="dark"
      />
    </>
  );
}
