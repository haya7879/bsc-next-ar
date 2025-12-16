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
  type
}: HeroBannerProps) {
  return (
    <section className={`hero-banner ${type == "form" && "w-full! m-0! before:rounded-none! h-[40vh]!"}`}>
      <img src={image} alt={imageAlt} title={imageTitle} className={`${type == "form" && "rounded-none!"}`} />
      <div className="hero-title">
        <div>
          <h1>{title}</h1>
          <p>{description}</p>
        </div>
      </div>
    </section>
  );
}
