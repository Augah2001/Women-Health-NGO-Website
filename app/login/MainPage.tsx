"use client";
import React from "react";
import SuperUser from "./SuperUserForm";
import ProvinceLoginForm from "./ProvinceLoginForm";

const MainPage = () => {
  const [isSuperUser, setIsSuperUser] = React.useState(false);

  return (
    <div className="mt-28 bg-white shadow-md">
      <h1 className="text-black text-2xl font-bold px-4 mb-4">Login</h1>
      <div className="flex px-2  h-10">
        <div
          onClick={() => {
            setIsSuperUser(true);
          }}
          className={`text-md w-[50%] flex ${isSuperUser && "bg-[#6eda8544]"}  cursor-pointer font-bold text-[#083211] justify-center
           items-center border-r-[2px] border-[#207140d1]`}
        >
          Superuser
        </div>
        <div
          onClick={() => setIsSuperUser(false)}
          className={`text-md w-[50%] font-bold ${!isSuperUser && "bg-[#6eda8544]"} cursor-pointer flex text-[#083211] justify-center items-center `}
        >
          Province
        </div>
      </div>
      <div>{isSuperUser ? <SuperUser /> : <ProvinceLoginForm />}</div>
    </div>
  );
};

export default MainPage;
