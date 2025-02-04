import useFetch from "./useFetch";
import { News } from "../utils/types";
import useFetchSingle from "./useFetchSingle";

const useNewsSingle = (url: string, id: string | number) => useFetchSingle<News>(url, id);

export default useNewsSingle;
