# Apex Log Landing Page

A minimalist, crafted landing page for Apex Log - a fitness and fasting log app.

## Design Philosophy

- **Crafted**: Intentional, polished details
- **Calm**: Restrained, non-hype aesthetic
- **Modern**: Contemporary but timeless
- **Product-led**: App screenshots are the hero
- **Confident**: Clear, direct communication

## Tech Stack

- Pure HTML, CSS, and JavaScript
- No frameworks or build tools
- Static site ready for GitHub Pages

## Local Development

Simply open `index.html` in a web browser, or use a local server:

```bash
# Using Python
python -m http.server 8000

# Using Node.js (if you have http-server installed)
npx http-server
```

Then visit `http://localhost:8000` in your browser.

## GitHub Pages Deployment

### Option 1: GitHub Actions (Recommended)

1. Push your code to a GitHub repository
2. Go to Settings → Pages in your repository
3. Under "Source", select "GitHub Actions"
4. The workflow will automatically deploy on push to `main` branch

### Option 2: Manual Deployment

1. Push your code to a GitHub repository
2. Go to Settings → Pages in your repository
3. Under "Source", select the branch containing your files (usually `main`)
4. Select the `/ (root)` folder
5. Click Save

## File Structure

```
/
├── index.html          # Main landing page
├── privacy.html        # Privacy policy page
├── styles.css          # All styles
├── script.js           # Carousel and interactions
├── 404.html            # GitHub Pages routing fallback
└── .github/
    └── workflows/
        └── deploy.yml  # GitHub Actions deployment workflow
```

## Customization

### Screenshots

Replace the placeholder images in `index.html` with your actual app screenshots. The carousel expects vertical phone screenshots with a 9:16 aspect ratio.

### Form Endpoint

The email form submits to Formspree. To change the endpoint, update the `action` attribute in the form element in `index.html`.

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Chrome Mobile)
- Gracefully degrades without JavaScript

## License

© 2024 Apex Log. All rights reserved.
