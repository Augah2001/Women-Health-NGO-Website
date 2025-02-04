import { Button, HStack, Radio, RadioGroup,Text } from '@chakra-ui/react';
import { Dispatch, SetStateAction } from 'react';


interface Props {
  data: { [key: string]: string };
  id: string;
  setData: Dispatch<SetStateAction<{ [key: string]: string }>>;
  errors: { [key: string]: string };
  radioData: { label: string; value: any }[];
  handleRadioChange?: (id: string, value: string) => void; 
  onChange: ({
    currentTarget
  }: React.ChangeEvent<HTMLInputElement>) => void;
}

const FormRadioButtons = ({data, id, radioData,errors, handleRadioChange }: Props) => {


  

    return (
      <RadioGroup marginY={2}
        value= {data[id]}
        onChange={(value)=> handleRadioChange?.(id, value )}
      >
        <HStack>
          {radioData.map((item) => (
            <Radio key={item.value} value= {item.value} >
              {item.label}
            </Radio>
          ))}
        </HStack>
        {errors[id] && <Text color={"red.400"}>{errors[id]}</Text>}
      </RadioGroup>
    );
    
}

export default FormRadioButtons