export default function LineSection({ isInView, introduce }) {
  let showCirucleOutLine = isInView ? "outline-8" : "outline-0";
  let showLineText = isInView ? "opacity-100" : "opacity-0";

  return (
    <div class=" flex flex-col py-10  sm:flex-row px-5  sm:px-20 justify-around sm:justify-center items-center bg-gray-100 w-full h-screen overflow-hidden">
      {/* LeftDiv */}
      <div class="w-full sm:w-1/2   sm:flex flex-col ">
        <span class="text-curawell ml-10 sm:ml-0  flex sm:inline   text-3xl sm:text-4xl font-bold mb-16 scale-y-110">
          Building healthy communities together
        </span>
        <span class="text-xl hidden sm:inline ">{introduce.wise_en}</span>
      </div>
      {/* LeftDiv */}
      {/* RightDiv */}
      <div class="w-full sm:w-1/2 flex justify-center relative  ">
        {/* Custom Line */}
        <div class="flex justify-around gap-48 items-center flex-col ">
          <div
            class={`bg-curawell  w-4  h-4 rounded-full transition-all duration-1000 ${
              isInView ? "delay-150" : "delay-0"
            } ${showCirucleOutLine} outline-pink-500/25`}
          ></div>
          <div
            class={`bg-curawell w-4 h-4 rounded-full transition-all duration-1000 ${showLineText} ${
              isInView ? "delay-300" : "delay-0"
            } ${showCirucleOutLine} outline-pink-500/25`}
          ></div>
          <div
            class={`bg-curawell w-4 h-4 rounded-full transition-all duration-1000 ${showCirucleOutLine} ${
              isInView ? "delay-600" : "delay-0"
            } outline-pink-500/25`}
          ></div>
          <div class="absolute top-2">
            <hr class="h-px w-2 my-4 bg-gray-200 border-0 dark:bg-gray-700 rotate-90"></hr>
            <hr class="h-px w-2 my-4 bg-gray-200 border-0 dark:bg-gray-700 rotate-90"></hr>
            <hr class="h-px w-2 my-4 bg-gray-200 border-0 dark:bg-gray-700 rotate-90"></hr>
            <hr class="h-px w-2 my-4 bg-gray-200 border-0 dark:bg-gray-700 rotate-90"></hr>
            <hr class="h-px w-2 my-4 bg-gray-200 border-0 dark:bg-gray-700 rotate-90"></hr>
            <hr class="h-px w-2 my-4 bg-gray-200 border-0 dark:bg-gray-700 rotate-90"></hr>
            <hr class="h-px w-2 my-4 bg-gray-200 border-0 dark:bg-gray-700 rotate-90"></hr>
            <hr class="h-px w-2 my-4 bg-gray-200 border-0 dark:bg-gray-700 rotate-90"></hr>
            <hr class="h-px w-2 my-4 bg-gray-200 border-0 dark:bg-gray-700 rotate-90"></hr>
            <hr class="h-px w-2 my-4 bg-gray-200 border-0 dark:bg-gray-700 rotate-90"></hr>
            <hr class="h-px w-2 my-4 bg-gray-200 border-0 dark:bg-gray-700 rotate-90"></hr>
          </div>
          <div class="absolute bottom-2">
            <hr class="h-px w-2 my-4 bg-gray-200 border-0 dark:bg-gray-700 rotate-90"></hr>
            <hr class="h-px w-2 my-4 bg-gray-200 border-0 dark:bg-gray-700 rotate-90"></hr>
            <hr class="h-px w-2 my-4 bg-gray-200 border-0 dark:bg-gray-700 rotate-90"></hr>
            <hr class="h-px w-2 my-4 bg-gray-200 border-0 dark:bg-gray-700 rotate-90"></hr>
            <hr class="h-px w-2 my-4 bg-gray-200 border-0 dark:bg-gray-700 rotate-90"></hr>
            <hr class="h-px w-2 my-4 bg-gray-200 border-0 dark:bg-gray-700 rotate-90"></hr>
            <hr class="h-px w-2 my-4 bg-gray-200 border-0 dark:bg-gray-700 rotate-90"></hr>
            <hr class="h-px w-2 my-4 bg-gray-200 border-0 dark:bg-gray-700 rotate-90"></hr>
            <hr class="h-px w-2 my-4 bg-gray-200 border-0 dark:bg-gray-700 rotate-90"></hr>
            <hr class="h-px w-2 my-4 bg-gray-200 border-0 dark:bg-gray-700 rotate-90"></hr>
            <hr class="h-px w-2 my-4 bg-gray-200 border-0 dark:bg-gray-700 rotate-90"></hr>
          </div>
        </div>
        {/* Custom Line */}
        {/* Line Text */}
        <div
          class={`absolute -top-4 -left-6 sm:-left-7 lg:left-30 w-60 flex flex-col justify-center items-center ${showLineText} ${
            isInView ? "delay-150" : "delay-0"
          } duration-400 transition-all`}
        >
          <span class="text-blimo text-3xl font-bold mb-1">2,200+</span>
          <span class="text-sm px-9 sm:px-0 ">
            thousands of beneficiaries <br></br> from our non-stop health care
          </span>
        </div>
        <div
          class={`absolute top-40 -right-12 sm:-right-13 lg:right-26 w-60 flex flex-col justify-center items-center ${showLineText} ${
            isInView ? "delay-300" : "delay-0"
          } duration-700 transition-all`}
        >
          <span class="text-blimo text-3xl font-bold mb-1">+85</span>
          <span class="text-sm px-3 sm:px-0 ">
            qualified doctors and nurses <br></br>
            that then receive nodulice uni
          </span>
        </div>
        <div
          class={`absolute -bottom-4 -left-6 sm:-left-2 lg:left-30 w-60 flex flex-col justify-center items-center ${showLineText} ${
            isInView ? "delay-600" : "delay-0"
          } duration-1000 transition-all`}
        >
          <span class="text-blimo text-3xl font-bold mb-1">+12</span>
          <span class="text-sm px-3 sm:px-0">years of experience</span>
        </div>
        {/* Line Text */}
      </div>
      {/* background Lines */}
      <div class=" absolute mt-100 sm:mt-0  w-full h-full">
        <img
          src="src/assets/Selection (3).png"
          class=" w-full h-100 sm:h-full object-fit sm:object-cover "
        />
      </div>
      {/* background Lines */}
      {/* RightDiv */}
    </div>
  );
}
