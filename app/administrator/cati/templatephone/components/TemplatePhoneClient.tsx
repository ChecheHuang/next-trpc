'use client'

import { columns, TemplatePhoneColumn } from './columns'
import { Button } from '@/components/ui/button'
import { DataTable } from '@/components/ui/data-table'
import { Heading } from '@/components/ui/heading'
import { Separator } from '@/components/ui/separator'
import trpcClient from '@/lib/_trpc/trpcClient'
import trpcServer from '@/lib/_trpc/trpcServer'
import { Plus } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface TemplatePhoneClientProps {
  data: Awaited<ReturnType<(typeof trpcServer)['templatePhoneRouter']['get']>>
}

const TemplatePhoneClient: React.FC<TemplatePhoneClientProps> = ({ data }) => {
  const router = useRouter()

  const { data: templatePhoneData } =
    trpcClient.templatePhoneRouter.get.useQuery(undefined, {
      initialData: data,
      refetchOnMount: false,
      refetchOnReconnect: false,
    })
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title="電話簿管理" description="Manage your phone book" />
        <Button
          onClick={() => router.push(`/administrator/cati/templatephone/new`)}
        >
          <Plus className="mr-2 h-4 w-4" /> 新增電話簿
        </Button>
      </div>
      <Separator />
      <DataTable
        searchKey="templateName"
        columns={columns}
        data={templatePhoneData}
      />
    </>
  )
}

export default TemplatePhoneClient
