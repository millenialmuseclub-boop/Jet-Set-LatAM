import { Fragment, useMemo } from 'react'
import { articleBlocks, safeArticleUrl } from '@/lib/article'
import { openExternal } from '@/lib/links'

function Inline({ text }: { text: string }) {
  const tokens = text.split(/(\[[^\]]+\]\(https?:\/\/[^\s]+\)|\*\*[^*]+\*\*|\*[^*\n]+\*|https?:\/\/[^\s<>]+)/g)
  return <>{tokens.map((token, i) => {
    const link = token.match(/^\[([^\]]+)\]\((https?:\/\/[^\s]+)\)$/)
    const url = safeArticleUrl(link?.[2] || token)
    if (url) return <a key={i} href={url} onClick={event => { event.preventDefault(); openExternal(url) }}>{link?.[1] || token}</a>
    if (token.startsWith('**') && token.endsWith('**')) return <strong key={i}>{token.slice(2, -2)}</strong>
    if (token.startsWith('*') && token.endsWith('*')) return <em key={i}>{token.slice(1, -1)}</em>
    return <Fragment key={i}>{token.replace(/(\p{Ll}[.!?])(?=\p{Lu})/gu, '$1 ')}</Fragment>
  })}</>
}
export function ArticleBody({ body }: { body: string }) {
  const blocks = useMemo(() => articleBlocks(body), [body])
  const headings = blocks.filter(block => block.kind === 'h2' || block.kind === 'h3')
  return <>
    {headings.length >= 3 && <details className="story-contents"><summary>In this story · {headings.length} sections</summary><nav aria-label="Story contents">{headings.map(block => <button key={block.id} onClick={() => { const heading = document.getElementById(block.id); heading?.scrollIntoView({ block: 'start' }); heading?.focus({ preventScroll: true }) }}>{block.text}</button>)}</nav></details>}
    <div className="article-body editorial-body">{blocks.map(block => {
      const content = <Inline text={block.text}/>
      if (block.kind === 'h2') return <h2 key={block.id} id={block.id} tabIndex={-1}>{content}</h2>
      if (block.kind === 'h3') return <h3 key={block.id} id={block.id} tabIndex={-1}>{content}</h3>
      if (block.kind === 'list') { const List = block.ordered ? 'ol' : 'ul'; return <List key={block.id}>{block.items?.map((item, i) => <li key={i}><Inline text={item}/></li>)}</List> }
      if (block.kind === 'quote') return <blockquote key={block.id}>{content}</blockquote>
      if (block.kind === 'tip') return <aside key={block.id} className="story-tip">{content}</aside>
      return <p key={block.id}>{content}</p>
    })}</div>
  </>
}
