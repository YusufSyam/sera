import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { IHeaderPropsType } from "./Header.types";
import { IconArrowNarrowRight } from "@tabler/icons-react";
import Link from "next/link";

const HeaderApp = ({ text, textColor, href, children }: IHeaderPropsType) => {
  return (
    <header className="border-b border-b-gray-200 px-7 py-3 md:flex items-center hidden justify-between">
      <Link href={href} className={`flex ${textColor}`}>
        <p>{text}</p>
        <IconArrowNarrowRight />
      </Link>

      {/* <div className="flex items-center gap-2.5">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
        </Avatar>
        <div className="flex flex-col gap-0">
          <p className="">Yusuf Syam</p>
        </div>
      </div> */}
    </header>
  );
};

export default HeaderApp;
