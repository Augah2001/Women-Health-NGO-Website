"use client";

import { useContext, useState } from "react";
import axios, { AxiosError } from "axios"; // Import axios for HTTP requests
import Joi from "joi";

import { useToast } from "@chakra-ui/react";
import apiClient from "../utils/apiClient";
import { jwtDecode } from "jwt-decode"; // Import jwt-decode
import ProvinceContext, { Province } from "../contexts/ProvinceContext";
import { Toaster, toast } from "sonner";
import Link from "next/link";
import { useRouter } from "next/navigation";
import FormTemplate from "../Components/FormTemplate";
import ModalContext from "../contexts/ModalContext";
import ResetForm from "../Components/ResetForm";
import DropDownContext from "../contexts/DropDownContext";

const LogiForm = () => {
  const [isLoading, setIsloading] = useState(false);
  const {setIsDropdownOpen} = useContext(DropDownContext)

  const router = useRouter();
  const { province, setProvince } = useContext(ProvinceContext);

  const [provinceData, setProvinceData] = useState<{ [key: string]: any }>({
    code: "",
    password: "",
  });

  const schema = Joi.object({
    code: Joi.string().required().label("Province Code"),
    password: Joi.string().required().label("Password"),
  });

  const doSubmit = async () => {
    setIsloading(true);
    try {
      const response = await apiClient.post("/login", provinceData);
      const { token } = response.data;
      

      if (token) {
        // Store the token in localStorage
        

        // Decode the token to get the payload
        const decodedToken: Province = jwtDecode(token);
       
        setProvince(decodedToken);
        localStorage.setItem("province-token", token);
      }
      router.push("/");

      toast.success(`login sucessful`);

      // Redirect to provinces list or another page after successful submission
    } catch (error: any) {
      console.log(error);
      const errorMessage = (typeof error.response?.data?.error === 'string' && error.response?.data?.error) || "An error occurred.";
      toast.error(errorMessage);
    } finally {
      setIsloading(false);
      setIsDropdownOpen(false)
    }
  };

  const { showModal, setShowModal } = useContext(ModalContext);

  return (
    <div className="shadow-md  ">
      {showModal && (
        <div
          onClick={() => setShowModal(false)}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        >
          <div
            onClick={(e) => e.stopPropagation()} // Prevent click event from closing the modal when clicking inside the form
            className="bg-white rounded-lg shadow-lg md:max-h-[100vh] xs:max-h-[100vh] xs:top-8 mt-4 w-[90%] sm:w-[90%] md:w-[90%] overflow-y-auto "
          >
            {<ResetForm />}
          </div>
        </div>
      )}

      <Toaster richColors position="bottom-center" />
      <FormTemplate
        schema={schema}
        doSubmit={doSubmit}
        data={provinceData}
        setData={setProvinceData}
      >
        {(renderInput, renderPasswordInput, renderButton, renderMarkdown) => (
          <div className="max-w-[200px]">
            
            <div className="">
              {renderInput("code", "Province Code", "text")}
              {renderPasswordInput("password", "Password")}
            </div>
            {renderButton("Login", isLoading)}
            <footer className="bottom-0 left-0 text-[11px] text-slate-500 mt-4">
              <Link
                href={"/register"}
                className="text-[#d47800] ps-2 hover:underline hover:font-medium"
              >
                Register a province instead
              </Link>
              <div
                onClick={() => setShowModal(true)}
                className="text-[#d47800] ps-2 cursor-pointer hover:underline hover:font-medium"
              >
                forgot password
              </div>
            </footer>
          </div>
        )}
      </FormTemplate>
    </div>
  );
};

export default LogiForm;
