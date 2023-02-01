import Link from "next/link"

function Navbar() {
    return (
        <header
            className="sticky top-0 z-50"
        >
            <div>
                <Link href="/">浅小沫的博客</Link>
            </div>
        </header>
    )
}

export default Navbar
