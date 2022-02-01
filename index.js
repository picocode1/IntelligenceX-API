const IntelX = require('./IntelligenceX')
//NPM VERSION const IntelX = require('IntelligenceX')

const api = new IntelX(YOUR_API_KEY);

//Work in progress
// api.Preview()

api.GetResult("*****-2f13-4e65-a3c9-3d1eed013dbf", 10, 8).then((id) => {
	console.log(id);
}).catch(error => {
	console.log(error)
});

api.Search("email@example.com").then((records) => {
	console.log(records);
}).catch(error => {
	console.log(error)
});
