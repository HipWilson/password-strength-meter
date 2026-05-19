export type Strength = 'vacía' | 'débil' | 'media' | 'fuerte' | 'muy fuerte'

/**
 * Calcula la fortaleza de una contraseña según las reglas del proyecto.
 *
 * Reglas:
 * - Vacía: sin caracteres
 * - Débil: menos de 8 caracteres
 * - Media: 8+ caracteres, sin números ni símbolos
 * - Fuerte: 8+ caracteres con al menos un número
 * - Muy fuerte: 8+ caracteres con número Y símbolo (cualquier char que no sea letra/número)
 */
export function calculateStrength(password: string): Strength {
  if (password.length === 0) return 'vacía'
  if (password.length < 8) return 'débil'

  const hasNumber = /[0-9]/.test(password)
  const hasSymbol = /[^a-zA-Z0-9]/.test(password)

  if (hasNumber && hasSymbol) return 'muy fuerte'
  if (hasNumber) return 'fuerte'
  return 'media'
}

/**
 * Retorna un valor numérico de 0–100 para la barra de progreso.
 */
export function strengthToPercent(strength: Strength): number {
  const map: Record<Strength, number> = {
    'vacía': 0,
    'débil': 25,
    'media': 50,
    'fuerte': 75,
    'muy fuerte': 100,
  }
  return map[strength]
}
