export default function ErrorComponent({ message, onReset }) {
  return (
    <div style={{ padding: 12, background: '#fff5f5', border: '1px solid #ffdddd' }}>
      <h3 style={{ margin: 0 }}>⚠️ Something went wrong</h3>
      {message && <p style={{ color: '#900' }}>{message}</p>}
      <button onClick={onReset} style={{ marginTop: 8 }}>Try again</button>
    </div>
  );
}
