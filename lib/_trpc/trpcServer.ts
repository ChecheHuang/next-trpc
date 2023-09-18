import { appRouter } from '@/server'
import { httpBatchLink } from '@trpc/client'

const trpcServer = appRouter.createCaller({
  links: [
    httpBatchLink({
      url: 'http://localhost:3000/api/trpc',
    }),
  ],
})
export default trpcServer
