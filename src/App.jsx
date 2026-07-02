function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <header className="bg-white shadow">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <h1 className="text-2xl font-bold text-indigo-600">
            CRM Dashboard
          </h1>

          <button className="rounded-lg bg-indigo-600 px-5 py-2 text-white transition hover:bg-indigo-700">
            Login
          </button>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <div>
            <p className="mb-3 text-indigo-600 font-semibold uppercase tracking-widest">
              Enterprise CRM
            </p>

            <h2 className="mb-6 text-5xl font-bold text-gray-900">
              Manage Customers,
              <br />
              Sales & Deals
              <span className="text-indigo-600"> Easily.</span>
            </h2>

            <p className="mb-8 text-lg text-gray-600">
              Build powerful customer relationships with an all-in-one CRM
              platform. Manage leads, deals, quotations, invoices, and reports
              from a single dashboard.
            </p>

            <div className="flex gap-4">
              <button className="rounded-lg bg-indigo-600 px-6 py-3 font-medium text-white hover:bg-indigo-700">
                Get Started
              </button>

              <button className="rounded-lg border border-gray-300 px-6 py-3 font-medium hover:bg-gray-100">
                Learn More
              </button>
            </div>
          </div>

          {/* Dashboard Preview */}
          <div className="rounded-2xl bg-white p-8 shadow-xl">
            <h3 className="mb-6 text-xl font-semibold">
              Dashboard Overview
            </h3>

            <div className="grid grid-cols-2 gap-5">
              <div className="rounded-xl bg-blue-50 p-5">
                <p className="text-sm text-gray-500">Customers</p>
                <h4 className="mt-2 text-3xl font-bold text-blue-600">
                  1,245
                </h4>
              </div>

              <div className="rounded-xl bg-green-50 p-5">
                <p className="text-sm text-gray-500">Leads</p>
                <h4 className="mt-2 text-3xl font-bold text-green-600">
                  326
                </h4>
              </div>

              <div className="rounded-xl bg-orange-50 p-5">
                <p className="text-sm text-gray-500">Deals</p>
                <h4 className="mt-2 text-3xl font-bold text-orange-600">
                  92
                </h4>
              </div>

              <div className="rounded-xl bg-purple-50 p-5">
                <p className="text-sm text-gray-500">Revenue</p>
                <h4 className="mt-2 text-3xl font-bold text-purple-600">
                  ₹14.5L
                </h4>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Cards */}
      <section className="mx-auto grid max-w-7xl gap-6 px-6 pb-16 md:grid-cols-3">
        <div className="rounded-xl bg-white p-6 shadow">
          <h3 className="mb-3 text-xl font-semibold">
            Customer Management
          </h3>

          <p className="text-gray-600">
            Store customer information, contacts, activities, and documents in
            one place.
          </p>
        </div>

        <div className="rounded-xl bg-white p-6 shadow">
          <h3 className="mb-3 text-xl font-semibold">
            Sales Pipeline
          </h3>

          <p className="text-gray-600">
            Track every lead from inquiry to closing with visual pipeline
            management.
          </p>
        </div>

        <div className="rounded-xl bg-white p-6 shadow">
          <h3 className="mb-3 text-xl font-semibold">
            Reports & Analytics
          </h3>

          <p className="text-gray-600">
            View sales reports, revenue charts, team performance, and customer
            insights.
          </p>
        </div>
      </section>
    </div>
  );
}

export default App;