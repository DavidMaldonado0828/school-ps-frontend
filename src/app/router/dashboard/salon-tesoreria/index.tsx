import SalonTesoreriaPage from '@/pages/classroom/ClassroomPage'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/salon-tesoreria/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <SalonTesoreriaPage />
}
