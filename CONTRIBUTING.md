# Contributing to GitBurn

Thank you for your interest in contributing to GitBurn! We welcome contributions from developers of all skill levels. This guide will help you get started.

## Code of Conduct

Be respectful, inclusive, and supportive. We're building a community where everyone feels welcome to contribute.

## Getting Started

### 1. Fork and Clone

```bash
git clone https://github.com/yourusername/gitburn.git
cd gitburn
npm install
```

### 2. Create a Feature Branch

```bash
git checkout -b feature/your-feature-name
```

### 3. Make Your Changes

- Follow the existing code style
- Write clear, descriptive commit messages
- Test your changes locally

### 4. Submit a Pull Request

- Describe what your PR does
- Reference any related issues
- Include screenshots or demo output if applicable

## Development Guidelines

### Code Style

- Use TypeScript for type safety
- Follow ESLint rules
- Use meaningful variable names
- Add comments for complex logic

### Commit Messages

```
feat: Add new burnout signal detection
fix: Correct weekend activity calculation
docs: Update README with new features
refactor: Simplify score calculation logic
```

### Testing

Before submitting a PR:

```bash
npm run build
npm run check  # TypeScript check
```

## Areas for Contribution

### High Priority

- **Burnout Detection**: Improve algorithms for more accurate scoring
- **Performance**: Optimize API calls and caching
- **Error Handling**: Better error messages and recovery
- **Documentation**: Improve README and guides

### Medium Priority

- **UI/UX**: Enhance visual design and user experience
- **Accessibility**: Improve WCAG compliance
- **Internationalization**: Add language support
- **Testing**: Increase test coverage

### Low Priority

- **Browser Extensions**: Create Chrome/Firefox extensions
- **Mobile Apps**: Build native mobile applications
- **Integrations**: Connect with Discord, Slack, etc.
- **Analytics**: Track usage and insights

## Project Structure

```
gitburn/
├── client/          # React frontend
├── server/          # Express backend
├── src/             # CLI tool
└── docs/            # Documentation
```

## Common Tasks

### Adding a New Personality Type

1. Update `src/engine/burnoutEngine.ts`
2. Add classification logic
3. Update `client/src/lib/formatters.ts`
4. Add test cases

### Improving Burnout Calculation

1. Modify `src/engine/burnoutEngine.ts`
2. Adjust weights in scoring algorithm
3. Test with various GitHub users
4. Update README with new formula

### Fixing a Bug

1. Create an issue describing the bug
2. Create a branch: `git checkout -b fix/bug-description`
3. Fix the issue
4. Submit a PR with a clear description

## Questions?

- Check existing [GitHub Issues](https://github.com/yourusername/gitburn/issues)
- Start a [Discussion](https://github.com/yourusername/gitburn/discussions)
- Email: support@gitburn.dev

## License

By contributing to GitBurn, you agree that your contributions will be licensed under the MIT License.

---

**Happy coding! 🚀**
