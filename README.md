# Rundro Apps Website

A portfolio website showcasing Rundro Apps, built with vanilla HTML, CSS, and JavaScript, and hosted on GitHub Pages with a custom domain.

## 🌐 Website Overview

This is a static website that displays information about various apps developed by Rundro. The site features:

- **App Gallery**: Grid layout showcasing all available apps
- **App Details Modals**: Click any app card to view detailed information, features, and screenshots
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Screenshot Carousels**: Interactive image galleries for each app

**Live Site**: [https://rundro.io](https://rundro.io)

## 🏗️ Architecture

### GitHub Pages

This repository is configured as a GitHub Pages site:

- **Repository Name**: `rundro.github.io` (special naming convention for GitHub Pages)
- **Branch**: `main` (serves as the source for GitHub Pages)
- **Hosting**: Automatically hosted at `https://rundro.github.io` by GitHub
- **Custom Domain**: Points to `rundro.io` via DNS configuration

### How GitHub Pages Works

1. **Automatic Deployment**: Any push to the `main` branch automatically triggers a rebuild and deployment
2. **Build Process**: GitHub Pages serves static files directly (no build step needed)
3. **HTTPS**: GitHub automatically provisions SSL certificates for custom domains
4. **CDN**: Content is served via GitHub's global CDN for fast loading times

### CNAME File

The `CNAME` file in the repository root tells GitHub Pages which custom domain to use:

```
rundro.io
```

**Important Notes:**
- The CNAME file must contain only the domain name (no `http://` or `https://`)
- Only one domain per repository
- The file must be in the root directory
- GitHub will automatically redirect `www.rundro.io` to `rundro.io` if configured

### Cloudflare DNS Configuration

The domain `rundro.io` is managed through Cloudflare. Here's how it's configured:

#### DNS Records

**For apex domain (rundro.io):**
- **Type**: `A` records
- **Name**: `@` (or blank/root)
- **IPv4 addresses** (4 records required for redundancy):
  - `185.199.108.153`
  - `185.199.109.153`
  - `185.199.110.153`
  - `185.199.111.153`
- **Proxy status**: Can be proxied (orange cloud) or DNS only (gray cloud)

**For www subdomain (optional):**
- **Type**: `CNAME`
- **Name**: `www`
- **Target**: `rundro.github.io`
- **Proxy status**: Same as apex domain

#### Cloudflare Settings

1. **SSL/TLS Mode**: Set to "Full" or "Full (strict)" to ensure HTTPS works properly
2. **Always Use HTTPS**: Enable redirect from HTTP to HTTPS
3. **Automatic HTTPS Rewrites**: Recommended to enable
4. **Minimum TLS Version**: 1.2 or higher

#### DNS Propagation

- Changes typically propagate within minutes when using Cloudflare
- GitHub may take 24-48 hours to verify the domain and provision SSL
- Check domain status in GitHub: Settings → Pages → Custom domain

## 📁 Project Structure

```
rundro.github.io/
├── index.html              # Main homepage
├── privacy.html            # Privacy policy page
├── CNAME                   # Custom domain configuration
├── app-ads.txt            # App store ads configuration
├── README.md              # This file
│
├── PocketCapital/         # Pocket Capital app
│   ├── app-details.html   # App details modal content
│   ├── icon.png          # App icon
│   └── *.png             # Screenshots
│
├── DuckyRace/            # Ducky Race app
│   ├── app-details.html
│   ├── duck.png
│   └── screenshot*.png
│
├── FireTvRemote/         # Fire TV Remote app
│   ├── app-details.html
│   ├── remote_icon.png
│   └── screenshot*.png
│
└── templates/            # Template files
    └── app-details-template.html
```

## 🚀 How to Update the Website

### Adding a New App

1. **Create app directory**:
   ```bash
   mkdir NewAppName
   ```

2. **Add app assets**:
   - Place app icon in the directory (e.g., `icon.png`)
   - Add screenshots (e.g., `screenshot1.png`, `screenshot2.png`, etc.)

3. **Create app details page**:
   - Copy `templates/app-details-template.html` to `NewAppName/app-details.html`
   - Fill in app information:
     - App name and description
     - Icon path
     - Feature cards (4 recommended)
     - Screenshot carousel slides
     - Link to app (App Store, GitHub, or website)

4. **Add app card to homepage**:
   - Open `index.html`
   - Find the `.apps-grid` section (around line 561)
   - Add a new app card:
     ```html
     <div class="app-card" onclick="openAppModal('app-id')">
       <div class="app-card-image">
         <img src="NewAppName/icon.png" alt="App Name Icon" />
       </div>
       <div class="app-card-content">
         <span class="category">Category</span>
         <h3>App Name</h3>
         <p>Brief description</p>
       </div>
     </div>
     ```

5. **Update JavaScript**:
   - Find the `openAppModal()` function (around line 648)
   - Add a new condition:
     ```javascript
     } else if (appId === "app-id") {
       fetch(`NewAppName/app-details.html`)
         .then((response) => response.text())
         .then((html) => {
           modalContent.innerHTML = html;
           initCarousel();
         })
         .catch((error) => {
           console.error("Error loading app details:", error);
           modalContent.innerHTML =
             "<p>Error loading app details. Please try again later.</p>";
         });
     }
     ```

6. **Commit and push**:
   ```bash
   git add .
   git commit -m "Add NewAppName app"
   git push origin main
   ```

### Updating Existing App

1. **Update app details**:
   - Edit `AppName/app-details.html`
   - Modify description, features, or screenshots

2. **Update app card**:
   - Edit the app card in `index.html` if needed

3. **Add/remove screenshots**:
   - Add new screenshot files to the app directory
   - Update the carousel in `app-details.html`:
     ```html
     <div class="carousel-slide">
       <img src="AppName/screenshot3.png" alt="Screenshot Description" />
     </div>
     ```

4. **Commit and push**:
   ```bash
   git add .
   git commit -m "Update AppName: add new screenshots"
   git push origin main
   ```

### Updating Homepage Content

1. **Edit `index.html`**:
   - Update company header, navigation, or contact information
   - Modify styles in the `<style>` section
   - Update footer content

2. **Test locally**:
   - Open `index.html` in a browser
   - Test all app modals and navigation

3. **Commit and push**:
   ```bash
   git add index.html
   git commit -m "Update homepage content"
   git push origin main
   ```

## 🔧 Local Development

### Viewing the Site Locally

1. **Simple HTTP server** (Python):
   ```bash
   python3 -m http.server 8000
   ```
   Then visit: `http://localhost:8000`

2. **Node.js HTTP server**:
   ```bash
   npx http-server -p 8000
   ```

3. **VS Code Live Server**:
   - Install "Live Server" extension
   - Right-click `index.html` → "Open with Live Server"

**Note**: Some features (like fetching app details) may require a local server due to CORS restrictions when opening files directly.

### Testing Before Deploying

1. Test all app modals open correctly
2. Verify all images load
3. Check responsive design on different screen sizes
4. Test navigation and links
5. Verify carousel functionality

## 🌍 Deployment

### Automatic Deployment

GitHub Pages automatically deploys when you push to `main`:

```bash
git add .
git commit -m "Your commit message"
git push origin main
```

Deployment typically completes in 1-2 minutes. Check status at:
- GitHub repository → Actions tab
- Repository Settings → Pages

### Manual Deployment Check

1. Visit `https://rundro.io` after pushing
2. Hard refresh (Ctrl+Shift+R or Cmd+Shift+R) to clear cache
3. Verify changes are live

## 🔐 Domain Management

### Updating CNAME

If you need to change the custom domain:

1. Edit `CNAME` file:
   ```
   newdomain.com
   ```

2. Update Cloudflare DNS records to point to new domain

3. Update GitHub Pages settings:
   - Repository → Settings → Pages
   - Update Custom domain field

4. Wait for DNS propagation (24-48 hours)

### Troubleshooting Domain Issues

**Domain not working:**
- Check CNAME file exists and contains correct domain
- Verify DNS records in Cloudflare
- Check GitHub Pages settings for domain verification
- Ensure SSL certificate is provisioned (may take 24-48 hours)

**HTTPS not working:**
- Verify Cloudflare SSL/TLS mode is "Full" or "Full (strict)"
- Check GitHub Pages shows green checkmark for domain
- Wait for SSL certificate provisioning

**DNS propagation:**
- Use `dig rundro.io` or `nslookup rundro.io` to check DNS
- Clear DNS cache: `sudo dscacheutil -flushcache` (macOS)
- Check Cloudflare DNS propagation status

## 📝 Best Practices

1. **Commit messages**: Use clear, descriptive commit messages
2. **Image optimization**: Compress images before committing (use tools like ImageOptim or TinyPNG)
3. **Testing**: Always test locally before pushing
4. **Backup**: Keep backups of important changes
5. **Version control**: Use meaningful branch names for major changes

## 🐛 Troubleshooting

### Images not loading
- Check file paths are correct (case-sensitive)
- Verify images are committed to repository
- Check file extensions match exactly

### Modal not opening
- Verify JavaScript `appId` matches the `onclick` handler
- Check browser console for errors
- Ensure `app-details.html` exists in correct directory

### Carousel not working
- Verify `initCarousel()` is called after modal content loads
- Check screenshot paths are correct
- Ensure carousel HTML structure matches template

### Changes not appearing
- Hard refresh browser (Ctrl+Shift+R)
- Check GitHub Pages deployment status
- Verify you pushed to `main` branch
- Wait a few minutes for CDN cache to clear

## 📚 Resources

- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [Cloudflare DNS Documentation](https://developers.cloudflare.com/dns/)
- [Custom Domain Setup Guide](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site)

## 📧 Support

For issues or questions about this website:
- Check GitHub repository issues
- Review GitHub Pages status page
- Contact: rundroapps@gmail.com

---

**Last Updated**: 2025-01-27

