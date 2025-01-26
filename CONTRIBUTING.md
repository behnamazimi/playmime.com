# Contributing to Playmime

We love your input! We want to make contributing to Playmime as easy and transparent as possible.

## Development Setup

1. Fork the repo
2. Clone your fork:
   ```bash
   git clone https://github.com/behnamazimi/playmime.com.git
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Create a branch for your changes:
   ```bash
   git checkout -b feature/your-feature-name
   ```

## Code Style

- We use ESLint for code style, you can validate your code using:
  ```bash
  npm run lint
  ```
- Add comments for complex logic
- Use meaningful variable and function names

## Making Changes

1. Make your changes
2. Write tests if applicable
3. Commit your changes using a descriptive commit message
4. Push to your fork
5. Submit a Pull Request

## Pull Request Process

1. Ensure your PR description clearly describes the problem and solution
2. Make sure all tests pass and linting is clean
3. Wait for review from maintainers

## Specific Contribution Guides

### Adding New Words to Existing Languages

The words are stored in `/data/words/{language}/{version}/words.txt`. Each language directory contains categories defined in separate sections, marked by `# category` headers. Words must be listed one per line under their respective category.

File format example:
```
# animals
dog
cat
elephant

# food
pizza
apple
bread
```

All submitted words must be commonly understood. Before submitting, run the `npm run validate-words` script. This script checks for:
- Proper category headers
- Duplicate entries
- Special character validation

Your pull request will automatically run these validations in CI/CD as well.

### Adding a New Language

To add a new language to Playmime, follow these steps:

1. **Add UI Translation File**
   - Create a new UI translation file at `/public/locales/{language-code}.json` by duplicating the existing English file and translating the strings.

2. **Update i18n Configurations**
   - Update `/src/i18n/config.ts` by adding the new language accordingly.

3. **Create a New Words File**
   - Use the ISO 639-1 language code (e.g., `fr` for French).
   - Create the directory and file structure: `/data/words/{language-code}/v1/words.txt`.
   - Populate the file with categories (`# category`) and words (one per line):
     ```
     # animals
     dog
     cat

     # colors
     red
     blue
     ```
     - Update the `LANGUAGE_CATEGORIES` object in the `/scripts/validateWords.mjs` with the new language’s categories.
     - Validate the words file by running the following command:
       ```bash
       npm run validate-words
       ```

### Fixing Bugs
1. Check if bug is already reported in Issues
2. Provide in your PR:
   - Bug description
   - Steps to reproduce
   - Solution explanation
   - Related tests
3. Follow existing code style
4. Update documentation if needed

### Implementing New Features
1. Start with a Discussion post
2. After approval:
   - Create a technical proposal
   - Consider backwards compatibility
   - Plan for i18n support
   - Include necessary tests
3. Keep PR focused on single feature
