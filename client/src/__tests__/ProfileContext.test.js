// import React from 'react';
// import { render, cleanup,  fireEvent } from '@testing-library/react';
// import ProfileProvider, { ProfileContext } from '../context/ProfileContext';
// import Profile from '../components/pages/Profile';

// const renderWithContext = (
//   component) => {
//   return {
//     ...render(
//         <ProfileProvider value={ProfileContext}>
//             {component}
//         </ProfileProvider>)
//   }
// }

// afterEach(cleanup);

// it('checks if username from profile context exist in the profile page', () => {
//     const { getByTestId } = renderWithContext(<Profile />)
//     expect(getByTestId('usernameLabelProfile')).toHaveTextContent('0')
// })