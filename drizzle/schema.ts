import { sql } from 'drizzle-orm'
import {
  mysqlTable,
  int,
  varchar,
  datetime,
  boolean,
  json,
  index,
} from 'drizzle-orm/mysql-core'

export const admin = mysqlTable('admin', {
  id: int('id').autoincrement().primaryKey(),
  name: varchar('name', { length: 256 }).notNull(),
  password: varchar('password', { length: 256 }).notNull(),
  createdAt: datetime('created_at').default(sql`CURRENT_TIMESTAMP`),
  updatedAt: datetime('updated_at').default(sql`CURRENT_TIMESTAMP`),
})

export const campaign = mysqlTable('campaign', {
  id: int('id').autoincrement().primaryKey(),
  code: varchar('code', { length: 256 }).unique(),
  name: varchar('name', { length: 256 }),
  questions: json('questions'),
  sort: int('sort'),
  beginDate: datetime('begin_date'),
  endDate: datetime('end_date'),
  createdAt: datetime('created_at').default(sql`CURRENT_TIMESTAMP`),
  updatedAt: datetime('updated_at').default(sql`CURRENT_TIMESTAMP`),
})

export const nameList = mysqlTable(
  'name_list',
  {
    id: int('id').autoincrement().primaryKey(),
    campaignId: int('campaign_id')
      .notNull()
      .references(() => campaign.id),
    phoneTemplateId: int('phone_template_id')
      .notNull()
      .references(() => phoneTemplate.id),
    name: varchar('name', { length: 256 }),
    phone: varchar('phone', { length: 256 }),
    agent: varchar('agent', { length: 256 }),
    answers: json('answers'),
    reserveDate: datetime('reserve_date'),
    createdAt: datetime('created_at').default(sql`CURRENT_TIMESTAMP`),
    updatedAt: datetime('updated_at').default(sql`CURRENT_TIMESTAMP`),
  },
  (table) => {
    return {
      campaignIdIndex: index('campaign_id_index').on(table.campaignId),
      phoneTemplateIdIndex: index('phone_template_id_index').on(
        table.phoneTemplateId,
      ),
    }
  },
)
export const phoneTemplate = mysqlTable('phone_template', {
  id: int('id').autoincrement().primaryKey(),
  templateId: varchar('template_id', { length: 256 }).notNull(),
  templateName: varchar('template_name', { length: 256 }).notNull(),
  name: varchar('name', { length: 256 }).notNull(),
  phone: varchar('phone', { length: 256 }).notNull(),
  isValid: boolean('is_valid').default(true),

  createdAt: datetime('created_at').default(sql`CURRENT_TIMESTAMP`),
  updatedAt: datetime('updated_at').default(sql`CURRENT_TIMESTAMP`),
})
