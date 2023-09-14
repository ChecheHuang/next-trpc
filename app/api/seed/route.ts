import { db } from '@/drizzle/db'
import { admin, phoneTemplate } from '@/drizzle/schema'
import bcrypt from 'bcrypt'

type NewPhoneTemplate = typeof phoneTemplate.$inferInsert

const phoneTemplateSeed: NewPhoneTemplate[] = [
  {
    templateId: '1',
    templateName: 'firstTemplate',
    name: 'firstPerson',
    phone: '0900000001',
  },
  {
    templateId: '1',
    templateName: 'firstTemplate',
    name: 'secondPerson',
    phone: '0900000002',
  },
  {
    templateId: '2',
    templateName: 'secondTemplate',
    name: 'thirdPerson',
    phone: '0900000003',
  },
]
const adminSeed = {
  name: 'name',
  password: await bcrypt.hash('password', 12),
}

export async function GET() {
  console.log('seed start....')
  await db.delete(admin)
  await db.delete(phoneTemplate)
  await db.insert(admin).values(adminSeed)
  await db.insert(phoneTemplate).values(phoneTemplateSeed)

  console.log('seed end....')

  return new Response('Ok')
}
