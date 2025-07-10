import React, { useEffect, useRef, useState } from 'react'
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { Link } from 'react-router-dom';
function NewArrivals() {
    const scrollRef = useRef(null);
    const [isDraggig, setIsDragging] = useState(false)
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);
    const [canScrollLeft, setCanScrollLeft] = useState(false);


    const newArrivals = [
        {
            _id:"1",
            name:'Stylish Jacket',
            price:120,
            images: [
                {
                    url: "https://picsum.photos/200?random=1",
                    altText: 'Stylish Jecket',
                }
            ]
        },
        {
            _id:"2",
            name:'Stylish Jacket',
            price:120,
            images: [
                {
                    url: "https://picsum.photos/200?random=2",
                    altText: 'Stylish Jecket',
                }
            ]
        },
        {
            _id:"3",
            name:'Stylish Jacket',
            price:120,
            images: [
                {
                    url: "https://picsum.photos/200?random=3",
                    altText: 'Stylish Jecket',
                }
            ]
        },
        {
            _id:"4",
            name:'Stylish Jacket',
            price:120,
            images: [
                {
                    url: "https://picsum.photos/200?random=4",
                    altText: 'Stylish Jecket',
                }
            ]
        },
        {
            _id:"5",
            name:'Stylish Jacket',
            price:120,
            images: [
                {
                    url: "https://picsum.photos/200?random=5",
                    altText: 'Stylish Jecket',
                }
            ]
        },
        {
            _id:"6",
            name:'Stylish Jacket',
            price:120,
            images: [
                {
                    url: "https://picsum.photos/200?random=6",
                    altText: 'Stylish Jecket',
                }
            ]
        },
        {
            _id:"7",
            name:'Stylish Jacket',
            price:120,
            images: [
                {
                    url: "https://picsum.photos/200?random=7",
                    altText: 'Stylish Jecket',
                }
            ]
        },
        {
            _id:"8",
            name:'Stylish Jacket',
            price:120,
            images: [
                {
                    url: "https://picsum.photos/200?random=8",
                    altText: 'Stylish Jecket',
                }
            ]
        },
    ]


    // update scroll button
    const updateScrollButtons = () => {
        const container = scrollRef.current
        
        if (container) {
            const leftScroll = container.scrollLeft;
            const rightScrollable = container.scrollWidth > leftScroll + container.clientWidth;

            setCanScrollLeft(leftScroll > 0);
            setCanScrollRight(rightScrollable);
        }
        console.log({
            scrollLeft: container.scrollLeft,
            clientWidth: container.clientWidth,
            containerScrollWidth: container.scrollWidth,
            offsetLeft: scrollRef.current.offsetLeft
        });
        
    }

    /**
     * Handles the mousedown event on the scroll container.
     * Sets the flag to indicate that the user is currently dragging the container.
     * Stores the initial x-coordinate of the mouse.
     * 
     * @param {MouseEvent} e 
     */
    const handleMouseDown = (e) => {
        setIsDragging(true);
        setStartX(e.pageX - scrollRef.current.offsetLeft);
        setScrollLeft(scrollRef.current.scrollLeft);
    };

    const handleMouseMove = (e) => {
        if (!isDraggig) return;
        const x = e.pageX - scrollRef.current.offsetLeft;
        const walk = x - startX;
        scrollRef.current.scrollLeft = scrollLeft - walk;
    };

    const handleMouseUporLeave = () => {
        setIsDragging(false);
    };

   

    const scroll = (direction) => {
        const scrollAmount = direction == "left" ? -300 : +300;
        scrollRef.current.scrollBy({left: scrollAmount, behaviour: 'smooth'})
    }

    useEffect(() => {
        const container = scrollRef.current;
        if (container) {
            container.addEventListener('scroll', updateScrollButtons);
            updateScrollButtons();
            return () => container.removeEventListener('scroll', updateScrollButtons);
        }
    }, []);


  return (
    <section className='py-16 px-4 lg:px-0'>
       <div className='container mx-auto text-center mb-10 relative'>
          <h2 className='text-3xl font-bold mb-4'>Explore New Arrivals</h2>
          <p className='text-lg text-gray-600 mb-8'>
              Discover the latest styles straight off the runway, freshly added to 
              keep your wardrobe on the cutting edge of fashion
          </p>

          {/* Scroll Button */}

          <div className="absolute right-0 bottom-[-30px] flex space-x-2">
                  <button
                      disabled={!canScrollLeft}
                      onClick={() => scroll('left')}
                      className={`p-2 rounded border ${canScrollLeft ? 'bg-white text-black' : 'bg-gray-200 text-gray-400 cursor-not-allowed'} `}
                  >
                <FiChevronLeft className='text-2xl' />
              </button>

                  <button
                      onClick={() => scroll('right')}
                      className={`p-2 rounded border ${canScrollRight ? 'bg-white text-black' : 'bg-gray-200 text-gray-400 cursor-not-allowed'} `}
                  >
                <FiChevronRight className='text-2xl' />
              </button>
          </div>
          </div>
          
          {/* Scrollable content */}
          <div
              ref={scrollRef}
              className={`container mx-auto overflow-x-scroll flex space-x-6 relative ${isDraggig ? 'cursor-grabbing' : 'cursor-grab'}`}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUporLeave}
              onMouseLeave={handleMouseUporLeave}
          >
              {newArrivals.map((product) => (
                  <div key={product._id} className='min-w-[100%] sm:min-w-[50%] lg:min-w-[30%] relative'>
                      <img src={product.images[0]?.url}
                          alt={product.images[0]?.altText || product.name}
                          className='w-full h-[500px] object-cover rounded-lg'
                          draggable='false'
                      />
                      <div className='absolute bottom-0 left-0 right-0 bg-opacity-50 backdrop-blur-md text-white p-4 rounded-b-lg'>
                          <Link to={`/product/${product._id}`} className='block'>
                              <h4 className='font-medium'>{product.name}</h4>
                              <p className="mt-1">$ { product.price }</p>
                          </Link>
                              
                      </div>
                  </div>
              ))}
          </div>
    </section>
  )
}

export default NewArrivals