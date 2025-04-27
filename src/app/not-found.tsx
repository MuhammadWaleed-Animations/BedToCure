import Link from 'next/link'

export default async function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-black via-purple-900 to-blue-900 text-white p-8">
      <h1 className="text-[30vw] sm:text-9xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-red-500">
        404!
      </h1>
      <p className="text-[6vw] sm:text-5xl text-center mt-2 text-purple-300">
      The cosmos is infinite, but this page doesn&apos;t exist in this universe.
      </p>
      <p className="text-[5vw] sm:text-4xl text-center mt-4">
        <Link href="/" className="text-red-400 hover:text-red-600">
          Return Home
        </Link>
      </p>
    </div>
  )
}
