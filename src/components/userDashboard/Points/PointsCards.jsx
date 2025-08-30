import { useEffect, useState } from "react";
import { PieChart, Pie, Cell } from "recharts";

export default function PointsCards({ pointsD }) {
  const [points, setPoints] = useState(0);

  // Animate points count from 0 to 507
  useEffect(() => {
    let start = 0;
    const end = pointsD.sum_points;
    const duration = 900;
    const stepTime = Math.abs(Math.floor(duration / end));
    const timer = setInterval(() => {
      if (end == 0) return 0;
      start += 1;
      setPoints(start);
      if (start === end) clearInterval(timer);
    }, stepTime);
    return () => clearInterval(timer);
  }, []);

  // Used vs total points
  const used = pointsD.sum_point_replaced;
  const total = pointsD.sum_points;
  const percent = total == 0 ? 0 : Math.round((used / total) * 100);

  const data = [
    { name: "progress", value: percent },
    { name: "remaining", value: 100 - percent },
  ];

  const COLORS = ["#24A99CFF", "#E5E7EB"]; // teal + light gray

  return (
    <div className="bg-white rounded-2xl shadow-md p-6  flex items-center justify-between font-sans w-full max-w-[970px] mx-auto">
      {/* Left Side - Total Points */}
      <div className="flex flex-col justify-between">
        <p className="text-gray-600 text-lg">Total Points Count</p>
        <div className="flex items-baseline mt-4 mb-5">
          <span className="text-6xl font-bold text-black">{points}</span>
          <span className="ml-2 text-[#972F6AFF] text-lg">Points</span>
        </div>
        {/* <p className="text-sm text-[#24A99CFF] mt-5">
          Last Updated in 19, Jun 2025
        </p> */}
      </div>

      {/* Vertical Separator */}
      <div className="h-24 w-px bg-gray-200 mx-6 ml-45"></div>
      {/* 🔼 زودنا الـ ml-12 لحتى يبعد أكتر عن النص اليسار 
          فيك تصغرو أو تكبرو حسب ما بدك */}

      {/* Right Side - Used Points */}
      <div className="flex items-center justify-between flex-1">
        {/* Left column */}
        <div>
          <p className="text-gray-600 text-xl mb-8">Used Points</p>
          <div className="flex items-baseline mt-1">
            <span className="text-5xl font-bold text-black">{used}</span>
            <span className="ml-2 text-[#972F6AFF] text-lg">Points</span>
          </div>
          <p className="text-sm text-[#972F6AFF] mt-3">
            Left : {total - used} Points
          </p>
        </div>

        {/* Right column - Donut chart */}
        <div className="w-32 h-32 relative">
          <PieChart width={130} height={130}>
            <Pie
              data={data}
              dataKey="value"
              innerRadius={50}
              outerRadius={60}
              startAngle={90}
              endAngle={-270}
              stroke="none"
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index]}
                  strokeLinecap="round"
                />
              ))}
            </Pie>
          </PieChart>
          <div className="absolute flex items-center justify-center w-32 h-32 top-0 left-0">
            <span className="text-3xl font-bold text-[#24A99CFF]">
              {percent}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
