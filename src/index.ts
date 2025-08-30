// =============================================================================
// PYTHON PORTAL TYPES - PRODUCTION GRADE TYPE DEFINITIONS
// Industry-standard TypeScript types for loosely coupled microservice architecture
// =============================================================================

// =============================================================================
// CORE DOMAIN TYPES
// =============================================================================

/**
 * Exercise definition with complete metadata
 * Used across all services for consistent exercise representation
 */
export interface Exercise {
  /** Unique exercise identifier (UUID v4) */
  id: string;
  /** Human-readable exercise title */
  title: string;
  /** Brief description of what the exercise teaches */
  description: string;
  /** Detailed instructions in Markdown format */
  instructions: string;
  /** Initial code provided to students */
  starterCode: string;
  /** Test code to validate solutions */
  testCode: string;
  /** Reference solution (for hints/solutions) */
  solutionCode: string;
  /** Difficulty classification */
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  /** Learning topics covered */
  topics: string[];
  /** Display order for curriculum */
  order: number;
  /** Estimated completion time in minutes */
  estimatedTime: number;
  /** File path to exercise content */
  filePath?: string;
  /** Category grouping for exercises */
  category?: string;
}

/**
 * Test execution results with detailed feedback
 * Used by executor service and frontend for displaying results
 */
export interface TestResult {
  /** Overall test pass/fail status */
  passed: boolean;
  /** Combined output from code execution */
  output: string;
  /** Error messages if execution failed */
  errors?: string;
  /** Total execution time in milliseconds */
  executionTime: number;
  /** Individual test case results */
  testCases: TestCase[];
  /** Memory usage during execution */
  memoryUsed?: number;
  /** Exit code from Python process */
  exitCode?: number;
}

/**
 * Individual test case result
 * Granular feedback for each assertion
 */
export interface TestCase {
  /** Test case name/description */
  name: string;
  /** Pass/fail status for this test */
  passed: boolean;
  /** Expected value (serialized) */
  expected?: unknown;
  /** Actual value received (serialized) */
  actual?: unknown;
  /** Error message if test failed */
  error?: string;
  /** Test execution time in milliseconds */
  executionTime?: number;
}

/**
 * User progress tracking
 * Persisted by backend service, displayed by frontend
 */
export interface UserProgress {
  /** User identifier */
  userId: string;
  /** Exercise identifier */
  exerciseId: string;
  /** Completion status */
  completed: boolean;
  /** Number of submission attempts */
  attempts: number;
  /** Best working solution (if completed) */
  bestSolution?: string;
  /** Completion timestamp */
  completedAt?: Date;
  /** Total time spent on exercise (seconds) */
  timeSpent: number;
  /** Progress percentage (0-100) */
  progressPercent?: number;
  /** Hints used during attempts */
  hintsUsed?: number;
}

/**
 * User profile and statistics
 * Managed by backend service
 */
export interface User {
  /** Unique user identifier */
  id: string;
  /** Username (unique) */
  username: string;
  /** Email address (optional) */
  email?: string;
  /** Account creation timestamp */
  createdAt: Date;
  /** Total exercises completed */
  totalExercisesCompleted: number;
  /** Total time spent learning (seconds) */
  totalTimeSpent: number;
  /** Current daily streak */
  currentStreak: number;
  /** Longest streak achieved */
  longestStreak: number;
  /** User preferences */
  preferences?: UserPreferences;
}

/**
 * User preferences and settings
 */
export interface UserPreferences {
  /** Editor theme preference */
  theme: 'light' | 'dark';
  /** Editor font size */
  fontSize: number;
  /** Enable/disable hints */
  hintsEnabled: boolean;
  /** Notification preferences */
  notifications: boolean;
  /** Preferred difficulty level */
  preferredDifficulty?: 'beginner' | 'intermediate' | 'advanced';
}

/**
 * Learning session tracking
 * Used for analytics and progress insights
 */
export interface Session {
  /** Session identifier */
  id: string;
  /** User identifier */
  userId: string;
  /** Session start time */
  startTime: Date;
  /** Session end time (if ended) */
  endTime?: Date;
  /** Exercises worked on during session */
  exercisesWorkedOn: string[];
  /** Total session duration (seconds) */
  totalTimeSpent: number;
  /** Session outcome metrics */
  exercisesCompleted?: number;
  /** Device/browser information */
  userAgent?: string;
}

/**
 * Contextual hints for exercises
 * Managed by exercises service
 */
