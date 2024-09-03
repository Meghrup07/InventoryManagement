export interface Customers {
    items: Item[]
    totalCount: number
}

export interface Item {
    id: number
    name: string
    email: string
    phone: string
    address: string
    city: string
}

export interface CustomerRequest {
    name: string
    email: string
    phone: string
    address: string
    city: string
}