import Link from "next/link";
import { INavItemPropsType } from "./Navbar.types";

const NavItem = ({ text, icon, customStyle, ...props }: INavItemPropsType) => {
  const Icon = icon;

  return (
    <Link {...props} className={``}>
      <Icon />
      <p>{text}</p>
    </Link>
  );
};

export default NavItem;
