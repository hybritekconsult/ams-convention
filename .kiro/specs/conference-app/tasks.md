# Implementation Plan: Destiny Limitations 2026 — Conference Web Application

## Overview

Incremental implementation of the full-stack conference web application following the build order defined in the SDC: configuration first, then UI primitives, then page components, then backend integration. Each task builds directly on the previous, ending with all pieces wired together into a working application. The implementation language is TypeScript with Next.js 14+ App Router.

---

## Tasks

- [x] 1. Initialize project configuration and design system
  - Scaffold a new Next.js 14+ project with App Router if one does not already exist (`npx create-next-app@latest --typescript --tailwind --app --src-dir=false`)
  - Configure `tailwind.config.js` with all brand color tokens under the `brand` namespace: `burgundy: #7A0C1B`, `crimson: #B31B2C`, `gold: #D29034`, `cream: #FBF3E8`, `navy: #10233D`, `red: #C0121A`
  - Configure `tailwind.config.js` with `fontFamily.heading: ["Oswald", "Montserrat", "sans-serif"]` and `fontFamily.body: ["Inter", "system-ui", "sans-serif"]`
  - Add `next/font/google` imports for Oswald and Inter in `app/layout.tsx` with `display: swap`
  - Apply `font-body` as default body class and configure `font-heading` in global CSS (`app/globals.css`)
  - Install dependencies: `clsx`, `tailwind-merge`, `framer-motion`, `lucide-react`
  - _Requirements: 1.1, 1.2, 1.3, 1.4_

- [x] 2. Set up shared types, validation schema, and database schema
  - [x] 2.1 Create shared response type and registration input type
    - Create `lib/types.ts` exporting `ActionResponse<T>` type with fields `success: boolean`, `message: string`, `data?: T`, `errors?: Record<string, string[]>`
    - Enforce TypeScript-level invariant: document that `success === true` implies `errors === undefined` and `success === false` implies `data === undefined`
    - _Requirements: 12.1, 12.2, 12.3_

  - [x] 2.2 Create Zod registration validation schema
    - Create `lib/validations/register.ts` with `registerSchema` implementing all field rules: `fullName` min 2, `email` email format, `phone` min 8, `country` min 2, `city` min 2, `attendanceType` enum
    - Export `RegisterInput` as `z.infer<typeof registerSchema>`
    - _Requirements: 8.1, 8.2, 8.3, 8.4, 8.5, 8.6_

  - [ ]* 2.3 Write property tests for the registration validation schema
    - **Property 1: Schema Rejects All Invalid Inputs** — use fast-check to generate objects with at least one field violating its constraint; assert `safeParse().success === false` and field errors present
    - **Property 2: Schema Accepts All Valid Inputs (Round Trip)** — generate structurally valid objects; assert `safeParse().success === true` and parsed output deep-equals input
    - **Validates: Requirements 8.1, 8.2, 8.3, 8.4, 8.5, 8.6, 8.7, 8.8**

  - [x] 2.4 Define Prisma schema and run initial migration
    - Create `prisma/schema.prisma` with `Registration` model, `AttendanceType` enum, and `RegistrationStatus` enum per the design data model
    - Include `@@index([email])` on the `Registration` model
    - Run `npx prisma migrate dev --name init` to create the initial migration
    - Generate Prisma client: `npx prisma generate`
    - _Requirements: 11.1, 11.2, 11.3, 11.4, 11.5, 11.6_

  - [x] 2.5 Create Prisma client singleton
    - Create `lib/prisma.ts` exporting a singleton `PrismaClient` instance safe for use in Next.js development (prevents hot-reload connection exhaustion)
    - _Requirements: 11.1_

- [x] 3. Checkpoint — Verify schema and types
  - Ensure all TypeScript types compile without errors (`npx tsc --noEmit`)
  - Ensure Prisma client generates successfully
  - Ask the user if any questions arise before proceeding to UI components.

