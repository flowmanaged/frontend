const { useState, useRef, useEffect } = React;

// ----------------------------------------------------
// 1. Definicje Ikon (Lucide Icons)
// ----------------------------------------------------
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

// ----------------------------------------------------
// 2. Główny Komponent Aplikacji
// ----------------------------------------------------
const App = () => {
    const handleLogout = () => {
        // 1. Usuń token z localStorage (najważniejsze)
        localStorage.removeItem('token');

        // 2. Zresetuj stany logowania
        setIsLoggedIn(false);
        setUserEmail(null);
        setUserRole('user');
        
        // 3. Przełącz widok (opcjonalne)
        setCurrentView('home');
        
        // 4. Wyświetl powiadomienie (opcjonalne)
        showToast('Wylogowano pomyślnie!', 'success');
    };

    // API Configuration
    const API_URL = 'http://localhost:5000/api';

    // Global States
    const [currentView, setCurrentView] = useState('home');
    const [currentSection, setCurrentSection] = useState(0);
    const [quizAnswers, setQuizAnswers] = useState({});
    const [showResults, setShowResults] = useState(false);
    const [completedSections, setCompletedSections] = useState(new Set());
    const [isPremium, setIsPremium] = useState(false);
    const [showPremiumModal, setShowPremiumModal] = useState(false);

    // Auth States
    const [showAuthModal, setShowAuthModal] = useState(false);
    const [authView, setAuthView] = useState('login'); // 'login', 'register', 'forgot'
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userEmail, setUserEmail] = useState('');
    const [userRole, setUserRole] = useState('user'); // Używane w app.js

    // Info Pages States
    const [showTermsPage, setShowTermsPage] = useState(false);
    const [showPrivacyPage, setShowPrivacyPage] = useState(false);

    // Toast State
    const [toast, setToast] = useState(null); // Używane w app.js
    const [premiumExpiryDate, setPremiumExpiryDate] = useState(null); // Używane w app.js

    // useEffect do inicjalizacji Lucide Icons
    useEffect(() => {
        lucide.createIcons();
    }, []);

    // Funkcja pobierająca dane użytkownika po tokenie (KONIECZNA!)
    const fetchUserData = async (token) => {
        try {
            const response = await fetch(`${API_URL}/users/me`, {
                headers: {
                    'Authorization': `Bearer ${token}` // Wysyłanie tokena
                }
            });

            if (!response.ok) {
                // Token nieważny lub wygasły
                throw new Error('Sesja wygasła');
            }

            const userData = await response.json();
            
            // Ustawienie stanów na podstawie danych z serwera
            setIsLoggedIn(true);
            setUserEmail(userData.email);
            setUserRole(userData.role);
            setIsPremium(userData.isPremium);
            setCompletedSections(new Set(userData.completedSections));
            setPremiumExpiryDate(userData.premiumExpiresAt);
            
        } catch (error) {
            console.error('❌ Błąd hydratacji sesji:', error);
            // Automatyczne wylogowanie, jeśli token jest zły
            localStorage.removeItem('token');
            setIsLoggedIn(false);
            setUserEmail(null);
            setUserRole('user');
        }
    };
    
    // 💡 NOWY useEffect DO HYDRATACJI SESJI
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            // Jeśli token istnieje, spróbuj pobrać dane użytkownika i uwierzytelnić go
            fetchUserData(token); 
        }
    }, []); // Pusta tablica zależności: uruchamiane tylko raz przy starcie aplikacji

