import axios, { domainV3 } from '../../http'

export const apiGetGoodsOrder = (page: number, size: number) => {
	return axios.get(`${domainV3}/points/goods/order?page=${page}&size=${size}`)
}
