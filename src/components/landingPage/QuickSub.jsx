import { Phone } from "lucide-react";
import QuickForm from "./QuickForm";

export default function QuickSub() {
  return (
    <section className="relative flex flex-col md:flex-row w-full h-[70vh] md:h-[60vh] bg-grayc ">
      {/* BG image */}
      <img
        src="src/assets/Selection (3).png"
        alt="dental office background"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Text + CTA */}
      <div
        className="relative z-10 flex flex-col justify-center gap-6 px-6 py-10 md:px-16 lg:px-24 
                      w-full md:w-1/2 lg:w-1/3 text-black"
      >
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight max-w-[20ch]">
          Get in touch to book your first appointment
        </h1>

        <p className="text-base sm:text-lg lg:text-xl text-gray-700 max-w-prose">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tincidunt
          integer elit cum sed etiam nisl arcu.
        </p>

        {/* Contact row */}
        <div className="flex flex-col xs:flex-row items-start xs:items-center gap-4">
          <span className="inline-flex items-center gap-3">
            <span className="bg-curawell p-2 rounded-xl">
              <Phone size={26} className="text-white" />
            </span>
            <span className="font-medium">123-456-7890</span>
          </span>
          <span className="xs:ml-6 text-gray-800">contact@dentalic.com</span>
        </div>
      </div>
      <QuickForm />
    </section>
  );
}
