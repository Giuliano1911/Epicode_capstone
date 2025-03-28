# Web application per un personal trainer

Questo progetto nasce dalla mia passione per il bodybuilding e dall'esigenza di avere uno strumento semplice e intuitivo per pianificare gli allenamenti e le diete dei clienti.

Repository front-end: [https://github.com/Giuliano1911/Epicode_capstone](https://github.com/Giuliano1911/Epicode_capstone)

Repository back-end: [https://github.com/Giuliano1911/progetto_finale_backend](https://github.com/Giuliano1911/progetto_finale_backend)

## Funzionalità

Il PT può creare schede di allenamento e diete per i suoi clienti, inoltre può:

· tenere traccia dei pagamenti dei clienti

· creare o eliminare profili utente

· vedere e rivedere lo storico delle schede e delle diete create in precedenza

· aggiungere esercizi o alimenti al db

· tenere traccia di tutti gli appuntamenti tramite un comodo calendario

· partecipare alla chat di gruppo

Gli utenti invece possono:

· vedere le schede e diete del PT

· aggiungere foto al proprio profilo

· creare appuntamenti per check online in base agli orari disponibili

· partecipare alla chat di gruppo

## Tecnologie utilizzate

· Frontend: React Typescript, Bootstrap

· Backend: Spring Boot

· Autenticazione: JWT

· ChatBot: AI Gemini 2.0 flash

· ChatRoom: spring-boot-starter-websocket + SockJs e StompJs

· Database: PostgreSQL

Nella homepage è presente un ChatBot realizzato con AI Gemini 2.0 flash "trainata" a rispondere solo alle domande pertinenti ai servizi offerti dal PT.

La chat di gruppo è stata realizzata usando spring-boot-starter-websocket nel back-end e SockJs + StompJs nel front-end.

Sempre nella homepage si può trovare il form per inviare una mail al PT, la mail viene inviata tramite spring-boot-starter-mail

Il calendario per la registrazione degli appuntamenti è stato realizzato usando react-calendar.

## Lezioni imparate

Durante lo sviluppo di questo progetto, ho avuto l'opportunità di imparare molte lezioni sia a livello tecnico che personale:

#### 1. Ottimizzazione dell'esperienza utente

Mi sono potuto concentrare molto sul design dell'interfaccia utente, per rendere il sito piü semplice e intuitivo per l'utente e per il PT.

#### 2. Gestione del tempo e delle priorità

Ho avuto modo di concentrarmi sulla gestione del tempo e delle priorità, ho imparato a gestire meglio il mio tempo, a suddividere il lavoro in fasi più piccole e a mantenere la concentrazione sugli obiettivi principali senza sacrificare gli impegni quotidiani.

#### 3. Problem solving

Durante lo sviluppo, ho incontrato diversi bug inaspettati e problemi di integrazione tra diverse librerie (Socket sto parlando di voi!). Ho imparato a fare debugging in modo più efficiente e a gestire i problemi in modo più strutturato, migliorando notevolmente la mia capacità di risolvere i problemi.

#### 4. Valore del feedback

Durante lo sviluppo, ho avuto modo di chiedere a diversi personal trainer cosa potessi fare per migliorare il sito e per migliorare l'esperienza utente. Ho imparato a seguire e valorizzare i feedback per creare applicazioni che rispondano veramente ai bisogni degli utenti.
