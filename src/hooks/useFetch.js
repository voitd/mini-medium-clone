import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

import useLocalStorage from './useLocalStorage';


export default url => {
  const API_ROOT = 'https://conduit.productionready.io/api';
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [options, setOptions] = useState({});
  const [token] = useLocalStorage('token');

  const doFetch = useCallback((options = {}) => {
    setOptions(options);
    setIsLoading(true);
  }, []);

  useEffect(() => {
    if (!isLoading) return;

    const requestOptions = {
      ...options,
      ...{ headers: { authorization: token ? `Token ${token}` : '' } }
    };

    axios(`${API_ROOT}${url}`, requestOptions)
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
