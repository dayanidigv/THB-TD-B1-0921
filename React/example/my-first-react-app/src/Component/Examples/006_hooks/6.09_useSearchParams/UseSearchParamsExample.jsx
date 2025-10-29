import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

export default function UseSearchParamsExample() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initial = searchParams.get('q') || '';
  const [q, setQ] = useState(initial);

  useEffect(() => {
    // keep local state in sync if URL changes externally
    setQ(searchParams.get('q') || '');
  }, [searchParams]);

  const apply = () => {
    if (q) setSearchParams({ q });
    else setSearchParams({});
  };

  const clear = () => {
    setQ('');
    setSearchParams({});
  };

  return (
    <div>
      <h4>6.09 - useSearchParams</h4>
      <p>Current query param q: <strong>{searchParams.get('q') || '(none)'}</strong></p>
      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Type q param" />
        <button onClick={apply}>Apply to URL</button>
        <button onClick={clear}>Clear</button>
      </div>
    </div>
  );
}
