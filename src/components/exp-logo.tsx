import Image from "next/image";
import expLogo from "../../public/images/exp-logo.png";

type ExpLogoProps = {
  width: number;
  height: number;
  priority: boolean;
};

export function ExpLogo(props: ExpLogoProps) {
  return <Image src={expLogo} alt="Exp Logo" {...props} />;
}
