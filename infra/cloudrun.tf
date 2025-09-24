resource "google_service_account" "run_sa" {
  account_id   = "run-inova-sa"
  display_name = "Cloud Run service account for Inova"
}

resource "google_project_iam_member" "sa_cloudsql" {
  project = var.project_id
  role    = "roles/cloudsql.client"
  member  = "serviceAccount:${google_service_account.run_sa.email}"
}
resource "google_project_iam_member" "sa_secret_accessor" {
  project = var.project_id
  role    = "roles/secretmanager.secretAccessor"
  member  = "serviceAccount:${google_service_account.run_sa.email}"
}

resource "google_cloud_run_service" "api" {
  name     = "inova-api"
  location = var.region

  template {
    spec {
      service_account_name = google_service_account.run_sa.email
      containers {
        image = "${var.region}-docker.pkg.dev/${var.project_id}/${var.artifact_repo}/inova-api:${var.image_tag}"

        env {
          name  = "DATABASE_URL"
          value = "postgresql://inova_user:${var.db_password}@/inovadb?host=/cloudsql/${google_sql_database_instance.postgres.connection_name}"
        }

         env {
          name  = "JWT_SECRET"
          value = var.jwt_secret   # pass this in terraform.tfvars or GitHub Secrets
        }

        env {
          name  = "API_KEY"
          value = var.webhook_api_key
        }

        ports { container_port = 4000 }
      }

    }
    metadata {
      annotations = {
        "run.googleapis.com/cloudsql-instances" = google_sql_database_instance.postgres.connection_name
      }
    }
  }

  autogenerate_revision_name = true
}

resource "google_cloud_run_service" "web" {
  name     = "inova-web"
  location = var.region

  template {
    spec {
      containers {
        image = var.web_image_tag
        ports {
          container_port = 80
        }
      }
    }
  }

  traffic {
    percent         = 100
    latest_revision = true
  }
}

