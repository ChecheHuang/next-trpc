import ClientAdd from './components/ClientAdd'
import trpcServer from '@/lib/_trpc/trpcServer'
import React from 'react'

export const dynamic = 'force-dynamic'

export type ColType = Awaited<
  ReturnType<(typeof trpcServer)['templatePhoneRouter']['getById']['query']>
>

interface TemplatePhoneByIdPageProps {
  params: {
    templateId: string
  }
}
async function TemplatePhoneByIdPage({
  params: { templateId },
}: TemplatePhoneByIdPageProps) {
  const data = await trpcServer.templatePhoneRouter.getById.query(templateId)
  return (
    <div>
      <ClientAdd
        template_id={data[0].template_id}
        template_name={data[0].template_name}
        data={data}
      />
    </div>
  )
}

export default TemplatePhoneByIdPage
