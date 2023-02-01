import type {ReactNode} from "react";
import Navbar from "../Navbar";
import Footer from "../Footer";

export default function BlogLayout({children}: { children: ReactNode }) {
    return (
        <div className="bg-gray-50 dark:bg-black">
            <Navbar/>
            <main className="mb-auto">{children}</main>
            <Footer/>
        </div>
    )
}
