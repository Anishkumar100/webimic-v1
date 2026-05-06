import { Scan, Palette, Type, Layout, Move, Globe, FileText, Layers, Eye, PenTool, BarChart3, Zap, BookOpen, Users, Video, GraduationCap, Building2, Briefcase, Handshake, Calendar } from 'lucide-react';

export const navData = {
  products: {
    label: 'Products',
    columns: [
      {
        heading: 'Webimic Platform',
        headingLink: '/product/platform',
        items: [
          { icon: Scan, label: 'Site Analyzer', desc: 'Crawl and capture any public website', to: '/product/analyzer' },
          { icon: Palette, label: 'Design Tokens', desc: 'Extract colors, type, and spacing systems', to: '/product/tokens' },
          { icon: FileText, label: 'Doc Generator', desc: 'Generate rich PDF specs with screenshots', to: '/product/docs' },
          { icon: PenTool, label: 'Redesign Engine', desc: 'Smart redesign suggestions for any site', to: '/product/redesign' },
        ],
      },
      {
        heading: 'Tools & Integrations',
        items: [
          { icon: Eye, label: 'Screenshot Capture', desc: 'Full-page renders across all viewports', to: '/product/screenshots' },
          { icon: Layers, label: 'Component Library', desc: 'Auto-detect and catalog UI components', to: '/product/components' },
          { icon: Move, label: 'Animation Inspector', desc: 'Record CSS transitions and keyframes', to: '/product/animations' },
        ],
      },
    ],
  },
  learn: {
    label: 'Learn',
    columns: [
      {
        heading: 'Resources',
        items: [
          { icon: BookOpen, label: 'Blog', to: '/blog' },
          { icon: Users, label: 'Customer Stories', to: '/customers' },
          { icon: BarChart3, label: 'Guides', to: '/resources' },
          { icon: Video, label: 'Showcase', to: '/showcase' },
        ],
      },
      {
        heading: 'How-To',
        items: [
          { icon: GraduationCap, label: 'Webimic Academy', href: '#' },
          { icon: Video, label: 'YouTube', href: '#' },
          { icon: FileText, label: 'Documentation', to: '/docs' },
        ],
      },
      {
        heading: 'Community',
        items: [
          { icon: Zap, label: 'Webimic for Startups', to: '/startups' },
          { icon: Calendar, label: 'Meetups', href: '#' },
          { icon: Globe, label: 'Community', to: '/community' },
        ],
      },
    ],
  },
  company: {
    label: 'Company',
    items: [
      { icon: Building2, label: 'About', to: '/company/about' },
      { icon: Briefcase, label: 'Careers', to: '/company/careers' },
      { icon: Handshake, label: 'Partners', to: '/company/partners' },
      { icon: Calendar, label: 'Events', to: '/company/events' },
    ],
  },
};

export const footerData = {
  products: [
    { label: 'Webimic Platform', to: '/product/platform' },
    { label: 'Site Analyzer', to: '/product/analyzer' },
    { label: 'Design Tokens', to: '/product/tokens' },
    { label: 'Doc Generator', to: '/product/docs' },
    { label: 'Redesign Engine', to: '/product/redesign' },
    { label: 'Screenshot Capture', to: '/product/screenshots' },
    { label: 'Component Library', to: '/product/components' },
    { label: 'Animation Inspector', to: '/product/animations' },
  ],
  resources: [
    { label: 'Blog', to: '/blog' },
    { label: 'Customer Stories', to: '/customers' },
    { label: 'Guides', to: '/resources' },
    { label: 'Webimic Academy', href: '#' },
    { label: 'Community', to: '/community' },
    { label: 'Changelog', href: '#' },
    { label: 'Docs', to: '/docs' },
    { label: 'Support', href: '#' },
  ],
  company: [
    { label: 'About', to: '/company/about' },
    { label: 'Careers', to: '/company/careers' },
    { label: 'Partners', to: '/company/partners' },
    { label: 'Trust Center', href: '#' },
    { label: 'Events', to: '/company/events' },
  ],
};

export const logoCompanies = [
  'Stripe', 'Vercel', 'Linear', 'Notion', 'Figma', 'Shopify', 'Airbnb',
  'Spotify', 'Netflix', 'Slack', 'Discord', 'Twitch', 'GitHub', 'GitLab',
  'Atlassian', 'Dropbox', 'Canva', 'Webflow',
];
