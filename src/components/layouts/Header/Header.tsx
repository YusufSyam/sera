import { Avatar } from "@/components/ui/avatar";
import { IHeaderPropsType } from "./Header.types";
import { AvatarImage } from "@radix-ui/react-avatar";
import { IconArrowNarrowRight } from "@tabler/icons-react";

const HeaderApp = ({ text, textColor, children }: IHeaderPropsType) => {
  return (
    <header className="border-b border-b-gray-200 px-7 py-3 md:flex items-center hidden ">
      <div className={`flex ${textColor}`}>
        <p>{text}</p>
        <IconArrowNarrowRight />
      </div>

      <Avatar>
        <AvatarImage />
      </Avatar>
    </header>
  );
};

export default HeaderApp;
