"use client";

import { useContext, useState } from "react";
import axios, { AxiosError } from "axios"; // Import axios for HTTP requests
import Joi from "joi";
import FormTemplate from "../Components/FormTemplate";
import { useToast } from "@chakra-ui/react";
import apiClient from "../utils/apiClient";

import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import { Toaster, toast } from "sonner";
import Link from "next/link";
import ProvinceContext, { Province } from "../contexts/ProvinceContext";


const ProvinceForm = () => {
  const router = useRouter();
  const { province, setProvince } = useContext(ProvinceContext);
  const [isLoading, setIsloading] = useState(false);
  const [provinceData, setProvinceData] = useState<{ [key: string]: any }>({
    name: "",
    code: "",
    password: "",
  });

  const schema = Joi.object({
    name: Joi.string().min(3).required(),
    code: Joi.string()
      .pattern(/^ZCLDN[0-9]+$/)
      .required()
      .messages({
        "string.pattern.base":
          '"code" must be in the format "ZCLDN" followed by one or more non-negative numbers',
      }),
    password: Joi.string()
      .min(8)
      .pattern(
        /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]+$/
      )
      .required()
      .messages({
        "string.pattern.base":
          '"password" must contain at least one capital letter, one special character, and one number',
      }),
    superUserPassword: Joi.string(),
  });

  const doSubmit = async () => {
    setIsloading(true);
    try {
      const response = await apiClient.post("/provinces", provinceData);
      const { token } = response.data;


      if (token) {
        // Decode the token to get the payload
        const decodedToken: Province = jwtDecode(token);
       
        setProvince(decodedToken);

        localStorage.setItem("province-token", token);
      }

      toast.success("Province added successfully");

      router.push("/");
    } catch (error: any) {
      const errorMessage = (typeof error.response?.data?.error === 'string' && error.response?.data?.error) || "An error occurred.";
      toast.error(errorMessage);

      console.log(error);
    } finally {
      setIsloading(false);
    }
  };

  return (
    <div>
      <Toaster richColors position="bottom-center" />
      <FormTemplate
        schema={schema}
        doSubmit={doSubmit}
        data={provinceData}
        setData={setProvinceData}
      >
        {(renderInput, renderPasswordInput, renderButton) => (
          <div className="max-w-[240px]">
            <h1 className="text-slate-700 text-2xl font-bold mb-4">
              Add Province
            </h1>
            <div className="">
              {renderInput("name", "Province Name", "text")}
              {renderInput("code", "Province Code", "text")}
              {renderPasswordInput("password", "Password")}
              <small className="text-green-500 text-[10px]">
                Please provide the superuser password to verify{" "}
              </small>
              {renderPasswordInput("superUserPassword", "Superuser Password")}
            </div>
            {renderButton("Add", isLoading)}
            <footer className="bottom-0 left-0 text-[11px] text-slate-500 mt-4">
              <Link
                href={"/login"}
                className="text-[#d47800] ps-2 hover:underline hover:font-medium"
              >
                Login instead
              </Link>
            </footer>
          </div>
        )}
      </FormTemplate>
    </div>
  );
};

export default ProvinceForm;
