import { Phone } from "lucide-react";
import { MapPin } from 'lucide-react';

export default function ContactSection({isInView}) {

  return (
    <div class={`flex flex-col  py-10   sm:flex-row px-5    sm:px-20 justify-around  sm:justify-around    w-full h-screen`}>
      {/* Left Side */}
      <div class="w-full sm:w-1/2 py-10 sm:pl-10">
        <h1 class="text-6xl font-bold text-black py-20 flex justify-center sm:justify-start">Contact Us</h1>
        <div class="flex flex-col gap-20 justify-between ">
          <div class="flex flex-row">
            <div class="flex justify-center items-center py-5 h-20 bg-pink-100 px-5 rounded-2xl mr-10">
              <Phone size={35} style={{color: "#972e6a"}} />
            </div>
            <div>
              <h2 class="text-2xl text-curawell font-cairo pb-4">Phones</h2>
              <div class="flex justify-between gap-1 sm:gap-10">
                <span class="text-black text-md sm:text-lg">RegualerCalls</span>
                <span class="text-black text-md sm:text-lg ">+99999 999999 000</span>
              </div>
              <div class="flex justify-between gap-1 sm:gap-10">
                <span class="text-black text-md sm:text-lg">EmergencyCalls</span>
                <span class="text-black text-md sm:text-lg">+99999 999999 000</span>
              </div>
            </div>
          </div>
          <div class="flex flex-row">
            <div class="flex justify-center items-center py-5 h-20 bg-pink-100  px-5 rounded-2xl mr-10">
              <Phone size={35} style={{color: "#972e6a"}} />
            </div>
            <div>
              <h2 class="text-2xl text-curawell font-cairo pb-4">Email</h2>
              <span class="text-black text-md sm:text-lg">clinic@gmail.com</span>
            </div>
          </div>
          <div class="flex flex-row">
            <div class="flex justify-center items-center py-5 h-20 bg-pink-100  px-5 rounded-2xl mr-10">
              <Phone size={35} style={{color: "#972e6a"}} />
            </div>
            <div>
              <h2 class="text-2xl text-curawell font-cairo pb-4">Location</h2>
              <span class="text-black text-md sm:text-lg">
                Damascus,Syria
              </span>
            </div>
          </div>
        </div>
      </div>
      {/* Left Side */}
      {/* Right Side */}
      <div class="w-1/2 sm:flex hidden  justify-center items-center">
        <div class="h-130  w-140 mt-20 rounded-2xl relative">
          <img src="src/assets/MapPhoto.png" class="object-cover w-full h-full rounded-4xl"></img>
          <div class={`flex justify-center items-center absolute bg-curawell w-15 h-20 ${isInView ?" top-30" : "top-10"} ${isInView ?" opacity-100" : "opacity-0"} right-60 z-40 rounded-b-4xl rounded-t-4xl transition-all duration-700 delay-300`}>
            <MapPin size={40} style={{color: "white"}} />
          </div>
        </div>
      </div>
      {/* Right Side */}
    </div>
  );
}
