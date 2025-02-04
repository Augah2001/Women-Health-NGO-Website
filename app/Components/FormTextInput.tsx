import { Box, FormControl, FormLabel, Input, Text } from "@chakra-ui/react";
import { FaEye } from "react-icons/fa";


interface Props {
  id: string;
  label: string;
  value: any;
  type: string;
  onChange: ({ currentTarget }: React.ChangeEvent<HTMLInputElement>) => void;
  errors: { [key: string]: string };
}

const FormTextInput = ({ id, label, value, type, onChange, errors }: Props) => {
  return (
    <Box className="mb-4">
      <FormControl id={id}>
        <label className="text-slate-600 text-[14px] mb-2">{label}</label>
        <div className="flex mt-1">
          <input className=" text-slate-300 rounded-sm chakra-input " type={type}
            id = {id}
            value={value}
            onChange={(e) => {
              onChange(e);
            }}/>
            {type == 'password' && <div className="flex  bg-[#E3EFFC]"><FaEye className="my-auto me-1"/></div>}
        </div>
      </FormControl>
      
      {errors[id] && (
        <Box className="max-w-[195px]">
          <Text className="text-red-500 text-[11px]" >{errors[id]}</Text>
        </Box>
      )}
      
    </Box>
  );
};

export default FormTextInput;
