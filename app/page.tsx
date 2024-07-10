export default function LandingPage() {

  return (
    <div className="mx-auto max-w-2xl px-4 py-32 sm:py-48 lg:py-56">
          <div className="text-center">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Take control of your Documentation
            </h1>
            <p className="mt-6 text-md sm:text-lg text-gray-600">
              NoteBud acts as your your/team's simple organizer by storing all your docs/notes, being able to talk with your docs, and easy vector search
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <a
                href="#"
                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in/Up
              </a>
            </div>
          </div>
        </div>
  );
}
