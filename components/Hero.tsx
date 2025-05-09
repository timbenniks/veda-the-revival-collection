import Image from "next/image";
import { ComponentsRenderer } from "./ComponentRenderer";
import Cta from "./Cta";

interface HeroProps {
  $?: any;
  _metadata: { $?: any; uid: string };
  description: string;
  image?: { $?: any; url: string };
  title: string;
  video?: { $?: any; url: string };
  design: {
    copy_location: string;
    opacity: string;
    $?: any;
  };
  ctas: any[];
}

export default function Hero({
  _metadata,
  description,
  design,
  image,
  title,
  video,
  ctas,
  $,
}: HeroProps) {
  return (
    <div className="md:aspect-[1440/635] relative w-full overflow-hidden">
      {video?.url ? (
        <video
          {...($ && $.video)}
          className="h-full w-full object-cover object-center"
          width={1440}
          height={635}
          autoPlay
          loop
          muted
          playsInline
          src={video?.url}
          poster={image?.url}
        />
      ) : (
        <>
          {image?.url && (
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
          )}
        </>
      )}

      <article className="md:max-w-[400px] md:left-16 md:absolute md:top-2/4 md:-translate-y-2/4 mt-4 md:mt-0 px-6 md:px-0 text-center mx-auto">
        {title ? (
          <h1 {...($ && $.title)} className="text-3xl font-light mb-2">
            {title}
          </h1>
        ) : null}
        {description ? (
          <p {...($ && $.description)} className="font-light">
            {description}
          </p>
        ) : null}

        {ctas.length && (
          <div
            className="mt-4 flex space-x-4 justify-center"
            {...($ && $.ctas)}
          >
            {ctas.map((ctaInstance) => (
              <Cta {...ctaInstance.cta} key={ctaInstance.cta._metadata.uid} />
            ))}
          </div>
        )}
      </article>
    </div>
  );
}
