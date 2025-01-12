import Document from "@/components/layout/Document";
import Link from "next/link";

export default function NotFound() {
  return (
    <Document locale={"en"}>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-800">
        <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
        <h2 className="text-2xl font-semibold mb-2">Page Not Found</h2>
        <p className="text-gray-600 mb-6">
          Sorry, the page you are looking for does not exist or has been moved.
        </p>

        <div className="flex items-center justify-center">
          <Link
            href="/"
            className="bg-primary text-white font-bold py-3 px-6 rounded-md text-base"
          >
            Go to Homepage
          </Link>
        </div>
      </div>
    </Document>
  );
}
