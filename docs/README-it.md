# Pinpoint App

## Panoramica

Pinpoint è un'applicazione completa per la logistica e il tracciamento progettata per ottimizzare la gestione delle consegne e migliorare l'esperienza utente. Include piattaforme sia web che mobili per il tracciamento in tempo reale, la gestione degli ordini e l'ottimizzazione dei percorsi.

---

## Funzionalità

### Funzionalità Attuali

- **Consistenza dei Modelli Backend**: Garantisce l'integrità dei dati tra i modelli.
- **Operazioni CRUD**: Funzionalità di Creazione, Lettura, Aggiornamento ed Eliminazione per operatori e pacchi.
- **Caricamento di Dati in Bulk da CSV**: Carica facilmente grandi set di dati.

### In Corso di Sviluppo

- **Routing su Mappa**: Aggiunta di funzionalità di routing in tempo reale.
- **Chat Admin-Operatore**: Comunicazione fluida tra amministratori e operatori.

### Pianificato

- **Mappa Sincronizzata con WebSocket**: Sviluppo di una mappa sincronizzata per l'interazione in tempo reale tra la dashboard dell'amministratore e l'app dell'operatore (Expo).
- **Ristrutturazione del Frontend**: Miglioramento del design e dell'esperienza utente.
- **Notifiche**: Implementazione di notifiche push e in-app.
- **Miglioramenti di Sicurezza**: Rafforzamento delle misure di sicurezza.

### Futuro

Il progetto è progettato come un lavoro continuo per supportare l'auto-miglioramento. Con ogni nuova competenza acquisita, verranno implementate ulteriori funzionalità. Di seguito sono riportati i tre principali step previsti:

1. **Fattibilità come Servizio di Tracciamento/Logistica**
   - Garantire che tutte le funzionalità di base (elencate sopra) siano operative e user-friendly.

2. **Raccolta Dati per l'Apprendimento**
   - Risolvere problemi comuni nel settore della logistica, come l'elevato turnover del personale e le difficoltà nell'apprendimento di nuovi percorsi.
   - Attraverso la raccolta e condivisione di dati sulle consegne, l'app mira a facilitare l'apprendimento dei nuovi dipendenti, aiutandoli a diventare rapidamente competenti.

3. **Preparazione per l'Integrazione con Droni**
   - Raccogliere dati accurati sugli indirizzi per prepararsi all'integrazione delle consegne tramite droni.
   - Migliorare la precisione degli indirizzi di consegna per supportare questo approccio futuristico.

---

## Stack Tecnologico

### Backend:
- **Framework**: Django (Python)
- **Database**: SQLite3
- **Gestione dell'Ambiente**: `python-dotenv`

### Frontend:
- **Framework**: React (Vite)
- **Stilizzazione**: Tailwind CSS
- **Gestione dello Stato**: Context API
- **Linting**: ESLint

### Mobile:
- **Framework**: React Native (Expo)

### Altri Strumenti:
- **Version Control**: Git
- **Integrazione Mappe**: Mapbox

---

## Istruzioni di Configurazione

### Backend:

1. **Clonare il Repository**:
   ```bash
   git clone <repository-url>
   cd backend
   ```

2. **Configurare l'Ambiente Virtuale**:
   ```bash
   python3 -m venv .venv
   source .venv/bin/activate  # Su Windows: venv\Scripts\activate
   ```

3. **Installare le Dipendenze**:
   ```bash
   pip install -r requirements.txt
   ```

4. **Configurare le Variabili d'Ambiente**:
   Creare un file `.env` nella directory principale e aggiungere le variabili necessarie:
   ```env
   DEBUG=True
   SECRET_KEY=your_secret_key
   ```

5. **Eseguire le Migrazioni**:
   ```bash
   python manage.py migrate
   ```

6. **Avviare il Server**:
   ```bash
   python manage.py runserver
   ```

### Frontend:

1. **Navigare nella Directory del Frontend**:
   ```bash
   cd frontend
   ```

2. **Installare le Dipendenze**:
   ```bash
   npm install
   ```

3. **Avviare il Server di Sviluppo**:
   ```bash
   npm run dev
   ```

### Mobile:

1. **Navigare nella Directory Mobile**:
   ```bash
   cd mobile
   ```

2. **Installare le Dipendenze**:
   ```bash
   npm install
   ```

3. **Avviare il Server Expo**:
   ```bash
   npx expo start
   ```

---

## Utilizzo

1. Avviare sia il server backend che frontend seguendo le istruzioni di configurazione.
2. Accedere all'app web su `http://localhost:5173`.
3. Usare l'app mobile con Expo Go o distribuirla su un dispositivo.
4. Gestire consegne, tracciare ordini ed esplorare le funzionalità di routing in tempo reale.

---

## Struttura delle Cartelle

### Backend:
- `myApp/` - Cartella principale dell'applicazione.
- `requirements.txt` - Dipendenze del backend.

### Frontend:
- `src/` - Contiene i componenti React e le pagine.
- `public/` - Risorse statiche.
- `vite.config.js` - Configurazione Vite.

### Mobile:
- `App.js` - Punto d'ingresso per l'app React Native.
- `assets/` - Risorse statiche per l'app mobile.

---

## Fonti

- [Django](https://www.djangoproject.com/)
- [React](https://reactjs.org/)
- [React Native](https://reactnative.dev/)
- [Mapbox](https://www.mapbox.com/)

---

