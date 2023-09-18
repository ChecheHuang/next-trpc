import { templatePhoneRouter } from './templatePhone/index'
import { router } from './trpc'

export const appRouter = router({
  templatePhoneRouter,
})

export type AppRouter = typeof appRouter
