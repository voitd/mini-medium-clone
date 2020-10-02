import { Redirect } from 'react-router-dom';
import React, { useEffect, useState, useContext } from 'react';

import { CurrentUserContext } from '../../contexts/currentUser';
import ArticleForm from '../../components/ArticleForm';
import useFetch from '../../hooks/useFetch';

const CreateArticle = () => {
  const ARTICLE_API_URL = '/articles';
  const [{ response, error }, doFetch] = useFetch(ARTICLE_API_URL);
  const [isSuccessfullSubmit, setIsSuccessfullSubmit] = useState(false);
  const [currentUserState] = useContext(CurrentUserContext);

  const initialValues = {
    title: '',
    description: '',
    body: '',
    tagList: []
  };

  useEffect(() => {
    if (!response) {
      return;
    }
    setIsSuccessfullSubmit(true);
  }, [response]);

  if (isSuccessfullSubmit) {
    return <Redirect to={`/articles/${response.article.slug}`} />;
  }

  if (!currentUserState.isLoggedIn) {
    return <Redirect to={'/'} />;
  }

  const handleSubmit = article => {
    doFetch({
      method: 'post',
      data: {
        article
      }
    });
  };

  return (
    <div>
      <ArticleForm
        errors={(error && error.errors) || {}}
        initialValues={initialValues}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default CreateArticle;
