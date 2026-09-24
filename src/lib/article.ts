export type ArticleBlock = { kind: 'paragraph' | 'h2' | 'h3' | 'list' | 'quote' | 'tip'; text: string; items?: string[]; ordered?: boolean; id: string }
const entities: Record<string, string> = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ', rsquo: '’', lsquo: '‘', ldquo: '“', rdquo: '”', ndash: '–', mdash: '—', hellip: '…' }
export function decodeArticleText(value: string) {
  return value.replace(/&(#x[\da-f]+|#\d+|[a-z]+);/gi, (match, entity: string) => {
    if (entity[0] !== '#') return entities[entity.toLowerCase()] ?? match
    const code = entity[1].toLowerCase() === 'x' ? parseInt(entity.slice(2), 16) : Number(entity.slice(1))
    return code > 0 && code <= 0x10ffff && !(code >= 0xd800 && code <= 0xdfff) ? String.fromCodePoint(code) : match
  })
}
export function safeArticleUrl(value: string) {
  try { const url = new URL(decodeArticleText(value)); return ['https:', 'http:'].includes(url.protocol) ? url.href : undefined } catch { return undefined }
}
function normalizeMarkup(body: string) {
  // Convert a small presentation vocabulary to text; never mount source HTML.
  return body.replace(/<!--[^]*?-->/g, '')
    .replace(/<(script|style|iframe|form|nav)\b[^>]*>[^]*?<\/\1>/gi, '')
    .replace(/<h([1-6])\b[^>]*>/gi, (_, n) => `\n\n${Number(n) <= 2 ? '##' : '###'} `)
    .replace(/<\/h[1-6]>/gi, '\n\n')
    .replace(/<a\b[^>]*href\s*=\s*["']([^"']+)["'][^>]*>([^]*?)<\/a>/gi, (_, href, label) => safeArticleUrl(href) ? `[${label.replace(/<[^>]*>/g, '')}](${safeArticleUrl(href)})` : label)
    .replace(/<(strong|b)\b[^>]*>([^]*?)<\/\1>/gi, '**$2**')
    .replace(/<(em|i)\b[^>]*>([^]*?)<\/\1>/gi, '*$2*')
    .replace(/<ol\b[^>]*>([^]*?)<\/ol>/gi, (_, content: string) => { let index = 0; return '\n\n' + content.replace(/<li\b[^>]*>/gi, () => `\n${++index}. `).replace(/<\/li>/gi, '') + '\n\n' })
    .replace(/<li\b[^>]*>/gi, '\n- ').replace(/<\/li>/gi, '')
    .replace(/<br\s*\/?\s*>/gi, '\n').replace(/<\/(p|div|section|ul|ol|blockquote)>/gi, '\n\n')
    .replace(/<[^>]*>/g, '')
}
function headingText(text: string) {
  return text.replace(/^[\p{Extended_Pictographic}\uFE0F\u200D\s]+/u, '').replace(/^#{1,6}\s+/, '').trim()
}
function looksLikeHeading(text: string) {
  const value = headingText(text)
  if (value.length < 8 || value.length > 110 || /[.!?;]$/.test(value) || /https?:|\[|\n/.test(value)) return false
  const words = value.split(/\s+/).filter(w => /\p{L}/u.test(w))
  return words.length >= 2 && words.filter(w => /^\p{Lu}/u.test(w)).length / words.length >= .65
}
export function articleBlocks(body: string): ArticleBlock[] {
  const source = decodeArticleText(normalizeMarkup(body.replace(/\r\n?/g, '\n')))
    .replace(/\\n/g, '\n').replace(/\[\/?(?:caption|gallery|embed)[^\]]*\]/gi, '').trim()
  return source.split(/\n\s*\n/).filter(Boolean).map((raw, i) => {
    const text = raw.trim(), id = `story-section-${i}`
    if (/^#{1,6}\s/.test(text)) return { kind: text.startsWith('###') ? 'h3' : 'h2', text: headingText(text), id }
    const lines = text.split('\n').map(line => line.trim()).filter(Boolean)
    if (lines.every(line => /^(?:[-•*]\s+|\d+[.)]\s+)/.test(line)) && (lines.length > 1 || /^[-•*]\s+/.test(text))) return { kind: 'list', text, items: lines.map(line => line.replace(/^(?:[-•*]\s+|\d+[.)]\s+)/, '')), ordered: /^\d/.test(text), id }
    if (/^>\s/.test(text)) return { kind: 'quote', text: text.replace(/^>\s?/gm, ''), id }
    if (/^(?:Best for|Tip|Good to know|Timing is everything|Before you go):/i.test(text)) return { kind: 'tip', text, id }
    if (looksLikeHeading(text)) return { kind: 'h2', text: headingText(text), id }
    return { kind: 'paragraph', text, id }
  })
}
