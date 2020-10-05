import React from 'react';
import { Link } from 'react-router-dom';
import AddToFavorites from './AddToFavorites';
import TagList from './TagList';

const Feed = ({ articles }) => {
  return (
    <div>
      {articles.map((article, index) => {
        const {
          createdAt,
          slug,
          title,
          author,
          description,
          tagList,
          favorited,
          favoritesCount
        } = article;

        const { username, image } = author;

        return (
          <div className="article-preview" key={index}>
            <div className="article-meta">
              <Link to={`/profiles/${username}`}>
                <img src={image} alt={username} />
              </Link>
              <div className="info">
                <Link to={`/profiles/${username}`} className="author">
                  {username}
                </Link>
                <span className="date">{createdAt}</span>
              </div>
              <div className="pull-xs-right">
                <AddToFavorites
                  isFavorited={favorited}
                  favoritesCount={favoritesCount}
                  articleSlug={slug}
                />
              </div>
            </div>
            <Link to={`/articles/${slug}`} className="preview-link">
              <h1>{title}</h1>
              <p>{description}</p>
              <span>Read more...</span>
              <TagList tags={tagList} />
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default Feed;
