import React, { useState } from 'react';
import Autosuggest from 'react-autosuggest';

type Props = {
  onSuggestionsFetch: (searchTerm: string) => Promise<any>;
  onGetSuggestionValue: (suggestion: any) => string;
  onRenderSuggestion: (suggestion: any) => React.ReactElement;
};

type State = {
  value: string;
  suggestions: any[];
};

const initialState: State = {
  value: '',
  suggestions: []
};

const Autocomplete = (props: Props) => {
  const { onSuggestionsFetch, onGetSuggestionValue, onRenderSuggestion } = props;

  const [value, setValue] = useState(initialState.value);
  const [suggestions, setSuggestions] = useState(initialState.suggestions);

  const handleOnChange = (event: React.FormEvent, { newValue }: any) => {
    setValue(newValue);
  };

  const onSuggestionsFetchRequested = async ({ value }: any) => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    if (inputLength === 0) {
      setSuggestions([]);
      return;
    }

    const results = await onSuggestionsFetch(value);
    setSuggestions(results);

    return;
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const inputProps = {
    placeholder: 'Start typing',
    value,
    onChange: handleOnChange
  };

  return (
    <Autosuggest
      suggestions={suggestions}
      onSuggestionsFetchRequested={onSuggestionsFetchRequested}
      onSuggestionsClearRequested={onSuggestionsClearRequested}
      getSuggestionValue={onGetSuggestionValue}
      renderSuggestion={onRenderSuggestion}
      inputProps={inputProps}
    />
  );
};

export default Autocomplete;
