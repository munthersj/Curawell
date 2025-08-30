import { useEffect, useMemo, useState } from "react";
import { PieChart, Pie, Cell } from "recharts";
import LogoLoader from "../../LogoLoader";

export default function PieChartCard({ billsData, status }) {
  // ===== Helpers =====
  const mapRatesToDonut = (ratesInput) => {
    const rates = Array.isArray(ratesInput) ? ratesInput : [];
    const order = [
      { key: "clinic", name: "Clinics", color: "#14B8A6" },
      { key: "homeCar", name: "Home Care", color: "#A7F3D0" }, // المفتاح من الـ API: homeCar
      { key: "laboratory", name: "Lab", color: "#BE185D" },
      { key: "radiology", name: "Radiology", color: "#FCA5A5" },
    ];

    return order.map((o) => {
      const match = rates.find((r) => r?.department === o.key);
      const val = Number(match?.rate ?? 0);
      return { name: o.name, value: isNaN(val) ? 0 : val, color: o.color };
    });
  };

  // ===== Memoized data =====
  const donutData = useMemo(
    () => mapRatesToDonut(billsData?.rates),
    [billsData?.rates]
  );

  const totalBill = Number(billsData?.all_sum ?? 0);
  const paidBill = Number(billsData?.all_paid ?? 0);
  const leftBill = Math.max(0, totalBill - paidBill);

  const paidPercentage = useMemo(() => {
    if (!totalBill) return 0; // حماية من القسمة على صفر
    const p = Math.round((paidBill / totalBill) * 100);
    return Math.min(100, Math.max(0, p));
  }, [paidBill, totalBill]);

  // ===== Animated percentage =====
  const [animatedPercentage, setAnimatedPercentage] = useState(0);
  useEffect(() => {
    let start = 0;
    const duration = 800;
    const stepTime = 20;
    const increment = paidPercentage / (duration / stepTime || 1);

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

  // ===== Loading guard =====
  if (status === "loading" || !billsData) {
    return (
      <div className="flex items-center w-full h-full justify-center">
        <LogoLoader size={42} speed={1.2} />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Card 1: Total Bill */}
      <div className="bg-white rounded-2xl shadow-md p-6 flex items-center justify-between">
        {/* Left */}
        <div className="w-1/3">
          <p className="text-gray-500 text-sm">Total Bill</p>
          <p className="text-2xl font-bold text-gray-900">
            {totalBill.toLocaleString()} SP
          </p>
        </div>

        {/* Middle: Legend */}
        <div className="w-1/3 space-y-2">
          {donutData.map((item) => (
            <div key={item.name} className="flex items-center space-x-2">
              <span
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              <p className="text-sm text-gray-600">
                {item.name}: {item.value}%
              </p>
            </div>
          ))}
        </div>

        {/* Right: Donut */}
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

      {/* Card 2: Paid Bill (Animated Pie) */}
      <div className="bg-white rounded-2xl shadow-md p-6 flex items-center justify-between">
        {/* Left */}
        <div className="w-1/2">
          <p className="text-gray-500 text-sm">Paid Bill</p>
          <p className="text-2xl font-bold text-gray-900">
            {paidBill.toLocaleString()} SP
          </p>
          <p className="text-pink-600 text-xs mt-1">
            Left : {leftBill.toLocaleString()} SP
          </p>
        </div>

        {/* Right: Animated Pie */}
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
                  <Cell key={`cell-${index}`} fill={COLORS[index]} />
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
