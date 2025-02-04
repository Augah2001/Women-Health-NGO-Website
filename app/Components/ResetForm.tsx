"use client";

import { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner"; // Assume you have already installed Sonner for toast notifications
import FormTemplate from "../Components/FormTemplate"; // Assuming you have a reusable FormTemplate component
import Joi from "joi"; // For validation
import apiClient from "../utils/apiClient";
import { AxiosError } from "axios";
import ModalContext from "../contexts/ModalContext";
import { BiX } from "react-icons/bi";

const ForgotPasswordForm = () => {
  const [provinceCode, setCode] = useState<{ [key: string]: any }>({
    provinceCode: "",
  });

  const { setShowModal } = useContext(ModalContext);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  // Define the schema for validation using Joi
  const schema = Joi.object({
    provinceCode: Joi.string().required(),
  });

  // Function to handle form submission

  const handleSubmit = async () => {
    setIsLoading(true);

    try {
      
      // Send request to backend to handle forgot password using Axios
      const response = await apiClient.post(
        "/request-password-reset",
        provinceCode
      );
   

      toast.success(
        "Password reset link has been sent to your Superuser email."
      );
      // Optionally, redirect to login or another page

      setShowModal(false);

      
    } catch (error: any) {
      console.log(error);
      console.error("Error sending reset provinceCode:", error);
      const errorMessage = (typeof error.response?.data?.error === 'string' && error.response?.data?.error) || "An error occurred.";
      toast.error(
        errorMessage
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className=" mt-10 shadow-md p-6 rounded-lg">
      <div
        className=" text-2xl text-[#0c361d] flex justify-end "
        onClick={() => setShowModal(false)}
      >
        <BiX />
      </div>
      <h1 className="text-2xl font-bold mb-4">Forgot Password</h1>
      <FormTemplate
        schema={schema}
        doSubmit={handleSubmit}
        data={provinceCode}
        setData={setCode}
      >
        {(renderInput, _, renderButton) => (
          <>
            {renderInput("provinceCode", "Province Code", "text")}
            {renderButton("Send Reset Link", isLoading)}
          </>
        )}
      </FormTemplate>
    </div>
  );
};

export default ForgotPasswordForm;
