import React from 'react';
import renderer from 'react-test-renderer';
import Copyright from '../components/building-blocks/Copyright';
import {BrowserRouter as Router} from 'react-router-dom';

test('Copyright Test', () => {
  const component = renderer.create(
    <Router>
      <Copyright />
    </Router>
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});