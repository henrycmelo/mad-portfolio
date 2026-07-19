# Madeline's Portfolio Website

A modern, professional portfolio website built with Next.js, Chakra UI, and Supabase. Features a powerful admin CMS for easy content management without touching code.

## Features

- ✨ Single-page application with smooth scrolling sections
- 🎨 Fully tokenized design system (Professional Blues & Teals palette)
- 📝 Rich text editor (TipTap - free & open source)
- 🖼️ Image upload and management via Supabase Storage
- 🔒 Secure authentication for admin access
- 📊 Stats showcase to highlight metrics and achievements
- 💼 Projects gallery with custom metrics
- 📅 Work history timeline (supports 5-7 positions)
- 📱 Fully responsive design
- 🚀 Deployed on Netlify

## Tech Stack

- **Framework:** Next.js 15 (App Router, TypeScript)
- **UI Library:** Chakra UI v3
- **Backend:** Supabase (PostgreSQL database, authentication, storage)
- **Rich Text Editor:** TipTap (MIT licensed, completely free)
- **Deployment:** Netlify
- **Icons:** React Icons

## Getting Started

### Prerequisites

- Node.js 20+ installed
- A Supabase account ([sign up free](https://supabase.com))
- A Netlify account ([sign up free](https://netlify.com))

### 1. Clone and Install

\`\`\`bash
cd madeline-portfolio
npm install
\`\`\`

### 2. Set Up Supabase

1. Create a new project in [Supabase Dashboard](https://app.supabase.com)
2. Go to **Project Settings** → **API** and copy:
   - Project URL
   - `anon` public key
   - `service_role` secret key

3. Run the database migration:
   - Go to **SQL Editor** in Supabase Dashboard
   - Copy the contents of `supabase/migrations/001_initial_schema.sql`
   - Paste and run it

4. Create the storage bucket:
   - Go to **Storage** in Supabase Dashboard
   - Create a new bucket named `portfolio-images`
   - Make it **public**

5. Create admin user:
   - Go to **Authentication** → **Users**
   - Click **Add User**
   - Enter Madeline's email and password
   - Copy the email address

### 3. Configure Environment Variables

Create a `.env.local` file in the project root:

\`\`\`bash
cp .env.example .env.local
\`\`\`

Edit `.env.local` with your Supabase credentials:

\`\`\`
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
ADMIN_EMAIL=madeline@example.com
\`\`\`

### 4. Run Development Server

\`\`\`bash
npm run dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) in your browser.

- **Public site:** http://localhost:3000
- **Admin CMS:** http://localhost:3000/admin/login

## Project Structure

\`\`\`
madeline-portfolio/
├── app/
│   ├── admin/              # Admin CMS pages
│   ├── api/                # API routes (image upload, auth)
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Main SPA with all sections
│   └── providers.tsx       # Chakra UI provider
├── components/
│   ├── sections/           # Public section components
│   ├── ui/                 # Reusable UI components
│   └── layout/             # Layout components (Nav, Footer)
├── lib/
│   ├── supabase/           # Supabase client utilities
│   ├── types/              # TypeScript interfaces
│   └── hooks/              # Custom React hooks
├── theme/
│   ├── tokens/             # Design tokens (colors, spacing, typography)
│   ├── components/         # Component style overrides
│   └── index.ts            # Main theme configuration
├── public/
│   ├── images/             # Static images
│   └── uploads/            # User-uploaded images
└── supabase/
    └── migrations/         # Database schema migrations
\`\`\`

## Using the Admin CMS

### Logging In

1. Navigate to `/admin/login`
2. Enter your Supabase user email and password
3. Click "Sign In"

### Editing Content

The admin dashboard has tabs for each section:

- **Hero:** Update landing page title, subtitle, background image, profile photo
- **About:** Edit bio (rich text), upload profile image, manage skills
- **Stats:** Add/remove/reorder metrics with custom icons
- **Projects:** Create project cards with images, descriptions, tech tags, and metrics
- **Work History:** Manage timeline entries with dates, achievements, and skills
- **Contact:** Update contact information and social media links

### Uploading Images

1. Click the image upload area or drag & drop
2. Select an image file (JPG, PNG, WebP)
3. Image will automatically upload to Supabase Storage
4. Click "Save" to persist changes

### Rich Text Editing

The rich text editor supports:
- **Bold**, *italic*, underline
- Headings (H1-H6)
- Bullet and numbered lists
- Links
- Images

## Deployment to Netlify

### 1. Push to GitHub

\`\`\`bash
git init
git add .
git commit -m "Initial commit"
git remote add origin <your-github-repo>
git push -u origin main
\`\`\`

### 2. Deploy to Netlify

1. Log in to [Netlify](https://netlify.com)
2. Click "Add new site" → "Import an existing project"
3. Connect your GitHub repository
4. Configure build settings:
   - **Build command:** `npm run build`
   - **Publish directory:** `.next`
5. Add environment variables (same as `.env.local`)
6. Click "Deploy site"

### 3. Configure Custom Domain (Optional)

1. Go to **Domain settings** in Netlify
2. Add your custom domain
3. Update DNS records as instructed

## Design System

The portfolio uses a fully tokenized design system:

### Color Palette

- **Primary (Navy):** `brand.primary.900` (#1A365D)
- **Secondary (Teal):** `brand.secondary.500` (#319795)
- **Accent (Light Blue):** `brand.accent.500` (#4299E1)

### Typography

- **Font:** Inter (Google Fonts)
- **Sizes:** xs (12px) to 7xl (72px)
- **Weights:** normal (400) to extrabold (800)

### Spacing

All spacing uses an 8px grid system with semantic tokens:
- `section.*` - Large spacing between sections
- `content.*` - Spacing within content

## Troubleshooting

### Build Errors

\`\`\`bash
# Clear cache and rebuild
rm -rf .next node_modules
npm install
npm run build
\`\`\`

### Supabase Connection Issues

- Verify environment variables are correct
- Check Supabase project is not paused
- Ensure RLS policies are enabled

### Image Upload Not Working

- Verify `portfolio-images` bucket exists and is public
- Check SUPABASE_SERVICE_ROLE_KEY is set correctly

## License

MIT

## Support

For questions or issues, contact [your email here]

---

Built with ❤️ using Next.js, Chakra UI, and Supabase
