function uploadFile(client, folderId) {
	const filePath = '/Users/jss7/git/boxsamples/ex1/content/screen1.png';
	const fileName = 'screen4.png';

	const stream = fs.createReadStream(filePath);

	client.files.uploadFile(
		folderId,
		fileName,
		stream,
		uploadedFileCallback);
}

function callback(err, res) {
	console.log(err);
	console.log(res);
}

function createdUserCallback(err, res) {
	console.log(err);
	console.log('Created user id is: '+res['id']);
}

function uploadedFileCallback(err, res) {
	console.log(err);
	console.log(res);
	console.log("Uploaded file id: "+res['entries'][0]['id'])
}

function folderCreateCallback(err, res) {
	//console.log(err);
	//console.log(res);
	console.log('Created folder id is: '+res['id']);
}

function createFolder(client) {
	const folderName = 'metadataTest6';
	const folderId = '0';

	client.folders.create(folderId, folderName, folderCreateCallback);
}

function createUser(client) {
	// Set app user details
	const userName = 'box-metadata-user';
	const spaceAmount = 1073741824;

	// Create app user
	adminClient.enterprise.addAppUser(
	  userName, 
	  {
	    space_amount: spaceAmount
	  },
	  createdUserCallback
	);
}

const boxSDK = require('box-node-sdk');  // Box SDK
const fs = require('fs');                // File system for config

// Fetch config file for instantiating SDK instance
const configJSON = JSON.parse(fs.readFileSync('key.json'));

// Instantiate instance of SDK using generated JSON config
const sdk = boxSDK.getPreconfiguredInstance(configJSON);

const adminClient = sdk.getAppAuthClient('enterprise', configJSON.enterpriseId);

//createFolder(adminClient);

//const createdFolder = '88880948343';
//uploadFile(adminClient, createdFolder);

//createUser(adminClient);

const userId = '10197389804';

adminClient.users.get(userId)
	.then(currentUser => {
		console.log(currentUser);
	})

const appUserClient = sdk.getAppAuthClient('user', userId);

console.log(appUserClient);

/*var stream = fs.createReadStream('/Users/jss7/git/boxsamples/ex1/content/screen1.png');
var folderID = "0";
appUserClient.files.uploadFile(folderID, 'test.png', stream)
	.then(file => {
		console.log(file);
	});
*/
//createFolder(appUserClient)
uploadFile(appUserClient, '88886366513');

/*sdk.getAppUserTokens(userId)
	.then((userTokenObject) => {
		conosle.log(userTokenObject);
	});*/



