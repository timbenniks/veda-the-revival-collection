import { ComponentType } from "react";
import Hero from "./Hero";
import Cta from "./Cta";
import NoComponent from "./NoComponent";
import { ComponentEntry, isPreview, mapComponentsToKV } from "@/lib/helpers";
import { VB_EmptyBlockParentClass } from "@contentstack/live-preview-utils";

type ComponentsRendererProps = {
  components: ComponentEntry[];
  cslp?: any;
  cslpWrapper?: string;
};

const componentMap: Record<string, ComponentType<any>> = {
  hero: Hero,
  cta: Cta,
};

export const ComponentsRenderer: React.FC<ComponentsRendererProps> = ({
  components,
  cslp,
  cslpWrapper,
}) => {
  const mappedComponents = mapComponentsToKV(components);

  return (
    <>
      {!isPreview &&
        mappedComponents.length > 0 &&
        mappedComponents.map((component) => {
          const ComponentInstance = componentMap[component.name] ?? NoComponent;
          return (
            <ComponentInstance
              {...component.props}
              key={component.props?._metadata.uid}
            />
          );
        })}

      {isPreview && (
        <div
          className={
            mappedComponents.length === 0 && isPreview
              ? VB_EmptyBlockParentClass
              : ""
          }
          {...(cslp && cslpWrapper && cslp[cslpWrapper])}
        >
          {mappedComponents.map((component, index) => {
            const ComponentInstance =
              componentMap[component.name] ?? NoComponent;

            return (
              <div
                {...(cslp && cslpWrapper && cslp[`${cslpWrapper}__${index}`])}
                key={component.props?._metadata.uid}
              >
                <ComponentInstance {...component.props} />
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};
