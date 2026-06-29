import React, { useState, useEffect } from 'react';
import { publicApi } from '../services/api';
import './HomePage.css';

const HomePage = () => {
    const [content, setContent] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchContent();
    }, []);

    const fetchContent = async () => {
        try {
            const response = await publicApi.getContent('home');
            if (response.data.success) {
                setContent(response.data.data);
            }
        } catch (error) {
            console.error('Error fetching content:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div className="loading">Loading...</div>;

    return (
        <div className="homepage">
            <header className="navbar">
                <div className="logo-area">Insp<span>Hired</span></div>
                <ul className="nav-links">
                    <li><a href="#home">Home</a></li>
                    <li><a href="#about">About Us</a></li>
                    <li><a href="#services">Our Services</a></li>
                    <li><a href="#career-lab">Career Lab</a></li>
                    <li><a href="#contact">Contact Us</a></li>
                </ul>
                <button className="btn-consultation">🗓 Book Consultation</button>
            </header>

            <section id="home" className="hero-section">
                <div className="hero-container">
                    <div className="hero-content">
                        <div className="hero-left">
                            <div className="badge">{content.badge || '🌍 Africa\'s Recruitment Partner - Est. 2015'}</div>
                            <h1 className="hero-title">{content.title || 'Connecting great talent with great companies'}</h1>
                            <p className="hero-description">{content.description || 'We don\'t just fill jobs — we build careers, relationships, and futures.'}</p>
                            <div className="cta-group">
                                <button className="btn-primary">Find talent</button>
                                <button className="btn-secondary">Available jobs</button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section id="about" className="section about-section">
                <div className="container">
                    <h2>About InspHired</h2>
                    <p>We are a leading recruitment agency dedicated to connecting talented professionals with great companies across Africa.</p>
                </div>
            </section>

            <section id="services" className="section services-section">
                <div className="container">
                    <h2>Our Services</h2>
                    <p>We offer comprehensive recruitment and career development services tailored to the African market.</p>
                    <div className="services-grid">
                        <div className="service-card">
                            <span className="service-icon">🔍</span>
                            <h3>Executive Search</h3>
                        </div>
                        <div className="service-card">
                            <span className="service-icon">🤝</span>
                            <h3>Talent Acquisition</h3>
                        </div>
                        <div className="service-card">
                            <span className="service-icon">📈</span>
                            <h3>Career Coaching</h3>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default HomePage;