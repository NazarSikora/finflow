import api from '../api'

export default function ExpenseList({ expenses, onDeleted }) {
  const handleDelete = async (id) => {
    if (!confirm('Видалити витрату?')) return
    try {
      await api.delete(`/expenses/${id}`)
      onDeleted()
    } catch {
      alert('Помилка видалення')
    }
  }

  if (expenses.length === 0) {
    return (
      <p className="text-center text-slate-500 py-8">
        Витрат поки немає. Додайте першу! 👆
      </p>
    )
  }

  return (
    <div className="space-y-2">
      {expenses.map((expense) => (
        <div
          key={expense.id}
          className="flex items-center justify-between bg-slate-800/50 hover:bg-slate-800 border border-slate-700/50 rounded-xl px-4 py-3 transition-all duration-200 group"
        >
          <div className="flex flex-col">
            <span className="font-medium text-slate-200">{expense.title}</span>
            <span className="text-xs text-slate-500 mt-0.5">
              {expense.category
                ? <span className="text-blue-400">{expense.category.name}</span>
                : <span>Без категорії</span>
              }
              {' '}• {new Date(expense.date).toLocaleDateString('uk-UA')}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="font-bold text-cyan-400">
              ₴{expense.amount.toFixed(2)}
            </span>
            <button
              onClick={() => handleDelete(expense.id)}
              className="text-slate-600 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100 text-sm"
            >
              ✕
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}