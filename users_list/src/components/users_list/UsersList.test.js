import React from 'react';
import { render, cleanup } from '@testing-library/react';

import UsersList from './UsersList';

const mockedUsers = [
  {
    id: 0,
    name: 'John Doe',
    username: 'john',
  },
  {
    id: 1,
    name: 'Jane Doe',
    username: 'jane',
  },
];

beforeEach(() => {
  jest.spyOn(global, 'fetch').mockResolvedValue({
    json: jest.fn().mockResolvedValue(mockedUsers),
  });
});

afterEach(() => {
  jest.restoreAllMocks();
});

afterAll(cleanup);

describe('UsersList component test', () => {
  it('renders correct list of mocked users', async () => {
    const { findByText } = render(<UsersList searchText='' />);
    expect(await findByText('John Doe')).toBeInTheDocument();
    expect(await findByText('@john')).toBeInTheDocument();
    expect(await findByText('Jane Doe')).toBeInTheDocument();
    expect(await findByText('@jane')).toBeInTheDocument();
  });

  it('renders correct list of queried users', async () => {
    const { findByTestId } = render(<UsersList searchText='John' />);
    expect((await findByTestId('list-container')).childElementCount).toBe(1);
  });

  it('renders warning on rejected API call', async () => {
    const fetchMock = jest
      .spyOn(global, 'fetch')
      .mockRejectedValueOnce('Connection error');
    const windowAlert = jest
      .spyOn(window, 'alert')
      .mockImplementationOnce(jest.fn());
    const consoleMock = jest
      .spyOn(console, 'error')
      .mockImplementationOnce(jest.fn());
    const { findByText } = render(<UsersList searchText='' />);
    expect(await findByText('None user has been found')).toBeInTheDocument();
    expect(windowAlert).toBeCalledTimes(1);
    expect(fetchMock).toBeCalledTimes(1);
    expect(consoleMock).toBeCalledTimes(1);
  });

  it('renders no items message when none element mathes search query', async () => {
    const { findByText } = render(<UsersList searchText='Non-existent user' />);
    expect(await findByText('None user has been found')).toBeInTheDocument();
  });

  it('renders default loading message, then users list', async () => {
    const { getByTestId, findByText } = render(<UsersList searchText='' />);
    expect(getByTestId('loading-container')).toHaveTextContent('Loading...');
    expect(await findByText('John Doe')).toBeInTheDocument();
  });

  it('renders custom loading message, then users list', async () => {
    const loadingMsg = 'Loading users...';
    const { getByTestId, findByText } = render(
      <UsersList searchText='' loadingMsg={loadingMsg} />
    );
    expect(getByTestId('loading-container')).toHaveTextContent(loadingMsg);
    expect(await findByText('John Doe')).toBeInTheDocument();
  });
});
