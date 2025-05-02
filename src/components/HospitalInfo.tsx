export const HospitalInfo = ({ name, city, imageUrl }: { name: string, city: string, imageUrl: string }) => {
  return (
    <section className="text-center mt-12">
      <h2 className="text-4xl font-bold text-black">{name}</h2>
      <p className="mt-4 text-2xl text-gray-700">
        <span className="font-extrabold">Address: </span>{city}
      </p>
      {imageUrl && <img src={imageUrl} alt={name} className="w-full h-64 object-cover rounded-lg mt-6" />}
    </section>
  );
};
