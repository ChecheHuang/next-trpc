import { router, publicProcedure } from '../trpc'
import prismadb from '@/lib/prismadb'
import { z } from 'zod'

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
  getById: publicProcedure.input(z.string()).query(async ({ input }) => {
    console.log('query')
    const data = await prismadb.phone_template.findMany({
      where: {
        template_id: input,
      },
    })
    return data
  }),
  create: publicProcedure
    .input(
      z.object({
        template_id: z.string(),
        template_name: z.string(),
        name: z.string(),
        phone: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      console.log(input)
      console.log('新增')
      await prismadb.phone_template.create({
        data: input,
      })
      return true
    }),
})
