import axios, { AxiosInstance, AxiosResponse, AxiosRequestConfig } from 'axios'

const XToken = '56c7e44b-8196-4947-9e19-f7367bb2adf4'

export const domainV3 = 'api/v3'

process.env.NODE_ENV === 'development' && (axios.defaults.headers.XToken = XToken)

axios.defaults.withCredentials = true

const instance: AxiosInstance = axios.create({
    baseURL: '/',
    timeout: 35000,
    // timeout: 5000,
    headers: {
		'Content-Type': 'application/json;charset=UTF-8',
		'Cache-Control': 'no-cache,no-store,must-revalidate,max-age=-1,private',
		'Expires': -1
    }
})

instance.interceptors.request.use((config: AxiosRequestConfig) => {
    // const method = config.method.toLocaleLowerCase() === 'post' || config.method.toLocaleLowerCase() === 'put' || config.method.toLocaleLowerCase() === 'delete'
    // if (method) {
    //     config.data = qs.stringify(config.data)
    // }

    // config.params = Object.assign({}, {}, config.params)
    return config
}, (err: any) => {
    return err
})

instance.interceptors.response.use((response: AxiosResponse) => {
    if (response.data && response.data.error) {
        if (response.data.error.code === 1000) { // 未登录
            alert(response.data.error.msg)
        }
    }
    return response.data
}, (err: any) => {
    if (err && err.response) {
        // switch (err.response.status) {
        //     case 400:
        //         err.message = '请求错误'
        //         break

        //     case 401:
        //         err.message = '未授权，请登录'
        //         break

        //     case 404:
        //         err.message = '404'
        //         break

        //     case 500:
        //         err.message = '500'
        //         break

        //     case 504:
        //         err.message = '504'
        //         break

        //     default:
        // }
    }
    if (err.toString().includes('Error: timeout of')) {
        err.Timeout = true
    }
    if (err.toString().includes('Network Error') || err.toString().includes('Request failed')) {
        err.NetworkError = true
    }
    return err
})

export default instance

export function catchResponse(this: any, res: any, resDataHandler: () => void, isMescroll?: boolean | undefined) {
	if (res.error) {
		isMescroll && this.mescroll.endErr()
		this.loadingResError = true
		this.loadingResErrorMsg = res.error.msg
	} else if (res.Timeout) {
		isMescroll && this.mescroll.endErr()
		this.loadingPageTimeout = true
	} else if (res.NetworkError) {
		isMescroll && this.mescroll.endErr()
		this.loadingPageNetworkError = true
	} else if (res.data) {
		resDataHandler()
	}
}
