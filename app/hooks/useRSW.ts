
import { ResearchWithUs } from '../utils/types'
import useFetch from './useFetch'




const useRSW = () => useFetch<ResearchWithUs>('/research-with-us')

export default useRSW
