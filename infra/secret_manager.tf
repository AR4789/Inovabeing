resource "google_secret_manager_secret" "webhook_key" {
  secret_id = "webhook-api-key"

  replication {
    user_managed {
      replicas {
        location = "us-central1"
      }
    }
  }
}

resource "google_secret_manager_secret_version" "webhook_key_ver" {
  secret = google_secret_manager_secret.webhook_key.id
  secret_data = var.webhook_api_key
}

resource "google_secret_manager_secret" "db_pass" {
  secret_id = "db-password"

  replication {
    user_managed {
      replicas {
        location = "us-central1"
      }
    }
  }
}

resource "google_secret_manager_secret_version" "db_pass_ver" {
  secret = google_secret_manager_secret.db_pass.id
  secret_data = var.db_password
}