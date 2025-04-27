import { ChevronsRightIcon } from "lucide-react";
import { Button } from "../components/ui/button";

export const BookingStatus = () => {
  return (
    <div className="flex items-center mb-12"><p className="text-2xl font-bold mr-4">Already booked a bed?</p><div className="flex items-center gap-2 mr-4">{[...Array(4)].map((_, index) => <ChevronsRightIcon key={index} className="w-8 h-8" />)}</div><Button className="bg-[#477e40] hover:bg-[#366630] text-white text-xl px-8 py-3 rounded-lg">Check booking status</Button></div> //side by side 
    // <div className="flex flex-col items-center mb-12">
    //   <p className="text-2xl font-bold mb-4">Already booked a bed?</p>

    //   <div className="flex items-center gap-2 mb-4">
    //     {[...Array(4)].map((_, index) => (
    //       <ChevronsRightIcon key={index} className="w-8 h-8" />
    //     ))}
    //   </div>

    //   <Button className="bg-[#477e40] hover:bg-[#366630] text-white text-xl px-8 py-3 rounded-lg">
    //     Check booking status
    //   </Button>
    // </div>
  );
};
