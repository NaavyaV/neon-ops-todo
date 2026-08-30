export default function StatusBar({ active, completed, total }) {
  const pct = total === 0 ? 0 : Math.round((completed / total) * 100)
  return (
    <div className="status-bar">
      <div className="status-metrics">
        <div className="metric">
          <span className="metric-value">{active}</span>
          <span className="metric-label">ACTIVE</span>
        </div>
        <div className="metric">
          <span className="metric-value">{completed}</span>
          <span className="metric-label">DONE</span>
        </div>
        <div className="metric">
          <span className="metric-value">{total}</span>
          <span className="metric-label">TOTAL</span>
        </div>
      </div>
      <div className="progress-block">
        <div className="progress-header">
          <span>SYNC PROGRESS</span>
          <span>{pct}%</span>
        </div>
        <div className="progress-track" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100}>
          <div className="progress-fill" style={{ width: `${pct}%` }} />
        </div>
      </div>
    </div>
  )
}
