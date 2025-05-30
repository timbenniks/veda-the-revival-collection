import Link from "next/link";
import React, { memo, useMemo, HTMLAttributes } from "react";
import MediaItem from "./atoms/MediaItem";

export interface RTETextNode {
  text: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  code?: boolean;
  inlineCode?: boolean;
}

export interface RTEElementNode {
  type: string;
  attrs?: { [key: string]: any };
  children?: Node[];
}

export type Node = RTETextNode | RTEElementNode;

export interface RichTextRendererProps extends HTMLAttributes<HTMLDivElement> {
  json: {
    children?: Node[];
    content?: Node[];
  };
}

const getImageProps = (node: RTEElementNode) => {
  const src = node.attrs?.src || node.attrs?.url || node.attrs?.["asset-link"];
  const alt = node.attrs?.alt || node.attrs?.["asset-alt"] || "";
  const width = node.attrs?.width || "auto";
  const height = node.attrs?.height || "auto";
  const ratio = width / height;

  return {
    src,
    alt,
    width,
    height,
    ratio,
    loading: "lazy" as const,
  };
};

const defaultSerializers: Record<
  string,
  (
    node: RTEElementNode,
    children: React.ReactNode[],
    key: string
  ) => React.ReactNode
> = {
  doc: (node, children, key) => (
    <React.Fragment key={key}>{children}</React.Fragment>
  ),
  p: (node, children, key) => <p key={key}>{children}</p>,
  h1: (node, children, key) => <h1 key={key}>{children}</h1>,
  h2: (node, children, key) => <h2 key={key}>{children}</h2>,
  h3: (node, children, key) => <h3 key={key}>{children}</h3>,
  h4: (node, children, key) => <h4 key={key}>{children}</h4>,
  ul: (node, children, key) => <ul key={key}>{children}</ul>,
  ol: (node, children, key) => <ol key={key}>{children}</ol>,
  li: (node, children, key) => <li key={key}>{children}</li>,
  a: (node, children, key) => (
    <Link
      key={key}
      href={
        node.attrs?.url || node.attrs?.href || node.attrs?.["asset-link"] || "#"
      }
      target={node.attrs?.target || "_self"}
      rel="noopener noreferrer"
    >
      {children}
    </Link>
  ),
  img: (node, children, key) => (
    <MediaItem key={key} {...getImageProps(node)} />
  ),
  code: (node, children, key) => {
    const language = node.attrs?.language || "";
    return (
      <pre key={key} className={language ? `language-${language}` : ""}>
        <code>{children}</code>
      </pre>
    );
  },
  reference: (node, children, key) => {
    if (node.attrs?.["display-type"] === "link" || node.attrs?.href) {
      return (
        <Link
          key={key}
          href={node.attrs?.href || "#"}
          target={node.attrs?.target || "_self"}
          rel="noopener noreferrer"
        >
          {children}
        </Link>
      );
    }

    return <MediaItem key={key} {...getImageProps(node)} />;
  },
};

function renderNode(node: Node, key: string): React.ReactNode {
  if ("text" in node) {
    let content: React.ReactNode = node.text;

    if (node.bold) content = <strong key={`${key}-bold`}>{content}</strong>;
    if (node.italic) content = <em key={`${key}-italic`}>{content}</em>;
    if (node.underline) content = <u key={`${key}-underline`}>{content}</u>;
    if (node.code || node.inlineCode)
      content = <code key={`${key}-code`}>{content}</code>;

    return content;
  }

  const element = node as RTEElementNode;
  const children =
    element.children?.map((child, index) =>
      renderNode(child, `${key}-${index}`)
    ) || [];

  const serializer = defaultSerializers[element.type];

  return serializer ? (
    serializer(element, children, key)
  ) : (
    <React.Fragment key={key}>{children}</React.Fragment>
  );
}

export const RichTextRenderer: React.FC<RichTextRendererProps> = memo(
  ({ json, ...htmlProps }) => {
    const renderedNodes = useMemo(() => {
      const nodes = json.children || json.content || [];

      // Filter out empty paragraphs
      const filteredNodes = nodes.filter((node) => {
        // Check if it's a paragraph node with no content or only whitespace
        if ("type" in node && node.type === "p") {
          // If it has no children, or only has empty text nodes
          if (!node.children || node.children.length === 0) {
            return false;
          }

          // Check if all children are just empty text nodes
          const hasOnlyEmptyText = node.children.every(
            (child) => "text" in child && child.text.trim() === ""
          );

          return !hasOnlyEmptyText;
        }

        return true;
      });

      return filteredNodes.map((node, index) => renderNode(node, `${index}`));
    }, [json]);

    return <div {...htmlProps}>{renderedNodes}</div>;
  }
);

RichTextRenderer.displayName = "RichTextRenderer";

export default RichTextRenderer;
