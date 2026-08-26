function Navbar() {
  return (
    <nav className="flex items-center justify-between border-b px-8 py-4">
      <h1 className="text-2xl font-bold">
        Scentora
      </h1>

      <div className="flex gap-6">
        <a href="/">Home</a>
        <a href="/products">Products</a>
        <a href="/about">About</a>
      </div>
    </nav>
  )
}

export default Navbar