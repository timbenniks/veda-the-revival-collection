import Cta from "./atoms/Cta";
import Title from "./atoms/Title";
import { Ctas, Hero as HeroProps } from "@/types/types";
import { twMerge } from "tailwind-merge";
import MediaItem from "./atoms/MediaItem";

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
    <div className="md:aspect-[1440/635] relative w-full overflow-hidden bg-white">
      {video?.url ? (
        <video
          {...($ && $.video)}
          width={1440}
          height={635}
          autoPlay
          loop
          muted
          playsInline
          src={video?.url}
          poster={image?.url}
          className="h-full w-full object-cover object-center"
        />
      ) : (
        <>
          {image?.url && (
            <MediaItem
              {...($ && $.image)}
              src={image?.url}
              width={1440}
              height={635}
              ratio={1440 / 635}
              loading="eager"
              fetchPriority="high"
              sizes="100vw"
              widths={[480, 960, 1440, 1800]}
              alt={title || image.title || ""}
              className="h-full w-full object-cover object-center"
            />
          )}
        </>
      )}

      {design.overlay_opacity > 0 && (
        <div
          className="hidden md:block bg-black absolute w-full h-full top-0 left-0"
          style={{
            opacity: design.overlay_opacity / 100,
          }}
        />
      )}

      <article
        className={twMerge(
          "my-4 md:mt-0 px-6 md:px-0 text-center mx-auto",
          "md:max-w-[400px] md:absolute md:top-2/4 md:-translate-y-2/4",

          design.copy_location === "left"
            ? "md:left-40 md:right-auto"
            : "md:left-auto md:right-40",

          design.theme === "light" ? "text-black md:text-white" : "text-black"
        )}
      >
        {title && (
          <Title
            $={$ && $.title}
            text={title}
            theme={design.theme}
            uppercase={true}
            size="lg"
            classes="mb-2"
          />
        )}

        {description && (
          <p {...($ && $.description)} className="font-light">
            {description}
          </p>
        )}

        {ctas && (
          <>
            {ctas.length > 0 && (
              <div
                className="mt-4 flex space-x-4 justify-center"
                {...($ && $.ctas)}
                data-add-direction="horizontal"
              >
                {ctas.map((ctaInstance: Ctas, index) => (
                  <Cta {...ctaInstance.cta} key={`cta_${index}`} />
                ))}
              </div>
            )}
          </>
        )}
      </article>
    </div>
  );
}
