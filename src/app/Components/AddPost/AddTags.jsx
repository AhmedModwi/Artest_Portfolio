"use client";
import React, { useState } from 'react';
import TextField from '@mui/material/TextField';

const AddTags = ({ TagsList, onAddTag }) => {
  const [typedTag, setTypedTag] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  
  const filteredTags = TagsList.filter(tag =>
    tag.toLowerCase().startsWith(typedTag.toLowerCase())
  );

  const handleInputChange = (event) => {
    const typedText = event.target.value;
    setTypedTag(typedText);
    setShowSuggestions(true);
  };

  const handleItemClick = (tag) => {
    setTypedTag(tag);
    setShowSuggestions(false);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      addTag();
    }
  };

  const addTag = () => {
    if (typedTag.trim() !== '') {
      onAddTag(typedTag);
      setTypedTag('');
    }
  };

  return (
    <div className='py-2 my-3'>
      <TextField 
        type="text" 
        value={typedTag} 
        onChange={handleInputChange} 
        onKeyDown={handleKeyDown}
        placeholder="Type here..." 
      />
      {showSuggestions && (
        <ul className="my-2 bg-white border rounded shadow-md">
          {filteredTags.map((tag, index) => (
            <li 
              key={index} 
              className="px-4 py-2 cursor-pointer hover:bg-gray-100" 
              onClick={() => handleItemClick(tag)}
            >
              {tag}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AddTags;
