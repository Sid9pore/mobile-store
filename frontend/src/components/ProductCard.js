import React from 'react';

export default function ProductCard({ product, isAdmin, onEdit, onDelete }) {
  return (
    <div className="border p-4 rounded shadow">
      <h3 className="text-xl">{product.name}</h3>
      <p>{product.description}</p>
      <p className="text-lg font-bold">₹{product.price}</p>
      {isAdmin && (
        <div className="flex gap-2 mt-2">
          <button className="bg-blue-500 text-white px-2 py-1 rounded" onClick={onEdit}>Edit</button>
          <button className="bg-red-500 text-white px-2 py-1 rounded" onClick={onDelete}>Delete</button>
        </div>
      )}
    </div>
  );
}
