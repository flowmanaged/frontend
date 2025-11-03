# Instrukcje Deploymentu

Ten dokument opisuje różne sposoby wdrożenia aplikacji do produkcji.

## 📦 GitHub Pages (Darmowe)

Najprostszy sposób hostingu dla statycznych stron.

### Krok po kroku:

1. **Przygotuj repozytorium**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/USERNAME/REPO.git
   git push -u origin main
   ```

2. **Włącz GitHub Pages**
   - Przejdź do Settings → Pages
   - Source: Deploy from a branch
   - Branch: main → / (root)
   - Save

3. **Odwiedź swoją stronę**
   - URL: `https://USERNAME.github.io/REPO`

## 🚀 Netlify (Darmowe)

Automatyczny deployment z GitHub.

### Krok po kroku:

1. **Połącz z GitHub**
   - Zaloguj się na [netlify.com](https://netlify.com)
   - New site from Git
   - Wybierz swoje repozytorium

2. **Konfiguracja Build**
   - Build command: (pozostaw puste)
   - Publish directory: `./`
   - Deploy site

3. **Custom Domain (opcjonalnie)**
   - Domain settings → Add custom domain
   - Skonfiguruj DNS zgodnie z instrukcjami

### Automatyczny deployment
Każdy push do main automatycznie wdraża nową wersję!

## ▲ Vercel (Darmowe)

Szybki deployment z CLI lub GUI.

### Metoda 1: Vercel CLI

```bash
# Instalacja
npm install -g vercel

# Deploy
vercel

# Production deploy
vercel --prod
```

### Metoda 2: Vercel Dashboard

1. Połącz z GitHub
2. Import Project
3. Deploy!

## 🌐 Własny Serwer (VPS)

Dla pełnej kontroli nad hostingiem.

### Nginx

1. **Zainstaluj Nginx**
   ```bash
   sudo apt update
   sudo apt install nginx
   ```

2. **Skopiuj pliki**
   ```bash
   sudo cp -r * /var/www/html/
   ```

3. **Konfiguracja Nginx**
   ```nginx
   server {
       listen 80;
       server_name yourdomain.com;
       root /var/www/html;
       index index.html;
       
       location / {
           try_files $uri $uri/ /index.html;
       }
   }
   ```

4. **Restart Nginx**
   ```bash
   sudo systemctl restart nginx
   ```

### Apache

1. **Zainstaluj Apache**
   ```bash
   sudo apt update
   sudo apt install apache2
   ```

2. **Skopiuj pliki**
   ```bash
   sudo cp -r * /var/www/html/
   ```

3. **Konfiguracja .htaccess**
   ```apache
   <IfModule mod_rewrite.c>
       RewriteEngine On
       RewriteBase /
       RewriteRule ^index\.html$ - [L]
       RewriteCond %{REQUEST_FILENAME} !-f
       RewriteCond %{REQUEST_FILENAME} !-d
       RewriteRule . /index.html [L]
   </IfModule>
   ```

## 🔒 HTTPS/SSL

### Let's Encrypt (Darmowe)

```bash
# Instalacja Certbot
sudo apt install certbot python3-certbot-nginx

# Uzyskaj certyfikat
sudo certbot --nginx -d yourdomain.com

# Auto-renewal
sudo certbot renew --dry-run
```

## 📊 Monitoring

### Google Analytics

Dodaj przed `</head>` w `index.html`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

## 🎯 Optymalizacja

### Minifikacja

```bash
# HTML
npm install -g html-minifier
html-minifier --collapse-whitespace --remove-comments index.html -o index.min.html

# CSS
npm install -g clean-css-cli
cleancss -o styles.min.css styles.css

# JS
npm install -g terser
terser app.js -o app.min.js --compress --mangle
```

### CDN

Rozważ użycie CDN dla:
- React
- Tailwind
- Lucide Icons

Alternatywnie, pobierz lokalne kopie dla lepszej wydajności.

## 🔄 CI/CD

### GitHub Actions

Stwórz `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      
      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./
```

## 📝 Checklist przed Deploymentem

- [ ] Przetestuj wszystkie funkcjonalności
- [ ] Sprawdź responsywność na różnych urządzeniach
- [ ] Zoptymalizuj obrazy
- [ ] Dodaj Google Analytics (opcjonalnie)
- [ ] Skonfiguruj własną domenę (opcjonalnie)
- [ ] Włącz HTTPS
- [ ] Dodaj favicon
- [ ] Sprawdź SEO (meta tagi)
- [ ] Przetestuj na różnych przeglądarkach

## 🐛 Rozwiązywanie problemów

### Strona nie ładuje się
- Sprawdź console w DevTools
- Upewnij się, że wszystkie pliki są w odpowiednich ścieżkach
- Sprawdź czy CDN są dostępne

### Błędy CORS
- Użyj lokalnego serwera (nie otwieraj bezpośrednio pliku HTML)
- Skonfiguruj odpowiednie nagłówki na serwerze

### Wolne ładowanie
- Zminifikuj pliki
- Użyj lokalnych kopii bibliotek zamiast CDN
- Włącz kompresję gzip na serwerze

---

Masz pytania? Otwórz Issue na GitHub!
