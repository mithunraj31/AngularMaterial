export interface Product {
    productId?: number;
    productName:string;
    description: string;
    price: number;
    moq?: number;
    leadTime?: number
    obicNo?: string
    quantity: number
    isSet?: boolean
    active?: boolean
    createdAt?: Date
    updatedAt?: Date
    userId?: number
}