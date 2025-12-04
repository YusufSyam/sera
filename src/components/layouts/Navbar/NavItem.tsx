import Link from "next/link";
import { INavItemPropsType } from "./Navbar.types";

const NavItem = ({ text, icon, customStyle, ...props }: INavItemPropsType) => {
  const Icon = icon;

  return (
    <Link {...props} className={`flex gap-2`}>
      <Icon className="size-5" />
      <p className="text-nowrap">{text}</p>
    </Link>
  );
};

export default NavItem;
