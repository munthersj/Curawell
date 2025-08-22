/* eslint-disable no-unused-vars */
import { MapPin, Phone, Heart, Users2, PenLine } from "lucide-react";
import useUserDashboardSlice from "../../../hooks/useUserDashboard";

export default function PatientProfileCard() {
  const {
    isEditing,
    formData,
    handleChange,
    formatList,
    toggleEdit,
    scrollRef,
  } = useUserDashboardSlice();

  return (
    <div className="transition-transform duration-300 hover:scale-105 w-fit rounded-2xl overflow-hidden shadow">
      <div className="bg-white rounded-2xl text-center w-[370px] h-[600px] relative">
        <button
          onClick={toggleEdit}
          className="absolute top-4 right-4 z-20 text-sm px-3 py-1 bg-[#28BBAC3B] text-[#28BBACFF] rounded hover:bg-[#28BBACFF] hover:text-white transition"
        >
          {isEditing ? "Save" : "Edit"}
        </button>

        <div
          ref={scrollRef}
          className="absolute inset-0 overflow-y-auto custom-scrollbar"
          style={{ scrollbarGutter: "stable" }}
        >
          <div className="p-6 text-left">
            <div className="flex justify-center mt-2">
              <div className="w-20 h-20 bg-gray-300 rounded-full mb-4" />
            </div>

            <div className="text-center">
              {isEditing ? (
                <>
                  <input
                    className="w-full text-center font-bold text-xl text-black border-b mb-1 outline-none"
                    value={formData.name}
                    onChange={handleChange("name")}
                  />
                  <input
                    className="w-full text-center text-sm text-gray-500 border-b mb-3 outline-none"
                    value={formData.genderAge}
                    onChange={handleChange("genderAge")}
                  />
                </>
              ) : (
                <>
                  <h2 className="text-xl font-bold text-gray-800">
                    {formData.name}
                  </h2>
                  <p className="text-sm text-gray-500">{formData.genderAge}</p>
                </>
              )}
            </div>

            <div className="flex justify-around mt-4 text-sm text-gray-500">
              {["blood", "height", "weight"].map((field, index) => (
                <div key={index}>
                  <p className="capitalize">{field}</p>
                  {isEditing ? (
                    <input
                      value={formData[field]}
                      onChange={handleChange(field)}
                      className="text-pink-700 w-16 text-center border-b outline-none"
                    />
                  ) : (
                    <p className="text-[#972f6a]">{formData[field]}</p>
                  )}
                </div>
              ))}
            </div>

            <hr className="my-3 border-t-2 border-[#F3F4F6] w-5/6 mx-auto" />

            <div className="text-sm text-gray-700 space-y-3">
              <div className="flex items-center gap-3">
                <span className="bg-[#f3dbe9] p-1.5 rounded-lg">
                  <MapPin size={16} color="#972f6a" />
                </span>
                {isEditing ? (
                  <input
                    value={formData.location}
                    onChange={handleChange("location")}
                    className="w-full border-b outline-none"
                  />
                ) : (
                  <p>{formData.location}</p>
                )}
              </div>

              <hr className="my-2 border-t-2 border-[#F3F4F6] w-full mx-auto" />

              <div className="flex items-center gap-3">
                <span className="bg-[#f3dbe9] p-1.5 rounded-lg">
                  <Phone size={16} color="#972f6a" />
                </span>
                {isEditing ? (
                  <input
                    value={formData.phone}
                    onChange={handleChange("phone")}
                    className="w-full border-b outline-none"
                  />
                ) : (
                  <p>{formData.phone}</p>
                )}
              </div>
            </div>

            <hr className="my-5 border-t-2 border-[#F3F4F6] w-5/6 mx-auto" />

            <div className="text-left text-sm space-y-3 pb-4">
              <p className="font-bold text-base text-gray-800">
                Medical History
              </p>
              {[
                ["chronic", Heart, "chronic diseases"],
                ["hereditary", Users2, "hereditary diseases"],
                ["diseases", Heart, "new diseases"],
                ["allergies", Users2, "allergies"],
              ].map(([field, Icon, label], index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 min-h-[60px]"
                >
                  <div className="pt-1">
                    <Icon size={26} color="#972f6a" />
                  </div>
                  <div className="flex-1">
                    <p className="text-[#CE9DB9] font-semibold">{label}</p>
                    {isEditing ? (
                      <textarea
                        value={formData[field]}
                        onChange={handleChange(field)}
                        className="w-full border-b outline-none resize-none h-[60px]"
                      />
                    ) : (
                      <p className="break-words">
                        {formatList(formData[field])}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Local style for hiding scrollbar */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .custom-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
