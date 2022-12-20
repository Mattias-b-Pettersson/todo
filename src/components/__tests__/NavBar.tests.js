import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import CurrentUserProvider from '../../contexts/CurrentUserContext';
import NavBar from '../NavBar';

test('renders navbar', () => {
    render(
        <BrowserRouter>
            <NavBar />
        </BrowserRouter>
    );

    const signInLink = screen.getByRole('link', { name: 'Sign in' });
    expect(signInLink).toBeInTheDocument();
});


test('renders link to the users profile for a logged in user', async () => {
    render(
        <BrowserRouter>
            <CurrentUserProvider>
                <NavBar />
            </CurrentUserProvider>
        </BrowserRouter>
    );

    const profileAvatar = await screen.findByText('testaccount2');
    expect(profileAvatar).toBeInTheDocument();
});

test('renders sign in and sign out again on log out', async () => {
    render(
        <BrowserRouter>
            <CurrentUserProvider>
                <NavBar />
            </CurrentUserProvider>
        </BrowserRouter>
    );

    const profileAvatar = await screen.findByText('testaccount2');
    fireEvent.click(profileAvatar)
    const signOutLink = await screen.findByText('Sign out');
    fireEvent.click(signOutLink);
    const signInLink = await screen.findByText('Sign in');
    expect(signInLink).toBeInTheDocument();
    const signUpLink = await screen.findByText('Sign up');
    expect(signUpLink).toBeInTheDocument();
});