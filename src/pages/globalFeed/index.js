import { stringify } from 'query-string';
import React, { useEffect, Fragment } from 'react';

import { getPaginator, limit } from '../../utils';
import ErrorMessage from '../../components/errorMessage';
import Feed from '../../components/feed';
import FeedToggler from '../../components/feedToggler';
import Loading from '../../components/loading';
import Pagination from '../../components/pagination';
import PopularTags from '../../components/popularTags';
import useFetch from '../../hooks/useFetch';

const GlobalFeed = ({ location, match }) => {
  const { offset, currentPage } = getPaginator(location.search);
  const url = match.url;
  const stringifyParams = stringify({
    limit,
    offset
  });
  const ARCTICLES_API_URL = '/articles?';
  const [{ response, isLoading, error }, doFetch] = useFetch(ARCTICLES_API_URL + stringifyParams);

  useEffect(() => {
    doFetch();
  }, [doFetch, currentPage]);

  return (
    <div className="home-page">
      <div className="banner">
        <div className="container">
          <h1>Meduim Clone</h1>
          <p>A place to share knowledge</p>
        </div>
      </div>
      <div className="container page">
        <div className="row">
          <div className="col-md-9">
            <FeedToggler />
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
          <div className="col-md-3">
            <PopularTags />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GlobalFeed;
