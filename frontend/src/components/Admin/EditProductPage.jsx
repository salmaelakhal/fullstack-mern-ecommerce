import React, { useState } from 'react'

function EditProductPage() {

  const [productData, setProductData] = useState({
    name: "",
    description: "",
    price: 0,
    countInStock: 0,
    sku: "",
    category: "",
    brand: "",
    sizes: [],
    colors: [],
    collections: "",
    materials: "",
    gender: "",
    images: [
      {
        url: "https://picsum.photos/200?random=1",
      },
            {
        url: "https://picsum.photos/200?random=2",
      },

    ]
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setProductData((prevData) => ({
      ...prevData,
      [name]: value
    }) 
  )
  }

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    console.log(file)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Product Updated', productData);
  }


  return (
    <div className='max-w-5xl mx-auto p-6 shadow-md rounded-md'>
      <h2 className="text-3xl font-bold mb-6">
        Edit Product 
      </h2>
      <form onSubmit={handleSubmit}>
        {/* Name  */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">
            Product Name
          </label>
          <input
            name='name'
            type="text"
            value={productData.name}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2"
            required
          />
        </div>

        {/* Description  */}

        <div className="mb-6">
          <label className="block font-semibold mb-2">
            Description
          </label>
          <textarea
            name='description'
            type="text"
            value={productData.description}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2"
            rows={4}
            required
          />
        </div>

         {/* Price  */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">
            Price
          </label>
          <input
            name='price'
            type="number"
            value={productData.price}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2"
          />
        </div>

    {/* Count In Stock  */}

        <div className="mb-6">
          <label className="block font-semibold mb-2">
            Count in Stock
          </label>
          <input
            name='countInStock'
            type="number"
            value={productData.countInStock}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2"
            required
          />
        </div>

         {/* SKU  */}

        <div className="mb-6">
          <label className="block font-semibold mb-2">
            SKU
          </label>
          <input
            name='sku'
            type="text"
            value={productData.sku}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2"
            required
          />
        </div>

         {/* Size  */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">
            Sizes (comma-separated)
          </label>
          <input
            name='sizes'
            type="text"
            value={productData.sizes.join(", ")}
            onChange={(e) =>
              setProductData({
                ...productData,
                sizes: e.target.value.split(",").map((size) => size.trim()),
              })}
            className="w-full border border-gray-300 rounded-md p-2"
          />
        </div>

         {/* Color  */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">
            Colors (comma-separated)
          </label>
          <input
            name='colors'
            type="text"
            value={productData.colors.join(", ")}
            onChange={(e) =>
              setProductData({
                ...productData,
                colors: e.target.value.split(",").map((color) => color.trim()),
              })}
            className="w-full border border-gray-300 rounded-md p-2"
          />
        </div>

        
       {/* Image Upload  */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">
            Upload Image
          </label>
          <input
            name='images'
            type="file"
            onChange={handleImageUpload}
          />
          <div className="flex gap-4 mt-4">
            {productData.images.map((image, index) => (
              <div key={index}>
                <img
                  src={image.url}
                  alt={`Image ${index + 1}`}
                  className="w-20 h-20 object-cover rounded-md shadow-md"
                />
              </div>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition-colors "
        >
          Update Product
        </button>

      </form>

    </div>
  )
}

export default EditProductPage