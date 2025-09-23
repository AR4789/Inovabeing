output "cloud_run_url" {
  value = google_cloud_run_service.api.status[0].url
}

output "artifact_repo" {
  value = google_artifact_registry_repository.repo.repository_id
}
