import { Container } from './Container'

interface SectionWrapperProps {
  children: React.ReactNode
  className?: string
  id?: string
  background?: 'white' | 'gray' | 'dark'
  containerSize?: 'default' | 'narrow' | 'wide'
}

const backgrounds = {
  white: 'bg-white',
  gray: 'bg-gray-50',
  dark: 'bg-gray-900 text-white',
}

export function SectionWrapper({
  children,
  className = '',
  id,
  background = 'white',
  containerSize = 'default',
}: SectionWrapperProps) {
  return (
    <section id={id} className={`section-padding ${backgrounds[background]} ${className}`}>
      <Container size={containerSize}>{children}</Container>
    </section>
  )
}
