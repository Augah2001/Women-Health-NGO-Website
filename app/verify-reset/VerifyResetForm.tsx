// components/ResetPasswordForm.tsx

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // Import useSearchParams to get the token from the URL
import { toast } from "sonner"; // Using Sonner for toast notifications
import FormTemplate from "../Components/FormTemplate"; // Assuming you have a reusable FormTemplate component
import Joi from "joi"; // For validation
import apiClient from "../utils/apiClient"; // Axios instance for API requests

const ResetPasswordForm = ({
  searchParams: { token },
}: {
  searchParams: { token: string };
}) => {
  const [formData, setFormData] = useState<{ [key: string]: any }>({
    newPassword: "",
    token: "",
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    if (token) {
      setFormData((prevData) => ({ ...prevData, token }));
    }
  }, [token]);

  // Set the token in the form data when the component mounts

  // Define the schema for validation using Joi
  const schema = Joi.object({
    newPassword: Joi.string().min(6).required().label("New Password"),
    token: Joi.string().required().label("Token"),
  });

  // Function to handle form submission
  const handleSubmit = async () => {
    setIsLoading(true);

    try {
      // Send request to backend to handle password reset using Axios
      const response = await apiClient.post("/reset-password", formData);

      toast.success("Password successfully reset.");
      // Redirect to login or another page after success
      router.push("/login");

      toast.error(response.data.error || "Failed to reset password.");
    } catch (error: any) {
      console.error("Error resetting password:", error);
      const errorMessage =
        (typeof error.response?.data?.error === "string" &&
          error.response?.data?.error) ||
        "An error occurred.";
      toast.error(
        errorMessage
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto shadow-md mt-28 p-6 bg-white rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Reset Password</h1>
      <FormTemplate
        schema={schema}
        doSubmit={handleSubmit}
        data={formData}
        setData={setFormData}
      >
        {(_, renderPassword, renderButton) => (
          <>
            {renderPassword("newPassword", "New Password")}
            {renderButton("Reset Password", isLoading)}
          </>
        )}
      </FormTemplate>
    </div>
  );
};

export default ResetPasswordForm;
