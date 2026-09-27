import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { createHash } from 'node:crypto'
import { createServer } from 'vite'
import sharp from 'sharp'

const manifest = JSON.parse(readFileSync('docs/STORY_PHOTOGRAPHY.json', 'utf8'))
const server = await createServer({ server: { middlewareMode: true } })
try {
  const { guides, destinations, getGuidesByDestination } = await server.ssrLoadModule('/src/data/index.ts')
  const { storyCovers } = await server.ssrLoadModule('/src/data/story-photography.ts')
  for (const destination of destinations) {
    const stories = getGuidesByDestination(destination.id)
    assert(stories.every(g => g.heroPhoto), `${destination.city}: missing cover`)
    assert.equal(new Set(stories.map(g => g.heroPhoto)).size, stories.length, `${destination.city}: repeated story cover`)
    const journal = guides.filter(g => g.destinationId === destination.id || g.relatedDestinationIds?.includes(destination.id))
    assert.equal(new Set(journal.map(g => g.heroPhoto)).size, journal.length, `${destination.city}: repeated Journal cover`)
  }
  for (const photo of manifest.photos) {
    const guide = guides.find(g => g.id === photo.guideId)
    assert(guide, `Unknown story: ${photo.guideId}`)
    assert.equal(guide.heroPhoto, storyCovers[photo.guideId].src)
    assert.equal(guide.photoCaption, photo.caption)
    assert(readFileSync(photo.file).length > 0)
    if (photo.license) {
      assert(guide.photoCredit?.author && guide.photoCredit.sourceUrl.startsWith('https://commons.wikimedia.org/'))
      assert.equal(guide.photoCredit.license, photo.license)
      assert(guide.photoCredit.licenseUrl.startsWith('https://'))
    }
  }
  const hashes = new Set()
  let bytes = 0
  for (const photo of manifest.photos.filter(p => p.file.startsWith('src/assets/story-covers/'))) {
    const buffer = readFileSync(photo.file)
    const metadata = await sharp(buffer).metadata()
    assert.equal(metadata.format, 'webp')
    assert(metadata.width <= 1100 && metadata.height <= 900)
    assert(buffer.length < 180000, `${photo.file}: oversized cover`)
    const hash = createHash('sha256').update(buffer).digest('hex')
    assert(!hashes.has(hash), 'Duplicate new image bytes')
    hashes.add(hash)
    bytes += buffer.length
  }
  assert.equal(hashes.size, manifest.newImageCount)
  assert.equal(bytes, manifest.newImageBytes)
  console.log(`Story photography: ${destinations.length} destinations without repeated covers; ${manifest.photos.length} explicit assignments; ${hashes.size} new WebP photos (${bytes} bytes), licenses and dimensions verified.`)
} finally {
  await server.close()
}
