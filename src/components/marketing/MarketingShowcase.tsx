import { HeroPoster } from './HeroPoster';
import { FeatureComparison } from './FeatureComparison';
import { TestimonialQuoteCard } from './TestimonialQuoteCard';
import { SectionDivider } from '@/components/ui/SectionDivider';

export function MarketingShowcase() {
  return (
    <div className="relative">
      <HeroPoster />
      <SectionDivider />
      <FeatureComparison />
      <SectionDivider />
      <TestimonialQuoteCard />
    </div>
  );
}
