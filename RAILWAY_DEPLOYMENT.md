# Railway Deployment Guide

This guide explains how to deploy the Premium Calculator to Railway.

## Automatic Deployment (Recommended)

Railway supports automatic deployments from GitHub. Follow these steps:

### 1. Connect GitHub Repository

1. Go to [Railway Dashboard](https://railway.app)
2. Click "New Project"
3. Select "Deploy from GitHub repo"
4. Authorize Railway to access your GitHub account
5. Select the `premium-calculator` repository
6. Click "Deploy"

### 2. Configure Environment

Railway will automatically detect the project type and build configuration from:
- `package.json` (build and start scripts)
- `Procfile` (process types)
- `railway.json` (build configuration)

### 3. Deployment Settings

The following settings are already configured:

**Build Command:**
```bash
pnpm build
```

**Start Command:**
```bash
pnpm start
```

**Port:** 3000 (automatically exposed)

### 4. Monitor Deployment

1. Watch the deployment logs in the Railway dashboard
2. Once deployment is complete, you'll receive a public URL
3. Your calculator will be live at the provided URL

## Manual Deployment

If you prefer manual deployment:

```bash
# Install Railway CLI
npm install -g @railway/cli

# Login to Railway
railway login

# Create new project
railway init

# Deploy
railway up
```

## Environment Variables

No environment variables are required for the calculator to run. However, you can optionally set:

- `NODE_ENV=production` (automatically set by Railway)
- `PORT=3000` (automatically set by Railway)

## Troubleshooting

### Build Fails

If the build fails, check:
1. All dependencies are in `package.json`
2. Node version is compatible (18+)
3. pnpm version is correct

### App Won't Start

If the app won't start:
1. Check that `pnpm start` command works locally
2. Verify `server/index.ts` is correctly configured
3. Check Railway logs for error messages

### Port Issues

Railway automatically assigns a port. The app listens on `process.env.PORT || 3000`.

## Performance Tips

1. **Enable Caching:** Railway caches dependencies by default
2. **Optimize Bundle:** The build process already optimizes with Vite
3. **Monitor Usage:** Use Railway dashboard to monitor CPU and memory

## Custom Domain

To add a custom domain:

1. In Railway dashboard, go to your project
2. Click "Settings"
3. Add custom domain under "Domains"
4. Update DNS records with provided CNAME

## Scaling

For production use:

1. Upgrade to Railway's paid plan for more resources
2. Enable auto-scaling if needed
3. Monitor performance metrics in dashboard

## Support

For Railway-specific issues, visit:
- [Railway Documentation](https://docs.railway.app)
- [Railway Discord Community](https://discord.gg/railway)

---

**Deployment Status:** Ready for Railway ✅

Your calculator is configured and ready to deploy to Railway!
