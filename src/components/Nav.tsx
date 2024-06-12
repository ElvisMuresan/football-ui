import { Outlet } from 'react-router-dom'

import footballImage from './img/football.jpg'

import {
  Button,
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle
} from 'flowbite-react'

export const Nav = () => {
  return (
    // <div>
    //   <nav className="flex justify-center gap-20 bg-gray-300 w-screen p-5 text-2xl font-bold">
    //     <Link to="/">Home</Link>
    //     <Link to="/newplayer">Add a new Player</Link>
    //   </nav>
    //   <Outlet />
    // </div>
    <div>
      <Navbar fluid={true} rounded={true}>
        <NavbarBrand href="https://flowbite-react.com">
          <img
            alt="Football players"
            className="mr-3 h-6 sm:h-9"
            src={footballImage}
          />
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
            FootballPlayer
          </span>
        </NavbarBrand>
        <div className="flex md:order-2">
          <Button>Get started</Button>
          <NavbarToggle />
        </div>
        <NavbarCollapse>
          <NavbarLink active={true} href="/">
            Home
          </NavbarLink>
          <NavbarLink href="/newplayer">Add a new Player</NavbarLink>
        </NavbarCollapse>
      </Navbar>
      <Outlet />
    </div>
  )
}
