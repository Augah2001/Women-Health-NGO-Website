import React from 'react'
import useFetch from './useFetch'
import { News, Image } from '../utils/types'
import useFetchPaginated from './useFetchPaginated'



const useImages = () => useFetchPaginated<Image>('/pictures', 8)

export default useImages
