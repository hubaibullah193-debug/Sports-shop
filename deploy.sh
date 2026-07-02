#!/bin/bash

# Elite Sports Store - Production Deployment Script
# Usage: ./deploy.sh [environment]

set -e

ENVIRONMENT=${1:-staging}
REGION=${2:-us-east-1}

echo "🚀 Deploying Elite Sports Store to $ENVIRONMENT in $REGION"

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# 1. Pre-deployment checks
echo -e "${BLUE}📋 Running pre-deployment checks...${NC}"

if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed"
    exit 1
fi

if ! command -v git &> /dev/null; then
    echo "❌ Git is not installed"
    exit 1
fi

# 2. Build preparation
echo -e "${BLUE}🔨 Building application...${NC}"

npm run build

# 3. Security checks
echo -e "${BLUE}🔐 Running security checks...${NC}"

npm audit --audit-level=moderate || true

# 4. Docker build
echo -e "${BLUE}🐳 Building Docker images...${NC}"

docker-compose -f docker-compose.yml build

# 5. Database migrations
echo -e "${BLUE}📊 Preparing database...${NC}"

cd apps/api
npx prisma migrate deploy
cd ../..

# 6. Deployment
echo -e "${BLUE}📤 Starting deployment...${NC}"

case $ENVIRONMENT in
  staging)
    echo "Deploying to staging..."
    docker-compose -f docker-compose.yml -f docker-compose.staging.yml up -d
    ;;
  production)
    echo "Deploying to production..."
    docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d
    ;;
  *)
    echo "Unknown environment: $ENVIRONMENT"
    exit 1
    ;;
esac

# 7. Health checks
echo -e "${BLUE}🏥 Running health checks...${NC}"

sleep 5

if curl -f http://localhost:5000/health > /dev/null; then
    echo -e "${GREEN}✅ API is healthy${NC}"
else
    echo -e "${YELLOW}⚠️  API health check failed${NC}"
fi

if curl -f http://localhost:3000 > /dev/null; then
    echo -e "${GREEN}✅ Frontend is healthy${NC}"
else
    echo -e "${YELLOW}⚠️  Frontend health check failed${NC}"
fi

# 8. Deployment complete
echo -e "${GREEN}✨ Deployment complete!${NC}"
echo ""
echo "Services:"
echo "  Frontend: http://localhost:3000"
echo "  API: http://localhost:5000"
echo "  Database: localhost:5432"
echo ""
echo "View logs: docker-compose logs -f"
echo "Stop services: docker-compose down"
