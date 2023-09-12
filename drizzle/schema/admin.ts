import { mysqlTable, int, varchar } from 'drizzle-orm/mysql-core'

export const admin = mysqlTable('admin', {
  id: int('id').autoincrement().primaryKey(),
  name: varchar('name', { length: 256 }).notNull(),
  password: varchar('password', { length: 256 }).notNull(),
})
