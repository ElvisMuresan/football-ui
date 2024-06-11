import { Link, Outlet } from 'react-router-dom'

export const Nav = () => {
  return (
    <div>
      <nav className="flex justify-center gap-10 text-blue-400 bg-gray-700 w-screen p-5 text-2xl font-bold">
        <Link to="/">Home</Link>
        <Link to="/newplayer">Add a new Player</Link>
        <Link to="/filter">Filter the table</Link>
      </nav>
      <Outlet />
    </div>
  )
}
