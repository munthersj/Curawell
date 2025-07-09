import { useRef, useState } from "react";
// import { useDispatch } from "react-redux";
// import { setUserImage } from "../features/auth/authSlice"; // فرضًا عندك هذا

export default function UploadAvatar() {
  const [preview, setPreview] = useState(null);
  const fileInputRef = useRef(null);
  // const dispatch = useDispatch();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setPreview(imageURL);
      // dispatch(setUserImage(file)); // أرسل الصورة إلى الريدوكس أو الفورم
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative">
        {/* صورة الأفاتار */}
        <img
          src={
            preview ||
            "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"
          }
          alt="Avatar"
          className="w-24 h-24 rounded-full border object-cover"
        />

        {/* زر الإضافة الدائري الصغير */}
        <button
          type="button"
          onClick={() => fileInputRef.current.click()}
          className="absolute bottom-0 right-0 bg-teal-500 text-white rounded-full p-1 hover:bg-teal-600"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 4v16m8-8H4"
            />
          </svg>
        </button>

        {/* الحقل المخفي */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleImageChange}
        />
      </div>
      <p className="text-sm text-gray-600 mt-2">Add photo</p>
    </div>
  );
}
