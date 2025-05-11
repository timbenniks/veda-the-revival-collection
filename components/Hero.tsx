import Image from "next/image";
import Cta from "./atoms/Cta";
import Title from "./atoms/Title";

interface HeroProps {
  $?: any;
  _metadata: { $?: any; uid: string };
  description: string;
  image?: { $?: any; url: string };
  title: string;
  video?: { $?: any; url: string };
  design: {
    copy_location: "left" | "right";
    overlay_opacity: number;
    theme: "light" | "dark";
    $?: any;
  };
  ctas: any[];
}

export default function Hero({
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

      {design.overlay_opacity > 0 && (
        <div
          className="bg-black absolute w-full h-full top-0 left-0"
          style={{
            opacity: design.overlay_opacity / 100,
          }}
        ></div>
      )}

      <article
        className={`${
          design.copy_location === "left"
            ? "md:left-16 md:right-auto"
            : "md:left-auto md:right-16"
        } ${
          design.theme === "light" ? "text-white" : "text-black"
        } md:max-w-[400px] md:left-16 md:absolute md:top-2/4 md:-translate-y-2/4 mt-4 md:mt-0 px-6 md:px-0 text-center mx-auto`}
      >
        {title && (
          <Title
            $={$.title}
            text={title}
            theme={design.theme}
            uppercase={true}
            size="lg"
            classes="mb-2"
          />
        )}
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
