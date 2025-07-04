import { zodResolver } from '@hookform/resolvers/zod'

export const createResolver = (schema: any) => {
  return {
    resolver: zodResolver(schema),
    mode: 'onChange',
  }
}