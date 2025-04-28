import React, { useState } from 'react';
import { saveProduct } from '../services/firebaseService'; // Make sure saveProduct exists!

function ProductForm({ product = {}, onDone, onCancel }) {
  const [title, setTitle] = useState(product.title || '');
  const [category, setCategory] = useState(product.category || '');
  const [regularPrice, setRegularPrice] = useState(product.regularPrice || '');
  const [largePrice, setLargePrice] = useState(product.largePrice || '');
  const [imageUrl, setImageUrl] = useState(product.imageUrl || '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const productData = {
        title,
        category,
        regularPrice: parseFloat(regularPrice),
        largePrice: parseFloat(largePrice),
        imageUrl,
      };

      await saveProduct(product.id, productData);

      onDone(); // ✅ Close modal + Refresh
    } catch (err) {
      console.error('Failed to save product', err);
      setError('Failed to save product.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <p className="text-red-500">{error}</p>}

      <div>
        <label className="block text-sm mb-1">Product Name</label>
        <input
          type="text"
          className="w-full px-3 py-2 rounded bg-gray-700 text-white"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div>
        <label className="block text-sm mb-1">Category</label>
        <select
          className="w-full px-3 py-2 rounded bg-gray-700 text-white"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        >
          <option value="">Select Category</option>
          <option value="milk-teas">Milk Teas</option>
          <option value="fruit-teas">Fruit Teas</option>
          <option value="special-teas">Special Teas</option>
          <option value="milkshakes">Milkshakes</option>
          <option value="fruity-twist-shakes">Fruity Twist Shakes</option>
          <option value="bubble-fruity-sundaes">Bubble Fruity Sundaes</option>
          <option value="frappes">Frappes</option>
        </select>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm mb-1">Regular Price (£)</label>
          <input
            type="number"
            className="w-full px-3 py-2 rounded bg-gray-700 text-white"
            value={regularPrice}
            onChange={(e) => setRegularPrice(e.target.value)}
            required
            min="0"
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Large Price (£)</label>
          <input
            type="number"
            className="w-full px-3 py-2 rounded bg-gray-700 text-white"
            value={largePrice}
            onChange={(e) => setLargePrice(e.target.value)}
            required
            min="0"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm mb-1">Image URL</label>
        <input
          type="text"
          className="w-full px-3 py-2 rounded bg-gray-700 text-white"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />
      </div>

      <div className="flex justify-between pt-4">
        <button
          type="button"
          className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
          onClick={onCancel}
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={loading}
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
        >
          {loading ? 'Saving...' : 'Save'}
        </button>
      </div>
    </form>
  );
}

export default ProductForm;
