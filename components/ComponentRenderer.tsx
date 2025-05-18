import { ComponentType } from "react";
import { isPreview, mapComponentsToKV } from "@/lib/helpers";
import { VB_EmptyBlockParentClass } from "@contentstack/live-preview-utils";
import { Components, CSLPAttribute } from "@/types/types";

import NoComponent from "./NoComponent";
import HeroComponent from "./Hero";
import ListComponent from "./List";
import TwoColumnComponent from "./TwoColumn";
import MediaComponent from "./Media";
import RichTextComponent from "./RichText";
import HeaderComponent from "./Header";

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

type NoComponentProps = {
  name: string;
  [key: string]: any;
};

const componentMap: Record<string, ComponentType<any>> = {
  hero: HeroComponent,
  list: ListComponent,
  two_column: TwoColumnComponent,
  media: MediaComponent,
  rich_text: RichTextComponent,
  header: HeaderComponent,
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

    const ComponentInstance =
      component.name in componentMap
        ? componentMap[component.name]
        : (NoComponent as ComponentType<NoComponentProps>);

    const key = component.props?._metadata?.uid || `component--${index}`;

    const componentElement = (
      <ComponentInstance {...component.props} key={key} name={component.name} />
    );

    return withWrapper && cslp && cslpWrapper ? (
      <div {...cslp[`${cslpWrapper}__${index}`]} key={key}>
        {componentElement}
      </div>
    ) : (
      componentElement
    );
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
        renderComponent(component, index)
      )}
    </>
  );
};
