const downloadTemplate = (repo) => {
	let path = process.argv[2] || 'node_modules/ycui'
	return new Promise((resolve, reject) => {
		require('download-git-repo')(repo, path, (err) => {
			if (err) {
				reject(err)
			}
			resolve()
		})
	})
}

const getYcui = () => {
	let repo = 'wangyajundev/ycui'

	downloadTemplate(repo).then(
		() => {
			console.log('Download completed !\n');
		},
		(err) => {
			console.log('Download error: \n')
			console.log(err)
		}
	)
}

getYcui()
