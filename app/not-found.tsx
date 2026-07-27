import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-brand-burgundy flex flex-col items-center justify-center px-4 text-center">
      <p className="font-heading text-brand-gold text-8xl font-bold mb-4">404</p>
      <h1 className="font-heading text-brand-cream uppercase text-3xl font-bold mb-4">
        Page Not Found
      </h1>
      <p className="text-brand-cream/70 text-sm mb-8 max-w-sm">
        The page you are looking for does not exist. It may have been moved or removed.
      </p>
      <Link href="/">
        <Button variant="primary" size="lg">Go Home</Button>
      </Link>
    </div>
  );
}
