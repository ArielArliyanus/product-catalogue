import Skeleton from '@mui/material/Skeleton';
import Link from 'next/link';
import { rupiah } from '@/utils/rupiah';

const ProductCard = ({ id, image, price, weight, description, isLoading }) => {
    return (
        <div>
            {isLoading? (
                <>
                    {/* loader component from material ui */}
                    <Skeleton />
                    <Skeleton />
                    <Skeleton />
                    <Skeleton />
                    <Skeleton />
                    <Skeleton />
                    <Skeleton />
                    <Skeleton />
                    <Skeleton />
                </>
            ): (
                <Link href={`/products/${id}`} scroll={true}>
                    <div className="product-card">
                        <img src={image} alt={description} className="product-image" />
                        <div className="product-info">
                            <h3>{description}</h3>
                            <div className="product-details">
                                <p className="product-price">Price: {rupiah(price)}</p>
                                <p className="product-weight">Weight: {weight}g</p>
                            </div>
                        </div>
                        <div className="hover-info">
                            <p>{description}</p>
                        </div>
                    </div>
                </Link>
            )}
        </div>
    );
};

export default ProductCard;
