import { useState } from 'react'
import { supabase } from '../lib/supabase'
import useFinancas from '../store/financas'

function CardTransacao({ id, descricao, valor, tipo, categoria, onRemover }) {
  const [editando, setEditando] = useState(false)
  const [novaDescricao, setNovaDescricao] = useState(descricao)
  const [novoValor, setNovoValor] = useState(valor)
  const [novaCategoria, setNovaCategoria] = useState(categoria || '')
  const { transacoes, setTransacoes } = useFinancas()

  const isReceita = tipo === 'receita'

  async function handleSalvar() {
    const { data } = await supabase
      .from('transacoes')
      .update({ descricao: novaDescricao, valor: parseFloat(novoValor), categoria: novaCategoria })
      .eq('id', id)
      .select()
      .single()

    if (data) {
      setTransacoes(transacoes.map((t) => (t.id === id ? data : t)))
      setEditando(false)
    }
  }

  if (editando) {
    return (
      <div className="flex flex-col gap-2 p-4 bg-white rounded-lg border border-gray-200">
        <input
          type="text"
          value={novaDescricao}
          onChange={(e) => setNovaDescricao(e.target.value)}
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-gray-400"
        />
        <input
          type="number"
          value={novoValor}
          onChange={(e) => setNovoValor(e.target.value)}
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-gray-400"
        />
        <input
          type="text"
          value={novaCategoria}
          onChange={(e) => setNovaCategoria(e.target.value)}
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-gray-400"
        />
        <div className="flex gap-2">
          <button onClick={handleSalvar} className="flex-1 bg-gray-800 text-white rounded-lg py-2 text-sm hover:bg-gray-700">
            Salvar
          </button>
          <button onClick={() => setEditando(false)} className="flex-1 border border-gray-200 rounded-lg py-2 text-sm text-gray-600 hover:bg-gray-50">
            Cancelar
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200">
      <div>
        <p className="font-medium text-gray-800">{descricao}</p>
        <p className="text-sm text-gray-500">{categoria}</p>
      </div>
      <div className="flex items-center gap-4">
        <span className={isReceita ? 'text-green-600 font-medium' : 'text-red-500 font-medium'}>
          {isReceita ? '+' : '-'} R$ {Math.abs(valor).toFixed(2)}
        </span>
        <button onClick={() => setEditando(true)} className="text-gray-400 hover:text-gray-600 text-sm">
          editar
        </button>
        <button onClick={onRemover} className="text-gray-400 hover:text-red-500 text-sm">
          remover
        </button>
      </div>
    </div>
  )
}

export default CardTransacao