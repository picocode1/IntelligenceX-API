const https = require('https')

let IntelX = class {
	API_URL = '2.intelx.io';

	/**
	 * @param  {string} API_KEY Setup with API-KEY.
	*/
	constructor(API_KEY) {
		this.API_KEY = API_KEY;
	}

	//https://2.intelx.io/file/preview?sid=aaaa&f=0&l=8&c=1&m=1&b=pastes&k=bde22e15-a147-4816-9414-0bf9c0755644
	/**
	 * @param  {string} sid Storage Identifier.
	 * @param  {string} TargetFormat TargetFormat.
	 * @param  {int} LineCount Max line count.
	 * @param  {string} Content Content Type.
	 * @param  {string} Media Media Type.
	 * @param  {string} bucket 	
		[darknet.tor] Tor hidden services (.onion domains)

		[darknet.i2p] I2P eepsites (.i2p domains)

		[documents.public.scihub] Public documents from Sci-Hub

		[dumpster] Any data potentially relevant but does not fit into any other category

		[leaks.private.general] Private Data Leaks

		[leaks.public.general] Public Data Leaks

		[leaks.public.wikileaks] WikiLeaks, Cryptome & Snowden data

		[pastes] Pastes from various pastebin sites

		[web.public.de] Public Web: Germany

		[web.public.kp] North Korean public websites

		[web.public.ru] Public Web: Russia
		
		[whois] Whois data

		[web.public.com]
	 * 
	 * @param  {boolean} e HTML encoded.
	*/
	//Preview(sid, Content, Media, TargetFormat, bucket, e) {
	//	e = e ? 1 : 0;
    //    return new Promise((resolve, reject) => {
	//		const https = require('https')
	//		var options = {
	//			hostname: this.API_URL,
	//			port: 443,
	//			path: `/file/preview?sid=${sid}&f=${TargetFormat}&l=${LineCount}&c=${Content}&m=${Media}&b=${bucket}&k=${API_KEY}`,
	//			method: 'GET',
	//			headers: {
	//				'x-key': this.API_KEY
	//			}
	//		}
	//		const request = https.request(options, response => {
	//			response.on('data', d => {
	//				var json = JSON.parse(String(d))
	//				switch(json.status){
	//					case 0:
	//						//Success, search ID is valid
	//						resolve(String(d))
	//						break;
	//					case 1:
	//						reject(new Error("No future results available, stop trying. All results were delivered and the search is terminated.Note: Records may be returned with this status code."))
	//						break;
	//					case 2:
	//						reject(new Error("Search ID not found"))
	//						break;
	//					case 2:
	//						reject(new Error("No results yet available but keep trying."))
	//						break;
	//					default:
	//						reject(new Error("Unknown error"))
	//						break;
	//				}
	//			})
	//		})
	//		
	//		request.on('error', error => {
	//			reject(new Error(error))
	//		})
	//		request.end()
	//	})
	//}

	/**
	 * @param  {string} id Get search data from id.
	 * @param  {int} limit Max limit of results.
	 * @param  {int} previewlines parameter can be used when later calls to /file/preview are intended in order to use the HTTP/2 Push mechanism.
	*/
	GetResult(id, limit, previewlines) {
        return new Promise((resolve, reject) => {
			const https = require('https')
			var options = {
				hostname: this.API_URL,
				port: 443,
				path: `/intelligent/search/result?id=${id}&limit=${limit}&previewlines=${previewlines}`,
				method: 'GET',
				headers: {
					'x-key': this.API_KEY
				}
			}
			const request = https.request(options, response => {
				response.on('data', d => {
					console.log(String(d))
					var json = JSON.parse(String(d))
					switch(json.status){
						case 0:
							//Success, search ID is valid
							resolve(json)
							break;
						case 1:
							reject(new Error("No future results available, stop trying. All results were delivered and the search is terminated.Note: Records may be returned with this status code."))
							break;
						case 2:
							reject(new Error("Search ID not found"))
							break;
						case 2:
							reject(new Error("No results yet available but keep trying."))
							break;
						default:
							reject(new Error("Unknown error"))
							break;
					}
				})
			})
			
			request.on('error', error => {
				reject(new Error(error))
			})
			request.end()
		})
	}

	/**
	 * @param  {string} query Search for query and return id.
	*/
	Search(query) {
        return new Promise((resolve, reject) => {
			var data = JSON.stringify({
				term: query,
				maxresults: 10,
				media: 0,
				sort: 2,
				terminate: []
			})

			const options = {
				hostname: this.API_URL,
				port: 443,
				path: '/intelligent/search',
				method: 'POST',
				headers: {
					'x-key': this.API_KEY
				}
			}
	
			const request = https.request(options, response => {
				response.on('data', d => {
					var json = JSON.parse(String(d))

					switch(json.status){
						case 0:
							this.GetResult(json.id) //resolve(json) 
							break;
						case 1:
							reject(new Error("Invalid search term"))
							break;
						case 2:
							reject(new Error("Error, max concurrent searches per API key"))
							break;
						default:
							reject(new Error("Unknown error"))
							break;
					}
				})
			})
	
			request.on('error', error => {
				console.log(error)
				reject(err)
			})
	
			request.write(data)
			request.end()
        })
	}
};

module.exports = IntelX
