import axios, { domainV3 } from '../../http'

export const apiGetList = (page: number, size: number) => {
	return axios.get(`${domainV3}/points/sign-in/lottery/bingo?page=${page}&size=${size}`)
}

export const apiPostBingo = (id: number) => {
	return axios.post(`${domainV3}/points/sign-in/lottery/bingo/${id}`)
}
