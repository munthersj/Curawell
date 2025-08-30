import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchNavSectionsData,
  fetchClinicsNavBar,
} from "../features/data/navBarSlice";
import { useNavigate } from "react-router-dom";
export default function useNavBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [listIsClicked, setListIsClicked] = useState({
    service: false,
    clinics: false,
    our: false,
    about: false,
  });

  useEffect(() => {
    dispatch(fetchNavSectionsData());
    dispatch(fetchClinicsNavBar());
  }, [dispatch]);
  const { sections, clinics } = useSelector((s) => s.navBarData);
  const [showBar, setShowBar] = useState(false);

  const handleSectionClick = (section) => {
    if (section.name_en == "Clinic") {
      navigate("/clinicsPage");
    }
    if (section.name_en == "HomeCare") {
      navigate(`/homeCare/${section.id}`);
    }
  };
  const handleClinicClick = (clinic) => {
    navigate(`/cosmeticClinic/${clinic.id}`);
  };

  return {
    listIsClicked,
    setListIsClicked,
    showBar,
    setShowBar,
    sections,
    handleSectionClick,
    handleClinicClick,
    clinics,
  };
}
