# Finanças App

Aplicativo de controle financeiro pessoal. Registre receitas e despesas, acompanhe seu saldo e visualize suas transações organizadas por data.

## Tecnologias

- React + Vite
- Tailwind CSS
- Zustand
- Supabase (PostgreSQL)
- Vercel

## Arquitetura

### Nível 1 — Contexto

O usuário interage com o app via browser. O app se comunica com o Supabase para persistir os dados e é servido pelo Vercel.

### Nível 2 — Containers

- **Páginas React** — Dashboard com listagem e formulário de transações
- **Store Zustand** — estado global das transações em memória
- **Serviços (lib/supabase.js)** — cliente que se comunica com a API REST do Supabase
- **Supabase** — banco PostgreSQL com a tabela `transacoes`

## Como rodar localmente

```bash
git clone https://github.com/GuiHenrik97/financas-app.git
cd financas-app
npm install
cp .env.example .env
# preencha o .env com suas credenciais do Supabase
npm run dev
```

## Variáveis de ambiente

```
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
```

## Deploy

[financas-app-topaz-eta.vercel.app](https://financas-app-topaz-eta.vercel.app)
