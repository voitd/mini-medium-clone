import React from 'react';

import useFetch from '../hooks/useFetch';
import cn from 'classnames';

const AddToFavorites = ({ isFavorited, favoritesCount, articleSlug }) => {
  const FAVORITES_API_URL = `/articles/${articleSlug}/favorite`;
  const [{ response }, doFetch] = useFetch(FAVORITES_API_URL);
  const favoritesCountWithResponse = response ? response.article.favoritesCount : favoritesCount;
  const isFavoritedWithResponse = response ? response.article.favorited : isFavorited;
  const buttonClasses = cn({
    btn: true,
    'btn-sm': true,
    'btn-primary': isFavoritedWithResponse,
    'btn-outline-primary': !isFavoritedWithResponse
  });

  const handleLike = e => {
    e.preventDefault();
    doFetch({
      method: isFavoritedWithResponse ? 'delete' : 'post'
    });
  };

  return (
    <button className={buttonClasses} onClick={handleLike}>
      <i className="ion-heart"></i>
      <span>&nbsp; {favoritesCountWithResponse}</span>
    </button>
  );
};
export default AddToFavorites;
