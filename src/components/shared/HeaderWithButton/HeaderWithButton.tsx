import { IconUsersGroup } from "@tabler/icons-react";
import { IHeaderWithButtonPropsType } from "./types";

const HeaderWithButton = ({
  title,
  icon,
  description,
  children,
}: IHeaderWithButtonPropsType) => {
  const Icon = icon;

  return (
    <section className="flex items-center justify-between py-10 ">
      <div className="flex gap-3 items-center w-fit">
        <div className="w-fit p-2 rounded-md bg-[#C5DDFF]">
          <Icon className="text-[#006AFF] size-5 md:size-8" />
        </div>
        <div>
          <h4 className="font-medium text-sm sm:text-base md:text-2xl">
            {title}
          </h4>
          <p className="text-[#A4A4A4] text-xs md:text-base">{description}</p>
        </div>
      </div>

      {children}
    </section>
  );
};

export default HeaderWithButton;
