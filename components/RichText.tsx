import { Ctas } from "@/types/types";
import Cta from "./atoms/Cta";
import Title from "./atoms/Title";
import RichTextRenderer from "./RichTextRenderer";
import { RichText as RichTextProps } from "@/types/types";

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
          as={title_tag || "p"}
        />
      )}

      {alternative_content ? (
        <div
          {...($ && $.alternative_content)}
          dangerouslySetInnerHTML={{ __html: alternative_content }}
          className="font-light richtext-content"
        />
      ) : (
        <>
          {content ? (
            <RichTextRenderer
              json={content}
              {...($ && $.content)}
              className="font-light richtext-content"
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
