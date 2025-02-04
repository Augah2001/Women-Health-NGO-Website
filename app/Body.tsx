"use client";
import React, { useEffect, useState } from "react";
import  { Province } from "./contexts/ProvinceContext";

import Navbar from "./Components/NavBar";
import { Inter } from "next/font/google";
import useFormModal from "./hooks/useFormModal";
import ModalContext from "./contexts/ModalContext";
import Footer from "./Footer";
import { parseJwt } from "./utils/jwtParse";
import UserContext, { Superuser } from "./contexts/UserContext";
import ProvinceContext from "./contexts/ProvinceContext";
import DropDownContext from "./contexts/DropDownContext";
const inter = Inter({ subsets: ["latin"] });

const Body = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<Superuser | null>(null);
  const [province, setProvince] = useState<Province | null>(null);

  useEffect(() => {
    // Retrieve the JWT authToken from localStorage
    const authToken = localStorage.getItem("auth-token"); // Replace 'your_jwt_authToken_key' with the actual key used
    
    if (authToken) {
      const payload = parseJwt<Superuser>(authToken); // Parse the authToken to get the payload
      
      if (payload) {
        const {id,username } = payload;
        setUser({ username, id });
        
      } else {
        setUser(null);
      }
    }
    const provinceToken = localStorage.getItem("province-token"); // Replace 'your_jwt_authToken_key' with the actual key used
    
    if (provinceToken) {
      const payload = parseJwt<Province>(provinceToken); // Parse the provinceToken to get the payload
      
      if (payload) {
        const { name, id, code } = payload;
        setProvince({ name, id, code });
        
      } else {
        setProvince(null);
      }
    }
  }, []);
  const { showFormModal: showModal, setShowFormModal: setShowModal } =
    useFormModal();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const toggleDropdown = () => {
      setIsDropdownOpen((prev) => !prev);
    };

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <ProvinceContext.Provider value={{ province, setProvince}}>
        <ModalContext.Provider value={{ showModal, setShowModal }}>
          <DropDownContext.Provider value={{isDropdownOpen, setIsDropdownOpen, toggleDropdown}} >
            <div>
              <div className="min-h-screen">{children}</div>
              <div></div>
            </div>
          </DropDownContext.Provider>
        </ModalContext.Provider>
      </ProvinceContext.Provider>
    </UserContext.Provider>
  );
};

export default Body;
