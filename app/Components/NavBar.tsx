"use client";
import React, { useState, useEffect, useContext } from "react";
import Image from "next/image";
import Link from "next/link";
import pic from "../public/site/Black Grey Simple Library Logo (3)_edited.png";
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

 const {isDropdownOpen,setIsDropdownOpen,toggleDropdown}=useContext(DropDownContext)



  const handleLogout = () => {
    try{// Remove token from localStorage
    localStorage.removeItem("auth-token");
    localStorage.removeItem("province-token");

    // Update the user context to null
    setUser(null);
    setProvince(null);

    toast.success("Logged out successfully");

  }
   catch (error) {
      toast.error("Error logging out");
    }
    
  };
  const path = usePathname();
  const isAdmin = path.startsWith("/admin");
  const [links, setLinks] = useState([
    { label: "HOME", href: "/", MenuItems: [{ label: "Home", href: "/" }] },
    {
      label: "ABOUT",
      href: "/about",
      MenuItems: [{ label: "ABOUT US", href: "/about" }],
    },

    {
      label: "RESEARCH",
      MenuItems: [
        { label: "Research Papers", href: "/research" },
        { label: "Working Paper Series", href: "/research/working-paper" },
        { label: "Research With Us", href: "/research/research-with-us" },
        { label: "Drugs Being Used", href: "/research/drugs-used" },
      ],
    },

    {
      label: "OUTREACH",
      href: "/outreach",
      MenuItems: [{ label: "Outreach", href: "/outreach" }],
    },
    {
      label: "NEWS",
      href: "/news",
      MenuItems: [{ label: "News", href: "/news" }],
    },
    {
      label: "GALLERY",
      href: "/gallery",
      MenuItems: [{ label: "Gallery", href: "/gallery" }],
    },
    
  ]);

  const [clicked, setClicked] = useState("HOME");
  const [selectedLink, setSelectedLink] = useState<string | null>("");
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      if (scrollY > 30 && scrollY > lastScrollY) {
        // Scrolling down and past 10px
        setShowNavbar(false);
      } else if (scrollY < lastScrollY) {
        // Scrolling up
        setShowNavbar(true);
      }
      setLastScrollY(scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  return (
    <div 
    suppressHydrationWarning = {true}
      className={`fixed top-0 left-0 w-full z-50 transition-transform duration-500 ${
        showNavbar ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      
      <nav className="h-20 flex w-full justify-between bg-white shadow-lg">
        <div className="xs:w-[50%] md:w[40%] sm:w-[40%]">
          <Image
            src={pic}
            alt="logo"
            onClick={() => router.push("/login")}
            height={800}
            width={800}
            className="xs:w-[100%] cursor-pointer md:h- lg:h-14 sm:max-w-[70%] md:max-w-[90%] lg:max-w-[80%] xl:max-w-[50%] mt-3 h-14 ml-5"
          />
        </div>
        <div>
          <div className="flex items-center justify-between pt-[10px] mt-4 space-x-4 me-5 text-lg font-semibold">
            <Show above="sm">
              {!isAdmin &&
                links.map((link, index) => (
                  <div
                  suppressHydrationWarning = {true}
                    key={index}
                    onMouseEnter={() => setSelectedLink(link.label)}
                    onMouseLeave={() => setSelectedLink(null)}
                    className="relative inline-block"
                  >
                    <Link
                    suppressHydrationWarning = {true}
                      href={link.href ? link.href : "#"}
                      onClick={() => setClicked(link.label)}
                      className={`${
                        clicked === link.label
                          ? "text-[#1d532d]"
                          : "text-[#2c9e4d]"
                      } transition-opacity duration-200 mt-5`}
                    >
                      {link.label}
                      {selectedLink === link.label &&
                        link.MenuItems.length > 1 && (
                          <div suppressHydrationWarning = {true} className="absolute h-full w-full left-[120%] z-10000 top-4 justify-center flex">
                            <Menu  linkItems={link.MenuItems} />
                          </div>
                        )}
                    </Link>
                  </div>
                ))}
            </Show>

            {
              <div className={styles.navLinks}>
                <div className="flex xs:w-0 sm:w-full  items-center">
                  {(user || province) && (
                    <div
                      className="
                     "
                    >
                      <ChakraProvider>
                        <Show above="md">
                          <FaUser
                            onClick={toggleDropdown}
                            size={30}
                            className="text-yellow-300 border-[2px] border-yellow-300 p-[2px] rounded-full hover:text-[#2c9e4d] hover:border-[#2c9e4d] cursor-pointer"
                          />
                        </Show>
                      </ChakraProvider>

                      {isDropdownOpen && (
                        <ul className="absolute right-0 mt-2 w-48 bg-[#F3F5E7] hover:bg-[#e8edce] border border-gray-200 hover:rounded-md rounded-md shadow-lg">
                          <div className="border-b-[1px] border-gray-400 px-4 py-2  font-normal text-gray-500 ">
                            {user?.username || province?.name}
                          </div>
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
                    {(user || province )&& (
                      <div onClick={()=> setIsOpen(!false)} className="border-b-[1px] border-gray-400 px-4 py-2  font-normal text-gray-500 ">
                        {user?.username || province?.name}
                      </div>
                    )}
                    {links.map((item) =>
                      item.MenuItems.map((i, index) => (
                        <li
                          key={index}
                          className='" px-4 py-4 w-screen text-gray-800 font-normal text-sm bg-[#F3F5E7] hover:bg-[#deedce]  cursor-pointer"'
                        >
                          <Link onClick={() => setIsOpen(!false)} className="text-sm" href={i.href}>
                            {i.label}
                          </Link>
                        </li>
                      ))
                    )}
                    {(user || province) && (
                      <li className='" px-4 py-4 w-screen text-gray-800 font-normal text-sm bg-[#F3F5E7] hover:bg-[#deedce]  cursor-pointer"'>
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
