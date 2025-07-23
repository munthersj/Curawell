import "./style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Menu } from "lucide-react";
import useNavBar from "../hooks/useNavBar";
import { ChevronRight } from "lucide-react";
export default function NavBar() {
  const { listIsClicked, setListIsClicked, showBar, setShowBar } = useNavBar();

  function handleServiceClick() {
    setListIsClicked({
      service: !listIsClicked.service,
      clinics: false,
      our: false,
      about: false,
    });
  }
  function handleClinicsClick() {
    setListIsClicked({
      service: false,
      clinics: !listIsClicked.clinics,
      our: false,
      about: false,
    });
  }
  function handleOurClick() {
    setListIsClicked({
      service: false,
      clinics: false,
      our: !listIsClicked.our,
      about: false,
    });
  }
  function handleAboutClick() {
    setListIsClicked({
      service: false,
      clinics: false,
      our: false,
      about: !listIsClicked.about,
    });
  }

  function handleShowBar() {
    setShowBar(!showBar);
    if (showBar == true) {
      setListIsClicked({
        service: false,
        clinics: false,
        our: false,
        about: false,
      });
    }
  }

  let arrowDegree = {
    serviceArrow: listIsClicked.service ? "-rotate-180" : "-rotate-90",
    clinicArrow: listIsClicked.clinics ? "-rotate-180" : "-rotate-90",
    ourArrow: listIsClicked.our ? "-rotate-180" : "-rotate-90",
    aboutArrow: listIsClicked.about ? "-rotate-180" : "-rotate-90",
  };
  let spanSize = {
    serviceSpanSize: listIsClicked.service ? "scale-105" : "scale-100",
    clinicSpanSize: listIsClicked.clinics ? "scale-105" : "scale-100",
    ourSpanSize: listIsClicked.our ? "scale-105" : "scale-100",
    aboutSpanSize: listIsClicked.about ? "scale-105" : "scale-100",
  };

  let barAppear = {
    barOpacity: showBar ? "opacity-100" : "opacity-0",
    barTransformY: showBar ? "-translate-y-0" : "-translate-y-100",
  };

  let smallListTranslate = {
    smallListServicesTranslate: listIsClicked.service ? "-left-35" : "left-5",
    smallListClinicsTranslate: listIsClicked.clinics ? "-left-33" : "left-5",
    smallListOurTranslate: listIsClicked.our ? "-left-32" : "left-5",
    smallListAboutTranslate: listIsClicked.about ? "-left-24" : "left-5",
  };

  let smallListOpacity = {
    smallListServicesOpacity: listIsClicked.service
      ? "opacity-100"
      : "opacity-0",
    smallListClinicsOpacity: listIsClicked.clinics
      ? "opacity-100"
      : "opacity-0",
    smallListOurOpacity: listIsClicked.our ? "opacity-100" : "opacity-0",
    smallListAboutOpacity: listIsClicked.about ? "opacity-100" : "opacity-0",
  };

  // console.log(smallListTranslate.smallListServicesTranslate);

  return (
    <>
      <nav className="bg-grayc fixed  text-curawell  flex justify-between sm:justify-around h-20  w-full shadow-lg z-50">
        {/* LOGO */}
        <div className="  px-5 flex sm:w-1/12 justify-center items-center ">
          <img
            src="src/assets/lo1go.png"
            alt="Registration"
            style={{ width: "50px", height: "50px" }}
          />
        </div>
        {/* LOGO */}
        {/* -------Mobile-Section------- */}
        <div className="flex sm:hidden justify-center items-center font-bold text-2xl">
          <span>Curawell</span>
        </div>
        {/* -------Mobile-Section------- */}
        {/* Nav List */}
        <div className="hidden sm:flex w-1/2 justify-center items-center ml-13">
          {/* List Nav List */}
          <ul className="flex justify-center items-center xl:gap-7 lg:gap-6 sm:gap-4 font-semibold h-full hover:cursor-pointer ">
            {/* Services */}
            <li className="flex items-center p-3 h-full text-xl relative group transition-all duration-300">
              <div className="flex items-center ">
                <span className="transition-all duration-300 mr-3">
                  Services
                </span>
                <div className="group-hover:rotate-90 group-hover:opacity-100 opacity-60 transition-all duration-300">
                  <ChevronRight />
                </div>
                <div className="absolute left-0 top-0 h-1 w-0 bg-curawell transition-all duration-300 group-hover:w-full"></div>
                <div className="opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto absolute -left-4  -bottom-65 group-hover:-bottom-63 bg-grayc flex justify-center items-center shadow-xl transition-all duration-300 ">
                  <ul className="flex flex-col w-full ">
                    <li className="relative flex justify-center px-5  py-5 hover:shadow-2xs lg:bg-grayc md:bg-red hover:bg-gray-100 transition-all duration-300 whitespace-nowrap border-b border-curawell ">
                      <a
                        className="text-[16px] font-normal"
                        href="#"
                        target="_blank"
                      >
                        First Service
                      </a>
                    </li>
                    <li className="relative flex justify-center px-5 py-5 bg-grayc hover:bg-gray-100 transition-all duration-300 whitespace-nowrap border-b border-curawell">
                      <a
                        className="text-[16px] font-normal"
                        href="#"
                        target="_blank"
                      >
                        Second Service
                      </a>
                    </li>
                    <li className="relative flex justify-center px-5 py-5 bg-grayc hover:bg-gray-100 transition-all duration-300 whitespace-nowrap border-b border-curawell">
                      <a
                        className="text-[16px] font-normal"
                        href="#"
                        target="_blank"
                      >
                        Third Service
                      </a>
                    </li>
                    <li className="relative flex justify-center px-5 py-5 bg-grayc hover:bg-gray-100 transition-all duration-300 whitespace-nowrap">
                      <a
                        className="text-[16px] font-normal"
                        href="#"
                        target="_blank"
                      >
                        Fourth Service
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </li>
            {/* Services */}
            {/* Clincis */}
            <li className="flex items-center lg:p-3 h-full text-xl relative group transition-all duration-300">
              <div className="flex items-center ">
                <span className="transition-all duration-300 mr-3">
                  Clinics
                </span>
                <div className="group-hover:rotate-90 group-hover:opacity-100 opacity-60 transition-all duration-300">
                  <ChevronRight />
                </div>
                <div className="absolute left-0 top-0 h-1 w-0 bg-curawell transition-all duration-300 group-hover:w-full"></div>
                <div className="opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto absolute -left-4  -bottom-65 group-hover:-bottom-63 bg-grayc flex justify-center items-center shadow-xl transition-all duration-300 ">
                  <ul className="flex flex-col w-full ">
                    <li className="relative flex justify-center px-5 py-5 hover:shadow-2xs bg-grayc hover:bg-gray-100 transition-all duration-300 whitespace-nowrap border-b border-curawell ">
                      <a
                        className="text-[16px] font-normal"
                        href="#"
                        target="_blank"
                      >
                        First Clinics
                      </a>
                    </li>
                    <li className="relative flex justify-center px-5 py-5 bg-grayc hover:bg-gray-100 transition-all duration-300 whitespace-nowrap border-b border-curawell">
                      <a
                        className="text-[16px] font-normal"
                        href="#"
                        target="_blank"
                      >
                        Second Clinics
                      </a>
                    </li>
                    <li className="relative flex justify-center px-5 py-5 bg-grayc hover:bg-gray-100 transition-all duration-300 whitespace-nowrap border-b border-curawell">
                      <a
                        className="text-[16px] font-normal"
                        href="#"
                        target="_blank"
                      >
                        Third Clinics
                      </a>
                    </li>
                    <li className="relative flex justify-center px-5 py-5 bg-grayc hover:bg-gray-100 transition-all duration-300 whitespace-nowrap">
                      <a
                        className="text-[16px] font-normal"
                        href="#"
                        target="_blank"
                      >
                        Fourth Clinics
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </li>
            {/* Clincis */}
            {/* Our Team */}
            <li className="flex items-center lg:p-3 h-full text-xl relative group transition-all duration-300">
              <div className="flex items-center ">
                <span className="transition-all duration-300 mr-3">
                  Our Team
                </span>
                <div className="group-hover:rotate-90 group-hover:opacity-100 opacity-60 transition-all duration-300">
                  <ChevronRight />
                </div>
                <div className="absolute left-0 top-0 h-1 w-0 bg-curawell transition-all duration-300 group-hover:w-full"></div>
                <div className="opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto absolute -left-1  -bottom-[193.6px] group-hover:-bottom-[189.6px] bg-grayc flex justify-center items-center shadow-xl transition-all duration-300 ">
                  <ul className="flex flex-col w-full ">
                    <li className="relative flex justify-center px-5 py-5 hover:shadow-2xs bg-grayc hover:bg-gray-100 transition-all duration-300 whitespace-nowrap border-b border-curawell ">
                      <a
                        className="text-[16px] font-normal"
                        href="#"
                        target="_blank"
                      >
                        Services
                      </a>
                    </li>
                    <li className="relative flex justify-center px-5 py-5 bg-grayc hover:bg-gray-100 transition-all duration-300 whitespace-nowrap border-b border-curawell">
                      <a
                        className="text-[16px] font-normal"
                        href="#"
                        target="_blank"
                      >
                        Achievements
                      </a>
                    </li>
                    <li className="relative flex justify-center px-5 py-5 bg-grayc hover:bg-gray-100 transition-all duration-300 whitespace-nowrap border-b border-curawell">
                      <a
                        className="text-[16px] font-normal"
                        href="#"
                        target="_blank"
                      >
                        Goals
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </li>
            {/* Our Team */}
            {/* About Us */}
            <li className="flex items-center lg:p-3 h-full text-xl relative group transition-all duration-300">
              <div className="flex items-center ">
                <span className="transition-all duration-300 mr-3">
                  About Us
                </span>
                <div className="group-hover:rotate-90 group-hover:opacity-100 opacity-60 transition-all duration-300">
                  <ChevronRight />
                </div>
                <div className="absolute left-0 top-0 h-1 w-0 bg-curawell transition-all duration-300 group-hover:w-full"></div>
                <div className="opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto absolute left-0  -bottom-65 group-hover:-bottom-63 bg-grayc flex justify-center items-center shadow-xl transition-all duration-300 ">
                  <ul className="flex flex-col w-full ">
                    <li className="relative flex justify-center px-8 py-5 hover:shadow-2xs bg-grayc hover:bg-gray-100 transition-all duration-300 whitespace-nowrap border-b border-curawell ">
                      <a
                        className="text-[16px] font-normal"
                        href="#"
                        target="_blank"
                      >
                        Groups
                      </a>
                    </li>
                    <li className="relative flex justify-center px-8 py-5 bg-grayc hover:bg-gray-100 transition-all duration-300 whitespace-nowrap border-b border-curawell">
                      <a
                        className="text-[16px] font-normal"
                        href="#"
                        target="_blank"
                      >
                        Company
                      </a>
                    </li>
                    <li className="relative flex justify-center px-8 py-5 bg-grayc hover:bg-gray-100 transition-all duration-300 whitespace-nowrap border-b border-curawell">
                      <a
                        className="text-[16px] font-normal"
                        href="#"
                        target="_blank"
                      >
                        Begin
                      </a>
                    </li>
                    <li className="relative flex justify-center px-8 py-5 bg-grayc hover:bg-gray-100 transition-all duration-300 whitespace-nowrap">
                      <a
                        className="text-[16px] font-normal"
                        href="#"
                        target="_blank"
                      >
                        Wishes
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </li>
            {/* About Us */}
          </ul>
          {/* List Nav List */}
        </div>
        {/* Nav List */}
        {/* Sign-up-Button */}
        <div className="hidden sm:flex w-1/6 justify-center items-center ">
          <button className="sign-up-b ">
            <span className="relative z-10">Your Dashboard</span>
          </button>
        </div>
        {/* Sign-up-Button */}
        {/* -------Mobile-Section------- */}
        {/* Bar Mobile */}
        <div
          className="flex sm:hidden justify-center items-center text-3xl px-7 "
          onClick={handleShowBar}
        >
          <Menu />
        </div>
        {/* Bar Mobile */}
        {/* Nav List Mobile */}
        <div
          className={`absolute sm:hidden ${barAppear.barOpacity} right-0 -bottom-92 -z-10  ${barAppear.barTransformY}     shadow-2xl font-medium text-lg transition-all duration-500`}
        >
          <ul className="flex flex-col  ">
            {/* Services */}
            <li
              onClick={handleServiceClick}
              className="flex justify-center px-6 py-8 bg-grayc relative border-b border-bg-curawell"
            >
              <div
                className={`flex justify-center  items-center group-hover:rotate-90 group-hover:opacity-100 opacity-60 transition-all duration-300  ${arrowDegree.serviceArrow} `}
              >
                <ChevronRight />
              </div>
              <span
                className={`ml-2 ${spanSize.serviceSpanSize} transition-all duration-300 `}
              >
                Services
              </span>
              {/* Services List */}
              <div
                className={` absolute ${smallListOpacity.smallListServicesOpacity}   ${smallListTranslate.smallListServicesTranslate} rounded-l-2xl top-1  -z-20  bg-curawell/90 drop   transition-all duration-500`}
              >
                <ul className="flex flex-col  justify-center items-center font-light text-1xs">
                  <li className="px-3 py-2  text-grayc">
                    <a href="#" target="_blank">
                      First Service{" "}
                    </a>
                  </li>
                  <hr className="bg-grayc h-0.5 w-full"></hr>
                  <li className="px-3 py-2 text-grayc  ">
                    <a href="#" target="_blank">
                      Second Service{" "}
                    </a>
                  </li>
                  <hr className="bg-grayc h-0.5 w-full"></hr>
                  <li className="px-3 py-2 text-grayc ">
                    <a href="#" target="_blank">
                      Third Service{" "}
                    </a>
                  </li>
                  <hr className="bg-grayc h-0.5 w-full"></hr>
                  <li className="px-3 py-2 text-grayc ">
                    <a href="#" target="_blank">
                      Fourth Service{" "}
                    </a>
                  </li>
                </ul>
              </div>
              {/* Services List */}
            </li>
            {/* Services */}
            {/* Clinics */}
            <li
              onClick={handleClinicsClick}
              className="flex justify-center px-6 py-8 bg-grayc relative border-b border-bg-curawell "
            >
              <div
                className={`flex justify-center  items-center group-hover:rotate-90 group-hover:opacity-100 opacity-60 transition-all duration-300  ${arrowDegree.clinicArrow}`}
              >
                <ChevronRight />
              </div>
              <span
                className={`ml-2 ${spanSize.clinicSpanSize} transition-all duration-300`}
              >
                Clinics
              </span>
              {/* Clinics List */}
              <div
                className={` absolute ${smallListOpacity.smallListClinicsOpacity}  ${smallListTranslate.smallListClinicsTranslate} rounded-l-2xl top-0  -z-20  bg-curawell/90 drop   transition-all duration-500`}
              >
                <ul className="flex flex-col  justify-center items-center font-light text-1xs">
                  <li className="px-3 py-2  text-grayc">
                    <a href="#" target="_blank">
                      First Clinics{" "}
                    </a>
                  </li>
                  <hr className="bg-grayc h-0.5 w-full"></hr>
                  <li className="px-3 py-2 text-grayc  ">
                    <a href="#" target="_blank">
                      Second Clinics{" "}
                    </a>
                  </li>
                  <hr className="bg-grayc h-0.5 w-full"></hr>
                  <li className="px-3 py-2 text-grayc ">
                    <a href="#" target="_blank">
                      Third Clinics{" "}
                    </a>
                  </li>
                  <hr className="bg-grayc h-0.5 w-full"></hr>
                  <li className="px-3 py-2 text-grayc ">
                    <a href="#" target="_blank">
                      Fourth Clinics{" "}
                    </a>
                  </li>
                </ul>
              </div>
              {/* Clinics List */}
            </li>
            {/* Clinics */}
            {/* Our Team */}
            <li
              onClick={handleOurClick}
              className="flex justify-center px-6 py-8 bg-grayc relative border-b border-bg-curawell "
            >
              <div
                className={`flex justify-center  items-center group-hover:rotate-90 group-hover:opacity-100 opacity-60 transition-all duration-300  ${arrowDegree.ourArrow}`}
              >
                <ChevronRight />
              </div>
              <span
                className={`ml-2 ${spanSize.ourSpanSize} transition-all duration-300`}
              >
                Our Team
              </span>
              {/* Our Team List */}
              <div
                className={` absolute ${smallListOpacity.smallListOurOpacity}  ${smallListTranslate.smallListOurTranslate} rounded-l-2xl top-0  -z-20  bg-curawell/90 drop   transition-all duration-500`}
              >
                <ul className="flex flex-col  justify-center items-center font-light text-1xs">
                  <li className="px-3 py-2  text-grayc">
                    <a href="#" target="_blank">
                      Services{" "}
                    </a>
                  </li>
                  <hr className="bg-grayc h-0.5 w-full"></hr>
                  <li className="px-3 py-2 text-grayc  ">
                    <a href="#" target="_blank">
                      Achievements{" "}
                    </a>
                  </li>
                  <hr className="bg-grayc h-0.5 w-full"></hr>
                  <li className="px-3 py-2 text-grayc ">
                    <a href="#" target="_blank">
                      Goals{" "}
                    </a>
                  </li>
                </ul>
              </div>
              {/* Our Team List */}
            </li>
            {/* Our Team */}
            {/* About Us */}
            <li
              onClick={handleAboutClick}
              className="flex justify-center px-6 py-8 bg-grayc relative border-b border-bg-curawell "
            >
              <div
                className={`flex justify-center items-center opacity-60 transition-all duration-300 ${arrowDegree.aboutArrow}`}
              >
                <ChevronRight />
              </div>
              <span
                className={`ml-2 ${spanSize.aboutSpanSize} transition-all duration-300`}
              >
                About Us
              </span>
              {/* About Us List */}
              <div
                className={` absolute ${smallListOpacity.smallListAboutOpacity}  ${smallListTranslate.smallListAboutTranslate} rounded-l-2xl top-0  -z-20  bg-curawell/90 drop   transition-all duration-500`}
              >
                <ul className="flex flex-col  justify-center items-center font-light text-1xs">
                  <li className="px-3 py-2  text-grayc">
                    {" "}
                    <a href="#" target="_blank">
                      Groups
                    </a>
                  </li>
                  <hr className="bg-grayc h-0.5 w-full"></hr>
                  <li className="px-3 py-2 text-grayc  ">
                    <a href="#" target="_blank">
                      Company
                    </a>
                  </li>
                  <hr className="bg-grayc h-0.5 w-full"></hr>
                  <li className="px-3 py-2 text-grayc ">
                    <a href="#" target="_blank">
                      begin
                    </a>
                  </li>
                  <hr className="bg-grayc h-0.5 w-full"></hr>
                  <li className="px-3 py-2 text-grayc  ">
                    <a href="#" target="_blank">
                      Wishes
                    </a>
                  </li>
                </ul>
              </div>
              {/* About Us List*/}
            </li>
            {/* Our Team */}
          </ul>
        </div>
        {/* Nav List Mobile */}

        {/* -------Mobile-Section------- */}
      </nav>
    </>
  );
}
