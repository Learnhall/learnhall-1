# Learnhall

Learnhall is an online tutoring platform designed to connect students and tutors seamlessly. This platform provides a user-friendly interface, a wide range of subjects, and flexible options for tutoring sessions.

---

## Table of Contents

1. [Project Features](#project-features)  
   - [Home Page](#home-page)  
   - [Forms](#forms)  
   - [FAQs and Reviews](#faqs-and-reviews)  
   - [Footer](#footer)  
2. [Development Overview](#development-overview)  
   - [Technologies Used](#technologies-used)  
3. [Project File Structure](#project-file-structure)  
4. [Developer Guidelines](#developer-guidelines)  
   - [Branching Workflow](#branching-workflow)  
5. [How to Set Up the Project](#how-to-set-up-the-project)  
6. [Deployment Notes](#deployment-notes)  

---

## Project Features

### Home Page
- A user-friendly interface featuring:
  - **Tutor Hiring Forms**: Powered by Formspree, bypassing redirection errors using AJAX for smoother form submission.
  - **Steps to Get Started**: Implemented with Vue.js for dynamic rendering.
  - **FAQs Section**: Clearly outlines how Learnhall works.

---

### Forms

#### Two Types:
1. **Student Form**: For individuals seeking tutoring services.
2. **Tutor Form**: For those wishing to join Learnhall as tutors.

#### Validation:
- Utilizes client-side regular expressions for fields like:
  - Name
  - Email
  - Phone Number
  - Location  

#### AJAX Integration:
- Prevents Formspree’s redirect to an error page upon submission.
- Displays dynamic error and thank-you messages using overlay components.

---

### FAQs and Reviews

#### FAQs Section:
- Powered by the `FAQs` object in Vue.js for a dynamic and interactive interface.
- Displays answers without requiring a page refresh.

#### Reviews Section:
- Managed via the `parents_reviews` object in Vue.js.
- Includes animations for smooth transitions.

---

### Footer
- **Social Media**:
  - Active links to Learnhall’s pages on various platforms.
- **Quick Contact Options**:
  - Easy access to email and phone contact information.

---

## Development Overview

### Technologies Used
- **HTML**: Structures the webpage UI.  
- **CSS**: Styles components and ensures responsive design.  
- **JavaScript**: Handles interactivity and animations.  
- **Vue.js**: Imported via a script tag to manage dynamic rendering.  
- **jQuery & AJAX**: Enhances form submissions and handling.  
- **Formspree**: Simplifies form integration.  
- **Custom Animations**: Organized in a dedicated JavaScript file.

---

## Project File Structure

```plaintext
📁 Root Directory     
├── 📂 CSS Files        # Layouts, colors, and responsive styles.
├── 📂 Font Files 
├── 📂 Images Files 
├── 📂 Javascript Files
├── 📂 Pages Files 
├── 📂 Video Files 
│   ├── Index.html  
├── 📄 Figma Design     # Link included as a .txt file.
