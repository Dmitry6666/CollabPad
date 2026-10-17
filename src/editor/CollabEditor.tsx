import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { ListPlugin } from '@lexical/react/LexicalListPlugin';
import { LinkPlugin } from '@lexical/react/LexicalLinkPlugin';
import { MarkdownShortcutPlugin } from '@lexical/react/LexicalMarkdownShortcutPlugin';
import { CollaborationPlugin } from '@lexical/react/LexicalCollaborationPlugin';
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';
import { HeadingNode, QuoteNode } from '@lexical/rich-text';
import { ListNode, ListItemNode } from '@lexical/list';
import { CodeNode, CodeHighlightNode } from '@lexical/code';
import { LinkNode } from '@lexical/link';
import { TRANSFORMERS } from '@lexical/markdown';
import type { Provider } from '@lexical/yjs';
import { Doc } from 'yjs';
import { WebsocketProvider } from 'y-websocket';
import { IndexeddbPersistence } from 'y-indexeddb';

import { editorTheme } from './editorTheme';
import { Toolbar } from './Toolbar';
import { WS_URL } from '../collab/config';

export interface CollabEditorProps {
  roomId: string;
  onProviderReady: (provider: WebsocketProvider) => void;
}

const initialConfig = {
  namespace: 'CollabPad',
  theme: editorTheme,
  onError: (error: Error) => {
    console.error(error);
    throw error;
  },
  nodes: [
    HeadingNode,
    QuoteNode,
    ListNode,
    ListItemNode,
    CodeNode,
    CodeHighlightNode,
    LinkNode,
  ],
};

export function CollabEditor({ roomId, onProviderReady }: CollabEditorProps) {
  return (
    <LexicalComposer initialConfig={initialConfig}>
      <Toolbar />
      <div className="editor-shell">
        <RichTextPlugin
          contentEditable={<ContentEditable className="editor-content" />}
          placeholder={
            <div className="editor-placeholder">Start typing…</div>
          }
          ErrorBoundary={LexicalErrorBoundary}
        />
        <HistoryPlugin />
        <ListPlugin />
        <LinkPlugin />
        <MarkdownShortcutPlugin transformers={TRANSFORMERS} />

        <CollaborationPlugin
          id={roomId}
          shouldBootstrap={true}
          providerFactory={(id, yjsDocMap) => {
            let doc = yjsDocMap.get(id);
            if (!doc) {
              doc = new Doc();
              yjsDocMap.set(id, doc);
            } else {
              doc.load();
            }

            const provider = new WebsocketProvider(WS_URL, id, doc, {
              connect: true,
            });

            const persistence = new IndexeddbPersistence(
              `collabpad-${id}`,
              doc
            );
            void persistence;

            onProviderReady(provider);
            return provider as unknown as Provider;
          }}
        />
      </div>
    </LexicalComposer>
  );
}