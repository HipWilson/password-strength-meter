import { useState } from 'react'
import { calculateStrength, strengthToPercent, type Strength } from '../utils/calculateStrength'

const strengthColors: Record<Strength, string> = {
  'vacía':     '#64748b',
  'débil':     '#ef4444',
  'media':     '#f97316',
  'fuerte':    '#22c55e',
  'muy fuerte':'#10b981',
}

const strengthLabels: Record<Strength, string> = {
  'vacía':     'Fortaleza: sin contraseña',
  'débil':     'Nivel: débil',
  'media':     'Nivel: media',
  'fuerte':    'Nivel: fuerte',
  'muy fuerte':'Nivel: muy fuerte',
}

export function PasswordStrengthMeter() {
  const [password, setPassword] = useState('')

  const strength = calculateStrength(password)
  const percent  = strengthToPercent(strength)
  const color    = strengthColors[strength]

  return (
    <div className="psm-wrapper">
      <label htmlFor="password-input" className="psm-label">
        Contraseña
      </label>

      <input
        id="password-input"
        type="password"
        className="psm-input"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Escribe tu clave…"
        autoComplete="new-password"
        aria-describedby="strength-status"
      />

      {/* Barra de progreso accesible */}
      <div
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={percent}
        aria-label={strengthLabels[strength]}
        className="psm-bar-track"
      >
        <div
          className="psm-bar-fill"
          style={{
            width: `${percent}%`,
            backgroundColor: color,
          }}
        />
      </div>

      {/* Indicador textual */}
      <p id="strength-status" className="psm-status" style={{ color }}>
        {strength}
      </p>

      <ul className="psm-hints" aria-label="Requisitos de contraseña">
        <li data-met={password.length >= 8}>8 caracteres o más</li>
        <li data-met={/[0-9]/.test(password)}>Al menos un número</li>
        <li data-met={/[^a-zA-Z0-9]/.test(password)}>Al menos un símbolo (!@# …)</li>
      </ul>
    </div>
  )
}
