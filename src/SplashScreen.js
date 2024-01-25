import React, { useEffect, useState } from 'react';

const SplashScreen = ({ setDisplaySplash }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            setDisplaySplash(false);
        }, 2000); // Заставка отображается в течение 2 секунд

        return () => clearTimeout(timer);
    }, [setDisplaySplash]);

    return (
        <div className="splash-screen">
            {/* Здесь может быть ваша заставка */}
            <h1>Loading...</h1>
        </div>
    );
};
export default SplashScreen;