import { NextApiResponseServerIo } from '@/types/io'
import { NextApiRequest } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponseServerIo,
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    res?.socket?.server?.io?.emit('message', 'this is socket message')

    return res.status(200).json('message')
  } catch (error) {
    console.log('[MESSAGES_POST]', error)
    return res.status(500).json({ message: 'Internal Error' })
  }
}
