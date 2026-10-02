import type { GuideSection } from '@/types'

/** Classify published titles with words, so "retreats" never matches "eat". */
export function publishedGuideSection(title: string): GuideSection {
  const text = title.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()
  if (/where to stay|\bhotels?\b|\bresorts?\b(?!\s+wear)|\blodges?\b|\bretreats?\b/.test(text)) return 'stay'
  if (/\bfashion\b|\bdesigners?\b|\bshopping\b|\bjewelry\b|\btextiles\b|\bwardrobe\b|\bsouvenirs?\b|\bhandbags?\b|\bmenswear\b|\bboutiques?\b|\bcouture\b|\bknitwear\b/.test(text)) return 'shop'
  if (/\bnightlife\b|\btango\b|\brooftops?\b|\bbars\b|\bafter dark\b/.test(text)) return 'nightlife'
  if (/mountain biking|trekking|\bhikes?\b|\bsafaris?\b/.test(text)) return 'experiences'
  if (/\beat\b|\bfood\b|\brestaurants?\b|\bcooking\b|\bcafes?\b|\bdining\b|\bbrunch\b|\bcuisine\b|\bcoffee\b|\bstreet tacos\b|\bquesillo\b|\bcachaca\b|\bkuchen\b|\bbolo de rolo\b/.test(text)) return 'eat'
  if (/\bbeaches?\b|\bislands?\b|\bcenotes?\b/.test(text)) return 'beaches'
  if (/\bmuseums?\b|\bart\b|\barchitecture\b|\bgalleries\b|\bgallery\b|\btraditions\b/.test(text)) return 'see'
  return 'experiences'
}
