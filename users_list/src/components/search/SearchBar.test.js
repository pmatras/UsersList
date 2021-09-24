import React from 'react';
import { render, cleanup } from '@testing-library/react';
import renderer from 'react-test-renderer';
import userEvent from '@testing-library/user-event';

import SearchBar from './SearchBar';

afterAll(cleanup);

describe('SearchBar component tests', () => {
  it('renders successfully', () => {
    const { getByTestId } = render(
      <SearchBar value='' onQueryChange={() => {}} />
    );
    expect(getByTestId('search-bar')).toBeInTheDocument();
  });

  it('renders successfully with passed value prop', () => {
    const searchQuery = 'Search Query';
    const { getByTestId } = render(
      <SearchBar value={searchQuery} onQueryChange={() => {}} />
    );
    expect(getByTestId('search-bar')).toHaveValue(searchQuery);
  });

  it('renders successfully with empty value passed', () => {
    const { getByTestId } = render(
      <SearchBar value='' onQueryChange={() => {}} />
    );
    expect(getByTestId('search-bar')).toHaveValue('');
  });

  it('renders successfully with default placeholder', () => {
    const { getByPlaceholderText } = render(
      <SearchBar value='' onQueryChange={() => {}} />
    );
    expect(getByPlaceholderText('Search...')).toBeInTheDocument();
  });

  it('renders successfully with custom placeholder', () => {
    const placeholder = 'Type to search...';
    const { getByPlaceholderText } = render(
      <SearchBar value='' onQueryChange={() => {}} placeholder={placeholder} />
    );
    expect(getByPlaceholderText(placeholder)).toBeInTheDocument();
  });

  it('properly fires onQueryChange function', () => {
    const onQueryChange = jest.fn();
    const { getByTestId } = render(
      <SearchBar value='' onQueryChange={onQueryChange} />
    );
    const input = 'Typing...';
    userEvent.type(getByTestId('search-bar'), input);
    expect(onQueryChange).toBeCalledTimes(input.length);
  });

  it('matches snapshot with empty value', () => {
    const tree = renderer
      .create(<SearchBar value='' onQueryChange={() => {}} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('matches snapshot with provided value', () => {
    const tree = renderer
      .create(<SearchBar value='Example query' onQueryChange={() => {}} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