- [x] 4. Build UI primitive components
  - [x] 4.1 Create `Button` component
    - Create `components/ui/button.tsx` with `ButtonProps` interface supporting `variant: "primary" | "secondary" | "outline"`, `size?: "sm" | "md" | "lg"`, `isLoading?: boolean`
    - Implement variant class mapping using `clsx` and `tailwind-merge`
    - Primary: `bg-brand-crimson text-brand-cream`; Secondary: `bg-brand-gold text-brand-navy`; Outline: `bg-transparent border-brand-gold text-brand-cream`
    - When `isLoading={true}`: add `disabled` attribute and render a spinner icon (Lucide `Loader2` with `animate-spin`)
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5_

  - [ ]* 4.2 Write property tests for Button component
    - **Property 7: Button Variant Styling Invariant** — for each variant value, render Button with arbitrary children and assert correct CSS classes are present in the DOM
    - **Property 8: Loading Button is Always Disabled** — render Button with `isLoading={true}` and arbitrary props; assert `disabled` attribute is always present
    - **Validates: Requirements 2.2, 2.3, 2.4, 2.5**

  - [x] 4.3 Create `Card` component
    - Create `components/ui/card.tsx` with `CardProps` interface
    - Default: `bg-brand-cream` background
    - When `withGoldBorder={true}`: add `border border-brand-gold`
    - _Requirements: 2.6, 2.7_

  - [ ]* 4.4 Write unit tests for Card component
    - Test default rendering with brand-cream background class
    - Test `withGoldBorder={true}` adds the gold border class
    - Test `withGoldBorder={false}` or omitted does not add gold border class
    - _Requirements: 2.6, 2.7_

- [x] 5. Build Navbar component
  - Create `components/navbar.tsx` as a Server Component shell
  - Render a tricolor (Red / White / Blue) horizontal `div` accent stripe at the very top (3 equal columns using Tailwind `flex`)
  - Render logo/ministry title on the left, nav links in the center (Home, About, Schedule, Venue, Register), "Register Now" CTA button on the right using the `Button` primitive with `variant="primary"`
  - "Register Now" link href: `/register`; each nav link points to its respective anchor or route
  - Background: `bg-brand-navy`; make the bar `sticky top-0 z-50`
  - Add a client-side `NavbarMobileMenu` island component for hamburger toggle on `<640 px` viewports
  - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 3.7, 3.8, 3.9_

- [x] 6. Build Hero component
  - Create `components/hero.tsx` as a Server Component
  - Accept `HeroProps`: `title`, `theme`, `scripture`, `speaker`
  - Render headline, theme (large bold uppercase), scripture reference, speaker name
  - Include two `Button` elements: "Register Now" → `/register`, "View Schedule" → `/#schedule`
  - Apply `clip-path: polygon(0 0, 100% 0, 100% 88%, 0 100%)` (or equivalent) for diagonal bottom edge
  - Use `@media (max-width: 640px)` override to reduce clip-path angle (e.g., `polygon(0 0, 100% 0, 100% 95%, 0 100%)`)
  - Use `next/image` with `priority={true}` for the speaker/poster image
  - Background: `bg-brand-burgundy`
  - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5, 4.6, 4.7, 4.8, 4.9, 4.10_

- [x] 7. Build ScheduleTimeline component
  - Create `components/schedule-timeline.tsx` as a Server Component
  - Accept `ScheduleTimelineProps` with `sessions: ScheduleSession[]`
  - Render session blocks for the two hard-coded sessions: `12:00–18:00 Daily Consultation` and `18:00–22:00 Holy Mass & Adoration`
  - Time indicators styled with `text-brand-gold font-heading`
  - Wrap the section in a `<section id="schedule">` element for hero CTA deep-link navigation
  - Use appropriate ARIA roles (`role="list"` / `role="listitem"` or semantic `<ol>`) for screen reader accessibility
  - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5_

- [x] 8. Build VenueCard component
  - Create `components/venue-card.tsx` as a Server Component
  - Accept `VenueCardProps`: `name`, `address`, `mapUrl?`
  - Render address with Lucide `MapPin` icon beside it
  - Render "Get Directions" link with `target="_blank" rel="noopener noreferrer"`
  - When `mapUrl` is provided, render an `<iframe>` with `title="Venue map"` for accessibility
  - Wrap content in the `Card` primitive with `withGoldBorder={true}`
  - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5_

