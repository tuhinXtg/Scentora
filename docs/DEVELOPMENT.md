# Development Guide

## Project Structure

The project should keep a clear separation between frontend and backend.

Expected top-level layout:

```text
scentora/
docs/
frontend/
backend/
tests/
docker/
.gitignore
README.md
docker-compose.yml
```

## Backend Foundation

- FastAPI application setup
- Project structure
- Environment variables
- PostgreSQL configuration
- SQLAlchemy configuration
- Alembic migrations
- Database session management
- Base models
- API versioning
- Configuration system
- Centralized error handling
- Logging
- Health-check endpoint
- API documentation

## Testing

- Backend unit tests
- API tests
- Authentication tests
- Authorization tests
- Database tests
- Validation tests
- Order workflow tests
- Payment workflow tests
- Frontend component tests
- Form tests
- State management tests
- User-flow tests

## Security

- Secure password hashing
- Secure authentication
- Authorization checks
- Input validation
- SQL injection prevention
- XSS protection
- CSRF considerations
- Rate limiting
- Secure cookies where applicable
- CORS configuration
- Environment secret management
- File upload validation
- API abuse protection
- Safe error responses
- Audit logging for sensitive admin actions

## Deployment

- Production environment configuration
- Dockerization
- Database deployment
- Backend deployment
- Frontend deployment
- Image storage
- Domain configuration
- HTTPS
- Environment secrets
- Database migrations
- Logging
- Monitoring
- Error tracking
- CI/CD pipeline

