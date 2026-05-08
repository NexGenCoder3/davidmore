import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium tracking-tight ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:scale-[1.02] active:scale-[0.98]",
  {
    variants: {
      variant: {
        default:
          "rounded-full bg-primary text-primary-foreground hover:bg-primary/90 shadow-[0_0_0_1px_hsl(var(--primary)/0.18),0_8px_24px_-12px_hsl(var(--primary)/0.45)] hover:shadow-[0_0_0_1px_hsl(var(--primary)/0.3),0_12px_28px_-10px_hsl(var(--primary)/0.55)]",
        destructive:
          "rounded-full bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "rounded-full border border-input bg-background/40 backdrop-blur-sm hover:bg-accent hover:text-accent-foreground hover:border-foreground/30",
        secondary:
          "rounded-full bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "rounded-full hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline rounded-none",
        glow:
          "rounded-full bg-gradient-to-b from-primary to-primary/80 text-primary-foreground shadow-[0_0_0_1px_hsl(var(--primary)/0.25),0_10px_30px_-8px_hsl(var(--primary)/0.55)] hover:shadow-[0_0_28px_hsl(var(--primary)/0.55),0_0_0_1px_hsl(var(--primary)/0.4)]",
      },
      size: {
        default: "h-11 px-5 py-2",
        sm: "h-9 px-4",
        lg: "h-12 px-9 text-base",
        icon: "h-10 w-10 rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
