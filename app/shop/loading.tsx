export default function Loading() {
  return (
    <div className="w-full min-h-screen bg-[#EDEEE7] flex flex-col text-black">
      {/* Hero Skeleton */}
      <div className="w-full h-[60vh] bg-black/5 animate-pulse flex items-center justify-center">
        <div className="w-1/3 h-12 bg-black/10 rounded-full"></div>
      </div>
      
      <div className="px-5 md:px-10 py-10">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Sidebar Skeleton */}
          <div className="w-full lg:w-64 flex flex-col gap-8">
            <div className="w-full h-8 bg-black/5 rounded animate-pulse"></div>
            <div className="w-full h-40 bg-black/5 rounded animate-pulse"></div>
            <div className="w-full h-40 bg-black/5 rounded animate-pulse"></div>
          </div>

          {/* Main Content Skeleton */}
          <main className="flex-1">
            <div className="flex flex-col gap-4 mb-12">
              <div className="w-48 h-4 bg-black/5 rounded animate-pulse"></div>
              <div className="w-64 h-12 bg-black/5 rounded animate-pulse"></div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="flex flex-col gap-4">
                  <div className="aspect-3/4 bg-black/5 rounded animate-pulse"></div>
                  <div className="w-full h-4 bg-black/5 rounded animate-pulse"></div>
                  <div className="w-1/2 h-4 bg-black/5 rounded animate-pulse"></div>
                </div>
              ))}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}