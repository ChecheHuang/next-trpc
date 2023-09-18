import { router, publicProcedure } from '../trpc'
import prismadb from '@/lib/prismadb'

export const templatePhoneRouter = router({
  get: publicProcedure.query(async () => {
    const data = await prismadb.phone_template.groupBy({
      by: ['template_id', 'template_name', 'created_at'],
      _count: true,
      where: {
        valid: true,
      },
    })
    return data.map((item) => ({
      id: item.template_id,
      templateName: item.template_name,
      count: item._count,
      createdAt: item.created_at,
    }))
  }),
})
