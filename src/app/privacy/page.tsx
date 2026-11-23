import Link from 'next/link';

export default function PrivacyPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8">
        <Link href="/" className="text-blue-400 hover:text-blue-300 text-sm">
          &larr; Back to Home
        </Link>
      </div>

      <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>

      <div className="space-y-6 text-gray-300">
        <p>
          NotSoDeFi is a project by Dreier Labs. The privacy policy for this site and all Dreier Labs projects
          (in German and English) is maintained in one place:
        </p>
        <p>
          <a
            href="https://dreierlabs.com/datenschutz.html"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-300 underline"
          >
            dreierlabs.com/datenschutz.html
          </a>
        </p>
        <p>
          The controller is named in the{' '}
          <a
            href="https://dreierlabs.com/impressum.html"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-300 underline"
          >
            legal notice (Impressum)
          </a>
          .
        </p>
      </div>
    </div>
  );
}
