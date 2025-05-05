import Image from "next/image";
interface HeroProps {
  $?: any;
  _metadata: { $?: any; uid: string };
  description: string;
  image: { $?: any; url: string };
  title: string;
  video: { $?: any; url: string };
  design: {
    copy_location: string;
    opacity: string;
    $?: any;
  };
}

export default function Hero({
  _metadata,
  description,
  design,
  image,
  title,
  video,
  $,
}: HeroProps) {
  console.log(design);

  return (
    <div className="aspect-[1440/635] relative w-full overflow-hidden bg-gray-100">
      <Image
        {...($ && $.image)}
        src={image?.url}
        alt={title}
        width={1440}
        height={635}
        loading="eager"
        fetchPriority="high"
        quality={100}
        priority={true}
        className="h-full w-full object-cover object-center"
      />
      <article className="max-w-[400px] left-16 md:absolute top-2/4 md:-translate-y-2/4 mt-4 md:mt-0 px-4 md:px-0 text-center">
        {title ? <h1 {...($ && $.title)}>{title}</h1> : null}
        {description ? <h1 {...($ && $.description)}>{description}</h1> : null}
      </article>
    </div>
  );
}
