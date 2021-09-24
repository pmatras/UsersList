import React from 'react';
import { render, cleanup } from '@testing-library/react';
import renderer from 'react-test-renderer';

import List from './List';

afterAll(cleanup);

describe('List component tests', () => {
  it('renders successfully when empty items list passed', () => {
    const { getByTestId } = render(<List items={[]} />);
    expect(getByTestId('no-items-container')).toBeInTheDocument();
    expect(getByTestId('no-items-container')).toHaveTextContent('No elements');
  });

  it('renders successfully when non empty items list passed', () => {
    const items = [
      {
        id: 0,
        name: 'item1',
      },
      {
        id: 1,
        name: 'item2',
      },
    ];
    const { getByTestId } = render(<List items={items} />);
    expect(getByTestId('list-container')).toBeInTheDocument();
    expect(getByTestId('list-container')).toHaveTextContent(
      `${JSON.stringify(items[0])}${JSON.stringify(items[1])}`
    );
  });

  it('uses properly custom render function', () => {
    const items = [
      {
        id: 0,
        name: 'item1',
      },
      {
        id: 1,
        name: 'item2',
      },
    ];
    const { getByTestId } = render(
      <List items={items} renderFunction={({ name }) => <span>{name}</span>} />
    );
    expect(getByTestId('list-container')).toHaveTextContent(
      `${items[0].name}${items[1].name}`
    );
  });

  it('uses properly custom no items message', () => {
    const noItemsMsg = 'None element found';
    const { getByTestId } = render(<List items={[]} noItemsMsg={noItemsMsg} />);
    expect(getByTestId('no-items-container')).toHaveTextContent(noItemsMsg);
  });

  it('matches snapshot with mocked elements list', () => {
    const items = [
      {
        id: 0,
        name: 'item1',
      },
      {
        id: 1,
        name: 'item2',
      },
    ];
    const tree = renderer.create(<List items={items} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('matches snapshot with empty elements list', () => {
    const tree = renderer.create(<List items={[]} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
