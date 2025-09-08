

export function ChatHeader({ title = "🤖 AI Chat Assistant" }) {
  return (
    <div className="bg-gray-900 border-b border-gray-700 p-3 sm:p-4 mt-14">
      <h1 className="text-lg sm:text-xl font-semibold text-center text-white">
        {title}
      </h1>
    </div>
  );
}