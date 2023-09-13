import { db } from '@/drizzle/db'
import { admin } from '@/drizzle/schema'
import bcrypt from 'bcrypt'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const { name = 'name', password = 'password' } = await req.json()
  const hashedPassword = await bcrypt.hash(password as string, 12)

  const [result] = await db.insert(admin).values({
    name,
    password: hashedPassword,
  })
  return NextResponse.json(result.insertId)
}
