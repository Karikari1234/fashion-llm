// Dashboard Page Placeholder
export default function DashboardPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="gradient-text mb-8">Fashion Style Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="card">
          <h3 className="mb-4">Style Profile</h3>
          <p className="text-neutral-600">
            Your personal style profile will appear here.
          </p>
        </div>
        <div className="card">
          <h3 className="mb-4">AI Recommendations</h3>
          <p className="text-neutral-600">
            Personalized fashion recommendations will appear here.
          </p>
        </div>
        <div className="card">
          <h3 className="mb-4">Virtual Try-On</h3>
          <p className="text-neutral-600">
            Try on different outfits virtually here.
          </p>
        </div>
      </div>
    </div>
  );
}
