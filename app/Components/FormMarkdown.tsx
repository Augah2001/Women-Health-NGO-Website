import "easymde/dist/easymde.min.css";
import { Box } from "@chakra-ui/react";
import  { SimpleMdeReact,  } from "react-simplemde-editor";
import { useMemo } from "react";

interface Props {
  id: string;
  label: string;
  value: any;
  onChange: any
  errors: { [key: string]: string };
}

const FormMarkdown = ({ id, label, value,onChange, errors }: Props) => {

    
  const autofocusNoSpellcheckerOptions = useMemo(() => {
    return {
      autofocus: true,
      spellChecker: false,
    } 
  }, []);
  return (
    <div>
      <label className="text-slate-600 text-[14px] mb-2">{label}</label>
      <SimpleMdeReact
        className="text-slate-300 rounded-sm m-input"
        options={autofocusNoSpellcheckerOptions}
        value={value}
        id={id}
        onChange={(e) =>{
            onChange({currentTarget: {id, value: e
                
            }
            })
        }}
        // onChange={(e) => onChange(e)}
      />
      {errors[id] && (
        <div className="max-w-[195px]">
          <p className="text-red-500 text-[11px]">{errors[id]}</p>
        </div>
      )}
    </div>
  );
};

export default FormMarkdown;
