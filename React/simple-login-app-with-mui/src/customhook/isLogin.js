
import { useState, useEffect } from 'react';
import {useNavigate} from 'react-router-dom'

export default function useIsLoggedIn() {
    const navigate = useNavigate();
    const storedEmail = localStorage.getItem('user') || sessionStorage.getItem('user');
    const isLoggedIn = !!storedEmail;
    if (isLoggedIn) {
        const cookies = document.cookie.split('; ');
        const userCookie = cookies.find(row => row.startsWith('user='));
        if (!userCookie) {
            navigate('/logout', {replace: true});
        }
    }

    useEffect(() => {
        const cookies = document.cookie.split('; ');
        const userCookie = cookies.find(row => row.startsWith('user='));
        if (isLoggedIn && !userCookie) {
            document.cookie = `user=${storedEmail}; path=/`;
        }
    }, [isLoggedIn, storedEmail]);

    return [isLoggedIn, storedEmail];
}