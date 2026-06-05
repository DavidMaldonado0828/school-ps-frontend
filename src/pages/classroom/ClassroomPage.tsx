import { SearchSection } from '@/features/classroom/components/SearchSection'

export default function SalonTesoreriaPage() {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-1">Salón Tesorería</h1>
      <p className="text-gray-500 mb-6">Control del mobiliario asignado</p>
      <SearchSection />
    </div>
  )
}