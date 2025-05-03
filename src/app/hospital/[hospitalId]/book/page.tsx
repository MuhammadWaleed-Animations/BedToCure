'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function BookBedPage() {
  const searchParams = useSearchParams();
  const hospitalName = searchParams.get('name') || 'Hospital';
  const address = searchParams.get('address') || 'Address';
  const department = searchParams.get('ward') || 'Department';
  const costPerNight = searchParams.get('cost') || '0';
  const bookingFee = searchParams.get('bookingFee') || '1000';

  const router = useRouter();

  const [cnic, setCnic] = useState('');
  const [name, setName] = useState('');
  const [condition, setCondition] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleBooking = async () => {
    if (cnic.length !== 13) {
      setError('CNIC must be 13 digits');
      return;
    }
    if (!name || !condition) {
      setError('Please fill all fields');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/preorder', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cnic,
          name,
          condition,
          hospitalName,
          address,
          department,
          costPerNight,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Booking failed');
      }

      alert('Booking successful! Please complete payment.');
      router.push('/home');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ background: 'linear-gradient(to right, #A8E063, #56ab2f)', minHeight: '100vh', padding: '2rem' }}>
      <div style={{ maxWidth: '600px', margin: '0 auto', background: '#fff', padding: '2rem', borderRadius: '12px', boxShadow: '0 0 10px rgba(0,0,0,0.2)' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '1rem' }}>
          Hospital: {hospitalName}
        </h2>
        <p><strong>Address:</strong> {address}</p>
        <p><strong>Department:</strong> {department}</p>
        <p><strong>Cost per night:</strong> {costPerNight} PKR</p>
        <p><strong>Booking fee:</strong> {bookingFee} PKR (refundable)</p>

        <div style={{ marginTop: '2rem' }}>
          <label>Enter CNIC of patient:</label>
          <input
            type="text"
            placeholder="CNIC without dashes"
            value={cnic}
            onChange={(e) => setCnic(e.target.value)}
            style={{ width: '100%', padding: '0.5rem', marginBottom: '1rem', borderRadius: '8px', border: '1px solid #ccc' }}
          />

          <label>Enter name of patient:</label>
          <input
            type="text"
            placeholder="Patient name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ width: '100%', padding: '0.5rem', marginBottom: '1rem', borderRadius: '8px', border: '1px solid #ccc' }}
          />

          <label>Describe medical condition:</label>
          <textarea
            placeholder="Medical condition"
            value={condition}
            onChange={(e) => setCondition(e.target.value)}
            style={{ width: '100%', padding: '0.5rem', marginBottom: '1rem', borderRadius: '8px', border: '1px solid #ccc' }}
          />

          <p style={{ fontSize: '12px', color: 'gray', marginBottom: '1rem' }}>
            <strong>Disclaimer:</strong> Bed will auto-cancel after 90 mins if patient doesn't show up.
          </p>

          {error && <p style={{ color: 'red', marginBottom: '1rem' }}>{error}</p>}

          <button
            onClick={handleBooking}
            disabled={loading}
            style={{
              width: '100%',
              padding: '0.75rem',
              backgroundColor: '#28a745',
              color: '#fff',
              border: 'none',
              borderRadius: '8px',
              fontSize: '16px',
              cursor: 'pointer',
            }}
          >
            {loading ? 'Booking...' : 'Book'}
          </button>
        </div>
      </div>
    </div>
  );
}
