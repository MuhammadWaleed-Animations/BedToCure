'use client';

import React, { useState } from 'react';
import Link from 'next/link';

type HospitalProps = {
  id: string;
  name: string;
  city: string;
  imageUrl: string;
};

const fallbackImage = 'https://via.placeholder.com/300x200?text=No+Image';

export default function HospitalCard({ id, name, city, imageUrl }: HospitalProps) {
  const [imgSrc, setImgSrc] = useState(imageUrl || fallbackImage);

  return (
    <Link href={`/hospitals/${id}`}>
      <div className="bg-white rounded shadow p-4 border hover:shadow-md transition duration-200 cursor-pointer">
        <img
          src={imgSrc}
          alt={name}
          onError={() => setImgSrc(fallbackImage)}
          className="w-full h-40 object-cover rounded mb-4"
        />
        <h2 className="text-xl font-semibold">{name}</h2>
        <p className="text-gray-600">{city}</p>
      </div>
    </Link>
  );
}
