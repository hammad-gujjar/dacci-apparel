export default function Loading() {
  return (
    <div className="min-h-screen bg-[#EDEEE7] pt-24 pb-20 px-4 md:px-12">
      <div className="max-w-full mx-auto">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-15">
          {/* Gallery Skeleton */}
          <div className="w-full lg:w-[60%] flex flex-col gap-6">
            <div className="aspect-4/5 bg-black/5 rounded-[1.5vw] animate-pulse"></div>
            <div className="grid grid-cols-4 gap-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="aspect-square bg-black/5 rounded-[1vw] animate-pulse"></div>
              ))}
            </div>
          </div>

          {/* Info Skeleton */}
          <div className="flex-1 flex flex-col gap-8">
            <div className="flex flex-col gap-4">
              <div className="w-24 h-4 bg-black/5 rounded animate-pulse"></div>
              <div className="w-full h-16 bg-black/5 rounded animate-pulse"></div>
              <div className="w-32 h-6 bg-black/5 rounded animate-pulse"></div>
            </div>
            <div className="w-full h-32 bg-black/5 rounded animate-pulse"></div>
            <div className="w-full h-12 bg-black/10 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
