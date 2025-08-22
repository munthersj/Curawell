import { useEffect, useState } from "react";
import { PieChart, Pie, Cell } from "recharts";

export default function PieChartCard() {
  const donutData = [
    { name: "Clinics", value: 20, color: "#14B8A6" }, // Vibrant Teal
    { name: "Home Care", value: 20, color: "#A7F3D0" }, // Pale Cyan
    { name: "Lab", value: 20, color: "#BE185D" }, // Deep Magenta
    { name: "Radiology", value: 30, color: "#FCA5A5" }, // Dusty Rose
  ];

  const totalBill = 250000;
  const paidBill = 200000;
  const leftBill = totalBill - paidBill;
  const paidPercentage = Math.round((paidBill / totalBill) * 100);

  // Animated percentage state
  const [animatedPercentage, setAnimatedPercentage] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 800;
    const stepTime = 20;
    const increment = paidPercentage / (duration / stepTime);

    const interval = setInterval(() => {
      start += increment;
      if (start >= paidPercentage) {
        start = paidPercentage;
        clearInterval(interval);
      }
      setAnimatedPercentage(Math.round(start));
    }, stepTime);

    return () => clearInterval(interval);
  }, [paidPercentage]);

  const paidData = [
    { name: "Paid", value: animatedPercentage },
    { name: "Left", value: 100 - animatedPercentage },
  ];

  const COLORS = ["#14B8A6", "#E5E7EB"]; // teal & gray

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Card 1: Total Bill */}
      <div className="bg-white rounded-2xl shadow-md p-6 flex items-center justify-between">
        {/* Left Section */}
        <div className="w-1/3">
          <p className="text-gray-500 text-sm">Total Bill</p>
          <p className="text-2xl font-bold text-gray-900">
            {totalBill.toLocaleString()} SP
          </p>
          <p className="text-teal-600 text-xs mt-1">
            Last Updated in 19, jun 2025
          </p>
        </div>

        {/* Middle Section (Legend) */}
        <div className="w-1/3 space-y-2">
          {donutData.map((item) => (
            <div key={item.name} className="flex items-center space-x-2">
              <span
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: item.color }}
              ></span>
              <p className="text-sm text-gray-600">
                {item.name}: {item.value}%
              </p>
            </div>
          ))}
        </div>

        {/* Right Section (Donut Chart) */}
        <div className="w-1/3 flex justify-center">
          <PieChart width={120} height={120}>
            <Pie
              data={donutData}
              innerRadius={45}
              outerRadius={55}
              dataKey="value"
              stroke="none"
            >
              {donutData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </div>
      </div>

      {/* Card 2: Paid Bill (Animated PieChart) */}
      <div className="bg-white rounded-2xl shadow-md p-6 flex items-center justify-between">
        {/* Left Section */}
        <div className="w-1/2">
          <p className="text-gray-500 text-sm">Paid Bill</p>
          <p className="text-2xl font-bold text-gray-900">
            {paidBill.toLocaleString()} SP
          </p>
          <p className="text-pink-600 text-xs mt-1">
            Left : {leftBill.toLocaleString()} SP
          </p>
        </div>

        {/* Right Section (Animated PieChart) */}
        <div className="w-1/2 flex justify-center">
          <div className="relative w-[140px] h-[140px]">
            <PieChart width={140} height={140}>
              <Pie
                data={paidData}
                dataKey="value"
                startAngle={90}
                endAngle={-270}
                innerRadius={50}
                outerRadius={60}
                stroke="none"
                isAnimationActive={false}
              >
                {paidData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index]}
                    strokeLinecap="round"
                  />
                ))}
              </Pie>
            </PieChart>

            {/* Center Percentage */}
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="text-3xl font-bold text-teal-500">
                {animatedPercentage}%
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
