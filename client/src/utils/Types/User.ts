export type User = {
    id: number
    firstName: string
    lastName: string
    phone: string
    email: string
    role: string
} 

export enum Roles {
    USER = 'user',
    ADMIN = 'admin'
} 