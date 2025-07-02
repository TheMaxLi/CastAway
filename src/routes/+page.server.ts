import { db } from '$lib/server/db/index.js';
import { post } from '$lib/server/db/schema';
import { asc, desc } from 'drizzle-orm';

export const load = async ({ params }) => {
	return {
		post: (await db.select().from(post).limit(1).orderBy(desc(post.createdAt)))[0]
	};
};
