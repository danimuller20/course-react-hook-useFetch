import { useState, useEffect, useRef } from 'react';

const isObjectEqual = (objectA, objectB) => {
  return JSON.stringify(objectA) === JSON.stringify(objectB);
};

export const useFetch = (url, options) => {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [shouldLoad, setShouldLoad] = useState(false);

  const urlRef = useRef(url);
  const optionsRef = useRef(options);

  useEffect(() => {
    let changed = false;

    if (!isObjectEqual(url, urlRef.current)) {
      urlRef.current = url;
      changed = true;
    }

    if (!isObjectEqual(options, optionsRef.current)) {
      optionsRef.current = options;
      changed = true;
    }

    if (changed) {
      setShouldLoad((state) => !state);
    }
  }, [url, options]);

  useEffect(() => {
    let wait = false;
    const controller = new AbortController();
    const signal = controller.signal;

    setLoading(true);

    const fetchData = async () => {
      await new Promise((res) => setTimeout(res, 1000));

      try {
        const response = await fetch(urlRef.current, { signal, ...optionsRef.current });
        const jsonResponse = await response.json();

        if (!wait) {
          setResult(jsonResponse);
          setLoading(false);
        }
      } catch (error) {
        if (!wait) {
          setLoading(false);
        }
        console.log('MY ERROR:', error.message);
      }
    };
    fetchData();

    return () => {
      wait = true;
      controller.abort();
    };
  }, [shouldLoad]);

  return [result, loading];
};
