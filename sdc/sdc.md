Below is a comprehensive Software Design Contract (SDC) tailored for an AI coding assistant. It uses the design cues, palette, and typography from the **2026 Amsterdam Convention ("Breaking Destiny Limitations")** poster, while specifying a modern, responsive, full-stack conference web application.

# **Software Design Contract (SDC)**

## **Project: Conference & Convention Web Application ("Destiny Limitations 2026")**

## **1\. System Architecture & Tech Stack**

   ┌────────────────────────────────────────────────────────┐  
   │                     Client (Browser)                   │  
   │   Next.js 14+ App Router, React 18, Tailwind CSS v3   │  
   └───────────────────────────┬────────────────────────────┘  
                               │  
                               ▼  
   ┌────────────────────────────────────────────────────────┐  
   │                   API & Server Layer                   │  
   │     Next.js Server Actions / API Routes \+ Zod          │  
   └───────────────────────────┬────────────────────────────┘  
                               │  
                               ▼  
   ┌────────────────────────────────────────────────────────┐  
   │                 Database / Persistence                 │  
   │       PostgreSQL \+ Prisma ORM / Drizzle ORM          │  
   └────────────────────────────────────────────────────────┘

> * **Framework:** Next.js 14+ (App Router, Server Components, Server Actions)  
> * **Styling:** Tailwind CSS v3 \+ clsx / tailwind-merge \+ Framer Motion (for smooth UI animations)  
> * **Icons:** Lucide React  
> * **Validation:** Zod  
> * **Database / Persistence:** PostgreSQL via Prisma ORM (or SQLite via Drizzle for local development)  
> * **Form State:** React Hook Form \+ @hookform/resolvers/zod

## **2\. Design System & Theme Specification**

Derived directly from the event poster branding:

### **Color Palette (tailwind.config.js tokens)**

JavaScript  
module.exports \= {  
  theme: {  
    extend: {  
      colors: {  
        brand: {  
          burgundy: "\#7A0C1B",   // Dominant background / primary action color  
          crimson: "\#B31B2C",    // Secondary buttons, accents, highlights  
          gold: "\#D29034",       // Badges, borders, emphasis elements  
          cream: "\#FBF3E8",      // Theme card containers / subtle backgrounds  
          navy: "\#10233D",       // Header background / deep contrast element  
          red: "\#C0121A",        // High-energy accents  
        }  
      },  
      fontFamily: {  
        heading: \["Oswald", "Montserrat", "sans-serif"\],  
        body: \["Inter", "system-ui", "sans-serif"\]  
      }  
    }  
  }  
}

### **Aesthetic & UI Style**

> * **Hero Banner:** Diagonal cutouts/slanted clips (clip-path: polygon(...)) mirroring the dynamic angles on the poster.  
> * **Top Accent:** Tricolor stripe motif (Red, White, Blue) subtly integrated into the navigation bar or header top border.  
> * **Typography:** Bold, tall uppercase headers for key theme statements (BREAKING DESTINY LIMITATIONS).

## **3\. Key Features & Page Layouts**

### **3.1 Layout & Navigation (/)**

> * **Header / Navbar:**  
  * Left: Ministry/Event Logo \+ Movement Title  
  * Center: Navigation links (*Home*, *About*, *Schedule*, *Venue*, *Register*)  
  * Right: **"Register Now"** CTA button (Brand Crimson)  
> * **Footer:**  
  * Contact info: Coordinators' details (Ugochukwu Ndukaihe & Augustine Amadike)  
  * Slogan banner: *"...If there's someone to pray, there is a God to answer..."*  
  * Quick links & Copyright notice

### **3.2 Landing Page Sections (Single Page Scroll or Route-Based)**

> 1. **Hero Section:**  
   * Headline: *2026 AMSTERDAM CONVENTION*  
   * Main Theme Display: **"BREAKING DESTINY LIMITATIONS"** (1 Chronicles 4:10)  
   * Key Speaker Highlight: *Ministering: Fr. Emmanuel Obimma (Ebube Muonso)*  
   * Quick Action CTAs: \[ Register Now \] and \[ View Schedule \]  
