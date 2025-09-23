resource "google_sql_database_instance" "postgres" {
  name             = var.db_instance_name
  database_version = "POSTGRES_15"
  region           = var.region

  settings {
    tier = "db-f1-micro"

    ip_configuration {
      ipv4_enabled = true
    }
  }
}

resource "google_sql_database" "db" {
  name     = "inovadb"
  instance = google_sql_database_instance.postgres.name
}

resource "google_sql_user" "default" {
  name     = "inova_user"
  instance = google_sql_database_instance.postgres.name
  password = var.db_password
}
