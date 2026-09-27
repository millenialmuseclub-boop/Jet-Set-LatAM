import gdlFoodPhoto from '@/assets/guadalajara/instituto-cabanas-mural.jpg'
import type { Guide } from '@/types'
import records from './website-guides.json'
import p0 from '@/assets/website-guides/wp-13322.webp'
import p1 from '@/assets/website-guides/wp-12849.webp'
import p2 from '@/assets/website-guides/wp-13565.webp'
import p3 from '@/assets/website-guides/wp-13564.webp'
import p4 from '@/assets/website-guides/wp-13012.webp'
import p5 from '@/assets/website-guides/wp-13566.webp'
import p6 from '@/assets/website-guides/wp-13567.webp'
import p7 from '@/assets/website-guides/wp-14139.webp'
import p8 from '@/assets/website-guides/wp-13563.webp'
import p9 from '@/assets/website-guides/wp-13311.webp'
import p10 from '@/assets/website-guides/wp-13048.webp'
import p11 from '@/assets/website-guides/wp-14143.webp'
import p12 from '@/assets/website-guides/wp-14060.webp'
import p13 from '@/assets/website-guides/wp-14097.webp'
import p14 from '@/assets/expansion/ag-street.webp'
import p15 from '@/assets/expansion/sj-blue.webp'
import p16 from '@/assets/expansion/sj-street.webp'
import p17 from '@/assets/expansion/ag-arch.webp'
import p18 from '@/assets/medellin/medellin-plaza-botero.jpg'
import p19 from '@/assets/buenos-aires/caminito.webp'
import p20 from '@/assets/final-travel-photos/sao-paulo-6.webp'

