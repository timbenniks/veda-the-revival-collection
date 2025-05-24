import { ComponentType } from "react";
import { isPreview, mapComponentsToKV } from "@/lib/helpers";
import { VB_EmptyBlockParentClass } from "@contentstack/live-preview-utils";
import { Components, CSLPAttribute } from "@/types/types";

import NoComponent from "@/components/NoComponent";
import HeroComponent from "@/components/Hero";
import ListComponent from "@/components/List";
import TwoColumnComponent from "@/components/TwoColumn";
import MediaComponent from "@/components/Media";
import RichTextComponent from "@/components/RichText";

type ComponentsRendererProps = {
  components: Components[];
  cslp?: { [key: string]: CSLPAttribute | undefined };
  cslpWrapper?: string;
};

type ComponentName = keyof Components;
type ComponentProps<T extends ComponentName> = Components[T];

interface ComponentKV {
  name: ComponentName;
  props:
    | (ComponentProps<ComponentName> & { _metadata?: { uid: string } })
    | null;
}

const componentMap: {
  [K in keyof Components]: ComponentType<Components[K]>;
} = {
  hero: HeroComponent,
  list: ListComponent,
  two_column: TwoColumnComponent,
  media: MediaComponent,
  rich_text: RichTextComponent,
};

export const ComponentsRenderer: React.FC<ComponentsRendererProps> = ({
  components,
  cslp,
  cslpWrapper,
}) => {
  const mappedComponents = mapComponentsToKV(components) as ComponentKV[];

  const renderComponent = (
    component: ComponentKV,
    index: number,
    withWrapper = false
  ) => {
    if (!component.name || !component.props) {
      return null;
    }

    if (component.name in componentMap) {
      const ComponentInstance = componentMap[component.name];
      const key = component.props?._metadata?.uid || `component--${index}`;

      const componentElement = (
        <ComponentInstance
          {...(component.props as any)}
          key={key}
          name={component.name}
        />
      );

      return withWrapper && cslp && cslpWrapper ? (
        <div {...cslp[`${cslpWrapper}__${index}`]} key={key}>
          {componentElement}
        </div>
      ) : (
        componentElement
      );
    } else {
      const key = component.props?._metadata?.uid || `component--${index}`;

      return (
        <NoComponent
          {...(component.props as any)}
          name={component.name.toString()}
          key={key}
        />
      );
    }
  };

  if (mappedComponents.length === 0 && isPreview) {
    return (
      <div
        className={VB_EmptyBlockParentClass}
        {...(cslp && cslpWrapper && cslp[cslpWrapper])}
      />
    );
  }

  if (isPreview) {
    return (
      <div {...(cslp && cslpWrapper && cslp[cslpWrapper])}>
        {mappedComponents.map((component, index) =>
          renderComponent(component, index, true)
        )}
      </div>
    );
  }

  return (
    <>
      {mappedComponents.map((component, index) =>
        renderComponent(component, index, false)
      )}
    </>
  );
};
