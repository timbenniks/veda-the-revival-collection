import { Ctas } from "@/types/types";
import Cta from "./atoms/Cta";
import Title from "./atoms/Title";
import DOMPurify from "dompurify";
import RichTextRenderer from "./RichTextRenderer";

type RichTextProps = {
  title: string;
  content: any;
  ctas?: Ctas[];
  $?: any;
};

export default function RichText({ title, content, ctas, $ }: RichTextProps) {
  return (
    <div>
      {title && (
        <Title
          $={$ && $.title}
          text={title}
          theme={"dark"}
          uppercase={true}
          size="lg"
          classes="mb-2"
        />
      )}

      {content && (
        <RichTextRenderer json={content} />
        // <div
        //   {...($ && $.content)}
        //   dangerouslySetInnerHTML={{
        //     __html: DOMPurify.sanitize(content),
        //   }}
        // />
      )}

      {ctas && (
        <div className="mt-4 flex space-x-4 justify-center" {...($ && $.ctas)}>
          {ctas.map((ctaInstance: Ctas, index) => (
            <Cta {...ctaInstance.cta} key={`cta_${index}`} />
          ))}
        </div>
      )}
    </div>
  );
}
