# Contributing to MedAssist AI

Thank you for your interest in contributing to MedAssist AI! This document provides guidelines for contributing to the project.

## Code of Conduct

- Be respectful and inclusive
- Focus on constructive feedback
- Help others learn and grow
- Report inappropriate behavior to maintainers

## How to Contribute

### 1. Reporting Bugs

**Before creating a bug report:**
- Check if the bug already exists in Issues
- Verify the bug exists in the latest code
- Gather information about your environment

**Include in bug report:**
```markdown
## Description
Brief description of the bug

## Steps to Reproduce
1. Step 1
2. Step 2

## Expected Behavior
What you expected to happen

## Actual Behavior
What actually happened

## Environment
- OS: Windows 10
- Node.js: 14.x
- Browser: Chrome 90
```

### 2. Suggesting Enhancements

**Include in enhancement:**
```markdown
## Description
Brief description of the enhancement

## Motivation
Why would this be useful?

## Proposed Solution
How should it work?

## Additional Context
Any other information
```

### 3. Making Code Changes

**Fork and clone:**
```bash
git clone https://github.com/your-username/MedAssist-AI.git
cd MedAssist-AI
```

**Create feature branch:**
```bash
git checkout -b feature/short-description
```

**Make changes following standards:**
- Read [Code Standards](./DEVELOPMENT.md#code-standards)
- Write clear, self-documenting code
- Add comments for complex logic
- Update relevant documentation

**Test your changes:**
```bash
# Backend tests (if applicable)
cd backend
npm test

# Frontend tests (if applicable)
cd frontend
npm test

# Manual testing
npm run dev  # in each directory
```

**Commit with clear messages:**
```bash
git commit -m "feat: add new feature

- Brief description of changes
- Additional context if needed"
```

**Types of commits:**
- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `style:` - Formatting, missing semicolons, etc.
- `refactor:` - Code restructuring without changing behavior
- `test:` - Adding or updating tests
- `chore:` - Dependency updates, configuration changes

### 4. Submitting Pull Request

**Before creating PR:**
- Rebase with `main` branch
- Ensure all tests pass
- Update documentation
- Check for code style issues

**Create pull request:**
```markdown
## Description
What does this PR do?

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Related Issues
Closes #123

## Testing
How did you test this?

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] No new warnings generated
- [ ] Tests added/updated
- [ ] Tests pass locally
```

## Development Setup

For detailed setup instructions, see [Development Guide](./DEVELOPMENT.md#development-setup)

```bash
# Clone and setup
git clone <your-fork>
cd MedAssist-AI

# Backend
cd backend
npm install
cp .env.example .env

# Frontend
cd frontend
npm install
cp .env.example .env.local

# Run in separate terminals
cd backend && npm run dev
cd frontend && npm start
```

## Coding Standards

### General Principles
- Write code for humans to read first
- Keep functions small and focused
- Use meaningful variable names
- Document complex logic
- Avoid code duplication

### JavaScript/React Standards
- Use ES6+ features
- Follow [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript)
- Use camelCase for variables/functions
- Use PascalCase for classes/components
- Add JSDoc comments for functions

### Example Function
```javascript
/**
 * Validates a medical query for safety and length
 * @param {string} query - The query to validate
 * @returns {{valid: boolean, message: string}} Validation result
 */
function validateMedicalQuery(query) {
  if (!query || typeof query !== 'string') {
    return { valid: false, message: 'Query must be a string' };
  }
  
  if (query.length < 3) {
    return { valid: false, message: 'Query too short' };
  }
  
  return { valid: true, message: 'Query valid' };
}
```

## Project Structure

See [Project Structure Documentation](./PROJECT_STRUCTURE.md) for detailed folder layout.

Key directories:
- `backend/src` - Backend server code
- `frontend/src` - Frontend React code
- Documentation files - .md files in root

## Running Tests

```bash
# Backend
cd backend
npm test

# Frontend
cd frontend
npm test

# All tests
npm run test:all
```

## Documentation

When contributing, update relevant documentation:

1. **Code comments** - Explain the "why"
2. **README.md** - Major features or breaking changes
3. **DEVELOPMENT.md** - Development processes
4. **PROJECT_STRUCTURE.md** - New folders/modules
5. **JSDoc** - Function documentation

## Review Process

1. **Automated checks** - Lint, tests, build
2. **Code review** - At least one approval
3. **Feedback** - Address comments and suggestions
4. **Approval** - Maintainer reviews and approves
5. **Merge** - Your code is merged to main

## Questions?

- Check [Development Guide](./DEVELOPMENT.md)
- Check [README](./README.md)
- Check [Project Structure](./PROJECT_STRUCTURE.md)
- Open an Issue for questions

## Recognition

Contributors will be recognized in:
- GitHub repository acknowledgments
- Release notes for major contributions
- Author credits in modified files

## License

By contributing, you agree that your contributions will be licensed under the same license as the project (MIT License).

---

Happy Contributing! 🎉
