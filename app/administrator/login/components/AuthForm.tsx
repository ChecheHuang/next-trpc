'use client'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

const FormSchema = z.object({
  name: z.string().min(1, '請輸入使用者名稱'),
  password: z.string().min(1, '請輸入密碼'),
})
function AuthForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: 'sunnygo',
      password: 'sunnygo',
    },
  })
  async function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data)
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex h-[285px] w-[300px] flex-col justify-around rounded-3xl bg-[#e1b8bf] p-4"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className=" font-bold">使用者</FormLabel>
              <FormControl>
                <Input
                  autoComplete="name"
                  placeholder="輸入使用者"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className=" font-bold">密碼</FormLabel>
              <FormControl>
                <Input
                  autoComplete="current-password"
                  type="password"
                  placeholder="輸入密碼"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button variant="secondary" className="w-full " type="submit">
          登入
        </Button>
      </form>
    </Form>
  )
}

export default AuthForm
