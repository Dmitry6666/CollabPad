import type { EditorThemeClasses } from 'lexical';

export const editorTheme: EditorThemeClasses = {
  paragraph: 'editor-paragraph',
  heading: {
    h1: 'editor-h1',
    h2: 'editor-h2',
    h3: 'editor-h3',
  },
  quote: 'editor-quote',
  list: {
    ul: 'editor-ul',
    ol: 'editor-ol',
    listitem: 'editor-li',
  },
  text: {
    bold: 'editor-bold',
    italic: 'editor-italic',
    code: 'editor-code',
    underline: 'editor-underline',
    strikethrough: 'editor-strikethrough',
  },
};