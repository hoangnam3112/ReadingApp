import axios from "axios"

const BASE_URL = 'http://192.168.0.109:5154/api/'
import * as SecureStore from 'expo-secure-store'

interface RegisterData {
    userName: string,
    email: string,
    password: string,
    userType: Number,
}

interface LoginData {
    userName: string,
    password: string,
}

export const registerApi = ({ userName, email, password, userType }: RegisterData) => {
    return axios({
        method: "POST",
        url: BASE_URL.concat("user/create"),
        headers: {
            'Content-Type': 'application/json',
        },
        data: {
            userName,
            email,
            password,
            userType,
        },
    })
}

export const loginApi = async ({ userName, password }: LoginData) => {
    return axios({
        method: "POST",
        url: BASE_URL.concat("user/login"),
        data: {
            userName,
            password
        },
    });
}

export const setAccessToken = async (accessToken: string) => {
    if (!accessToken) {
        return false
    }
    try {
        await SecureStore.setItemAsync('accessToken', accessToken)
        addTokenToAxios(accessToken)
        return true
    } catch (error) {
        console.log("Lỗi khi lưu token", error)
    }
    return false
}

export const getAccessToken = async () => {
    try {
        const accessToken = await SecureStore.getItemAsync('accessToken')
        return accessToken
    } catch (error) {
        console.log("Lỗi khi lưu token", error)
    }
    return false
}

export const addTokenToAxios = (accessToken: string) => {
    axios.interceptors.request.use(function (config) {
        // Do something before request is sent
        config.headers.Authorization = `Bearer ${accessToken}`
        return config;
    }, function (error) {
        // Do something with request error
        return Promise.reject(error);
    })
}

export const addBookApi = async ({ formData }: any) => {
    return axios({
        method: "POST",
        url: 'BASE_URL.concat("book/create")',
        data: {
            formData
        },
    });
}

export const getBooksApi = async () => {
    return axios({
        method: "GET",
        url: BASE_URL.concat("book/getBooks"),
    });
}

interface AddData {
    username: string,
    title: string,
    author: string,
    year: string,
    category: string
    content: BinaryData
}
export const addTosLibraryApi = async ({username, title, author, year, category, content} : AddData) => {
    return axios({
        method: "POST",
        url: BASE_URL.concat("userbook/create"),
        data: {
            username,
            title,
            author,
            year,
            category,
            content
        }
    });
}
