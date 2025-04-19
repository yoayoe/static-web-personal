# Yoayoe Anifa - Personal Portfolio Website

This repository contains the source code for my personal portfolio website, showcasing my projects, skills, and professional experience as a Frontend Developer & UI/UX Designer.

## Features

- Responsive design that works on all devices
- Clean and modern UI with smooth animations
- Portfolio section to showcase projects
- Contact form for easy communication
- Optimized for performance and accessibility

## Technologies Used

- HTML5
- CSS3 (with custom variables for theming)
- JavaScript (vanilla)
- Font Awesome icons
- Google Fonts

## Getting Started

To run this website locally:

1. Clone the repository:
   ```bash
   git clone https://github.com/yoayoe/static-web-personal.git
   ```
2. Open the `index.html` file in your browser

## Deployment to Cloudflare Pages

### Prerequisites

- A [GitHub account](https://github.com/signup)
- A [Cloudflare account](https://dash.cloudflare.com/sign-up)
- Your website code pushed to a GitHub repository

### Step-by-Step Deployment Guide

1. **Login to Cloudflare Dashboard**
   - Go to [Cloudflare Dashboard](https://dash.cloudflare.com)
   - Sign in with your Cloudflare account credentials

2. **Access Cloudflare Pages**
   - From the dashboard sidebar, click on **Pages**
   - Click the **Create a project** button

3. **Connect to GitHub**
   - Select **Connect GitHub** as your Git provider
   - Authenticate with your GitHub account if prompted
   - Grant Cloudflare access to your repositories

4. **Select Your Repository**
   - From the list of repositories, find and select `static-web-personal` (or your repository name)
   - Click **Begin setup**

5. **Configure Build Settings**
   - For a simple static site like this one, use these settings:
     ```
     Production branch: main (or master)
     Build command: (leave empty)
     Build output directory: / (root directory)
     ```
   - Since this is a static HTML/CSS/JS website without a build step, you don't need a build command
   - The root directory contains all the files needed to serve the website

6. **Environmental Variables (Optional)**
   - You typically don't need any environment variables for a static site
   - Skip this section unless you have specific requirements

7. **Deploy Your Site**
   - Click **Save and Deploy**
   - Cloudflare will begin deploying your site
   - Wait for the deployment to complete (usually takes less than a minute for static sites)

8. **Access Your Deployed Site**
   - Once deployment is successful, Cloudflare will provide a unique URL (something like `https://your-project-name.pages.dev`)
   - Click on the link to view your live site

### Custom Domain Setup (Optional)

If you want to use your own domain instead of the default `.pages.dev` domain:

1. From your Cloudflare Pages project, click on **Custom domains**
2. Click **Set up a custom domain**
3. Enter your domain name (e.g., `yourname.com`)
4. Follow the verification steps:
   - If your domain is already on Cloudflare, it will be configured automatically
   - If not, you'll need to update your DNS records at your domain registrar

### Continuous Deployment

- Cloudflare Pages automatically sets up continuous deployment
- Any commits pushed to your main branch will trigger a new deployment
- You can view all deployments in the Cloudflare Pages dashboard

### Preview Deployments

Cloudflare also creates preview deployments for pull requests:

1. Create a new branch for your changes
2. Make your changes and push to GitHub
3. Create a pull request
4. Cloudflare will generate a unique preview URL for that pull request
5. You can share this URL to get feedback before merging to production

## License

MIT License - See LICENSE file for details

## Contact

For questions or collaborations, reach out to me at yoayoe@gmail.com