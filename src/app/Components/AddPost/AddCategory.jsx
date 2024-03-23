"use client";
import React, { useState } from 'react';
import TextField from '@mui/material/TextField';

const AddCategory = ({ CategoriesList, onAddCategory }) => {
  const [typedCategory, setTypedCategory] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  
  const filteredCategories = CategoriesList.filter(category =>
    category.toLowerCase().startsWith(typedCategory.toLowerCase())
  );

  const handleInputChange = (event) => {
    const typedText = event.target.value;
    setTypedCategory(typedText);
    setShowSuggestions(true);
  };

  const handleItemClick = (category) => {
    setTypedCategory(category);
    setShowSuggestions(false);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      addCategory();
    }
  };

  const addCategory = () => {
    if (typedCategory.trim() !== '') {
      onAddCategory(typedCategory);
      setTypedCategory('');
    }
  };

  return (
    <div className='py-2 my-3'>
      <TextField 
        type="text" 
        value={typedCategory} 
        onChange={handleInputChange} 
        onKeyDown={handleKeyDown}
        placeholder="Add a category..." 
        className='py-2 w-full'
      />
      {showSuggestions && (
        <ul className=" bg-white border w-fit rounded shadow-md">
          {filteredCategories.map((category, index) => (
            <li 
              key={index} 
              className="px-4 py-2 cursor-pointer hover:bg-gray-100" 
              onClick={() => handleItemClick(category)}
            >
              {category}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AddCategory;
