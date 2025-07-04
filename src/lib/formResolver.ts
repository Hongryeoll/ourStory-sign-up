import { zodResolver } from '@hookform/resolvers/zod'
import { ZodTypeAny } from 'zod'

export const createResolver = (schema: ZodTypeAny) => {
  return {
    resolver: zodResolver(schema),
    mode: 'onChange',
  }
}