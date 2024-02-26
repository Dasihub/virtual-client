import axios, { AxiosRequestConfig } from 'axios'

export const baseUrl = 'http://localhost:5000/api'

const axiosInstance = axios.create({
	baseURL: baseUrl,
	validateStatus: status => status <= 500,
	withCredentials: true
})

export const api = async (axiosConfig: AxiosRequestConfig) => {
	try {
		return await axiosInstance(axiosConfig)
	} catch (e) {}
}