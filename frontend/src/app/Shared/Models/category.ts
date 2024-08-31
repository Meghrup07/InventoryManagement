export type CategoryResponse = {
    id: number,
    categoryType: string,
    categoryName: string,
    products: any[]
}[];

export type CategoryRequest = {
    categoryType: string,
    categoryName: string
}