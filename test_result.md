#====================================================================================================
# START - Testing Protocol - DO NOT EDIT OR REMOVE THIS SECTION
#====================================================================================================

# THIS SECTION CONTAINS CRITICAL TESTING INSTRUCTIONS FOR BOTH AGENTS
# BOTH MAIN_AGENT AND TESTING_AGENT MUST PRESERVE THIS ENTIRE BLOCK

# Communication Protocol:
# If the `testing_agent` is available, main agent should delegate all testing tasks to it.
#
# You have access to a file called `test_result.md`. This file contains the complete testing state
# and history, and is the primary means of communication between main and the testing agent.
#
# Main and testing agents must follow this exact format to maintain testing data. 
# The testing data must be entered in yaml format Below is the data structure:
# 
## user_problem_statement: {problem_statement}
## backend:
##   - task: "Task name"
##     implemented: true
##     working: true  # or false or "NA"
##     file: "file_path.py"
##     stuck_count: 0
##     priority: "high"  # or "medium" or "low"
##     needs_retesting: false
##     status_history:
##         -working: true  # or false or "NA"
##         -agent: "main"  # or "testing" or "user"
##         -comment: "Detailed comment about status"
##
## frontend:
##   - task: "Task name"
##     implemented: true
##     working: true  # or false or "NA"
##     file: "file_path.js"
##     stuck_count: 0
##     priority: "high"  # or "medium" or "low"
##     needs_retesting: false
##     status_history:
##         -working: true  # or false or "NA"
##         -agent: "main"  # or "testing" or "user"
##         -comment: "Detailed comment about status"
##
## metadata:
##   created_by: "main_agent"
##   version: "1.0"
##   test_sequence: 0
##   run_ui: false
##
## test_plan:
##   current_focus:
##     - "Task name 1"
##     - "Task name 2"
##   stuck_tasks:
##     - "Task name with persistent issues"
##   test_all: false
##   test_priority: "high_first"  # or "sequential" or "stuck_first"
##
## agent_communication:
##     -agent: "main"  # or "testing" or "user"
##     -message: "Communication message between agents"

# Protocol Guidelines for Main agent
#
# 1. Update Test Result File Before Testing:
#    - Main agent must always update the `test_result.md` file before calling the testing agent
#    - Add implementation details to the status_history
#    - Set `needs_retesting` to true for tasks that need testing
#    - Update the `test_plan` section to guide testing priorities
#    - Add a message to `agent_communication` explaining what you've done
#
# 2. Incorporate User Feedback:
#    - When a user provides feedback that something is or isn't working, add this information to the relevant task's status_history
#    - Update the working status based on user feedback
#    - If a user reports an issue with a task that was marked as working, increment the stuck_count
#    - Whenever user reports issue in the app, if we have testing agent and task_result.md file so find the appropriate task for that and append in status_history of that task to contain the user concern and problem as well 
#
# 3. Track Stuck Tasks:
#    - Monitor which tasks have high stuck_count values or where you are fixing same issue again and again, analyze that when you read task_result.md
#    - For persistent issues, use websearch tool to find solutions
#    - Pay special attention to tasks in the stuck_tasks list
#    - When you fix an issue with a stuck task, don't reset the stuck_count until the testing agent confirms it's working
#
# 4. Provide Context to Testing Agent:
#    - When calling the testing agent, provide clear instructions about:
#      - Which tasks need testing (reference the test_plan)
#      - Any authentication details or configuration needed
#      - Specific test scenarios to focus on
#      - Any known issues or edge cases to verify
#
# 5. Call the testing agent with specific instructions referring to test_result.md
#
# IMPORTANT: Main agent must ALWAYS update test_result.md BEFORE calling the testing agent, as it relies on this file to understand what to test next.

#====================================================================================================
# END - Testing Protocol - DO NOT EDIT OR REMOVE THIS SECTION
#====================================================================================================



#====================================================================================================
# Testing Data - Main Agent and testing sub agent both should log testing data below this section
#====================================================================================================


user_problem_statement: "Amazon-inspired, catalog-only (no cart/checkout/prices) product discovery website for Sri Ganesh Electricals, a Mangaluru showroom selling building materials, plumbing, electrical and hardware. Mobile-first Next.js App Router + Tailwind + shadcn. Search-first header, department/category navigation, responsive product grids, sidebar + mobile filters, product detail pages (gallery, specs, related products), and WhatsApp/Quote enquiry forms driven by local mock data (lib/data.js)."

