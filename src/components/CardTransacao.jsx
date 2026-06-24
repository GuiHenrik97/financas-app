function CardTransacao({ descricao, valor, tipo, categoria, onRemover }) {
  const isReceita = tipo === 'receita'

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
        <button
          onClick={onRemover}
          className="text-gray-400 hover:text-red-500 text-sm"
        >
          remover
        </button>
      </div>
    </div>
  )
}

export default CardTransacao