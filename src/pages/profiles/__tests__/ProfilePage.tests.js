import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { SetCurrentUserContext } from '../../../App';
import CurrentUserProvider from '../../../contexts/CurrentUserContext';
import { act } from 'react-dom/test-utils';
import { ProfilePage } from '../ProfilePage';

test('renders todos', async () => {

    render(
        <BrowserRouter>
            <CurrentUserProvider>
                <ProfilePage />
            </CurrentUserProvider>
        </BrowserRouter>
    );

    const profile = await screen.findByText('testaccount2');
    expect(profile).toBeInTheDocument();
    const aboutMe = await screen.findByText('About me:');
    expect(aboutMe).toBeInTheDocument();
    const username = await screen.findByText('testaccount2');
    expect(username).toBeInTheDocument();
    const name = await screen.findByText('test name');
    expect(name).toBeInTheDocument();

});


