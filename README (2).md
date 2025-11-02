# 🎓 Akademia Analizy Biznesowej - Frontend

Interaktywna platforma edukacyjna z integracją backendu Node.js/Express.

## 📋 Wymagania

- Node.js (wersja 14 lub nowsza)
- Backend uruchomiony na `http://localhost:3000`
- Przeglądarka internetowa (Chrome, Firefox, Safari, Edge)

## 🚀 Szybki Start

### Metoda 1: Uruchomienie z serwerem Express (ZALECANE)

1. **Zainstaluj zależności:**
```bash
npm install
```

2. **Upewnij się, że backend działa:**
```bash
# Backend powinien być uruchomiony na porcie 3000
# Sprawdź czy działa:
curl http://localhost:3000/api/health
```

3. **Uruchom serwer frontend:**
```bash
npm start
```

4. **Otwórz w przeglądarce:**
```
http://localhost:8080
```

### Metoda 2: Bezpośrednie otwarcie pliku HTML

> ⚠️ **UWAGA:** Ta metoda może nie działać poprawnie z powodu polityki CORS!

1. Otwórz plik `Akademia_integrated.html` bezpośrednio w przeglądarce
2. Jeśli wystąpią błędy CORS, użyj Metody 1

### Metoda 3: Python HTTP Server (dla deweloperów Python)

```bash
# Python 3
python -m http.server 8080

# Następnie otwórz http://localhost:8080
```

## 🔧 Konfiguracja

### Zmiana portu backendu

Jeśli Twój backend działa na innym porcie niż 3000, edytuj plik `Akademia_integrated.html`:

```javascript
// Znajdź linię:
const API_BASE_URL = 'http://localhost:3000/api';

// Zmień na:
const API_BASE_URL = 'http://localhost:TWÓJ_PORT/api';
```

### Zmiana portu frontendu

Edytuj plik `server.js`:

```javascript
// Zmień:
const PORT = 8080;

// Na:
const PORT = TWÓJ_PORT;
```

## 📡 Endpointy API

Frontend komunikuje się z następującymi endpointami backendu:

### Autoryzacja
- `POST /api/auth/register` - Rejestracja użytkownika
- `POST /api/auth/login` - Logowanie użytkownika
- `POST /api/auth/logout` - Wylogowanie użytkownika
- `GET /api/auth/me` - Sprawdzenie sesji

### Zdrowie API
- `GET /api/health` - Sprawdzenie stanu backendu

## 🎨 Funkcjonalności

### ✅ Zaimplementowane:
- ✨ System autoryzacji (rejestracja, logowanie, wylogowanie)
- 👤 Zarządzanie sesjami użytkownika
- 📚 Sekcje edukacyjne (darmowe i premium)
- 🎯 System quizów
- 🏆 Śledzenie postępów
- 💎 System Premium
- 🎨 Responsywny design
- 🔔 Powiadomienia (toast notifications)
- 🔐 Ochrona treści premium

### 🔄 Do zaimplementowania na backendzie:
- Zapisywanie postępów w bazie danych
- System płatności Premium
- Generowanie certyfikatów
- Email z potwierdzeniem rejestracji
- Reset hasła

## 🐛 Rozwiązywanie problemów

### Problem: "Failed to fetch" lub błędy CORS

**Rozwiązanie:**
1. Upewnij się, że backend działa: `curl http://localhost:3000/api/health`
2. Sprawdź czy backend ma włączony CORS dla `http://localhost:8080`
3. Użyj Metody 1 (serwer Express) zamiast otwierania pliku bezpośrednio

### Problem: Backend nie odpowiada

**Rozwiązanie:**
1. Sprawdź czy backend jest uruchomiony
2. Sprawdź logi backendu
3. Upewnij się, że port 3000 nie jest zajęty przez inną aplikację

### Problem: Strona się nie ładuje

**Rozwiązanie:**
1. Sprawdź konsolę przeglądarki (F12) pod kątem błędów
2. Upewnij się, że masz połączenie z internetem (dla CDN bibliotek)
3. Wyczyść cache przeglądarki

### Problem: Sesja nie jest zachowywana

**Rozwiązanie:**
1. Sprawdź czy backend wysyła cookies
2. Upewnij się, że backend ma włączone `credentials: true` w CORS
3. Sprawdź czy przeglądarka akceptuje cookies

## 📝 Struktura projektu

```
frontend/
├── Akademia_integrated.html    # Główny plik aplikacji
├── server.js                   # Serwer Express
├── package.json                # Zależności Node.js
└── README.md                   # Ta dokumentacja
```

## 🔐 Bezpieczeństwo

- Hasła są wysyłane przez HTTPS (w produkcji)
- Sesje są zarządzane przez cookies HTTP-only
- Tokeny CSRF (do implementacji)
- Walidacja danych po stronie backendu

## 📱 Responsywność

Aplikacja jest w pełni responsywna i działa na:
- 💻 Desktopach (1920px+)
- 💻 Laptopach (1366px-1920px)
- 📱 Tabletach (768px-1366px)
- 📱 Telefonach (< 768px)

## 🎓 Użytkowanie

### Dla użytkowników niezalogowanych:
- Przeglądanie strony głównej
- Dostęp do darmowych sekcji (po zalogowaniu)
- Możliwość rejestracji/logowania

### Dla zalogowanych użytkowników:
- Dostęp do wszystkich darmowych sekcji
- Możliwość ukończenia sekcji
- Dostęp do quizów darmowych
- Śledzenie postępów

### Dla użytkowników Premium:
- Wszystkie funkcje użytkowników standardowych
- Dostęp do sekcji premium
- Dostęp do pytań premium w quizach
- Certyfikaty (do implementacji)

## 🚀 Deploy do produkcji

### Przygotowanie:

1. **Zmień URL API:**
```javascript
const API_BASE_URL = 'https://twoj-backend.com/api';
```

2. **Zbuduj produkcyjną wersję:**
- Opcjonalnie użyj narzędzi do minifikacji HTML/CSS/JS

3. **Wdrożenie:**
- Netlify (zalecane)
- Vercel
- GitHub Pages
- Własny serwer

### Przykład wdrożenia na Netlify:

```bash
# Zainstaluj Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Deploy
netlify deploy --prod
```

## 📧 Wsparcie

Jeśli masz problemy:
1. Sprawdź sekcję "Rozwiązywanie problemów"
2. Sprawdź logi w konsoli przeglądarki (F12)
3. Sprawdź logi backendu

## 📄 Licencja

MIT License

## 🎉 Gotowe!

Twoja Akademia Analizy Biznesowej jest gotowa do użycia!

**Happy Learning! 🚀📚**