- [x] 9. Build Footer component
  - Create `components/footer.tsx` as a Server Component
  - Accept `FooterProps`: `coordinators`, `slogan`, `quickLinks`, `copyrightYear`
  - Display coordinator names and roles
  - Display slogan text
  - Render quick links mirroring the Navbar links
  - Display copyright notice with dynamic year: `© {copyrightYear} Destiny Limitations 2026`
  - Background: `bg-brand-navy` or `bg-brand-burgundy`
  - _Requirements: 7.1, 7.2, 7.3, 7.4, 7.5_

- [x] 10. Checkpoint — Verify all UI components render correctly
  - Run `npx tsc --noEmit` to confirm no type errors
  - Ensure all components import brand tokens correctly from Tailwind
  - Ask the user if any questions arise before proceeding to backend integration.

- [x] 11. Implement Registration Server Action
  - [x] 11.1 Create the `registerAttendee` server action
    - Create `app/actions/register.ts` with `"use server"` directive
    - Import `registerSchema` and `prisma` singleton
    - Implement validation-first flow: `safeParse` → return error `ActionResponse` if invalid
    - On valid input: call `prisma.registration.create({ data: { ...parsed.data, status: "CONFIRMED" } })`
    - Catch all Prisma errors and return `{ success: false, message: "Registration failed. Please try again." }`
    - Check for duplicate email before create: if email exists, return `{ success: false, message: "An attendee with this email is already registered." }`
    - Return `{ success: true, message: "Registration successful!", data: record }` on success
    - Never mutate the input parameter
    - _Requirements: 10.1, 10.2, 10.3, 10.4, 10.5, 10.6, 10.7_

  - [ ]* 11.2 Write property tests for the registerAttendee server action (with mocked Prisma)
    - **Property 3: Registration Persistence Round Trip** — for valid inputs with mocked `prisma.registration.create`, assert returned `data` fields match input fields
    - **Property 4: No Database Write on Invalid Input** — for any invalid input (generated by fast-check), assert `success: false` and `prisma.registration.create` was never called
    - **Property 5: ActionResponse Structural Invariant** — for all inputs (valid and invalid), assert `success === true → errors === undefined` and `success === false → data === undefined`
    - **Property 10: ServerAction Input Immutability** — for any input object, assert properties are unchanged after action call
    - **Validates: Requirements 10.2, 10.3, 10.6, 12.2, 12.3**

  - [ ]* 11.3 Write unit tests for registerAttendee error paths
    - Test: valid input with mocked DB success → returns success response
    - Test: valid input with mocked DB throw → returns `"Registration failed. Please try again."`
    - Test: valid input with duplicate email (mocked) → returns duplicate error message
    - _Requirements: 10.4, 10.5, 10.7_

- [x] 12. Build RegistrationForm client component
  - [x] 12.1 Create `components/registration-form.tsx` as a client component
    - Add `"use client"` directive
    - Implement React Hook Form with `zodResolver(registerSchema)`
    - Render all six labeled fields: Full Name, Email, Phone Number, Country, City, Attendance Type (`<select>` with the three options)
    - Each `<label>` must use `htmlFor` matching the input `id`
    - Each input must have `aria-describedby` pointing to its error message element `id`
    - Submit button: `Button` with `variant="primary"` and `isLoading` bound to form submission state
    - Call `registerAttendee(values)` in `handleSubmit`
    - On `success: true`: show a success confirmation block (green/gold styled)
    - On `success: false` with `errors`: call `form.setError` for each field
    - On `success: false` without `errors`: show a general error message block
    - _Requirements: 9.1, 9.2, 9.3, 9.4, 9.5, 9.6, 9.7, 9.8, 9.9, 9.11_

  - [ ]* 12.2 Write property tests for RegistrationForm error association
    - **Property 9: Form Error Association Invariant** — for any set of field errors injected into the form state, assert every visible error element's `id` matches the `aria-describedby` of its corresponding input
    - **Validates: Requirements 9.3, 9.4, 13.2, 13.3**

  - [ ]* 12.3 Write unit tests for RegistrationForm interaction states
    - Test: submit button is disabled while `isSubmitting` is true
    - Test: success confirmation renders when server action returns `success: true`
    - Test: general error renders when server action returns `success: false` with no field errors
    - _Requirements: 9.6, 9.7, 9.9_

