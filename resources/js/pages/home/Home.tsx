import React, {useState} from 'react';
import {Helmet} from 'react-helmet-async';
import Autosuggest from 'react-autosuggest';
import {User} from '@/types/data';
import userService from '@/service/userService';

type State = {
  value: string;
  suggestions: User[];
};

const initialState: State = {
  value: '',
  suggestions: []
};

const Home = (): React.ReactElement => {
  const [value, setValue] = useState(initialState.value);
  const [suggestions, setSuggestions] = useState(initialState.suggestions);

  const onChange = (event: React.FormEvent, {newValue}: any) => {
    setValue(newValue);
  };

  const onSuggestionsFetchRequested = async ({value}: any) => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    if (inputLength === 0) {
      setSuggestions([]);
      return;
    }

    const users = await userService.getAllBySearchTerm({search_term: value});
    setSuggestions(users);

    return;
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const getSuggestionValue = (suggestion: User): string => suggestion.name;

  const renderSuggestion = (suggestion: User): React.ReactElement => (
    <div>
      {suggestion.name}
    </div>
  );

  const inputProps = {
    placeholder: 'Start searching for a user',
    value,
    onChange: onChange
  };

  return (
    <div className="home-container container">
      <Helmet>
        <title>Home | Docker Laravel</title>
      </Helmet>
      <div className="row my-5">
        <div className="col">
          <h4 className="mb-5">User Search</h4>
          <Autosuggest
            suggestions={suggestions}
            onSuggestionsFetchRequested={onSuggestionsFetchRequested}
            onSuggestionsClearRequested={onSuggestionsClearRequested}
            getSuggestionValue={getSuggestionValue}
            renderSuggestion={renderSuggestion}
            inputProps={inputProps}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
