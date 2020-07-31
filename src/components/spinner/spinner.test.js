import React from 'react';
import renderer from 'react-test-renderer';
import Spinner from './spinner';

describe('Spinner component renders correctly', () => {
  it('should render Spinner', () => {
    const tree = renderer.create(<Spinner />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
