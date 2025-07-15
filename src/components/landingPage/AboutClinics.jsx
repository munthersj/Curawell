/*  AboutClinics.jsx  */

import SlideComp from "./SlideComp";

  export default function AboutClinics() {
  return (
    <div className=" bg-grayc w-full justify-between h-screen flex flex-col sm:flex-row p-0 m-0 overflow-hidden">
      <div
        className="hidden sm:flex w-1/3 h-full "
        style={{
          boxSizing: "border-box",
          minWidth: "200px",
          maxWidth: "calc(50% - 2em)",
        }}
      >
        <img
          src="src/assets/Selection (5).png"
          alt=""
          className="w-full min-h-full object-cover object-center block align-top -mt-2" // Added 'block' to remove inline spacing
        />
      </div>
      <div className="w-full sm:w-1/2 h-full flex flex-col items-center  mr-10 ">
      <h1 class=" px-11 text-black text-3xl sm:text-6xl font-bold flex mt-20 leading-12 sm:leading-16 ">
        Our specialized clinics, Whole person care is our specialty
      </h1>
      <div>
        <SlideComp/>
      </div>

      
      </div>
    </div>
  );
}

