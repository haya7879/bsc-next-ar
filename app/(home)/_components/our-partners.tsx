import { InfiniteMovingLogos } from "@/components/ui/infinite-moving-logos";
import { partnerLogos1 } from "@/constants";
import { partnerLogos2 } from "@/constants";

export default function OurPartners() {
  return (
    <section className="our-partners" style={{direction:"ltr"}}>
      <div className="container-main mx-auto px-4">
        <div className="flex flex-col gap-6">
          {/* First row - moves left */}
          <InfiniteMovingLogos
            items={partnerLogos1}
            direction="left"
            speed="slower"
            pauseOnHover={true}
          />
          {/* Second row - moves right */}
          <InfiniteMovingLogos
            items={partnerLogos2}
            direction="right"
            speed="slower"
            pauseOnHover={true}
          />
        </div>
      </div>
    </section>
  );
}
