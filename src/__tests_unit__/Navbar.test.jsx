// Navbar.test.jsx
import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import  {AuthInfo}  from '../Provider/AuthProvider';
import Navbar from '../Shared/Navbar/Navbar';

// Mocking the AuthInfo context
const MockAuthProvider = ({ children, value }) => (
    <AuthInfo.Provider value={value}>{children}</AuthInfo.Provider>
);

describe('Navbar Component', () => {
    it('navigates to the correct pages when links are clicked', async () => {
        const user = { email: 'test@example.com' }; // Mock user data
        const mockValue = { user, loader: false }; // Mock AuthInfo context value

        render(
            <Router>
                <MockAuthProvider value={mockValue}>
                    <Navbar />
                </MockAuthProvider>
            </Router>
        );

        // Wait for the links to appear
        await waitFor(() => {
            expect(screen.getByText(/Home/i)).toBeInTheDocument();
            expect(screen.getByText(/About Us/i)).toBeInTheDocument();
            expect(screen.getByText(/Contact Us/i)).toBeInTheDocument();
        });

        // Click on 'Home' link and check the URL
        fireEvent.click(screen.getByText(/Home/i));
        await waitFor(() => expect(window.location.pathname).toBe('/'));

        // Click on 'About Us' link and check the URL
        fireEvent.click(screen.getByText(/About Us/i));
        await waitFor(() => expect(window.location.pathname).toBe('/aboutUs'));

        // Click on 'Contact Us' link and check the URL
        fireEvent.click(screen.getByText(/Contact Us/i));
        await waitFor(() => expect(window.location.pathname).toBe('/contactUs'));
    });

    it('shows loading spinner when loader is true', () => {
        const mockValue = { user: null, loader: true }; // Simulating loading state

        render(
            <Router>
                <MockAuthProvider value={mockValue}>
                    <Navbar />
                </MockAuthProvider>
            </Router>
        );

        expect(screen.getByText(/loading/i)).toBeInTheDocument(); // Adjust this line based on how your loading spinner is rendered
    });
});
