'use client'

import { columns } from './columns'
import { Button } from '@/components/ui/button'
import { DataTable } from '@/components/ui/data-table'
import { Heading } from '@/components/ui/heading'
import { Separator } from '@/components/ui/separator'
import trpcClient from '@/lib/_trpc/trpcClient'
import trpcServer from '@/lib/_trpc/trpcServer'
import { Plus } from 'lucide-react'
import { useRouter } from 'next/navigation'

type TemplatePhoneColumn = Awaited<
  ReturnType<(typeof trpcServer)['templatePhoneRouter']['get']['query']>
>

interface TemplatePhoneClientProps {
  data: TemplatePhoneColumn
}

const TemplatePhoneClient: React.FC<TemplatePhoneClientProps> = ({ data }) => {
  const router = useRouter()

  const gettemplatePhoneData = trpcClient.templatePhoneRouter.get.useQuery(
    undefined,
    {
      queryKey: ['templatePhoneRouter.get', undefined],
      initialData: data,
      refetchOnMount: false,
      refetchOnReconnect: false,
    },
  )
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
        data={gettemplatePhoneData.data}
      />
    </>
  )
}

export default TemplatePhoneClient
