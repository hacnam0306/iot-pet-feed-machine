import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin'
import { CharacterLimitPlugin } from '@lexical/react/LexicalCharacterLimitPlugin'
import { CheckListPlugin } from '@lexical/react/LexicalCheckListPlugin'
import { ClearEditorPlugin } from '@lexical/react/LexicalClearEditorPlugin'
import LexicalClickableLinkPlugin from '@lexical/react/LexicalClickableLinkPlugin'
// import { CollaborationPlugin } from '@lexical/react/LexicalCollaborationPlugin'
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary'
import { HashtagPlugin } from '@lexical/react/LexicalHashtagPlugin'
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin'
import { HorizontalRulePlugin } from '@lexical/react/LexicalHorizontalRulePlugin'
import { ListPlugin } from '@lexical/react/LexicalListPlugin'
import { PlainTextPlugin } from '@lexical/react/LexicalPlainTextPlugin'
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin'
import { TabIndentationPlugin } from '@lexical/react/LexicalTabIndentationPlugin'
// import { TablePlugin } from '@lexical/react/LexicalTablePlugin'
import useLexicalEditable from '@lexical/react/useLexicalEditable'
import { useEffect, useState } from 'react'
// import { CAN_USE_DOM } from 'shared/canUseDOM'
// import { createWebsocketProvider } from './collaboration'
import { useSettings } from './context/SettingsContext'
import { useSharedHistoryContext } from './context/SharedHistoryContext'
// import TableCellNodes from './nodes/TableCellNodes'
// import AutocompletePlugin from './plugins/AutocompletePlugin'
import AutoEmbedPlugin from './plugins/AutoEmbedPlugin'
import AutoLinkPlugin from './plugins/AutoLinkPlugin'
import CodeActionMenuPlugin from './plugins/CodeActionMenuPlugin'
import CodeHighlightPlugin from './plugins/CodeHighlightPlugin'
import CollapsiblePlugin from './plugins/CollapsiblePlugin'
// import CommentPlugin from './plugins/CommentPlugin'
// import ComponentPickerPlugin from './plugins/ComponentPickerPlugin'
import ContextMenuPlugin from './plugins/ContextMenuPlugin'
import DragDropPaste from './plugins/DragDropPastePlugin'
import DraggableBlockPlugin from './plugins/DraggableBlockPlugin'
import EmojiPickerPlugin from './plugins/EmojiPickerPlugin'
import EmojisPlugin from './plugins/EmojisPlugin'
// import EquationsPlugin from './plugins/EquationsPlugin'
// import ExcalidrawPlugin from './plugins/ExcalidrawPlugin'
import FloatingLinkEditorPlugin from './plugins/FloatingLinkEditorPlugin'
import FloatingTextFormatToolbarPlugin from './plugins/FloatingTextFormatToolbarPlugin'
import ImagesPlugin from './plugins/ImagesPlugin'
import InlineImagePlugin from './plugins/InlineImagePlugin'
import KeywordsPlugin from './plugins/KeywordsPlugin'
import LinkPlugin from './plugins/LinkPlugin'
import ListMaxIndentLevelPlugin from './plugins/ListMaxIndentLevelPlugin'
import MarkdownShortcutPlugin from './plugins/MarkdownShortcutPlugin'
import { MaxLengthPlugin } from './plugins/MaxLengthPlugin'
import MentionsPlugin from './plugins/MentionsPlugin'
import PollPlugin from './plugins/PollPlugin'
import TabFocusPlugin from './plugins/TabFocusPlugin'
import TableCellActionMenuPlugin from './plugins/TableActionMenuPlugin'
// import TableCellResizer from './plugins/TableCellResizer'
import TableOfContentsPlugin from './plugins/TableOfContentsPlugin'
// import { TablePlugin as NewTablePlugin } from './plugins/TablePlugin'
import ToolbarPlugin from './plugins/ToolbarPlugin'
// import TreeViewPlugin from './plugins/TreeViewPlugin'
import YouTubePlugin from './plugins/YouTubePlugin'
// import PlaygroundEditorTheme from './themes/PlaygroundEditorTheme'
import { RouterParams } from '@interfaces'
import { $generateHtmlFromNodes, $generateNodesFromDOM } from '@lexical/html'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin'
import { useAppSelector } from '@redux'
import { t } from 'i18next'
import { $getRoot, $insertNodes, LexicalEditor } from 'lexical'
import { EditorState } from 'lexical/LexicalEditorState'
import {
  UseFormClearErrors,
  UseFormGetValues,
  UseFormSetError,
  UseFormSetValue,
} from 'react-hook-form'
import { useParams } from 'react-router-dom'
import ContentEditable from './ui/ContentEditable'
import Placeholder from './ui/Placeholder'

