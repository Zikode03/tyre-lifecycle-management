export type StockStatus = 'In stock' | 'Low stock' | 'Out of stock';
export interface TyreStockItem { sku:string; brand:string; model:string; size:string; quantity:number; branch:string; sellingPrice:number; supplierCode?:string; updatedAt:string; }
const STOCK_KEY='tyretrack.demo.stock';
const seedStock:TyreStockItem[]=[
 {sku:'CON-UC-2055516',brand:'Continental',model:'UltraContact',size:'205/55 R16',quantity:12,branch:'Durban Central',sellingPrice:1850,supplierCode:'CT-20555-UC',updatedAt:'17 Aug 2026, 20:10'},
 {sku:'MIC-P4-2055516',brand:'Michelin',model:'Primacy 4',size:'205/55 R16',quantity:3,branch:'Durban Central',sellingPrice:2150,supplierCode:'MI-20555-P4',updatedAt:'17 Aug 2026, 20:10'},
 {sku:'BRI-T005-2254517',brand:'Bridgestone',model:'Turanza T005',size:'225/45 R17',quantity:0,branch:'Durban Central',sellingPrice:2400,supplierCode:'BS-22545-T005',updatedAt:'17 Aug 2026, 20:10'},
 {sku:'GY-EF2-1955516',brand:'Goodyear',model:'EfficientGrip Performance 2',size:'195/55 R16',quantity:7,branch:'Durban Central',sellingPrice:1995,supplierCode:'GY-19555-EF2',updatedAt:'17 Aug 2026, 20:10'},
 {sku:'BRI-DUEL-2656517',brand:'Bridgestone',model:'Dueler A/T',size:'265/65 R17',quantity:5,branch:'Pinetown',sellingPrice:3290,supplierCode:'BS-26565-DAT',updatedAt:'17 Aug 2026, 19:56'},
];
function readStock(){if(typeof window==='undefined')return seedStock;const raw=localStorage.getItem(STOCK_KEY);if(!raw){localStorage.setItem(STOCK_KEY,JSON.stringify(seedStock));return seedStock;}try{return JSON.parse(raw) as TyreStockItem[]}catch{return seedStock}}
function writeStock(items:TyreStockItem[]){if(typeof window!=='undefined')localStorage.setItem(STOCK_KEY,JSON.stringify(items));return items}
export function getStockStatus(quantity:number):StockStatus{if(quantity<=0)return'Out of stock';if(quantity<=3)return'Low stock';return'In stock'}
export async function getTyreStock():Promise<TyreStockItem[]>{return readStock()}
export async function findCompatibleStock(size:string):Promise<TyreStockItem[]>{return readStock().filter(item=>item.size===size&&item.quantity>0)}
export async function reserveTyreStock(sku:string,quantity=1):Promise<TyreStockItem>{const items=readStock();const item=items.find(i=>i.sku===sku);if(!item)throw new Error('Stock item not found');if(item.quantity<quantity)throw new Error('Insufficient stock');const updated={...item,quantity:item.quantity-quantity,updatedAt:new Date().toLocaleString('en-ZA')};writeStock(items.map(i=>i.sku===sku?updated:i));return updated}
