# IntelligenceX
A api to find leaked databases and more, this project is work in progress and might be buggy

## Installation
Npm install:
```console
npm i intelligencex
```

## ⚠ Information for developers
You must comply with the following rules:

* Commercial use requires a paid license.
* 1 user = 1 API key. Do not ship your product with a shared API key as it will lead to problems down the road in case of revocation.
* No bypassing of the limitations imposed by the API (including the daily credits, and bucket access restrictions).
* Your application must self-identify via User Agent.

## Example

```js
const IntelX = require('IntelligenceX')

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

```

## Contributing

Found a bug or problem? File an issue or submit a pull request with the fix.
