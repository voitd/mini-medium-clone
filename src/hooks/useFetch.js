import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

import useLocalStorage from './useLocalStorage';

export default url => {
  const baseUrl = 'https://conduit.productionready.io/';
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [options, setOptions] = useState({});
  const [token] = useLocalStorage('token');

  const doFetch = useCallback((options = {}) => {
    setOptions(options);
    setIsLoading(true);
  },[]);

  useEffect(() => {
    const requestOptions = {
      ...options,
      ...{ headers: { authorization: token ? `Token ${token}` : '' } }
    };
    if (!isLoading) return;
    axios(baseUrl + url, requestOptions)
      .then(({ data }) => {
        setResponse(data);
      })
      .catch(({ response }) => {
        const { data } = response;
        setError(data);
      })
      .finally(res => {
        setIsLoading(false);
      });
  }, [isLoading, options, token, url]);

  return [{ isLoading, response, error }, doFetch];
};
