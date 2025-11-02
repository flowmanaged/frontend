# ⚡ Szybki Start - 3 Kroki

## 🎯 Co masz teraz?

✅ **Backend** - działa na `http://localhost:3000`  
✅ **Frontend (HTML + React)** - w pliku `Akademia_integrated.html`  
✅ **Serwer do frontendu** - w pliku `server.js`

---

## 🚀 Uruchomienie w 3 krokach

### Krok 1: Sprawdź backend
```bash
curl http://localhost:3000/api/health
```
Jeśli widzisz odpowiedź JSON - backend działa! ✅

### Krok 2: Zainstaluj zależności frontendu
```bash
npm install
```

### Krok 3: Uruchom frontend
```bash
npm start
```

**GOTOWE!** 🎉  
Otwórz: `http://localhost:8080`

---

## 🔥 Jeszcze szybciej

### Windows:
```bash
start.bat
```

### Linux/Mac:
```bash
./start.sh
```

---

## 📝 Co dalej?

1. **Zarejestruj się** w aplikacji
2. **Zaloguj się**
3. **Rozpocznij naukę!**

---

## ❓ Problemy?

### Backend nie działa?
Zobacz: `BACKEND_SETUP.md` - tam jest pełny przykład kodu backendu

### Błędy CORS?
Sprawdź konfigurację CORS w backendzie:
```javascript
app.use(cors({
    origin: 'http://localhost:8080',
    credentials: true
}));
```

### Więcej pomocy?
Przeczytaj: `README.md` - tam jest pełna dokumentacja

---

## 🎓 Co jest w paczce?

```
📦 frontend/
├── 📄 Akademia_integrated.html   ← Aplikacja React
├── 🚀 server.js                  ← Serwer Express
├── 📦 package.json               ← Zależności
├── 📖 README.md                  ← Pełna dokumentacja
├── 🔧 BACKEND_SETUP.md           ← Przykład backendu
├── ⚡ QUICK_START.md             ← Ten plik
├── 🪟 start.bat                  ← Skrypt dla Windows
└── 🐧 start.sh                   ← Skrypt dla Linux/Mac
```

---

## 🎯 Pierwsze użycie

1. **Rejestracja** - Stwórz konto (email + hasło)
2. **Sekcje** - Przeglądaj bezpłatne sekcje nauki
3. **Quiz** - Sprawdź swoją wiedzę
4. **Premium** - Odblokuj dodatkowe treści (demo)

---

## 💡 Porty

- **Frontend**: `http://localhost:8080`
- **Backend**: `http://localhost:3000`

---

**Happy Learning! 🚀📚**
