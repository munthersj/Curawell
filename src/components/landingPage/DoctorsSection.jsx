import SlideCompDoc from "./SlideCompDoc";

export default function DoctorsSection({ doctors }) {
  return (
    <div class="w-full h-screen overflow-hidden   flex flex-col sm:flex-row">
      {/* LeftSide */}
      <div class="w-full sm:w-1/2  flex flex-col justify-center items-center">
        <h1 class="text-black font-bold text-5xl font-cairo flex justify-center sm:justify-start  ">
          Meet Our Team
        </h1>
        <span class="text-2xl text-gray-500 py-20 px-10 pl-20">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
        </span>
      </div>
      {/* LeftSide */}
      {/* RightSide */}
      <div class="w-full  flex items-center">
        <div className="w-full max-w-6xl ">
          <SlideCompDoc doctors={doctors} />
        </div>
      </div>
      {/* RightSide */}
    </div>
  );
}
