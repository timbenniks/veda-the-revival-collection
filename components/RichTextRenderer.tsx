import React from "react";

// Types for the JSON-RTE AST, accommodating both Contentstack and ProseMirror shapes
export type MarkType = "bold" | "italic" | "underline" | "code";

export interface Mark {
  type: MarkType;
}

// Text node for Contentstack RTE
export interface RTETextNode {
  type: "text";
  value: string;
  marks?: Mark[];
}
// Text node shape for ProseMirror/Contentstack AST (no explicit `type`)
export interface PMTextNode {
  text: string;
  marks?: Mark[];
}

// Generic element node
export interface RTENode {
  type: string;
  children?: Node[];
  data?: any;
}

export type Node = RTETextNode | PMTextNode | RTENode;

// Serializer function signature
export type Serializer = (props: {
  node?: RTENode;
  children: React.ReactNode[];
  key: string;
}) => React.ReactNode;

// Default serializers for node types (aliases included)
const defaultSerializers: Record<string, Serializer> = {
  paragraph: ({ key, children }) => <p key={key}>{children}</p>,
  p: ({ key, children }) => <p key={key}>{children}</p>,
  "heading-1": ({ key, children }) => <h1 key={key}>{children}</h1>,
  "heading-2": ({ key, children }) => <h2 key={key}>{children}</h2>,
  "heading-3": ({ key, children }) => <h3 key={key}>{children}</h3>,
  "unordered-list": ({ key, children }) => <ul key={key}>{children}</ul>,
  bulletList: ({ key, children }) => <ul key={key}>{children}</ul>,
  "ordered-list": ({ key, children }) => <ol key={key}>{children}</ol>,
  orderedList: ({ key, children }) => <ol key={key}>{children}</ol>,
  "list-item": ({ key, children }) => <li key={key}>{children}</li>,
  listItem: ({ key, children }) => <li key={key}>{children}</li>,
  hyperlink: ({ node, key, children }) => (
    <a
      key={key}
      href={node?.data?.url ?? ""}
      target={node?.data?.target ?? "_self"}
      rel="noopener noreferrer"
    >
      {children}
    </a>
  ),
  image: ({ node, key }) => {
    const url = node?.data?.src ?? node?.data?.url ?? "";
    const alt = node?.data?.alt ?? "";
    return <img key={key} src={url} alt={alt} />;
  },
  embed: ({ node, key }) => {
    const { embed_url, height, width } = node?.data ?? {};
    return (
      <iframe
        key={key}
        src={embed_url}
        height={height}
        width={width}
        frameBorder="0"
        allowFullScreen
      />
    );
  },
  // add other custom serializers here
};

// Recursively render nodes to React elements
function renderNode(node: Node, key: string): React.ReactNode {
  // ProseMirror-style text node
  if ("text" in node) {
    let content: React.ReactNode = node.text;
    if (node.marks) {
      node.marks.forEach((mark, i) => {
        const mkKey = `${key}-mark-${i}`;
        switch (mark.type) {
          case "bold":
            content = <strong key={mkKey}>{content}</strong>;
            break;
          case "italic":
            content = <em key={mkKey}>{content}</em>;
            break;
          case "underline":
            content = <u key={mkKey}>{content}</u>;
            break;
          case "code":
            content = <code key={mkKey}>{content}</code>;
            break;
        }
      });
    }
    return content;
  }
  // Contentstack-style text node
  if ((node as RTETextNode).type === "text") {
    let content: React.ReactNode = (node as RTETextNode).value;
    (node as RTETextNode).marks?.forEach((mark, i) => {
      const mkKey = `${key}-mark-${i}`;
      switch (mark.type) {
        case "bold":
          content = <strong key={mkKey}>{content}</strong>;
          break;
        case "italic":
          content = <em key={mkKey}>{content}</em>;
          break;
        case "underline":
          content = <u key={mkKey}>{content}</u>;
          break;
        case "code":
          content = <code key={mkKey}>{content}</code>;
          break;
      }
    });
    return content;
  }

  // Otherwise, it's an element node
  const el = node as RTENode;
  const children =
    el.children?.map((child, i) => renderNode(child, `${key}-${i}`)) || [];
  const serializer = defaultSerializers[el.type];
  if (serializer) {
    return serializer({ node: el, children, key });
  }
  // fallback fragment
  return <React.Fragment key={key}>{children}</React.Fragment>;
}

// Props accept full AST or just a list of nodes
export interface RichTextRendererProps {
  json: {
    content?: Node[];
    children?: Node[];
  };
}

export const RichTextRenderer: React.FC<RichTextRendererProps> = ({ json }) => {
  const nodes = json.content ?? json.children ?? [];
  return <>{nodes.map((node, i) => renderNode(node, `${i}`))}</>;
};

export default RichTextRenderer;
