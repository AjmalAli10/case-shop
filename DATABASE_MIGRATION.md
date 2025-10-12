# Database Migration Guide - Railway to Free Hosting

## Quick Setup Options

### Option 1: Neon (Recommended)

1. Go to https://neon.tech
2. Sign up with GitHub
3. Create new project
4. Copy connection string
5. Update DATABASE_URL in your environment

### Option 2: Supabase

1. Go to https://supabase.com
2. Create new project
3. Go to Settings > Database
4. Copy connection string
5. Update DATABASE_URL in your environment

### Option 3: ElephantSQL

1. Go to https://www.elephantsql.com
2. Create free instance
3. Copy connection string
4. Update DATABASE_URL in your environment

## After Setting Up New Database

1. Update your DATABASE_URL environment variable
2. Run: `npx prisma migrate deploy`
3. Run: `npx prisma generate`
4. Test your application

## Environment Variable Format

```bash
DATABASE_URL="postgresql://username:password@host:port/database?sslmode=require"
```

## Troubleshooting

- Make sure SSL is enabled (sslmode=require)
- Check that the database allows connections from your hosting provider
- Verify all environment variables are set correctly
