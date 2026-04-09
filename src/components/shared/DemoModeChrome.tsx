import { Link } from 'react-router-dom';

export function DemoModeBanner() {
  return (
    <div className="mx-6 lg:mx-16 mt-3 rounded border px-4 py-3" style={{ background: '#fff4e6', borderColor: '#f0ad4e' }}>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm"><strong>🎮 DEMO MODE</strong> · Subscribe to unlock custom data, exports, and saved scenarios.</p>
        <div className="flex gap-2">
          <Link to="/diagnostics/subscribe" className="btn-primary">View Plans</Link>
          <Link to="/demo-vs-full" className="btn-secondary">See Comparison</Link>
        </div>
      </div>
    </div>
  );
}

export function DemoWatermark() {
  return (
    <div className="fixed bottom-4 right-4 z-[120] rounded px-3 py-2 text-xs font-semibold" style={{ background: 'rgba(0,0,0,0.65)', color: '#fff' }}>
      DEMO VERSION
    </div>
  );
}
