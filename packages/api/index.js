let connections = [];

setInterval(() => {
	let random = Math.random();
	connections.forEach(({ response }) => response.write(`data: ${random}\n\n`));
}, 1000)

export default (request, response) => {
	const headers = {
		'Content-Type': 'text/event-stream',
		'Connection': 'keep-alive',
		'Cache-Control': 'no-cache'
	};
	response.writeHead(200, headers);

	const id = Date.now();
	
	const client = { id, response };

	connections.push(client);

	request.on('close', () => {
		connections = connections.filter(client => client.id !== id);
	});
}
