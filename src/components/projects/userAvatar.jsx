import React from "react";

export const ByNameAvater = (name) => {
  if (!name) return "";
  const trimmed = name.trim();
  if (trimmed.length === 1) return trimmed[0].toUpperCase();
  return trimmed[0].toUpperCase() + trimmed[trimmed.length - 1].toUpperCase();
};

const colors = [
  "bg-red-500",
  "bg-blue-500",
  "bg-green-500",
  "bg-purple-500",
  "bg-yellow-500",
  "bg-pink-500",
  "bg-indigo-500",
  "bg-orange-500",
];

const getColor = (id) => {
  let hash = 0;
  for (let i = 0; i < id.length; i++) {
    hash = id.charCodeAt(i) + ((hash << 5) - hash);
  }
  return colors[Math.abs(hash) % colors.length];
};

const SimpleAvatarList = ({ userDetails }) => {
  const uniqueUsers = Array.from(
    new Map(
      (userDetails || []).map((task) => [task.assignedTo?._id, task.assignedTo])
    )
  )
    .map(([_, user]) => user)
    .filter(Boolean);

  const displayUsers = uniqueUsers.slice(0, 5);
  const remainingCount = uniqueUsers.length - displayUsers.length;

  return (
    <div className="">
      <div className="flex items-center space-x-2">
        <div className="flex -space-x-2">
          {displayUsers.map((user) => (
            <div key={user._id}>
              {user.profileFileName ? (
                <img
                  src={`${import.meta.env.VITE_API_URL}upload/${
                    user.profileFileName
                  }`}
                  alt={user.userName || "User"}
                  className="w-10 h-10 rounded-full border-2 border-white object-cover"
                />
              ) : (
                <div
                  className={`w-10 h-10 ${getColor(
                    user._id
                  )} rounded-full border-2 border-white flex items-center justify-center text-white text-sm font-semibold`}
                >
                  {ByNameAvater(user.userName)}
                </div>
              )}
            </div>
          ))}
        </div>
        {remainingCount > 0 && (
          <span className="text-sm text-gray-500">
            +{remainingCount.toString().padStart(2, "0")}
          </span>
        )}
      </div>
    </div>
  );
};

export default SimpleAvatarList;
