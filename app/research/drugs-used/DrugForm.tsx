"use client";

import { Dispatch, SetStateAction, useContext, useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import Joi from "joi";
import FormTemplate from "../../Components/FormTemplate";
import { useToast } from "@chakra-ui/react";
import apiClient from "../../utils/apiClient";

import UserContext from "../../contexts/UserContext";
import { Toaster, toast } from "sonner";
import { Drug, Row } from "../../utils/types";
import { useRouter } from "next/navigation";
import useFetchInitial from "../../hooks/useFetchInitial";
import { BiX } from "react-icons/bi";
import ModalContext from "@/app/contexts/ModalContext";
import ProvinceContext, { Province } from "@/app/contexts/ProvinceContext";
import useProvinces from "@/app/hooks/useProvinces";

interface Props {
  id?: string;
  setRows: Dispatch<SetStateAction<Row[]>>;
  onClose: () => void;
}

interface FieldData {
  startAge: string;
  endAge: string;
  gender: string;
  startDate: string;
  endDate: string;
  race: string;
  drugName: string;
  price: string;
  location: string;
  usersCount: string;
  [key: string]: string | number;
}

interface ProvinceData {
  ProvinceName: string;
  ProvinceCode: string;
}

const DrugForm = ({ id, onClose, setRows }: Props) => {
  const router = useRouter();
  const { user } = useContext(UserContext);
  const { province } = useContext(ProvinceContext);
  const [provinceData, setProvinceData] = useState<ProvinceData | null>(null);
  const [isProvinceLoading, setIsProvinceLoading] = useState<boolean>(true);
  const [drugData, setDrugData] = useState<{ [key: string]: any }>({
    ...(user && { ProvinceId: parseInt("") }),
    startAge: "",
    endAge: "",
    gender: "",
    race: "",
    startDate: "",
  endDate: "",
    drugName: "",
    price: "",
    location: "",
    usersCount: "",
  });

  const { data } = useFetchInitial<FieldData>({ endpoint: "drugs", id: id });
  const { data: provinces } = useProvinces();

  const provinceMap = provinces?.map((province: Province) => ({
    value: province.id,
    label: province.name,
  }));

  useEffect(() => {
    if (data) {
      const {
        startAge,
        endAge,
        gender,
        startDate,
        endDate,
        race,
        drugName,
        price,
        location,
        usersCount,
      } = data;
      setDrugData({
        startAge,
        endAge,
        startDate,
        endDate,
        gender,
        race,
        drugName,
        price,
        location,
        usersCount,
      });
    }
  }, [data]);

  useEffect(() => {
    if (province) {
      setProvinceData({
        ProvinceCode: province.code,
        ProvinceName: province.name,
      });
      setIsProvinceLoading(false);
    } else if (drugData.ProvinceId) {
      apiClient
        .get<Province>("/provinces/" + drugData.ProvinceId)
        .then((res) => {
          setProvinceData({
            ProvinceCode: res.data.code,
            ProvinceName: res.data.name,
          });
        })
        .catch((err) => console.log(err))
        .finally(() => setIsProvinceLoading(false));
    } else {
      setIsProvinceLoading(false);
    }
  }, [province, drugData.ProvinceId]);

  const schema = Joi.object({
    startAge: Joi.number().integer().min(0).required(),
    ...(user && { ProvinceId: Joi.number().required() }),
    endAge: Joi.number().integer().min(0).greater(Joi.ref("startAge")).required(),
    gender: Joi.string().valid("male", "female", "other").required(),
    startDate: Joi.date().required().label("Start Date"),
    endDate: Joi.date().required().label("End Date"),
    race: Joi.string().required(),
    drugName: Joi.string().required(),
    price: Joi.number().precision(2).min(0).required(),
    location: Joi.string().required(),
    usersCount: Joi.number().integer().min(0).required(),
  });

  const [isLoading, setIsLoading] = useState(false);

  const doSubmit = async () => {
    if (isProvinceLoading) {
      toast.error("Province data is loading. Please wait...");
      return;
    }

    if (!provinceData || !provinceData.ProvinceCode) {
      toast.error("Province data is missing. Cannot submit form.");
      return;
    }

    setIsLoading(true);

    const startAge = parseInt(drugData.startAge);
    const endAge = parseInt(drugData.endAge);
    const usersCount = parseInt(drugData.usersCount);
    const price = parseFloat(drugData.price);

    const newDrugData: {[key: string]: any} = {
      ...drugData,
      ProvinceCode: provinceData.ProvinceCode,
      startAge,
      endAge,
      usersCount,
      price,
    };

    try {
      let response;
      newDrugData['startDate'] = new Date(newDrugData['startDate']).toISOString()
      newDrugData['endDate'] = new Date(newDrugData['endDate']).toISOString()
      if (id) {
        response = await apiClient.put(`/drugs/${id}`, newDrugData);
        toast.success(`Drug info for ${drugData.drugName} updated successfully`);
      } else {
        response = await apiClient.post("/drugs", newDrugData);
        toast.success("Drug added successfully");
      }

      const newDrug = {
        ...response.data,
        startDate: response.data.startDate.substring(0, 10),
        endDate: response.data.endDate.substring(0, 10),
        provinceName: provinceData.ProvinceName,
        code: provinceData.ProvinceCode,
      };

      setRows((prevNewsList: Row[]) =>
        id
          ? prevNewsList.map((news) =>
              news.id === response.data.id ? newDrug : news
            )
          : [newDrug, ...prevNewsList]
      );

      setTimeout(() => {
        onClose();
      }, 1000);
    } catch (error: any) {
      console.error(error)
      const errorMessage = (typeof error.response?.data?.error === 'string' && error.response?.data?.error) || "An error occurred.";
      toast.error(
        errorMessage
      );
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const { setShowModal } = useContext(ModalContext);

  return (
    <div className="sm:mx-4 mb-8 rounded-md">
      <div
        className="text-2xl mt-4 text-[#0c361d] flex justify-end"
        onClick={() => setShowModal(false)}
      >
        <BiX />
      </div>
      <FormTemplate
        schema={schema}
        doSubmit={doSubmit}
        data={drugData}
        setData={setDrugData}
      >
        {(renderInput, renderPasswordInput, renderButton, _, __, renderSelect) => (
          <div className="max-w-[400px]">
            <Toaster richColors position="bottom-center" />
            <h1 className="text-slate-700 text-2xl font-bold mb-4">Drug Form</h1>
            <div className="grid grid-cols-2 gap-4">
              {provinceMap && user && renderSelect("ProvinceId", "Province", provinceMap,false)}
              {renderInput("startAge", "Start Age", "number")}
              {renderInput("endAge", "End Age", "number")}
              {renderInput("gender", "Gender", "text")}
              {renderInput("race", "Race", "text")}
              {renderInput("drugName", "Drug Name", "text")}
              {renderInput("price", "Price", "number")}
              {renderInput("startDate", "Start Date", "date")}
              {renderInput("endDate", "End Date", "date")}
              {renderInput("location", "Location", "text")}
              {renderInput("usersCount", "Users Count", "number")}
            </div>
            {renderButton("Submit", isLoading)}
          </div>
        )}
      </FormTemplate>
    </div>
  );
};

export default DrugForm;