// const skipCollaborationInit =
//   // @ts-ignore
//   window.parent != null && window.parent.frames.right === window

interface IEditorProps {
  setValue?: UseFormSetValue<any>
  getValues?: UseFormGetValues<any>
  value?: string
  clearErrors?: UseFormClearErrors<any>
  setError?: UseFormSetError<any>
  contentName?: string
  config?: {
    hasInsert?: boolean
    isRequired?: boolean
  }
}

export default function Editor({
  setValue,
  clearErrors,
  value,
  setError,
  contentName,
  config,
}: IEditorProps): JSX.Element {
  const { historyState } = useSharedHistoryContext()
  const {
    settings: {
      isCollab,
      // isAutocomplete,
      isMaxLength,
      isCharLimit,
      isCharLimitUtf8,
      isRichText,
      showTreeView,
      showTableOfContents,
      shouldUseLexicalContextMenu,
      // tableCellMerge,
      // tableCellBackgroundColor,
    },
  } = useSettings()
  const isEditable = useLexicalEditable()
  const text = isCollab
    ? 'Enter some collaborative rich text...'
    : isRichText
    ? 'Enter some rich text...'
    : 'Enter some plain text...'
  const placeholder = <Placeholder>{text}</Placeholder>
  const [floatingAnchorElem, setFloatingAnchorElem] =
    useState<HTMLDivElement | null>(null)
  const [isSmallWidthViewport, setIsSmallWidthViewport] =
    useState<boolean>(false)
  const onRef = (_floatingAnchorElem: HTMLDivElement) => {
    if (_floatingAnchorElem !== null) {
      setFloatingAnchorElem(_floatingAnchorElem)
    }
  }

  const { blogId } = useParams<RouterParams['BlogDetail']>()
  const { emailContentId } = useParams<RouterParams['EmailContentDetail']>()

  const editorBlogData = useAppSelector(
    (state) => state.blog.selectedBlog?.content
  )

  const emailContentData = useAppSelector(
    (state) => state.emailContent.detailEmailContent?.content
  )

  const renderData = () => {
    if (blogId) {
      return editorBlogData
    } else if (emailContentId) {
      return emailContentData
    } else {
      return value
    }
  }

  const editorData = renderData()

  const [html, setHtml] = useState<string>('')
  const onChange = (_editorState: EditorState, editor: LexicalEditor) => {
    editor.update(() => {
      const raw = $generateHtmlFromNodes(editor, null)
      setHtml(raw)
      if (setValue) {
        setValue(contentName ?? '', raw, {
          shouldDirty: true,
        })
      }
    })
  }

  const [editor] = useLexicalComposerContext()
  const onImportHTML = () => {
    editor.update(() => {
      // In the browser you can use the native DOMParser API to parse the HTML string.
      const parser = new DOMParser()

      const dom = parser.parseFromString(
        Boolean(editorData)
          ? editorData ?? '<p class="PlaygroundEditorTheme__paragraph"><br></p>'
          : '<p class="PlaygroundEditorTheme__paragraph"><br></p>',
        'text/html'
      )

      // Once you have the DOM instance it's easy to generate LexicalNodes.
      const nodes = $generateNodesFromDOM(editor, dom)

      // Select the root
      $getRoot().select()

      // Insert them at a selection.
      $insertNodes(nodes)
    })
  }

  useEffect(() => {
    onImportHTML()
  }, [])

  useEffect(() => {
    if (!config?.isRequired) return
    if (
      clearErrors &&
      Boolean(html) &&
      html.trim() !== '<p class="PlaygroundEditorTheme__paragraph"><br></p>'
    ) {
      clearErrors(contentName)
    }
    if (
      setError &&
      html.trim() === '<p class="PlaygroundEditorTheme__paragraph"><br></p>'
    ) {
      setError(contentName ?? '', {
        type: 'required_error',
        message: t('error:field_required') as string,
      })
    }
  }, [clearErrors, html, setError])
  return (
    <div
      style={{
        position: 'relative',
        listStyle: 'inside',
      }}
    >
      <div>{isRichText && <ToolbarPlugin hasInsert={config?.hasInsert} />}</div>
      <div
        className={`editor-container ${showTreeView ? 'tree-view' : ''} ${
          !isRichText ? 'plain-text' : ''
        }`}
        style={{ position: 'sticky', top: 0 }}
      >
        {isMaxLength && <MaxLengthPlugin maxLength={30} />}
        <DragDropPaste />
        <AutoFocusPlugin />
        <ClearEditorPlugin />
        {/* <ComponentPickerPlugin /> */}
        <EmojiPickerPlugin />
        <AutoEmbedPlugin />

        <MentionsPlugin />
        <EmojisPlugin />
        <HashtagPlugin />
        <KeywordsPlugin />
        {/* <SpeechToTextPlugin /> */}
        <AutoLinkPlugin />
        {/* <CommentPlugin
          providerFactory={isCollab ? createWebsocketProvider : undefined}
        /> */}
        {isRichText ? (
          <>
            {/* {isCollab ? (
              <CollaborationPlugin
                id="main"
                providerFactory={createWebsocketProvider}
                shouldBootstrap={!skipCollaborationInit}
              />
            ) : (
              <HistoryPlugin externalHistoryState={historyState} />
            )} */}
            <RichTextPlugin
              contentEditable={
                <div className="editor-scroller">
                  <div className="editor" ref={onRef}>
                    <ContentEditable />
                  </div>
                </div>
              }
              placeholder={placeholder}
              ErrorBoundary={LexicalErrorBoundary}
            />
            <MarkdownShortcutPlugin />
            <CodeHighlightPlugin />
            <ListPlugin />
            <CheckListPlugin />
            <ListMaxIndentLevelPlugin maxDepth={7} />
            {/* <TablePlugin
              hasCellMerge={tableCellMerge}
              hasCellBackgroundColor={tableCellBackgroundColor}
            /> */}
            {/* <TableCellResizer /> */}
            {/* <NewTablePlugin cellEditorConfig={cellEditorConfig}>
              <AutoFocusPlugin />
              <RichTextPlugin
                contentEditable={
                  <ContentEditable className="TableNode__contentEditable" />
                }
                placeholder={null}
                ErrorBoundary={LexicalErrorBoundary}
              />
              <MentionsPlugin />
              <HistoryPlugin />
              <ImagesPlugin captionsEnabled={false} />
              <LinkPlugin />
              <LexicalClickableLinkPlugin />
              <FloatingTextFormatToolbarPlugin />
            </NewTablePlugin> */}
            <ImagesPlugin />
            <InlineImagePlugin />
            <LinkPlugin />
            <PollPlugin />
            {/* <TwitterPlugin /> */}
            <YouTubePlugin />
            {/* <FigmaPlugin /> */}
            {!isEditable && <LexicalClickableLinkPlugin />}
            <HorizontalRulePlugin />
            {/* <EquationsPlugin />
            <ExcalidrawPlugin /> */}
            <TabFocusPlugin />
            <TabIndentationPlugin />
            <CollapsiblePlugin />
            {floatingAnchorElem && !isSmallWidthViewport && (
              <>
                <DraggableBlockPlugin anchorElem={floatingAnchorElem} />
                <CodeActionMenuPlugin anchorElem={floatingAnchorElem} />
                <FloatingLinkEditorPlugin anchorElem={floatingAnchorElem} />
                <TableCellActionMenuPlugin
                  anchorElem={floatingAnchorElem}
                  cellMerge={true}
                />
                <FloatingTextFormatToolbarPlugin
                  anchorElem={floatingAnchorElem}
                />
              </>
            )}
          </>
        ) : (
          <>
            <PlainTextPlugin
              contentEditable={<ContentEditable />}
              placeholder={placeholder}
              ErrorBoundary={LexicalErrorBoundary}
            />
            <HistoryPlugin externalHistoryState={historyState} />
          </>
        )}
        {(isCharLimit || isCharLimitUtf8) && (
          <CharacterLimitPlugin
            charset={isCharLimit ? 'UTF-16' : 'UTF-8'}
            maxLength={5}
          />
        )}
        {/* {isAutocomplete && <AutocompletePlugin />} */}
        <div>{showTableOfContents && <TableOfContentsPlugin />}</div>
        {shouldUseLexicalContextMenu && <ContextMenuPlugin />}
        {/* <ActionsPlugin isRichText={isRichText} /> */}
        <HistoryPlugin />
        <OnChangePlugin onChange={onChange} ignoreSelectionChange />
      </div>
    </div>
  )
}
