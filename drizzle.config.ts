import * as dotenv from 'dotenv'
import type { Config } from 'drizzle-kit'

dotenv.config()
console.log(process.env.DB_URL)

export default {
  schema: './drizzle/schema/*',
  out: './drizzle/migration',
  driver: 'mysql2',
  dbCredentials: {
    connectionString: process.env.DB_URL as string,
  },
} satisfies Config
