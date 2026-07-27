# Requirements Document

## Introduction

The **Destiny Limitations 2026** conference web application is the official digital presence for the 2026 Amsterdam Convention — *"Breaking Destiny Limitations"*. It provides event information (hero landing, daily schedule, venue details, minister profile), and an online attendee registration system backed by a PostgreSQL database. The application is built on Next.js 14+ with Tailwind CSS, Prisma ORM, React Hook Form, and Zod.

---

## Glossary

- **Application:** The Destiny Limitations 2026 Next.js web application.
- **Navbar:** The persistent sticky navigation bar rendered at the top of every page.
- **Hero:** The full-width landing section with the event title, theme, speaker, and CTAs.
- **ScheduleTimeline:** The component displaying the daily program sessions.
- **VenueCard:** The component displaying the event address and directions.
- **RegistrationForm:** The client-side React component for collecting attendee data.
- **RegistrationSchema:** The Zod schema (`registerSchema`) that validates attendee form input.
- **ServerAction:** The Next.js Server Action `registerAttendee` that persists a validated registration.
- **ActionResponse:** The structured response type `ActionResponse<T>` returned by the ServerAction.
- **Registration:** The Prisma database model representing a single attendee registration.
- **AttendanceType:** Enum with values `FULL_CONVENTION`, `CONSULTATION_ONLY`, `HOLY_MASS_ONLY`.
- **RegistrationStatus:** Enum with values `PENDING`, `CONFIRMED`, `CANCELLED`.
- **BrandToken:** A named Tailwind CSS color defined in the design system (burgundy, crimson, gold, cream, navy, red).
- **Coordinator:** An event coordinator listed in the footer (Ugochukwu Ndukaihe, Augustine Amadike).
- **WCAG AA:** Web Content Accessibility Guidelines Level AA contrast and accessibility requirements.

---

## Requirements

---

### Requirement 1: Project Configuration & Design System

**User Story:** As a developer, I want the project's Tailwind configuration and font setup to match the brand design system, so that all components use consistent brand tokens throughout the application.

#### Acceptance Criteria

1. THE Application SHALL configure `tailwind.config.js` with brand color tokens: `burgundy: #7A0C1B`, `crimson: #B31B2C`, `gold: #D29034`, `cream: #FBF3E8`, `navy: #10233D`, `red: #C0121A` under the `brand` namespace.
2. THE Application SHALL configure `tailwind.config.js` with font families: `heading` mapped to `["Oswald", "Montserrat", "sans-serif"]` and `body` mapped to `["Inter", "system-ui", "sans-serif"]`.
3. THE Application SHALL load the Oswald and Inter Google Fonts via `next/font/google` in `app/layout.tsx` with `display: swap` to prevent layout shift.
4. THE Application SHALL apply `font-body` as the default body font and `font-heading` for all heading elements in the global CSS.

---

### Requirement 2: UI Primitive Components

**User Story:** As a developer, I want reusable primitive UI components that enforce brand styling, so that all interactive elements and containers share a consistent visual language.

#### Acceptance Criteria

1. THE Application SHALL provide a `Button` component supporting `variant` values of `"primary"`, `"secondary"`, and `"outline"`.
2. WHEN the `Button` `variant` is `"primary"`, THE Application SHALL render the button with a `brand-crimson` background and `cream`-colored text.
3. WHEN the `Button` `variant` is `"secondary"`, THE Application SHALL render the button with a `brand-gold` background and `navy`-colored text.
4. WHEN the `Button` `variant` is `"outline"`, THE Application SHALL render the button with a transparent background, a `brand-gold` border, and `cream`-colored text.
5. WHEN the `Button` receives an `isLoading` prop equal to `true`, THE Application SHALL disable the button and display a loading indicator, preventing duplicate submissions.
6. THE Application SHALL provide a `Card` component with a `brand-cream` background.
7. WHEN the `Card` receives `withGoldBorder` equal to `true`, THE Application SHALL render a `brand-gold` border on the card.
8. THE Application SHALL ensure all interactive elements (buttons, links) have visible focus indicators for keyboard navigation.

---

### Requirement 3: Navigation Bar

