import { sqliteTable, text, integer, blob } from 'drizzle-orm/sqlite-core'

export const programs = sqliteTable('programs', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    name: text('name').notNull(),
    description: text('description').notNull(),
    link: text('link').notNull(),
    commissionRate: text('commissionRate').notNull(),
    visitorNumber: integer('visitorNumber').default(0),
    categories: blob({ mode: 'json' }).$type<string[]>(),
    isListed: integer({ mode: 'boolean' }).default(false),
    email: text('email').notNull(),
    createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
})
