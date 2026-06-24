import Dashboard from './pages/Dashboard'

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white border-b border-gray-200 px-4 py-3">
        <h1 className="font-medium text-gray-800">Finanças App</h1>
      </header>
      <main>
        <Dashboard />
      </main>
    </div>
  )
}

export default App