import { useState, useEffect } from 'react';

export default function IntroducingSection() {
    const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  let  mountedControl = mounted ? 'opacity-100 transalte-y-0' : 'opacity-0 -translate-y-20' ;

  return (
    // Intrdoucing Section Container
    <div class=" h-20 pt-18 px-0 sm:px-6 md:px-8 lg:px-10 xl:px-26 relative mb-20" style={{ height: "calc(100vh)" }}>
      {/* Image Container */}
      <div class=" w-full " style={{ height: "calc(100vh - 4.5rem)" }}>
        <img
          src="src/assets/Selection (2).png"
          alt=""
          class="w-full h-full object-cover"
        ></img>
      </div>
      {/* Image Container */}
      {/* Image Text  */}
      <div class={`flex flex-col absolute text-grayc bottom-35 sm:bottom-25 w-full  sm:w-1/2 justify-end items-center sm:items-start sm:pl-10 transition-all duration-1000 ease-out ${mountedControl}`}>
        <h1 class="font-bold text-4xl sm:text-6xl mb-10">Where expertise<br></br> meets compassion</h1>
        <p class="text-md px-10 ">
          Ipsum labore esse commodo minim ullamco cupidatat nostrud ullamco 
          commodo<br></br> minim consectetur eu  proident laborum officia nulla anim
          aliquip. Anim inedidunt
        </p>
      </div>
      {/* Image Text  */}
    </div>
    // Intrdoucing Section Container
  );
}
