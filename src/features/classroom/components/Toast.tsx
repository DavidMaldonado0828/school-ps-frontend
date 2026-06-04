import { useEffect } from 'react'

interface ToastProps {
  mensaje: string
  onCerrar: () => void
}

export function Toast({ mensaje, onCerrar }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onCerrar()
    }, 3000)
    return () => clearTimeout(timer)
  }, [onCerrar])

  return (
    <div className="fixed bottom-6 right-6 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2">
      ✅ {mensaje}
    </div>
  )
}