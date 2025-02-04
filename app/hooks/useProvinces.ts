import useFetch from "./useFetch";
import { Province } from "../utils/types";

const useProvinces = () => useFetch<Province>("/provinces");

export default useProvinces;
