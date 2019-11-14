export interface Product {
    product_id?: number;
    product_name:string;
    description: string;
    price: number;
    moq?: number;
    lead_time?: number
    obic_no?: string
    qty: number
    is_set?: boolean
    active?: boolean
    created_at?: Date
    updated_at?: Date
    user_id?: number
}