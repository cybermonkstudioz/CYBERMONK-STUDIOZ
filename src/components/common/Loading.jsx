import "./loading.css";

export default function Loading({ show = true }) {
  if (!show) return null;

  return (
    <div className="loading-overlay">
      <div className="loading-content">
        <div className="card">
          <div className="loader">
            <p>loading</p>
            <div className="words">
              <span className="word">ideas</span>
              <span className="word">designs</span>
              <span className="word">stories</span>
              <span className="word">experiences</span>
              <span className="word">ideas</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
