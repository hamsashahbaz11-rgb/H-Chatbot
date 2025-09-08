export function LoadingIndicator() {
  return (
    <div className="flex items-center space-x-1 sm:space-x-2">
      <div className="animate-spin rounded-full h-3 w-3 sm:h-4 sm:w-4 border-b-2 border-white"></div>
      <span className="text-sm sm:text-base">Sending...</span>
    </div>
  );
}