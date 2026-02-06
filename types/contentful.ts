import type { Document } from '@contentful/rich-text-types'
import type { Entry, EntrySkeletonType, EntryFieldTypes } from 'contentful'
import type { CloudinaryField } from './cloudinary'

// ---------- Navigation ----------
export interface NavigationItemFields {
  label: EntryFieldTypes.Text
  href: EntryFieldTypes.Text
  openInNewTab?: EntryFieldTypes.Boolean
  order?: EntryFieldTypes.Integer
}

export type NavigationItemSkeleton = EntrySkeletonType<NavigationItemFields, 'navigationItem'>
export type NavigationItemEntry = Entry<NavigationItemSkeleton, undefined, string>

// ---------- Site Settings ----------
export interface SiteSettingsFields {
  siteName: EntryFieldTypes.Text
  logo?: EntryFieldTypes.Object
  navigation?: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<NavigationItemSkeleton>>
  footerText?: EntryFieldTypes.Text
}

export type SiteSettingsSkeleton = EntrySkeletonType<SiteSettingsFields, 'siteSettings'>
export type SiteSettingsEntry = Entry<SiteSettingsSkeleton, undefined, string>

// ---------- Section: Hero ----------
export interface SectionHeroFields {
  internalName: EntryFieldTypes.Text
  headline: EntryFieldTypes.Text
  subheadline?: EntryFieldTypes.Text
  ctaText?: EntryFieldTypes.Text
  ctaUrl?: EntryFieldTypes.Text
  backgroundType?: EntryFieldTypes.Text // 'image' | 'video'
  backgroundMedia?: EntryFieldTypes.Object
  overlayOpacity?: EntryFieldTypes.Number
}

export type SectionHeroSkeleton = EntrySkeletonType<SectionHeroFields, 'sectionHero'>
export type SectionHeroEntry = Entry<SectionHeroSkeleton, undefined, string>

// ---------- Feature Item ----------
export interface FeatureItemFields {
  title: EntryFieldTypes.Text
  description: EntryFieldTypes.Text
  image?: EntryFieldTypes.Object
  link?: EntryFieldTypes.Text
}

export type FeatureItemSkeleton = EntrySkeletonType<FeatureItemFields, 'featureItem'>
export type FeatureItemEntry = Entry<FeatureItemSkeleton, undefined, string>

// ---------- Section: Feature Grid ----------
export interface SectionFeatureGridFields {
  internalName: EntryFieldTypes.Text
  headline?: EntryFieldTypes.Text
  subheadline?: EntryFieldTypes.Text
  features: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<FeatureItemSkeleton>>
  columns?: EntryFieldTypes.Integer
}

export type SectionFeatureGridSkeleton = EntrySkeletonType<SectionFeatureGridFields, 'sectionFeatureGrid'>
export type SectionFeatureGridEntry = Entry<SectionFeatureGridSkeleton, undefined, string>

// ---------- Section: Media Gallery ----------
export interface SectionMediaGalleryFields {
  internalName: EntryFieldTypes.Text
  headline?: EntryFieldTypes.Text
  mediaItems: EntryFieldTypes.Object
  layout?: EntryFieldTypes.Text // 'grid' | 'masonry' | 'carousel'
  columns?: EntryFieldTypes.Integer
}

export type SectionMediaGallerySkeleton = EntrySkeletonType<SectionMediaGalleryFields, 'sectionMediaGallery'>
export type SectionMediaGalleryEntry = Entry<SectionMediaGallerySkeleton, undefined, string>

// ---------- Section: Video ----------
export interface SectionVideoFields {
  internalName: EntryFieldTypes.Text
  headline?: EntryFieldTypes.Text
  description?: EntryFieldTypes.Text
  video: EntryFieldTypes.Object
  posterImage?: EntryFieldTypes.Object
  enableStreaming?: EntryFieldTypes.Boolean
  playerTheme?: EntryFieldTypes.Text
  autoplay?: EntryFieldTypes.Boolean
  loop?: EntryFieldTypes.Boolean
}

export type SectionVideoSkeleton = EntrySkeletonType<SectionVideoFields, 'sectionVideo'>
export type SectionVideoEntry = Entry<SectionVideoSkeleton, undefined, string>

