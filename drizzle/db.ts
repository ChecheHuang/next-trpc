import { drizzle } from 'drizzle-orm/mysql2'
import { migrate } from 'drizzle-orm/mysql2/migrator'
import mysql from 'mysql2/promise'

// create the connection
const poolConnection = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  multipleStatements: true,
})

export const db = drizzle(poolConnection)
export async function main() {
  console.log('migration started....')
  await migrate(db, { migrationsFolder: 'drizzle/migration' })
  console.log('migration ended.....')
}
// main().catch((err) => console.log(err))
