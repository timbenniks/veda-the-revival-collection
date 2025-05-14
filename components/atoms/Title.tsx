import { ElementType } from "react";
import { twMerge } from "tailwind-merge";

interface TitleProps {
  $?: any;
  text: string;
  as?: ElementType;
  uppercase?: boolean;
  size?: "sm" | "lg";
  theme?: "light" | "dark";
  classes: string;
  weight?: "light" | "medium";
}

export default function Title({
  $,
  text,
  as: Component = "h1",
  uppercase,
  size,
  theme,
  classes,
  weight,
}: TitleProps) {
  return (
    <Component
      {...($ && $)}
      className={twMerge(
        uppercase && "uppercase",
        theme === "light" ? "text-black md:text-white" : "text-black",
        size === "sm" ? "text-md" : "text-3xl",
        weight === "medium" ? "font-medium" : "font-light",
        classes
      )}
    >
      {text}
    </Component>
  );
}
