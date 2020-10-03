import { Redirect } from 'react-router-dom';
import React, { useEffect, useState } from 'react';

import ArticleForm from '../../components/ArticleForm';
import useFetch from '../../hooks/useFetch';

const EditArticle = ({ match }) => {
  const slug = match.params.slug;
  const EDIT_ARTICLE_API_URL = `/articles/${slug}`;
  const [initialValues, setInitialValues] = useState(null);
  const [isSuccessfullSubmit, setIsSuccessfullSubmit] = useState(false);
  const [{ response: fetchArticleResponse }, doFetchArticle] = useFetch(EDIT_ARTICLE_API_URL);
  const [
    { response: updateArticleResponse, error: errorsUpdateArticle },
    doUpdateArticle
  ] = useFetch(EDIT_ARTICLE_API_URL);

  const handleSubmit = article => {
    doUpdateArticle({
      method: 'put',
      data: {
        article
      }
    });
  };

  useEffect(() => {
    doFetchArticle();
  }, [doFetchArticle]);

  useEffect(() => {
    if (!fetchArticleResponse) {
      return;
    }
    const { title, description, body, tagList } = fetchArticleResponse.article;
    setInitialValues({ title, description, body, tagList });
  }, [fetchArticleResponse]);

  useEffect(() => {
    if (!updateArticleResponse) {
      return;
    }
    setIsSuccessfullSubmit(true);
  }, [updateArticleResponse]);

  if (isSuccessfullSubmit) {
    return <Redirect to={`/articles/${slug}`} />;
  }

  return (
    <ArticleForm
      onSubmit={handleSubmit}
      errors={(errorsUpdateArticle && errorsUpdateArticle.errors) || {}}
      initialValues={initialValues}
    />
  );
};

export default EditArticle;
