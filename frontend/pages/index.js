import Link from 'next/link'

export default function Home(){
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">Scalable Web App</h1>
        <p className="mb-4">Next.js + Express starter with JWT auth and tasks CRUD.</p>

        <div className="space-x-2">
          <Link href="/signup" className="px-4 py-2 bg-green-600 text-white rounded">
            Sign Up
          </Link>

          <Link href="/login" className="px-4 py-2 bg-blue-600 text-white rounded">
            Login
          </Link>
        </div>
      </div>
    </div>
  )
}
