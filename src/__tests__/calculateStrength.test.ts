import { describe, it, expect } from 'vitest'
import { calculateStrength } from '../utils/calculateStrength'

describe('calculateStrength - lógica pura', () => {
  // Estado vacío
  it('retorna "vacía" cuando la contraseña está vacía', () => {
    expect(calculateStrength('')).toBe('vacía')
  })

  // Débil
  it('retorna "débil" cuando la contraseña tiene menos de 8 caracteres', () => {
    expect(calculateStrength('abc')).toBe('débil')
  })

  it('retorna "débil" para una contraseña de exactamente 7 caracteres', () => {
    expect(calculateStrength('abcdefg')).toBe('débil')
  })

  it('retorna "débil" con solo símbolos y menos de 8 caracteres', () => {
    expect(calculateStrength('!@#')).toBe('débil')
  })

  it('retorna "débil" con solo números y menos de 8 caracteres', () => {
    expect(calculateStrength('123')).toBe('débil')
  })

  // Media
  it('retorna "media" con exactamente 8 caracteres sin números ni símbolos', () => {
    expect(calculateStrength('abcdefgh')).toBe('media')
  })

  it('retorna "media" con 8 o más caracteres sin números ni símbolos', () => {
    expect(calculateStrength('abcdefghij')).toBe('media')
  })

  it('retorna "media" con 8 o más caracteres con solo letras (mayúsculas y minúsculas)', () => {
    expect(calculateStrength('AbCdEfGh')).toBe('media')
  })

  // Fuerte
  it('retorna "fuerte" con 8 o más caracteres con al menos un número', () => {
    expect(calculateStrength('abcdefg1')).toBe('fuerte')
  })

  it('retorna "fuerte" con 8 o más caracteres con múltiples números', () => {
    expect(calculateStrength('abcdef12')).toBe('fuerte')
  })

  it('retorna "fuerte" con 10 caracteres y un número', () => {
    expect(calculateStrength('abcdefghi1')).toBe('fuerte')
  })

  // Muy fuerte
  it('retorna "muy fuerte" con 8+ caracteres, número y símbolo', () => {
    expect(calculateStrength('abcdefg1!')).toBe('muy fuerte')
  })

  it('retorna "muy fuerte" con símbolo @', () => {
    expect(calculateStrength('abcdefg1@')).toBe('muy fuerte')
  })

  it('retorna "muy fuerte" con espacio como símbolo', () => {
    expect(calculateStrength('abcdefg1 ')).toBe('muy fuerte')
  })

  it('retorna "muy fuerte" con símbolo # como caracter especial', () => {
    expect(calculateStrength('abcdef1#g')).toBe('muy fuerte')
  })

  // Edge cases: exactamente 8 caracteres
  it('una contraseña de exactamente 8 caracteres sin números NO es "débil"', () => {
    expect(calculateStrength('abcdefgh')).not.toBe('débil')
  })

  it('una contraseña de exactamente 7 caracteres NO es "media"', () => {
    expect(calculateStrength('abcdefg')).not.toBe('media')
  })

  // Bonus: mayúsculas y minúsculas mezcladas
  it('retorna "muy fuerte" con mayúsculas, minúsculas, número y símbolo', () => {
    expect(calculateStrength('Abcdefg1!')).toBe('muy fuerte')
  })
})
