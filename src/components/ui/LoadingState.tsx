const LoadingState = () => {
  return (
    <div className="flex items-center justify-center h-64">
      <div className="flex flex-col items-center gap-4">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        <p className="text-gray-500 text-sm">Fetching tasks from API...</p>
      </div>
    </div>
  );
};

export default LoadingState;