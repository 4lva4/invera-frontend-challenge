export default async function Home() {

  const res = await fetch('http://localhost:8000/statics', { cache: 'no-store' });
  const stats = await res.json();

  return (
    <main className="p-10">
      <h1 className="text-3xl font-bold text-blue-600 mb-6">Dashboard Invera</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="p-4 border rounded shadow">
          <p className="text-gray-500">Total Users</p>
          <p className="text-2xl font-bold">{stats.totalUsers}</p>
        </div>
        <div className="p-4 border rounded shadow">
          <p className="text-gray-500">New Users</p>
          <p className="text-2xl font-bold">{stats.newUsers}</p>
        </div>
      </div>

      <pre className="mt-10 bg-gray-100 p-4 rounded text-xs">
        Debug Data: {JSON.stringify(stats, null, 2)}
      </pre>
    </main>
  );
}