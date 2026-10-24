import { GuideArticle, GuideCategory } from './types';
import { IMAGE_GUIDES } from './imageGuides';
import { PDF_GUIDES } from './pdfGuides';
import { ESIGN_GUIDES } from './esignGuides';
import { CLUSTER1_EXACT_KB_GUIDES } from './cluster1ExactKbGuides';
import { CLUSTER2_EXAM_PORTAL_GUIDES } from './cluster2ExamPortalGuides';
import { CLUSTER3_PASSPORT_VISA_GUIDES } from './cluster3PassportVisaGuides';

export * from './types';
export { IMAGE_GUIDES } from './imageGuides';
export { PDF_GUIDES } from './pdfGuides';
export { ESIGN_GUIDES } from './esignGuides';
export { CLUSTER1_EXACT_KB_GUIDES } from './cluster1ExactKbGuides';
export { CLUSTER2_EXAM_PORTAL_GUIDES } from './cluster2ExamPortalGuides';
export { CLUSTER3_PASSPORT_VISA_GUIDES } from './cluster3PassportVisaGuides';

export const GUIDES: GuideArticle[] = [
  ...IMAGE_GUIDES,
  ...PDF_GUIDES,
  ...ESIGN_GUIDES,
  ...CLUSTER1_EXACT_KB_GUIDES,
  ...CLUSTER2_EXAM_PORTAL_GUIDES,
  ...CLUSTER3_PASSPORT_VISA_GUIDES,
];

export function getGuideBySlug(slug: string): GuideArticle | undefined {
  return GUIDES.find((g) => g.slug === slug);
}

export function getAllGuideSlugs(): string[] {
  return GUIDES.map((g) => g.slug);
}

export function getGuidesByCategory(category: GuideCategory): GuideArticle[] {
  return GUIDES.filter((g) => g.category === category);
}

export function getFeaturedGuides(): GuideArticle[] {
  return GUIDES.filter((g) => g.featured);
}

export function getRelatedGuidesForTool(toolSlug: string, max: number = 3): GuideArticle[] {
  return GUIDES.filter(
    (g) => g.primaryToolSlug === toolSlug || g.relatedToolSlugs.includes(toolSlug)
  ).slice(0, max);
}

export function getRelatedGuides(currentSlug: string, max: number = 3): GuideArticle[] {
  const current = getGuideBySlug(currentSlug);
  if (!current) return [];

  // 1. Matches listed in relatedGuideSlugs
  const explicit = current.relatedGuideSlugs
    .map((s) => getGuideBySlug(s))
    .filter((g): g is GuideArticle => Boolean(g));

  if (explicit.length >= max) {
    return explicit.slice(0, max);
  }

  // 2. Same category fallbacks
  const sameCategory = GUIDES.filter(
    (g) => g.category === current.category && g.slug !== currentSlug && !explicit.some((e) => e.slug === g.slug)
  );

  return [...explicit, ...sameCategory].slice(0, max);
}