**User Story:** As a visitor, I want a clear, sticky navigation bar, so that I can access any section of the site from any scroll position.

#### Acceptance Criteria

1. THE Navbar SHALL be rendered as a sticky element at the top of every page.
2. THE Navbar SHALL display a tricolor (Red / White / Blue) horizontal accent stripe at its very top edge.
3. THE Navbar SHALL display the ministry logo and event title on the left side.
4. THE Navbar SHALL display navigation links — Home, About, Schedule, Venue, Register — in the center.
5. THE Navbar SHALL display a "Register Now" CTA button styled as `variant="primary"` (brand-crimson) on the right side.
6. WHEN the "Register Now" CTA is activated, THE Navbar SHALL navigate the user to `/register`.
7. WHEN the viewport width is less than 640 px, THE Navbar SHALL collapse the navigation links into a hamburger menu toggle.
8. WHEN the hamburger menu is toggled open, THE Navbar SHALL display all navigation links in a vertical drop-down panel.
9. THE Navbar SHALL use `brand-navy` as the background color.

---

### Requirement 4: Hero Section

**User Story:** As a visitor, I want a visually impactful hero section on the homepage, so that I immediately understand the event's theme, speaker, and how to register.

#### Acceptance Criteria

1. THE Hero SHALL display the headline `"2026 AMSTERDAM CONVENTION"` in uppercase using the `font-heading` typeface.
2. THE Hero SHALL display the theme `"BREAKING DESTINY LIMITATIONS"` as the primary bold statement in uppercase.
3. THE Hero SHALL display the scripture reference `"1 Chronicles 4:10"` beneath the theme.
4. THE Hero SHALL display the speaker name `"Ministering: Fr. Emmanuel Obimma (Ebube Muonso)"`.
5. THE Hero SHALL include a "Register Now" CTA button that navigates to `/register`.
6. THE Hero SHALL include a "View Schedule" CTA button that navigates to `/#schedule`.
7. THE Hero SHALL use a `brand-burgundy` background with cream and gold text.
8. THE Hero SHALL apply a diagonal `clip-path` bottom edge to create the slanted section divider effect.
9. WHEN the viewport width is less than 640 px, THE Hero SHALL reduce the diagonal clip-path angle intensity to remain visually coherent on small screens.
10. THE Hero SHALL use `next/image` with `priority` set to `true` for the speaker image to optimize LCP (Largest Contentful Paint).

---

### Requirement 5: Daily Program Schedule

**User Story:** As a visitor, I want to see the daily program schedule, so that I can plan which sessions I will attend.

#### Acceptance Criteria

1. THE ScheduleTimeline SHALL display the daily session: `12:00 – 18:00 Daily Consultation`.
2. THE ScheduleTimeline SHALL display the daily session: `18:00 – 22:00 Holy Mass & Adoration`.
3. THE ScheduleTimeline SHALL use gold accent styling for time indicators.
4. THE ScheduleTimeline SHALL be rendered in a timeline or tabbed layout that is accessible to screen readers.
5. THE ScheduleTimeline SHALL be reachable via the anchor `id="schedule"` for deep-link navigation from the hero CTA.

---

### Requirement 6: Venue Information

**User Story:** As a visitor, I want to see the event venue details, so that I know where to go and can get directions.

#### Acceptance Criteria

1. THE VenueCard SHALL display the address `"Zaaiersweg 180, 1097 ST Amsterdam, The Netherlands"`.
2. THE VenueCard SHALL display a `MapPin` icon (Lucide React) alongside the address.
3. THE VenueCard SHALL provide a "Get Directions" link that opens in a new browser tab.
4. WHERE an embed URL is configured, THE VenueCard SHALL render an `<iframe>` map of the venue location.
5. THE VenueCard SHALL use the `Card` primitive with `withGoldBorder={true}`.

---

### Requirement 7: Footer

**User Story:** As a visitor, I want a persistent footer with coordinator contact details and quick navigation links, so that I can find contact information and navigate the site from the bottom of any page.

#### Acceptance Criteria

