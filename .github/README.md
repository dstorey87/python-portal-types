# GitHub Actions CI/CD Pipeline

This directory contains the continuous integration and deployment workflows for the @python-portal/types package.

## Workflows

### `ci.yml` - Main CI/CD Pipeline
- **Quality Gates**: Zero-tolerance linting, type checking, and build validation
- **Security Scanning**: npm audit and license compliance checks  
- **Multi-version Testing**: Node.js 18.x and 20.x compatibility
- **Automated Publishing**: NPM release on main branch pushes

## Quality Standards
- ✅ Zero ESLint errors/warnings
- ✅ 100% TypeScript strict mode compliance
- ✅ Security audit passing (high-level vulnerabilities blocked)
- ✅ Build artifacts validation
- ✅ License compliance verification