> 2. **Event Overview & Ministering Profile:**  
   * Minister profile section with high-resolution imagery and schedule details.  
> 3. **Daily Program Schedule:**  
   * Tabbed or timeline layout:  
     * 12:00 \- 18:00: Daily Consultation  
     * 18:00 \- 22:00: Holy Mass & Adoration  
> 4. **Venue & Event Details:**  
   * Address Card: *Zaaiersweg 180, 1097 ST Amsterdam, The Netherlands*  
   * Embedded interactive map or directions card.  
> 5. **Registration Form Section (/register):**  
   * Fields: Full Name, Email, Phone Number, Country/City, Attendance Type (In-Person / Consultation / Mass).

## **4\. Data Models & Database Schema**

### **Prisma Schema (prisma/schema.prisma)**

Code snippet  
datasource db {  
  provider \= "postgresql"  
  url      \= env("DATABASE\_URL")  
}

generator client {  
  provider \= "prisma-client-js"  
}

enum AttendanceType {  
  FULL\_CONVENTION  
  CONSULTATION\_ONLY  
  HOLY\_MASS\_ONLY  
}

enum RegistrationStatus {  
  PENDING  
  CONFIRMED  
  CANCELLED  
}

model Registration {  
  id             String             @id @default(uuid())  
  fullName       String  
  email          String  
  phone          String  
  country        String  
  city           String  
  attendanceType AttendanceType     @default(FULL\_CONVENTION)  
  status         RegistrationStatus @default(CONFIRMED)  
  createdAt      DateTime           @default(now())  
  updatedAt      DateTime           @updatedAt

  @@index(\[email\])  
}

## **5\. API Contracts & Server Actions**

### **POST /api/register or Server Action (registerAttendee)**

#### **Input Schema (Zod Validation)**

TypeScript  
import { z } from "zod";

export const registerSchema \= z.object({  
  fullName: z.string().min(2, "Full name must be at least 2 characters"),  
  email: z.string().email("Invalid email address"),  
  phone: z.string().min(8, "Phone number is required"),  
  country: z.string().min(2, "Country is required"),  
  city: z.string().min(2, "City is required"),  
  attendanceType: z.enum(\["FULL\_CONVENTION", "CONSULTATION\_ONLY", "HOLY\_MASS\_ONLY"\]),  
});

export type RegisterInput \= z.infer\<typeof registerSchema\>;

#### **Expected Server Action Response**

TypeScript  
export type ActionResponse\<T\> \= {  
  success: boolean;  
  message: string;  
  data?: T;  
  errors?: Record\<string, string\[\]\>;  
};

## **6\. Implementation Instructions for AI Agents**

When executing this project, build files in the following order:

> 1. **Configuration Setup:**  
   * Configure tailwind.config.js with the brand palette specified in Section 2\.  
   * Add Google Fonts (Oswald and Inter) to Next.js layout.tsx.  
> 2. **Components Architecture:**  
   * components/ui/button.tsx: Styled primary (brand-crimson) and secondary (brand-gold) buttons.  
   * components/ui/card.tsx: Cream-colored background container with gold accent borders.  
   * components/navbar.tsx: Sticky navigation bar with flag accent top border.  
   * components/hero.tsx: Slanted hero layout displaying the theme and main poster graphics/text.  
   * components/registration-form.tsx: Controlled client component with Zod validation.  
   * components/schedule-timeline.tsx: Interactive schedule display.  
   * components/footer.tsx: Persistent contacts and slogan section.  
> 3. **Backend Integration:**  
   * Implement app/actions/register.ts using Prisma to insert validated user submissions.  
   * Return structured feedback (success state or field-level validation errors) to the client form.

## **7\. Responsive & Quality Benchmarks**

> * **Mobile First:** Ensure layout collapses gracefully on mobile (\< 640px). Slanted section dividers should reduce angle intensity on mobile screens.  
> * **Accessibility:** Contrast ratios between brand-cream containers and brand-burgundy text must pass WCAG AA standards. Form fields must have proper ARIA labels and error states.