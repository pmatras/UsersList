import React from 'react';
import { render, cleanup } from '@testing-library/react';

import MainView from './MainView';

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

describe('MainView component tests', () => {
  it('renders successfully', async () => {
    const { findByTestId } = render(<MainView />);
    expect(await findByTestId('app-container')).toBeInTheDocument();
  });

  it(`renders 'Users List' header`, async () => {
    const { findByText } = render(<MainView />);
    expect(await findByText('Users List')).toBeInTheDocument();
  });

  it('renders SearchBar component', async () => {
    const { findByTestId } = render(<MainView />);
    expect(await findByTestId('search-bar')).toBeInTheDocument();
  });

  it('renders UsersList component', async () => {
    const { findByText } = render(<MainView />);
    expect(await findByText('John Doe')).toBeInTheDocument();
  });
});
