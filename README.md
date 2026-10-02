# TP Déploiement : Pipeline CI/CD

Ce dépôt contient une application Node.js (Express) déployée automatiquement via GitHub Actions sur une VM Azure.

## Fonctionnement du Pipeline

La pipeline GitHub Actions se déclenche automatiquement à chaque `push` sur la branche `main`.
Elle est composée de 4 jobs :

1. **Job 1 : Unit Tests**
   - Installe les dépendances via `npm install`.
   - Exécute les tests unitaires avec Jest (`npm run test:unit`).
2. **Job 2 : E2E Tests**
   - Installe les dépendances.
   - Lance des requêtes HTTP (Supertest) pour tester les endpoints (`/health`, `/api/add`).
3. **Job 3 : Build & Push Docker Hub**
   - Conditionné par la réussite des jobs 1 et 2.
   - Construit l'image Docker de l'application.
   - Pousse l'image sur Docker Hub avec deux tags : `latest` et le hash du commit Git (`github.sha`).
4. **Job 4 : Deploy sur VM Azure**
   - Se connecte en SSH à la VM Azure.
   - Récupère la dernière image depuis Docker Hub.
   - Assure l'idempotence : arrête et supprime l'ancien conteneur s'il existe.
   - Démarre un nouveau conteneur sur le port 8080.
   - Effectue un *Healthcheck* (`curl -f http://localhost:8080/health`) pour vérifier que l'application répond correctement.

## Choix Techniques Réalisés

- **Application** : Node.js avec Express, très léger, simple à tester et déployer.
- **Tests** : Jest (Unit) et Supertest (E2E). L'avantage de Supertest est de simuler des appels HTTP sans nécessiter de lancer un serveur web sur un port réel dans le CI, simplifiant le workflow.
- **Docker** : Utilisation d'une image de base `node:18-alpine` pour avoir une image extrêmement légère et sécurisée.
- **Déploiement** : Utilisation de `appleboy/ssh-action` pour l'exécution sécurisée et directe de commandes Docker sur la VM Azure.
- **Idempotence** : Utilisation des commandes `docker stop myapp-container || true` et `docker rm myapp-container || true` garantissant que le déploiement ne plantera pas si c'est la première fois ou s'il a déjà été déployé.

## Secrets GitHub Requis

Pour que ce pipeline fonctionne, configurez les secrets suivants dans votre dépôt GitHub :

- `DOCKER_USERNAME` : Votre nom d'utilisateur Docker Hub
- `DOCKER_TOKEN` : Votre Personal Access Token (PAT) Docker Hub
- `VM_HOST` : L'adresse IP publique de la VM Azure
- `VM_USER` : L'utilisateur SSH de la VM Azure
- `VM_SSH_KEY` : La clé privée SSH pour accéder à la VM Azure

## Démarrer le projet localement

```bash
# Installer les dépendances
npm install

# Lancer les tests unitaires
npm run test:unit

# Lancer les tests end-to-end
npm run test:e2e

# Lancer l'application
npm start
```
L'application sera accessible sur `http://localhost:8080`.

## Capture d'écran (À faire)
*(Ajoutez ici la capture d'écran de la VM Azure accessible sur l'IP publique comme demandé dans le TP)*
