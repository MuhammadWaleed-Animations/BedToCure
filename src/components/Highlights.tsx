export const Highlights = () => {
    return (
      <div className="flex flex-wrap justify-center gap-24 mt-8 px-6">
        <div className="flex flex-col items-center">
          <img
            src="/pngwing-com--1--1.png"
            alt="Hospital"
            className="w-28 h-28 object-contain"
          />
          <p className="text-center text-lg font-semibold mt-2">
            Over 500 hospitals affiliated
          </p>
        </div>
  
        <div className="flex flex-col items-center">
          <img
            src="/pngwing-com-1.png"
            alt="Trusted"
            className="w-28 h-28 object-contain"
          />
          <p className="text-center text-lg font-semibold mt-2">
            Trusted by many users
          </p>
        </div>
      </div>
    );
  };
  