// DocumentsPage.jsx
import { useEffect, useMemo, useState } from "react";
import SideBar from "../SideBar";
import TopBar from "../TopBar";
import DocumentCard from "./Documents/DocumentCard";
import {
  fetchRadiograohys,
  fetchAnalyses,
} from "../../features/data/dashboard/documentsSlice";
import { useDispatch, useSelector } from "react-redux";
import LogoLoader from "../LogoLoader";
export default function DocumentsPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchRadiograohys());
    dispatch(fetchAnalyses());
  }, [dispatch]);

  const { radiograhy, status, analyses } = useSelector((s) => s.documentsData);
  console.log(radiograhy);
  // 🔽 نفكّك التجميع حسب الحالة ⇒ مصفوفة واحدة
  const radiologyDocs = useMemo(() => {
    // radiograhy ممكن تكون نفسها الأوبجكت أو جواتها data
    const groups =
      (radiograhy && typeof radiograhy === "object" && radiograhy.data) ||
      radiograhy ||
      {};

    // groups = { Canceled: [...], Prepared: [...] }
    const flat = Object.entries(groups)
      .filter(([, arr]) => Array.isArray(arr))
      .flatMap(([status, arr]) =>
        arr.map((item) => ({
          id: item.id,
          title: item.radiology_image_name || item.bill_number || "Radiology",
          date: item.date, // "YYYY-MM-DD"
          status: status, // "Prepared" | "Canceled"
          imageUrl:
            Array.isArray(item.reports) && item.reports[0]?.file_path
              ? item.reports[0].file_path
              : null,
        }))
      );

    // أحدث تاريخ أولاً
    flat.sort((a, b) => new Date(b.date) - new Date(a.date));
    return flat;
  }, [radiograhy]);
  const laboratoryDocs = useMemo(() => {
    const groups =
      (analyses && typeof analyses === "object" && analyses.data) ||
      analyses ||
      {};
    // groups = { Completed: [...], Pending: [...] }
    const flat = Object.entries(groups)
      .filter(([, arr]) => Array.isArray(arr))
      .flatMap(([status, arr]) =>
        arr.map((item) => ({
          id: item.id,
          title: item.name || `Analysis #${item.id}`,
          // ما شفت date صريحة بالمثال → جرّبت date ثم created_at وإلا فراغ
          date: item.date || item.created_at || "",
          status: status, // Completed | Pending
          imageUrl:
            Array.isArray(item.reports) && item.reports[0]?.file_path
              ? item.reports[0].file_path
              : null, // بتتحكّم بفتح المودال/التحميل
        }))
      );
    flat.sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0));
    return flat;
  }, [analyses]);
  // الديمو تبع Laboratory خليه مثل ما هو (أو صفّره إذا بدك)
  // const laboratoryDocs = [
  //   { title: "Urine test", date: "12/10/2024", status: "pending" },
  //   { title: "Urine test", date: "12/10/2024", status: "done" },
  //   { title: "Urine test", date: "12/10/2024", status: "suspended" },
  //   { title: "Urine test", date: "12/10/2024", status: "pending" },
  // ];

  const [showAllLab, setShowAllLab] = useState(false);
  const [showAllRad, setShowAllRad] = useState(false);

  const displayedLabDocs = showAllLab
    ? laboratoryDocs
    : laboratoryDocs.slice(0, 4);
  const displayedRadDocs = showAllRad
    ? radiologyDocs
    : radiologyDocs.slice(0, 8);
  console.log(displayedLabDocs);
  return (
    <div className="relative min-h-screen bg-[#F3F4F6] flex">
      <SideBar />
      <div className="flex-1 flex flex-col ml-[225px] overflow-y-auto h-screen">
        <TopBar />

        <div className="px-6 py-4 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-black">Documents</h1>
        </div>

        <div className="px-16 pb-10 space-y-8">
          {/* Laboratory */}
          <div className="mt-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-700">
                Laboratory
              </h2>
              {laboratoryDocs.length > 4 && (
                <button
                  onClick={() => setShowAllLab((v) => !v)}
                  className="text-[#28BBACFF] text-sm font-medium hover:underline mx-9"
                >
                  {showAllLab ? "View Less" : "View All"}
                </button>
              )}
            </div>

            {status == "loading" ? (
              <div className="flex items-center w-full h-full justify-center">
                <LogoLoader size={42} speed={1.2} />
              </div>
            ) : laboratoryDocs.length === 0 ? (
              <p className="text-gray-400 italic">No documents</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {displayedLabDocs.map((doc, idx) => (
                  <DocumentCard
                    key={idx}
                    title={doc.title}
                    date={doc.date}
                    status={doc.status}
                    imageUrl={doc.imageUrl} // مافي صور للمختبر هون
                    openOnlyIfStatus={["Completed"]} // ⬅️ بس الـ Completed بيفتح
                  />
                ))}
              </div>
            )}
          </div>

          <hr className="my-4 mt-15 mb-8 border-t-2 border-[#bcc1ca58] w-5/6 mx-auto" />

          {/* Radiology */}
          <div className="mt-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-700">Radiology</h2>
              {radiologyDocs.length > 8 && (
                <button
                  onClick={() => setShowAllRad((v) => !v)}
                  className="text-[#28BBACFF] text-sm font-medium hover:underline mx-9"
                >
                  {showAllRad ? "View Less" : "View All"}
                </button>
              )}
            </div>

            {status == "loading" ? (
              <div className="flex items-center w-full h-full justify-center">
                <LogoLoader size={42} speed={1.2} />
              </div>
            ) : radiologyDocs.length === 0 ? (
              <p className="text-gray-400 italic">No documents</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {displayedRadDocs.map((doc) => (
                  <DocumentCard
                    key={doc.id}
                    title={doc.title}
                    date={doc.date}
                    status={doc.status}
                    imageUrl={doc.imageUrl}
                    openOnlyIfStatus={["Prepared"]} // ممكن تكون null إذا ما في تقرير
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
