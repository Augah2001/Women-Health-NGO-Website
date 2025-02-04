import Link from "next/link";
import React from "react";

interface MenuProps {
  linkItems: LinkItem[];
}

interface LinkItem {
  label: string;
  href: string;
}

const Menu = ({ linkItems }: MenuProps) => {
  return (
    <div className="h-full w-full" suppressHydrationWarning = {true}>
      <ul suppressHydrationWarning = {true} className="absolute right-0  mt-2 w-48 bg-[#F3F5E7] hover:bg-[#e8edce] border border-gray-200  shadow-lg">
        {linkItems.map((item) => (
          <li suppressHydrationWarning = {true}
            key={item.label}
            className='" px-4 py-4 text-gray-800 font-normal text-sm bg-[#F3F5E7] hover:bg-[#deedce]  cursor-pointer"'
          >
            <Link suppressHydrationWarning = {true} className="text-sm hover:text-green-500" href={item.href}>{item.label}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Menu;