export interface Hint {
  /** Hint identifier */
  id: string;
  /** Associated exercise ID */
  exerciseId: string;
  /** Hint title */
  title: string;
  /** Hint content (Markdown supported) */
  content: string;
  /** Display order */
  order: number;
  /** Hint complexity level (1=basic, 5=solution) */
  revealLevel: number;
  /** Prerequisites before showing hint */
  prerequisites?: string[];
}

// =============================================================================
// EXECUTION & API TYPES
// =============================================================================

/**
 * Python code execution request
 * Used by frontend to request code execution from executor service
 */
export interface CodeExecution {
  /** Python code to execute */
  code: string;
  /** Exercise context identifier */
  exerciseId: string;
  /** Whether to run test cases */
  runTests: boolean;
  /** Optional test code override */
  testCode?: string;
  /** Execution timeout in milliseconds */
  timeout?: number;
  /** Memory limit in MB */
  memoryLimit?: number;
}

/**
 * Python code execution response
 * Returned by executor service
 */
export interface CodeExecutionResult {
  /** Execution success status */
  success: boolean;
  /** Standard output from execution */
  output: string;
  /** Error output if execution failed */
  errors?: string;
  /** Test results if tests were run */
  testResult?: TestResult;
  /** Total execution time in milliseconds */
  executionTime: number;
  /** Memory used during execution (bytes) */
  memoryUsed?: number;
  /** Security violations detected */
  securityViolations?: string[];
  /** Execution environment info */
  environment?: {
    pythonVersion: string;
    platform: string;
    containerized: boolean;
  };
}

/**
 * Standard API response wrapper
 * Used consistently across all service APIs
 */
export interface APIResponse<T = unknown> {
  /** Request success status */
  success: boolean;
  /** Response data payload */
  data?: T;
  /** Error details if request failed */
  error?: string;
  /** Human-readable message */
  message?: string;
  /** Request timestamp */
  timestamp?: string;
  /** Request correlation ID */
  correlationId?: string;
  /** API version */
  version?: string;
}

/**
 * Paginated response wrapper
 * For endpoints returning large datasets
 */
export interface PaginatedResponse<T> extends APIResponse<T[]> {
  /** Pagination metadata */
  pagination: {
    /** Current page number (1-based) */
    page: number;
    /** Items per page */
    limit: number;
    /** Total number of items */
    total: number;
    /** Total number of pages */
    totalPages: number;
    /** Has previous page */
    hasPrevious: boolean;
    /** Has next page */
    hasNext: boolean;
  };
}

// =============================================================================
// FRONTEND-SPECIFIC TYPES
// =============================================================================

/**
 * Global UI state management
 * Used by React state management (Zustand)
 */
export interface UIState {
  /** Currently loaded exercise */
  currentExercise: Exercise | null;
  /** Current user code in editor */
  userCode: string;
  /** Code execution status */
  isRunning: boolean;
  /** Solution visibility toggle */
  showSolution: boolean;
  /** Hints panel visibility */
  showHints: boolean;
  /** Latest test execution results */
  testResults: TestResult | null;
  /** Sidebar open/closed state */
  sidebarOpen: boolean;
  /** Current UI theme */
  theme: 'light' | 'dark';
  /** Loading states */
  loading: {
    exercises: boolean;
    execution: boolean;
    progress: boolean;
  };
  /** Error states */
  errors: {
    general?: string;
    execution?: string;
    network?: string;
  };
}

/**
 * Monaco editor configuration
 * Used by code editor component
 */
export interface EditorSettings {
  /** Font size in pixels */
  fontSize: number;
  /** Monaco theme name */
  theme: string;
  /** Word wrap mode */
  wordWrap: 'on' | 'off' | 'wordWrapColumn' | 'bounded';
  /** Show/hide minimap */
  minimap: boolean;
  /** Auto-save enabled */
  autoSave: boolean;
  /** Tab size */
  tabSize: number;
  /** Insert spaces for tabs */
  insertSpaces: boolean;
  /** Show line numbers */
  lineNumbers: 'on' | 'off' | 'relative' | 'interval';
  /** Enable/disable suggestions */
  quickSuggestions: boolean;
}

/**
 * Terminal component interface
 * Used by embedded Python terminal
 */
export interface TerminalRef {
  /** Add output to terminal */
  addOutput: (output: string, type?: 'stdout' | 'stderr' | 'info') => void;
  /** Add error message to terminal */
  addError: (error: string) => void;
  /** Clear terminal content */
  clear: () => void;
  /** Set execution running state */
  setRunning: (running: boolean) => void;
  /** Focus terminal input */
  focus: () => void;
  /** Get terminal history */
  getHistory: () => string[];
}

