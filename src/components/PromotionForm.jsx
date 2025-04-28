import React, { useState } from 'react';
import { savePromotion } from '../services/firebaseService'; // Make sure savePromotion exists

function PromotionForm({ promotion = {}, onDone }) {
  const [title, setTitle] = useState(promotion.title || '');
  const [description, setDescription] = useState(promotion.description || '');
  const [category, setCategory] = useState(promotion.category || 'milk-teas');
  const [size, setSize] = useState(promotion.size || 'Regular');
  const [requiredQuantity, setRequiredQuantity] = useState(promotion.requiredQuantity || 2);
  const [regularPromoPrice, setRegularPromoPrice] = useState(promotion.regularPromoPrice || 0);
  const [largePromoPrice, setLargePromoPrice] = useState(promotion.largePromoPrice || 0);
  const [active, setActive] = useState(promotion.active ?? true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const promoData = {
        title,
        description,
        category,
        size,
        requiredQuantity: Number(requiredQuantity),
        regularPromoPrice: Number(regularPromoPrice),
        largePromoPrice: Number(largePromoPrice),
        active,
      };

      await savePromotion(promotion.id, promoData);

      onDone(); // Close modal + refresh
    } catch (err) {
      console.error('Failed to save promotion', err);
      setError('Failed to save promotion.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <p className="text-red-500">{error}</p>}

      <div>
        <label className="block text-sm mb-1">Title</label>
        <input
          type="text"
          className="w-full px-3 py-2 rounded bg-gray-700 text-white"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div>
        <label className="block text-sm mb-1">Description</label>
        <textarea
          className="w-full px-3 py-2 rounded bg-gray-700 text-white"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div>
        <label className="block text-sm mb-1">Category</label>
        <select
          className="w-full px-3 py-2 rounded bg-gray-700 text-white"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="milk-teas">Milk Teas</option>
          <option value="fruit-teas">Fruit Teas</option>
          <option value="special-teas">Special Teas</option>
          <option value="milkshakes">Milkshakes</option>
          <option value="fruity-twist-shakes">Fruity Twist Shakes</option>
          <option value="bubble-fruity-sundaes">Bubble Fruity Sundaes</option>
          <option value="frappes">Frappes</option>
        </select>
      </div>

      <div>
        <label className="block text-sm mb-1">Size</label>
        <select
          className="w-full px-3 py-2 rounded bg-gray-700 text-white"
          value={size}
          onChange={(e) => setSize(e.target.value)}
        >
          <option value="Regular">Regular</option>
          <option value="Large">Large</option>
        </select>
      </div>

      <div>
        <label className="block text-sm mb-1">Required Quantity</label>
        <input
          type="number"
          min="1"
          className="w-full px-3 py-2 rounded bg-gray-700 text-white"
          value={requiredQuantity}
          onChange={(e) => setRequiredQuantity(e.target.value)}
          required
        />
      </div>

      <div>
        <label className="block text-sm mb-1">Regular Promo Price (£)</label>
        <input
          type="number"
          min="0"
          className="w-full px-3 py-2 rounded bg-gray-700 text-white"
          value={regularPromoPrice}
          onChange={(e) => setRegularPromoPrice(e.target.value)}
          required
        />
      </div>

      <div>
        <label className="block text-sm mb-1">Large Promo Price (£)</label>
        <input
          type="number"
          min="0"
          className="w-full px-3 py-2 rounded bg-gray-700 text-white"
          value={largePromoPrice}
          onChange={(e) => setLargePromoPrice(e.target.value)}
          required
        />
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          checked={active}
          onChange={(e) => setActive(e.target.checked)}
          className="mr-2"
        />
        <label className="text-sm">Active</label>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-2 px-4 rounded"
      >
        {loading ? 'Saving...' : 'Save Promotion'}
      </button>
    </form>
  );
}

export default PromotionForm;
