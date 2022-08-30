import axios from "axios";
import { client_id, client_secret, login_api, profile_api, redirect_uri } from "../utils/constant";
import qs from 'query-string'

const login = async (code) => {
    let formData = {
        grant_type: 'authorization_code',
        code: code,
        client_id: client_id,
        client_secret: client_secret,
        redirect_uri: redirect_uri
    };
    const data = await axios.post(`${login_api}`, qs.stringify(formData));

    return data;
}

const logout = async () => {
   
}

const getUserProfile = async () => {
    let token = localStorage.getItem('access_token');
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    const data = await axios.get(`${profile_api}`,config);
    return data;
}

export const authService = {
    login,
    logout,
    getUserProfile
}