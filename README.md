# InovaBeing — Assignment (Full-Stack) - Git-ready starter repo

This repository contains a complete starter project for the InovaBeing Full-Stack assignment:
- Backend: Node.js + Express + Postgres
- Frontend: Next.js + Tailwind
- Infra: Terraform for GCP (Cloud SQL, Artifact Registry, Secret Manager, Cloud Run)
- CI/CD: GitHub Actions workflow (build and deploy)


> **IMPORTANT**: This starter is meant to be a working scaffold. Before deploying to GCP, create a GCP project, a Service Account JSON and add credentials/secrets to GitHub. See `infra/README.md` for details.


## Application Url
https://inova-web-zdfnnfsjza-uc.a.run.app


## Repo layout
```
inovabeing-assignment/
├─ api/
├─ web/
├─ infra/
├─ .github/
└─ README.md
```

## Quick local dev

### Backend
1. Install dependencies:
```bash
cd api
npm install
```
2. Create local Postgres (Docker recommended) and run SQL:
```bash
# Example with docker postgres:
docker run --name inovadb -e POSTGRES_PASSWORD=password -e POSTGRES_USER=postgres -e POSTGRES_DB=inovadb -p 5432:5432 -d postgres:15

# Then run the init SQL:
psql postgresql://postgres:password@localhost:5432/inovadb -f api/sql/init.sql
```
3. Copy `.env.example` to `.env` and edit.
4. Start:
```bash
cd api
node src/index.js
```

### Frontend
```bash
cd web
npm install
# set NEXT_PUBLIC_API_URL to http://localhost:8080/api
npm run dev
```

### Terraform / GCP
See `infra/README.md` for step-by-step instructions before running Terraform.

## What's included
- Minimal but complete backend with auth, campaigns, leads, webhook.
- Next.js frontend with pages for auth, campaigns, campaign details, dashboard stub, webhook settings.
- Terraform snippets for GCP resources (adjust variables).
- GitHub Actions CI workflow skeleton that builds and pushes Docker images and runs Terraform.

If you want, I can:
- Customize the README with exact Terraform variable values.
- Add a Docker Compose for local dev (Postgres + API).
- Walk through deploying to a real GCP project.

