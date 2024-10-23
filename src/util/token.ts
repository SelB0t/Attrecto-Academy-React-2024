import { jwtDecode } from 'jwt-decode';
import { AUTH_TOKEN } from './constants';

interface TokenModel {
    role: Role | null;
    email: string;
} 

export function getDataFromTokenModel(key: keyof TokenModel) {
    try {
        const token = localStorage.getItem(AUTH_TOKEN);
        if(token) {
            const tokenData: TokenModel = jwtDecode(token);
            return tokenData[key];
        }
        return null;
    }
    catch (e) {
        return null;
    }
}