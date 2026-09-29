// Product names and image URLs observed in the linked ShopMy collections on 2026-09-29.
// Preview only: no prices, availability promises, or substituted affiliate destinations.
export interface ShopMyProduct { name: string; image: string }
export const collectionProducts: Record<string, ShopMyProduct[]> = {
  "cartagena": [
    {
      "image": "https://cdn.shopify.com/s/files/1/0692/0840/8360/files/Suspiro-Cinefila-Madera-Maxi-Dress-18493-1.jpg?v=1742222697",
      "name": "AGUA BY AGUA BENDITA | Cinefila Madera Maxi Dress"
    },
    {
      "image": "https://static.shopmy.us/pins/zoom-28870870-1761523468717-Secreto-Lima-Gloriosa-Maxi-Dress-19227-1.jpg",
      "name": "AGUA BY AGUA BENDITA | Lima Maxi Dress"
    },
    {
      "image": "https://static.shopmy.us/pins/zoom-28870872-1761523469987-Aurora-Ebano-Bougainvillea-One-Piece-17592-1.jpg",
      "name": "AGUA BY AGUA BENDITA | Ebano One-Piece in Bougainvillea"
    }
  ],
  "cdmx": [
    {
      "image": "https://static.shopmy.us/uploads/pretty-prod-1762859279532",
      "name": "JOHANNA ORTIZ | Halterneck Printed Silk Gown"
    },
    {
      "image": "https://prod-images.fashionphile.com/main/9675455d1905d867caf7ccc65fa4f900/aac2079ec03e7e4da27000e2ad5c93f9.jpg",
      "name": "LOEWE | Calfskin Medium Puzzle Bag Sea Water Green"
    },
    {
      "image": "https://alexandrebirman.com/cdn/shop/files/B3622800010002_07_1500x.jpg?v=1753188795",
      "name": "Slim Clarita Ballerina Olivine"
    }
  ],
  "rio": [
    {
      "image": "https://m.media-amazon.com/images/G/01/Shopbop/p/prod/products/jorti/jorti3058629111/jorti3058629111_1763047084030_2-0._QL90_UX564_.jpg",
      "name": "JOHANNA ORTIZ | Twilight Maxi Dress"
    },
    {
      "image": "https://m.media-amazon.com/images/G/01/Shopbop/p/prod/products/havai/havai4038310b4d/havai4038310b4d_1737755287336_2-0._QL90_UX564_.jpg",
      "name": "HAVAIANAS | Slim Flip Flops"
    },
    {
      "image": "https://m.media-amazon.com/images/G/01/Shopbop/p/prod/products/aqudb/aqudb3117219748/aqudb3117219748_1753476102909_2-0._QL90_UX564_.jpg",
      "name": "AQUAZZURA | Kiss Me Quick Crystal Mules"
    }
  ],
  "resort": [
    {
      "image": "https://static.shopmy.us/pins/zoom-30456847-1762746868382-pretty-prod-1753528428729",
      "name": "JOHANNA ORTIZ | Los Siete Mares Midi-Dress"
    },
    {
      "image": "https://static.shopmy.us/pins/zoom-30457655-1762747367768-pretty-prod-1753638238275",
      "name": "ANDREA GOMEZ | Exclusive Beatriz Raffia Platform Sandals"
    },
    {
      "image": "https://static.shopmy.us/pins/zoom-30457309-1762747171188-nm_4900077_100311_m",
      "name": "BTB LOS ANGELES | Gigi Clutch"
    },
    {
      "image": "https://static.shopmy.us/pins/zoom-30457271-1762747142934-1f0bafdd-e253-4063-af63-f195bfbc1c3a_image-1760956512242",
      "name": "MERCEDES SALAZAR | Aura Drop Earrings"
    },
    {
      "image": "https://static.shopmy.us/pins/zoom-30456774-1762746832679-large_johanna-ortiz-nude-wild-savannah-crochet-cotton-tunic-maxi-dress.jpg",
      "name": "JOHANNA ORTIZ | Wild Savannah Crocheted Cotton Maxi Tunic Dress"
    },
    {
      "image": "https://static.shopmy.us/pins/zoom-30457055-1762746993119-nm_4886719_100045_m",
      "name": "SILVIA TCHERASSI | Lamar Multi-Striped Midi Shirtdress"
    },
    {
      "image": "https://static.shopmy.us/pins/zoom-30457206-1762747096096-13704158_fpx.tif",
      "name": "FARM RIO | Crochet Top"
    },
    {
      "image": "https://static.shopmy.us/pins/zoom-30457237-1762747120205-pretty-prod-1762705306723",
      "name": "JOHANNA ORTIZ | Femininity Dramatic Printed Linen Pants"
    },
    {
      "image": "https://static.shopmy.us/pins/zoom-30456979-1762746944078-pretty-prod-1716849088703",
      "name": "AGUA BY AGUA BENDITA | Consuelo Midi Dress"
    }
  ],
  "airport": [
    {
      "image": "https://static.shopmy.us/pins/zoom-30276139-1762617583479-P00760022.jpg",
      "name": "JOHANNA ORTIZ | Silk Crêpe de Chine Maxi Dress"
    },
    {
      "image": "https://static.shopmy.us/pins/zoom-30277030-1762618187210-bg_5061406_100296_m",
      "name": "SAINT LAURENT | Jamie Ysl Shopper Tote Bag"
    },
    {
      "image": "https://static.shopmy.us/pins/zoom-30277538-1762618476381-70464b0b-a4f8-47e4-96f3-0b2ffb1a11f1_lisi-lerch-francesca-hoop-earring-belle-of-the-ball-18k-plated-gold-preorder__86384_1049x1225.jpg",
      "name": "LISI LERCH | Francesca Hoop Earring"
    }
  ]
}
export const emptyCollections = new Set(['layers', 'accessories'])
export const destinationProductOffset: Record<string, number> = { merida: 0, salvador: 3, 'panama-city': 6 }
