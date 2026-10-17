import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import {
  FORMAT_TEXT_COMMAND,
  $createParagraphNode,
  $getSelection,
  $isRangeSelection,
} from 'lexical';
import { $setBlocksType } from '@lexical/selection';
import { $createHeadingNode } from '@lexical/rich-text';
import { $createCodeNode } from '@lexical/code';

export function Toolbar() {
  const [editor] = useLexicalComposerContext();

  const format =
    (type: 'bold' | 'italic' | 'underline' | 'strikethrough') => () =>
      editor.dispatchCommand(FORMAT_TEXT_COMMAND, type);

  const formatHeading = (tag: 'h1' | 'h2' | 'h3') => () =>
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        $setBlocksType(selection, () => $createHeadingNode(tag));
      }
    });

  const formatParagraph = () => () =>
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        $setBlocksType(selection, () => $createParagraphNode());
      }
    });

  const formatCode = () => () =>
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        $setBlocksType(selection, () => $createCodeNode());
      }
    });

  return (
    <div className="toolbar" role="toolbar" aria-label="Formatting">
      <button onClick={format('bold')} aria-label="Bold">
        <b>B</b>
      </button>
      <button onClick={format('italic')} aria-label="Italic">
        <i>I</i>
      </button>
      <button onClick={format('underline')} aria-label="Underline">
        <u>U</u>
      </button>
      <button onClick={format('strikethrough')} aria-label="Strikethrough">
        <s>S</s>
      </button>
      <span className="toolbar-sep" />
      <button onClick={formatHeading('h1')} aria-label="Heading 1">
        H1
      </button>
      <button onClick={formatHeading('h2')} aria-label="Heading 2">
        H2
      </button>
      <button onClick={formatHeading('h3')} aria-label="Heading 3">
        H3
      </button>
      <button onClick={formatParagraph()} aria-label="Paragraph">
        P
      </button>
      <button onClick={formatCode()} aria-label="Code">
        &lt;/&gt;
      </button>
    </div>
  );
}