"use client";

import Image from "next/image";
import Link from 'next/link';
import { useState } from 'react';

const Navbar = ({isDetail}) => { 
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="navbar">
            <Link href="/">
                <Image 
                    src="/fish-market-logo.png"
                    className="fm-logo"
                    width={240}
                    height={80}
                    alt="Fish Market Logo"
                />
            </Link>
            {!isDetail &&
                <>
                    <div className={`nav-links ${isOpen ? 'active' : ''}`}>
                        <Link href="#home">Home</Link>
                        <Link href="#product">Product</Link>
                        <Link href="#about">About</Link>
                        <Link href="#contact">Contact</Link>
                    </div>
                    <div className="burger-icon" onClick={toggleMenu}>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </>
            }
        </nav>
    );
};

export default Navbar;
