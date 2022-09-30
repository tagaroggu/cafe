import serve from 'serve-handler';
import api from './packages/api/index.js';
import http from 'http';

http.createServer((request, response) => {
	const url = new URL(request.url, 'http://0.0.0.0:3000');

	if (url.pathname === '/api') {
		api(request, response);
	} else {
		serve(request, response, { public: './packages/ui/dist' });
	}
}).listen(3000);
console.log('listening on 3000');
