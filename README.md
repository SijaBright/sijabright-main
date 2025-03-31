# SIJA BRIGHT - Official Website

The official website for the SIJA B Class, Batch 36 of SMK Negeri 2 Depok (STEMBAYO).

![SIJA BRIGHT Logo](/public/assets/images/sijabright-white.webp)

## 🚀 Overview

SIJA BRIGHT is a modern, responsive website built with Next.js that showcases the projects, achievements, and members of the SIJA B Class. The site features interactive 3D elements, smooth animations, and a comprehensive content structure designed to highlight student work and community activities.

## ✨ Features

- **Interactive 3D Hero Section** - Engaging card carousel with interactive animations built using Three.js
- **Responsive Design** - Fully responsive layout optimized for all devices
- **Multi-Section Homepage** - Dynamic sections including About, Gallery, Blog, Projects, Achievements, Members, and more
- **Custom Navigation** - Smooth scrolling with active section highlighting
- **Section History** - Preserves browsing state when returning from other pages
- **Subpages** - Dedicated pages for Community, Games, Links, and Toolkit
- **Contact Form** - User-friendly contact interface with feedback
- **Custom Scrollbar** - Enhanced scrolling experience with themed scrollbar
- **SEO Optimized** - Comprehensive metadata configuration for better search engine visibility

## 🛠️ Technologies

- **Frontend Framework**: [Next.js 15](https://nextjs.org/)
- **React**: [React 19](https://react.dev/)
- **3D Rendering**: [Three.js](https://threejs.org/)
- **Animations**: [GSAP](https://greensock.com/gsap/) & [@tweenjs/tween.js](https://github.com/tweenjs/tween.js/)
- **UI Components**: [Lucide React](https://lucide.dev/guide/packages/lucide-react)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Font**: [Geist](https://vercel.com/font) & [Poppins](https://fonts.google.com/specimen/Poppins)

## 🚦 Getting Started

First, clone the repository:

```bash
git clone https://github.com/SijaBright/sijabright-main.git
cd sijabright-main
```

Install the dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 🧩 Project Structure

```
src/
├── app/            # Next.js app directory with page components
├── components/     # Reusable UI components
│   ├── home/       # Home page specific components
│   └── shared/     # Shared components (Nav, Footer, etc.)
├── hooks/          # Custom React hooks
└── styles/         # Global styles
public/
├── assets/         # Static assets (images, etc.)
└── favicon.ico     # Site favicon
```

## 📝 Available Pages

- **Home** (`/`) - Main landing page with all sections
- **Community** (`/community`) - Community forums and discussion boards
- **Games** (`/games`) - Fun games created by team members
- **Links** (`/links`) - Collection of helpful resources
- **Toolkit** (`/toolkit`) - Essential tools and resources for development
- **Blog** (`/blog`) - Articles and updates from team members
- **Projects** (`/projects`) - Showcase of projects created by the class

## 📌 Version History

### v0.1.5

- Add Instagram link to member modal and update member data
- Fix issues in all members section
- Add blog and projects pages with navigation and placeholder content
- Add project showcase section with dynamic project cards and navigation link

### v0.1.4

- Add carousel component for improved image and content presentation
- Implement modal component for detailed member information display
- Add comprehensive data structure for all members section
- Enhance member profiles with additional details and interactive elements
- Improve user experience with smooth transitions between member information

### v0.1.3

- Add custom scrollbar styles for improved aesthetics and usability
- Implement dynamic page content and section history management; add metadata generation
- Add Community, Games, Links, Toolkit pages and BackToHomeButton component
- Add useFooterNavigation hook and enhance Footer component for improved navigation
- Refactor Others component to display dynamic links with images and descriptions

### v0.1.2

- Update Footer button size for improved accessibility and responsiveness
- Add new favicon and app icons; update metadata for SEO and social sharing
- Add Footer component and integrate it into the Home page layout

### v0.1.1

- Enhance global styles with Poppins font, new animations, and improved responsive design
- Add custom hook useNavigation for managing navigation state and scroll behavior
- Add new components: Footer, Description, Blog, Projects, Gallery, and AllMember for enhanced home page layout
- Add Poppins font and restructure Home page layout with new sections
- Add new image assets: sijabright-white.webp and update favicon.ico
- Add new dependencies: @tweenjs/tween.js, gsap, lucide-react, and three

### v0.1.0

- Add global styles and update layout import path
- Initial commit from Create Next App

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Contributors

- SIJA B Class - Batch 36 Students

## 📞 Contact

For any inquiries or suggestions, please contact us at:

- Email: abim@rejaka.me
- Phone: +62 821-4188-4664