1. THE Footer SHALL display the coordinator names: `"Ugochukwu Ndukaihe"` and `"Augustine Amadike"`.
2. THE Footer SHALL display the slogan: `"…If there's someone to pray, there is a God to answer…"`.
3. THE Footer SHALL render quick navigation links that mirror the Navbar links.
4. THE Footer SHALL display a copyright notice including the current year.
5. THE Footer SHALL use a `brand-navy` or `brand-burgundy` background for visual consistency with the header.

---

### Requirement 8: Registration Validation Schema

**User Story:** As a developer, I want a Zod validation schema for registration input, so that all form submissions are validated consistently on both client and server.

#### Acceptance Criteria

1. THE RegistrationSchema SHALL validate `fullName` as a string with a minimum length of 2 characters, returning the message `"Full name must be at least 2 characters"` on failure.
2. THE RegistrationSchema SHALL validate `email` as a valid email address format, returning the message `"Invalid email address"` on failure.
3. THE RegistrationSchema SHALL validate `phone` as a string with a minimum length of 8 characters, returning the message `"Phone number is required"` on failure.
4. THE RegistrationSchema SHALL validate `country` as a string with a minimum length of 2 characters, returning the message `"Country is required"` on failure.
5. THE RegistrationSchema SHALL validate `city` as a string with a minimum length of 2 characters, returning the message `"City is required"` on failure.
6. THE RegistrationSchema SHALL validate `attendanceType` as one of `"FULL_CONVENTION"`, `"CONSULTATION_ONLY"`, or `"HOLY_MASS_ONLY"`, rejecting any other value.
7. WHEN `registerSchema.safeParse` is called with a valid input object, THE RegistrationSchema SHALL return `{ success: true }` and the parsed output SHALL be structurally equivalent to the input.
8. WHEN `registerSchema.safeParse` is called with an invalid input object, THE RegistrationSchema SHALL return `{ success: false }` and the `error.flatten().fieldErrors` SHALL contain at least one entry for the offending field.

---

### Requirement 9: Registration Form Component

**User Story:** As a visitor, I want an accessible registration form with real-time validation feedback, so that I can complete my registration accurately and receive clear guidance on any errors.

#### Acceptance Criteria

1. THE RegistrationForm SHALL render labeled input fields for: Full Name, Email, Phone Number, Country, City, and Attendance Type.
2. THE RegistrationForm SHALL use React Hook Form with a Zod resolver bound to `registerSchema` for client-side validation.
3. WHEN a field fails validation, THE RegistrationForm SHALL display the field-level error message adjacent to the corresponding input.
4. WHEN a field fails validation, THE RegistrationForm SHALL associate the error message with the input via `aria-describedby` for screen reader accessibility.
5. THE RegistrationForm SHALL render a submit button that, when activated, calls the `registerAttendee` Server Action.
6. WHILE the form submission is in progress, THE RegistrationForm SHALL disable the submit button and show a loading state.
7. WHEN the ServerAction returns `success: true`, THE RegistrationForm SHALL display a success confirmation message to the user.
8. WHEN the ServerAction returns `success: false` with `errors`, THE RegistrationForm SHALL map each field error back to its corresponding input using `form.setError`.
9. WHEN the ServerAction returns `success: false` without field-level `errors`, THE RegistrationForm SHALL display a general error message to the user.
10. THE RegistrationForm SHALL be accessible as a standalone page at the route `/register`.
11. THE RegistrationForm SHALL render the Attendance Type field as a `<select>` or radio group with options: `"Full Convention (In-Person)"`, `"Consultation Only"`, `"Holy Mass & Adoration Only"`.

---

### Requirement 10: Registration Server Action

**User Story:** As a visitor, I want my registration to be securely persisted when I submit the form, so that my attendance is recorded and confirmed.

#### Acceptance Criteria

1. THE ServerAction SHALL accept a `RegisterInput` object and return an `ActionResponse<Registration>`.
2. WHEN `registerSchema.safeParse` returns `success: false`, THE ServerAction SHALL return `ActionResponse { success: false, message: "Validation failed", errors: <fieldErrors> }` without writing to the database.
3. WHEN `registerSchema.safeParse` returns `success: true`, THE ServerAction SHALL call `prisma.registration.create` with the parsed data and `status: "CONFIRMED"`.
4. WHEN `prisma.registration.create` succeeds, THE ServerAction SHALL return `ActionResponse { success: true, message: "Registration successful!", data: <Registration> }`.
5. WHEN `prisma.registration.create` throws an error, THE ServerAction SHALL catch the error and return `ActionResponse { success: false, message: "Registration failed. Please try again." }` without re-throwing.
6. THE ServerAction SHALL never mutate the `input` parameter.
7. IF a registration with the same `email` already exists, THEN THE ServerAction SHALL return `ActionResponse { success: false, message: "An attendee with this email is already registered." }`.

