function formatClock(time, militaryTime, showSeconds) {
  return time.toLocaleTimeString('en-US', {
    hour12: !militaryTime,
    hour: '2-digit',
    minute: '2-digit',
    ...(showSeconds ? { second: '2-digit' } : {}),
  })
}

function Latch({ engaged, onToggle, onLabel, offLabel, labelledBy }) {
  return (
    <button
      type="button"
      className={`cfg-latch ${engaged ? 'cfg-latch--on' : ''}`}
      role="switch"
      aria-checked={engaged}
      aria-labelledby={labelledBy}
      onClick={onToggle}
    >
      <span className="cfg-latch-track" aria-hidden="true">
        <span className="cfg-latch-thumb" />
      </span>
      <span className="cfg-latch-state">{engaged ? onLabel : offLabel}</span>
    </button>
  )
}

export default function SettingsView({ settings, time, onChange, onReset }) {
  const liveClock = formatClock(time, settings.militaryTime, settings.showSeconds)

  return (
    <section className="settings-view" aria-label="System configuration">
      <header className="cfg-header">
        <p className="cfg-kicker">SYS // OPERATOR NODE</p>
        <h2 className="cfg-title">CONFIG</h2>
        <p className="cfg-lede">
          Preferences stay on this terminal. Field motion, clock readout, and overlay channels.
        </p>
      </header>

      <div className="cfg-rack">
        <article className="cfg-channel">
          <span className="cfg-tag">FIELD</span>
          <div className="cfg-copy">
            <h3 id="cfg-parallax" className="cfg-name">
              Background parallax
            </h3>
            <p className="cfg-hint">Shapes and grid track the pointer across the screen.</p>
          </div>
          <Latch
            engaged={settings.parallax}
            onToggle={() => onChange('parallax', !settings.parallax)}
            onLabel="ENGAGED"
            offLabel="LOCKED"
            labelledBy="cfg-parallax"
          />
        </article>

        <article className="cfg-channel">
          <span className="cfg-tag">CLK</span>
          <div className="cfg-copy">
            <h3 id="cfg-clock" className="cfg-name">
              Clock format
            </h3>
            <p className="cfg-hint">Header time uses 24-hour military or 12-hour civilian.</p>
            <p className="cfg-live" aria-live="polite">
              <span className="cfg-live-label">READOUT</span>
              <span className="cfg-live-value">{liveClock}</span>
            </p>
          </div>
          <div className="cfg-seg" role="group" aria-labelledby="cfg-clock">
            <button
              type="button"
              className={`cfg-seg-btn ${settings.militaryTime ? 'cfg-seg-btn--active' : ''}`}
              aria-pressed={settings.militaryTime}
              onClick={() => onChange('militaryTime', true)}
            >
              24H MIL
            </button>
            <button
              type="button"
              className={`cfg-seg-btn ${!settings.militaryTime ? 'cfg-seg-btn--active' : ''}`}
              aria-pressed={!settings.militaryTime}
              onClick={() => onChange('militaryTime', false)}
            >
              12H CIV
            </button>
          </div>
        </article>

        <article className="cfg-channel">
          <span className="cfg-tag">TICK</span>
          <div className="cfg-copy">
            <h3 id="cfg-seconds" className="cfg-name">
              Clock seconds
            </h3>
            <p className="cfg-hint">Include seconds on the header clock.</p>
          </div>
          <Latch
            engaged={settings.showSeconds}
            onToggle={() => onChange('showSeconds', !settings.showSeconds)}
            onLabel="SHOWN"
            offLabel="HIDDEN"
            labelledBy="cfg-seconds"
          />
        </article>

        <article className="cfg-channel">
          <span className="cfg-tag">CRT</span>
          <div className="cfg-copy">
            <h3 id="cfg-scan" className="cfg-name">
              Scanline overlay
            </h3>
            <p className="cfg-hint">Raster lines over the viewport.</p>
          </div>
          <Latch
            engaged={settings.scanlines}
            onToggle={() => onChange('scanlines', !settings.scanlines)}
            onLabel="LIVE"
            offLabel="OFF"
            labelledBy="cfg-scan"
          />
        </article>

        <article className="cfg-channel">
          <span className="cfg-tag">DRIFT</span>
          <div className="cfg-copy">
            <h3 id="cfg-drift" className="cfg-name">
              Ambient field motion
            </h3>
            <p className="cfg-hint">Background shapes keep drifting without pointer input.</p>
          </div>
          <Latch
            engaged={settings.ambientDrift}
            onToggle={() => onChange('ambientDrift', !settings.ambientDrift)}
            onLabel="LIVE"
            offLabel="STILL"
            labelledBy="cfg-drift"
          />
        </article>
      </div>

      <footer className="cfg-footer">
        <button type="button" className="cfg-reset" onClick={onReset}>
          RESTORE DEFAULTS
        </button>
      </footer>
    </section>
  )
}
