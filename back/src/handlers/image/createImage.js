import Boom from '@hapi/boom';
import { readFileSync } from 'fs';
import Image from '../../model/Image.js';

export default async (request) => {
	try {
		const image = await Image.create({
			name: request.payload.image.filename,
			img: {
				data: readFileSync(request.payload.image.path),
				contentType: request.payload.image.headers['content-type'],
			},
		});
		return image;
	} catch (error) {
		return Boom.badRequest(error.message);
	}
};
