import { z } from '@hono/zod-openapi'
export const EquipmentModel = z.object({
  name: z.string()
})
