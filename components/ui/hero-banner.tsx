import Image from "next/image";

interface HeroBannerProps {
  title: string;
  description?: string;
  image?: string;
  imageAlt?: string;
  imageTitle?: string;
  type?: string;
}

export default function HeroBanner({
  title,
  description,
  image = "/imgs/bg-categories.webp",
  imageAlt = "Hero banner image",
  imageTitle = "Hero banner image",
  type,
}: HeroBannerProps) {
  return (
    <section
      className={`hero-banner ${
        type == "form" && "w-full! m-0! before:rounded-none! h-[40vh]! justify-start!"
      }`}
    >
      <Image
        width={1200}
        height={675}
        src={image}
        alt={imageAlt}
        title={imageTitle}
        priority
        fetchPriority="high"
        quality={85}
        sizes="100vw"
        className={`${type == "form" && "rounded-none!"}`}
      />
      <div className="hero-title">
        <div>
          <h1>{title}</h1>
          <p>{description}</p>
        </div>
      </div>
    </section>
  );
}
