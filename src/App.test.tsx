import React from 'react';
import { shallow } from 'enzyme';
import App from './App';

describe('Test', () => {
  const render = shallow(<App/>);
  test('Render UI', () => {
    expect(render).toMatchSnapshot();
  });
});
