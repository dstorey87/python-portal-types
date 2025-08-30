# @python-portal/types

> **Production-grade TypeScript type definitions for Python Portal ecosystem**

[![npm version](https://badge.fury.io/js/%40python-portal%2Ftypes.svg)](https://badge.fury.io/js/%40python-portal%2Ftypes)
[![TypeScript](https://badges.frapsoft.com/typescript/version/typescript-next.svg?v=101)](https://github.com/ellerbrock/typescript-badges/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## 🎯 Overview

This package provides comprehensive TypeScript type definitions for the Python Portal learning platform. It serves as the **single source of truth** for type safety across all microservices in the loosely coupled architecture.

## 🏗️ Architecture

```mermaid
graph TD
    A[@python-portal/types] --> B[python-portal-frontend]
    A --> C[python-portal-backend]
    A --> D[python-portal-executor]
    A --> E[python-portal-exercises]
```

## 📦 Installation

```bash
npm install @python-portal/types
# or
yarn add @python-portal/types
```

## 🚀 Usage

### Basic Import

```typescript
import { 
  Exercise, 
  CodeExecutionResult, 
  APIResponse,
  UserProgress 
} from '@python-portal/types';
```

### Type Guards

```typescript
import { isExercise, isAPIResponse } from '@python-portal/types';

// Type-safe runtime validation
if (isExercise(data)) {
  // data is now typed as Exercise
  console.log(data.title);
}
```

### Error Handling

```typescript
import { ValidationError, ExecutionError } from '@python-portal/types';

try {
  // Some operation
} catch (error) {
  if (error instanceof ValidationError) {
    console.error('Validation failed:', error.field);
  }
}
```

## 📚 Core Types

### Exercise Management
- `Exercise` - Complete exercise definition
- `ExerciseMetadata` - Exercise metadata and classification
- `ExerciseContent` - File-based content structure
- `Hint` - Contextual learning hints

### Code Execution
- `CodeExecution` - Python execution request
- `CodeExecutionResult` - Execution response with results
- `TestResult` - Test case execution results
- `TestCase` - Individual test validation

### User Management
- `User` - User profile and statistics
- `UserProgress` - Exercise progress tracking
- `UserPreferences` - User settings and preferences
- `Session` - Learning session analytics

### API Communication
- `APIResponse<T>` - Standard API response wrapper
- `PaginatedResponse<T>` - Paginated dataset responses
- `AppError` - Base error class with context
- `ValidationError` - Input validation failures

### Frontend State
- `UIState` - Global UI state management
- `EditorSettings` - Monaco editor configuration
- `TerminalRef` - Terminal component interface

## 🔧 Development

### Build

```bash
npm run build      # Compile TypeScript
npm run dev        # Watch mode
npm run clean      # Clean dist folder
```

### Quality Assurance

```bash
npm run lint       # ESLint validation
npm run type-check # TypeScript validation
npm test           # Run all validations
```

## 🎯 Design Principles

### 1. **Type Safety First**
```typescript
// Strict type checking enabled
"strict": true,
"noImplicitAny": true,
"noUncheckedIndexedAccess": true
```

### 2. **Runtime Validation**
```typescript
// Type guards for runtime safety
export function isExercise(obj: unknown): obj is Exercise {
  return typeof obj === 'object' && /* validation logic */;
}
```

### 3. **Error Context**
```typescript
// Rich error information
export class ValidationError extends AppError {
  constructor(
    message: string,
    public field?: string,
    public validationErrors?: Record<string, string[]>
  ) { /* ... */ }
}
```

### 4. **API Consistency**
```typescript
// Standardized response format
export interface APIResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  timestamp?: string;
  correlationId?: string;
}
```

## 📋 Quality Standards

- ✅ **100% TypeScript strict mode**
- ✅ **Zero ESLint errors/warnings**
- ✅ **Complete TSDoc documentation**
- ✅ **Runtime type validation**
- ✅ **Semantic versioning**
- ✅ **Automated quality checks**

## 🔗 Related Packages

| Package | Purpose | Dependencies |
|---------|---------|-------------|
| [@python-portal/exercises](https://github.com/dstorey87/python-portal-exercises) | Exercise content management | `@python-portal/types` |
| [python-portal-backend](https://github.com/dstorey87/python-portal-backend) | Express.js API server | `@python-portal/types` |
| [python-portal-frontend](https://github.com/dstorey87/python-portal-frontend) | React application | `@python-portal/types` |
| [python-portal-executor](https://github.com/dstorey87/python-portal-executor) | Python execution service | `@python-portal/types` |

## 📄 License

MIT © [dstorey87](https://github.com/dstorey87)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes with tests
4. Run quality checks: `npm test`
5. Submit a pull request

## 📞 Support

- 🐛 [Issues](https://github.com/dstorey87/python-portal-types/issues)
- 💬 [Discussions](https://github.com/dstorey87/python-portal-types/discussions)
- 📧 Email: darren@pythonportal.dev

---

**Built with ❤️ for the Python learning community**