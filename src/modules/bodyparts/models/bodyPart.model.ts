import { z } from '@hono/zod-openapi'
export const BodyPartModel = z.object({
  name: z.string()
})
