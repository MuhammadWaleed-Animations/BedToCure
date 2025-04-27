export const QuickLinks = () => {
    const links = [
      "Search Hospital",
      "About Us",
      "Ask AI",
      "Check booking status",
      "Contact Us",
    ];
  
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-6">
        {links.map((text, index) => (
          <div key={index} className="text-white text-lg hover:underline cursor-pointer">
            &gt; {text}
          </div>
        ))}
      </div>
    );
  };
  