"use client"
import { ReactNode } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import StoreProvider from "@/app/provider/ContextProvider";

type LayoutProps = {
    children: ReactNode
}


const Layout = ({ children }: LayoutProps) => {
    return (
        <>
            <div className="flex">
                <Header />
                <StoreProvider >
                    <div className="flex-grow ">
                        <main className="o overflow-y-hidden">
                            {children}
                        </main>
                    </div>
                </StoreProvider>
            </div>
            <Footer />
        </>
    );
};

export default Layout;