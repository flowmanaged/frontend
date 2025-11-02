# Konfiguracja CORS dla Backendu

## Jeśli używasz Express.js

Dodaj tę konfigurację do swojego pliku głównego backendu (np. `server.js` lub `app.js`):

```javascript
const express = require('express');
const cors = require('cors');
const session = require('express-session');
const cookieParser = require('cookie-parser');

const app = express();

// 1. Cookie Parser (przed CORS!)
app.use(cookieParser());

// 2. CORS Configuration
app.use(cors({
    origin: 'http://localhost:8080',  // URL frontendu
    credentials: true,                // Pozwól na wysyłanie cookies
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// 3. Body Parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 4. Session Configuration
app.use(session({
    secret: 'twoj-sekretny-klucz',  // ZMIEŃ TO W PRODUKCJI!
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,              // true w produkcji z HTTPS
        httpOnly: true,             // Ochrona przed XSS
        maxAge: 24 * 60 * 60 * 1000 // 24 godziny
    }
}));

// Twoje pozostałe middleware i routy...
```

## Instalacja wymaganych pakietów

```bash
npm install express cors express-session cookie-parser
```

## Pełny przykład serwera backendu

```javascript
const express = require('express');
const cors = require('cors');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');

const app = express();
const PORT = 3000;

// Tymczasowa "baza danych" w pamięci (użyj prawdziwej bazy w produkcji!)
const users = [];

// Middleware
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:8080',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(session({
    secret: 'zmien-mnie-w-produkcji-na-losowy-string',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000
    }
}));

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ 
        status: 'ok', 
        message: 'Backend is running',
        timestamp: new Date().toISOString()
    });
});

// Rejestracja
app.post('/api/auth/register', async (req, res) => {
    try {
        const { email, password, name } = req.body;

        // Walidacja
        if (!email || !password) {
            return res.status(400).json({ message: 'Email i hasło są wymagane' });
        }

        // Sprawdź czy użytkownik już istnieje
        if (users.find(u => u.email === email)) {
            return res.status(400).json({ message: 'Użytkownik już istnieje' });
        }

        // Hashowanie hasła
        const hashedPassword = await bcrypt.hash(password, 10);

        // Tworzenie użytkownika
        const user = {
            id: users.length + 1,
            email,
            name,
            password: hashedPassword,
            isPremium: false,
            createdAt: new Date()
        };

        users.push(user);

        // Zapisz sesję
        req.session.userId = user.id;

        // Nie wysyłaj hasła do klienta
        const { password: _, ...userWithoutPassword } = user;

        res.json({
            message: 'Rejestracja pomyślna',
            user: userWithoutPassword
        });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ message: 'Błąd serwera' });
    }
});

// Logowanie
app.post('/api/auth/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Walidacja
        if (!email || !password) {
            return res.status(400).json({ message: 'Email i hasło są wymagane' });
        }

        // Znajdź użytkownika
        const user = users.find(u => u.email === email);
        if (!user) {
            return res.status(401).json({ message: 'Nieprawidłowy email lub hasło' });
        }

        // Sprawdź hasło
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return res.status(401).json({ message: 'Nieprawidłowy email lub hasło' });
        }

        // Zapisz sesję
        req.session.userId = user.id;

        // Nie wysyłaj hasła do klienta
        const { password: _, ...userWithoutPassword } = user;

        res.json({
            message: 'Logowanie pomyślne',
            user: userWithoutPassword
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Błąd serwera' });
    }
});

// Wylogowanie
app.post('/api/auth/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ message: 'Błąd wylogowania' });
        }
        res.clearCookie('connect.sid');
        res.json({ message: 'Wylogowano pomyślnie' });
    });
});

// Sprawdź sesję
app.get('/api/auth/me', (req, res) => {
    if (!req.session.userId) {
        return res.status(401).json({ message: 'Brak autoryzacji' });
    }

    const user = users.find(u => u.id === req.session.userId);
    if (!user) {
        return res.status(404).json({ message: 'Użytkownik nie znaleziony' });
    }

    const { password: _, ...userWithoutPassword } = user;
    res.json({ user: userWithoutPassword });
});

// Start serwera
app.listen(PORT, () => {
    console.log(`
╔══════════════════════════════════════════════╗
║                                              ║
║   🚀 Backend Server Started!                ║
║                                              ║
║   📍 URL: http://localhost:${PORT}            ║
║                                              ║
║   ✅ Health Check: /api/health              ║
║   🔐 Auth Endpoints:                        ║
║      - POST /api/auth/register              ║
║      - POST /api/auth/login                 ║
║      - POST /api/auth/logout                ║
║      - GET  /api/auth/me                    ║
║                                              ║
╚══════════════════════════════════════════════╝
    `);
});
```

## Instalacja wszystkich wymaganych pakietów

```bash
npm install express cors express-session cookie-parser bcrypt
```

## Testowanie endpointów

### Health Check
```bash
curl http://localhost:3000/api/health
```

### Rejestracja
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"test123","name":"Test User"}'
```

### Logowanie
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"test123"}' \
  -c cookies.txt
```

### Sprawdź sesję
```bash
curl http://localhost:3000/api/auth/me -b cookies.txt
```

## Ważne uwagi dla produkcji

1. **Zmień secret sesji** na długi, losowy string
2. **Ustaw `cookie.secure: true`** przy użyciu HTTPS
3. **Użyj prawdziwej bazy danych** zamiast tablicy w pamięci
4. **Dodaj rate limiting** (np. express-rate-limit)
5. **Dodaj helmet.js** dla bezpieczeństwa
6. **Ustaw odpowiednie zmienne środowiskowe**
7. **Loguj błędy do pliku** zamiast konsoli

## Przykład z MongoDB

```javascript
const mongoose = require('mongoose');

// User Model
const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: String,
    isPremium: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);

// Połączenie z MongoDB
mongoose.connect('mongodb://localhost:27017/akademia', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
```

## Zmienne środowiskowe (.env)

```env
PORT=3000
FRONTEND_URL=http://localhost:8080
SESSION_SECRET=twoj-bardzo-bezpieczny-losowy-string
MONGODB_URI=mongodb://localhost:27017/akademia
NODE_ENV=development
```

Użyj `dotenv`:
```javascript
require('dotenv').config();

const PORT = process.env.PORT || 3000;
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:8080';
```
