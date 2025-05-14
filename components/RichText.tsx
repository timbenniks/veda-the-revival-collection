import { Ctas } from "@/types/types";
import Cta from "./atoms/Cta";
import Title from "./atoms/Title";
import RichTextRenderer from "./RichTextRenderer";

type RichTextProps = {
  title?: string;
  title_tag?: "h1" | "h2" | "h3" | "h4";
  content: any;
  alternative_content: any;
  ctas?: Ctas[];
  $?: any;
};

export default function RichText({
  title,
  title_tag,
  content,
  alternative_content,
  ctas,
  $,
}: RichTextProps) {
  return (
    <div className="text-center p-12">
      {title && (
        <Title
          $={$ && $.title}
          text={title}
          theme={"dark"}
          uppercase={true}
          size="lg"
          classes="mb-2"
          as={title_tag || "h3"}
        />
      )}

      {content && alternative_content ? (
        <RichTextRenderer
          json={content}
          {...($ && $.content)}
          className="font-light"
        />
      ) : (
        <>
          {alternative_content ? (
            <div
              {...($ && $.alternative_content)}
              dangerouslySetInnerHTML={{ __html: alternative_content }}
              className="font-light"
            />
          ) : null}
        </>
      )}

      {ctas?.length ? (
        <div className="mt-4 flex space-x-4 justify-center" {...($ && $.ctas)}>
          {ctas.map((ctaInstance: Ctas, index) => (
            <Cta {...ctaInstance.cta} key={`cta_${index}`} />
          ))}
        </div>
      ) : null}
    </div>
  );
}
