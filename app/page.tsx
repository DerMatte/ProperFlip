import Hero from "@/components/hero";

export default async function Home() {
  return (
    <>
      <Hero />
      <main className="flex-1 flex flex-col gap-6 px-4">
        <section id="features" className="py-16 sm:py-24 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100">
                Why Choose PropFlip?
              </h2>
              <p className="mt-4 text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Our platform offers everything you need to succeed in real estate investing
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-purple-50 dark:bg-gray-800 p-8 rounded-lg shadow-md">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-purple-600 dark:bg-purple-500 text-white mb-5">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">Market Analytics</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Access real-time market data and analytics to make informed investment decisions.
                </p>
              </div>
              
              <div className="bg-purple-50 dark:bg-gray-800 p-8 rounded-lg shadow-md">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-purple-600 dark:bg-purple-500 text-white mb-5">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">ROI Calculator</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Calculate potential returns on investment with our advanced ROI tools.
                </p>
              </div>
              
              <div className="bg-purple-50 dark:bg-gray-800 p-8 rounded-lg shadow-md">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-purple-600 dark:bg-purple-500 text-white mb-5">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">Property Management</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Manage all your properties in one place with our intuitive dashboard.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        <section className="py-16 sm:py-24 bg-linear-to-br from-purple-50 to-blue-50 dark:from-purple-950 dark:to-blue-950">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-center gap-12">
              <div className="md:w-1/2">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-6">
                  Start Your Real Estate Journey Today
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
                  Join thousands of investors who have already transformed their real estate business with PropFlip. Our platform provides everything you need to find, analyze, and manage profitable properties.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a href="/sign-up" className="px-8 py-3 text-base font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-600 transition-colors duration-300 shadow-md">
                    Create Free Account
                  </a>
                  <a href="/contact" className="px-8 py-3 text-base font-medium rounded-md text-purple-600 dark:text-purple-400 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 border border-purple-200 dark:border-purple-800 transition-colors duration-300 shadow-xs">
                    Contact Sales
                  </a>
                </div>
              </div>
              <div className="md:w-1/2 mt-8 md:mt-0">
                <div className="relative rounded-lg overflow-hidden shadow-xl">
                  <div className="aspect-w-16 aspect-h-9 bg-purple-100 dark:bg-gray-800 rounded-lg">
                    <div className="p-6 flex items-center justify-center">
                      <div className="w-full max-w-md bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6">
                        <div className="flex items-center space-x-4 mb-6">
                          <div className="h-10 w-10 rounded-full bg-purple-600 flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Dashboard Preview</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Your property portfolio</p>
                          </div>
                        </div>
                        <div className="space-y-4">
                          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
                          <div className="h-20 bg-gray-200 dark:bg-gray-700 rounded"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