// ---------- Section: AI Demo ----------
export interface SectionAiDemoFields {
  internalName: EntryFieldTypes.Text
  headline?: EntryFieldTypes.Text
  description?: EntryFieldTypes.Text
  demoType: EntryFieldTypes.Text // 'background-removal' | 'generative-fill' | 'content-aware-crop' | 'object-detection' | 'auto-tagging' | 'generative-replace'
  sourceImage: EntryFieldTypes.Object
  aiParameters?: EntryFieldTypes.Object
  showBeforeAfter?: EntryFieldTypes.Boolean
}

export type SectionAiDemoSkeleton = EntrySkeletonType<SectionAiDemoFields, 'sectionAiDemo'>
export type SectionAiDemoEntry = Entry<SectionAiDemoSkeleton, undefined, string>

// ---------- Section: Rich Text ----------
export interface SectionRichTextFields {
  internalName: EntryFieldTypes.Text
  headline?: EntryFieldTypes.Text
  body: EntryFieldTypes.RichText
}

export type SectionRichTextSkeleton = EntrySkeletonType<SectionRichTextFields, 'sectionRichText'>
export type SectionRichTextEntry = Entry<SectionRichTextSkeleton, undefined, string>

// ---------- Page ----------
export type SectionSkeleton =
  | SectionHeroSkeleton
  | SectionFeatureGridSkeleton
  | SectionMediaGallerySkeleton
  | SectionVideoSkeleton
  | SectionAiDemoSkeleton
  | SectionRichTextSkeleton

export interface PageFields {
  title: EntryFieldTypes.Text
  slug: EntryFieldTypes.Text
  seoTitle?: EntryFieldTypes.Text
  seoDescription?: EntryFieldTypes.Text
  ogImage?: EntryFieldTypes.Object
  sections?: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<SectionSkeleton>>
}

export type PageSkeleton = EntrySkeletonType<PageFields, 'page'>
export type PageEntry = Entry<PageSkeleton, undefined, string>

// ---------- Resolved types for rendering ----------
export interface ResolvedPage {
  title: string
  slug: string
  seoTitle?: string
  seoDescription?: string
  ogImage?: CloudinaryField
  sections: ResolvedSection[]
}

export type ResolvedSection =
  | ResolvedSectionHero
  | ResolvedSectionFeatureGrid
  | ResolvedSectionMediaGallery
  | ResolvedSectionVideo
  | ResolvedSectionAiDemo
  | ResolvedSectionRichText

interface SectionBase {
  id: string
  contentType: string
}

export interface ResolvedSectionHero extends SectionBase {
  contentType: 'sectionHero'
  headline: string
  subheadline?: string
  ctaText?: string
  ctaUrl?: string
  backgroundType?: string
  backgroundMedia?: CloudinaryField
  overlayOpacity?: number
}

export interface ResolvedSectionFeatureGrid extends SectionBase {
  contentType: 'sectionFeatureGrid'
  headline?: string
  subheadline?: string
  features: ResolvedFeatureItem[]
  columns?: number
}

export interface ResolvedFeatureItem {
  id: string
  title: string
  description: string
  image?: CloudinaryField
  link?: string
}

export interface ResolvedSectionMediaGallery extends SectionBase {
  contentType: 'sectionMediaGallery'
  headline?: string
  mediaItems: CloudinaryField
  layout?: string
  columns?: number
}

export interface ResolvedSectionVideo extends SectionBase {
  contentType: 'sectionVideo'
  headline?: string
  description?: string
  video: CloudinaryField
  posterImage?: CloudinaryField
  enableStreaming?: boolean
  playerTheme?: string
  autoplay?: boolean
  loop?: boolean
}

export interface ResolvedSectionAiDemo extends SectionBase {
  contentType: 'sectionAiDemo'
  headline?: string
  description?: string
  demoType: string
  sourceImage: CloudinaryField
  aiParameters?: Record<string, unknown>
  showBeforeAfter?: boolean
}

export interface ResolvedSectionRichText extends SectionBase {
  contentType: 'sectionRichText'
  headline?: string
  body: Document
}

export interface ResolvedSiteSettings {
  siteName: string
  logo?: CloudinaryField
  navigation: ResolvedNavigationItem[]
  footerText?: string
}

export interface ResolvedNavigationItem {
  label: string
  href: string
  openInNewTab?: boolean
  order?: number
}
