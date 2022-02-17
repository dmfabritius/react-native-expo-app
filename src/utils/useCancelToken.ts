import { useRef, useCallback, useEffect } from 'react';
import axios, { CancelTokenSource } from 'axios';

/**
 * When a component unmounts, cancel any potentially ongoing axios requests.
 * This causes the request to throw an error, which can be handled by a try/catch
 * block surrounding the call. This is useful to avoid setting state for
 * an unmounted component.
 *
 * @returns {function} getCancelToken: generates a cancel token for use by an axios request
 */
export const useCancelToken = () => {
  const source = useRef<CancelTokenSource>();
  const getCancelToken = useCallback(() => {
    source.current = axios.CancelToken.source();
    return source.current.token;
  }, []);

  useEffect(() => {
    // cancel the token when the component unmounts
    return () => source.current && source.current.cancel();
  }, []);

  return { getCancelToken };
};