- [x] 13. Checkpoint — Verify registration end-to-end
  - Run `npx tsc --noEmit`
  - Run the test suite (`npm test -- --run` or `npx jest --passWithNoTests`)
  - Manually verify form submits and a record appears in the database
  - Ask the user if any questions arise before proceeding to page assembly.

- [x] 14. Assemble pages and root layout
  - [x] 14.1 Create root layout (`app/layout.tsx`)
    - Import and apply Google Fonts via `next/font/google`
    - Render `<Navbar>` and `<Footer>` as persistent wrappers around `{children}`
    - Apply `font-body` to the `<body>` element
    - _Requirements: 14.3_

  - [x] 14.2 Build homepage (`app/page.tsx`)
    - Import and render in order: `<Hero>`, Event Overview section (minister profile with `next/image`), `<ScheduleTimeline>`, `<VenueCard>`
    - Pass hard-coded event data as props to each component
    - Mark the page as statically generated (no `dynamic = "force-dynamic"`)
    - _Requirements: 14.1, 14.4_

  - [x] 14.3 Build registration page (`app/register/page.tsx`)
    - Render `<RegistrationForm>` as the primary content inside a branded container
    - Page heading: "Register for the Convention" (`font-heading`, uppercase, `text-brand-gold`)
    - Statically generate the page shell; the form itself is a client component
    - _Requirements: 9.10, 14.2_

  - [x] 14.4 Create custom 404 page (`app/not-found.tsx`)
    - Render a branded 404 message consistent with the site design (brand-burgundy background, cream text)
    - Include a "Go Home" link using the `Button` primitive
    - _Requirements: 14.5_

- [x] 15. Accessibility and responsiveness pass
  - Audit all form inputs for `aria-label` / `aria-labelledby` and `aria-describedby` on error states
  - Verify semantic HTML: `<nav>`, `<main>`, `<footer>`, `<section>`, `<h1>`–`<h6>` used throughout
  - Verify all `next/image` usages include `alt`, `width`, and `height` attributes
  - Check brand-cream on brand-burgundy contrast ratio meets WCAG AA (4.5:1 minimum) using a contrast checker tool; document result
  - Verify hamburger menu is keyboard-navigable with visible focus ring
  - _Requirements: 13.1, 13.2, 13.3, 13.4, 13.5, 13.6, 13.7_

- [x] 16. Final checkpoint — Full integration verification
  - Run `npx tsc --noEmit` — must produce zero errors
  - Run full test suite — all tests must pass
  - Verify homepage renders all sections: Hero, Event Overview, Schedule, Venue
  - Verify `/register` page renders the form and successfully submits
  - Verify Navbar sticky behavior and mobile hamburger menu
  - Ask the user if any questions arise.

---

## Task Dependency Graph

```json
{
  "waves": [
    { "wave": 1, "tasks": ["1"] },
    { "wave": 2, "tasks": ["2"] },
    { "wave": 3, "tasks": ["3"] },
    { "wave": 4, "tasks": ["4"] },
    { "wave": 5, "tasks": ["5", "6", "7", "8", "9"] },
    { "wave": 6, "tasks": ["10"] },
    { "wave": 7, "tasks": ["11"] },
    { "wave": 8, "tasks": ["12"] },
    { "wave": 9, "tasks": ["13"] },
    { "wave": 10, "tasks": ["14"] },
    { "wave": 11, "tasks": ["15"] },
    { "wave": 12, "tasks": ["16"] }
  ]
}
```

---

## Notes

- Tasks marked with `*` are optional and can be skipped for a faster MVP implementation
- Each task references specific requirements for traceability back to `requirements.md`
- Each property test references the design document property it validates (e.g., **Property 1**, **Property 3**)
- Checkpoints ensure incremental validation so errors are caught early
- The Prisma schema can be swapped to SQLite via Drizzle for local development without changing application logic
- All secrets (`DATABASE_URL`) must be configured in `.env.local` — never committed to the repository
