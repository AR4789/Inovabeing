terraform {
  backend "gcs" {
    bucket  = "inovabeing-terraform-state"   # Your bucket name
    prefix  = "terraform/state"              # Path inside the bucket
  }
}
