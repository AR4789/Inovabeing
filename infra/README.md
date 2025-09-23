# Infra (Terraform) - Notes

This folder contains Terraform snippets to create:
- Cloud SQL Postgres instance
- Artifact Registry repository
- Secret Manager secrets
- Cloud Run service

**Before using**
1. Create a GCP project and enable APIs:
   - Cloud Run
   - Cloud SQL Admin
   - Artifact Registry
   - Secret Manager
2. Create a Service Account with roles:
   - Cloud Run Admin
   - Service Account User
   - Cloud SQL Admin (or Cloud SQL Client + appropriate IAM)
   - Secret Manager Admin/Accessor
   - Artifact Registry Writer
   Save the JSON and add it as `GCP_SA_KEY` in GitHub Secrets for CI.

**Local test**
- Edit `terraform.tfvars` or pass variables via CLI.
