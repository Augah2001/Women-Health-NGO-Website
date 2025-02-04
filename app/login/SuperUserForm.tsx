"use client";

import { useContext, useState } from "react";
import Joi from "joi";
import apiClient from "../utils/apiClient";
import { jwtDecode } from "jwt-decode"; // Import jwt-decode
import UserContext from "../contexts/UserContext";
import { Toaster, toast } from "sonner";
import Link from "next/link";
import { useRouter } from "next/navigation";
import FormTemplate from "../Components/FormTemplate";
import ModalContext from "../contexts/ModalContext";
import ResetForm from "../Components/ResetForm";
import { Superuser } from "../contexts/UserContext";
import DropDownContext from "../contexts/DropDownContext";




const LogiForm = () => {
  const [isLoading, setIsloading] = useState(false);
  const {setIsDropdownOpen} = useContext(DropDownContext)

  const router = useRouter();
  const { setUser } = useContext(UserContext);

  const [provinceData, setProvinceData] = useState<{ [key: string]: any }>({
    username: "",
    password: "",
  });

  const schema = Joi.object({
    username: Joi.string().required().label("User Name"),
    password: Joi.string().required().label("Password"),
  });

  const doSubmit = async () => {
    setIsloading(true);
    try {
      const response = await apiClient.post("/superuser", provinceData);
      const { token } = response.data;

      if (token) {
        // Store the token in localStorage
        localStorage.setItem("authToken", token);

        // Decode the token to get the payload
        const decodedToken: Superuser  = jwtDecode(token);
       
        setUser(decodedToken);
        localStorage.setItem("auth-token", token);
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
    <div className="shadow-md">

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
              {renderInput("username", "Username", "text")}
              {renderPasswordInput("password", "Password")}
            </div>
            {renderButton("Login", isLoading)}
            
          </div>
        )}
      </FormTemplate>
    </div>
  );
};

export default LogiForm;
