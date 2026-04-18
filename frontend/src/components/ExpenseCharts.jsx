import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell, Legend,
} from 'recharts'

const COLORS = ['#3b82f6', '#06b6d4', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444', '#ec4899']

function getMonthlyData(expenses) {
  const map = {}
  expenses.forEach((e) => {
    const date = new Date(e.date)
    const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`
    const label = date.toLocaleString('uk-UA', { month: 'short', year: '2-digit' })
    if (!map[key]) map[key] = { key, label, total: 0 }
    map[key].total += e.amount
  })
  return Object.values(map)
    .sort((a, b) => a.key.localeCompare(b.key))
    .map((item) => ({ ...item, total: parseFloat(item.total.toFixed(2)) }))
}

function getCategoryData(expenses) {
  const map = {}
  expenses.forEach((e) => {
    const name = e.category ? e.category.name : 'Без категорії'
    if (!map[name]) map[name] = { name, total: 0 }
    map[name].total += e.amount
  })
  return Object.values(map).map((item) => ({
    ...item,
    total: parseFloat(item.total.toFixed(2)),
  }))
}

const darkTooltip = {
  contentStyle: {
    backgroundColor: '#1e293b',
    border: '1px solid #334155',
    borderRadius: '12px',
    fontSize: '13px',
    color: '#e2e8f0',
  },
}

export default function ExpenseCharts({ expenses }) {
  if (expenses.length === 0) {
    return (
      <p className="text-center text-slate-500 py-8">
        Додайте витрати щоб побачити графіки 📊
      </p>
    )
  }

  const monthlyData = getMonthlyData(expenses)
  const categoryData = getCategoryData(expenses)

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-slate-400 text-xs font-medium uppercase tracking-wider mb-4">
          Витрати по місяцях
        </h3>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={monthlyData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
            <XAxis dataKey="label" tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} />
            <YAxis tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} />
            <Tooltip {...darkTooltip} formatter={(v) => [`₴${v}`, 'Сума']} />
            <Bar dataKey="total" radius={[8, 8, 0, 0]}>
              {monthlyData.map((_, i) => (
                <Cell key={i} fill={i % 2 === 0 ? '#3b82f6' : '#06b6d4'} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div>
        <h3 className="text-slate-400 text-xs font-medium uppercase tracking-wider mb-4">
          Витрати по категоріях
        </h3>
        <ResponsiveContainer width="100%" height={260}>
          <PieChart>
            <Pie
              data={categoryData}
              dataKey="total"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={90}
              innerRadius={40}
              paddingAngle={3}
            >
              {categoryData.map((_, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip {...darkTooltip} formatter={(v) => [`₴${v}`, 'Сума']} />
            <Legend
              formatter={(value) => (
                <span style={{ color: '#94a3b8', fontSize: '12px' }}>{value}</span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}