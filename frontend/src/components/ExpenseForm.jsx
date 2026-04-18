import { useState } from 'react'
import api from '../api'

export default function ExpenseForm({ categories, onCreated }) {
  const [title, setTitle] = useState('')
  const [amount, setAmount] = useState('')
  const [categoryId, setCategoryId] = useState('')
  const [date, setDate] = useState('')
  const [loading, setLoading] = useState(false)

  const inputClass = "bg-slate-800 border border-slate-700 text-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 transition-all placeholder-slate-500 w-full"

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!title.trim() || !amount) return
    setLoading(true)
    try {
      await api.post('/expenses/', {
        title,
        amount: parseFloat(amount),
        category_id: categoryId ? parseInt(categoryId) : null,
        date: date ? new Date(date).toISOString() : null,
      })
      setTitle('')
      setAmount('')
      setCategoryId('')
      setDate('')
      onCreated()
    } catch {
      alert('Помилка створення витрати')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      <input
        type="text"
        placeholder="Назва витрати"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className={inputClass}
        required
      />
      <input
        type="number"
        placeholder="Сума (₴)"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className={inputClass}
        required
        min="0"
        step="0.01"
      />
      <select
        value={categoryId}
        onChange={(e) => setCategoryId(e.target.value)}
        className={inputClass}
      >
        <option value="">Без категорії</option>
        {categories.map((cat) => (
          <option key={cat.id} value={cat.id}>{cat.name}</option>
        ))}
      </select>
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className={inputClass}
      />
      <button
        type="submit"
        disabled={loading}
        className="sm:col-span-2 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white py-2.5 rounded-xl text-sm font-medium transition-all disabled:opacity-50"
      >
        {loading ? 'Збереження...' : '+ Додати витрату'}
      </button>
    </form>
  )
}