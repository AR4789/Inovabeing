output "cloud_run_url" {
  value = google_cloud_run_service.api.status[0].url
}

output "artifact_repo" {
  value = google_artifact_registry_repository.repo.repository_id
}

output "web_url" {
  description = "The URL of the frontend Cloud Run service"
  value       = google_cloud_run_service.web.status[0].url
}

