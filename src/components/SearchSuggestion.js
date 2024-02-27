import React, { useState, useEffect } from 'react';
import { List, ListItem, Paper } from '@mui/material';
import { fetchData, exerciseOptions } from '../utils/fetchData';

const SearchSuggestion = ({ inputValue, onSelect }) => {
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const fetchSuggestions = async () => {
      try {
        const data = await fetchData('https://exercisedb.p.rapidapi.com/exercises/bodyPartList', exerciseOptions);
        setSuggestions(data);
      } catch (error) {
        // console.error('Error fetching suggestions:', error);
      }
    };

    fetchSuggestions();
  }, [inputValue]);

  const filteredSuggestions = suggestions.filter((suggestion) => suggestion.toLowerCase().includes(inputValue.toLowerCase()));

  return (
    <Paper elevation={3} sx={{ position: 'absolute', top: '100%', left: 0, right: 0, zIndex: 1000 }}>
      <List>
        {filteredSuggestions.map((suggestion, index) => (
          <ListItem key={index} onClick={() => onSelect(suggestion)}>
            {suggestion}
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default SearchSuggestion;
