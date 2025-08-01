import React from 'react'
import { Link } from 'react-router-dom';

function ProductManagement() {

    const products = [
        {
            _id: 1234,
            name: 'Product 1',
            price: 100,
            sku: "123321",
        },
    ];



    const handleDelete = (productId) => {
        if(window.confirm("Are you sure you want to delete this product?"))
        // Handle product deletion logic here
        console.log(`Deleting product with ID: ${productId}`);
    };



  return (
      <div className='max-w-7xl mx-auto p-6'>
          <h2 className="text-2xl font-bold mb-6">
              Product Management
          </h2>
          <div className="overflow-x-auto shadow-md sm:rounded-lg">
              <table className="min-w-full text-left text-gray-500">
                  <thead className="bg-gray-100 text-xs uppercase text-gray-700">
                      <tr>
                          <th className="py-3 px-4">Name</th>
                          <th className="py-3 px-4">Price</th>
                          <th className="py-3 px-4">SKU</th>
                          <th className="py-3 px-4">Actions</th>
                      </tr>
                  </thead>
                  <tbody>
                      {products.length > 0 ? (
                          products.map((product) => (
                              
                              <tr key={product._id} className='border-b hover:bg-gray-50 cursor-pointer'>
                                  <td className="p-4 font-medium text-gray-900 whitespace-nowrap">{product.name}</td>
                                  <td className="p-4">${product.price}</td>
                                  <td className="p-4">{product.sku}</td>
                                  <td className="p-4">
                                      <Link
                                          to={`/admin/products/${product._id}/edit`}
                                          className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-1 px-2 rounded mr-2">
                                          Edit
                                      </Link>

                                      <Link
                                          onClick={() => handleDelete(product._id)}
                                          className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded">
                                          Delete
                                      </Link>
                                  </td>
                              </tr>
                          ))
                      ) : (
                              <tr>
                                  <td colSpan="4" className="p-4 text-center text-gray-500">
                                      No products found.
                                  </td>
                          </tr>
                  
                      )
                    }
                  </tbody>
              </table>
          </div>
          
    </div>
  )
}

export default ProductManagement