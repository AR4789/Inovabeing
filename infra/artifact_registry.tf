resource "google_artifact_registry_repository" "repo" {
  provider = google
  location = var.region
  repository_id = var.artifact_repo
  format = "DOCKER"
  description = "Docker repo for inovabeing assignment"
}
