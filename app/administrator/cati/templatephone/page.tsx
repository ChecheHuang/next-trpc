import TemplatePhoneClient from './components/TemplatePhoneClient'
import trpcServer from '@/lib/_trpc/trpcServer'

// export const dynamic = 'force-dynamic'
const TemplatePhone = async () => {
  const data = await trpcServer.templatePhoneRouter.get()
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <TemplatePhoneClient data={data} />
      </div>
    </div>
  )
}

export default TemplatePhone
