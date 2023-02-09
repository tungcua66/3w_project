import dotenv from 'dotenv';

(async () => {
	dotenv.config();

	const start = (await import('./server.js')).default;

	start();
})();
