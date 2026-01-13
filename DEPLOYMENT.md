# Deployment Guide for Apex Log Landing Page

## Pre-Deployment Checklist

- [x] All static files are in place (HTML, CSS, JS)
- [x] Screenshots are added to `screenshots/` folder
- [x] Favicons are in `favicons/` folder
- [x] Privacy policy is complete
- [x] Form endpoint is configured (Formspree)
- [x] GitHub Actions workflow is set up
- [x] 404.html is in place for routing

## Deployment Steps

### 1. Initialize Git Repository (if not already done)

```bash
git init
git add .
git commit -m "Initial commit: Apex Log landing page"
```

### 2. Create GitHub Repository

1. Go to [GitHub](https://github.com/new)
2. Create a new repository (name it something like `apex-log-landing` or `apexlog`)
3. **Do NOT** initialize with README, .gitignore, or license (we already have these)

### 3. Push to GitHub

```bash
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git branch -M main
git push -u origin main
```

### 4. Enable GitHub Pages (IMPORTANT - Do this FIRST!)

**⚠️ You MUST enable GitHub Pages BEFORE the workflow can deploy successfully!**

1. Go to your repository on GitHub
2. Click **Settings** (top menu bar)
3. Click **Pages** (left sidebar)
4. Under **Source**, select **GitHub Actions** (NOT "Deploy from a branch")
5. Click **Save**
6. You should see a message that Pages is enabled

**After enabling Pages:**
- The workflow will automatically re-run, OR
- You can manually trigger it: Go to **Actions** tab → Select the failed workflow → Click **Re-run all jobs**

### 5. Verify Deployment

- Wait a few minutes for the workflow to complete
- Check the **Actions** tab in your repository to see deployment status
- Visit your site at: `https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/`

## Repository Settings

### For User/Organization Pages (username.github.io)

If your repository is named `YOUR_USERNAME.github.io`:
- The site will be available at `https://YOUR_USERNAME.github.io`
- The workflow will deploy automatically

### For Project Pages (custom repo name)

If your repository has a custom name:
- The site will be available at `https://YOUR_USERNAME.github.io/REPO_NAME`
- Make sure all internal links work with the base path

## Troubleshooting

### Workflow Fails

1. Check the **Actions** tab for error messages
2. Ensure GitHub Pages is enabled in repository settings
3. Verify the workflow file is in `.github/workflows/deploy.yml`

### Site Not Loading

1. Check if the deployment completed successfully
2. Wait a few minutes for DNS propagation
3. Clear browser cache
4. Check the repository's Pages settings

### Images Not Loading

1. Verify image paths are relative (e.g., `screenshots/screenshot-1.png`)
2. Check that images are committed to the repository
3. Ensure file names match exactly (case-sensitive)

## Post-Deployment

- [ ] Test the site on mobile devices
- [ ] Verify form submission works
- [ ] Check all links (privacy policy, etc.)
- [ ] Test carousel navigation
- [ ] Verify dark mode works correctly
- [ ] Check favicon appears in browser tab

## Custom Domain (Optional)

If you want to use a custom domain:

1. Add a `CNAME` file to the repository root with your domain
2. Configure DNS records with your domain provider
3. Update GitHub Pages settings with your custom domain

## Maintenance

- Updates are automatically deployed when you push to `main`
- No build step required - just push and deploy!
- All changes are version controlled via Git
