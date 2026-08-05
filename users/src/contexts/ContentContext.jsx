// users/src/contexts/ContentContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { publicApi } from '../services/api';

const ContentContext = createContext();

export const useContent = () => useContext(ContentContext);

export const ContentProvider = ({ children }) => {
    const [content, setContent] = useState({
        home: null,
        about: null,
        contact: null,
        careerLab: null,
        employers: null,
        services: null
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchAllContent();
    }, []);

    const fetchAllContent = async () => {
        setLoading(true);
        try {
            const [home, about, contact, careerLab, employers, services] = await Promise.all([
                publicApi.getHomepage(),
                publicApi.getAbout(),
                publicApi.getContact(),
                publicApi.getCareerLab(),
                publicApi.getEmployers(),
                publicApi.getServices()
            ]);

            setContent({
                home: home.success ? home.data : null,
                about: about.success ? about.data : null,
                contact: contact.success ? contact.data : null,
                careerLab: careerLab.success ? careerLab.data : null,
                employers: employers.success ? employers.data : null,
                services: services.success ? services.data : null
            });
        } catch (err) {
            console.error('Error fetching content:', err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const refreshContent = async () => {
        await fetchAllContent();
    };

    return (
        <ContentContext.Provider value={{ content, loading, error, refreshContent }}>
            {children}
        </ContentContext.Provider>
    );
};