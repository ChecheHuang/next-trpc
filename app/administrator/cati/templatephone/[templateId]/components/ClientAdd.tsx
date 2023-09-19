'use client'

import { ColType } from '../page'
import { columns } from './columns'
import { Button } from '@/components/ui/button'
import { DataTable } from '@/components/ui/data-table'
import { Input } from '@/components/ui/input'
import trpcClient from '@/lib/_trpc/trpcClient'
import React, { useState } from 'react'

interface ClientAddProps {
  template_id: string
  template_name: string
  data: ColType
}

function ClientAdd({ template_id, template_name, data }: ClientAddProps) {
  const [name, setName] = useState('name')
  const [phone, setPhone] = useState('0999999999')

  const getData = trpcClient.templatePhoneRouter.getById.useQuery(template_id, {
    initialData: data,
    refetchOnMount: false,
    refetchOnReconnect: false,
  })

  const add = trpcClient.templatePhoneRouter.create.useMutation({
    onSettled: () => {
      void getData.refetch()
    },
  })

  const handleAdd = async () => {
    const data = { template_id, template_name, name, phone }
    add.mutate(data)
  }

  return (
    <>
      <div className="mb-2 flex gap-3">
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="name"
          className="w-40"
        />
        <Input
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="phone"
          className="w-40"
        />
        <Button onClick={handleAdd}>新增</Button>
      </div>
      <DataTable searchKey="name" columns={columns} data={getData.data} />
    </>
  )
}

export default ClientAdd
