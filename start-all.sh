#!/bin/bash

# NeerSetu Start Script
# This script starts all NeerSetu services using Docker Compose

set -e

echo "🚀 Starting NeerSetu - Smart Community Health Monitoring System"
echo "=================================================================="

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed. Please install Docker and try again."
    exit 1
fi

# Check if Docker Compose is installed
if ! command -v docker-compose &> /dev/null && ! docker compose version &> /dev/null; then
    echo "❌ Docker Compose is not installed. Please install Docker Compose and try again."
    exit 1
fi

print_status "Starting all services with Docker Compose..."
docker-compose up -d

print_success "NeerSetu services are starting up!"
echo ""
echo "🌐 Access Points:"
echo "   Admin Dashboard: http://localhost:3000"
echo "   Backend API: http://localhost:5000"
echo "   ML Service: http://localhost:8000"
echo "   Alerts Service: http://localhost:5001"
echo ""
echo "📱 For mobile app:"
echo "   cd mobile-app && npm start"
echo ""
print_status "Use 'docker-compose logs -f' to view logs"
print_status "Use 'docker-compose down' to stop all services"