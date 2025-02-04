
import useFetch from './useFetch'
import { WorkingPaper } from '../utils/types'



const useWorkingPaper = () => useFetch<WorkingPaper>('/working-paper')

export default useWorkingPaper
