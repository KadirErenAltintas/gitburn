# Changelog

All notable changes to GitBurn will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2026-03-31

### Added

- **Initial Release** 🎉
- GitHub API integration for real-time commit analysis
- Burnout risk scoring system (0-100)
- Four personality classifications (Hustle Mode, Balanced Builder, Chaotic Coder, Burnout Risk)
- Emoji-rich output formatting
- Twitter/X sharing functionality
- Copy-to-clipboard feature
- Result caching (1-hour TTL)
- Comprehensive error handling and validation
- CLI tool for command-line analysis
- Web application with dark theme
- Responsive design for mobile and desktop
- MIT License
- Complete documentation and guides

### Features

- Analyzes GitHub commit history (last 90 days)
- Detects late-night coding patterns
- Identifies weekend work activity
- Calculates rest day gaps
- Measures daily commit frequency
- Generates personality classification
- Provides actionable insights
- Includes humorous "Roast Mode"

### Technical

- Built with React 19 + Tailwind CSS 4
- Express backend with TypeScript
- GitHub API integration
- Real-time analysis (no data storage)
- Modular component architecture
- Type-safe with full TypeScript support

---

## [Unreleased]

### Planned Features

- **Team Analytics**: Analyze multiple developers and compare burnout scores
- **Historical Tracking**: Store optional user consent data to track burnout trends over time
- **Advanced Metrics**: Language/framework-specific analysis
- **Browser Extensions**: Chrome and Firefox extensions
- **Mobile Apps**: Native iOS and Android applications
- **Integrations**: Discord, Slack, GitHub Actions
- **Leaderboard**: Community burnout rankings (opt-in)
- **API Rate Limit Handling**: Better support for high-volume analysis
- **Internationalization**: Multi-language support
- **Dark/Light Theme Toggle**: User preference settings

### Under Consideration

- Machine learning for improved burnout prediction
- Correlation analysis with productivity metrics
- Burnout recovery recommendations
- Mental health resource integration
- Team wellness reports

---

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines on how to contribute to GitBurn.

## License

This project is licensed under the MIT License - see [LICENSE](LICENSE) file for details.
