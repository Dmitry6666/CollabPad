import type { AwarenessUser } from '../collab/useAwareness';

export function PresenceBar({ users }: { users: AwarenessUser[] }) {
  return (
    <div className="presence" aria-label="Active collaborators">
      {users.map((u) => (
        <span
          key={u.clientId}
          className="presence-chip"
          style={{ backgroundColor: u.color }}
          title={u.isLocal ? `${u.name} (you)` : u.name}
        >
          {u.name.slice(0, 1).toUpperCase()}
        </span>
      ))}
      <span className="presence-count">
        {users.length} {users.length === 1 ? 'user' : 'users'}
      </span>
    </div>
  );
}