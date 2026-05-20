# MediQueue Frontend

A Next.js client application for the MediQueue tutoring marketplace.

**Live site:** https://b13-a9-medi-queue-frotend.vercel.app/

## Overview

MediQueue Frontend provides a polished interface for students and tutors to discover tutors, book sessions, manage bookings, and update profiles. It is built with Next.js 16, React 19, Tailwind CSS, DaisyUI, and integrates with a backend API via `NEXT_PUBLIC_BACKEND_URL`.

## Features

- Browse tutors with searchable listings and detailed tutor profiles
- Book tutoring sessions directly from a tutor's detail page
- View and cancel booked sessions in the student dashboard
- Add new tutors and manage personal tutor listings
- User authentication with login and registration flows
- Responsive layout and theme-friendly UI components

## Main Pages

- `/` — home page with banner, tutor overview, feature highlights, and metrics
- `/login` — student login page
- `/register` — new account registration page
- `/tutors` — tutors listing with search support
- `/tutor/[id]` — tutor detail and booking page
- `/booking` — booked sessions dashboard
- `/profile` — authenticated user profile page
- `/add-tutor` — add a new tutor record
- `/tutors/my-tutors` — manage tutors owned by the logged-in user

## Local Setup

1. Install dependencies:

```bash
pnpm install
```

2. Add environment variables in a `.env` file:

```bash
NEXT_PUBLIC_BACKEND_URL=https://your-backend.example.com
```

3. Start the development server:

```bash
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Notes

- The frontend depends on a running MediQueue backend API for tutor data, bookings, and authentication.
- Ensure the backend URL is available in `NEXT_PUBLIC_BACKEND_URL` before running the app.
- This project uses Tailwind CSS and DaisyUI for styling.
