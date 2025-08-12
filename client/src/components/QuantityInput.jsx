import React from 'react';
import { PlusIcon, MinusIcon } from '../assets/icons.jsx';

const QuantityInput = ({ quantity, onDecrease, onIncrease }) => (
    <div className="flex items-center border border-gray-600 rounded-md">
        <button 
            type="button" 
            onClick={onDecrease} 
            className="px-3 py-1 text-white hover:bg-gray-700 transition-colors"
        >
            <MinusIcon className="h-4 w-4" />
        </button>
        <span className="px-4 text-white font-semibold">{quantity}</span>
        <button 
            type="button" 
            onClick={onIncrease} 
            className="px-3 py-1 text-white hover:bg-gray-700 transition-colors"
        >
            <PlusIcon className="h-4 w-4" />
        </button>
    </div>
);

export default QuantityInput;
