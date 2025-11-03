# Platforma Edukacyjna - Analiza Biznesowa

Nowoczesna interaktywna platforma do nauki analizy biznesowej z systemem quizów, sekcjami tematycznymi i panelem administracyjnym.

## 🚀 Funkcjonalności

### Dla Użytkowników
- 📚 **Sekcje tematyczne** - Kompleksowe materiały edukacyjne podzielone na logiczne sekcje
- 🎯 **System quizów** - Interaktywne testy sprawdzające wiedzę
- 🏆 **Tracking postępów** - Śledzenie ukończonych sekcji i wyników quizów
- 💎 **System Premium** - Dostęp do zaawansowanych treści
- 👤 **System logowania** - Bezpieczna autentykacja użytkowników

### Dla Administratorów
- 📊 **Dashboard** - Szczegółowe statystyki i metryki
- 👥 **Zarządzanie użytkownikami** - Pełna kontrola nad kontami użytkowników
- 💳 **Historia zakupów** - Monitoring transakcji Premium
- 📝 **Zarządzanie treścią** - Edycja sekcji i quizów
- 📈 **Raporty** - Analiza aktywności użytkowników
- 🎁 **Promocje** - System kodów rabatowych
- 💌 **Komunikacja** - Wysyłka powiadomień do użytkowników

## 🛠️ Technologie

- **Frontend**: React 18
- **Styling**: TailwindCSS
- **Ikony**: Lucide React
- **Build**: Babel (standalone)

## 📦 Instalacja

### Uruchomienie lokalne

1. Sklonuj repozytorium:
```bash
git clone https://github.com/twoje-repo/analiza-biznesowa.git
cd analiza-biznesowa
```

2. Otwórz `index.html` w przeglądarce:
```bash
# Windows
start index.html

# MacOS
open index.html

# Linux
xdg-open index.html
```

### Uruchomienie z serwerem lokalnym

Dla lepszej wydajności, użyj lokalnego serwera:

```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000

# Node.js (jeśli masz zainstalowany npx)
npx http-server

# PHP
php -S localhost:8000
```

Następnie otwórz przeglądarkę i przejdź do `http://localhost:8000`

## 📁 Struktura projektu

```
analiza-biznesowa/
├── index.html          # Główny plik HTML
├── styles.css          # Wszystkie style CSS
├── app.js              # Logika aplikacji React
├── README.md           # Dokumentacja
├── .gitignore          # Ignorowane pliki
└── LICENSE             # Licencja projektu
```

## 🔐 Dostępy

### Konto testowe użytkownika
- Email: `user@test.pl`
- Hasło: `test123`

### Konto testowe administratora
- Email: `admin@test.pl`
- Hasło: `admin123`

## 🎨 Customizacja

### Zmiana kolorów
Kolory są definiowane w `styles.css` i używają gradientów Tailwind. Główne kolory:
- Primary: `#667eea` (fioletowy)
- Secondary: `#764ba2` (purpurowy)
- Accent: `#FFD700` (złoty - Premium)

### Dodawanie nowych sekcji
Sekcje są zdefiniowane w pliku `app.js` w tablicy `sections`. Struktura sekcji:
```javascript
{
    id: unique_id,
    title: "Tytuł sekcji",
    description: "Opis",
    icon: IconName,
    isPremium: false,
    content: "Treść sekcji..."
}
```

### Dodawanie quizów
Quizy są zdefiniowane w tablicy `quizQuestions`:
```javascript
{
    id: unique_id,
    question: "Pytanie?",
    options: ["A", "B", "C", "D"],
    correctAnswer: 0,
    sectionId: section_id,
    isPremium: false
}
```

## 🚀 Deployment

### GitHub Pages
1. Stwórz repozytorium na GitHub
2. Wypchnij kod do repozytorium
3. Przejdź do Settings → Pages
4. Wybierz branch `main` i folder `root`
5. Kliknij Save

### Netlify
1. Połącz repozytorium z Netlify
2. Build settings:
   - Build command: `(puste)`
   - Publish directory: `./`
3. Deploy!

### Vercel
```bash
npm install -g vercel
vercel
```

## 📝 TODO / Roadmap

- [ ] Integracja z backendem (API)
- [ ] Baza danych dla użytkowników i postępów
- [ ] System płatności (Stripe/PayU)
- [ ] Email notifications
- [ ] Eksport postępów do PDF
- [ ] Aplikacja mobilna (React Native)
- [ ] Tryb offline (PWA)
- [ ] System certyfikatów po ukończeniu

## 🤝 Współpraca

Chętnie przyjmujemy pull requesty! Dla większych zmian, prosimy o otwarcie issue, aby omówić proponowane zmiany.

1. Fork projektu
2. Stwórz branch feature (`git checkout -b feature/AmazingFeature`)
3. Commit zmian (`git commit -m 'Add some AmazingFeature'`)
4. Push do brancha (`git push origin feature/AmazingFeature`)
5. Otwórz Pull Request

## 📄 Licencja

MIT License - zobacz plik [LICENSE](LICENSE) dla szczegółów.

## 👨‍💻 Autorzy

- **Twoje Imię** - *Initial work*

## 🙏 Podziękowania

- React Team za świetny framework
- Tailwind CSS za niesamowity system stylowania
- Lucide za piękne ikony

## 📞 Kontakt

- Email: kontakt@akademia-ba.pl
- Website: https://akademia-ba.pl
- GitHub: [@your-username](https://github.com/your-username)

---

⭐️ Jeśli projekt Ci się podoba, zostaw gwiazdkę na GitHub!
