import { useState } from 'react'

function FormTransacao({ onAdicionar }) {
  const [descricao, setDescricao] = useState('')
  const [valor, setValor] = useState('')
  const [tipo, setTipo] = useState('despesa')
  const [categoria, setCategoria] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    if (!descricao || !valor) return

    onAdicionar({
      descricao,
      valor: parseFloat(valor),
      tipo,
      categoria,
      data: new Date().toISOString().split('T')[0],
    })

    setDescricao('')
    setValor('')
    setCategoria('')
    setTipo('despesa')
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4">
      <h2 className="font-medium text-gray-800 mb-4">Nova transação</h2>
      <div className="flex flex-col gap-3">
        <input
          type="text"
          placeholder="Descrição"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-gray-400"
        />
        <input
          type="number"
          placeholder="Valor"
          value={valor}
          onChange={(e) => setValor(e.target.value)}
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-gray-400"
        />
        <input
          type="text"
          placeholder="Categoria"
          value={categoria}
          onChange={(e) => setCategoria(e.target.value)}
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-gray-400"
        />
        <select
          value={tipo}
          onChange={(e) => setTipo(e.target.value)}
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-gray-400"
        >
          <option value="despesa">Despesa</option>
          <option value="receita">Receita</option>
        </select>
        <button
          onClick={handleSubmit}
          className="bg-gray-800 text-white rounded-lg py-2 text-sm hover:bg-gray-700"
        >
          Adicionar
        </button>
      </div>
    </div>
  )
}

export default FormTransacao