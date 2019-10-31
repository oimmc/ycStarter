import axios, { domainV3 } from '../../http'

export const apiGetGoodsById = (id: number) => {
	return axios.get(`${domainV3}/points/goods/${id}`)
}

export const apiPostGoodsOrder = (id: number) => {
	return axios.post(`${domainV3}/points/goods/order`, {
		goodsId: id
	})
}
