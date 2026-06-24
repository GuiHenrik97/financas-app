import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const CORES = ['#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899']

function GraficoGastos({ transacoes }) {
  const despesas = transacoes.filter((t) => t.tipo === 'despesa')

  const porCategoria = despesas.reduce((acc, t) => {
    const cat = t.categoria || 'Sem categoria'
    acc[cat] = (acc[cat] || 0) + t.valor
    return acc
  }, {})

  const dados = Object.entries(porCategoria).map(([name, value]) => ({
    name,
    value: parseFloat(value.toFixed(2)),
  }))

  if (dados.length === 0) return null

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4">
      <p className="text-sm text-gray-500 mb-4">Despesas por categoria</p>
      <ResponsiveContainer width="100%" height={240}>
        <PieChart>
          <Pie
            data={dados}
            cx="50%"
            cy="50%"
            outerRadius={80}
            dataKey="value"
            label={({ name, percent }) =>
              `${name} ${(percent * 100).toFixed(0)}%`
            }
          >
            {dados.map((_, index) => (
              <Cell key={index} fill={CORES[index % CORES.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value) => `R$ ${value.toFixed(2)}`} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}

export default GraficoGastos