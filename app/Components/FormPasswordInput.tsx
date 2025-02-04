import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import {
  FormControl,
  FormLabel,
  InputGroup,
  Input,
  InputRightElement,
  Button,
  Box,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { Dispatch, SetStateAction } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

interface Props {
  id: string;
  label: string;
  value: any;
  onChange: ({ currentTarget }: React.ChangeEvent<HTMLInputElement>) => void;
  errors: { [key: string]: string };
}

const FormPasswordInput = ({
  id,
  value,
  label,
  onChange,

  errors,
}: Props) => {

  const [showPassword, setShowPassword] = React.useState(false);

  return (
    <Box className="mb-4">
      <FormControl id={id}>
        <label className="text-slate-600 text-[14px] ">{label}</label>
        <div className="flex mt-1">
          <input className=" text-slate-300 rounded-sm chakra-input "
           type={showPassword ? "text" : "password"}
            id = {id}
            value={value}
            onChange={(e) => {
              onChange(e);
            }}/>
            {<div className="flex ms-1 " onClick={()=> {
              setShowPassword(!showPassword)
             }}>{ !showPassword?<FaEye className="my-auto me-1"
             />: <FaEyeSlash className="my-auto me-1" />}</div>}
        </div>
      </FormControl>
      <Text className="text-red-500 text-[11px] max-w-[195px]" >{errors[id]}</Text>
    </Box>
  );
};

export default FormPasswordInput;
