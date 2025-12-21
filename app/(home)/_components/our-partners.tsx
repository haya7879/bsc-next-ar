import { InfiniteMovingLogos } from "@/components/ui/infinite-moving-logos";
import { partnerLogos1 } from "@/constants";
import { partnerLogos2 } from "@/constants";

export default function OurPartners() {
  return (
    <section className="md:mt-[70px]! mt-10!" >
      <div className="container-main mx-auto">
        <div className="section-title">
          <h2>شركاؤنا في النجاح</h2>
        </div>
      </div>
      <div className="flex flex-col gap-6 our-partners-slider" style={{ direction: "ltr" }}>
        <div className="container-main mx-auto">
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
