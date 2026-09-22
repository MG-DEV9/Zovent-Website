/** Shown while a lazy-loaded route's chunk is still being fetched on initial load. */
export default function RouteFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#FAF8F2' }}>
      <div className="w-5 h-5 border-2 border-[#670626] border-t-transparent rounded-full animate-spin" />
    </div>
  )
}
