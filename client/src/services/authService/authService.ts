import {$host} from '../instance/index'
import {jwtDecode}  from 'jwt-decode'

export const registration = async (email: string, password: string, username: string) => {
    const {data} = await $host.post('api/user/registration', {email, password, username})
    return jwtDecode(data.token)
}

export const login = async (email: string, password: string) => {
    const {data} = await $host.post('api/user/login', {email, password})
    return jwtDecode(data.token)
}

export const auth = async (email: string, password: string) => {
    const {data} = await $host.post('api/user/login', {email, password})
    return jwtDecode(data.token)
}
