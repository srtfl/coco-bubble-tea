import React, { useState } from 'react';
import { saveProduct } from '../services/firebaseService';

function ProductForm({ product = {}, onDone, onCancel }) {
  const [name, setName] = useState(product.name || '');
  const [category, setCategory] = useState(product.category || '');
  const [priceReg, setPriceReg] = useState(product.priceReg || '');
  const [priceLrg, setPriceLrg] = useState(product.priceLrg || '');
  const [image, setImage] = useState(product.image || '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const productData = {
        name,
        category,
        priceReg: parseFloat(priceReg),
        priceLrg: parseFloat(priceLrg),
        image,
      };

      await saveProduct(product.id, productData); // Will create or update
      onDone();
    } catch (err) {
      console.error('Save failed', err);
      setError('Something went wrong. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 text-sm">
      {error && <p className="text-red-500">{error}</p>}

      {/* Name */}
      <div>
        <label className="block font-medium mb-1">Product Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-3 py-2 rounded bg-gray-700 text-white"
          required
        />
      </div>

      {/* Category */}
      <div>
        <label className="block font-medium mb-1">Category</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full px-3 py-2 rounded bg-gray-700 text-white"
          required
        >
          <option value="">Select category</option>
          <option value="milk-teas">Milk Teas</option>
          <option value="fruit-teas">Fruit Teas</option>
          <option value="special-teas">Special Teas</option>
          <option value="milkshakes">Milkshakes</option>
          <option value="fruity-twist-shakes">Fruity Twist Shakes</option>
          <option value="bubble-fruity-sundaes">Bubble Fruity Sundaes</option>
          <option value="frappes">Frappes</option>
        </select>
      </div>

      {/* Prices */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block font-medium mb-1">Regular Price (£)</label>
          <input
            type="number"
            step="0.01"
            value={priceReg}
            onChange={(e) => setPriceReg(e.target.value)}
            className="w-full px-3 py-2 rounded bg-gray-700 text-white"
            required
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Large Price (£)</label>
          <input
            type="number"
            step="0.01"
            value={priceLrg}
            onChange={(e) => setPriceLrg(e.target.value)}
            className="w-full px-3 py-2 rounded bg-gray-700 text-white"
            required
          />
        </div>
      </div>

      {/* Image URL & Preview */}
      <div>
        <label className="block font-medium mb-1">Image URL</label>
        <input
          type="text"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          className="w-full px-3 py-2 rounded bg-gray-700 text-white mb-2"
        />
        {image && (
          <img
            src={image}
            alt="Preview"
            className="w-32 h-32 object-contain rounded border mx-auto"
            onError={(e) => (e.target.src = 'https://via.placeholder.com/150')}
          />
        )}
      </div>

      {/* Buttons */}
      <div className="flex justify-between pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded"
        >
          {loading ? 'Saving...' : 'Save'}
        </button>
      </div>
    </form>
  );
}

export default ProductForm;
