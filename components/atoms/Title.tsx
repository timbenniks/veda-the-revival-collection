interface TitleProps {
  $?: any;
  text: string;
  uppercase?: boolean;
  size?: "sm" | "lg";
  theme?: "light" | "dark";
  classes: string;
  weight?: "light" | "medium";
}

export default function Cta({
  $,
  text,
  uppercase,
  size,
  theme,
  classes,
  weight,
}: TitleProps) {
  return (
    <h1
      {...($ && $)}
      className={`${uppercase && "uppercase"} ${
        theme === "light" ? "text-white" : "text-black"
      } ${size === "sm" ? "text-md" : "text-3xl"} ${
        weight === "medium" ? "font-medium" : "font-light"
      }  ${classes}`}
    >
      {text}
    </h1>
  );
}
