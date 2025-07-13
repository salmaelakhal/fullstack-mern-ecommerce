import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
function FilterSidebar() {

  const [searchParams, setSearchParams] = useState(new URLSearchParams(window.location.search));
  const navigate = useNavigate();
  const [filter, setFilter] = useState({
    category: '',
    gender: '',
    color: '',
    size: [],
    materials: [],
    brands: [],
    priceRange: 1000,
  });

  const [priceRange, setPriceRange] = useState([0, 1000]);

  const categories = ["Top Wear", "Bottom Wear"]

  const colors = ["Red", "Blue", "Green", "Black", "White", "Yellow", "Pink", "Purple", "Gray", "Biege", "Navy"];

  const sizes = ["XS", "S", "M", "L", "XL", "XXL"];

  const materials = ["Cotton", "Polyester", "Wool", "Silk", "Denim", "Leather", "Linen", "Viscose", "Fleece"];

  const brands = ["Urban Threads", "Modern Fit", "Street Style", "Beach Breeze", "Fashionista", "ChicStyle"];

  const genders = ["Men", "Women"];

  useEffect(() => {
    const params = Object.fromEntries([...searchParams]);
    setFilter({
      category: params.category || '',
      gender: params.gender || '',
      color: params.color || '',
      size: params.size ? params.size.split(',') : [],
      materials: params.materials ? params.materials.split(',') : [],
      brands: params.brands ? params.brands.split(',') : [],
      minPrice: params.minPrice || 0,
      maxPrice: params.maxPrice || 1000,
    });
    setPriceRange([params.minPrice || 0, params.maxPrice || 1000]);
  }, [searchParams]); 

  const handleFilterChange = (e) => {
    const { name, value, type, checked } = e.target;
    // console.log(`Filter changed: ${name} = ${value}, type: ${type}, checked: ${checked}`);
    let newFilter = { ...filter };
    
    if (type === 'checkbox') {
      if (checked) {
        newFilter[name] = [...newFilter[name], value];
      } else {
        newFilter[name] = newFilter[name].filter(item => item !== value);
      }
    } else {
      newFilter[name] = value;
    }
    setFilter(newFilter);
    updateURLParams(newFilter);
    console.log('Updated filter:', newFilter);
  }


  const updateURLParams = (newFilters) => { 
    const params = new URLSearchParams(searchParams);
    // {category: 'Top Wear', size: ['M', 'L'], 
    Object.keys(newFilters).forEach((key) => {
      if (Array.isArray(newFilters[key]) && newFilters[key].length > 0) {
        params.set(key, newFilters[key].join(','));
      } else if (newFilters[key]) {
        params.set(key, newFilters[key]);
      }
    });
    setSearchParams(params);
    navigate(`?${params.toString()}`); // ?category=Bottom+Wear&size=M,L
  }



  const handlePriceChange = (e) => {
    const newPrice = e.target.value;
    setPriceRange([0, newPrice]);
    const newFilter = { ...filter, minPrice: 0, maxPrice: newPrice };
    setFilter(newFilter);
    updateURLParams(newFilter);
  };





  return (
    <div className="p-4">
      <h3 className="text-xl font-medium text-gray-800 mb-4">
        Filter
      </h3>

      {/* Category Filter  */}
      <div className="mb-6">
        <label htmlFor="" className="block text-gray-600 font-medium mb-2">Category</label>
          {categories.map((category) => (
            <div key={category} className="flex items-center mb-1">
              <input
                type="radio"
                name="category"
                value={category}
                onChange={handleFilterChange}
                checked={filter.category === category}
                className="mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300" />
              <span className="ml-2">{category}</span>
            </div>
          ))}
        
      </div>

      

      {/* Gender Filter */}
      <div className="mb-6">
        <label htmlFor="" className="block text-gray-600 font-medium mb-2">Gender</label>
        {genders.map((gender) => (
          <div key={gender} className="flex items-center mb-1">
            <input
              type="radio"
              name="gender"
              value={gender}
              onChange={handleFilterChange}
              checked={filter.gender === gender}
              className="mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300" />
            <span className="ml-2">{gender}</span>
          </div>
        ))}
      </div>

      {/* Color Filter */}
      <div className="mb-6">
        <label htmlFor="" className="block text-gray-600 font-medium mb-2">Color</label>
        <div className="flex flex-wrap gap-2">
          {colors.map((color) => (
            <button
              key={color}
              name='color'
              value={color}
              onClick={handleFilterChange}
              className={`w-8 h-8 rounded-full border border-gray cursor-pointer transition hover:scale-105 ${filter.color === color ? 'ring-2 ring-blue-500' : ''}`}
              style={{ backgroundColor: color.toLowerCase() }}
              
            >
              
          </button>
          
          ))}
          </div>
      </div>

      
      {/* Size Filter */}
      <div className="mb-6">
        <label htmlFor="" className="block text-gray-600 font-medium mb-2">Size</label>
        {sizes.map((size) => (
          <div key={size} className="flex items-center mb-1">
            <input
              type="checkbox"
              name="size"
              value={size}
              onChange={handleFilterChange}
              checked={filter.size.includes(size)}
              className="mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300" />
            <span className="text-gray-700">{size}</span>
          </div>
        ))}
      </div>

      {/* Material Filter */}
      <div className="mb-6">
        <label htmlFor="" className="block text-gray-600 font-medium mb-2">Material</label>
        {materials.map((material) => (
          <div key={material} className="flex items-center mb-1">
            <input
              type="checkbox"
              name="materials"
              value={material}
              onChange={handleFilterChange}
              checked={filter.materials.includes(material)}
              className="mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300" />
            <span className="text-gray-700">{material}</span>
          </div>
        ))}
      </div>

       {/* Brand Filter */}
      <div className="mb-6">
        <label htmlFor="" className="block text-gray-600 font-medium mb-2">Brand</label>
        {brands.map((brand) => (
          <div key={brand} className="flex items-center mb-1">
            <input
              type="checkbox"
              name="brands"
              value={brand}
              onChange={handleFilterChange}
              checked={filter.brands.includes(brand)}
              className="mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300" />
            <span className="text-gray-700">{brand}</span>
          </div>
        ))}
      </div>

      {/* Price Range Filter */}
      <div className="mb-8">
        <label htmlFor="" className="block text-gray-600 font-medium mb-2">Price Range</label>
        <input
          type="range"
          name="PriceRange"
          min={0}
          max={100}
          value={priceRange[1]}
          onChange={handlePriceChange}
          className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer"
        />
        <div className="flex justify-between text-gray-600 mt-2">
          <span>$0</span>
          <span>${priceRange[1]}</span>
        </div>
       
      </div>

    </div>
  )
}

export default FilterSidebar



