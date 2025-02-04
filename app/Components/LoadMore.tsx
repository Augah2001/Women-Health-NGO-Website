import React, { useState } from "react";

interface Props {
  hasMore: boolean;
  loading: boolean;
  loadMore: () => void;
}

const LoadMore = ({ hasMore, loading, loadMore }: Props) => {
  

  return (
    <div>
      {hasMore && !loading && <button onClick={loadMore}>Load More</button>}
    </div>
  );
};

export default LoadMore;