backend:
  - task: "No custom backend (static/mock data only)"
    implemented: true
    working: "NA"
    file: "lib/data.js"
    stuck_count: 0
    priority: "low"
    needs_retesting: false
    status_history:
      - working: "NA"
        agent: "main"
        comment: "Catalog MVP uses local mock data in lib/data.js; no /api routes are used by the UI. Nothing to test on backend."

frontend:
  - task: "Home page (Hero, category departments, featured products, brands, footer)"
    implemented: true
    working: "NA"
    file: "app/page.js, components/Hero.jsx, components/Header.jsx, components/Footer.jsx"
    stuck_count: 0
    priority: "high"
    needs_retesting: true
    status_history:
      - working: "NA"
        agent: "main"
        comment: "Home renders hero, category cards, featured product carousels, brand strip, sticky WhatsApp button. Needs automated UI verification."

  - task: "Header search (SearchBar -> /search?q=)"
    implemented: true
    working: "NA"
    file: "components/SearchBar.jsx, components/SearchClient.jsx, app/search/page.js"
    stuck_count: 0
    priority: "high"
    needs_retesting: true
    status_history:
      - working: "NA"
        agent: "main"
        comment: "Typing a query and submitting should navigate to /search?q=<term> and show matching products (e.g. 'pipe', 'jaquar'). Empty/no-match should show EmptyState."

  - task: "Products listing with filters (sidebar desktop + sheet on mobile), sort, URL query sync"
    implemented: true
    working: "NA"
    file: "app/products/page.js, components/CatalogExplorer.jsx, components/Filters.jsx, components/ProductGrid.jsx"
    stuck_count: 0
    priority: "high"
    needs_retesting: true
    status_history:
      - working: "NA"
        agent: "main"
        comment: "Filter by category/brand/availability, sort, clear filters. Filter state should reflect in URL query params. Mobile filters open in a Sheet drawer."

  - task: "Category pages (/categories, /categories/[slug])"
    implemented: true
    working: "NA"
    file: "app/categories/page.js, app/categories/[slug]/page.js, components/CategoryCard.jsx"
    stuck_count: 0
    priority: "high"
    needs_retesting: true
    status_history:
      - working: "NA"
        agent: "main"
        comment: "Category index lists 10 categories; slug page (e.g. /categories/plumbing, /categories/sanitaryware) shows breadcrumbs + filtered grid. Invalid slug -> not-found."

  - task: "Brand pages (/brands, /brands/[slug])"
    implemented: true
    working: "NA"
    file: "app/brands/page.js, app/brands/[slug]/page.js, components/BrandCard.jsx"
    stuck_count: 0
    priority: "medium"
    needs_retesting: true
    status_history:
      - working: "NA"
        agent: "main"
        comment: "Brand index lists 9 brands; slug page (e.g. /brands/jaquar, /brands/havells) shows brand products."

  - task: "Product detail page (gallery, specs, availability badge, related products, WhatsApp enquiry)"
    implemented: true
    working: "NA"
    file: "app/products/[slug]/page.js, components/ProductGallery.jsx, components/ProductCarousel.jsx, components/WhatsAppButton.jsx"
    stuck_count: 0
    priority: "high"
    needs_retesting: true
    status_history:
      - working: "NA"
        agent: "main"
        comment: "e.g. /products/jaquar-single-lever-basin-mixer. Gallery thumbnails switch main image, specs table, related products carousel, 'Enquire on WhatsApp' link should be a wa.me href with prefilled text containing the product name. No prices or cart anywhere."

  - task: "Request Quote / Contact enquiry forms (validation + WhatsApp redirect)"
    implemented: true
    working: "NA"
    file: "app/request-quote/page.js, app/contact/page.js, components/EnquiryForm.jsx, lib/validation.js, lib/whatsapp.js"
    stuck_count: 0
    priority: "high"
    needs_retesting: true
    status_history:
      - working: "NA"
        agent: "main"
        comment: "Form should show validation errors on empty submit; on valid submit it shows success state and opens/generates a wa.me link (MOCKED - no backend submission). /request-quote?product=<slug> should prefill product."

  - task: "Sanity CMS integration: embedded Studio at /studio, lib/catalog.js async data layer with demo fallback, schemas, seed script"
    implemented: true
    working: true
    file: "sanity.config.js, sanity/**, lib/catalog.js, app/studio/[[...tool]]/page.js, components/SiteChrome.jsx, scripts/seed-sanity.mjs"
    stuck_count: 0
    priority: "high"
    needs_retesting: false
    status_history:
      - working: true
        agent: "main"
        comment: "All pages now read via lib/catalog.js (Sanity GROQ when NEXT_PUBLIC_SANITY_PROJECT_ID set, else lib/data.js demo). /studio renders setup screen when unconfigured (verified 200), NextStudio when configured (untested - awaiting user's Sanity keys). Production `next build` passes. Dev heap raised to 1400MB in package.json because Studio bundle OOMs at 512MB."

  - task: "Enquiry capture API POST /api/enquiries (Sanity + Google Sheets + Mongo backup) wired to EnquiryForm"
    implemented: true
    working: true
    file: "app/api/enquiries/route.js, lib/sheets.js, components/EnquiryForm.jsx"
    stuck_count: 0
    priority: "high"
    needs_retesting: false
    status_history:
      - working: true
        agent: "main"
        comment: "Verified: GET returns config flags; POST invalid -> 400 with field errors; POST valid -> 201 {stored:{sanity:'skipped',sheets:'skipped',mongo:'saved'}}. Browser flow verified: WhatsApp popup opens synchronously, then API saves and success UI shows 'received by our team'. Sanity/Sheets persistence untested until user provides credentials."

  - task: "Static pages, 404 and SEO routes (/about, /contact, not-found, /sitemap.xml, /robots.txt)"
    implemented: true
    working: "NA"
    file: "app/about/page.js, app/not-found.js, app/sitemap.js, app/robots.js"
    stuck_count: 0
    priority: "low"
    needs_retesting: true
    status_history:
      - working: "NA"
        agent: "main"
        comment: "Should return 200 (sitemap/robots) and custom 404 for unknown routes."

  - task: "Mobile responsiveness (375px) - header, mobile nav, filter sheet, sticky WhatsApp"
    implemented: true
    working: "NA"
    file: "components/Header.jsx, components/Filters.jsx, components/StickyWhatsApp.jsx"
    stuck_count: 0
    priority: "high"
    needs_retesting: true
    status_history:
      - working: "NA"
        agent: "main"
        comment: "Verify no horizontal overflow, mobile menu opens, filter drawer opens, sticky WhatsApp FAB visible."

