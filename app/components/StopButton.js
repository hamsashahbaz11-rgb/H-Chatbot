export function StopButton({ onStop, loading }) {
  if (!loading) return null;

  return (
    <button
      onClick={onStop}
      className="flex items-center space-x-1 sm:space-x-2 px-3 py-1 sm:px-4 sm:py-2 bg-red-600 hover:bg-red-700 active:bg-red-800 text-white text-sm sm:text-base rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95"
      aria-label="Stop AI response"
    >
      {/* Stop icon - square shape */}
      <div className="w-2 h-2 sm:w-3 sm:h-3 bg-white rounded-sm"></div>
      <span className="font-medium">Stop Response</span>
    </button>
  );
}