/**
 * Python concept for dictionary/reference
 * Used by dictionary component
 */
export interface Concept {
  /** Concept identifier */
  id: string;
  /** Concept name */
  name: string;
  /** Category classification */
  category: 'function' | 'operator' | 'keyword' | 'data-type' | 'method' | 'concept';
  /** Detailed description */
  description: string;
  /** Simple usage example */
  simpleExample: string;
  /** Syntax pattern */
  syntax?: string;
  /** Parameter descriptions */
  parameters?: string[];
  /** Related concepts */
  relatedConcepts?: string[];
  /** Difficulty level */
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
  /** External documentation links */
  externalLinks?: Array<{
    title: string;
    url: string;
    type: 'official' | 'tutorial' | 'reference';
  }>;
}

// =============================================================================
// DATABASE TYPES (Backend-specific)
// =============================================================================

/**
 * Database user record
 * SQLite/Prisma compatible schema
 */
export interface DatabaseUser {
  id: string;
  username: string;
  email: string | null;
  created_at: string;
  updated_at: string;
  last_login?: string | null;
  preferences?: string; // JSON serialized UserPreferences
}

/**
 * Database progress record
 * SQLite/Prisma compatible schema
 */
export interface DatabaseProgress {
  id: string;
  user_id: string;
  exercise_id: string;
  completed: boolean;
  attempts: number;
  best_solution: string | null;
  completed_at: string | null;
  time_spent: number;
  hints_used: number;
  created_at: string;
  updated_at: string;
}

/**
 * Database session record
 * SQLite/Prisma compatible schema
 */
export interface DatabaseSession {
  id: string;
  user_id: string;
  start_time: string;
  end_time: string | null;
  exercises_worked_on: string; // JSON array
  total_time_spent: number;
  exercises_completed: number;
  user_agent: string | null;
  created_at: string;
}

// =============================================================================
// EXERCISE METADATA TYPES
// =============================================================================

/**
 * Exercise metadata structure
 * Used by exercises service for content management
 */
export interface ExerciseMetadata {
  /** Difficulty classification */
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  /** Learning topics/tags */
  topics: string[];
  /** Estimated completion time (minutes) */
  estimatedTime: number;
  /** Curriculum order */
  order: number;
  /** Exercise category */
  category: string;
  /** Prerequisites (other exercise IDs) */
  prerequisites?: string[];
  /** Learning objectives */
  objectives?: string[];
  /** External resources */
  resources?: Array<{
    title: string;
    url: string;
    type: 'video' | 'article' | 'documentation';
  }>;
}

/**
 * Exercise content structure
 * File-based content organization
 */
export interface ExerciseContent {
  /** Exercise metadata */
  metadata: ExerciseMetadata;
  /** Instruction content (Markdown) */
  instructions: string;
  /** Starter code template */
  starter: string;
  /** Test cases */
  tests: string;
  /** Reference solution */
  solution: string;
  /** Associated hints */
  hints?: Hint[];
}

// =============================================================================
// ERROR TYPES & EXCEPTIONS
// =============================================================================

/**
 * Base application error
 * Used for consistent error handling across services
 */
export class AppError extends Error {
  constructor(
    message: string,
    public statusCode: number = 500,
    public code?: string,
    public details?: Record<string, unknown>
  ) {
    super(message);
    this.name = 'AppError';
    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Input validation error
 * Used for request validation failures
 */
export class ValidationError extends AppError {
  constructor(
    message: string,
    public field?: string,
    public validationErrors?: Record<string, string[]>
  ) {
    super(message, 400, 'VALIDATION_ERROR');
    this.name = 'ValidationError';
  }
}

/**
 * Code execution error
 * Used by executor service for execution failures
 */
export class ExecutionError extends AppError {
  constructor(
    message: string,
    public originalError?: Error,
    public executionDetails?: {
      timeout?: boolean;
      memoryLimit?: boolean;
      securityViolation?: boolean;
    }
  ) {
    super(message, 500, 'EXECUTION_ERROR');
    this.name = 'ExecutionError';
  }
}

/**
 * Authentication/authorization error
 * Used for security-related failures
 */
export class AuthError extends AppError {
  constructor(message: string = 'Authentication required') {
    super(message, 401, 'AUTH_ERROR');
    this.name = 'AuthError';
  }
}

/**
 * Resource not found error
 * Used for 404 scenarios
 */
export class NotFoundError extends AppError {
  constructor(resource: string, id?: string) {
    const message = id ? `${resource} with id '${id}' not found` : `${resource} not found`;
    super(message, 404, 'NOT_FOUND');
    this.name = 'NotFoundError';
  }
}

// =============================================================================
// TYPE GUARDS & UTILITIES
// =============================================================================

/**
 * Type guard for Exercise interface
 */
export function isExercise(obj: unknown): obj is Exercise {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    'id' in obj &&
    'title' in obj &&
    'starterCode' in obj &&
    typeof (obj as Exercise).id === 'string' &&
    typeof (obj as Exercise).title === 'string'
  );
}

/**
 * Type guard for TestResult interface
 */
export function isTestResult(obj: unknown): obj is TestResult {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    'passed' in obj &&
    'output' in obj &&
    'testCases' in obj &&
    typeof (obj as TestResult).passed === 'boolean' &&
    Array.isArray((obj as TestResult).testCases)
  );
}

