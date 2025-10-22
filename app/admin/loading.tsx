export default function AdminLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-blue-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-accent mx-auto mb-4"></div>
        <p className="text-darkBlue font-medium">Loading admin dashboard...</p>
      </div>
    </div>
  );
}
