import { ComponentsRenderer } from "./ComponentRenderer";

type TwoColumnProps = {
  side_a?: any;
  side_b?: any;
  $?: any;
};

export default function TwoColumn({ side_a, side_b, $ }: TwoColumnProps) {
  return (
    <div className="mx-auto bg-[#FFF3E0] grid grid-cols-1 md:grid-cols-2 gap-4">
      {side_a && (
        <ComponentsRenderer components={side_a} cslp={$} cslpWrapper="side_a" />
      )}

      {side_b && (
        <ComponentsRenderer components={side_b} cslp={$} cslpWrapper="side_b" />
      )}
    </div>
  );
}
