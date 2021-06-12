import { useState, useEffect } from 'react';

const useFetch = (url, options) => {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log('EFFECT', new Date().toLocaleString());

    setLoading(true);

    const fetchData = async () => {
      await new Promise((res) => setTimeout(res, 1000));
      try {
        const response = await fetch(url, options);
        const jsonResponse = await response.json();
        setResult(jsonResponse);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        throw error;
      }
    };
    fetchData();
  }, [url, options]);

  return [result, loading];
};

function App() {
  const [result, loading] = useFetch('https://jsonplaceholder.typicode.com/posts');

  if (loading) {
    return <p>loading...</p>;
  }

  if (!loading && result) {
    console.log(result);
  }

  return <h1>Oi</h1>;
}

export default App;
