import axios from 'axios';

type Names = {
	objectId: string;
	Name: string;
	Gender: string;
	createdAt: string;
	updatedAt: string;
};

async function getNames() {
	const options = {
		method: 'GET',
		url: 'https://parseapi.back4app.com/classes/Listofnames_Complete_List_Names?limit=250000&order=Name',
		headers: {
			'X-Parse-Application-Id': '3QRJb7iT27Uq1hZThbCDKokEceDOdC3594MqPMXk',
			'X-Parse-REST-API-Key': 'Kbp55XnxPNrRS9qztffa6RJAxdJ1EQPlCW1kqwrU',
		},
	};

	return axios
		.request(options)
		.then(({data}: {data: {results: Names[]}}) => {
			if (Array.isArray(data.results)) {
				const namesArray = data.results.map((item: Names) => item.Name);
				return namesArray; // Return the array of names
			}

			throw new Error('Data results is not an array.');
		})
		.catch((error: any) => {
			console.error(error);
			throw error; // Rethrow the error to propagate it to the caller
		});
}

function removeDuplicateNames(names: any) {
	const encounteredNames = new Map();
	const uniqueNames = [];

	for (const name of names) {
	  if (!encounteredNames.has(name)) {
			encounteredNames.set(name, true);
			uniqueNames.push(name);
	  }
	}

	return uniqueNames;
}

async function main() {
	try {
		const namesFromApi = await getNames();
		const uniqueNames = removeDuplicateNames(namesFromApi);
		console.log('Names list:', uniqueNames);
	} catch (error) {
		console.error('Error:', error);
	}
}

main();
