import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav className="flex items-center justify-between border-b px-8 py-4">
      <Link to="/" className="text-2xl font-bold">
        Scentora
      </Link>

      <div className="flex gap-6">
        <Link to="/">Home</Link>
        <Link to="/products">Products</Link>
        <Link to="/cart">Cart</Link>
        <Link to="/login">Login</Link>
      </div>
    </nav>
  )
}

export default Navbar