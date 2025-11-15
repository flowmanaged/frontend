import React, { useState } from 'react';

const AuthModal = ({
    setIsLoggedIn,
    setUserEmail,
    setUserRole,
    setShowAuthModal,
    showToast
}) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            setMessage('Proszę wypełnić wszystkie pola');
            return;
        }

        try {
            const res = await fetch('http://localhost:3000/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',          // jeśli backend zwraca JWT w ciastku
                body: JSON.stringify({ email, password })
            });

            const data = await res.json();

            if (!res.ok) {
                setMessage(data.message || 'Błędne dane logowania');
                return;
            }

            // === POPRAWNE LOGOWANIE ===
            setIsLoggedIn(true);
            setUserEmail(email);
            setUserRole(data.role || 'user');

            showToast('Zalogowano pomyślnie', 'success');
            setShowAuthModal(false);
            setMessage('');

        } catch (err) {
            console.error(err);
            setMessage('Brak połączenia z serwerem');
        }
    };

    return (
        <div className="auth-modal">
            <form onSubmit={handleLogin} className="auth-modal-content">
                <h2>Logowanie</h2>

                <input
                    type="email"
                    placeholder="Adres e-mail"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Hasło"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                {message && <p className="error-message">{message}</p>}

                <button type="submit">Zaloguj</button>

                <button
                    type="button"
                    className="close-btn"
                    onClick={() => setShowAuthModal(false)}
                >
                    Zamknij
                </button>
            </form>
        </div>
    );
};

export default AuthModal;
