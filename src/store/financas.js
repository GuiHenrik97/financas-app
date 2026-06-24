import { create } from 'zustand'

const useFinancas = create((set) => ({
  transacoes: [],

  setTransacoes: (transacoes) => set({ transacoes }),

  adicionarTransacao: (transacao) =>
    set((state) => ({
      transacoes: [transacao, ...state.transacoes],
    })),

  removerTransacao: (id) =>
    set((state) => ({
      transacoes: state.transacoes.filter((t) => t.id !== id),
    })),
}))

export default useFinancas