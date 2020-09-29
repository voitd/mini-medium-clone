import { stringify } from 'query-string';
import React, { useEffect, Fragment } from 'react';

import { getPaginator, limit } from '../../utils';
import Feed from '../../components/feed';
import Pagination from '../../components/pagination';
import useFetch from '../../hooks/useFetch';

const GlobalFeed = ({ location, match }) => {
  const { offset, currentPage } = getPaginator(location.search);
  const stringifyParams = stringify({
    limit,
    offset
  });
  const url = match.url;
  const apiUrl = '/articles?';
  const [{ response, isLoading, error }, doFetch] = useFetch(apiUrl + stringifyParams);

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
            {isLoading && <div>Loading...</div>}
            {error && <div>Some error hapenned</div>}
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
          <div className="col-md-3">Popular tags</div>
        </div>
      </div>
    </div>
  );
};

export default GlobalFeed;
