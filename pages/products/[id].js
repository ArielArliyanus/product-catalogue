"use client";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from 'next/router';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import { rupiah } from "@/utils/rupiah";
import Link from 'next/link';

export default function Home() {
    const router = useRouter();
    const products = useSelector((state) => state.products);
    const [product, setProduct] = useState(null);
  
    useEffect(() => {
        const { id } = router.query; 
        if (id) {
            const productById = getProductById(id);
            setProduct(productById);
        }
        setTimeout(() => {
            window.scrollTo(0, 0);
        }, 0);
    }, [router.query.id]);

    
    function getProductById(productId) {
        const product = products.find(item => item.id === parseInt(productId));
    
        if (!product) {
            console.error(`Product with ID ${productId} not found.`);
            return null;
        }
    
        return product;
    }

    return (
        <>
            <Head>
                <title>Fish Market</title>
                <meta name="description" content="Fish Market By Ariel Arliyanus" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="container">
                <main>
                    <Navbar isDetail={true} />
                    <div className="back-button">
                        <Link href="/">Back</Link>
                    </div>
                    {product && 
                        <div className="product-detail-container">
                            <div className="product-detail-grid">
                                <div className="product-detail-image">
                                    <Image src={product.image} alt={product.description} width={300} height={300} />
                                </div>
                                <div className="product-details">
                                    <h1>{product.product_name}</h1>
                                    <p className="product-detail-price">Price: {rupiah(product.price)}</p>
                                    <p className="product-detail-weight">Weight: {product.weight}g</p>
                                    <p>{product.detail}</p>
                                </div>
                            </div>
                        </div>
                    }
                    <Footer />
                </main>
            </div>
        </>
    );
}
