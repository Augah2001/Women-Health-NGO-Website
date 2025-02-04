import { useState } from 'react';

interface Props {
  id: string;
  label: string;
  value: any; 
  type: string;
  onChange: ({ currentTarget }: React.ChangeEvent<HTMLInputElement>) => void;
  errors: { [key: string]: string };
  multiple: boolean
}

const FormTextInput = ({ id, label, type, onChange, errors, multiple }: Props) => {
  const [fileNames, setFileNames] = useState<string[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange(e); 

      if (e.target.files && e.target.files.length > 0) {
          const namesArray = Array.from(e.target.files).map(file => file.name);
          setFileNames(namesArray);
      } else {
          setFileNames([]);
      }
  };

  return (
      <div className="mb-4">
          <label htmlFor={id} className="block text-slate-600 text-sm mb-2">
              {label}
          </label>

          <div className="relative"> 
              <input
                  type="file"
                  multiple={multiple}
                  id={id}
                  accept={type}
                  onChange={handleFileChange}
                  className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
              />
              <div className="flex items-center">
                  <button className="bg-[#62b866] hover:bg-[#498d4c] h-full text-white font-bold py-2 px-4 rounded-l focus:outline-none focus:shadow-outline">
                      Choose File
                  </button>
                  <span className="border border-gray-300 rounded-r py-2 px-3 text-gray-700 leading-tight">
                      {fileNames.length > 0 ? fileNames.join(", ") : "No file chosen"}
                  </span>
              </div>
          </div>

          {errors[id] && (
              <p className="mt-2 text-red-500 text-xs max-w-[195px]">
                  {errors[id]}
              </p>
          )}
      </div>
  );
};

export default FormTextInput;