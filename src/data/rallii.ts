export type RalliiMode = 'rail' | 'trail' | 'mtb' | 'snow' | 'green'
export interface RalliiConnection { id:string; destinationId:string; mode:RalliiMode; routeId:string; routeName:string; region:string; guideIds:string[]; placeIds:string[]; evidence:string; verified:boolean }
export const ralliiModes: RalliiMode[] = ['rail','trail','mtb','snow','green']
/** Reviewed against the current Rallii catalogue. Empty means no verified nearby coverage. */
export const ralliiDestinationMap: Record<string,RalliiConnection[]> = {
 'mexico-city':[], 'rio-de-janeiro':[], cartagena:[], guadalajara:[], tulum:[], 'sao-paulo':[], 'playa-del-carmen':[], 'buenos-aires':[]
}
export const outdoorStoryIds = ["wp-2142","wp-1832",'gd-guadalajara-tequila-express','wp-2105','wp-2090','wp-2089','wp-9744','wp-2103','wp-1829']
export const ralliiEditorialJourneys = [{id:'el-chepe-express',name:'El Chepe Express',region:'Sinaloa → Chihuahua, Mexico',description:'From Los Mochis to Creel through northern Mexico’s canyon country. A separate journey from Jet Set’s current city itineraries.',mode:'rail' as const,source:'Rallii/src/data/routes/el-chepe-express.ts',verifiedAt:'2026-09-13'}]
