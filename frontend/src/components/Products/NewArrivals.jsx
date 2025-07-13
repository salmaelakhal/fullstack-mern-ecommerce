import React, { useEffect, useRef, useState } from 'react';
import { FiChevronLeft, FiChevronRight, FiHeart } from "react-icons/fi";
import { Link } from 'react-router-dom';

function NewArrivals() {
    const scrollRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);
    const [canScrollRight, setCanScrollRight] = useState(true);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [hoveredProduct, setHoveredProduct] = useState(null);

    const newArrivals = [
        {
            _id: "1",
            name: 'Premium Leather Jacket',
            price: 249.99,
            colors: ['Black', 'Brown'],
            images: [
                { url: "https://picsum.photos/500/750?random=1", altText: 'Leather Jacket' }
            ]
        },
        {
            _id: "2",
            name: 'Slim Fit Jeans',
            price: 89.99,
            colors: ['Blue', 'Black'],
            images: [
                { url: "https://picsum.photos/500/750?random=2", altText: 'Slim Fit Jeans' }
            ]
        },
        {
            _id: "3",
            name: 'Cashmere Sweater',
            price: 179.99,
            colors: ['Beige', 'Navy'],
            images: [
                { url: "https://picsum.photos/500/750?random=3", altText: 'Cashmere Sweater' }
            ]
        },
        {
            _id: "4",
            name: 'Silk Blouse',
            price: 129.99,
            colors: ['White', 'Pink'],
            images: [
                { url: "https://picsum.photos/500/750?random=4", altText: 'Silk Blouse' }
            ]
        },
        {
            _id: "5",
            name: 'Wool Coat',
            price: 299.99,
            colors: ['Camel', 'Gray'],
            images: [
                { url: "https://picsum.photos/500/750?random=5", altText: 'Wool Coat' }
            ]
        },
        {
            _id: "6",
            name: 'Linen Shirt',
            price: 79.99,
            colors: ['White', 'Blue'],
            images: [
                { url: "https://picsum.photos/500/750?random=6", altText: 'Linen Shirt' }
            ]
        },
    ];

    const updateScrollButtons = () => {
        const container = scrollRef.current;
        if (container) {
            const leftScroll = container.scrollLeft;
            const rightScrollable = container.scrollWidth > leftScroll + container.clientWidth + 1;
            
            setCanScrollLeft(leftScroll > 0);
            setCanScrollRight(rightScrollable);
        }
    };

    const handleMouseDown = (e) => {
        setIsDragging(true);
        setStartX(e.pageX - scrollRef.current.offsetLeft);
        setScrollLeft(scrollRef.current.scrollLeft);
        scrollRef.current.style.scrollBehavior = 'auto';
    };

    const handleMouseMove = (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.pageX - scrollRef.current.offsetLeft;
        const walk = (x - startX) * 1.5; // Increase scroll speed
        scrollRef.current.scrollLeft = scrollLeft - walk;
    };

    const handleMouseUpOrLeave = () => {
        setIsDragging(false);
        scrollRef.current.style.scrollBehavior = 'smooth';
    };

    const scroll = (direction) => {
        const container = scrollRef.current;
        const scrollAmount = direction === "left" ? -container.offsetWidth * 0.8 : container.offsetWidth * 0.8;
        container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    };

    useEffect(() => {
        const container = scrollRef.current;
        if (container) {
            container.addEventListener('scroll', updateScrollButtons);
            updateScrollButtons();
            return () => container.removeEventListener('scroll', updateScrollButtons);
        }
    }, []);

    return (
        <section className='py-16 px-4 lg:px-0 bg-gray-50'>
            <div className='container mx-auto'>
                <div className='text-center mb-12'>
                    <h2 className='text-3xl md:text-4xl font-bold mb-4'>New Arrivals</h2>
                    <p className='text-lg text-gray-600 max-w-2xl mx-auto'>
                        Discover the latest styles straight off the runway, freshly added to keep your wardrobe on the cutting edge of fashion
                    </p>
                </div>

                <div className='relative group'>
                    {/* Navigation Arrows */}
                    <button
                        onClick={() => scroll('left')}
                        disabled={!canScrollLeft}
                        className={`absolute left-0 top-1/2 transform -translate-y-1/2 z-10 p-3 rounded-full shadow-lg transition-all ${canScrollLeft ? 'bg-white text-black hover:bg-gray-100' : 'bg-gray-200 text-gray-400 cursor-not-allowed'} hidden md:block`}
                        aria-label="Scroll left"
                    >
                        <FiChevronLeft className='text-xl' />
                    </button>

                    <button
                        onClick={() => scroll('right')}
                        disabled={!canScrollRight}
                        className={`absolute right-0 top-1/2 transform -translate-y-1/2 z-10 p-3 rounded-full shadow-lg transition-all ${canScrollRight ? 'bg-white text-black hover:bg-gray-100' : 'bg-gray-200 text-gray-400 cursor-not-allowed'} hidden md:block`}
                        aria-label="Scroll right"
                    >
                        <FiChevronRight className='text-xl' />
                    </button>

                    {/* Product Carousel */}
                    <div
                        ref={scrollRef}
                        className={`overflow-x-auto flex gap-6 pb-6 scrollbar-hide ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
                        onMouseDown={handleMouseDown}
                        onMouseMove={handleMouseMove}
                        onMouseUp={handleMouseUpOrLeave}
                        onMouseLeave={handleMouseUpOrLeave}
                    >
                        {newArrivals.map((product) => (
                            <div 
                                key={product._id} 
                                className='min-w-[280px] sm:min-w-[300px] lg:min-w-[340px] flex-shrink-0 relative group'
                                onMouseEnter={() => setHoveredProduct(product._id)}
                                onMouseLeave={() => setHoveredProduct(null)}
                            >
                                <div className='relative overflow-hidden rounded-xl'>
                                    <img 
                                        src={product.images[0]?.url}
                                        alt={product.images[0]?.altText || product.name}
                                        className='w-full h-[400px] object-cover transition-transform duration-500 group-hover:scale-105'
                                        draggable='false'
                                    />
                                    
                                    {/* Wishlist Button */}
                                    <button 
                                        className={`absolute top-4 right-4 p-2 bg-white rounded-full shadow-md transition-all ${hoveredProduct === product._id ? 'opacity-100' : 'opacity-0'}`}
                                        aria-label="Add to wishlist"
                                    >
                                        <FiHeart className='text-lg' />
                                    </button>
                                    
                                    {/* Product Info */}
                                    <div className='absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent text-white'>
                                        <Link to={`/product/${product._id}`} className='block'>
                                            <h3 className='font-bold text-lg mb-1'>{product.name}</h3>
                                            <div className='flex justify-between items-center'>
                                                <span className='font-medium'>${product.price.toFixed(2)}</span>
                                                <div className='flex space-x-1'>
                                                    {product.colors.map((color, i) => (
                                                        <span 
                                                            key={i} 
                                                            className='w-3 h-3 rounded-full border border-white'
                                                            style={{ backgroundColor: color.toLowerCase() }}
                                                            title={color}
                                                        />
                                                    ))}
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className='text-center mt-8'>
                    <Link 
                        to="/collections/new-arrivals" 
                        className='inline-block px-8 py-3 bg-black text-white font-medium rounded-full hover:bg-gray-800 transition-colors'
                    >
                        View All New Arrivals
                    </Link>
                </div>
            </div>
        </section>
    );
}

export default NewArrivals;