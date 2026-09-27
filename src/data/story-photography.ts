// Curated article covers. Captions identify regional context without implying a venue photo.
// New-photo licenses and provenance: docs/STORY_PHOTOGRAPHY.json.
import photo0 from "@/assets/story-covers/ba-palermo.webp"
import photo1 from "@/assets/story-covers/ba-walking.webp"
import photo2 from "@/assets/story-covers/ba-waterfront.webp"
import photo3 from "@/assets/story-covers/ba-jacarandas.webp"
import photo4 from "@/assets/story-covers/ba-cafe.webp"
import photo5 from "@/assets/story-covers/ba-tango-show.webp"
import photo6 from "@/assets/story-covers/ba-hotel.webp"
import photo7 from "@/assets/story-covers/ba-subte.webp"
import photo8 from "@/assets/story-covers/ba-theater.webp"
import photo9 from "@/assets/story-covers/ba-tango-dancers.webp"
import photo10 from "@/assets/story-covers/cdmx-roma.webp"
import photo11 from "@/assets/story-covers/cdmx-park.webp"
import photo12 from "@/assets/story-covers/cdmx-cycling.webp"
import photo13 from "@/assets/story-covers/cdmx-metro.webp"
import photo14 from "@/assets/story-covers/cdmx-alameda.webp"
import photo15 from "@/assets/story-covers/cdmx-balloons.webp"
import photo16 from "@/assets/story-covers/gdl-americana.webp"
import photo17 from "@/assets/story-covers/gdl-americana-street.webp"
import photo18 from "@/assets/story-covers/gdl-agave.webp"
import photo19 from "@/assets/story-covers/gdl-agave-landscape.webp"
import photo20 from "@/assets/story-covers/gdl-transit.webp"
import photo21 from "@/assets/story-covers/tulum-cenote.webp"
import photo22 from "@/assets/story-covers/tulum-coast.webp"
import photo23 from "@/assets/story-covers/maya-train.webp"
import photo24 from "@/assets/story-covers/maya-station.webp"
import photo25 from "@/assets/story-covers/playa-beach.webp"
import photo26 from "@/assets/story-covers/playa-quinta.webp"
import photo27 from "@/assets/story-covers/sp-market.webp"
import photo28 from "@/assets/story-covers/sp-forest.webp"
import photo29 from "@/assets/story-covers/rio-forest.webp"
import photo30 from "@/assets/story-covers/amazon-river.webp"
import photo31 from "@/assets/cdmx/folk-art-alebrije.jpg"
import photo32 from "@/assets/cdmx/unam-library.jpg"
import photo33 from "@/assets/cdmx/gran-hotel-dome.jpg"
import photo34 from "@/assets/cdmx/gran-hotel-atrium.jpg"
import photo35 from "@/assets/cdmx/plaza-garibaldi.jpg"
import photo36 from "@/assets/cdmx/zocalo.jpg"
import photo37 from "@/assets/final-travel-photos/rio-4.webp"
import photo38 from "@/assets/rio-city-2025/4.webp"
import photo39 from "@/assets/rio/kobra-mural.jpg"
import photo40 from "@/assets/rio-2025/6.webp"
import photo41 from "@/assets/rio-city-2025/2.webp"
import photo42 from "@/assets/rio/sugarloaf-panorama.jpg"
import photo43 from "@/assets/archive/db062c512a66.webp"
import photo44 from "@/assets/cartagena/walled-city-street.jpg"
import photo45 from "@/assets/archive/a5a7b8cc46a8.webp"
import photo46 from "@/assets/archive/6b0276554a11.webp"
import photo47 from "@/assets/guadalajara/guadalajara-sign-cathedral.jpg"
import photo48 from "@/assets/tulum/tulum-ruins-cliff.jpg"
import photo49 from "@/assets/tulum/tulum-ruins-palm.jpg"
import photo50 from "@/assets/final-travel-photos/sao-paulo-1.webp"
import photo51 from "@/assets/final-travel-photos/sao-paulo-4.webp"
import photo52 from "@/assets/sao-paulo/beco-do-batman-geometric-mural.jpg"
import photo53 from "@/assets/final-travel-photos/playa-del-carmen-7.webp"
import photo54 from "@/assets/final-travel-photos/playa-del-carmen-8.webp"
import photo55 from "@/assets/playa-del-carmen/xcaret-butterfly-sanctuary-sign.jpg"
import photo56 from "@/assets/playa-del-carmen/xcaret-butterfly-sanctuary-portrait.jpg"
import photo57 from "@/assets/playa-del-carmen/xcaret-lagoon-cove.jpg"
import photo58 from "@/assets/oaxaca/oaxaca-mezcal.jpg"
import photo59 from "@/assets/santiago/santiago-cerro-san-cristobal-panorama.jpg"
import photo60 from "@/assets/bogota/bogota-street-graffiti.jpg"

