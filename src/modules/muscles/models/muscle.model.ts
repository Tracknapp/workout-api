import { z } from '@hono/zod-openapi'
export const MuscleModel = z.object({
  name: z.string()
})
