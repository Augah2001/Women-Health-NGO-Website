"use client";
import { useCallback, useContext, useEffect, useState } from "react";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { TextField, Button } from "@mui/material";
import axios from "axios";
import { Drug, Province, Row } from "../../utils/types";
import apiClient from "../../utils/apiClient";
import { FaTrashAlt } from "react-icons/fa";
import { Toaster, toast } from "sonner";
import Link from "next/link";
import UserContext from "../../contexts/UserContext";

import ModalContext from "@/app/contexts/ModalContext";
import useFormModal from "@/app/hooks/useFormModal";
import DrugForm from "./DrugForm";
import { BiPlusCircle } from "react-icons/bi";
import ProvinceContext from "@/app/contexts/ProvinceContext";

const EmployeeDataGrid = () => {
  const { user } = useContext(UserContext);
  const [rows, setRows] = useState<Row[]>([]);
  const {province} = useContext(ProvinceContext)
  const [searchParams, setSearchParams] = useState<any>({
    code: "",
    provinceName: "",
    location: "",
    drugName: "",
    price: null,
    gender: "",
    startAge: "",
    endAge: "",
    race: "",
    usersCount: null,
    startDate: "",
    endDate: ""
  });

  const handleSearch = useCallback(async () => {
  
    try {
      const response = await apiClient.get<Drug[]>("/drugs", {
        params: searchParams,
      }); // Replace with your actual API URL

      const drugData = response.data.map((drug) => {
        // Create a new object with the modified properties
        const { Province, ProvinceCode, startDate, ageDate, ...rest } = drug; // Destructure Province out
        return {
          ...rest,
          startDate: drug.startDate.substring(0, 10),
          endDate: drug.endDate.substring(0, 10),
          code: drug.ProvinceCode,
          provinceName: drug.Province?.name || "", // Use optional chaining and provide a default value
        };
      });
      setRows(drugData);
     
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, [searchParams]);

  const fetchData = async () => {
    try {
      const response = await apiClient.get<Drug[]>("/drugs"); // Replace with your actual API URL
      const drugData = response.data.map((drug) => {
        // Create a new object with the modified properties
        const { Province, ProvinceCode, startDate, endDate, ...rest } = drug; // Destructure Province out
        return {
          ...rest,
          startDate: drug.startDate.substring(0, 10),
          endDate: drug.endDate.substring(0, 10),
          code: drug.ProvinceCode,
          provinceName: drug.Province?.name || "", // Use optional chaining and provide a default value
        };
      });

     
     

      setRows(drugData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
    
  }, []);

  useEffect(() => {
    handleSearch();
  }, [handleSearch, searchParams]);

 

  const handleDelete = async (id: number) => {
    const prevRows = rows;
    const newDrugData = rows.filter((drug) => drug.id !== id);
    setRows(newDrugData);
    try {
      await apiClient.delete<Drug>(`/drugs/${id}`);

      toast.success("Deleted successfully");
    } catch (error: any) {
      setRows(prevRows);
      toast.error(error.response?.data?.error || "Could not delete");
    }
  };

  const columns: any = [
    {
      field: "code",
      headerName: "Code",
      width: 100,
      renderCell: (params: GridRenderCellParams) => (
        <div style={{ fontWeight: "bold" }} className="text-slate-700" >
         {(params.row.code == province?.code || user) ? <div
              onClick={() => {
                setShowModal(true)
                setSelectedItemId(params.row.id)}}
              // href={`/admin/drugs/edit/${params.row.id}`} // Use 'to' instead of 'href' for react-router-dom's Link
              className=" cursor-pointer text-[#53c56e] hover:text-[#288142]"
            >
              {params.value}
            </div>: <p className="text-slate-700">{params.value}</p>}
        </div>
      ),
    },
    { field: `provinceName`, headerName: "Province", width: 150 },
    { field: "location", headerName: "Location", width: 150 },
    { field: "drugName", headerName: "Drug Name", width: 150 },
    { field: "price", headerName: "Price", width: 80 },
    { field: "gender", headerName: "Gender", width: 80 },
    { field: "startAge", headerName: "Start Age", width: 80 },
    { field: "endAge", headerName: "End Age", width: 80 },
    { field: "startDate", headerName: "Start Date", width: 100 },
    { field: "endDate", headerName: "End Date", width: 100 },
    { field: "race", headerName: "Race", width: 80 },
    { field: "usersCount", headerName: "Users Count", width: 100 },
    {
      field: "action",
      headerName: "Delete",
      width: 100,
      renderCell: (params: GridRenderCellParams) => (
        <div style={{ fontWeight: "bold" }} className="text-slate-700" >
          {(params.row.code == province?.code || user) && (
            <div className="flex ">
            <FaTrashAlt
              className="text-red-500 my-3 mx-3 text-md hover:text-red-700 cursor-pointer"
              onClick={() => handleDelete(params.row.id)}
            >
              Delete
            </FaTrashAlt>
          </div>
          )}
        </div>
      ),
    },
    
  
    // Conditionally add the "actions" column as an array element
  
  ];

  const {  selectedItemId, setSelectedItemId } =
    useFormModal();

    const {showModal, setShowModal} = useContext(ModalContext); 

  return (
    <div>
      {showModal && (
          <div
            onClick={() => setShowModal(false)}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          >
            <div
              onClick={(e) => e.stopPropagation()} // Prevent click event from closing the modal when clicking inside the form
              className="bg-white rounded-lg shadow-lg md:max-h-[100vh] xs:max-h-[100vh] flex justify-center xs:top-8 mt-4 w-[90%] sm:w-[90%] md:w-[50%] overflow-y-auto "
            >
              { (
                <DrugForm onClose={() => setShowModal(false)} setRows={setRows} id={selectedItemId?.toString()} />
              )}
            </div>
          </div>
        )}
      <div
        className="bg-white shadow-[0_0px_20px_0_rgba(0,0,0,0.1)] mt-28    rounded-md px-4 mx-8"
        style={{ height: "460px",  display: "flex", flexDirection: "column" }}
      >
      
        <Toaster position="bottom-center" richColors />
        {( user || province) && <div className=" pt-4">
            <button
              className="flex items-center hover:text-[#051608]  px-3 py-2 rounded-md hover:bg-[#deedce]  text-[#051608] bg-[#dfe4da] transition-all duration-300"
              onClick={()=> {
                setSelectedItemId(undefined);
                setShowModal(true);
              }}
            >
              <BiPlusCircle className="mr-2 text-xl" />
              Add
            </button>
          </div>}
        <div
          className="overflow-x-auto pt-4   pb-[4px]"
          style={{ whiteSpace: "nowrap" }}
        >
          
          {Object.keys(searchParams).map((key) => (
            <TextField
              sx={{
                "& .MuiInputLabel-root": { color: "#64748b" }, // Adjust color here
                "& .MuiInputBase-root": { color: "#64748b", width: "95px" }, // Adjust color here
                "& .MuiInputLabel-root.Mui-focused": {
                  color: "#64748b", // Adjust color when focused
                },
                input: { color: "#53c56e" }, // Input Text Color
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#64748b",
                    width: "95px", // Unfocused border
                  },
                  "&:hover fieldset": {
                    borderColor: "gray", // Hover border
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#53c56e", // Focused border
                  },
                },
              }}
              key={key}
              label={key.replace("_", " ").toUpperCase()}
              value={searchParams[key] as string | number | undefined}
              onChange={(e) =>
                setSearchParams({ ...searchParams, [key]: e.target.value })
              }
              style={{ marginRight: "16px" }}
            />
          ))}
          <Button
            color="success"
            style={{height: "100%"}}
            className="bg-[#378348] h-full"
            variant="contained"
            onClick={handleSearch}
          >
            Search
          </Button>
        </div>
        <div style={{ flexGrow: 1 }}>
          <DataGrid
            className="bg-white max-h-[310px]"
            columnHeaderHeight={55}
            rows={rows}
            columns={columns}
            rowHeight={45}
            getRowClassName={(params) =>
              params.indexRelativeToCurrentPage % 2 === 0 ? "even" : "odd"
            }
            sx={{
              "& .MuiDataGrid-columnHeaderTitle": {
                color: "#64748b",
                fontSize: "14px",
                fontWeight: "bold",
              },
              "& .MuiTablePagination-selectLabel": {
                color: "gray",
              },
              "& .MuiTablePagination-displayedRows": {
                color: "gray",
              },
              "& .MuiTablePagination-root": {
                "& .MuiButtonBase-root": {
                  color: "#53c56e",
                },
                "& .MuiTablePagination-select": {
                  color: "#53c56e",
                },
                "& .MuiTablePagination-displayedRows": {
                  color: "#53c56e",
                },
              },
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default EmployeeDataGrid;
