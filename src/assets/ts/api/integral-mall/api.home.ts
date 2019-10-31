import axios, { domainV3 } from '../../http'

export const apiGetAccountsPoints = () => {
	return axios.get(`${domainV3}/points/accounts`)
}

export const apiGetGoods = (page: number, size: number) => {
	return axios.get(`${domainV3}/points/goods?page=${page}&size=${size}`)
}