/**
 * Type guard for APIResponse interface
 */
export function isAPIResponse<T>(obj: unknown): obj is APIResponse<T> {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    'success' in obj &&
    typeof (obj as APIResponse).success === 'boolean'
  );
}

/**
 * Type guard for CodeExecutionResult interface
 */
export function isCodeExecutionResult(obj: unknown): obj is CodeExecutionResult {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    'success' in obj &&
    'output' in obj &&
    'executionTime' in obj &&
    typeof (obj as CodeExecutionResult).success === 'boolean'
  );
}

// =============================================================================
// CONSTANTS & ENUMS
// =============================================================================

/** Available difficulty levels */
export const DIFFICULTY_LEVELS = ['beginner', 'intermediate', 'advanced'] as const;

/** Available UI themes */
export const THEMES = ['light', 'dark'] as const;

/** Concept categories for dictionary */
export const CONCEPT_CATEGORIES = [
  'function',
  'operator', 
  'keyword',
  'data-type',
  'method',
  'concept'
] as const;

/** HTTP status codes */
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  INTERNAL_SERVER_ERROR: 500,
  SERVICE_UNAVAILABLE: 503
} as const;

/** API response codes */
export const API_CODES = {
  SUCCESS: 'SUCCESS',
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  EXECUTION_ERROR: 'EXECUTION_ERROR',
  AUTH_ERROR: 'AUTH_ERROR',
  NOT_FOUND: 'NOT_FOUND',
  INTERNAL_ERROR: 'INTERNAL_ERROR'
} as const;

/** Exercise execution limits */
export const EXECUTION_LIMITS = {
  TIMEOUT_MS: 10000, // 10 seconds
  MEMORY_LIMIT_MB: 128, // 128 MB
  MAX_OUTPUT_LENGTH: 10000, // 10K characters
  MAX_CODE_LENGTH: 50000 // 50K characters
} as const;

// =============================================================================
// DERIVED TYPES
// =============================================================================

/** Union type for difficulty levels */
export type DifficultyLevel = typeof DIFFICULTY_LEVELS[number];

/** Union type for UI themes */
export type Theme = typeof THEMES[number];

/** Union type for concept categories */
export type ConceptCategory = typeof CONCEPT_CATEGORIES[number];

/** Union type for API response codes */
export type APICode = typeof API_CODES[keyof typeof API_CODES];

/** Union type for HTTP status codes */
export type HTTPStatus = typeof HTTP_STATUS[keyof typeof HTTP_STATUS];

/** Exercise summary for lists/previews */
export type ExerciseSummary = Pick<
  Exercise,
  'id' | 'title' | 'description' | 'difficulty' | 'estimatedTime' | 'order'
>;

/** User public profile (excludes sensitive data) */
export type UserProfile = Omit<User, 'email' | 'preferences'>;

/** Progress summary for dashboard */
export type ProgressSummary = Pick<
  UserProgress,
  'exerciseId' | 'completed' | 'attempts' | 'timeSpent' | 'completedAt'
>;

// =============================================================================
// VERSION & METADATA
// =============================================================================

/** Package version information */
export const VERSION = '1.0.0';

/** Type definitions metadata */
export const TYPE_METADATA = {
  version: VERSION,
  generatedAt: new Date().toISOString(),
  compatibleWith: {
    node: '>=18.0.0',
    typescript: '>=5.0.0'
  },
  services: [
    'python-portal-frontend',
    'python-portal-backend', 
    'python-portal-executor',
    'python-portal-exercises'
  ]
} as const;

// =============================================================================
// DEFAULT EXPORT
// =============================================================================

export default {
  VERSION,
  TYPE_METADATA,
  DIFFICULTY_LEVELS,
  THEMES,
  CONCEPT_CATEGORIES,
  HTTP_STATUS,
  API_CODES,
  EXECUTION_LIMITS
};