metadata:
  created_by: "main_agent"
  version: "1.0"
  test_sequence: 1
  run_ui: true

test_plan:
  current_focus:
    - "Home page (Hero, category departments, featured products, brands, footer)"
    - "Header search (SearchBar -> /search?q=)"
    - "Products listing with filters (sidebar desktop + sheet on mobile), sort, URL query sync"
    - "Product detail page (gallery, specs, availability badge, related products, WhatsApp enquiry)"
    - "Request Quote / Contact enquiry forms (validation + WhatsApp redirect)"
    - "Category pages (/categories, /categories/[slug])"
    - "Mobile responsiveness (375px) - header, mobile nav, filter sheet, sticky WhatsApp"
  stuck_tasks: []
  test_all: true
  test_priority: "high_first"

agent_communication:
  - agent: "main"
    message: "2025-06 update: business renamed to Sri Ganesh Electricals. Added Sanity CMS (embedded /studio), async catalog layer with demo fallback, POST /api/enquiries (Sanity + Google Sheets + Mongo), DEPLOY.md, CMS-GUIDE.md, seed script, and project zip (sri-ganesh-electricals-website.zip). Production build passes. Sanity & Google credentials NOT yet provided by user -> those write paths are skipped gracefully. Frontend automated test run was paused by user; can be resumed on request."
  - agent: "main"
    message: "Catalog MVP complete; user has granted permission for automated frontend testing. No auth, no backend, no API keys. All data is local mock data (16 products, 10 categories, 9 brands). WhatsApp uses wa.me deep links (do not expect a real message send - just verify the href/URL contents). Please test on both desktop (1920) and mobile (375) viewports and report any broken flows, console errors, or layout issues."
