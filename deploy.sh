#!/bin/bash

# Configuration
PROJECT_ID="portfolio-adetayo-v1"
SERVICE_NAME="portfolio"
REGION="us-central1" # You can change this to your preferred region
REPOSITORY="portfolio-repo"

echo "Using Project: $PROJECT_ID"

# 1. Enable necessary services (idempotent)
echo "Enabling services..."
gcloud services enable run.googleapis.com \
    artifactregistry.googleapis.com \
    cloudbuild.googleapis.com --project=$PROJECT_ID

# 2. Create Artifact Registry repository if it doesn't exist
echo "Checking for Artifact Registry repository..."
if ! gcloud artifacts repositories describe $REPOSITORY --project=$PROJECT_ID --location=$REGION > /dev/null 2>&1; then
    echo "Creating repository $REPOSITORY..."
    gcloud artifacts repositories create $REPOSITORY \
        --repository-format=docker \
        --location=$REGION \
        --description="Docker repository for portfolio site" \
        --project=$PROJECT_ID
fi

# 3. Build and Push using Cloud Build
# This avoids needing Docker installed locally
echo "Building and pushing image to Artifact Registry via Cloud Build..."
IMAGE_URL="$REGION-docker.pkg.dev/$PROJECT_ID/$REPOSITORY/$SERVICE_NAME"

gcloud builds submit --tag $IMAGE_URL --project=$PROJECT_ID

# 4. Deploy to Cloud Run
echo "Deploying to Cloud Run..."

# Load Spotify variables from .env
SPOTIFY_CLIENT_ID=$(grep '^SPOTIFY_CLIENT_ID=' .env | cut -d '=' -f2)
SPOTIFY_CLIENT_SECRET=$(grep '^SPOTIFY_CLIENT_SECRET=' .env | cut -d '=' -f2)
SPOTIFY_REFRESH_TOKEN=$(grep '^SPOTIFY_REFRESH_TOKEN=' .env | cut -d '=' -f2)

gcloud run deploy $SERVICE_NAME \
    --image $IMAGE_URL \
    --platform managed \
    --region $REGION \
    --allow-unauthenticated \
    --project=$PROJECT_ID \
    --set-env-vars "SPOTIFY_CLIENT_ID=$SPOTIFY_CLIENT_ID,SPOTIFY_CLIENT_SECRET=$SPOTIFY_CLIENT_SECRET,SPOTIFY_REFRESH_TOKEN=$SPOTIFY_REFRESH_TOKEN"

echo "Deployment complete! Your service is being updated..."
