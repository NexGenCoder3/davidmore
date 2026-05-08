import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface CategoryFilterProps {
  categories: { id: string; label: string }[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

/**
 * Category filter component with smooth transitions
 * Shows active state and animates category changes
 */
export function CategoryFilter({ 
  categories, 
  activeCategory, 
  onCategoryChange 
}: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap justify-center gap-3 md:gap-4">
      {categories.map((category, index) => {
        const isActive = activeCategory === category.id;
        
        return (
          <motion.button
            key={category.id}
            onClick={() => onCategoryChange(category.id)}
            className={cn(
              'relative px-5 md:px-6 h-10 inline-flex items-center text-sm font-medium tracking-tight rounded-full transition-all duration-300',
              isActive
                ? 'text-primary-foreground'
                : 'text-muted-foreground hover:text-foreground border border-border/60 hover:border-foreground/30 backdrop-blur-sm'
            )}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Active background */}
            {isActive && (
              <motion.div
                layoutId="activeCategory"
                className="absolute inset-0 bg-primary rounded-full shadow-[0_0_24px_-4px_hsl(var(--primary)/0.55)]"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
            
            {/* Text */}
            <span className="relative z-10">{category.label}</span>
          </motion.button>
        );
      })}
    </div>
  );
}
