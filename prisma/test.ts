import { PrismaClient } from '@prisma/client'

const db = new PrismaClient()

async function main() {
  const test = await db.phone_template.groupBy({
    by: ['template_id', 'template_name', 'created_at'],
    _count: true,
    where: {
      valid: true,
    },
  })
  console.log(test)
}

void main()
