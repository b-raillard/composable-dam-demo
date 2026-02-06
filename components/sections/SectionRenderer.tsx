import type { ResolvedSection } from '@/types/contentful'
import { HeroSection } from './HeroSection'
import { FeatureGrid } from './FeatureGrid'
import { MediaGallery } from './MediaGallery'
import { VideoSection } from './VideoSection'
import { AiDemoSection } from './AiDemoSection'
import { RichTextSection } from './RichTextSection'

interface SectionRendererProps {
  sections: ResolvedSection[]
}

export function SectionRenderer({ sections }: SectionRendererProps) {
  return (
    <>
      {sections.map((section) => {
        switch (section.contentType) {
          case 'sectionHero':
            return <HeroSection key={section.id} section={section} />
          case 'sectionFeatureGrid':
            return <FeatureGrid key={section.id} section={section} />
          case 'sectionMediaGallery':
            return <MediaGallery key={section.id} section={section} />
          case 'sectionVideo':
            return <VideoSection key={section.id} section={section} />
          case 'sectionAiDemo':
            return <AiDemoSection key={section.id} section={section} />
          case 'sectionRichText':
            return <RichTextSection key={section.id} section={section} />
          default:
            return null
        }
      })}
    </>
  )
}
