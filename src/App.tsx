import { useMemo, useState } from 'react';
import { CollabEditor } from './editor/CollabEditor';
import { PresenceBar } from './presence/PresenceBar';
import { ConnectionBadge } from './presence/ConnectionBadge';
import { useCurrentUser } from './user/useCurrentUser';
import { useAwareness } from './collab/useAwareness';
import { useConnectionStatus } from './collab/useConnectionStatus';
import { APP_NAME } from './collab/config';
import type { WebsocketProvider } from 'y-websocket';

function getRoomIdFromUrl(): string {
  const params = new URLSearchParams(window.location.search);
  const room = params.get('room');
  if (room) return room;
  const generated = crypto.randomUUID().slice(0, 8);
  const url = new URL(window.location.href);
  url.searchParams.set('room', generated);
  window.history.replaceState({}, '', url);
  return generated;
}

export default function App() {
  const roomId = useMemo(getRoomIdFromUrl, []);
  const user = useCurrentUser();
  const [provider, setProvider] = useState<WebsocketProvider | null>(null);
  const users = useAwareness(provider, { name: user.name, color: user.color });
  const status = useConnectionStatus(provider);

  const shareUrl = `${window.location.origin}${window.location.pathname}?room=${roomId}`;

  return (
    <div className="app">
      <header className="app-header">
        <div className="brand">
          <strong>{APP_NAME}</strong>
          <span className="room-id">#{roomId}</span>
        </div>
        <PresenceBar users={users} />
        <ConnectionBadge status={status} />
      </header>

      <main className="app-main">
        <CollabEditor roomId={roomId} onProviderReady={setProvider} />
      </main>

      <footer className="app-footer">
        <span>Share this link:</span>
        <input
          readOnly
          value={shareUrl}
          onFocus={(e) => e.currentTarget.select()}
        />
      </footer>
    </div>
  );
}