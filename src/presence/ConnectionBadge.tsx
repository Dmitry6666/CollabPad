import type { ConnectionStatus } from '../collab/useConnectionStatus';

const LABELS: Record<ConnectionStatus, string> = {
  connected: 'Connected',
  connecting: 'Connecting…',
  disconnected: 'Offline — changes saved locally',
};

export function ConnectionBadge({ status }: { status: ConnectionStatus }) {
  return (
    <span className={`badge badge-${status}`} role="status">
      <span className="badge-dot" />
      {LABELS[status]}
    </span>
  );
}