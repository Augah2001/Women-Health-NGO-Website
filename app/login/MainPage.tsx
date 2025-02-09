"use client";
import React from "react";
import SuperUser from "./SuperUserForm";
import ProvinceLoginForm from "./ProvinceLoginForm";

const MainPage = () => {
  const [isSuperUser, setIsSuperUser] = React.useState(false);

  return (
    <div className="mt-28 bg-gray-700 shadow-lg rounded-lg">
  <div className="flex items-center justify-center border-b-[1px] w-full border-b-gray-400 h-16">
    <h1 className="text-[#D4AF37] text-2xl font-bold px-4">Login</h1>
  </div>
  <div><SuperUser /></div>
</div>

  );
};

export default MainPage;
