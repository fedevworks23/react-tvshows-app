function LoaderComponent() {
  return (
    <div className="flex flex-col justify-center items-center gap-4 w-full">
      <div className="flex justify-center items-center border-4 border-t-blue-400 border-transparent rounded-full w-20 h-20 text-blue-400 text-4xl animate-spin">
        <div className="flex justify-center items-center border-4 border-t-red-400 border-transparent rounded-full w-16 h-16 text-red-400 text-2xl animate-spin"></div>
      </div>
    </div>
  );
}

export default LoaderComponent;
