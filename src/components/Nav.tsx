import { Link, Outlet } from 'react-router-dom'

export const Nav = () => {
  return (
    <div>
      <nav className="flex justify-center gap-20 bg-gray-300 w-screen p-5 text-2xl font-bold">
        <Link to="/">Home</Link>
        <Link to="/newplayer">Add a new Player</Link>
      </nav>
      <Outlet />
    </div>
  )
}
