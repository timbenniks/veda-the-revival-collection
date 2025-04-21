import { ComponentType } from "react";
import Hero from "./Hero";
import NoComponent from "./NoComponent";
import { ComponentEntry, mapComponentsToKV } from "@/lib/helpers";

type ComponentsRendererProps = {
  components: ComponentEntry[];
  cslp: any;
};

const componentMap: Record<string, ComponentType<any>> = {
  hero: Hero,
};

export const ComponentsRenderer: React.FC<ComponentsRendererProps> = ({
  components,
  cslp,
}) => {
  const mappedComponents = mapComponentsToKV(components);

  return (
    <div
      className="components-mapper"
      {...(cslp && cslp.components)}
      {...(cslp && cslp.components__parent)}
    >
      {mappedComponents.map((component, index) => {
        const ComponentInstance = componentMap[component.name] ?? NoComponent;
        return (
          <div
            key={component.props?._metadata.uid}
            className={`component-instance component-instance-${component.name}`}
            {...(cslp && cslp[`components__${index}`])}
          >
            <ComponentInstance {...component.props} />
          </div>
        );
      })}
    </div>
  );
};