// Funkcja do wyświetlania Toast'a
    const showToast = (message, type = 'success', duration = 3000) => {
// ...

    // Funkcja do wyświetlania Toast'a
    const showToast = (message, type = 'success', duration = 3000) => {
        setToast({ message, type });
        setTimeout(() => setToast(null), duration);
    };

    // ----------------------------------------------------
    // 3. Dane Aplikacji (Sekcje i Quizy)
    // ----------------------------------------------------
    const sections = [
        // FREE CONTENT
        {
            id: 1,
            title: "Wprowadzenie do Analizy Biznesowej",
            icon: "📊",
            color: "from-blue-500 to-cyan-500",
            isPremium: false,
            content: `Analiza biznesowa to dyscyplina polegająca na identyfikowaniu potrzeb biznesowych organizacji i określaniu rozwiązań problemów biznesowych. Rozwiązania te często obejmują rozwój systemów informatycznych, usprawnienia procesów, zmiany organizacyjne lub planowanie strategiczne.

**Business Analyst (BA)** - osoba odpowiedzialna za analizowanie struktury biznesowej organizacji, dokumentowanie jej procesów biznesowych i systemów, ocenianie modeli biznesowych oraz ich integrację z technologią.

**Stakeholder** - każda osoba lub grupa, która może wpływać na projekt lub być nim dotknięta.

**Wymaganie** - formalne stwierdzenie potrzeby biznesowej, które musi być spełnione przez rozwiązanie.`
        },
        {
            id: 2,
            title: "Rola i Kompetencje BA",
            icon: "👤",
            color: "from-purple-500 to-pink-500",
            isPremium: false,
            content: `**Główne obowiązki BA:**
• Identyfikacja i dokumentowanie wymagań biznesowych
• Analiza procesów biznesowych i ich optymalizacja
• Komunikacja między biznesem a IT
• Tworzenie dokumentacji projektowej
• Prowadzenie warsztatów i wywiadów ze stakeholderami
• Walidacja rozwiązań i testowanie akceptacyjne

**Kompetencje twarde:**
• Znajomość metodyk (Agile, Waterfall, SCRUM)
• Umiejętność modelowania procesów (BPMN, UML)
• Narzędzia analityczne (MS Visio, Jira, Confluence)
• Analiza danych i SQL

**Kompetencje miękkie:**
• Komunikacja interpersonalna
• Myślenie analityczne i krytyczne
• Negocjacje i mediacja
• Zarządzanie czasem`
        },
        {
            id: 3,
            title: "Proces Analizy Biznesowej",
            icon: "🔄",
            color: "from-green-500 to-teal-500",
            isPremium: false,
            content: `**Etapy procesu analizy biznesowej:**

1. **Planowanie analizy biznesowej**
   • Określenie zakresu analizy
   • Identyfikacja stakeholderów
   • Wybór metodyki i narzędzi
   • Określenie harmonogramu

2. **Elicitacja wymagań**
   • Wywiady ze stakeholderami
   • Warsztaty grupowe
   • Obserwacja procesów
   • Analiza dokumentacji
   • Prototypowanie

3. **Analiza i modelowanie**
   • Analiza zebranych informacji
   • Tworzenie modeli procesów
   • Identyfikacja luk i możliwości
   • Priorytetyzacja wymagań

4. **Dokumentowanie i walidacja**
   • Tworzenie dokumentacji wymagań
   • Przegląd z zespołem
   • Zatwierdzanie przez stakeholderów

5. **Implementacja i weryfikacja**
   • Wsparcie dla zespołu deweloperskiego
   • Testy akceptacyjne
   • Weryfikacja dostarczonych rozwiązań`
        },
        // PREMIUM CONTENT
        {
            id: 4,
            title: "Techniki Elicitacji Wymagań",
            icon: "💬",
            color: "from-amber-500 to-orange-500",
            isPremium: true,
            content: `**Wywiady strukturyzowane:**
• Przygotowana lista pytań
• Konsekwentna kolejność
• Porównywanie odpowiedzi
• Idealne dla zbierania faktów
... (Skrócono dla zwięzłości)`
        },
        {
            id: 5,
            title: "Modelowanie Procesów - BPMN",
            icon: "📐",
            color: "from-rose-500 to-red-500",
            isPremium: true,
            content: `**BPMN (Business Process Model and Notation)** to standardowa notacja do modelowania procesów biznesowych.
... (Skrócono dla zwięzłości)`
        },
        {
            id: 6,
            title: "User Stories i Acceptance Criteria",
            icon: "📝",
            color: "from-violet-500 to-purple-500",
            isPremium: true,
            content: `**User Story** to krótki, prosty opis funkcjonalności z perspektywy użytkownika.
... (Skrócono dla zwięzłości)`
        },
        {
            id: 7,
            title: "Diagramy UML w Analizie Biznesowej",
            icon: "🔷",
            color: "from-sky-500 to-blue-500",
            isPremium: true,
            content: `**UML (Unified Modeling Language)** to standardowy język modelowania systemów.
... (Skrócono dla zwięzłości)`
        },
        {
            id: 8,
            title: "Zarządzanie Wymaganiami",
            icon: "📋",
            color: "from-emerald-500 to-green-500",
            isPremium: true,
            content: `**Zarządzanie wymaganiami** to systematyczne podejście do elicitacji, analizy, dokumentowania i utrzymywania wymagań.
... (Skrócono dla zwięzłości)`
        },
        {
            id: 9,
            title: "Gap Analysis i Process Improvement",
            icon: "🎯",
            color: "from-cyan-500 to-teal-500",
            isPremium: true,
            content: `**Gap Analysis** to technika identyfikowania różnic między stanem obecnym a stanem docelowym.
... (Skrócono dla zwięzłości)`
        },
        {
            id: 10,
            title: "Data Analysis dla Business Analyst",
            icon: "📊",
            color: "from-pink-500 to-rose-500",
            isPremium: true,
            content: `**Analiza danych** to kluczowa umiejętność BA do odkrywania insights i wspierania decyzji biznesowych.
... (Skrócono dla zwięzłości)`
        },
        {
            id: 11,
            title: "Stakeholder Management",
            icon: "👥",
            color: "from-indigo-500 to-purple-500",
            isPremium: true,
            content: `**Zarządzanie stakeholderami** to identyfikacja, analiza i angażowanie osób wpływających na projekt lub nim dotkniętych.
... (Skrócono dla zwięzłości)`
        },
        {
            id: 12,
            title: "Change Management w projektach BA",
            icon: "🔄",
            color: "from-yellow-500 to-amber-500",
            isPremium: true,
            content: `**Change Management** to strukturalne podejście do przejścia od stanu obecnego do stanu docelowego, ze szczególnym uwzględnieniem ludzkiego aspektu zmian.
... (Skrócono dla zwięzłości)`
        },
        {
            id: 13,
            title: "Agile BA vs Waterfall BA",
            icon: "🌊",
            color: "from-blue-500 to-indigo-500",
            isPremium: true,
            content: `**Porównanie metodyk i roli BA w różnych podejściach do zarządzania projektami.**
... (Skrócono dla zwięzłości)`
        },
        {
            id: 14,
            title: "Product Ownership dla BA",
            icon: "👑",
            color: "from-fuchsia-500 to-pink-500",
            isPremium: true,
            content: `**Product Owner (PO)** - rola w Scrumie odpowiedzialna za maksymalizację wartości produktu.
... (Skrócono dla zwięzłości)`
        },
        {
            id: 15,
            title: "Risk Management w BA",
            icon: "🛡️",
            color: "from-teal-500 to-cyan-500",
            isPremium: true,
            content: `**Risk Management (Zarządzanie Ryzykiem)** to proces identyfikacji, analizy i reagowania na czynniki ryzyka.
... (Skrócono dla zwięzłości)`
        },
        {
            id: 16,
            title: "Wprowadzenie do Architektury Systemów",
            icon: "🏗️",
            color: "from-orange-500 to-yellow-500",
            isPremium: true,
            content: `**Architektura Systemów** - podstawowa organizacja systemu, ucieleśniona w jego komponentach.
... (Skrócono dla zwięzłości)`
        },
    ];

    const quizQuestions = [
        // FREE QUESTIONS (3)
        {
            id: 1,
            question: "Co to jest stakeholder?",
            options: [
                "Osoba zarządzająca projektem",
                "Osoba, która wpływa na projekt lub jest nim dotknięta",
                "Osoba odpowiedzialna za budżet projektu",
                "Deweloper front-endu"
            ],
            correct: 1,
            isPremium: false
        },
        {
            id: 2,
            question: "Która umiejętność NIE jest miękką kompetencją BA?",
            options: [
                "Negocjacje",
                "Myślenie analityczne",
                "Znajomość SQL",
                "Komunikacja interpersonalna"
            ],
            correct: 2,
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
        },
        // PREMIUM QUESTIONS (Reszta)
        {
            id: 4,
            question: "Która technika elicitacji jest najlepsza do odkrywania nieświadomych potrzeb użytkowników?",
            options: [
                "Wywiady strukturyzowane",
                "Analiza dokumentacji",
                "Obserwacja użytkowników",
                "Ankiety online"
            ],
            correct: 2,
            isPremium: true
        },
        {
            id: 5,
            question: "W BPMN, który element reprezentuje pojedyncze zadanie?",
            options: [
                "Gateway",
                "Event",
                "Task",
                "Flow"
            ],
            correct: 2,
            isPremium: true
        },
        {
            id: 6,
            question: "Jaki format ma User Story według standardu?",
            options: [
                "Jako [rola] chcę [akcja] aby [cel]",
                "Funkcjonalność: [opis]",
                "Wymaganie: System musi [akcja]",
                "Use Case: [nazwa] - [opis]"
            ],
            correct: 0,
            isPremium: true
        },
        {
            id: 7,
            question: "Który diagram UML pokazuje interakcje między obiektami w czasie?",
            options: [
                "Diagram przypadków użycia",
                "Diagram klas",
                "Diagram sekwencji",
                "Diagram aktywności"
            ],
            correct: 2,
            isPremium: true
        },
        {
            id: 8,
            question: "Co oznacza 'M' w metodzie priorytetyzacji MoSCoW?",
            options: [
                "Maybe have",
                "Maximum effort",
                "Must have",
                "Mostly functional"
            ],
            correct: 2,
            isPremium: true
        },
        {
            id: 9,
            question: "Który z modeli Change Management koncentruje się na 5 elementach: Awareness, Desire, Knowledge, Ability, Reinforcement?",
            options: [
                "Kotter's 8-Step Model",
                "Lewin's 3-Step Model",
                "ADKAR Model",
                "Change Readiness Assessment"
            ],
            correct: 2,
            isPremium: true
        },
        {
            id: 10,
            question: "W metodyce Lean, jaki jest główny cel Value Stream Mapping?",
            options: [
                "Definiowanie wymagań",
                "Wizualizacja i eliminacja marnotrawstwa",
                "Zarządzanie ryzykiem",
                "Planowanie sprintów"
            ],
            correct: 1,
            isPremium: true
        },
        {
            id: 11,
            question: "Co opisują Wymagania Niefunkcjonalne (NFR)?",
            options: [
                "Szczegółowe funkcjonalności systemu",
                "Zachowanie systemu w warunkach brzegowych (np. wydajność, bezpieczeństwo)",
                "Cele biznesowe projektu",
                "Potrzeby konkretnych użytkowników"
            ],
            correct: 1,
            isPremium: true
        },
        {
            id: 12,
            question: "Które z działań należy do fazy 'Analyze' w metodologii DMAIC (Six Sigma)?",
            options: [
                "Wdrożenie rozwiązania",
                "Pomiar defektów",
                "Identyfikacja przyczyn źródłowych",
                "Definicja problemu"
            ],
            correct: 2,
            isPremium: true
        },
        {
            id: 13,
            question: "W macierzy Power/Interest Matrix, jak należy zarządzać stakeholderami o 'High Power' i 'Low Interest'?",
            options: [
                "Manage Closely",
                "Keep Satisfied",
                "Keep Informed",
                "Minimal Effort"
            ],
            correct: 1,
            isPremium: true
        },
        {
            id: 14,
            question: "Co oznacza HTTP status code 201?",
            options: [
                "OK",
                "Bad Request",
                "Unauthorized",
                "Created"
            ],
            correct: 3,
            isPremium: true
        },
        {
            id: 15,
            question: "Framework RICE służy do:",
            options: [
                "Analizy ryzyka",
                "Priorytetyzacji funkcjonalności",
                "Zarządzania wymaganiami",
                "Testowania użyteczności"
            ],
            correct: 1,
            isPremium: true
        },
        {
            id: 16,
            question: "Która metoda HTTP służy do TWORZENIA nowego zasobu?",
            options: [
                "GET",
                "POST",
                "PUT",
                "DELETE"
            ],
            correct: 1,
            isPremium: true
        },
        {
            id: 17,
            question: "HTTP status code 404 oznacza:",
            options: [
                "Sukces",
                "Unauthorized",
                "Not Found",
                "Internal Server Error"
            ],
            correct: 2,
            isPremium: true
        },
        {
            id: 18,
            question: "W zarządzaniu ryzykiem, strategia 'Mitigate' to:",
            options: [
                "Całkowite wyeliminowanie ryzyka",
                "Redukcja prawdopodobieństwa lub wpływu",
                "Przeniesienie ryzyka na inną stronę",
                "Akceptacja ryzyka bez działania"
            ],
            correct: 1,
            isPremium: true
        },
        {
            id: 19,
            question: "Risk Score oblicza się jako:",
            options: [
                "Probability + Impact",
                "Probability - Impact",
                "Probability × Impact",
                "Probability / Impact"
            ],
            correct: 2,
            isPremium: true
        },
        {
            id: 20,
            question: "ROI (Return on Investment) to:",
            options: [
                "Całkowite koszty projektu",
                "Czas zwrotu inwestycji",
                "(Korzyści - Koszty) / Koszty × 100%",
                "Wartość bieżąca netto"
            ],
            correct: 2,
            isPremium: true
        },
    ];

    // ----------------------------------------------------
    // 4. Komponenty Pomocnicze (Footer, Toast)
    // ----------------------------------------------------
    const Footer = () => (
        <footer className="mt-12 py-8 text-center text-white/50 border-t border-white/10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <p className="text-sm">
                    &copy; {new Date().getFullYear()} Flowmanaged. Wszelkie prawa zastrzeżone.
                </p>
                <div className="mt-4 space-x-4 text-sm">
                    <button onClick={() => { setShowTermsPage(true); setCurrentView('home'); }} className="hover:text-white transition-colors">Regulamin</button>
                    <button onClick={() => { setShowPrivacyPage(true); setCurrentView('home'); }} className="hover:text-white transition-colors">Polityka Prywatności</button>
                </div>
            </div>
        </footer>
    );

    const Toast = ({ message, type }) => {
        const baseClasses = "fixed bottom-5 right-5 p-4 rounded-xl shadow-2xl z-[1001] transition-all transform";
        let typeClasses = "";
        
        switch (type) {
            case 'success':
                typeClasses = "bg-green-500 text-white";
                break;
            case 'error':
                typeClasses = "bg-red-500 text-white";
                break;
            case 'info':
            default:
                typeClasses = "bg-blue-500 text-white";
                break;
        }

        return (
            <div className={`${baseClasses} ${typeClasses} animate-slideIn`}>
                {message}
            </div>
        );
    };


    // ----------------------------------------------------
    // 5. Komponent Modalu Autoryzacji (Zintegrowana Logika API)
    // ----------------------------------------------------
    const AuthModal = () => {
        const [email, setEmail] = useState('');
        const [password, setPassword] = useState('');
        const [confirmPassword, setConfirmPassword] = useState('');
        const [acceptTerms, setAcceptTerms] = useState(false);
        const [message, setMessage] = useState('');
        const [isLoading, setIsLoading] = useState(false);

        // API Handler - Logowanie
        const handleLogin = async (e) => {
            e.preventDefault();
            if (!email || !password) {
                setMessage('Proszę wypełnić wszystkie pola');
                return;
            }
            setIsLoading(true);
            setMessage('');
            try {
                const response = await fetch(`${API_URL}/auth/login`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email, password })
                });

                const data = await response.json();

                if (!response.ok) {
                    setMessage(data.message || 'Nieprawidłowy email lub hasło.');
                    setIsLoading(false);
                    return;
                }

               // Sukces
                // 💡 DODAJ TĘ LINIĘ:
                localStorage.setItem('token', data.token); 

                setIsLoggedIn(true);
                setUserEmail(email);
                setUserRole(data.userRole || 'user'); // Zakładając, że API zwraca rolę
                showToast('Zalogowano pomyślnie!', 'success');
                setShowAuthModal(false);
            } catch (error) {
                console.error('❌ Błąd logowania:', error);
                setMessage('Błąd połączenia z serwerem. Spróbuj ponownie.');
            }
            setIsLoading(false);
        };

        // API Handler - Rejestracja
        const handleRegister = async (e) => {
            e.preventDefault();
            if (!email || !password || !confirmPassword || !acceptTerms) {
                setMessage('Proszę wypełnić wszystkie pola i zaakceptować regulamin');
                return;
            }
            if (password !== confirmPassword) {
                setMessage('Hasła nie są zgodne');
                return;
            }
            
            setIsLoading(true);
            setMessage('');
            try {
                const response = await fetch(`${API_URL}/auth/register`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email, password })
                });
                const data = await response.json();

                if (!response.ok) {
                    setMessage(data.message || 'Błąd podczas rejestracji');
                    setIsLoading(false);
                    return;
                }

                setMessage('Konto utworzone! Możesz się teraz zalogować.');
                showToast('Konto utworzone pomyślnie!', 'success');
                setTimeout(() => {
                    setAuthView('login');
                    setMessage('');
                    setIsLoading(false);
                    setEmail('');
                    setPassword('');
                    setConfirmPassword('');
                }, 2000);

            } catch (error) {
                console.error('❌ Błąd rejestracji:', error);
                setMessage('Błąd połączenia z serwerem. Spróbuj ponownie.');
            }
            setIsLoading(false);
        };

        // API Handler - Resetowanie Hasła
        const handleForgotPassword = async (e) => {
            e.preventDefault();
            if (!email) {
                setMessage('Proszę podać adres email');
                return;
            }
            setIsLoading(true);
            setMessage('');
            try {
                // W realnej aplikacji to wysyła maila z tokenem resetującym
                const response = await fetch(`${API_URL}/auth/forgot-password`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email })
                });
                
                // Zakładamy, że serwer zawsze zwraca 200/202 aby nie zdradzać istnienia konta
                setMessage('Link do resetowania hasła został wysłany na Twój email (jeśli konto istnieje).');
                showToast('Wysłano link resetujący!', 'info');

                setTimeout(() => {
                    setAuthView('login');
                    setMessage('');
                    setIsLoading(false);
                    setEmail('');
                }, 3000);

            } catch (error) {
                console.error('❌ Błąd resetowania hasła:', error);
                setMessage('Błąd połączenia z serwerem. Spróbuj ponownie.');
            }
            setIsLoading(false);
        };
        
        return (
            <div className="auth-modal-overlay" onClick={() => setShowAuthModal(false)}>
                <div className="auth-modal-content glass rounded-3xl p-8 max-w-md w-full mx-4" onClick={(e) => e.stopPropagation()}>
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold text-white">
                            {authView === 'login' && 'Logowanie'}
                            {authView === 'register' && 'Rejestracja'}
                            {authView === 'forgot' && 'Resetowanie hasła'}
                        </h2>
                        <button onClick={() => setShowAuthModal(false)} className="text-white/70 hover:text-white transition-colors" >
                            <X className="w-6 h-6" />
                        </button>
                    </div>

                    {message && (
                        <div className={`mb-4 p-3 rounded-xl ${message.includes('Błąd') || message.includes('Nieprawidłowy') ? 'bg-red-500/20 text-red-300' : 'bg-green-500/20 text-green-300'}`}>
                            <p className="text-sm font-medium">{message}</p>
                        </div>
                    )}

                    {authView === 'login' && (
                        <form onSubmit={handleLogin} className="space-y-4">
                            {/* ... formularz logowania (email, hasło) ... */}
                            <div>
                                <label className="block text-white/90 mb-2 text-sm font-medium">Email</label>
                                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-purple-500 transition-colors" placeholder="twoj@email.com" disabled={isLoading} required />
                            </div>
                            <div>
                                <label className="block text-white/90 mb-2 text-sm font-medium">Hasło</label>
                                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-purple-500 transition-colors" placeholder="••••••••" disabled={isLoading} required />
                            </div>
                            
                            <button type="submit" className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold text-lg py-3 rounded-xl hover:shadow-2xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2" disabled={isLoading}>
                                {isLoading ? <Activity className="w-5 h-5 animate-spin" /> : 'Zaloguj się'}
                            </button>

                            <div className="flex justify-between mt-4">
                                <button type="button" onClick={() => { setAuthView('forgot'); setMessage(''); }} className="text-sm text-purple-300 hover:text-purple-200 transition-colors" disabled={isLoading} >
                                    Zapomniałem hasła
                                </button>
                                <button type="button" onClick={() => { setAuthView('register'); setMessage(''); }} className="text-sm text-purple-300 hover:text-purple-200 transition-colors" disabled={isLoading} >
                                    Zarejestruj się
                                </button>
                            </div>
                        </form>
                    )}

                    {authView === 'register' && (
                        <form onSubmit={handleRegister} className="space-y-4">
                            {/* ... formularz rejestracji (email, hasło, powtórz, regulamin) ... */}
                            <div>
                                <label className="block text-white/90 mb-2 text-sm font-medium">Email</label>
                                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-purple-500 transition-colors" placeholder="twoj@email.com" disabled={isLoading} required />
                            </div>
                            <div>
                                <label className="block text-white/90 mb-2 text-sm font-medium">Hasło</label>
                                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-purple-500 transition-colors" placeholder="••••••••" disabled={isLoading} required />
                            </div>
                            <div>
                                <label className="block text-white/90 mb-2 text-sm font-medium">Powtórz hasło</label>
                                <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-purple-500 transition-colors" placeholder="••••••••" disabled={isLoading} required />
                            </div>
                            
                            <label className="flex items-start gap-2 cursor-pointer">
                                <input type="checkbox" checked={acceptTerms} onChange={(e) => setAcceptTerms(e.target.checked)} className="mt-1 w-4 h-4 rounded border-white/20 bg-white/10 text-purple-500 focus:ring-purple-500" disabled={isLoading} />
                                <span className="text-white/90 text-sm">
                                    Akceptuję{' '}
                                    <button type="button" onClick={(e) => { e.preventDefault(); setShowAuthModal(false); setShowTermsPage(true); }} className="text-purple-300 hover:text-purple-200 underline" disabled={isLoading} >
                                        regulamin korzystania z serwisu
                                    </button>
                                </span>
                            </label>

                            <button type="submit" className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold text-lg py-3 rounded-xl hover:shadow-2xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2" disabled={isLoading}>
                                {isLoading ? <Activity className="w-5 h-5 animate-spin" /> : 'Zarejestruj się'}
                            </button>

                            <div className="text-center mt-4">
                                <button type="button" onClick={() => { setAuthView('login'); setMessage(''); }} className="text-sm text-purple-300 hover:text-purple-200 transition-colors" disabled={isLoading} >
                                    Mam już konto (Zaloguj się)
                                </button>
                            </div>
                        </form>
                    )}

                    {authView === 'forgot' && (
                        <form onSubmit={handleForgotPassword} className="space-y-4">
                            {/* ... formularz resetowania hasła (email) ... */}
                            <p className="text-sm text-white/70">Podaj swój adres email, a wyślemy Ci link do resetowania hasła.</p>
                            <div>
                                <label className="block text-white/90 mb-2 text-sm font-medium">Email</label>
                                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-purple-500 transition-colors" placeholder="twoj@email.com" disabled={isLoading} required />
                            </div>

                            <button type="submit" className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold text-lg py-3 rounded-xl hover:shadow-2xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2" disabled={isLoading}>
                                {isLoading ? <Activity className="w-5 h-5 animate-spin" /> : 'Wyślij link'}
                            </button>

                            <div className="text-center mt-4">
                                <button type="button" onClick={() => { setAuthView('login'); setMessage(''); }} className="text-sm text-purple-300 hover:text-purple-200 transition-colors" disabled={isLoading} >
                                    Pamiętam hasło (Zaloguj się)
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        );
    };


    // ----------------------------------------------------
    // 6. Komponent Modalu Premium
    // ----------------------------------------------------
    const PremiumModal = () => (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setShowPremiumModal(false)}>
            <div className="glass rounded-3xl p-8 max-w-2xl w-full" onClick={(e) => e.stopPropagation()}>
                <div className="flex justify-between items-start mb-6">
                    <div>
                        <h2 className="text-3xl font-bold text-white mb-2">🌟 Przejdź na Premium</h2>
                        <p className="text-white/70">Odblokuj pełną moc platformy edukacyjnej</p>
                    </div>
                    <button onClick={() => setShowPremiumModal(false)} className="text-white/70 hover:text-white transition-colors">
                        <X className="w-6 h-6" />
                    </button>
                </div>
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                    <div className="bg-white/5 rounded-2xl p-6">
                        <h3 className="text-xl font-bold text-white mb-4">Wersja Darmowa</h3>
                        <ul className="space-y-3">
                            <li className="flex items-start gap-2 text-white/70"> <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" /> <span>3 podstawowe sekcje</span> </li>
                            <li className="flex items-start gap-2 text-white/70"> <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" /> <span>3 pytania quizowe</span> </li>
                            <li className="flex items-start gap-2 text-white/70"> <XCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" /> <span>Brak zaawansowanych tematów</span> </li>
                        </ul>
                    </div>
                    <div className="bg-gradient-to-br from-yellow-400/30 to-orange-500/30 rounded-2xl p-6 border-4 border-yellow-400 relative overflow-hidden">
                        <div className="premium-badge absolute top-0 right-0 px-4 py-1 text-sm font-bold text-black transform translate-x-1/4 -translate-y-1/2 rotate-45">BEST VALUE</div>
                        <h3 className="text-xl font-bold text-white mb-4">Wersja Premium</h3>
                        <ul className="space-y-3">
                            <li className="flex items-start gap-2 text-white"> <CheckCircle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" /> <span className="font-semibold">Pełny dostęp do 16 sekcji</span> </li>
                            <li className="flex items-start gap-2 text-white"> <CheckCircle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" /> <span className="font-semibold">20 pytań quizowych</span> </li>
                            <li className="flex items-start gap-2 text-white"> <CheckCircle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" /> <span className="font-semibold">Certyfikat ukończenia</span> </li>
                            <li className="flex items-start gap-2 text-white"> <CheckCircle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" /> <span className="font-semibold">Priorytetowe wsparcie</span> </li>
                        </ul>
                    </div>
                </div>

                <div className="text-center">
                    <h4 className="text-2xl font-bold text-white mb-4">Tylko 49 PLN / Miesiąc</h4>
                    <button onClick={() => {
                        // Symulacja przejścia do płatności
                        setShowPremiumModal(false);
                        showToast('Przekierowanie do płatności...', 'info');
                        // W prawdziwej aplikacji: window.location.href = '/checkout'
                        // Symulacja udanego zakupu:
                        setTimeout(() => {
                            setIsPremium(true);
                            showToast('Status Premium aktywowany! Witaj w świecie zaawansowanej wiedzy.', 'success', 5000);
                        }, 2000);
                    }} className="px-10 py-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold text-xl rounded-2xl hover:shadow-2xl transition-all flex items-center justify-center gap-2 mx-auto">
                        <Crown className="w-6 h-6" /> Aktywuj Premium
                    </button>
                    <p className="text-sm text-white/70 mt-4">Anuluj subskrypcję w dowolnym momencie.</p>
                </div>
            </div>
        </div>
    );


    // ----------------------------------------------------
    // 7. Komponent Strony Głównej
    // ----------------------------------------------------
    const HomePage = () => {
        const lockedCount = sections.filter(s => s.isPremium).length;
        const premiumFeatures = [
            { title: "Zaawansowane Techniki Elicitacji", desc: "Wywiady, warsztaty i prototypowanie", free: false },
            { title: "Modelowanie Procesów BPMN/UML", desc: "Diagramy Activity, Sequence i Use Case", free: false },
            { title: "Zarządzanie Stakeholderami i Zmianą", desc: "Macierz Power/Interest, ADKAR", free: false },
            { title: "Data Analysis", desc: "SQL, wizualizacje i KPI", free: false },
            { title: "Risk Management", desc: "Identyfikacja i mitygacja ryzyk", free: false }
        ];

        return (
            <div className="min-h-screen p-6">
                <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    <header className="flex justify-between items-center py-6 border-b border-white/10">
                        <div className="flex items-center gap-3">
                            <Brain className="w-8 h-8 text-purple-400" />
                            <span className="text-xl font-bold text-white">BA Guide</span>
                        </div>
                        {!isLoggedIn ? (
                            <button
                                onClick={() => { setShowAuthModal(true); setAuthView('login'); }}
                                className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium rounded-xl hover:shadow-lg transition-all"
                            >
                                <User className="w-4 h-4" /> Zaloguj się
                            </button>
                        ) : (
                            <div className="flex items-center gap-4">
                                <span className="text-white/70 text-sm">Zalogowany: {userEmail}</span>
                                {isPremium && <Crown className="w-5 h-5 text-yellow-400" title="Konto Premium" />}
                                <button
                                    onClick={() => {
                                        setIsLoggedIn(false);
                                        setUserEmail('');
                                        setIsPremium(false);
                                        showToast('Wylogowano pomyślnie.', 'info');
                                    }}
                                    className="px-4 py-2 bg-white/10 text-white rounded-xl hover:bg-white/20 transition-all text-sm flex items-center gap-1"
                                >
                                    <LogOut className="w-4 h-4" /> Wyloguj
                                </button>
                            </div>
                        )}
                    </header>

                    {/* Hero Section */}
                    <div className="text-center py-20">
                        <div className="inline-block mb-4">
                            <Brain className="w-20 h-20 text-purple-400" />
                        </div>
                        <h1 className="text-5xl md:text-6xl font-black text-white mb-4 gradient-text">
                            Analiza Biznesowa
                        </h1>
                        <p className="text-xl text-white/70 max-w-2xl mx-auto mb-8">
                            Kompleksowy przewodnik po świecie Business Analysis - od podstaw po zaawansowane techniki
                        </p>

                        {!isPremium && (
                            <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-yellow-400/20 to-orange-500/20 border border-yellow-400 rounded-full mb-8">
                                <Crown className="w-5 h-5 text-yellow-400" />
                                <span className="text-yellow-100 font-medium">Dostępne: 3 sekcje darmowe + {lockedCount} sekcji Premium</span>
                            </div>
                        )}

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
                                <Trophy className="w-5 h-5" /> Sprawdź wiedzę
                            </button>
                        </div>
                    </div>

                    {/* Features Section */}
                    <div className="max-w-4xl mx-auto mb-20">
                        <h2 className="text-3xl font-bold text-white text-center mb-8">Co zyskasz?</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {premiumFeatures.map((item, index) => (
                                <div key={index} className="flex items-start gap-3 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all card-hover">
                                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <h3 className="font-semibold text-white">{item.title}</h3>
                                            {!item.free && !isPremium && (
                                                <Lock className="w-3 h-3 text-yellow-400" />
                                            )}
                                        </div>
                                        <p className="text-sm text-white/70">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {!isPremium && (
                        <div className="mt-12 text-center">
                            <button
                                onClick={() => setShowPremiumModal(true)}
                                className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold rounded-xl hover:shadow-lg transition-all"
                            >
                                <Crown className="w-5 h-5" /> Odblokuj pełną wersję Premium
                            </button>
                        </div>
                    )}
                </div>
                <Footer />
            </div>
        );
    };


    // ----------------------------------------------------
    // 8. Komponent Widoku Sekcji
    // ----------------------------------------------------
    const SectionsView = () => {
        const availableSections = sections.filter(s => !s.isPremium || isPremium);
        const lockedCount = sections.filter(s => s.isPremium).length;
        const currentSectionData = availableSections[currentSection];

        const handleComplete = () => {
            const nextSection = currentSection + 1;
            setCompletedSections(prev => new Set(prev).add(currentSectionData.id));

            if (nextSection < availableSections.length) {
                setCurrentSection(nextSection);
            } else {
                showToast('Gratulacje! Ukończyłeś wszystkie dostępne sekcje.', 'success');
                setCurrentView('home');
            }
        };
        
        const handleSectionClick = (index) => {
            if (availableSections[index].isPremium && !isPremium) {
                setShowPremiumModal(true);
            } else {
                setCurrentSection(index);
            }
        };

        return (
            <div className="min-h-screen p-6">
                <div className="max-w-7xl mx-auto">
                    <div className="flex justify-between items-center mb-8">
                        <button
                            onClick={() => setCurrentView('home')}
                            className="glass px-6 py-3 rounded-xl text-white font-medium hover:bg-white/20 transition-all flex items-center gap-2"
                        >
                            <Home className="w-5 h-5" /> Strona główna
                        </button>
                        <div className="text-white/70 text-sm">
                            {isPremium && <span className="text-yellow-400 font-bold mr-2">PREMIUM</span>}
                            Sekcje ukończone: {completedSections.size} / {availableSections.length}
                        </div>
                    </div>

                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Sidebar/Lista Sekcji */}
                        <div className="lg:col-span-1 space-y-4">
                            {availableSections.map((section, index) => (
                                <button
                                    key={section.id}
                                    onClick={() => handleSectionClick(index)}
                                    className={`w-full text-left p-4 rounded-2xl transition-all card-hover ${index === currentSection ? `bg-gradient-to-r ${section.color} shadow-2xl scale-[1.02]` : 'glass hover:scale-[1.01]'}`}
                                >
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-4">
                                            <div className="text-4xl">{section.icon}</div>
                                            <div>
                                                <div className="flex items-center gap-2">
                                                    <h3 className="text-xl font-bold text-white">{section.title}</h3>
                                                    {section.isPremium && (
                                                        <Crown className="w-5 h-5 text-yellow-400" />
                                                    )}
                                                </div>
                                                <p className="text-white/70 text-sm">Sekcja {section.id} z {sections.length}</p>
                                            </div>
                                        </div>
                                        {completedSections.has(section.id) && (
                                            <CheckCircle className="w-8 h-8 text-green-400" />
                                        )}
                                    </div>
                                </button>
                            ))}
                            {!isPremium && lockedCount > 0 && (
                                <div className="p-6 rounded-2xl bg-gradient-to-r from-yellow-400/20 to-orange-500/20 border-2 border-yellow-400">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-4">
                                            <Lock className="w-8 h-8 text-yellow-400" />
                                            <div>
                                                <h3 className="text-xl font-bold text-white">+{lockedCount} sekcji Premium</h3>
                                                <p className="text-white/70 text-sm">Odblokuj pełen dostęp do zaawansowanych materiałów</p>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => setShowPremiumModal(true)}
                                            className="px-6 py-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-bold rounded-xl hover:shadow-lg transition-all whitespace-nowrap"
                                        >
                                            Przejdź na Premium
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Content Sekcji */}
                        {currentSectionData && (
                            <div className="lg:col-span-2">
                                <div className="glass rounded-3xl p-8">
                                    <h1 className="text-3xl font-bold text-white mb-4 flex items-center gap-3">
                                        <div className="text-4xl">{currentSectionData.icon}</div>
                                        {currentSectionData.title}
                                    </h1>
                                    <div className="prose prose-invert max-w-none text-white/90">
                                        {/* Wymuszenie renderowania markdown/html w React - w tym kontekście to działa na plain text z formatowaniem */}
                                        <div dangerouslySetInnerHTML={{ __html: currentSectionData.content.replace(/\n/g, '<br/>') }} />
                                    </div>

                                    <div className="mt-8 flex justify-between items-center border-t border-white/10 pt-6">
                                        <button
                                            onClick={() => setCurrentSection(Math.max(0, currentSection - 1))}
                                            disabled={currentSection === 0}
                                            className="px-6 py-3 bg-white/10 text-white rounded-xl hover:bg-white/20 transition-all disabled:opacity-50 flex items-center gap-2"
                                        >
                                            <ChevronRight className="w-4 h-4 rotate-180" /> Poprzednia sekcja
                                        </button>

                                        {!completedSections.has(currentSectionData.id) ? (
                                            <button
                                                onClick={handleComplete}
                                                className="px-8 py-3 bg-gradient-to-r from-green-500 to-teal-500 text-white font-bold rounded-xl hover:shadow-lg transition-all flex items-center gap-2"
                                            >
                                                Ukończ sekcję <Check className="w-5 h-5" />
                                            </button>
                                        ) : (
                                            <span className="px-6 py-3 text-green-400 font-bold flex items-center gap-2">
                                                <CheckCircle className="w-5 h-5" /> Ukończono!
                                            </span>
                                        )}

                                        <button
                                            onClick={handleComplete}
                                            disabled={currentSection === availableSections.length - 1}
                                            className="px-6 py-3 bg-white/10 text-white rounded-xl hover:bg-white/20 transition-all disabled:opacity-50 flex items-center gap-2"
                                        >
                                            Następna sekcja <ChevronRight className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                <Footer />
            </div>
        );
    };


    // ----------------------------------------------------
    // 9. Komponent Widoku Quizu
    // ----------------------------------------------------
    const QuizView = () => {
        const availableQuestions = quizQuestions.filter(q => !q.isPremium || isPremium);
        const correctAnswers = Object.keys(quizAnswers).filter(id => {
            const question = availableQuestions.find(q => q.id === parseInt(id));
            return question && question.correct === quizAnswers[id];
        }).length;
        const totalQuestions = availableQuestions.length;
        const percentage = totalQuestions > 0 ? Math.round((correctAnswers / totalQuestions) * 100) : 0;
        
        // Obliczanie koloru i poziomu
        const getScoreData = () => {
            if (percentage === 100) return { level: 'Mistrz! 🏆', bg: 'from-yellow-400 to-orange-500' };
            if (percentage >= 75) return { level: 'Bardzo dobrze! 🚀', bg: 'from-green-500 to-emerald-500' };
            if (percentage >= 60) return { level: 'Dobrze! 📚', bg: 'from-blue-500 to-cyan-500' };
            return { level: 'Spróbuj ponownie 💪', bg: 'from-purple-500 to-pink-500' };
        };

        const scoreData = getScoreData();

        const handleAnswer = (questionId, optionIndex) => {
            setQuizAnswers(prev => ({
                ...prev,
                [questionId]: optionIndex
            }));
        };

        return (
            <div className="min-h-screen p-6">
                <div className="max-w-4xl mx-auto">
                    {/* Header z przyciskiem Strona główna */}
                    <div className="flex justify-between items-center mb-8">
                        <button
                            onClick={() => { setCurrentView('home'); setShowResults(false); }}
                            className="glass px-6 py-3 rounded-xl text-white font-medium hover:bg-white/20 transition-all flex items-center gap-2"
                        >
                            <Home className="w-5 h-5" /> Strona główna
                        </button>
                        {isPremium && <Crown className="w-5 h-5 text-yellow-400" title="Konto Premium" />}
                    </div>

                    <h1 className="text-4xl font-black text-white mb-8 text-center">
                        <Trophy className="w-8 h-8 inline-block mr-3 text-purple-400" /> Sprawdź swoją wiedzę
                    </h1>

                    <div className="space-y-8">
                        {!showResults ? (
                            <>
                                {availableQuestions.map((q, qIndex) => (
                                    <div key={q.id} className={`glass rounded-2xl p-6 ${q.isPremium && !isPremium ? 'opacity-50 pointer-events-none' : ''}`}>
                                        <div className="flex justify-between items-start mb-4">
                                            <h2 className="text-xl font-bold text-white">
                                                {qIndex + 1}. {q.question}
                                            </h2>
                                            {q.isPremium && !isPremium && <Lock className="w-5 h-5 text-yellow-400" />}
                                        </div>
                                        
                                        <div className="space-y-3">
                                            {q.options.map((option, oIndex) => (
                                                <button
                                                    key={oIndex}
                                                    onClick={() => handleAnswer(q.id, oIndex)}
                                                    className={`w-full text-left px-4 py-3 rounded-xl transition-colors text-white ${
                                                        quizAnswers[q.id] === oIndex
                                                            ? 'bg-purple-500 border-purple-500'
                                                            : 'bg-white/5 border border-white/10 hover:bg-white/10'
                                                    }`}
                                                >
                                                    {option}
                                                </button>
                                            ))}
                                        </div>
                                        {q.isPremium && !isPremium && (
                                            <div className="mt-4 p-3 bg-yellow-500/10 text-yellow-300 rounded-lg text-sm flex items-center gap-2">
                                                <Crown className="w-4 h-4" /> Pytanie Premium - Przejdź na Premium, aby odpowiedzieć.
                                            </div>
                                        )}
                                    </div>
                                ))}

                                {!isPremium && quizQuestions.filter(q => q.isPremium).length > 0 && (
                                    <div className="p-6 rounded-2xl bg-gradient-to-r from-yellow-400/20 to-orange-500/20 border-2 border-yellow-400 text-center">
                                        <Lock className="w-8 h-8 text-yellow-400 mx-auto mb-3" />
                                        <h3 className="text-xl font-bold text-white">+{quizQuestions.filter(q => q.isPremium).length} pytań Premium</h3>
                                        <p className="text-white/70 text-sm mb-4">Odblokuj pełny quiz, aby rzetelnie sprawdzić swoją wiedzę.</p>
                                        <button
                                            onClick={() => setShowPremiumModal(true)}
                                            className="px-6 py-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold rounded-xl hover:shadow-lg transition-all"
                                        >
                                            Przejdź na Premium
                                        </button>
                                    </div>
                                )}

                                <div className="mt-8">
                                    <button
                                        onClick={() => setShowResults(true)}
                                        disabled={Object.keys(quizAnswers).length < availableQuestions.length}
                                        className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold text-base py-4 rounded-2xl hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                                    >
                                        {Object.keys(quizAnswers).length < availableQuestions.length ? `Odpowiedz na wszystkie pytania (${Object.keys(quizAnswers).length}/${availableQuestions.length})` : 'Zobacz wyniki 🎯'}
                                    </button>
                                </div>
                            </>
                        ) : (
                            <div className="space-y-4">
                                <div className={`glass rounded-2xl p-8 text-center`}>
                                    <div className={`inline-block w-16 h-16 rounded-full bg-gradient-to-br ${scoreData.bg} flex items-center justify-center mb-4`}>
                                        <Trophy className="w-8 h-8 text-white" />
                                    </div>
                                    <h2 className="text-3xl font-bold text-white mb-2">{scoreData.level}</h2>
                                    <p className="text-white/70 text-xl mb-4">
                                        Twój wynik: <span className="text-4xl font-extrabold gradient-text">{percentage}%</span>
                                    </p>
                                    <p className="text-lg text-white/70">
                                        Poprawne odpowiedzi: {correctAnswers} z {totalQuestions}
                                    </p>
                                </div>

                                <div className="glass rounded-2xl p-6">
                                    <h3 className="text-xl font-bold text-white mb-4">Szczegóły</h3>
                                    <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
                                        {availableQuestions.map((q, qIndex) => {
                                            const isCorrect = quizAnswers[q.id] === q.correct;
                                            const selectedOption = quizAnswers[q.id];

                                            return (
                                                <div key={q.id} className={`p-3 rounded-xl border ${isCorrect ? 'border-green-500 bg-green-500/10' : 'border-red-500 bg-red-500/10'}`}>
                                                    <div className="flex items-start gap-2">
                                                        {isCorrect ? <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-1" /> : <XCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-1" />}
                                                        <p className="text-white/90 font-medium">
                                                            {qIndex + 1}. {q.question}
                                                        </p>
                                                    </div>
                                                    <p className="mt-2 ml-7 text-sm">
                                                        <span className="font-semibold text-green-400">Poprawna:</span> {q.options[q.correct]}
                                                    </p>
                                                    {!isCorrect && selectedOption !== undefined && (
                                                        <p className="ml-7 text-sm">
                                                            <span className="font-semibold text-red-400">Twoja:</span> {q.options[selectedOption]}
                                                        </p>
                                                    )}
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                                <div className="flex justify-center mt-8">
                                    <button
                                        onClick={() => {
                                            setShowResults(false);
                                            setQuizAnswers({});
                                        }}
                                        className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold text-base py-4 px-8 rounded-2xl hover:shadow-2xl transition-all"
                                    >
                                        🔄 Spróbuj ponownie
                                    </button>
                                </div>
                            </div>
                        )}

                        <div className="flex justify-center mt-8">
                            <button
                                onClick={() => setCurrentView('sections')}
                                className="glass text-white font-bold text-base py-4 px-8 rounded-2xl hover:bg-white/20 transition-all"
                            >
                                📚 Wróć do nauki
                            </button>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        );
    };

    // ----------------------------------------------------
    // 10. Komponenty Stron Informacyjnych
    // ----------------------------------------------------
    const TermsPage = () => (
        <div className="min-h-screen p-6">
            <div className="max-w-4xl mx-auto">
                <div className="glass rounded-3xl p-8">
                    <button onClick={() => setShowTermsPage(false)} className="mb-6 text-white/70 hover:text-white transition-colors flex items-center gap-2" >
                        ← Powrót
                    </button>
                    <h1 className="text-4xl font-bold text-white mb-6">Regulamin Serwisu</h1>
                    <div className="prose prose-invert max-w-none text-white/90">
                        <h2 className="text-2xl font-bold text-white mt-6 mb-4">§1 Postanowienia ogólne</h2>
                        <p> 1. Serwisem zarządza <strong>Flowmanaged</strong>, dostępny pod adresem serwisu.<br/> 2. <strong>Użytkownik</strong> - osoba korzystająca z serwisu.<br/> 3. <strong>Konto</strong> - zbiór zasobów i ustawień utworzony dla Użytkownika.<br/> 4. <strong>Treści</strong> - materiały edukacyjne, quizy i inne zasoby dostępne w serwisie. </p>
                        <h2 className="text-2xl font-bold text-white mt-6 mb-4">§3 Rejestracja i konto</h2>
                        <p> 1. Do korzystania z pełnych funkcji serwisu wymagana jest rejestracja.<br/> 2. Użytkownik zobowiązany jest do podania prawdziwego adresu email.<br/> 3. Użytkownik odpowiada za zachowanie poufności danych dostępowych do konta.<br/> 4. Zabronione jest udostępnianie konta innym osobom.<br/> 5. Użytkownik może w każdej chwili usunąć swoje konto kontaktując się z administratorem. </p>
                        <h2 className="text-2xl font-bold text-white mt-6 mb-4">§4 Usługi i dostęp</h2>
                        <p> 1. Serwis oferuje darmowe i płatne (Premium) treści edukacyjne.<br/> 2. Treści Premium dostępne są po wykupieniu odpowiedniego pakietu.<br/> 3. Administrator zastrzega sobie prawo do zmiany zakresu treści darmowych i płatnych.<br/> 4. Dostęp do serwisu może być czasowo ograniczony z przyczyn technicznych. </p>
                        <h2 className="text-2xl font-bold text-white mt-6 mb-4">§5 Prawa autorskie</h2>
                        <p> 1. Wszystkie treści w serwisie są chronione prawami autorskimi.<br/> 2. Kopiowanie, rozpowszechnianie lub modyfikowanie treści bez zgody administratora jest zabronione. </p>
                        <h2 className="text-2xl font-bold text-white mt-6 mb-4">§6 Postanowienia końcowe</h2>
                        <p> 1. Regulamin wchodzi w życie z dniem opublikowania.<br/> 2. Administrator zastrzega sobie prawo do zmiany regulaminu.<br/> 3. Wszelkie spory będą rozstrzygane polubownie. </p>
                        <h2 className="text-2xl font-bold text-white mt-6 mb-4">Kontakt</h2>
                        <p> W sprawach związanych z regulaminem prosimy o kontakt:<br/> Email: <a href="mailto:flowmanaged@gmail.com" className="text-purple-400 hover:text-purple-300">flowmanaged@gmail.com</a> </p>
                        <p className="mt-8 text-white/60 text-sm"> Data ostatniej aktualizacji: 28 października 2024 </p>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );

    const PrivacyPage = () => (
        <div className="min-h-screen p-6">
            <div className="max-w-4xl mx-auto">
                <div className="glass rounded-3xl p-8">
                    <button onClick={() => setShowPrivacyPage(false)} className="mb-6 text-white/70 hover:text-white transition-colors flex items-center gap-2" >
                        ← Powrót
                    </button>
                    <h1 className="text-4xl font-bold text-white mb-6">Polityka Prywatności</h1>
                    <div className="prose prose-invert max-w-none text-white/90">
                        <h2 className="text-2xl font-bold text-white mt-6 mb-4">1. Administrator danych</h2>
                        <p> Administratorem Twoich danych osobowych jest <strong>Flowmanaged</strong>.<br/> Kontakt: <a href="mailto:flowmanaged@gmail.com" className="text-purple-400 hover:text-purple-300">flowmanaged@gmail.com</a> </p>
                        <h2 className="text-2xl font-bold text-white mt-6 mb-4">2. Cele przetwarzania danych</h2>
                        <p>Twoje dane osobowe przetwarzamy w następujących celach:</p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>Realizacja lub zawarcie umowy o świadczenie usług drogą elektroniczną (prowadzenie konta)</li>
                            <li>Wysyłka newslettera (jeśli wyraziłeś zgodę)</li>
                            <li>Cele analityczne i statystyczne</li>
                            <li>Dochodzenie roszczeń</li>
                        </ul>
                        <h2 className="text-2xl font-bold text-white mt-6 mb-4">3. Rodzaje przetwarzanych danych</h2>
                        <p>Przetwarzamy następujące dane osobowe:</p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>Adres e-mail (niezbędny do założenia konta)</li>
                            <li>Hasło (przechowywane w formie zaszyfrowanej)</li>
                            <li>Dane dotyczące aktywności w serwisie (np. ukończone sekcje, wyniki quizów)</li>
                            <li>Adres IP (do celów bezpieczeństwa i analityki)</li>
                        </ul>
                        <h2 className="text-2xl font-bold text-white mt-6 mb-4">4. Podstawa prawna przetwarzania</h2>
                        <p>Podstawą prawną przetwarzania jest:</p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>Art. 6 ust. 1 lit. b RODO (wykonanie umowy - prowadzenie konta)</li>
                            <li>Art. 6 ust. 1 lit. a RODO (Twoja zgoda - np. na newsletter)</li>
                            <li>Art. 6 ust. 1 lit. f RODO (prawnie uzasadniony interes Administratora - analityka, bezpieczeństwo)</li>
                        </ul>
                        <h2 className="text-2xl font-bold text-white mt-6 mb-4">5. Okres przechowywania danych</h2>
                        <p>Dane przetwarzamy przez okres posiadania konta, a po jego usunięciu – przez okres niezbędny do obrony roszczeń.</p>
                        <h2 className="text-2xl font-bold text-white mt-6 mb-4">6. Twoje prawa</h2>
                        <p>W zakresie przetwarzania danych osobowych przysługują Ci następujące prawa:</p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li><strong>Prawo dostępu</strong> - możesz uzyskać informację czy i jakie dane osobowe są przetwarzane</li>
                            <li><strong>Prawo do kopii danych</strong> - możesz otrzymać kopię swoich danych</li>
                            <li><strong>Prawo do sprostowania</strong> - możesz żądać poprawienia nieprawidłowych danych</li>
                            <li><strong>Prawo do usunięcia</strong> - możesz żądać usunięcia danych ("prawo do bycia zapomnianym")</li>
                            <li><strong>Prawo do ograniczenia przetwarzania</strong> - możesz żądać ograniczenia przetwarzania danych</li>
                            <li><strong>Prawo do przenoszenia danych</strong> - możesz otrzymać dane w ustrukturyzowanym formacie</li>
                            <li><strong>Prawo do cofnięcia zgody</strong> - możesz w dowolnym momencie cofnąć zgodę</li>
                            <li><strong>Prawo do sprzeciwu</strong> - możesz wnieść sprzeciw wobec przetwarzania danych</li>
                        </ul>
                        <h2 className="text-2xl font-bold text-white mt-6 mb-4">7. Prawo do wniesienia skargi</h2>
                        <p> Masz prawo wnieść skargę do organu nadzorczego - Prezesa Urzędu Ochrony Danych Osobowych,<br/> jeśli uważasz, że przetwarzanie Twoich danych osobowych narusza przepisy RODO. </p>
                        <h2 className="text-2xl font-bold text-white mt-6 mb-4">8. Cookies i technologie śledzące</h2>
                        <p> Nasza strona używa plików cookies i podobnych technologii w celu zapewnienia prawidłowego<br/> funkcjonowania serwisu, analizy ruchu oraz personalizacji treści. Możesz zarządzać ustawieniami<br/> cookies w swojej przeglądarce. </p>
                        <h2 className="text-2xl font-bold text-white mt-6 mb-4">9. Bezpieczeństwo danych</h2>
                        <p> Stosujemy odpowiednie środki techniczne i organizacyjne zapewniające bezpieczeństwo<br/> przetwarzanych danych osobowych, w tym ochronę przed nieuprawnionym dostępem, utratą i uszkodzeniem. </p>
                        <p className="mt-8 text-white/60 text-sm"> Data ostatniej aktualizacji: 28 października 2024 </p>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );

    // ----------------------------------------------------
    // 11. Główny Return Aplikacji
    // ----------------------------------------------------
    return (
        <div>
            {/* Wyświetlanie globalnych stron informacyjnych */}
            {showTermsPage ? (
                <TermsPage />
            ) : showPrivacyPage ? (
                <PrivacyPage />
            ) : (
                <>
                    {/* Routing */}
                    {currentView === 'home' && <HomePage />}
                    {currentView === 'sections' && <SectionsView />}
                    {currentView === 'quiz' && <QuizView />}
                    
                    {/* Modale i Toasty */}
                    {showPremiumModal && <PremiumModal />}
                    {showAuthModal && <AuthModal />}
                    {toast && <Toast message={toast.message} type={toast.type} />}
                </>
            )}
        </div>
    );
};

ReactDOM.render(<App />, document.getElementById('root'));