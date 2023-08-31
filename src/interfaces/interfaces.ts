export interface DataStock {
    id:number,
    name: string;
    currency: string;
    type: string;
    symbol: string;
}

export interface Column {
    id: 'name' | 'currency' | 'type' | 'symbol'
    label: string;
    width?: number;
    align?: 'right';
    format?: (value: number) => string;
    renderCell?: any;
}
