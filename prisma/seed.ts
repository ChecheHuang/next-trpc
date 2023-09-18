import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

const reset = async () => {
  await prisma.admin.deleteMany()
  await prisma.campaign.deleteMany()
  await prisma.name_list.deleteMany()
  await prisma.phone_template.deleteMany()
  console.log('reset done')
}
const phoneTemplateSeed = async () => {
  await prisma.phone_template.createMany({
    data: [
      {
        template_id: '1',
        template_name: 'firstTemplate',
        name: 'firstName',
        phone: '0900000001',
      },
      {
        template_id: '1',
        template_name: 'firstTemplate',
        name: 'secondName',
        phone: '0900000002',
      },
      {
        template_id: '2',
        template_name: 'secondTemplate',
        name: 'thirdName',
        phone: '0900000003',
      },
    ],
  })
  console.log('phoneTemplateSeed done')
}

const adminSeed = async () => {
  console.log('adminSeed')
  const hashedPassword = await bcrypt.hash('password', 12)
  await prisma.admin.create({
    data: {
      name: 'name',
      password: hashedPassword,
    },
  })
  console.log('adminSeed done')
}

async function main() {
  console.log('Start seeding ...')
  await reset()
  await adminSeed()
  await phoneTemplateSeed()
  console.log('Seeding finished ...')
}

void main()
