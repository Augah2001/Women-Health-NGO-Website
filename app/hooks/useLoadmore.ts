import React, { useState } from 'react'

const useLoadmore = (hasMore:  boolean) => {
    const [currentPage, setCurrentPage] = useState(1);
    const loadMore = () => {
      if (hasMore) {
        setCurrentPage((prevPage) => prevPage + 1);
      }
    };
    return {
      currentPage,
      loadMore,setCurrentPage
    }
}

export default useLoadmore
