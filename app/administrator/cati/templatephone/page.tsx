import TemplatePhoneClient from './components/TemplatePhoneClient'
import { db } from '@/drizzle/db'
import { phoneTemplate } from '@/drizzle/schema'
import { eq, sql } from 'drizzle-orm'

const getData = async () => {
  const data = await db
    .select({
      id: phoneTemplate.templateId,
      templateName: phoneTemplate.templateName,
      count: sql<number>`count(*)`,
      createdAt: sql<Date>`min(${phoneTemplate.createdAt})`,
    })
    .from(phoneTemplate)
    .where(eq(phoneTemplate.isValid, true))
    .groupBy(phoneTemplate.templateId)
    .orderBy(phoneTemplate.templateId)

  return data
}

const TemplatePhone = async () => {
  const data = await getData()

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <TemplatePhoneClient data={data} />
      </div>
    </div>
  )
}

export default TemplatePhone
