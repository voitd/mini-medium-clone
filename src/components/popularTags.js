import { Link } from 'react-router-dom';
import React, { useEffect } from 'react';

import ErrorMessage from './errorMessage';
import Loading from './loading';
import useFetch from '../hooks/useFetch';

const PopularTags = () => {
  const TAGS_API_URL = '/tags';
  const [{ response, isLoading, error }, doFetch] = useFetch(TAGS_API_URL);

  useEffect(() => {
    doFetch();
  }, [doFetch]);

  if (isLoading || !response) {
    return <Loading />;
  }

  if (error) {
    return <ErrorMessage />;
  }

  return (
    <div className="sidebar">
      <p>Popular Tags</p>
      <div className="tag-list">
        {response.tags.map(tag => (
          <Link to={`/tags/${tag}`} className="tag-default tag-pill" key={tag}>
            {tag}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default PopularTags;
