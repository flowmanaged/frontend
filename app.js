const { useState, useRef } = React;

const BookOpen = ({ className }) => <i data-lucide="book-open" className={className}></i>;
const Award = ({ className }) => <i data-lucide="award" className={className}></i>;
const CheckCircle = ({ className }) => <i data-lucide="check-circle" className={className}></i>;
const XCircle = ({ className }) => <i data-lucide="x-circle" className={className}></i>;
const Home = ({ className }) => <i data-lucide="home" className={className}></i>;
const Trophy = ({ className }) => <i data-lucide="trophy" className={className}></i>;
const ArrowRight = ({ className }) => <i data-lucide="arrow-right" className={className}></i>;
const Brain = ({ className }) => <i data-lucide="brain" className={className}></i>;
const Zap = ({ className }) => <i data-lucide="zap" className={className}></i>;
const Target = ({ className }) => <i data-lucide="target" className={className}></i>;
const Lock = ({ className }) => <i data-lucide="lock" className={className}></i>;
const Crown = ({ className }) => <i data-lucide="crown" className={className}></i>;
const X = ({ className }) => <i data-lucide="x" className={className}></i>;
const User = ({ className }) => <i data-lucide="user" className={className}></i>;
const Mail = ({ className }) => <i data-lucide="mail" className={className}></i>;
const CreditCard = ({ className }) => <i data-lucide="credit-card" className={className}></i>;
const Smartphone = ({ className }) => <i data-lucide="smartphone" className={className}></i>;
const Youtube = ({ className }) => <i data-lucide="youtube" className={className}></i>;
const FileText = ({ className }) => <i data-lucide="file-text" className={className}></i>;
const Users = ({ className }) => <i data-lucide="users" className={className}></i>;
const ShoppingCart = ({ className }) => <i data-lucide="shopping-cart" className={className}></i>;
const Key = ({ className }) => <i data-lucide="key" className={className}></i>;
const BarChart = ({ className }) => <i data-lucide="bar-chart-2" className={className}></i>;
const Settings = ({ className }) => <i data-lucide="settings" className={className}></i>;
const Tag = ({ className }) => <i data-lucide="tag" className={className}></i>;
const Activity = ({ className }) => <i data-lucide="activity" className={className}></i>;
const MessageSquare = ({ className }) => <i data-lucide="message-square" className={className}></i>;
const Shield = ({ className }) => <i data-lucide="shield" className={className}></i>;
const Edit = ({ className }) => <i data-lucide="edit" className={className}></i>;
const Trash = ({ className }) => <i data-lucide="trash-2" className={className}></i>;
const Check = ({ className }) => <i data-lucide="check" className={className}></i>;
const Plus = ({ className }) => <i data-lucide="plus" className={className}></i>;
const Download = ({ className }) => <i data-lucide="download" className={className}></i>;
const Search = ({ className }) => <i data-lucide="search" className={className}></i>;
const Filter = ({ className }) => <i data-lucide="filter" className={className}></i>;
const ChevronDown = ({ className }) => <i data-lucide="chevron-down" className={className}></i>;
const ChevronRight = ({ className }) => <i data-lucide="chevron-right" className={className}></i>;
const Menu = ({ className }) => <i data-lucide="menu" className={className}></i>;
const LogOut = ({ className }) => <i data-lucide="log-out" className={className}></i>;
const DollarSign = ({ className }) => <i data-lucide="dollar-sign" className={className}></i>;
const TrendingUp = ({ className }) => <i data-lucide="trending-up" className={className}></i>;
const Package = ({ className }) => <i data-lucide="package" className={className}></i>;
const Eye = ({ className }) => <i data-lucide="eye" className={className}></i>;
const EyeOff = ({ className }) => <i data-lucide="eye-off" className={className}></i>;
const AlertCircle = ({ className }) => <i data-lucide="alert-circle" className={className}></i>;

