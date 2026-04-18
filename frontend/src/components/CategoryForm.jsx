import { useState } from 'react'
import api from '../api'

export default function CategoryForm({ onCreated }) {
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!name.trim()) return
    setLoading(true)
    try {
      await api.post('/categories/', { name })
      setName('')
      onCreated()
    } catch {
      alert('Помилка створення категорії')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="text"
        placeholder="Назва категорії"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="flex-1 bg-slate-800 border border-slate-700 text-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 transition-all placeholder-slate-500"
      />
      <button
        type="submit"
        disabled={loading}
        className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white px-4 py-2.5 rounded-xl text-sm font-medium transition-all disabled:opacity-50"
      >
        + Додати
      </button>
    </form>
  )
}