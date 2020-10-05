import { stringify } from 'query-string';
import React, { Fragment, useEffect } from 'react';

import { getPaginator, limit } from '../../../utils';
import ErrorMessage from '../../../components/errorMessage';
import Feed from '../../../components/feed';
import Loading from '../../../components/loading';
import Pagination from '../../../components/pagination';
import useFetch from '../../../hooks/useFetch';

const getApiUrl = ({ offset, username, isFavorites }) => {
  const params = isFavorites
    ? { limit, offset, favorited: username }
    : { limit, offset, author: username };

  return `/articles?${stringify(params)}`;
};

const UserArticles = ({ username, isFavorites, location, url }) => {
  const { offset, currentPage } = getPaginator(location.search);
  const apiUrl = getApiUrl({ offset, username, isFavorites });
  const [{ response, isLoading, error }, doFetch] = useFetch(apiUrl);

  useEffect(() => {
    doFetch();
  }, [doFetch, isFavorites]);


  return (
    <div>
      {isLoading && <Loading />}
      {error && <ErrorMessage />}
      {!isLoading && response && (
        <Fragment>
          <Feed articles={response.articles} />
          <Pagination
            total={response.articlesCount}
            limit={limit}
            url={url}
            currentPage={currentPage}
          />
        </Fragment>
      )}
    </div>
  );
};

export default UserArticles;
