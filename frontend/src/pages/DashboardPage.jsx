import { useState, useEffect, useCallback } from 'react'
import api from '../api'
import ExpenseForm from '../components/ExpenseForm'
import ExpenseList from '../components/ExpenseList'
import CategoryForm from '../components/CategoryForm'
import ExpenseCharts from '../components/ExpenseCharts'

export default function DashboardPage() {
  const [expenses, setExpenses] = useState([])
  const [categories, setCategories] = useState([])
  const [filterCategory, setFilterCategory] = useState('')
  const [dateFrom, setDateFrom] = useState('')
  const [dateTo, setDateTo] = useState('')
  const [loading, setLoading] = useState(true)

  const fetchCategories = useCallback(async () => {
    const res = await api.get('/categories/')
    setCategories(res.data)
  }, [])

  const fetchExpenses = useCallback(async () => {
    setLoading(true)
    try {
      const params = {}
      if (filterCategory) params.category_id = filterCategory
      if (dateFrom) params.date_from = new Date(dateFrom).toISOString()
      if (dateTo) params.date_to = new Date(dateTo).toISOString()
      const res = await api.get('/expenses/', { params })
      setExpenses(res.data)
    } finally {
      setLoading(false)
    }
  }, [filterCategory, dateFrom, dateTo])

  useEffect(() => { fetchCategories() }, [fetchCategories])
  useEffect(() => { fetchExpenses() }, [fetchExpenses])

  const total = expenses.reduce((sum, e) => sum + e.amount, 0)

  const inputClass = "w-full bg-slate-800 border border-slate-700 text-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 transition-all placeholder-slate-500"
  const cardClass = "bg-slate-900 border border-slate-800 rounded-2xl p-6"

  return (
    <div className="min-h-screen bg-slate-950">
      <div className="max-w-3xl mx-auto px-4 py-8 space-y-5">

        {/* Загальна сума */}
        <div className="relative overflow-hidden rounded-2xl p-6 bg-gradient-to-br from-blue-600 to-cyan-600">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/50 to-cyan-600/50 backdrop-blur-sm" />
          <div className="relative flex justify-between items-center">
            <div>
              <p className="text-blue-100 text-sm font-medium">Загальні витрати</p>
              <p className="text-5xl font-bold text-white mt-1">
                ₴{total.toFixed(2)}
              </p>
              <p className="text-blue-200 text-xs mt-2">{expenses.length} транзакцій</p>
            </div>
            <div className="text-6xl opacity-80">💸</div>
          </div>
        </div>

        {/* Категорії */}
        <div className={cardClass}>
          <h2 className="text-slate-300 font-semibold mb-4 flex items-center gap-2">
            <span className="text-blue-400">🏷️</span> Категорії
          </h2>
          <CategoryForm onCreated={fetchCategories} />
          <div className="flex flex-wrap gap-2 mt-4">
            {categories.length === 0 && (
              <p className="text-slate-500 text-sm">Поки немає категорій</p>
            )}
            {categories.map((cat) => (
              <span
                key={cat.id}
                className="bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs px-3 py-1.5 rounded-full"
              >
                {cat.name}
              </span>
            ))}
          </div>
        </div>

        {/* Форма додавання витрати */}
        <div className={cardClass}>
          <h2 className="text-slate-300 font-semibold mb-4 flex items-center gap-2">
            <span className="text-cyan-400">➕</span> Нова витрата
          </h2>
          <ExpenseForm categories={categories} onCreated={fetchExpenses} />
        </div>

        {/* Фільтри */}
        <div className={cardClass}>
          <h2 className="text-slate-300 font-semibold mb-4 flex items-center gap-2">
            <span className="text-purple-400">🔍</span> Фільтри
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className={inputClass}
            >
              <option value="">Всі категорії</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
            <input
              type="date"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
              className={inputClass}
            />
            <input
              type="date"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
              className={inputClass}
            />
          </div>
        </div>

        {/* Список витрат */}
        <div className={cardClass}>
          <h2 className="text-slate-300 font-semibold mb-4 flex items-center gap-2">
            <span className="text-green-400">📋</span> Витрати
            <span className="text-blue-400 text-sm font-normal ml-1">({expenses.length})</span>
          </h2>
          {loading ? (
            <p className="text-center text-slate-500 py-8">Завантаження...</p>
          ) : (
            <ExpenseList expenses={expenses} onDeleted={fetchExpenses} />
          )}
        </div>

        {/* Графіки */}
        <div className={cardClass}>
          <h2 className="text-slate-300 font-semibold mb-4 flex items-center gap-2">
            <span className="text-yellow-400">📊</span> Аналітика
          </h2>
          <ExpenseCharts expenses={expenses} />
        </div>

      </div>
    </div>
  )
}