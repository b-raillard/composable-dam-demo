import { documentToReactComponents, type Options } from '@contentful/rich-text-react-renderer'
import { BLOCKS, INLINES } from '@contentful/rich-text-types'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import type { ResolvedSectionRichText } from '@/types/contentful'

interface RichTextSectionProps {
  section: ResolvedSectionRichText
}

const richTextOptions: Options = {
  renderNode: {
    [BLOCKS.HEADING_1]: (_, children) => (
      <h1 className="heading-1 mb-6">{children}</h1>
    ),
    [BLOCKS.HEADING_2]: (_, children) => (
      <h2 className="heading-2 mb-4">{children}</h2>
    ),
    [BLOCKS.HEADING_3]: (_, children) => (
      <h3 className="heading-3 mb-3">{children}</h3>
    ),
    [BLOCKS.HEADING_4]: (_, children) => (
      <h4 className="text-xl font-semibold mb-3">{children}</h4>
    ),
    [BLOCKS.PARAGRAPH]: (_, children) => (
      <p className="text-gray-600 leading-relaxed mb-4">{children}</p>
    ),
    [BLOCKS.UL_LIST]: (_, children) => (
      <ul className="list-disc list-inside space-y-2 mb-4 text-gray-600">{children}</ul>
    ),
    [BLOCKS.OL_LIST]: (_, children) => (
      <ol className="list-decimal list-inside space-y-2 mb-4 text-gray-600">{children}</ol>
    ),
    [BLOCKS.LIST_ITEM]: (_, children) => <li>{children}</li>,
    [BLOCKS.QUOTE]: (_, children) => (
      <blockquote className="border-l-4 border-primary-500 pl-4 italic text-gray-500 my-6">
        {children}
      </blockquote>
    ),
    [BLOCKS.HR]: () => <hr className="my-8 border-gray-200" />,
    [INLINES.HYPERLINK]: (node, children) => (
      <a
        href={node.data.uri}
        className="text-primary-600 hover:text-primary-700 underline"
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    ),
  },
}

export function RichTextSection({ section }: RichTextSectionProps) {
  return (
    <SectionWrapper containerSize="narrow">
      {section.headline && (
        <div className="text-center mb-12">
          <h2 className="heading-2">{section.headline}</h2>
        </div>
      )}
      <div className="prose prose-lg max-w-none">
        {documentToReactComponents(section.body, richTextOptions)}
      </div>
    </SectionWrapper>
  )
}
