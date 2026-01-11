import Image, { type ImageProps } from "next/image";
import expLogo from "../../public/images/exp-logo.png";

type ExpLogoProps = Omit<ImageProps, "src" | "alt" | "width" | "height">;

export function ExpLogo(props: ExpLogoProps) {
  return (
    <Image src={expLogo} alt="Exp Logo" width={1032} height={462} {...props} />
  );
}
