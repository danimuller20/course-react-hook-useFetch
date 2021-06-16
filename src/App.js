import { useState } from 'react';
import { useFetch } from './hooks/useFetch';

function App() {
  const [postId, setPostId] = useState('');
  const [result, loading] = useFetch('https://jsonplaceholder.typicode.com/posts/' + postId, {
    headers: {
      abc: '1' + postId,
    },
  });

  if (loading) {
    return <p>loading...</p>;
  }

  const handleIdClick = (id) => {
    setPostId(id);
  };

  if (!loading && result)
    return (
      <div>
        {result?.length > 0 ? (
          result.map((post) => (
            <div key={post.id} onClick={() => handleIdClick(post.id)}>
              <h6>{post.title}</h6>
            </div>
          ))
        ) : (
          <div onClick={() => handleIdClick('')}>
            <h6>{result.title}</h6>
          </div>
        )}
      </div>
    );

  return <h1>Oi</h1>;
}

export default App;
