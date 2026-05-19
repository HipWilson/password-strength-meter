import { PasswordStrengthMeter } from './components/PasswordStrengthMeter'
import './App.css'

function App() {
  return (
    <main className="app-root">
      <div className="app-card">
        <h1 className="app-title">
          🔐 Password Strength
        </h1>
        <p className="app-subtitle">
          Crea una contraseña segura
        </p>
        <PasswordStrengthMeter />
      </div>
    </main>
  )
}

export default App
