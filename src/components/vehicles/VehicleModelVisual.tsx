import { useState } from 'react';
import type { Vehicle } from '../../types';

/**
 * Demo image catalogue for the seeded vehicle records.
 * In production these URLs should come from a backend vehicle-image service or
 * licensed OEM data provider using make/model/year identifiers.
 */
const vehicleImageById: Record<string, string> = {
  'VEH-2001': 'https://img.sm360.ca/images/article/erin-park-automotive/129998/2022_toyota_corolla_cross_windchillpearl_0031718894658449.jpg',
  'VEH-2002': 'https://car-recalls.eu/wp-content/uploads/2025/08/Volkswagen-Polo-2022-2025.jpg',
  'VEH-2003': 'https://file.kelleybluebookimages.com/kbb/base/evox/CP/51484/2023-Ford-Ranger%20SuperCrew-front_51484_032_2400x1800_E7_nologo.png',
  'VEH-2004': 'https://i0.wp.com/automundo.com.ar/wp-content/uploads/2025/06/Hyunda-Creta-6.jpg?resize=708%2C472&ssl=1',
};

function VehicleFallback() {
  return (
    <svg viewBox="0 0 420 170" className="h-auto w-full" role="img" aria-label="Vehicle silhouette fallback">
      <defs>
        <linearGradient id="fallbackVehicleBody" x1="30" y1="55" x2="380" y2="145" gradientUnits="userSpaceOnUse">
          <stop stopColor="#3F3F46" />
          <stop offset="1" stopColor="#18181B" />
        </linearGradient>
      </defs>
      <path d="M55 116c12-31 36-48 73-52l49-7c18-25 39-38 66-38h45c16 0 32 8 42 22l28 39 28 8c17 5 26 17 26 36v8H28v-8c0-16 10-27 27-28Z" fill="url(#fallbackVehicleBody)" />
      <path d="M193 57l18-24c8-10 19-15 31-15h42c11 0 20 5 27 14l21 29-139-4Z" fill="#D6D3D1" opacity="0.92" />
      <path d="M221 33v25M287 31l19 29" stroke="#A8A29E" strokeWidth="3" />
      <circle cx="116" cy="132" r="29" fill="#111113" stroke="#52525B" strokeWidth="5" />
      <circle cx="116" cy="132" r="12" fill="#F97316" />
      <circle cx="322" cy="132" r="29" fill="#111113" stroke="#52525B" strokeWidth="5" />
      <circle cx="322" cy="132" r="12" fill="#F97316" />
    </svg>
  );
}

interface VehicleModelVisualProps {
  vehicle: Vehicle;
}

export function VehicleModelVisual({ vehicle }: VehicleModelVisualProps) {
  const [imageFailed, setImageFailed] = useState(false);
  const imageUrl = vehicleImageById[vehicle.id];

  if (!imageUrl || imageFailed) {
    return <VehicleFallback />;
  }

  return (
    <div className="relative h-[220px] overflow-hidden rounded-[22px] bg-gradient-to-b from-[#343438] to-[#202124] sm:h-[245px]">
      <div className="absolute inset-x-10 bottom-5 h-8 rounded-full bg-black/30 blur-xl" />
      <img
        src={imageUrl}
        alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
        onError={() => setImageFailed(true)}
        className="relative h-full w-full object-contain object-center p-2 mix-blend-normal"
        loading="lazy"
        referrerPolicy="no-referrer"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#202124]/30 via-transparent to-transparent" />
    </div>
  );
}
