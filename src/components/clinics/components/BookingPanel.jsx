import React from "react";
import PropTypes from "prop-types";
import { DayPicker } from "react-day-picker";
import { ChevronDown, Check } from "lucide-react";
import "react-day-picker/dist/style.css";
import LogoLoader from "../../LogoLoader";
/**
 * Presentational booking panel.
 * All state/handlers تأتي من الأب عبر props.
 */
export default function BookingPanel({
  /** layout / assets */
  imageSrc,
  defaultClassNames,

  /** form: phone */
  phone,
  setPhone,
  setPhoneTouched,
  phoneError,
  /** services dropdown */
  query,
  //   setQuery,
  showDropdown,
  setShowDropdown,
  filteredOptions,
  handleInputChange,
  toggleDropdown,
  handleSelect,

  /** doctors dropdown */
  doctorsDisabled,
  query1,
  //   setQuery1,
  showDropdown1,
  setShowDropdown1,
  filteredOptions1,
  handleInputChange1,
  toggleDropdown1,
  handleSelect1,

  /** taxi/location */
  enableWebsite,
  setEnableWebsite,
  location,
  setlocation,

  /** calendar & times */
  today,
  selectedDate,
  setSelectedDate,
  status1,
  times,
  selectedSlot,
  setSelectedSlot,
  setselectedTime,
  toYMD,

  /** submit */
  handelSubmit,
}) {
  const canPickDay = Boolean(phone && query && query1);

  return (
    <div className="flex flex-col justify-center relative w-full mt-20">
      <img className="w-full h-auto object-cover" src={imageSrc} alt="hero" />

      {/* Small Container Over Image */}
      <div className="sm:absolute flex items-start sm:h-[450px] sm:bottom-0 sm:left-1/2 sm:-translate-x-1/2 sm:translate-y-1/2 w-screen sm:w-9/12 bg-grayc text-black px-4 sm:px-8 pt-5 sm:pt-7 pb-6 rounded-lg shadow-lg">
        {/* First Column */}
        <div className="flex flex-col justify-between w-1/3">
          <h1 className="text-2xl sm:text-3xl font-cairo font-bold mb-5">
            Book Appointment :
          </h1>

          {/* Phone */}
          <input
            type="tel"
            inputMode="numeric"
            placeholder="PhoneNumber"
            className={`border-2 p-3 mx-5 rounded-lg font-cairo  text-curawell ${
              phoneError ? "border-red-500" : "border-curawell mb-4"
            }`}
            value={phone}
            onChange={(e) => {
              // keep digits only, cap at 10
              const digits = e.target.value.replace(/\D/g, "").slice(0, 10);
              setPhone(digits);
            }}
            onBlur={() => setPhoneTouched(true)}
            maxLength={10}
            pattern="^09\d{8}$"
          />
          {phoneError && (
            <p className="text-red-600 text-sm mx-5 mb-2">
              Enter a valid Syrian mobile (e.g. 09XXXXXXXX).
            </p>
          )}

          {/* Key Services */}
          <div className="relative">
            <div className="flex p-3 mx-5 relative mb-5 text-curawell font-cairo items-center border-2 rounded-md border-curawell focus-within:ring-2 focus-within:ring-curawell">
              <input
                type="text"
                className="w-full focus:outline-none"
                placeholder="Key Services"
                value={query}
                onChange={handleInputChange}
                onClick={() => setShowDropdown(true)}
              />
              <button
                type="button"
                onClick={toggleDropdown}
                className="ml-2 text-white focus:outline-none"
              >
                <div className="bg-curawell absolute right-0 top-0 w-20 h-12 flex items-center justify-center">
                  <ChevronDown
                    size={25}
                    className={`transform transition-transform duration-200 ${
                      showDropdown ? "rotate-180" : ""
                    }`}
                  />
                </div>
              </button>
            </div>

            {showDropdown && (
              <ul className="w-full bg-white border absolute z-10 border-gray-300 rounded-md shadow-md">
                {filteredOptions.length > 0 ? (
                  filteredOptions.map((item, index) => (
                    <li
                      key={index}
                      className="px-4 py-2 hover:bg-curawell/40 cursor-pointer transition-all ease-in-out "
                      onClick={() => handleSelect(item)}
                    >
                      {item}
                    </li>
                  ))
                ) : (
                  <li className="px-4 py-2 text-gray-500">No results found</li>
                )}
              </ul>
            )}
          </div>

          {/* Doctors */}
          <div className="realtive">
            <div
              className={`flex p-3 mx-5 relative text-curawell font-cairo items-center border-2 rounded-md border-curawell focus-within:ring-2 focus-within:ring-curawell ${
                doctorsDisabled
                  ? "bg-gray-100 opacity-60 cursor-not-allowed"
                  : ""
              }`}
            >
              <input
                type="text"
                className="w-full focus:outline-none"
                placeholder="Doctors"
                value={query1}
                onChange={handleInputChange1}
                onClick={() => !doctorsDisabled && setShowDropdown1(true)}
                disabled={doctorsDisabled}
              />
              <button
                type="button"
                onClick={toggleDropdown1}
                className="ml-2 text-white focus:outline-none"
                disabled={doctorsDisabled}
              >
                <div className="bg-curawell absolute right-0 top-0 w-20 h-12 flex items-center justify-center">
                  <ChevronDown
                    size={25}
                    className={`transform transition-transform duration-200 ${
                      showDropdown1 ? "rotate-180" : ""
                    }`}
                  />
                </div>
              </button>
            </div>
            {showDropdown1 && !doctorsDisabled && (
              <ul className="w-[359px] bg-white border absolute z-10 border-gray-300 rounded-md shadow-md">
                {filteredOptions1.length > 0 ? (
                  filteredOptions1.map((item, index) => (
                    <li
                      key={index}
                      className="px-4 py-2 hover:bg-blue-100 cursor-pointer"
                      onClick={() => handleSelect1(item)}
                    >
                      {item}
                    </li>
                  ))
                ) : (
                  <li className="px-4 py-2 text-gray-500">No results found</li>
                )}
              </ul>
            )}
          </div>

          {/* Taxi Order / Location */}
          <div className="mx-5 mt-5">
            <label className="flex items-center gap-2 mb-4 text-sm cursor-pointer">
              <input
                type="checkbox"
                className="hidden"
                checked={enableWebsite}
                onChange={(e) => setEnableWebsite(e.target.checked)}
              />
              <span
                className={`w-5 h-5 border rounded-sm flex items-center justify-center ${
                  enableWebsite ? "bg-curawell text-white" : "border-gray-400 "
                }`}
              >
                {enableWebsite && <Check size={15} />}
              </span>
              <span className="font-cairo">Taxi Order</span>
            </label>
            <div
              className={`flex p-3 relative text-curawell font-cairo items-center border-2 rounded-md border-curawell ${
                !enableWebsite
                  ? "bg-gray-100 opacity-60 cursor-not-allowed "
                  : ""
              }`}
            >
              <input
                type="text"
                className="w-full focus:outline-none text-curawell"
                placeholder="Location"
                value={enableWebsite ? location : ""}
                onChange={(e) => setlocation(e.target.value)}
                disabled={!enableWebsite}
              />
            </div>
          </div>
        </div>

        {/* Calendar */}
        <div className="w-1/3">
          <h1 className="font-cairo text-xl">Day :</h1>
          <DayPicker
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            showOutsideDays
            disabled={[
              { before: today },
              !canPickDay ? () => true : undefined,
            ].filter(Boolean)}
            classNames={{
              nav: `${defaultClassNames.nav}`,
              button_next: `${defaultClassNames.button_next} !text-gray-500 hover:!text-gray-600`,
              button_previous: `${defaultClassNames.button_previous} !text-gray-500 hover:!text-gray-600`,
              weekdays: ` text-curawell`,
              weekday: `   p-1 font-[500] text-sm  text-curawell`,
              today: "text-curawell font-bold ",
              selected: `rounded-full outline-2 outline-curawell text-curawell font-bold text-center `,
              root: `${defaultClassNames.root}  p-5`,
              chevron: `text-gray-500 hover:text-gray-600 fill-[#9095a0] `,
              outside: "text-gray-300",
            }}
          />
        </div>

        {/* Times & Submit */}
        <div className="w-1/3 flex flex-col">
          <h1 className="font-cairo text-xl mb-3">Date:</h1>
          <div className="rounded-lg py-4 px-10 w-full max-w-sm min-h-[280px] overflow-auto h-48">
            {!selectedDate ? (
              <p className="text-gray-500">
                Select a day to see available times.
              </p>
            ) : status1 === "loading" ? (
              <div className=" flex justify-center items-center h-full">
                <LogoLoader size={62} speed={1.2} />
              </div>
            ) : times.length === 0 ? (
              <p className="text-gray-500">
                No times for {toYMD(selectedDate)}.
              </p>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                {times.map((s, i) => {
                  console.log(s.status);
                  const isAvailable = s.status == 1 ? false : true;
                  const isSelected = selectedSlot === s.from;
                  return (
                    <button
                      key={i}
                      type="button"
                      disabled={!isAvailable}
                      onClick={() => {
                        if (!isAvailable) return;
                        setSelectedSlot(s.from);
                        setselectedTime?.(s.id);
                      }}
                      className={`rounded-md py-2 text-[17px] mx-4 text-center transition ${
                        !isAvailable
                          ? "bg-gray-100 text-gray-300 cursor-not-allowed"
                          : isSelected
                          ? "border-curawell ring-1 text-curawell ring-curawell bg-curawell/20"
                          : "hover:border-curawell bg-gray-100 hover:bg-curawell/10 cursor-pointer"
                      }`}
                    >
                      {s.from}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          <div className="flex w-full items-end justify-end ">
            <button
              onClick={handelSubmit}
              disabled={
                !(phone && query && query1 && selectedDate && selectedSlot)
              }
              className={` w-[150px] text-white rounded-lg p-2 ${
                phone && query && query1 && selectedDate && selectedSlot
                  ? "bg-curawell hover:bg-curawell/50 hover:mt-2 transition-all ease-in-out duration-300 cursor-pointer"
                  : "bg-curawell/50 cursor-not-allowed"
              }`}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
      {/* Small Container Over Image */}
    </div>
  );
}

BookingPanel.propTypes = {
  imageSrc: PropTypes.string.isRequired,
  defaultClassNames: PropTypes.object.isRequired,
  phone: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  setPhone: PropTypes.func.isRequired,
  query: PropTypes.string.isRequired,
  setQuery: PropTypes.func.isRequired,
  showDropdown: PropTypes.bool.isRequired,
  setShowDropdown: PropTypes.func.isRequired,
  filteredOptions: PropTypes.array.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  toggleDropdown: PropTypes.func.isRequired,
  handleSelect: PropTypes.func.isRequired,
  doctorsDisabled: PropTypes.bool.isRequired,
  query1: PropTypes.string.isRequired,
  setQuery1: PropTypes.func.isRequired,
  showDropdown1: PropTypes.bool.isRequired,
  setShowDropdown1: PropTypes.func.isRequired,
  filteredOptions1: PropTypes.array.isRequired,
  handleInputChange1: PropTypes.func.isRequired,
  toggleDropdown1: PropTypes.func.isRequired,
  handleSelect1: PropTypes.func.isRequired,
  enableWebsite: PropTypes.bool.isRequired,
  setEnableWebsite: PropTypes.func.isRequired,
  location: PropTypes.string.isRequired,
  setlocation: PropTypes.func.isRequired,
  today: PropTypes.instanceOf(Date).isRequired,
  selectedDate: PropTypes.instanceOf(Date),
  setSelectedDate: PropTypes.func.isRequired,
  status1: PropTypes.string.isRequired,
  times: PropTypes.array.isRequired,
  selectedSlot: PropTypes.string,
  setSelectedSlot: PropTypes.func.isRequired,
  setselectedTime: PropTypes.func,
  toYMD: PropTypes.func.isRequired,
  handelSubmit: PropTypes.func.isRequired,
};
