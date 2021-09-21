import React from 'react';
import { Helmet } from 'react-helmet-async';
import Autocomplete from '@/components/Autocomplete/Autocomplete';
import { User } from '@/types/data';
import userService from '@/service/userService';

const Home = (): React.ReactElement => {
  const handleFetchUsers = (searchTerm: string) => {
    return userService.getAllBySearchTerm({ search_term: searchTerm });
  };

  const handleGetSuggestionValue = (suggestion: User): string => suggestion.name;

  const handleRenderSuggestion = (suggestion: User): React.ReactElement => (
    <span>
      {suggestion.name} - {suggestion.email}
    </span>
  );

  return (
    <div className="home-container container">
      <Helmet>
        <title>Home | Docker Laravel</title>
      </Helmet>
      <div className="row my-5">
        <div className="col">
          <h4 className="mb-5">User Search</h4>
          <Autocomplete
            onSuggestionsFetch={handleFetchUsers}
            onGetSuggestionValue={handleGetSuggestionValue}
            onRenderSuggestion={handleRenderSuggestion}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
