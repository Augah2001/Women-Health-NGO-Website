import useFetch from "./useFetch";
import { News, PeerOutreach } from "../utils/types";
import useFetchSingle from "./useFetchSingle";

const useOutreachSingle = (url: string, id: string | number) => useFetchSingle<PeerOutreach>(url, id);

export default useOutreachSingle;
