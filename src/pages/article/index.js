import React, { useContext, useEffect, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import ErrorMessage from '../../components/errorMessage';
import Loading from '../../components/loading';
import TagList from '../../components/TagList';
import { CurrentUserContext } from '../../contexts/currentUser';
import useFetch from '../../hooks/useFetch';

const Article = props => {
  const slug = props.match.params.slug;
  const ARTICLES_API_URL = `/articles/${slug}`;
  const [
    { response: fetchArticleResponce, isLoading: fetchArticleisLoading, error: fetchArticleError },
    doFetch
  ] = useFetch(ARTICLES_API_URL);
  const [{ response: deleteArticleResponse }, doDeleteArticle] = useFetch(ARTICLES_API_URL);
  const [currentUserState] = useContext(CurrentUserContext);
  const [isSuccessfullDelete, setIsSuccessfullDelete] = useState(false);

  const isAuthor = () => {
    if (!fetchArticleResponce || !currentUserState.isLoggedIn) {
      return false;
    }
    return fetchArticleResponce.article.author.username === currentUserState.currentUser.username;
  };

  const deleteArticle = () => {
    doDeleteArticle({
      method: 'delete'
    });
  };

  useEffect(() => {
    doFetch();
  }, [doFetch]);

  useEffect(() => {
    if (!deleteArticleResponse) {
      return;
    }
    setIsSuccessfullDelete(true);
  }, [deleteArticleResponse]);

  if (isSuccessfullDelete) {
    return <Redirect to="/" />;
  }

  return (
    <div className="article-page">
      <div className="banner">
        {!fetchArticleisLoading && fetchArticleResponce && (
          <div className="container">
            <h1>{fetchArticleResponce.article.title}</h1>
            <div className="article-meta">
              <Link to={`/profiles/${fetchArticleResponce.article.author.username}`}>
                <img src={fetchArticleResponce.article.author.image} alt="" />
              </Link>
              <div className="info">
                <Link to={`/profiles/${fetchArticleResponce.article.author.username}`}>
                  {fetchArticleResponce.article.author.username}
                </Link>
                <span className="date">{fetchArticleResponce.article.createdAt}</span>
              </div>
              {isAuthor() && (
                <span>
                  <Link
                    className="btn btn-outline-secondary btn-sm"
                    to={`/articles/${fetchArticleResponce.article.slug}/edit`}>
                    <i className="ion-edit"></i>
                    Edit Article
                  </Link>
                  <button className="btn btn-outline-danger btn-sm" onClick={deleteArticle}>
                    <i className="ion-trash-a"></i>
                    Delete Article
                  </button>
                </span>
              )}
            </div>
          </div>
        )}
      </div>
      <div className="container page">
        {fetchArticleisLoading && <Loading />}
        {fetchArticleError && <ErrorMessage />}
        {!fetchArticleisLoading && fetchArticleResponce && (
          <div className="row article-content">
            <div className="col-xs-12">
              <div>
                <p>{fetchArticleResponce.article.body}</p>
              </div>
              <TagList tags={fetchArticleResponce.article.tagList} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Article;
