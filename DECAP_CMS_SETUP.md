# Decap CMS Setup Guide for Rebecca Nwose Photography

## ✅ What's Been Set Up

1. **Admin Panel**: Located at `/admin/index.html`
2. **Configuration**: Content structure defined in `/admin/config.yml`
3. **Identity Widget**: Added to the main site for authentication

## 🚀 Deployment Steps

### Step 1: Deploy to Netlify

You need to host your site on Netlify (it's free!) to use Decap CMS.

1. **Go to Netlify**: https://www.netlify.com/
2. **Sign up** with your GitHub account
3. **New site from Git**:
   - Choose GitHub
   - Select the `Rebecca` repository
   - Build settings:
     - Build command: `npm run build` (or leave empty)
     - Publish directory: `.` (root)
   - Click **Deploy site**

### Step 2: Enable Netlify Identity

1. In your Netlify site dashboard, go to **Settings** → **Identity**
2. Click **Enable Identity**
3. Under **Registration preferences**, select **Invite only** (recommended)
4. Under **External providers**, optionally enable GitHub/Google login
5. Under **Services** → **Git Gateway**, click **Enable Git Gateway**

### Step 3: Invite Yourself as Admin

1. Go to **Identity** tab in Netlify dashboard
2. Click **Invite users**
3. Enter your email address
4. Check your email and accept the invitation
5. Set your password

### Step 4: Access the CMS

1. Go to your site URL: `https://your-site-name.netlify.app/admin/`
2. Log in with your credentials
3. You can now manage content!

## 📋 What You Can Manage

### ✅ Portfolio Galleries
- **Beauty Portfolio**: Add/edit/delete beauty photoshoots
- **Portrait Portfolio**: Manage portrait sessions
- **Family Portfolio**: Family photoshoot management
- **Wedding Portfolio**: Wedding photography
- **Maternity Portfolio**: Maternity sessions

For each portfolio:
- Upload multiple images
- Add client names
- Write descriptions
- Set alt text for SEO

### ✅ About Page
- Update your story
- Change introduction text
- Modify call-to-action
- Replace about image

### ✅ Contact Information
- Update email and phone
- Change social media links

## 🎯 How to Use the CMS

### Adding a New Portfolio Session

1. Log in to `/admin/`
2. Click on the portfolio category (e.g., "Beauty Portfolio")
3. Click **New Beauty Portfolio**
4. Fill in:
   - Client Name
   - Description (optional)
   - Upload images (click "Choose an image")
   - Add alt text for each image
5. Click **Save** (saves as draft) or **Publish** (goes live)

### Editing Existing Content

1. Navigate to the collection
2. Click on the item you want to edit
3. Make your changes
4. Click **Publish** to update

### Managing Images

- **Upload**: Click "Choose an image" in any image field
- **Replace**: Click existing image, then "Remove" and upload new one
- **Organize**: Drag and drop to reorder images in galleries

## 🔐 Security Notes

- **Only invited users** can access `/admin/`
- Changes are committed directly to your GitHub repository
- Every change is version-controlled (you can undo!)
- Use **Invite only** registration to prevent unauthorized access

## 🛠️ Current Limitations

The CMS manages content metadata, but you'll still need to:
1. Run the `generate-gallery.js` script after adding images
2. Update HTML files with the generated gallery code
3. Rebuild the site if needed

## 🔄 Workflow After Adding Images via CMS

1. **Upload images** through CMS
2. **SSH into your server** or pull changes locally:
   ```bash
   git pull origin main
   ```
3. **Generate gallery HTML**:
   ```bash
   node generate-gallery.js Beauty  # or Portrait, Family, etc.
   ```
4. **Copy generated HTML** to the appropriate portfolio HTML file
5. **Commit and push** changes

## 🚀 Future Enhancements

Consider adding:
- **Automated gallery generation**: Script that runs on commit
- **Preview functionality**: See changes before publishing
- **Editorial workflow**: Draft → Review → Publish workflow
- **Custom widgets**: Build custom image gallery widget

## 📞 Support

For Decap CMS documentation: https://decapcms.org/docs/

For Netlify Identity help: https://docs.netlify.com/visitor-access/identity/

---

**Setup Date**: November 10, 2025
**CMS Version**: Decap CMS 3.0