const App = () => {
    // API Configuration
    const API_URL = 'http://localhost:5000/api';

    const [currentView, setCurrentView] = useState('home');
    const [currentSection, setCurrentSection] = useState(0);
    const [quizAnswers, setQuizAnswers] = useState({});
    const [showResults, setShowResults] = useState(false);
    const [completedSections, setCompletedSections] = useState(new Set());
    const [isPremium, setIsPremium] = useState(false);
    const [showPremiumModal, setShowPremiumModal] = useState(false);

    // Nowe stany dla autoryzacji
    const [showAuthModal, setShowAuthModal] = useState(false);
    const [authView, setAuthView] = useState('login');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userEmail, setUserEmail] = useState('');
    const [userRole, setUserRole] = useState('user');

    // Toast state
    const [toast, setToast] = useState(null);
    const [premiumExpiryDate, setPremiumExpiryDate] = useState(null);

    // Admin panel states (zachowuję dla kompatybilności)
    const [adminView, setAdminView] = useState('dashboard');
    const [adminSidebarOpen, setAdminSidebarOpen] = useState(true);
    const [selectedUser, setSelectedUser] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');
    const [paymentStep, setPaymentStep] = useState('overview');
    const [paymentMethod, setPaymentMethod] = useState('blik');
    const [processingPayment, setProcessingPayment] = useState(false);
    const [showTermsPage, setShowTermsPage] = useState(false);
    const [showPrivacyPage, setShowPrivacyPage] = useState(false);

    // Toast function
    const showToast = (message, type = 'success') => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 3000);
    };

    // Check if user is logged in on mount
    React.useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            // Verify token and get user data
            fetchUserData(token);
        }
    }, []);

    const fetchUserData = async (token) => {
        try {
            const response = await fetch(`${API_URL}/auth/me`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                const data = await response.json();
                setIsLoggedIn(true);
                setUserEmail(data.user.email);
                setUserRole(data.user.role);
                setIsPremium(data.user.isPremium);
                if (data.user.premiumExpiresAt) {
                    setPremiumExpiryDate(data.user.premiumExpiresAt);
                }
            } else {
                localStorage.removeItem('token');
            }
        } catch (error) {
            console.error('Error fetching user data:', error);
            localStorage.removeItem('token');
        }
    };

    React.useEffect(() => {
        lucide.createIcons();
    });

    const sections = [
        {
            id: 1,
            title: "Wprowadzenie do Analizy Biznesowej",
            icon: "📊",
            color: "from-blue-500 to-cyan-500",
            isPremium: false,
            content: `Analiza biznesowa to dyscyplina polegająca na identyfikowaniu potrzeb biznesowych organizacji i określaniu rozwiązań problemów biznesowych...`
        },
        {
            id: 2,
            title: "Rola i Kompetencje BA",
            icon: "👤",
            color: "from-purple-500 to-pink-500",
            isPremium: false,
            content: `**Główne obowiązki BA:**\n• Identyfikacja i dokumentowanie wymagań biznesowych...`
        },
        {
            id: 3,
            title: "Proces Analizy Biznesowej",
            icon: "🔄",
            color: "from-green-500 to-teal-500",
            isPremium: false,
            content: `**Etapy procesu analizy biznesowej:**\n\n1. **Planowanie analizy biznesowej**...`
        }
    ];

    const quizQuestions = [
        {
            id: 1,
            question: "Co to jest stakeholder?",
            options: [
                "Osoba zarządzająca projektem",
                "Każda osoba lub grupa mogąca wpływać na projekt lub być nim dotknięta",
                "Tylko klienci końcowi",
                "Wyłącznie członkowie zespołu projektowego"
            ],
            correct: 1,
            isPremium: false
        },
        {
            id: 2,
            question: "Która z poniższych NIE jest kompetencją miękką Business Analista?",
            options: [
                "Komunikacja interpersonalna",
                "Znajomość SQL",
                "Myślenie analityczne",
                "Negocjacje"
            ],
            correct: 1,
            isPremium: false
        },
        {
            id: 3,
            question: "Która faza NIE należy do procesu analizy biznesowej?",
            options: [
                "Planowanie analizy biznesowej",
                "Elicitacja wymagań",
                "Programowanie aplikacji",
                "Dokumentowanie i walidacja"
            ],
            correct: 2,
            isPremium: false
        }
    ];

    const AuthModal = () => {
        const [email, setEmail] = useState('');
        const [password, setPassword] = useState('');
        const [confirmPassword, setConfirmPassword] = useState('');
        const [acceptTerms, setAcceptTerms] = useState(false);
        const [message, setMessage] = useState('');
        const [isLoading, setIsLoading] = useState(false);

        const handleLogin = async (e) => {
            e.preventDefault();
            if (!email || !password) {
                setMessage('Proszę wypełnić wszystkie pola');
                return;
            }

            setIsLoading(true);
            setMessage('');

            try {
                console.log('🔄 Wysyłanie requestu login do:', `${API_URL}/auth/login`);
                
                const response = await fetch(`${API_URL}/auth/login`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email, password })
                });

                const data = await response.json();
                console.log('📥 Odpowiedź z backendu:', data);
                console.log('📊 Status:', response.status);

                if (!response.ok) {
                    setMessage(data.message || 'Nieprawidłowy email lub hasło');
                    setIsLoading(false);
                    return;
                }

                if (data.success) {
                    setMessage('Logowanie pomyślne!');
                    
                    // Zapisz token do localStorage
                    localStorage.setItem('token', data.token);
                    
                    // Ustaw stan użytkownika
                    setIsLoggedIn(true);
                    setUserEmail(data.user.email);
                    setUserRole(data.user.role);
                    setIsPremium(data.user.isPremium);
                    
                    if (data.user.premiumExpiresAt) {
                        setPremiumExpiryDate(data.user.premiumExpiresAt);
                    }
                    
                    setTimeout(() => {
                        if (data.user.role === 'admin') {
                            showToast('Zalogowano jako Administrator', 'success');
                        } else {
                            showToast('Zalogowano pomyślnie', 'success');
                        }
                        setShowAuthModal(false);
                        setMessage('');
                        setIsLoading(false);
                    }, 500);
                }
            } catch (error) {
                console.error('❌ Błąd logowania:', error);
                setMessage('Błąd połączenia z serwerem. Upewnij się, że backend działa.');
                setIsLoading(false);
            }
        };

        const handleRegister = async (e) => {
            e.preventDefault();
            if (!email || !password || !confirmPassword) {
                setMessage('Proszę wypełnić wszystkie pola');
                return;
            }
            if (password !== confirmPassword) {
                setMessage('Hasła nie są zgodne');
                return;
            }
            if (!acceptTerms) {
                setMessage('Musisz zaakceptować regulamin');
                return;
            }

            setIsLoading(true);
            setMessage('');

            try {
                console.log('🔄 Wysyłanie requestu register do:', `${API_URL}/auth/register`);
                
                const response = await fetch(`${API_URL}/auth/register`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email, password })
                });

                const data = await response.json();
                console.log('📥 Odpowiedź z backendu:', data);

                if (!response.ok) {
                    setMessage(data.message || 'Błąd podczas rejestracji');
                    setIsLoading(false);
                    return;
                }

                if (data.success) {
                    setMessage('Konto utworzone! Możesz się teraz zalogować.');
                    setTimeout(() => {
                        setAuthView('login');
                        setMessage('');
                        setIsLoading(false);
                        setEmail('');
                        setPassword('');
                        setConfirmPassword('');
                    }, 2000);
                }
            } catch (error) {
                console.error('❌ Błąd rejestracji:', error);
                setMessage('Błąd połączenia z serwerem. Upewnij się, że backend działa.');
                setIsLoading(false);
            }
        };

        const handleForgotPassword = (e) => {
            e.preventDefault();
            if (!email) {
                setMessage('Proszę podać adres email');
                return;
            }
            setMessage('Funkcja resetowania hasła będzie wkrótce dostępna.');
        };

        return (
            <div className="auth-modal-overlay" onClick={() => setShowAuthModal(false)}>
                <div className="auth-modal-content glass rounded-2xl p-4 sm:p-6 md:p-8 max-w-sm sm:max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                    <div className="flex justify-between items-center mb-4 sm:mb-6">
                        <h2 className="text-xl sm:text-2xl font-bold text-white">
                            {authView === 'login' && 'Logowanie'}
                            {authView === 'register' && 'Rejestracja'}
                            {authView === 'forgot' && 'Resetowanie hasła'}
                        </h2>
                        <button
                            onClick={() => setShowAuthModal(false)}
                            className="text-white/70 hover:text-white transition-colors flex-shrink-0"
                            disabled={isLoading}
                        >
                            <X className="w-5 h-5 sm:w-6 sm:h-6" />
                        </button>
                    </div>

                    {message && (
                        <div className={`mb-3 sm:mb-4 p-2 sm:p-3 rounded-lg text-xs sm:text-sm ${
                            message.includes('pomyślne') || message.includes('utworzone') || message.includes('wysłany') 
                                ? 'bg-green-500/20 border border-green-500' 
                                : 'bg-red-500/20 border border-red-500'
                        }`}>
                            <p className="text-white">{message}</p>
                        </div>
                    )}

                    {authView === 'login' && (
                        <form onSubmit={handleLogin} className="space-y-3 sm:space-y-4">
                            <div>
                                <label className="block text-white/90 mb-1 sm:mb-2 text-xs sm:text-sm font-medium">Email</label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-xl bg-white/10 text-sm sm:text-base border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-purple-500 transition-colors"
                                    placeholder="twoj@email.com"
                                    disabled={isLoading}
                                />
                            </div>
                            <div>
                                <label className="block text-white/90 mb-1 sm:mb-2 text-xs sm:text-sm font-medium">Hasło</label>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-xl bg-white/10 text-sm sm:text-base border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-purple-500 transition-colors"
                                    placeholder="••••••••"
                                    disabled={isLoading}
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-2 sm:py-3 rounded-xl text-sm sm:text-base hover:shadow-lg transition-all disabled:opacity-50"
                                disabled={isLoading}
                            >
                                {isLoading ? 'Logowanie...' : 'Zaloguj się'}
                            </button>
                            <div className="flex justify-between mt-4">
                                <button
                                    type="button"
                                    onClick={() => { setAuthView('forgot'); setMessage(''); }}
                                    className="text-sm text-purple-300 hover:text-purple-200 transition-colors"
                                    disabled={isLoading}
                                >
                                    Zapomniałem hasła
                                </button>
                                <button
                                    type="button"
                                    onClick={() => { setAuthView('register'); setMessage(''); }}
                                    className="text-sm text-purple-300 hover:text-purple-200 transition-colors"
                                    disabled={isLoading}
                                >
                                    Zarejestruj się
                                </button>
                            </div>
                        </form>
                    )}

                    {authView === 'register' && (
                        <form onSubmit={handleRegister} className="space-y-3 sm:space-y-4">
                            <div>
                                <label className="block text-white/90 mb-1 sm:mb-2 text-xs sm:text-sm font-medium">Email</label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-xl bg-white/10 text-sm sm:text-base border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-purple-500 transition-colors"
                                    placeholder="twoj@email.com"
                                    disabled={isLoading}
                                />
                            </div>
                            <div>
                                <label className="block text-white/90 mb-1 sm:mb-2 text-xs sm:text-sm font-medium">Hasło</label>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-xl bg-white/10 text-sm sm:text-base border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-purple-500 transition-colors"
                                    placeholder="••••••••"
                                    disabled={isLoading}
                                />
                            </div>
                            <div>
                                <label className="block text-white/90 mb-1 sm:mb-2 text-xs sm:text-sm font-medium">Powtórz hasło</label>
                                <input
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-xl bg-white/10 text-sm sm:text-base border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-purple-500 transition-colors"
                                    placeholder="••••••••"
                                    disabled={isLoading}
                                />
                            </div>
                            <div className="space-y-3">
                                <label className="flex items-start gap-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={acceptTerms}
                                        onChange={(e) => setAcceptTerms(e.target.checked)}
                                        className="mt-1 w-4 h-4 rounded border-white/20 bg-white/10 text-purple-500 focus:ring-purple-500"
                                        disabled={isLoading}
                                    />
                                    <span className="text-white/90 text-sm">
                                        Akceptuję regulamin korzystania z serwisu
                                    </span>
                                </label>
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-2 sm:py-3 rounded-xl text-sm sm:text-base hover:shadow-lg transition-all disabled:opacity-50"
                                disabled={isLoading}
                            >
                                {isLoading ? 'Rejestracja...' : 'Zarejestruj się'}
                            </button>
                            <div className="text-center mt-4">
                                <button
                                    type="button"
                                    onClick={() => { setAuthView('login'); setMessage(''); }}
                                    className="text-sm text-purple-300 hover:text-purple-200 transition-colors"
                                    disabled={isLoading}
                                >
                                    Masz już konto? Zaloguj się
                                </button>
                            </div>
                        </form>
                    )}

                    {authView === 'forgot' && (
                        <form onSubmit={handleForgotPassword} className="space-y-3 sm:space-y-4">
                            <p className="text-white/70 text-sm mb-4">
                                Podaj swój adres email, a wyślemy Ci link do ustawienia nowego hasła.
                            </p>
                            <div>
                                <label className="block text-white/90 mb-1 sm:mb-2 text-xs sm:text-sm font-medium">Email</label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-xl bg-white/10 text-sm sm:text-base border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-purple-500 transition-colors"
                                    placeholder="twoj@email.com"
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-2 sm:py-3 rounded-xl text-sm sm:text-base hover:shadow-lg transition-all"
                            >
                                Wyślij link resetujący
                            </button>
                            <div className="text-center mt-4">
                                <button
                                    type="button"
                                    onClick={() => { setAuthView('login'); setMessage(''); }}
                                    className="text-sm text-purple-300 hover:text-purple-200 transition-colors"
                                >
                                    Powrót do logowania
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        );
    };

    const HomePage = () => (
        <div className="min-h-screen p-6">
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <div></div>
                    {!isLoggedIn ? (
                        <button
                            onClick={() => {
                                setShowAuthModal(true);
                                setAuthView('login');
                            }}
                            className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium rounded-xl hover:shadow-lg transition-all"
                        >
                            <User className="w-4 h-4" />
                            Zaloguj się
                        </button>
                    ) : (
                        <div className="flex items-center gap-4">
                            <span className="text-white/70 text-sm">Zalogowany: {userEmail}</span>
                            {userRole === 'admin' && (
                                <button
                                    onClick={() => setCurrentView('admin')}
                                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:shadow-lg transition-all text-sm font-medium"
                                >
                                    <Shield className="w-4 h-4" />
                                    Panel Admina
                                </button>
                            )}
                            <button
                                onClick={() => {
                                    setIsLoggedIn(false);
                                    setUserEmail('');
                                    setUserRole('user');
                                    setIsPremium(false);
                                    localStorage.removeItem('token');
                                    showToast('Wylogowano pomyślnie', 'success');
                                }}
                                className="px-4 py-2 bg-white/10 text-white rounded-xl hover:bg-white/20 transition-all text-sm"
                            >
                                Wyloguj
                            </button>
                        </div>
                    )}
                </div>

                <div className="text-center mb-12">
                    <div className="inline-block mb-4">
                        <Brain className="w-20 h-20 text-purple-400" />
                    </div>
                    <h1 className="text-5xl md:text-6xl font-black text-white mb-4 gradient-text">
                        Analiza Biznesowa
                    </h1>
                    <p className="text-xl text-white/70 max-w-2xl mx-auto mb-8">
                        Kompleksowy przewodnik po świecie Business Analysis - od podstaw po zaawansowane techniki
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                        onClick={() => setCurrentView('sections')}
                        className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold text-lg px-8 py-4 rounded-2xl hover:shadow-2xl transition-all flex items-center justify-center gap-2"
                    >
                        Rozpocznij naukę <ArrowRight className="w-5 h-5" />
                    </button>
                    <button
                        onClick={() => setCurrentView('quiz')}
                        className="glass text-white font-bold text-lg px-8 py-4 rounded-2xl hover:bg-white/20 transition-all flex items-center justify-center gap-2"
                    >
                        <Trophy className="w-5 h-5" />
                        Sprawdź wiedzę
                    </button>
                </div>
            </div>
        </div>
    );

    return (
        <div>
            {toast && (
                <div className={`toast toast-${toast.type}`}>
                    {toast.message}
                </div>
            )}
            {currentView === 'home' && <HomePage />}
            {showAuthModal && <AuthModal />}
        </div>
    );
};

ReactDOM.render(<App />, document.getElementById('root'));
