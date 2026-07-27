export default function HotelsPage() {
  const hotels = [
    {
      name: "easyHotel Amsterdam Arena Boulevard",
      description:
        "Budget-friendly hotel near Amsterdam Arena. Clean, modern rooms with everything you need for a comfortable stay during the convention.",
      bookingUrl:
        "https://www.easyhotel.com/hotels/netherlands/amsterdam/amsterdam-arena-boulevard?startDate=2026-08-19&endDate=2026-08-21",
      area: "Amsterdam Arena Boulevard",
      type: "Budget Hotel",
    },
    {
      name: "Via Suites Amsterdam",
      description:
        "Comfortable suites offering a relaxed atmosphere and great value for your stay during the convention days.",
      bookingUrl: "https://www.booking.com/Share-Xryx6wB",
      area: "Amsterdam",
      type: "Suites",
    },
    {
      name: "Quiet Spacious Room Amsterdam",
      description:
        "A quiet and spacious room option — ideal for those seeking a peaceful retreat during the convention.",
      bookingUrl: "https://www.booking.com/Share-3XzrPd",
      area: "Amsterdam",
      type: "Room",
    },
    {
      name: "Campanile Amsterdam-Zuidoost",
      description:
        "Conveniently located hotel in Amsterdam Zuidoost, close to the convention venue with easy transport links.",
      bookingUrl: "https://amsterdam-zuidoost.campanile.com/nl-nl/",
      area: "Amsterdam Zuidoost",
      type: "Hotel",
    },
  ];

  return (
    <div className="min-h-screen bg-brand-cream py-16">
      <div className="container mx-auto px-4 md:px-8 max-w-4xl">
        <h1 className="font-heading text-brand-burgundy uppercase text-4xl md:text-5xl font-bold text-center mb-4">
          Recommended Hotels
        </h1>
        <p className="text-brand-burgundy/70 text-center mb-12 max-w-xl mx-auto">
          We have compiled a list of hotels near the convention venue for your
          convenience. Book early to secure your accommodation.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {hotels.map((hotel) => (
            <div
              key={hotel.name}
              className="bg-white rounded-lg border-2 border-brand-gold/40 p-6 flex flex-col gap-4 hover:border-brand-gold transition-colors"
            >
              <div>
                <span className="inline-block bg-brand-burgundy text-brand-cream text-xs font-heading uppercase tracking-wider px-2 py-0.5 rounded mb-3">
                  {hotel.type}
                </span>
                <h2 className="font-heading text-brand-burgundy uppercase text-xl font-bold leading-tight">
                  {hotel.name}
                </h2>
                <p className="text-brand-burgundy/60 text-xs mt-1">
                  📍 {hotel.area}
                </p>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed flex-1">
                {hotel.description}
              </p>
              <a
                href={hotel.bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-brand-crimson text-brand-cream font-heading uppercase tracking-wide text-sm px-5 py-2.5 rounded hover:bg-brand-burgundy transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold"
              >
                Book Now
              </a>
            </div>
          ))}
        </div>

        <p className="text-center text-brand-burgundy/50 text-xs mt-12">
          Prices and availability are managed by the respective booking
          platforms. Convention organisers are not responsible for hotel
          bookings.
        </p>
      </div>
    </div>
  );
}
