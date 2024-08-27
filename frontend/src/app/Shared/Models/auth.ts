export interface LoginRequest {
    userName: string,
    password: string
}

export interface RegisterRequest {
    userName: string,
    name: string,
    email: string,
    phone: string,
    password: string
}