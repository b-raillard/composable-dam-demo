interface ContainerProps {
  children: React.ReactNode
  className?: string
  size?: 'default' | 'narrow' | 'wide'
}

const maxWidths = {
  narrow: 'max-w-4xl',
  default: 'max-w-7xl',
  wide: 'max-w-screen-2xl',
}

export function Container({ children, className = '', size = 'default' }: ContainerProps) {
  return (
    <div className={`mx-auto px-4 sm:px-6 lg:px-8 ${maxWidths[size]} ${className}`}>
      {children}
    </div>
  )
}
