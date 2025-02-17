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
    <div className="h-full rounded-md w-full" suppressHydrationWarning = {true}>
      <ul suppressHydrationWarning = {true} className="absolute right-0 rounded-md  mt-2 w-48 bg-[#f5f2e7]  border border-gray-200  shadow-lg">
        {linkItems.map((item) => (
          <li suppressHydrationWarning = {true}
            key={item.label}
            className='" px-4 py-4 text-gray-800 font-normal text-sm bg-[#f5f4e7]  cursor-pointer"'
          >
            <Link suppressHydrationWarning = {true} className="text-sm hover:text-yellow-600" href={item.href}>{item.label}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Menu;
