import { ChatbotLogo } from "@/assets/images";
import Image from "next/image";
import { IHeaderLogoPropsType } from "./Header.types";

const HeaderLogo = ({ align }: IHeaderLogoPropsType) => {
  const positionLogo = align === "right" ? "justify-end px-5" : "justify-start";

  return (
    <div
      className={`w-full flex flex-row items-center gap-3 my-4 ${positionLogo}`}
    >
      <Image
        src={ChatbotLogo}
        width={400}
        height={400}
        className="w-10 h-10"
        alt=""
      />
      <p className="text-xl font-semibold">S.E.R.A</p>
    </div>
  );
};

export default HeaderLogo;
