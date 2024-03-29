import React, { useEffect, useState } from 'react';
import { Box, Stack, TextField, Typography } from '@mui/material';

import { fetchData, exerciseOptions } from '../utils/fetchData';
import HorizontalScrollbar from './HorizontalScrollbar';
import ReusableButton from './ReusableButton';
import SearchSuggestion from './SearchSuggestion';

const SearchExercises = ({ setExercises, bodyPart, setBodyPart }) => {
  const [search, setSearch] = useState('');
  const [bodyParts, setBodyParts] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    const fetchExercisesData = async () => {
      const bodyPartsData = await fetchData('https://exercisedb.p.rapidapi.com/exercises/bodyPartList', exerciseOptions);

      setBodyParts(['all', ...bodyPartsData]);
    };

    fetchExercisesData();
  }, []);

  const caseCheck = (target = '', dest = '') => target.toLowerCase().includes(dest);

  const handleSearch = async () => {
    if (search) {
      const exercisesData = await fetchData('https://exercisedb.p.rapidapi.com/exercises', exerciseOptions);

      const searchedExercises = exercisesData.filter((item) => caseCheck(item.name, search) || caseCheck(item.target, search) || caseCheck(item.bodyPart, search) || caseCheck(item.equipment, search));

      window.scrollTo({ top: 1800, left: 100, behavior: 'smooth' });

      setSearch('');

      setExercises(searchedExercises);
    }
  };

  const handleInputChange = (e) => {
    const input = e.target.value.toLowerCase();
    setSearch(input);
    setShowSuggestions(input.trim() !== '');
  };

  const handleSelectSuggestion = (selectedSuggestion) => {
    setSearch(selectedSuggestion);
    setShowSuggestions(false);
  };

  return (
    <Stack alignItems="center" mt="37px" justifyContent="center" p="20px">
      <Typography fontWeight={700} sx={{ fontSize: { lg: '44px', xs: '30px' } }} mb="49px" textAlign="center">
        Awesome Exercises You <br /> Should Know
      </Typography>
      <Box position="relative" mb="72px">
        <TextField
          height="76px"
          sx={{
            input: { fontWeight: '700', border: 'none', borderRadius: '4px' },
            width: { lg: '1170px', xs: '350px' },
            backgroundColor: '#fff',
            borderRadius: '40px',
          }}
          value={search}
          onChange={handleInputChange}
          placeholder="Search Exercises"
          type="text"
        />

        <ReusableButton
          onClick={handleSearch}
          additionalStyles={{
            bgcolor: '#FF2625',
            color: '#fff',
            textTransform: 'none',
            width: { lg: '173px', xs: '80px' },
            height: '56px',
            position: 'absolute',
            right: '0px',
            fontSize: { lg: '20px', xs: '14px' },
          }}
          disabled={!search}
        >
          Search
        </ReusableButton>
        {showSuggestions && <SearchSuggestion inputValue={search} onSelect={handleSelectSuggestion} />}
      </Box>
      <Box sx={{ position: 'relative', width: '100%', p: '20px' }}>
        <HorizontalScrollbar data={bodyParts} bodyParts setBodyPart={setBodyPart} bodyPart={bodyPart} />
      </Box>
    </Stack>
  );
};

export default SearchExercises;
