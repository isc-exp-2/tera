import Image from "next/image";
import expLogo from "../../public/images/exp-logo.png";

type ExpLogoProps = {
  width: number;
  height: number;
};

export function ExpLogo({ width, height }: ExpLogoProps) {
  return <Image src={expLogo} alt="Exp Logo" width={width} height={height} />;
}
