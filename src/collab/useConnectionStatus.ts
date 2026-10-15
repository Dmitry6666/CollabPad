import { useEffect, useState } from 'react';
import type { WebsocketProvider } from 'y-websocket';

export type ConnectionStatus = 'connecting' | 'connected' | 'disconnected';

export function useConnectionStatus(
  provider: WebsocketProvider | null
): ConnectionStatus {
  const [status, setStatus] = useState<ConnectionStatus>('connecting');

  useEffect(() => {
    if (!provider) return;

    const update = () => {
      if (provider.wsconnected) setStatus('connected');
      else if (provider.wsconnecting) setStatus('connecting');
      else setStatus('disconnected');
    };

    update();
    provider.on('status', update);
    provider.on('connection-close', update);
    provider.on('connection-error', update);

    return () => {
      provider.off('status', update);
      provider.off('connection-close', update);
      provider.off('connection-error', update);
    };
  }, [provider]);

  return status;
}