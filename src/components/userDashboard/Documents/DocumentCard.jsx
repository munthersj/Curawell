// DocumentCard.jsx
import { Download } from "lucide-react";
import { useState } from "react";
import DocumentDetails from "./DocumentDetails";

export default function DocumentCard({ title, date, status, imageUrl }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [downloading, setDownloading] = useState(false);

  const statusStyles = {
    prepared: { bg: "bg-[#24A99C38]", text: "text-[#28BBACFF]" }, // تركواز
    completed: { bg: "bg-[#24A99C38]", text: "text-[#28BBACFF]" }, // تركواز
    canceled: { bg: "bg-[#972F6A38]", text: "text-[#972F6AFF]" }, // بنفسجي
    pending: { bg: "bg-[#F59E0B1A]", text: "text-[#B45309]" }, // كهرماني
    done: { bg: "bg-[#24A99C38]", text: "text-[#28BBACFF]" }, // (لو اجت)
    suspended: { bg: "bg-gray-100", text: "text-gray-600" }, // رمادي
    default: { bg: "bg-gray-100", text: "text-gray-500" },
  };
  const styleKey = (status || "").toLowerCase();
  const style = statusStyles[styleKey] || statusStyles.default;

  const canOpen = !!imageUrl;

  const toProxyPath = (url) => {
    if (!url) return url;
    try {
      const u = new URL(url);
      // ما منعدل غير مسار /storage
      return u.pathname.startsWith("/storage") ? u.pathname + u.search : url;
    } catch {
      return url; // لو مش URL كامل
    }
  };
  const handleDownload = async () => {
    if (!imageUrl || downloading) return;
    setDownloading(true);
    try {
      const proxied = toProxyPath(imageUrl);
      const res = await fetch(proxied, { credentials: "include" }); // صار نفس الأصل
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const blob = await res.blob();

      let filename =
        res.headers
          .get("content-disposition")
          ?.match(/filename\*?=(?:UTF-8'')?["']?([^"';]+)/i)?.[1] ||
        (toProxyPath(imageUrl).split("/").pop() ?? "") ||
        title ||
        "radiology";

      if (!/\.[a-z0-9]+$/i.test(filename)) {
        const extMap = {
          "image/jpeg": "jpg",
          "image/png": "png",
          "image/webp": "webp",
          "application/pdf": "pdf",
        };
        const ext = extMap[blob.type] || "";
        filename += ext ? `.${ext}` : "";
      }

      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = decodeURIComponent(filename);
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    } catch (e) {
      console.error(e);
      alert("Couldn't download the file.");
    } finally {
      setDownloading(false);
    }
  };

  return (
    <>
      <div
        onClick={() => (canOpen ? setIsModalOpen(true) : null)}
        className={`w-60 h-45 bg-white rounded-2xl shadow-md p-5 pl-[25px] flex flex-col justify-between transition hover:shadow-2xl ${
          canOpen ? "cursor-pointer" : "opacity-60 cursor-not-allowed"
        }`}
        title={canOpen ? "Open preview" : "No image available"}
      >
        {/* Top Row */}
        <div className="flex justify-between items-start">
          <svg
            /* folder icon */ xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="#8B4A6C"
            className="w-15 h-15 mt-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 7.5V6a2.25 2.25 0 012.25-2.25h4.13c.49 0 .96.175 1.33.494l1.62 1.44h6.42A2.25 2.25 0 0121 7.5v9A2.25 2.25 0 0118.75 18.75H5.25A2.25 2.25 0 013 16.5v-9z"
            />
          </svg>

          {canOpen && (
            <button
              className="text-gray-500 w-5 h-7"
              onClick={(e) => {
                e.stopPropagation(); // ما نفتح المودال
                handleDownload();
              }}
              title={downloading ? "Downloading..." : "Download"}
              disabled={downloading}
            >
              <Download
                className={`w-5 h-7 ${downloading ? "opacity-50" : ""}`}
              />
            </button>
          )}
        </div>

        {/* Middle Text */}
        <div>
          <h3 className="text-[#8B4A6C] font-medium line-clamp-1">{title}</h3>
          <p className="text-gray-500 text-sm">{date}</p>
        </div>

        {/* Status Tag */}
        <div
          className={`self-end px-3 py-1 rounded-full text-xs font-medium ${style.bg} ${style.text}`}
        >
          {status}
        </div>
      </div>

      {isModalOpen && canOpen && (
        <DocumentDetails
          imageUrl={imageUrl}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
}
