import { MapPin } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export interface VenueCardProps {
  name: string;
  address: string;
  mapUrl?: string;
}

export function VenueCard({ name, address, mapUrl }: VenueCardProps) {
  return (
    <section id="venue" className="py-20 bg-brand-cream">
      <h2 className="font-heading text-brand-burgundy uppercase text-4xl font-bold text-center mb-12">
        Venue
      </h2>
      <Card withGoldBorder className="max-w-xl mx-auto">
        <h3 className="font-heading uppercase text-brand-burgundy text-2xl font-bold mb-4">
          {name}
        </h3>

        <div className="flex items-start gap-2 mb-6">
          <MapPin className="text-brand-gold w-5 h-5 mt-0.5 shrink-0" />
          <p className="text-brand-burgundy">{address}</p>
        </div>

        <a
          href="https://maps.google.com?q=Zaaiersweg+180+Amsterdam"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button variant="secondary" size="sm">
            Get Directions
          </Button>
        </a>

        {mapUrl && (
          <iframe
            src={mapUrl}
            title="Venue map"
            className="w-full h-64 rounded mt-4"
            loading="lazy"
          />
        )}
      </Card>
    </section>
  );
}
