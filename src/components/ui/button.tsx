import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-semibold tracking-tight ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:scale-[1.02] active:scale-[0.98] min-w-[44px]",
  {
    variants: {
      variant: {
        default:
          "rounded-full bg-primary text-primary-foreground hover:bg-primary/90 shadow-[0_0_0_1px_hsl(var(--primary)/0.55),0_10px_28px_-8px_hsl(var(--primary)/0.55)] hover:shadow-[0_0_0_1px_hsl(var(--primary)/0.7),0_14px_36px_-10px_hsl(var(--primary)/0.7)]",
        destructive:
          "rounded-full bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-[0_8px_24px_-12px_hsl(var(--destructive)/0.5)]",
        outline:
          "rounded-full border-2 border-primary/60 text-primary bg-background/50 backdrop-blur-md hover:bg-primary/15 hover:border-primary hover:text-primary",
        secondary:
          "rounded-full bg-secondary text-secondary-foreground border border-border hover:bg-secondary/80",
        ghost: "rounded-full text-foreground hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline rounded-none min-w-0",
        glow:
          "rounded-full bg-gradient-to-b from-primary to-primary/85 text-primary-foreground shadow-[0_0_0_1px_hsl(var(--primary)/0.5),0_12px_32px_-8px_hsl(var(--primary)/0.65)] hover:shadow-[0_0_36px_hsl(var(--primary)/0.7),0_0_0_1px_hsl(var(--primary)/0.6)]",
      },
      size: {
        default: "h-11 px-6 py-2",
        sm: "h-9 px-4 text-xs",
        lg: "h-12 px-8 text-base",
        icon: "h-11 w-11 rounded-full",
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
