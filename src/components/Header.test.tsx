import { render, screen, waitFor } from '@testing-library/react'
import { describe, it } from 'vitest'
import { MemoryRouter } from 'react-router'
import Header from './Header'

describe('Header', () => {
  const renderHeader = () => render(
    <MemoryRouter>
      <Header />
    </MemoryRouter>
  )

  it('renders logo', () => {
    renderHeader()
    expect(screen.getByAltText('Logo')).toBeInTheDocument()
  })

  it('renders navigation links', () => {
    renderHeader()
    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('About')).toBeInTheDocument()
    expect(screen.getByText('Projects')).toBeInTheDocument()
    expect(screen.getByText('Contact')).toBeInTheDocument()
  })

  it('has correct navigation link hrefs', () => {
    renderHeader()
    expect(screen.getByText('Home')).toHaveAttribute('href', '/')
    expect(screen.getByText('About')).toHaveAttribute('href', '/#about')
    expect(screen.getByText('Projects')).toHaveAttribute('href', '/#projects')
    expect(screen.getByText('Contact')).toHaveAttribute('href', '/contact')
  })

  it('applies active class to current path', () => {
    window.history.pushState({}, '', '/')
    renderHeader()
    expect(screen.getByText('Home')).toHaveClass('active')
  })

  it('applies active class to current hash', () => {
    window.history.pushState({}, '', '/#about')
    renderHeader()
    expect(screen.getByText('About')).toHaveClass('active')
  })

  it('applies the transparent class when at the top', () => {
    window.history.pushState({}, '', '/')
    renderHeader()
    expect(screen.getByTestId('header')).toHaveClass('transparent')
  })

  it('does not apply the transparent class when scrolled down', () => {
    window.scrollTo(0, 100)
    renderHeader()
    waitFor(()=>expect(screen.getByTestId('header')).not.toHaveClass('transparent'))
  })
})