variable "project_id" {
  type = string
}

variable "region" {
  type    = string
  default = "us-central1"
}

variable "db_password" {
  type = string
}

variable "db_instance_name" {
  type    = string
  default = "inovadb-instance"
}

variable "artifact_repo" {
  type    = string
  default = "inovarepo"
}

variable "webhook_api_key" {
  type = string
}

variable "image_tag" {
  type    = string
  default = "latest"
}

variable "web_image_tag" {
  description = "Web Docker image tag"
  type        = string
  default = "latest"
}

variable "jwt_secret" {
  description = "JWT secret for signing tokens in the backend"
  type        = string
  sensitive   = true
}


