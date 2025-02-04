import React, { Dispatch, SetStateAction, useState } from 'react';

interface FormInputSelectProps {
  id: string;
  label: string;
  value: string;
  options: { label: string | number; value: string | number }[];
  onChange: (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => void;
  errors: { [key: string]: string };
  setData: Dispatch<SetStateAction<{ [key: string]: any }>>;
  data: { [key: string]: any };
  allowCustom: boolean
}

const FormInputSelect: React.FC<FormInputSelectProps> = ({
  id,
  label,
  value,
  options,
  onChange,
  errors,
  setData,
  data,
  allowCustom
  
}) => {
  const [isCustomOption, setIsCustomOption] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    
    const selectedValue = e.target.value;

    if (selectedValue === 'custom') {
      setIsCustomOption(true);
      setInputValue('');
      setData({...data, [id]: ''});
    } else {
      setInputValue(selectedValue);
      setIsCustomOption(false);
      onChange(e);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    onChange(e);
  };

  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-gray-700 text-sm font-bold mb-2">
        {label}
      </label>
      <div className="relative">
        <select
          id={id}
          value={isCustomOption ? 'custom' : value}
          onChange={handleSelectChange}
          className="block w-full px-3 py-2 border border-gray-300 chakra-input rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        >
           <option className='text-gray-400' value=""> select one...</option> 
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
          {allowCustom &&<option value="custom">Add Custom Option</option>}
        </select>
        {isCustomOption && (
          <input
            type="text"
            id={id}
            value={inputValue}
            onChange={handleInputChange}
            className="mt-2 block w-full px-3 py-2 border chakra-input border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Enter custom value"
          />
        )}
      </div>
      {errors[id] && (
        <p className="mt-1 text-red-500 text-xs">{errors[id]}</p>
      )}
    </div>
  );
};

export default FormInputSelect;
