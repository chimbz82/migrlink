provider "aws" {
  region = "eu-west-2" # London
}

# Example Terraform for MigraLink infrastructure

resource "aws_s3_bucket" "migralink_docs" {
  bucket = "migralink-compliance-docs"
  # Standard security settings
}

# In an actual deployment, you'd specify Cloudflare R2 configurations
# and Neon database instances here.
