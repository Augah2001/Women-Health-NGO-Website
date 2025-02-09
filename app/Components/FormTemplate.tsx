import Joi from 'joi';
import React, { Dispatch, SetStateAction, useState } from 'react';

import FormPasswordInput from './FormPasswordInput';
import FormTextInput from './FormTextInput';
import FormText from './FormText';
import FormMarkdown from './FormMarkdown';
import FormUpload from './FormUpload';
import FormInputSelect from './FormSelect';

interface Props {
  children: (
    renderInput: (id: string, label: string, type: string) => JSX.Element,
    renderPasswordInput: (id: string, label: string) => JSX.Element,
    renderButton: (label: string, isLoading?: boolean) => JSX.Element,
    renderMarkdown: (id: string, label: string) => JSX.Element,
    renderFileUpload: (id: string, label: string, type: string, multiple: boolean) => JSX.Element,
    renderSelect: (id: string , label: string, options: { label: string | number; value: string | number }[], allowCustom?: boolean) => JSX.Element,
  ) => JSX.Element;
  doSubmit: () => void;
  schema: Joi.ObjectSchema<any> & { [key: string]: any };
  data: { [key: string]: any };
  setData: any;
}

const FormTemplate: React.FC<Props> = ({ children, doSubmit, data, setData, schema }) => {
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [showPassword, setShowPassword] = useState(false);

  const validate = () => {
    const { error } = schema.validate(data, { abortEarly: false });
    if (!error) return {};
    const newErrors: { [key: string]: string } = {};
    error.details.forEach((item) => {
      newErrors[item.path[0]] = item.message.replace(/["]/g, '');
    });
    return newErrors;
  };

  const validateProperty = (id: string, value: string) => {
    const property = { [id]: value };
    const newSchema = Joi.object({
      [id]: schema.extract(id),
    });

    const { error } = newSchema.validate(property);
    if (!error) return '';
    return error.message.replace(/["]/g, '');
  };

  const handleChange = ({
    currentTarget: input,
  }: React.ChangeEvent<HTMLInputElement>) => {
    const newErrors = { ...errors };
    const errorMessage = validateProperty(input.id, input.value);
    if (errorMessage) {
      newErrors[input.id] = errorMessage;
    } else {
      delete newErrors[input.id];
    }
    setErrors(newErrors);

    const newData = { ...data };
    newData[input.id] = input.value;
    setData(newData);
  };



  const handleInputChange = (e:  React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const id = e.target.id;
    setData({ ...data, [id]: e.target.value });
    const errorMessage = validateProperty(id, e.target.value);
    if (errorMessage) {
      setErrors({ ...errors, [id]: errorMessage });
    } else {
      const { [id]: _, ...remainingErrors } = errors;
      setErrors(remainingErrors);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    console.log('handleSubmit');
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      console.log(validationErrors)

    } else {
      doSubmit();
    }
  };

  const renderInput = (id: string, label: string, type: string) => (
    <FormTextInput
      id={id}
      type={type}
      label={label}
      onChange={handleChange}
      value={data[id] || ''}
      errors={errors}
    />
  );

  const renderFileUpload = (id: string, label: string, type: string, multiple: boolean) => {
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files.length > 0) {
        const filesArray = Array.from(e.target.files);
        setData({ ...data, [id]: filesArray });
        setErrors({ ...errors, [id]: '' });
      }
    };

    return (
      <FormUpload
        multiple={multiple}
        id={id}
        type={type}
        label={label}
        onChange={handleFileChange}
        value={data[id]}
        errors={errors}
      />
    );
  };

  const renderSelect = (id: string, label: string, options: { label: string | number; value: string |number }[],allowCustom: boolean = true) => (
    <FormInputSelect
      allowCustom={allowCustom}
      id={id}
      label={label}
      value={data[id] || ''}
      options={options}
      onChange={(e) => {
        
          handleInputChange(e);
        
      }}
      data={data}
      setData={setData}
      errors={errors}
    />
  );

  const renderMarkdown = (id: string, label: string) => (
    <FormMarkdown
      id={id}
      label={label}
      onChange={handleChange}
      value={data[id] || ''}
      errors={errors}
    />
  );

  const renderPasswordInput = (id: string, label: string) => (
    <FormPasswordInput
      label={label}
      id={id}
      value={data[id] || ''}
      onChange={handleChange}
      errors={errors}
    />
  );

  const renderButton = (label: string, isLoading = false) => (
    <button className="custom-button w-full mt-3" type="submit" disabled = {isLoading}>
      {label}
    </button>
  );

  const renderText = (route: string, text: string | null, linkText: string | null) => (
    <FormText route={route} text={text} linkText={linkText} />
  );

  return (
    <form className="bg-gray-700 p-5  rounded-md" onSubmit={handleSubmit}>
      {children(
        renderInput,
        renderPasswordInput,
        renderButton,
        renderMarkdown,
        renderFileUpload,
        renderSelect
      )}
    </form>
  );
};

export default FormTemplate;
