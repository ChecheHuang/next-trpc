'use client'

import { ColumnDef } from '@tanstack/react-table'

export type TemplatePhoneColumn = {
  id: string
  templateName: string
  count: number
  createdAt: Date
}

export const columns: ColumnDef<TemplatePhoneColumn>[] = [
  {
    accessorKey: 'templateName',
    header: '電話簿名稱',
  },
  {
    accessorKey: 'count',
    header: '電話數量',
  },
  {
    accessorKey: 'createdAt',
    header: '日期',
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      console.log(row)
      return <></>
    },
  },
]
