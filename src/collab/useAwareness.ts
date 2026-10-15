import { useEffect, useState } from 'react';
import type { WebsocketProvider } from 'y-websocket';

export interface AwarenessUser {
  clientId: number;
  name: string;
  color: string;
  isLocal: boolean;
}

export function useAwareness(
  provider: WebsocketProvider | null,
  localUser: { name: string; color: string } | null
): AwarenessUser[] {
  const [users, setUsers] = useState<AwarenessUser[]>([]);

  useEffect(() => {
    if (!provider || !localUser) return;

    const awareness = provider.awareness;
    awareness.setLocalStateField('user', localUser);

    const update = () => {
      const states = awareness.getStates() as Map<
        number,
        { user?: { name: string; color: string } }
      >;
      const list: AwarenessUser[] = [];
      states.forEach((state, clientId) => {
        if (state.user) {
          list.push({
            clientId,
            name: state.user.name,
            color: state.user.color,
            isLocal: clientId === awareness.clientID,
          });
        }
      });
      setUsers(list);
    };

    update();
    awareness.on('change', update);

    return () => {
      awareness.off('change', update);
      awareness.setLocalStateField('user', null);
    };
  }, [provider, localUser]);

  return users;
}