import { useEffect } from 'react'
import useFinancas from '../store/financas'
import { supabase } from '../lib/supabase'
import CardTransacao from '../components/CardTransacao'
import FormTransacao from '../components/FormTransacao'

function Dashboard() {
  const { transacoes, setTransacoes, adicionarTransacao, removerTransacao } = useFinancas()

  const saldo = transacoes.reduce((acc, t) => {
    return t.tipo === 'receita' ? acc + t.valor : acc - t.valor
  }, 0)

  useEffect(() => {
    async function buscarTransacoes() {
      const { data } = await supabase
        .from('transacoes')
        .select('*')
        .order('created_at', { ascending: false })

      if (data) setTransacoes(data)
    }

    buscarTransacoes()
  }, [])

  async function handleAdicionar(transacao) {
    const { data } = await supabase
      .from('transacoes')
      .insert([transacao])
      .select()
      .single()

    if (data) adicionarTransacao(data)
  }

  async function handleRemover(id) {
    await supabase.from('transacoes').delete().eq('id', id)
    removerTransacao(id)
  }

  return (
    <div className="max-w-2xl mx-auto py-8 px-4 flex flex-col gap-6">
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <p className="text-sm text-gray-500">Saldo atual</p>
        <p className={`text-3xl font-medium mt-1 ${saldo >= 0 ? 'text-green-600' : 'text-red-500'}`}>
          R$ {saldo.toFixed(2)}
        </p>
      </div>

      <FormTransacao onAdicionar={handleAdicionar} />

      <div className="flex flex-col gap-3">
        {transacoes.length === 0 && (
          <p className="text-center text-gray-400 text-sm py-8">
            Nenhuma transação ainda.
          </p>
        )}
        {transacoes.map((t) => (
          <CardTransacao
            key={t.id}
            descricao={t.descricao}
            valor={t.valor}
            tipo={t.tipo}
            categoria={t.categoria}
            onRemover={() => handleRemover(t.id)}
          />
        ))}
      </div>
    </div>
  )
}

export default Dashboard