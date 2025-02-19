"use client";
import React, { useState, useEffect, useContext } from "react";
import Image from "next/image";
import Link from "next/link";
import pic from "../../public/logo-transparent (1)-fotor-.png";
import { usePathname, useRouter } from "next/navigation";
import styles from "../../styles/Navbar.module.css";
import UserContext from "../contexts/UserContext";
import Menu from "./Menu";
import { ChakraProvider, MenuItem, Show } from "@chakra-ui/react";
import { BiMenu, BiWindowClose } from "react-icons/bi";
import { Toaster, toast } from "sonner";

import { FaUser } from "react-icons/fa";
import ProvinceContext from "../contexts/ProvinceContext";
import DropDownContext from "../contexts/DropDownContext";

const Navbar = () => {
  const { user, setUser } = useContext(UserContext);

  const { province, setProvince } = useContext(ProvinceContext);

  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const { isDropdownOpen, setIsDropdownOpen, toggleDropdown } = useContext(DropDownContext);

  const handleLogout = () => {
    try {
      localStorage.removeItem("auth-token");
      localStorage.removeItem("province-token");
      setUser(null);
      setProvince(null);
      toast.success("Logged out successfully");
    } catch (error) {
      toast.error("Error logging out");
    }
  };

  const path = usePathname();
  const isAdmin = path.startsWith("/admin");
  const [links, setLinks] = useState([
    { label: "HOME", href: "/", MenuItems: [{ label: "Home", href: "/" }] },
    { label: "ABOUT", href: "/about", MenuItems: [{ label: "ABOUT US", href: "/about" }] },
    {
      label: "RESEARCH",
      MenuItems: [
        { label: "Research Papers", href: "/research" },
        { label: "Working Paper Series", href: "/research/working-paper" },
        

      ],
    },
    { label: "OUTREACH", href: "/outreach", MenuItems: [{ label: "Outreach", href: "/outreach" }] },
    { label: "NEWS", href: "/news", MenuItems: [{ label: "News", href: "/news" }] },
    { label: "GALLERY", href: "/gallery", MenuIntems: [{ label: "Gallery", href: "/gallery" }] },
  ]);

  const [clicked, setClicked] = useState("HOME");
  const [selectedLink, setSelectedLink] = useState<string | null>("");
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      if (scrollY > 30 && scrollY > lastScrollY) {
        setShowNavbar(false);
      } else if (scrollY < lastScrollY) {
        setShowNavbar(true);
      }
      setLastScrollY(scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  console.log(path)

  return (
    <div
      suppressHydrationWarning={true}
      className={`fixed top-0 left-0 w-full z-50 transition-transform duration-500 ${showNavbar ? "translate-y-0" : "-translate-y-full"}`}
    >
      <nav className={`h-20 flex w-full justify-between  ${path.startsWith('/research')|| path.startsWith('/login')  || path.startsWith('/about') || path.startsWith('/gallery') || path.startsWith('/outreach')  || path.startsWith('/news')? 'bg-[#d0b24d]': 'bg-[#2222226d]'} `}>
        <div className="size-40">
          <Image
            src={pic}
            alt="logo"
            onClick={() => router.push("/login")}
            height={800}
            width={800}
            className="xs:w-[100%] cursor-pointer md:h- lg:h-14 sm:max-w-[70%] md:max-w-[90%] lg:max-w-[80%] xl:max-w-[50%] mt-3 h-14 ml-5"
          />
        </div>
        {/* <div className="text-red-500">{user && 'augah'}</div> */}
        <div>
          <div className="flex items-center justify-between pt-[10px] mt-4 space-x-4 me-5 text-lg font-semibold">
            <Show above="sm">
              {!isAdmin &&
                links.map((link, index) => (
                  <div
                    suppressHydrationWarning={true}
                    key={index}
                    onMouseEnter={() => setSelectedLink(link.label)}
                    onMouseLeave={() => setSelectedLink(null)}
                    className="relative inline-block"
                  >
                    <Link
                      suppressHydrationWarning={true}
                      href={link.href ? link.href : "#"}
                      onClick={() => setClicked(link.label)}
                      className={`${ path !=='/'?
                        (clicked === link.label ? "text-[#222222]" : "text-[#505050]"): (clicked!== link.label? "text-yellow-300" : "text-[#D4AF37]")
                      } transition-opacity duration-200 mt-5`}
                    >
                      {link.label}
                      {selectedLink === link.label &&
                        link?.MenuItems?.length > 1 && (
                          <div suppressHydrationWarning={true} className="absolute h-full w-full left-[120%] z-10000 top-4 justify-center flex">
                            <Menu linkItems={link.MenuItems} />
                          </div>
                        )}
                    </Link>
                  </div>
                ))}
            </Show>
            {
              <div className={styles.navLinks}>
                <div className="flex xs:w-0 sm:w-full  items-center">
                  {user && (
                    <div
                      className="
                     "
                    >
                      <ChakraProvider>
                        <Show above="md">
                          <FaUser
                            onClick={toggleDropdown}
                            size={30}
                            className="text-yellow-300 border-[2px] border-yellow-300 p-[2px] rounded-full hover:text-gray-800 hover:border-gray-800 cursor-pointer"
                          />
                        </Show>
                      </ChakraProvider>

                      {isDropdownOpen && (
                        <ul className="absolute right-0 mt-2 w-48 bg-[#F3F5E7] hover:bg-[#f1ea59] border border-gray-200 hover:rounded-md rounded-md shadow-lg">
                         
                          <li
                            className="px-4 py-2 text-gray-800 hover:bg-[#d478003e] cursor-pointer"
                            onClick={handleLogout}
                          >
                            Logout
                          </li>
                        </ul>
                      )}
                    </div>
                  )}
                  {/* {!user && (
                    <div className="flex items-center">
                      <button
                        className="bg-transparent border-[1.5px] border-yellow-500 my-auto  hover:border-black
                                     px-4 py-2 mt-[17px] font-normal 
                                     cursor-pointer transition duration-300 ease-in-out
                                    hover:text-yellow-500 hover:bg-black text-yellow-500 me-3"
                        onClick={() => {
                          path === "/register"
                            ? router.push("/admin/")
                            : router.push("admin/register");
                        }}
                      >
                        {path === "/register" ? "Login" : "Register"}
                      </button>
                    </div>
                  )} */}

                </div>
              </div>
            }
            <div className="sm:w-0 sm:h-0 flex items-center">
              <BiMenu
                onClick={() => setIsOpen(!isOpen)}
                className={` sm:w-0 sm:h-0 text-3xl mt-3 text-[#223525]
                   active:transform ${isOpen && "rotate-90"}
                    transition-transform duration-700 ease-out`}
              />
              {isOpen && (
                <div>
                  <ul className="absolute right-0  mt-6 w-48 bg-[#F3F5E7] hover:bg-[#e8edce] border border-gray-200  shadow-lg">
                   
                    {links.map((item) =>
                      item.MenuItems?.map((i, index) => (
                        <li
                          key={index}
                          className='" px-4 py-4 w-screen text-gray-800 font-normal text-sm bg-[#f5f4e7]   cursor-pointer"'
                        >
                          <Link onClick={() => setIsOpen(!false)} className="text-sm hover:text-[#a79436]" href={i.href}>
                            {i.label}
                          </Link>
                        </li>
                      ))
                    )}
                    {user && (
                      <li className='" px-4 py-4 w-screen text-gray-800 font-normal text-sm bg-[#f5f4e7]  cursor-pointer"'>
                        <div className="text-sm" onClick={handleLogout}>
                          Logout
                        </div>
                      </li>
                    )}
                  </ul>
                </div>
              )}
            </div>
          </div>
          
        </div>
      </nav>
    </div>
  );
};

export default Navbar;