// Website articles retain stable WordPress IDs, original prose and source links.
const covers: Record<string, Pick<Guide, 'heroPhoto' | 'photoCaption' | 'photoCredit'>> = {
"wp-14180": {heroPhoto:gdlFoodPhoto,photoCaption:"Instituto Cultural Cabañas, Guadalajara · Jet Set travel archive · city context, not a restaurant photograph"},
"wp-13322": {heroPhoto:p0,photoCaption:"Parque de la 93, Bogotá — city context for the design story",photoCredit:{"author":"Felipe Restrepo Acosta","license":"CC BY-SA 3.0","sourceUrl":"https://commons.wikimedia.org/wiki/File:Parque_de_la_93_en_Bogot%C3%A1.jpg","licenseUrl":"https://creativecommons.org/licenses/by-sa/3.0"}},
"wp-12849": {heroPhoto:p1,photoCaption:"El Retiro shopping center, Bogotá — neighborhood context",photoCredit:{"author":"Felipe Restrepo Acosta","license":"CC BY-SA 3.0","sourceUrl":"https://commons.wikimedia.org/wiki/File:Bogot%C3%A1_centro_comercial_El_Retiro.JPG","licenseUrl":"https://creativecommons.org/licenses/by-sa/3.0"}},
"wp-13565": {heroPhoto:p2,photoCaption:"Street art and colorful buildings in La Candelaria, Bogotá",photoCredit:{"author":"Pedro Szekely from Los Angeles, USA","license":"CC BY-SA 2.0","sourceUrl":"https://commons.wikimedia.org/wiki/File:La_Candelaria,_Bogota,_Colombia_(5758241115).jpg","licenseUrl":"https://creativecommons.org/licenses/by-sa/2.0"}},
"wp-13564": {heroPhoto:p3,photoCaption:"View over Bogotá from Monserrate",photoCredit:{"author":"Yiyi93","license":"CC BY-SA 4.0","sourceUrl":"https://commons.wikimedia.org/wiki/File:Foto_panor%C3%A1mica_de_Monserrate.jpg","licenseUrl":"https://creativecommons.org/licenses/by-sa/4.0"}},
"wp-13012": {heroPhoto:p4,photoCaption:"Santa Bárbara Church, Usaquén, Bogotá — city context for the style story",photoCredit:{"author":"Jorge Láscar from Australia","license":"CC BY 2.0","sourceUrl":"https://commons.wikimedia.org/wiki/File:Lascar_Santa_Barbara_church_-_Usaquen_(4585132442).jpg","licenseUrl":"https://creativecommons.org/licenses/by/2.0"}},
"wp-13566": {heroPhoto:p5,photoCaption:"Plaza de Armas, Santiago",photoCredit:{"author":"Apincheira","license":"CC BY-SA 3.0","sourceUrl":"https://commons.wikimedia.org/wiki/File:Plaza_de_Armas_3.JPG","licenseUrl":"https://creativecommons.org/licenses/by-sa/3.0"}},
"wp-13567": {heroPhoto:p6,photoCaption:"Vineyards at Bodegas RE, Casablanca Valley, Chile",photoCredit:{"author":"Winniepix","license":"CC BY 2.0","sourceUrl":"https://commons.wikimedia.org/wiki/File:Across_the_vines_of_pinot_gris_at_Bodegas_RE,_Casablanca_Valley,_Chile_(25042417768).jpg","licenseUrl":"https://creativecommons.org/licenses/by/2.0"}},
"wp-14139": {heroPhoto:p7,photoCaption:"Laureles–Estadio, Medellín — neighborhood context",photoCredit:{"author":"Zack Knowles","license":"CC BY-SA 3.0","sourceUrl":"https://commons.wikimedia.org/wiki/File:Laureles_-_Estadio,_Medell%C3%ADn,_Antioquia,_Colombia_-_panoramio_(1).jpg","licenseUrl":"https://creativecommons.org/licenses/by-sa/3.0"}},
"wp-13563": {heroPhoto:p8,photoCaption:"A Karol G mural in Comuna 13, Medellín",photoCredit:{"author":"Alecprofit","license":"CC BY-SA 4.0","sourceUrl":"https://commons.wikimedia.org/wiki/File:Karol_G_Mural_COmuna_13.png","licenseUrl":"https://creativecommons.org/licenses/by-sa/4.0"}},
"wp-13311": {heroPhoto:p9,photoCaption:"Pan de muerto — seasonal Mexican bread",photoCredit:{"author":"J Mndz","license":"CC BY-SA 2.0","sourceUrl":"https://commons.wikimedia.org/wiki/File:Pan_de_muerto_IV.jpg","licenseUrl":"https://creativecommons.org/licenses/by-sa/2.0"}},
"wp-13048": {heroPhoto:p10,photoCaption:"Casa Prunes, Roma, Mexico City — architectural context for the design story",photoCredit:{"author":"Jeff Reuben","license":"CC BY-SA 4.0","sourceUrl":"https://commons.wikimedia.org/wiki/File:Casa_Prunes.jpg","licenseUrl":"https://creativecommons.org/licenses/by-sa/4.0"}},
"wp-14143": {heroPhoto:p11,photoCaption:"Bread stall at Mercado 20 de Noviembre, Oaxaca",photoCredit:{"author":"ProtoplasmaKid","license":"CC BY-SA 4.0","sourceUrl":"https://commons.wikimedia.org/wiki/File:Mercado_20_de_noviembre_-_Oaxaca_de_Ju%C3%A1rez_-_4_-_Puesto_de_pan.jpg","licenseUrl":"https://creativecommons.org/licenses/by-sa/4.0"}},
"wp-14060": {heroPhoto:p12,photoCaption:"Catedral de San Juan Bautista, Old San Juan",photoCredit:{"author":"https://www.flickr.com/people/oquendo/","license":"CC BY 2.0","sourceUrl":"https://commons.wikimedia.org/wiki/File:Catedral_de_San_Juan_Bautista_a.jpg","licenseUrl":"https://creativecommons.org/licenses/by/2.0"}},
"wp-14097": {heroPhoto:p13,photoCaption:"A courtyard in Antigua Guatemala — city context",photoCredit:{"author":"Matt Stabile","license":"CC BY 2.0","sourceUrl":"https://commons.wikimedia.org/wiki/File:Antigua,_Guatemala_-_Courtyard_2012.jpg","licenseUrl":"https://creativecommons.org/licenses/by/2.0"}},
"wp-14176": {heroPhoto:p14,photoCaption:"Calle del Arco, Antigua Guatemala",photoCredit:{"author":"Chad Davis","license":"CC BY-SA 2.0","sourceUrl":"https://commons.wikimedia.org/wiki/File:Santa_Catalina_Arch_-_Antigua_Guatemala_Feb_2020.jpg","licenseUrl":"https://creativecommons.org/licenses/by-sa/2.0"}},
"wp-14174": {heroPhoto:p15,photoCaption:"A turquoise façade in Old San Juan",photoCredit:{"author":"User:Mattes","license":"CC BY 2.0 de","sourceUrl":"https://commons.wikimedia.org/wiki/File:Puerto_Rico_%E2%80%94_San_Juan_%E2%80%94_unknown_turquoise_residential_building_with_flag.JPG","licenseUrl":"https://creativecommons.org/licenses/by/2.0/de/deed.en"}},
"wp-14095": {heroPhoto:p16,photoCaption:"Colorful residential façades in Old San Juan",photoCredit:{"author":"User:Mattes","license":"CC BY 2.0 de","sourceUrl":"https://commons.wikimedia.org/wiki/File:Puerto_Rico_%E2%80%94_San_Juan_%E2%80%94_residential_buildings.JPG","licenseUrl":"https://creativecommons.org/licenses/by/2.0/de/deed.en"}},
"wp-14061": {heroPhoto:p17,photoCaption:"Santa Catalina Arch, Antigua Guatemala",photoCredit:{"author":"Adalberto.H.Vega\nuploaded and derivative work: MrPanyGoff","license":"CC BY 3.0","sourceUrl":"https://commons.wikimedia.org/wiki/File:Arco_de_Santa_Catalina_Antigua_Guatemala_edit2.jpg","licenseUrl":"https://creativecommons.org/licenses/by/3.0"}},
"wp-13562": {heroPhoto:p18,photoCaption:"Plaza Botero, Medellín — city context"},
"wp-13258": {heroPhoto:p19,photoCaption:"Colorful Caminito in La Boca, Buenos Aires",photoCredit:{"author":"Andrzej Otrębski","license":"CC BY-SA 4.0","sourceUrl":"https://commons.wikimedia.org/wiki/File:Buenos_Aires_Caminito_1.jpg","licenseUrl":"https://creativecommons.org/licenses/by-sa/4.0/"}},
"wp-13038": {heroPhoto:p20,photoCaption:"Greenery and brick steps in São Paulo · Jet Set travel archive · city context for the jewelry story"}
}
export const websiteGuides: Guide[] = records.map(record => ({...record, section:record.section as Guide['section'], ...covers[record.id]}))
