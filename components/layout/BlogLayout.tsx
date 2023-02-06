import type {ReactNode} from "react";
import Header from "../Header";
import Footer from "../Footer";

export default function BlogLayout({children}: { children: ReactNode }) {
    return (
        <div className="bg-white dark:bg-black">
            <Header/>
            <main className="mb-auto">{children}</main>
            <Footer/>
        </div>
    )
}
