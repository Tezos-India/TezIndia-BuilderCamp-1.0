import Link from "next/link";
import { useRouter } from "next/router";

const StepProgressBar = () => {
  const router = useRouter();
  
  const AboutColor = router.pathname === "/events"
  const DescriptionColor = router.pathname === "/events/description"
  const previewColor = router.pathname === "/events/preview"
  const yColor = router.pathname === "/events/y"
  

  return (
    <div className="flex justify-center items-center space-x-0">
        {/* about */}
        <div className={`flex justify-center items-center rounded-full h-7 ${AboutColor ? 'bg-[#7522E6] px-2 rounded-md' : 'bg-[#a2a2a2] aspect-square'}`}>
            <span className={`${AboutColor ? 'text-white' : 'text-white'} flex justify-center items-center text-md`}>1{AboutColor && (".About")}</span>
        </div>
      
        {/* line */}
        <div className="mx-4 px-2 h-px bg-gray-400 flex-1 w-10"></div>
      

      {/* description */}
        <div className={`flex justify-center items-center rounded-full h-7 ${DescriptionColor ? 'bg-[#7522E6] px-2 rounded-md' : 'bg-[#a2a2a2] aspect-square'}`}>
          <span className={`${DescriptionColor ? 'text-white' : 'text-white '} flex justify-center items-center text-md`}>2{DescriptionColor && (`.Description`)}</span>
        </div>
      
      {/* line */}
        <div className="mx-4 px-2 h-px bg-gray-400 flex-1"></div>

        {/* x */}
        <div className={`flex justify-center items-center rounded-full h-7 ${previewColor ? 'bg-[#7522E6] px-2 rounded-md' : 'bg-[#a2a2a2] aspect-square'}`}>
        <span className={`${previewColor ? 'text-white' : 'text-white'} flex justify-center items-center text-sm`}>3{previewColor && (".Preview")}</span>
        </div>
      
      <div className="mx-6 px-2 h-[2px] bg-gray-400 flex-1"></div>
      
      {/* description */}
      <div className={`flex justify-center items-center rounded-full h-7 ${yColor ? 'bg-[#7522E6] px-2 rounded-md' : 'bg-[#a2a2a2] aspect-square'}`}>
          <span className={`${yColor ? 'text-white' : 'text-white '} flex justify-center items-center text-md`}>4{yColor && (`.y`)}</span>
        </div>
    </div>
  );
};

export default StepProgressBar;
