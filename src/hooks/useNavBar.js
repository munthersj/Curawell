import { useState } from "react";

export default function useNavBar() {
  const [listIsClicked, setListIsClicked] = useState({
    service: false,
    clinics: false,
    our: false,
    about: false,
  });
  const [showBar, setShowBar] = useState(false);
  return {
    listIsClicked,
    setListIsClicked,
    showBar,
    setShowBar,
  };
}
