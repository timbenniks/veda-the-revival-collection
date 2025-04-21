export interface HeroProps {
  $?: any;
  _metadata: { $?: any; uid: string };
  description: string;
  image: { $?: any; url: string };
  title: string;
  video: { $?: any; url: string };
  design: {
    copy_location: string;
    opacity: string;
    $?: any;
  };
}

export default function Hero({
  _metadata,
  description,
  design,
  image,
  title,
  video,
  $,
}: HeroProps) {
  return (
    <>
      <h1 {...($ && $.title)}>{title}</h1>
    </>
  );
}
