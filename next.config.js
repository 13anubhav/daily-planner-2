/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  env: {
    NEXT_PUBLIC_SUPABASE_URL: 'https://tydulzuulginmmqtchog.supabase.co',
    NEXT_PUBLIC_SUPABASE_ANON_KEY: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR5ZHVsenV1bGdpbm1tcXRjaG9nIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg4MjM5MzMsImV4cCI6MjA1NDM5OTkzM30.CdAlLtYw1UCzMPfSdSSCEvftXSJeztaFdA4AdaMB550',
    NEXT_PUBLIC_SITE_URL: 'https://amazing-daily-planner.netlify.app',
    NEXT_PUBLIC_SITE_NAME: 'Amazing Daily Planner'
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  }
}

module.exports = nextConfig 