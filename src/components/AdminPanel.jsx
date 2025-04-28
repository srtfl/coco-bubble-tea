import React, { useState, useEffect } from 'react';
import { getProducts, deleteProduct, getPromotions, deletePromotion } from '../services/firebaseService';
import ProductForm from './ProductForm';
import PromotionForm from './PromotionForm';
import { FaEdit, FaTrash } from 'react-icons/fa';

function AdminPanel() {
  const [products, setProducts] = useState([]);
  const [promotions, setPromotions] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [editingPromotion, setEditingPromotion] = useState(null);

  const fallbackImage = "https://dummyimage.com/300x300/ccc/ffffff&text=No+Image";

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const fetchedProducts = await getProducts();
    setProducts(fetchedProducts);

    const fetchedPromotions = await getPromotions();
    setPromotions(fetchedPromotions);
  };

  const handleDeleteProduct = async (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      await deleteProduct(productId);
      fetchData();
    }
  };

  const handleDeletePromotion = async (promotionId) => {
    if (window.confirm('Are you sure you want to delete this promotion?')) {
      await deletePromotion(promotionId);
      fetchData();
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Admin Panel</h1>

      {/* Products Section */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Products</h2>
        <button
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
          onClick={() => setEditingProduct({})}
        >
          Add Product
        </button>
      </div>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {products.map((product) => (
          <div key={product.id} className="bg-gray-800 rounded-lg overflow-hidden shadow-md relative">
            <img
              src={product.imageUrl || fallbackImage}
              alt={product.title}
              onError={(e) => { e.target.src = fallbackImage; }}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">{product.title}</h3>
              <p className="text-sm text-gray-400 mb-2 capitalize">Category: {product.category}</p>
              <p className="text-sm">Regular Price: £{product.regularPrice?.toFixed(2)}</p>
              <p className="text-sm">Large Price: £{product.largePrice?.toFixed(2)}</p>
            </div>
            <div className="flex justify-around p-4">
              <button
                className="text-yellow-400 hover:text-yellow-500 flex items-center space-x-1"
                onClick={() => setEditingProduct(product)}
              >
                <FaEdit /> <span>Edit</span>
              </button>
              <button
                className="text-red-400 hover:text-red-500 flex items-center space-x-1"
                onClick={() => handleDeleteProduct(product.id)}
              >
                <FaTrash /> <span>Delete</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Promotions Section */}
      <div className="mt-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Active Promotions</h2>
          <button
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
            onClick={() => setEditingPromotion({})}
          >
            Add Promotion
          </button>
        </div>

        {promotions.length === 0 ? (
          <p className="text-gray-400">No promotions currently active.</p>
        ) : (
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
            {promotions.map((promo) => (
              <div key={promo.id} className="bg-gray-800 rounded-lg p-4 shadow-md relative">
                <h3 className="text-xl font-semibold mb-2">{promo.title}</h3>
                <p className="text-sm text-gray-400 mb-2">{promo.description}</p>
                <p className="text-sm capitalize">Category: {promo.category}</p>
                <div className="flex justify-around mt-4">
                  <button
                    className="text-yellow-400 hover:text-yellow-500 flex items-center space-x-1"
                    onClick={() => setEditingPromotion(promo)}
                  >
                    <FaEdit /> <span>Edit</span>
                  </button>
                  <button
                    className="text-red-400 hover:text-red-500 flex items-center space-x-1"
                    onClick={() => handleDeletePromotion(promo.id)}
                  >
                    <FaTrash /> <span>Delete</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Product Form Modal */}
      {editingProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-lg relative">
            <button
              className="absolute top-2 right-2 text-white text-2xl"
              onClick={() => setEditingProduct(null)}
            >
              &times;
            </button>
            <ProductForm 
              product={editingProduct} 
              onDone={() => { setEditingProduct(null); fetchData(); }} 
            />
          </div>
        </div>
      )}

      {/* Promotion Form Modal */}
      {editingPromotion && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-lg relative">
            <button
              className="absolute top-2 right-2 text-white text-2xl"
              onClick={() => setEditingPromotion(null)}
            >
              &times;
            </button>
            <PromotionForm 
              promotion={editingPromotion} 
              onDone={() => { setEditingPromotion(null); fetchData(); }} 
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminPanel;
