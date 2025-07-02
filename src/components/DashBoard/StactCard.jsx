import React from "react";
import { bgVariants } from "../../utils/helpers/helperData";

const StatCard = ({ title, value, icon: Icon, color, subtitle, loading }) => {
  const bgColor = bgVariants[color] || "bg-gray-100";

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-300 relative">
      <div className="absolute top-2 right-2">
        <img
          src="https://smarthr.dreamstechnologies.com/react/template/src/assets/img/bg/card-bg-04.png"
          alt={"cardbg"}
          className="w-10 h-12 rounded object-cover"
        />
      </div>

      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className={`text-2xl font-bold ${color}`}>
            {loading ? <div className="loader" /> : value || 0}
          </p>
          {subtitle && <p className="text-xs text-gray-500 mt-1">{subtitle}</p>}
        </div>
        <div className={`p-2 rounded-full ${bgColor}`}>
          <Icon className={`h-8 w-8 ${color}`} />
        </div>
      </div>
    </div>
  );
};

export default StatCard;