---

### Requirement 11: Database Schema & Persistence

**User Story:** As a system operator, I want a well-structured database schema for registrations, so that attendee data is stored reliably and can be queried efficiently.

#### Acceptance Criteria

1. THE Application SHALL define a `Registration` Prisma model with fields: `id` (UUID, primary key), `fullName` (String), `email` (String), `phone` (String), `country` (String), `city` (String), `attendanceType` (AttendanceType enum), `status` (RegistrationStatus enum), `createdAt` (DateTime), `updatedAt` (DateTime).
2. THE Application SHALL set the default value of `attendanceType` to `FULL_CONVENTION`.
3. THE Application SHALL set the default value of `status` to `CONFIRMED`.
4. THE Application SHALL create a database index on the `email` field of the `Registration` model.
5. THE Application SHALL define the `AttendanceType` enum with values: `FULL_CONVENTION`, `CONSULTATION_ONLY`, `HOLY_MASS_ONLY`.
6. THE Application SHALL define the `RegistrationStatus` enum with values: `PENDING`, `CONFIRMED`, `CANCELLED`.

---

### Requirement 12: ActionResponse Type Invariant

**User Story:** As a developer, I want the `ActionResponse` type to enforce a consistent structural contract, so that client code can rely on predictable response shapes.

#### Acceptance Criteria

1. THE ActionResponse type SHALL contain the fields: `success: boolean`, `message: string`, `data?: T`, `errors?: Record<string, string[]>`.
2. WHEN `ActionResponse.success` is `true`, THE ActionResponse SHALL have `errors` equal to `undefined`.
3. WHEN `ActionResponse.success` is `false`, THE ActionResponse SHALL have `data` equal to `undefined`.

---

### Requirement 13: Accessibility & Responsiveness

**User Story:** As a visitor with accessibility needs or using a mobile device, I want the application to be accessible and responsive, so that I can use all features regardless of my device or assistive technology.

#### Acceptance Criteria

1. THE Application SHALL achieve WCAG AA contrast ratios between `brand-cream` (`#FBF3E8`) container backgrounds and `brand-burgundy` (`#7A0C1B`) text.
2. THE RegistrationForm SHALL provide `aria-label` or `aria-labelledby` on every form input.
3. THE RegistrationForm SHALL associate error messages with their inputs via `aria-describedby`.
4. THE Application SHALL render a mobile-first layout that functions correctly on viewports narrower than 640 px.
5. WHEN the viewport is less than 640 px, THE Application SHALL collapse complex layout sections (e.g., navbar, hero, slanted dividers) to mobile-optimized alternatives.
6. THE Application SHALL use `next/image` for all significant images, providing `width`, `height`, and `alt` attributes.
7. THE Application SHALL use semantic HTML elements (`<nav>`, `<main>`, `<footer>`, `<section>`, `<article>`, `<h1>`–`<h6>`) throughout.

---

### Requirement 14: Application Page Structure

**User Story:** As a visitor, I want a well-organized multi-section application with clear routing, so that I can navigate to the information I need.

#### Acceptance Criteria

1. THE Application SHALL provide a homepage route (`/`) that includes the Hero, Event Overview, ScheduleTimeline, and VenueCard sections in a single-scroll layout.
2. THE Application SHALL provide a dedicated registration route (`/register`) that renders the RegistrationForm as the primary content.
3. THE Application SHALL render the Navbar and Footer on every page via the root layout (`app/layout.tsx`).
4. THE Application SHALL statically generate the homepage and all purely informational pages (no dynamic database reads).
5. WHEN a user navigates to a route that does not exist, THE Application SHALL render a custom 404 page consistent with the brand design.
