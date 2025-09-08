export function MessageAvatar({ role }) {
  const isUser = role === "user";
  
  return (
    <div className="flex-shrink-0 h-6 w-6 sm:h-8 sm:w-8 rounded-full flex items-center justify-center mr-1 sm:mr-2 ml-0">
      <div
        className={`h-6 w-6 sm:h-8 sm:w-8 rounded-full flex items-center justify-center text-xs font-medium ${isUser ? "bg-blue-500" : "bg-green-500"} text-white`}
      >
        {isUser ? "You" : "AI"}
      </div>
    </div>
  );
}
