import { sqliteTable, integer, text } from 'drizzle-orm/sqlite-core';

export const post = sqliteTable('post', {
	id: integer('id').primaryKey({ autoIncrement: true }),
	image: text(),
	createdAt: integer({ mode: 'timestamp' }).default(new Date()),
	postedBy: text({ enum: ['max_monkey', 'tina_monkey'] })
	// location: text()
});
