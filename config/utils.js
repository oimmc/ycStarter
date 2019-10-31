let publicPath = '/'
switch (process.env.NODE_ENV) {
	case 'development':
        publicPath = '/'
        break
    case 'lan':
        publicPath = '/'
        break
    case 'production':
        publicPath = '/'
        break
}

module.exports = {
	publicPath
}
