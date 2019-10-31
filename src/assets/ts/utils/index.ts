export const isNull = (str: string): boolean => str === '' || str === 'null' || str === null || str === undefined || str === 'undefined'

export const isEmail: object = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/

export const urlQuery = (name: any): (string | undefined) => {
    if (name = (new RegExp('[?&]' + encodeURIComponent(name) + '=([^&]*)')).exec(window.location.search)) {
		return decodeURIComponent(name[1])
	}
}

export const getCookie = (name: string) => {
	const strcookie = document.cookie
	const arrcookie = strcookie.split('; ')
	for (let i = 0; i < arrcookie.length; i++) {
		const arr = arrcookie[i].split('=')
		if (arr[0] === name) {
			return arr[1]
		}
	}
	return ''
}

