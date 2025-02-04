import React from 'react'
import useFetch from './useFetch'
import { News } from '../utils/types'
import useFetchPaginated from './useFetchPaginated'



const useNews = () => useFetchPaginated<News>('/news',6)

export default useNews
