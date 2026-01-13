# Troubleshooting GitHub Pages Deployment

## Error: "Get Pages site failed. Please verify that the repository has Pages enabled"

### Problem
The GitHub Actions workflow is trying to deploy, but GitHub Pages isn't enabled in your repository settings yet.

### Solution

1. **Go to your repository on GitHub**

2. **Click "Settings"** (in the top menu bar of your repository)

3. **Click "Pages"** (in the left sidebar under "Code and automation")

4. **Under "Source"**, you'll see options:
   - ❌ **Don't select "Deploy from a branch"**
   - ✅ **Select "GitHub Actions"** instead

5. **Click "Save"**

6. **Verify Pages is enabled:**
   - You should see a green checkmark or success message
   - The Pages URL should appear (e.g., `https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/`)

7. **Re-run the workflow:**
   - Go to the **Actions** tab
   - Click on the failed workflow run
   - Click **"Re-run all jobs"** button (top right)
   - OR just push a new commit to trigger it automatically

### After Enabling Pages

The workflow should now complete successfully. You can check:
- **Actions** tab: Should show a green checkmark
- **Settings → Pages**: Should show the deployment status
- Your site URL: Should be accessible

## Other Common Issues

### Workflow Still Fails After Enabling Pages

1. **Check repository permissions:**
   - Go to **Settings → Actions → General**
   - Under "Workflow permissions", ensure "Read and write permissions" is selected
   - Click "Save"

2. **Check if Pages environment exists:**
   - Go to **Settings → Environments**
   - You should see "github-pages" environment
   - If not, the workflow will create it on first run

### Site Shows 404 After Deployment

1. **Wait a few minutes** - DNS propagation can take time
2. **Check the deployment status** in Settings → Pages
3. **Verify the URL** - Make sure you're using the correct GitHub Pages URL format:
   - Project pages: `https://USERNAME.github.io/REPO_NAME/`
   - User pages: `https://USERNAME.github.io/`

### Images or Assets Not Loading

1. **Check file paths** - All paths should be relative (e.g., `screenshots/image.png`)
2. **Verify files are committed** - Check that all assets are in the repository
3. **Check file names** - GitHub is case-sensitive, ensure exact matches

### Form Not Working

1. **Check Formspree endpoint** - Verify the URL in `index.html` is correct
2. **Test locally first** - Make sure the form works in local development
3. **Check browser console** - Look for any JavaScript errors

## Still Having Issues?

1. Check the **Actions** tab for detailed error messages
2. Review the workflow logs for specific errors
3. Ensure all files are committed and pushed to the `main` branch
4. Verify the repository is public (or you have GitHub Pro for private repos with Pages)
