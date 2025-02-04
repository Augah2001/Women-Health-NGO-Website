import React from 'react'
import useFetch from './useFetch'
import { Research } from '../utils/types'
import useFetchPaginated from './useFetchPaginated'



const useResearch =  () => useFetchPaginated<Research>('/research',8)
 
export default useResearch
