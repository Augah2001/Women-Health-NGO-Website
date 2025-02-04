import useFetch from "./useFetch";
import { PeerOutreach } from "../utils/types";

const usePeerOutreach = () => useFetch<PeerOutreach>("/outreach");

export default usePeerOutreach;
