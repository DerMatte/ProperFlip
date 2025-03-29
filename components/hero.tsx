import NextLogo from "./next-logo";
import SupabaseLogo from "./supabase-logo";

export default function Header() {
  return (
    <div className="relative overflow-hidden bg-linear-to-br from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950 py-16 sm:py-24">
      <div className="absolute top-0 right-0 -mt-16 opacity-20">
        <svg width="404" height="384" fill="none" viewBox="0 0 404 384">
          <defs>
            <pattern id="de316486-4a29-4312-bdfc-fbce2132a2c1" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
              <rect x="0" y="0" width="4" height="4" className="text-purple-400 dark:text-purple-600" fill="currentColor" />
            </pattern>
          </defs>
          <rect width="404" height="384" fill="url(#de316486-4a29-4312-bdfc-fbce2132a2c1)" />
        </svg>
      </div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center">
          <div className="flex items-center justify-center h-16 w-16 rounded-full bg-purple-600 dark:bg-purple-500 shadow-lg mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold text-center tracking-tight text-gray-900 dark:text-gray-100 mb-4">
            <span className="block">PropFlip</span>
            <span className="block text-purple-600 dark:text-purple-400 text-3xl md:text-4xl mt-2">Real Estate Made Simple</span>
          </h1>
          <p className="mt-6 text-xl text-center text-gray-600 dark:text-gray-300 max-w-3xl">
            Transform your property investment journey with our all-in-one platform for buying, selling, and managing real estate assets.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/sign-up" className="px-8 py-3 text-base font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-600 transition-colors duration-300 shadow-md">
              Get Started
            </a>
            <a href="#features" className="px-8 py-3 text-base font-medium rounded-md text-purple-600 dark:text-purple-400 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 border border-purple-200 dark:border-purple-800 transition-colors duration-300 shadow-xs">
              Learn More
            </a>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 opacity-20">
        <svg width="404" height="384" fill="none" viewBox="0 0 404 384">
          <defs>
            <pattern id="e813992c-7d03-4cc4-a2bd-151760b470a0" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
              <rect x="0" y="0" width="4" height="4" className="text-blue-400 dark:text-blue-600" fill="currentColor" />
            </pattern>
          </defs>
          <rect width="404" height="384" fill="url(#e813992c-7d03-4cc4-a2bd-151760b470a0)" />
        </svg>
      </div>
      <div className="w-full p-[1px] bg-linear-to-r from-transparent via-purple-300/30 dark:via-purple-600/30 to-transparent my-8" />
    </div>
  );
}
