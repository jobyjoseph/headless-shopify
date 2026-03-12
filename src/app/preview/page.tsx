import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Preview Mode - Headless",
};

export default function PreviewPage() {
  return (
    <main className="border-box px-5 py-8 lg:px-10 min-h-[60vh] flex items-center justify-center">
      <div className="w-full max-w-xl border border-gray-200 p-6 md:p-8">
        <h1 className="text-2xl font-semibold text-gray-900 mb-3">
          Preview Mode
        </h1>
        <p className="text-gray-600 mb-6">
          Enter a product handle or path to enable Draft Mode.
        </p>

        <form method="GET" action="/api/draft" className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="secret" className="text-gray-900">
              Preview Secret
            </label>
            <input
              id="secret"
              name="secret"
              type="password"
              required
              placeholder="Enter preview secret"
              className="border border-gray-200 px-4 py-2 text-gray-900 focus:outline-none focus:border-gray-400"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="handle" className="text-gray-900">
              Product Handle
            </label>
            <input
              id="handle"
              name="handle"
              type="text"
              placeholder="your-product-handle"
              className="border border-gray-200 px-4 py-2 text-gray-900 focus:outline-none focus:border-gray-400"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="path" className="text-gray-900">
              Or Path (optional)
            </label>
            <input
              id="path"
              name="path"
              type="text"
              placeholder="/products/your-product-handle"
              className="border border-gray-200 px-4 py-2 text-gray-900 focus:outline-none focus:border-gray-400"
            />
          </div>

          <button
            type="submit"
            className="mt-2 bg-gray-900 text-white py-3 px-4 hover:bg-gray-800 transition-colors uppercase"
          >
            Enable Preview
          </button>
        </form>
      </div>
    </main>
  );
}
