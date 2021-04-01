import React from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';

import LikeButton from '../components/building-blocks/LikeButton';

let container = null;
beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.removeChild(container);
  container = null;
});

it('Verfiy heart selected icon is displayed for liked button', () => {
  act(() => {
    ReactDOM.render(<LikeButton liked={true} />, container);
  });
  const icon = container.querySelector('i');
  const button = container.querySelector('button');
  act(() => {
    expect(icon.classList.contains('fa-heart')).toBe(true);
  });

  //test click event
  act(() => {
    button.dispatchEvent(new MouseEvent('click', { bubbles: true }));
  });
  //when like button is implemented should be false
  expect(button.querySelector('i').classList.contains('fa-heart')).toBe(true);
  //expect(document.title).toBe('You clicked 1 times');
});

it('Verfiy blank heart icon is displayed for not yet liked button', () => {
  act(() => {
    ReactDOM.render(<LikeButton liked={false} />, container);
    const icon = container.querySelector('i');
    expect(icon.classList.contains('fa-heart-o')).toBe(true);
  });
});