export const storyCovers: Record<string, { src: string; caption: string; credit?: { author: string; license: string; sourceUrl: string; licenseUrl: string } }> = {
  "wp-12661": { src: photo0, caption: "Palermo Soho, Buenos Aires — neighborhood context for the design story", credit: {"author":"Josiah Mackenzie","license":"CC BY 2.0","sourceUrl":"https://commons.wikimedia.org/wiki/File:Palermo_SoHo.jpg","licenseUrl":"https://creativecommons.org/licenses/by/2.0"} },
  "wp-9978": { src: photo1, caption: "Gurruchaga Street, Palermo Soho, Buenos Aires", credit: {"author":"Brian Barbutti","license":"CC BY 2.0","sourceUrl":"https://commons.wikimedia.org/wiki/File:A_cobblestoned_street_in_Palermo_Soho.jpg","licenseUrl":"https://creativecommons.org/licenses/by/2.0"} },
  "wp-9834": { src: photo2, caption: "Puente de la Mujer at night, Puerto Madero, Buenos Aires", credit: {"author":"Leandro Neumann Ciuffo","license":"CC BY 2.0","sourceUrl":"https://commons.wikimedia.org/wiki/File:Puente_de_la_Mujer_by_night_(7565437534).jpg","licenseUrl":"https://creativecommons.org/licenses/by/2.0"} },
  "wp-8657": { src: photo3, caption: "Jacarandas on Avenida del Libertador, Buenos Aires", credit: {"author":"tercerojista","license":"CC BY 2.0","sourceUrl":"https://commons.wikimedia.org/wiki/File:Avenida_del_Libertador_trees.jpg","licenseUrl":"https://creativecommons.org/licenses/by/2.0"} },
  "wp-2294": { src: photo4, caption: "Inside Café Tortoni, Buenos Aires", credit: {"author":"ProtoplasmaKid","license":"CC BY-SA 4.0","sourceUrl":"https://commons.wikimedia.org/wiki/File:Interior_del_Caf%C3%A9_Tortoni_2025_04.jpg","licenseUrl":"https://creativecommons.org/licenses/by-sa/4.0"} },
  "wp-2293": { src: photo5, caption: "A tango performance in Buenos Aires — cultural context, not a named venue in this guide", credit: {"author":"McKay Savage from London, UK","license":"CC BY 2.0","sourceUrl":"https://commons.wikimedia.org/wiki/File:Argentina_-_Buenos_Aires_060_-_tango_show_(6979621857).jpg","licenseUrl":"https://creativecommons.org/licenses/by/2.0"} },
  "wp-2297": { src: photo6, caption: "Palacio Duhau, Recoleta, Buenos Aires — hotel architecture", credit: {"author":"Roberto Fiadone","license":"CC BY 4.0","sourceUrl":"https://commons.wikimedia.org/wiki/File:Palacio_Duhau_Park_Hyatt_01.jpg","licenseUrl":"https://creativecommons.org/licenses/by/4.0"} },
  "wp-2298": { src: photo7, caption: "A Subte entrance in Buenos Aires", credit: {"author":"Svenska84","license":"Public domain","sourceUrl":"https://commons.wikimedia.org/wiki/File:Buenos_Aires_Subte_station_Peru.jpg","licenseUrl":"https://commons.wikimedia.org/wiki/File%3ABuenos%20Aires%20Subte%20station%20Peru.jpg"} },
  "wp-2295": { src: photo8, caption: "Inside Teatro Colón, Buenos Aires", credit: {"author":"HalloweenHJB","license":"CC BY-SA 3.0","sourceUrl":"https://commons.wikimedia.org/wiki/File:Colon-interior-escenario-TM.jpg","licenseUrl":"https://creativecommons.org/licenses/by-sa/3.0"} },
  "wp-2292": { src: photo9, caption: "Tango dancers in Buenos Aires — cultural context, not a named venue in this guide", credit: {"author":"Ralf Steinberger from Milan, Berlin + Munich, Italy + Germany","license":"CC BY 2.0","sourceUrl":"https://commons.wikimedia.org/wiki/File:Tango_dancers_in_Buenos_Aires,_Argentina._(33570798082).jpg","licenseUrl":"https://creativecommons.org/licenses/by/2.0"} },
  "gd-designer-boutiques-cdmx": { src: photo10, caption: "Architecture around Plaza Río de Janeiro, Roma Norte — Mexico City design context", credit: {"author":"Pedro Camilo Márquez Vallarta","license":"CC BY-SA 4.0","sourceUrl":"https://commons.wikimedia.org/wiki/File:Arquitectura_de_los_alrededores_de_la_Plaza_R%C3%ADo_de_Janeiro_de_la_colonia_Roma.jpg","licenseUrl":"https://creativecommons.org/licenses/by-sa/4.0"} },
  "wp-9784": { src: photo11, caption: "Chapultepec Park, Mexico City", credit: {"author":"Polianalista","license":"CC0","sourceUrl":"https://commons.wikimedia.org/wiki/File:Lago_de_Chapultepec_2025.jpg","licenseUrl":"https://creativecommons.org/publicdomain/zero/1.0/deed.en"} },
  "wp-2105": { src: photo12, caption: "The cycle lane on Paseo de la Reforma, Mexico City", credit: {"author":"ProtoplasmaKid","license":"CC BY-SA 3.0","sourceUrl":"https://commons.wikimedia.org/wiki/File:Carril_ciclista_en_Paseo_de_la_Reforma.jpg","licenseUrl":"https://creativecommons.org/licenses/by-sa/3.0"} },
  "wp-9599": { src: photo13, caption: "Mexico City Metro", credit: {"author":"Daniel Manrique (Roadmaster)","license":"CC BY-SA 3.0","sourceUrl":"https://commons.wikimedia.org/wiki/File:Mexico_City_Metro.jpg","licenseUrl":"https://creativecommons.org/licenses/by-sa/3.0/"} },
  "wp-2035": { src: photo14, caption: "Alameda Central, Mexico City", credit: {"author":"José Luiz","license":"CC BY-SA 4.0","sourceUrl":"https://commons.wikimedia.org/wiki/File:Alameda_Central_-_Mexico_2024.jpg","licenseUrl":"https://creativecommons.org/licenses/by-sa/4.0"} },
  "wp-1788": { src: photo15, caption: "A hot-air balloon over Teotihuacán, near Mexico City", credit: {"author":"Bryce Evans artofbryce","license":"CC0","sourceUrl":"https://commons.wikimedia.org/wiki/File:Pir%C3%A1mide_del_Sol,_Mexico_(Unsplash).jpg","licenseUrl":"https://creativecommons.org/publicdomain/zero/1.0/deed.en"} },
  "gd-guadalajara-colonia-americana": { src: photo16, caption: "A historic house in Colonia Americana, Guadalajara", credit: {"author":"Encogua","license":"CC BY-SA 4.0","sourceUrl":"https://commons.wikimedia.org/wiki/File:Casa_en_la_colonia_Americana_Siglo_XIX.jpg","licenseUrl":"https://creativecommons.org/licenses/by-sa/4.0"} },
  "wp-8662": { src: photo17, caption: "Colonia Americana architecture, Guadalajara", credit: {"author":"Encogua","license":"CC BY-SA 4.0","sourceUrl":"https://commons.wikimedia.org/wiki/File:Casa_dos_Pisos_Colonia_Americana_S_XIX.jpg","licenseUrl":"https://creativecommons.org/licenses/by-sa/4.0"} },
  "gd-guadalajara-tequila-express": { src: photo18, caption: "Agave fields in Tequila, Jalisco — day-trip landscape", credit: {"author":"Juan Carlos Fonseca Mata","license":"CC BY-SA 4.0","sourceUrl":"https://commons.wikimedia.org/wiki/File:Agaves_-_Tequila,_Jalisco_I.jpg","licenseUrl":"https://creativecommons.org/licenses/by-sa/4.0"} },
  "wp-1833": { src: photo19, caption: "The agave landscape of Tequila, Jalisco", credit: {"author":"Juan Carlos Fonseca Mata","license":"CC BY-SA 4.0","sourceUrl":"https://commons.wikimedia.org/wiki/File:Agaves_-_Tequila,_Jalisco_II.jpg","licenseUrl":"https://creativecommons.org/licenses/by-sa/4.0"} },
  "wp-9630": { src: photo20, caption: "A Guadalajara light-rail train at Juárez station", credit: {"author":"Arturoramos","license":"CC BY-SA 3.0","sourceUrl":"https://commons.wikimedia.org/wiki/File:SITEUR_Line_1_train_arriving_to_Ju%C3%A1rez_station.jpg","licenseUrl":"https://creativecommons.org/licenses/by-sa/3.0"} },
  "wp-1829": { src: photo21, caption: "Cenote Corazón Paraíso near Tulum — regional nature context", credit: {"author":"Erik Cleves Kristensen","license":"CC BY 2.0","sourceUrl":"https://commons.wikimedia.org/wiki/File:Cenote_Corazon_Paraiso,_Tulum_QR_2023.jpg","licenseUrl":"https://creativecommons.org/licenses/by/2.0"} },
  "wp-9724": { src: photo22, caption: "The coast near Tulum — destination context, not a hotel photograph", credit: {"author":"Mikkie27","license":"CC BY-SA 4.0","sourceUrl":"https://commons.wikimedia.org/wiki/File:Mexico_-_beach_by_Tulum,_2022.jpg","licenseUrl":"https://creativecommons.org/licenses/by-sa/4.0"} },
  "wp-2142": { src: photo23, caption: "Tren Maya arriving at Valladolid station, Yucatán", credit: {"author":"ProtoplasmaKid","license":"CC BY-SA 4.0","sourceUrl":"https://commons.wikimedia.org/wiki/File:Tren_Maya_en_operaci%C3%B3n_8.jpg","licenseUrl":"https://creativecommons.org/licenses/by-sa/4.0"} },
  "wp-1832": { src: photo24, caption: "Mérida-Teya station on the Tren Maya, Yucatán", credit: {"author":"JhonatanMijangos","license":"CC BY 4.0","sourceUrl":"https://commons.wikimedia.org/wiki/File:Tren_Maya_Estaci%C3%B3n_M%C3%A9rida-Teya.jpg","licenseUrl":"https://creativecommons.org/licenses/by/4.0"} },
  "wp-10066": { src: photo25, caption: "Playa del Carmen beach", credit: {"author":"Scott S Bateman","license":"CC BY-SA 4.0","sourceUrl":"https://commons.wikimedia.org/wiki/File:Playa-del-carmen-beach.jpg","licenseUrl":"https://creativecommons.org/licenses/by-sa/4.0"} },
  "wp-9679": { src: photo26, caption: "Quinta Avenida at Calle 4 Norte, Playa del Carmen", credit: {"author":"Giorgio Galeotti","license":"CC BY 4.0","sourceUrl":"https://commons.wikimedia.org/wiki/File:Quinta_Avenida_at_Calle_4_Norte_-_Playa_del_Carmen,_Mexico_-_August_15,_2014_02.jpg","licenseUrl":"https://creativecommons.org/licenses/by/4.0"} },
  "wp-2006": { src: photo27, caption: "Inside the Mercado Municipal, São Paulo", credit: {"author":"Marcos Elias de Oliveira Júnior","license":"CC0","sourceUrl":"https://commons.wikimedia.org/wiki/File:Interior_do_Mercado_Municipal_de_S%C3%A3o_Paulo_(SP).jpg","licenseUrl":"https://creativecommons.org/publicdomain/zero/1.0/deed.en"} },
  "wp-2089": { src: photo28, caption: "Cantareira State Park, São Paulo — forest landscape", credit: {"author":"Sturm","license":"CC BY-SA 4.0","sourceUrl":"https://commons.wikimedia.org/wiki/File:Parque_Estadual_da_Cantareira_49.jpg","licenseUrl":"https://creativecommons.org/licenses/by-sa/4.0"} },
  "wp-2090": { src: photo29, caption: "Tijuca Forest, Rio de Janeiro — landscape context, not a verified cycling route", credit: {"author":"Pierre André","license":"CC BY-SA 4.0","sourceUrl":"https://commons.wikimedia.org/wiki/File:Rio_de_Janeiro_Tijuca_Forest_(2).jpg","licenseUrl":"https://creativecommons.org/licenses/by-sa/4.0"} },
  "wp-2114": { src: photo30, caption: "A boat on the Rio Negro at Manaus, Brazilian Amazon — regional context", credit: {"author":"James Martins","license":"CC BY 3.0","sourceUrl":"https://commons.wikimedia.org/wiki/File:Amazon_boat_in_Rio_Negro_River_Manaus_AM)_-_panoramio.jpg","licenseUrl":"https://creativecommons.org/licenses/by/3.0"} },
  "gd-carla-fernandez": { src: photo31, caption: "Mexican folk art — cultural context for the Mexico City design story" },
  "gd-cruiser-bike-cdmx": { src: photo32, caption: "UNAM Central Library, Mexico City — architecture and culture" },
  "gd-honeymooners-cdmx": { src: photo33, caption: "The stained-glass ceiling at Gran Hotel Ciudad de México" },
  "wp-9580": { src: photo34, caption: "Gran Hotel Ciudad de México — architectural context for the city design story" },
  "wp-8661": { src: photo35, caption: "Plaza Garibaldi, Mexico City" },
  "wp-310": { src: photo36, caption: "The Zócalo, Centro Histórico — neighborhood context, not Hotel Histórico Central" },
  "gd-rio-beachfront-neighborhoods": { src: photo37, caption: "Rio de Janeiro beach and mountain skyline" },
  "gd-rio-etiquette-nightlife": { src: photo38, caption: "An evening gathering beside the beach in Rio — city context" },
  "gd-rio-olympic-boulevard": { src: photo39, caption: "Eduardo Kobra mural on Rio de Janeiro’s Olympic Boulevard" },
  "wp-2135": { src: photo40, caption: "A walk through Cinelândia, Rio de Janeiro — Jet Set archive, 2025" },
  "wp-2102": { src: photo41, caption: "Rio’s coast and mountains at sunset — city context" },
  "wp-1886": { src: photo42, caption: "Sugarloaf panorama, Rio de Janeiro — city context" },
  "gd-cartagena-island": { src: photo43, caption: "The beach at Blue Apple Resort, Isla Barú" },
  "wp-12642": { src: photo44, caption: "Cartagena’s Walled City — neighborhood context for the fashion story" },
  "wp-10093": { src: photo45, caption: "A Getsemaní mural with living vines, Cartagena" },
  "wp-10225": { src: photo46, caption: "Baluarte de Santo Domingo, Cartagena" },
  "wp-9810": { src: photo47, caption: "Guadalajara’s sign and cathedral towers" },
  "wp-9744": { src: photo48, caption: "Tulum’s Maya ruins above the Caribbean" },
  "wp-2103": { src: photo49, caption: "Palms and Maya ruins in Tulum — coastal route context" },
  "wp-13008": { src: photo50, caption: "An art installation in São Paulo — city design context, not a Martha Medeiros store" },
  "wp-12840": { src: photo51, caption: "Linked metal forms in a São Paulo gallery — city design context, not Ara Vartanian jewelry" },
  "wp-8659": { src: photo52, caption: "Beco do Batman, Vila Madalena — São Paulo design context, not a Jardins boutique" },
  "wp-10036": { src: photo53, caption: "An evening street in Playa del Carmen" },
  "wp-9922": { src: photo54, caption: "Colorful hanging decorations in a Playa del Carmen shop" },
  "wp-9909": { src: photo55, caption: "Xcaret’s butterfly sanctuary, near Playa del Carmen" },
  "wp-9684": { src: photo56, caption: "A firsthand travel moment at Xcaret’s butterfly sanctuary" },
  "wp-2585": { src: photo57, caption: "Xcaret lagoon — park context, not a hotel room photograph" },
  "gd-oaxaca-mezcal-jalatlaco": { src: photo58, caption: "Mezcal in Oaxaca — regional context", credit: {"author":"Polo Sanchez","license":"CC BY-SA 4.0","sourceUrl":"https://commons.wikimedia.org/wiki/File:Mezcal_in_Oaxaca,_Mexico.jpg","licenseUrl":"https://creativecommons.org/licenses/by-sa/4.0/"} },
  "gd-santiago-bellavista": { src: photo59, caption: "Santiago seen from Cerro San Cristóbal", credit: {"author":"Omnespsx (D•ES)","license":"CC BY-SA 4.0","sourceUrl":"https://commons.wikimedia.org/wiki/File:Santiago_de_Chile,_Desde_Cerro_San_Crist%C3%B3bal_(cropped_panorama).jpg","licenseUrl":"https://creativecommons.org/licenses/by-sa/4.0/"} },
  "gd-bogota-chapinero": { src: photo60, caption: "Bogotá street art — city context, not a specific Chapinero venue", credit: {"author":"Sierraluisfer","license":"CC BY-SA 4.0","sourceUrl":"https://commons.wikimedia.org/wiki/File:Grafitti_Bogota_StkinFish_2025.jpg","licenseUrl":"https://creativecommons.org/licenses/by-sa/4.0/"} },
}
