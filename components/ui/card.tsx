import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  withGoldBorder?: boolean;
}

export function Card({ children, className, withGoldBorder = false }: CardProps) {
  return (
    <div
      className={twMerge(
        clsx(
          "bg-brand-cream rounded-lg p-6",
          withGoldBorder && "border-2 border-brand-gold",
          className
        )
      )}
    >
      {children}
    </div>
  );
}
