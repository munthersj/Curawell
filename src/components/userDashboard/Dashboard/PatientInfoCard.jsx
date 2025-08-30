/* eslint-disable no-unused-vars */
import { MapPin, Phone, Heart, Users2, PenLine } from "lucide-react";
import LogoLoader from "../../LogoLoader";
export default function PatientProfileCard({
  profileData,
  status,
  isEditing,
  formData,
  handleChange,
  formatList,
  toggleEdit,
  scrollRef,
  saveStatus,
}) {
  return (
    <div className="transition-transform duration-300 hover:scale-105 w-fit rounded-2xl overflow-hidden shadow">
      <div className="bg-white rounded-2xl text-center w-[370px] h-[600px] relative">
        <button
          onClick={toggleEdit}
          className="absolute top-4 right-4 z-20 text-sm px-3 py-1 bg-[#28BBAC3B] text-[#28BBACFF] rounded hover:bg-[#28BBACFF] hover:text-white transition"
        >
          {isEditing
            ? saveStatus === "loading"
              ? "Saving..."
              : "Save"
            : "Edit"}
        </button>
        {status == "loading" || profileData == undefined ? (
          <div className="flex items-center w-full h-full justify-center">
            <LogoLoader size={42} speed={1.2} />
          </div>
        ) : (
          <div
            ref={scrollRef}
            className="absolute inset-0 overflow-y-auto custom-scrollbar"
            style={{ scrollbarGutter: "stable" }}
          >
            <div className="p-6 text-left">
              <div className="flex justify-center mt-2"></div>

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
                      {profileData.first_name}
                    </h2>
                    <p className="text-sm text-gray-500">
                      {profileData.gender + " / " + profileData.age}
                    </p>
                  </>
                )}
              </div>

              <div className="flex justify-around mt-4 text-sm text-gray-500">
                {profileData.patient == undefined
                  ? "  "
                  : ["blood", "height", "weight"].map((field, index) => (
                      <div key={index}>
                        <p className="capitalize">{field}</p>
                        {isEditing ? (
                          <input
                            value={formData[field]}
                            onChange={handleChange(field)}
                            className="text-pink-700 w-16 text-center border-b outline-none"
                          />
                        ) : (
                          <p className="text-[#972f6a]">
                            {field == "blood"
                              ? profileData.patient.medical_history.blood_group
                              : field == "height"
                              ? profileData.patient.medical_history.height
                              : profileData.patient.medical_history.weight}
                          </p>
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
                    <p>{profileData.address}</p>
                  )}
                </div>

                <hr className="my-2 border-t-2 border-[#F3F4F6] w-full mx-auto" />

                <div className="flex items-center gap-3">
                  <span className="bg-[#f3dbe9] p-1.5 rounded-lg">
                    <Phone size={16} color="#972f6a" />
                  </span>
                  {<p>{profileData.phone}</p>}
                </div>
              </div>

              <hr className="my-5 border-t-2 border-[#F3F4F6] w-5/6 mx-auto" />

              <div className="text-left text-sm space-y-3 pb-4">
                <p className="font-bold text-base text-gray-800">
                  Medical History
                </p>
                {[
                  ["chronic_diseases", Heart, "chronic diseases"],
                  ["hereditary_diseases", Users2, "hereditary diseases"],
                  ["new_diseases", Heart, "new diseases"],
                  ["allergies", Users2, "allergies"],
                ].map(([field, Icon, label], index) => {
                  // console.log(field);
                  return (
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
                            {profileData.patient == undefined
                              ? "loading.."
                              : formatList(
                                  field == "chronic_diseases"
                                    ? profileData.patient.medical_history
                                        .chronic_diseases
                                    : field == "hereditary_diseases"
                                    ? profileData.patient.medical_history
                                        .hereditary_diseases
                                    : field == "new_diseases"
                                    ? profileData.patient.medical_history
                                        .new_diseases
                                    : profileData.patient.medical_history
                                        .allergies
                                )}
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
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
