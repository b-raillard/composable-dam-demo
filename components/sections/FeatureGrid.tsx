import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { FeatureCard } from './FeatureCard'
import type { ResolvedSectionFeatureGrid } from '@/types/contentful'

interface FeatureGridProps {
  section: ResolvedSectionFeatureGrid
}

const columnClasses: Record<number, string> = {
  2: 'grid-cols-1 md:grid-cols-2',
  3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
  4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
}

export function FeatureGrid({ section }: FeatureGridProps) {
  const columns = section.columns ?? 3
  const gridClass = columnClasses[columns] || columnClasses[3]

  return (
    <SectionWrapper background="gray">
      {(section.headline || section.subheadline) && (
        <div className="text-center mb-12">
          {section.headline && <h2 className="heading-2">{section.headline}</h2>}
          {section.subheadline && (
            <p className="mt-4 body-large max-w-2xl mx-auto">{section.subheadline}</p>
          )}
        </div>
      )}
      <div className={`grid ${gridClass} gap-8`}>
        {section.features.map((feature) => (
          <FeatureCard key={feature.id} feature={feature} />
        ))}
      </div>
    </SectionWrapper>
  )
}
