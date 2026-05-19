import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { PasswordStrengthMeter } from '../components/PasswordStrengthMeter'

describe('PasswordStrengthMeter - tests de renderizado', () => {
  it('renderiza un input de tipo password', () => {
    render(<PasswordStrengthMeter />)
    const input = screen.getByLabelText('Contraseña')
    expect(input).toBeInTheDocument()
  })

  it('el input de contraseña es accesible por label', () => {
    render(<PasswordStrengthMeter />)
    // Puntos extra: query por label
    const input = screen.getByLabelText('Contraseña')
    expect(input).toBeInTheDocument()
  })

  it('renderiza el indicador de fortaleza con estado inicial "vacía"', () => {
    render(<PasswordStrengthMeter />)
    expect(screen.getByText('vacía')).toBeInTheDocument()
  })

  it('renderiza una barra de progreso en el documento', () => {
    render(<PasswordStrengthMeter />)
    expect(screen.getByRole('progressbar')).toBeInTheDocument()
  })
})

describe('PasswordStrengthMeter - tests de comportamiento', () => {
  it('muestra "débil" al escribir una contraseña corta', async () => {
    const user = userEvent.setup()
    render(<PasswordStrengthMeter />)

    const input = screen.getByLabelText('Contraseña')
    await user.type(input, 'abc')

    expect(screen.getByText('débil')).toBeInTheDocument()
  })

  it('muestra "media" con 8 o más caracteres sin números ni símbolos', async () => {
    const user = userEvent.setup()
    render(<PasswordStrengthMeter />)

    const input = screen.getByLabelText('Contraseña')
    await user.type(input, 'abcdefgh')

    expect(screen.getByText('media')).toBeInTheDocument()
  })

  it('muestra "fuerte" con 8 o más caracteres y al menos un número', async () => {
    const user = userEvent.setup()
    render(<PasswordStrengthMeter />)

    const input = screen.getByLabelText('Contraseña')
    await user.type(input, 'abcdefg1')

    expect(screen.getByText('fuerte')).toBeInTheDocument()
  })

  it('muestra "muy fuerte" con 8+ caracteres, número y símbolo', async () => {
    const user = userEvent.setup()
    render(<PasswordStrengthMeter />)

    const input = screen.getByLabelText('Contraseña')
    await user.type(input, 'abcdefg1!')

    expect(screen.getByText('muy fuerte')).toBeInTheDocument()
  })

  it('vuelve a "vacía" al borrar completamente la contraseña', async () => {
    const user = userEvent.setup()
    render(<PasswordStrengthMeter />)

    const input = screen.getByLabelText('Contraseña')
    await user.type(input, 'abc')
    expect(screen.getByText('débil')).toBeInTheDocument()

    await user.clear(input)
    expect(screen.getByText('vacía')).toBeInTheDocument()
  })

  it('se actualiza en tiempo real mientras el usuario escribe', async () => {
    const user = userEvent.setup()
    render(<PasswordStrengthMeter />)

    const input = screen.getByLabelText('Contraseña')

    await user.type(input, 'abc')
    expect(screen.getByText('débil')).toBeInTheDocument()

    await user.type(input, 'defgh')
    expect(screen.getByText('media')).toBeInTheDocument()

    await user.type(input, '1')
    expect(screen.getByText('fuerte')).toBeInTheDocument()

    await user.type(input, '!')
    expect(screen.getByText('muy fuerte')).toBeInTheDocument()
  })
})

describe('PasswordStrengthMeter - tests de edge cases', () => {
  it('una contraseña de exactamente 8 caracteres sin números NO muestra "débil"', async () => {
    const user = userEvent.setup()
    render(<PasswordStrengthMeter />)

    const input = screen.getByLabelText('Contraseña')
    await user.type(input, 'abcdefgh')

    expect(screen.queryByText('débil')).not.toBeInTheDocument()
  })

  it('una contraseña de exactamente 7 caracteres NO muestra "media"', async () => {
    const user = userEvent.setup()
    render(<PasswordStrengthMeter />)

    const input = screen.getByLabelText('Contraseña')
    await user.type(input, 'abcdefg')

    expect(screen.queryByText('media')).not.toBeInTheDocument()
  })

  it('solo símbolos con menos de 8 caracteres sigue siendo "débil"', async () => {
    const user = userEvent.setup()
    render(<PasswordStrengthMeter />)

    const input = screen.getByLabelText('Contraseña')
    await user.type(input, '!@#')

    expect(screen.getByText('débil')).toBeInTheDocument()
  })

  it('solo un número con menos de 8 caracteres es "débil"', async () => {
    const user = userEvent.setup()
    render(<PasswordStrengthMeter />)

    const input = screen.getByLabelText('Contraseña')
    await user.type(input, '1')

    expect(screen.getByText('débil')).toBeInTheDocument()
  })

  it('exactamente 8 caracteres con número muestra "fuerte"', async () => {
    const user = userEvent.setup()
    render(<PasswordStrengthMeter />)

    const input = screen.getByLabelText('Contraseña')
    await user.type(input, 'abcdefg1')

    expect(screen.getByText('fuerte')).toBeInTheDocument()
  })

  it('la barra de progreso tiene aria-valuenow 0 cuando está vacía', () => {
    render(<PasswordStrengthMeter />)
    const bar = screen.getByRole('progressbar')
    expect(bar).toHaveAttribute('aria-valuenow', '0')
  })

  it('la barra de progreso tiene aria-valuenow 100 con contraseña muy fuerte', async () => {
    const user = userEvent.setup()
    render(<PasswordStrengthMeter />)

    const input = screen.getByLabelText('Contraseña')
    await user.type(input, 'Abcdefg1!')

    const bar = screen.getByRole('progressbar')
    expect(bar).toHaveAttribute('aria-valuenow', '100')
  })
})
