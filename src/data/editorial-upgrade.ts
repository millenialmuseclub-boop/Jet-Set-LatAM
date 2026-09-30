import type {Guide,Place} from '@/types'
import records from './editorial-upgrade.json'
import p0 from '../assets/five-cities/lima-1.webp'
import p1 from '../assets/next-cities/santiago-extra.webp'
import p2 from '../assets/five-cities/montevideo-1.webp'
import p3 from '../assets/next-cities/mendoza-1.webp'
import p4 from '../assets/next-cities/cusco-1.webp'
const photos:Record<string,string>={"/src/assets/five-cities/lima-1.webp":p0,"/src/assets/next-cities/santiago-extra.webp":p1,"/src/assets/five-cities/montevideo-1.webp":p2,"/src/assets/next-cities/mendoza-1.webp":p3,"/src/assets/next-cities/cusco-1.webp":p4}
export const editorialUpgradeGuides:Guide[]=records.guides.map(({photo,...g})=>({...g,heroPhoto:photos[photo]})) as Guide[]
export const editorialUpgradePlaces=records.places as Place[]
export const editorialPlaceLinks=records.links
