"use client"
import Head from "next/head";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import ProductCard from "@/components/ProductCard";
import Slider from "@/components/Slider";
import Footer from "@/components/Footer";
import axiosInstance from '../utils/axiosInstance';
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { setProducts } from '../store/actions';
import { store } from '../store/store';

const Home = ({ initialProducts }) => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (initialProducts) {
        dispatch(setProducts(initialProducts));
    }
}, [initialProducts, dispatch]);

  useEffect(() => {
    const fetchData = async () => {
        try {
            if (loading) return;
            setLoading(true);
            const response = await axiosInstance.get('/products');
            setData(response.data)
            store.dispatch(setProducts(response.data));
            setLoading(false);
          } catch (error) {
            setLoading(false)
            console.error('Error fetching data:', error);
        }
    };

    fetchData();
}, []);

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
        <Navbar />
        <div id="home" className="image-container">
          <Image 
              src="/banner-1.jpg"
              alt="Fresh Market"
              className="full-image"
              fill
              style={{ objectFit: 'cover' }} 
          />
        </div>

        <div id="product" className="product-container">
          <h1 className="section-heading">Our Products</h1>
          <div className="section-secondary-text">Check out our amazing selection!</div>

          <div className="product-grid">
              {/* product card component */}
              {
                data?.map((item, idx)=> {
                  return (
                      <ProductCard 
                        key={idx} 
                        id={item.id}
                        image={item.image} 
                        price={item.price} 
                        weight={item.weight} 
                        description={item.description} 
                        isLoading={loading}
                      />
                  )
                })
              }

          </div>
        </div>

        <div id="about" className="about-container">
              <h1 className="section-heading">Discover the Taste of Freshness</h1>
              <h3 className="section-secondary-about">At Fish Market, we bring you farm-fresh produce and premium quality ingredients straight to your table. Sourced from local farms, our fruits, vegetables, and meats are picked at the peak of ripeness, ensuring the best flavor and nutrition in every bite. Shop with us and savor the difference that freshness makes!</h3>
            {/* Slider Component */}
            <Slider />
        </div>

        <Footer />
      </main>
    </div>
    </>
  );
}

export async function getServerSideProps() {
  let initialProducts = [];
  try {
      const response = await axiosInstance.get('/products');
      initialProducts = response.data;
  } catch (error) {
      console.error('Error fetching products:', error);
  }

  return {
      props: {
          initialProducts,
      },
  };
}

export default Home;