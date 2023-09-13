import { db } from '@/drizzle/db'
import { admin } from '@/drizzle/schema/admin'
import { DrizzleAdapter } from '@auth/drizzle-adapter'
import bcrypt from 'bcrypt'
import { eq } from 'drizzle-orm'
import { AuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'

export const authOptions: AuthOptions = {
  adapter: DrizzleAdapter(db),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        name: { label: 'name', type: 'text' },
        password: { label: 'password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.name || !credentials?.password) {
          throw new Error('Invalid credentials')
        }
        const [user] = await db
          .select()
          .from(admin)
          .where(eq(admin.name, credentials.name))
          .limit(1)

        if (!user || !user?.password) {
          throw new Error('Invalid credentials')
        }

        const isCorrectPassword = await bcrypt.compare(
          credentials.password,
          user.password,
        )

        if (!isCorrectPassword) {
          throw new Error('Invalid credentials')
        }
        return {
          id: user.id.toString(),
          name: user.name,
          password: user.password,
        }
      },
    }),
  ],
  debug: process.env.NODE_ENV === 'development',
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
}
