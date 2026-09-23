# 🌍 WanderStay

WanderStay is a full-stack web application inspired by Airbnb that allows users to discover, create, and manage travel accommodation listings. Users can securely register, upload property images, share reviews, and explore accommodations through a clean and responsive interface.

🚀 **Live Demo:** https://wanderstay-uumv.onrender.com

📂 **GitHub Repository:** https://github.com/Prachi-2407/WanderStay

---

## ✨ Features

### 🔐 User Authentication
- Secure user registration and login
- Session-based authentication using Passport.js
- Logout functionality
- Flash messages for success and error notifications

### 🏡 Listings
- Browse all accommodation listings
- View detailed listing information
- Create new listings
- Edit existing listings
- Delete listings
- Upload property images

### 🔍 Search & Category Filtering
- Search listings by destination, title, location, or country
- 11 interactive category filters with active state indicators
- Sorting by Price (Low to High, High to Low) and Newest
- Tax switch toggle to preview pricing with GST

### ❤️ Wishlist & Favorites
- Save favorite stays with a single click using the heart icon
- Dedicated Wishlist view to manage saved properties

### 📅 Booking & Reservations
- Interactive booking widget on listing pages
- Real-time pricing calculations based on selected dates and 18% GST
- "My Bookings" trip management with reservation status and cancellation

### 👤 User Profile Dashboard
- Personal profile view with member join date and hosting statistics
- Tabbed management for hosted listings, trip reservations, and saved wishlist items

### ⭐ Reviews & Ratings
- Add star ratings and detailed reviews
- Average star rating badges and review counts on listing cards and show page
- Review deletion with author authorization
- Server-side validation for review submissions

### 📷 Image Upload
- Cloud-based image storage using Cloudinary
- Secure file uploads with Multer

### 🗺️ Location Display
- View listing locations through an interactive map powered by Leaflet and OpenStreetMap

### 🛡️ Authorization
- Only authenticated users can create listings, reviews, and bookings
- Only listing owners can edit or delete their listings

### 🎨 User Interface
- Modern, responsive design using Bootstrap 5
- Clean and user-friendly interface with animated transitions

---

# 🛠️ Tech Stack

## Frontend
- HTML5
- CSS3 & Starability CSS
- Bootstrap 5
- JavaScript (ES6+)
- EJS & EJS-Mate
- Leaflet.js (OpenStreetMap)

## Backend
- Node.js
- Express.js (v5)

## Database & Session Storage
- MongoDB Atlas (Cloud)
- Local MongoDB (Offline/Local Development)
- Mongoose (v9)
- Connect-Mongo (Session Store)

## Authentication & Security
- Passport.js
- Passport Local
- Passport Local Mongoose
- Express Session

## Cloud Storage & File Handling
- Cloudinary
- Multer
- Multer Storage Cloudinary

## Geolocation & Mapping
- Leaflet.js
- OpenStreetMap
- Node-Geocoder

## Validation & Utilities
- Joi
- Connect Flash
- Method Override
- Dotenv

---

# 📂 Project Structure

```
WanderStay/
│
├── controllers/          # Business logic handlers
│   ├── bookings.js
│   ├── listings.js
│   ├── reviews.js
│   └── users.js
├── init/                 # Database seeding scripts & sample listings
│   ├── data.js
│   └── index.js
├── models/               # Mongoose schemas (Listing, Review, User, Booking)
│   ├── booking.js
│   ├── listing.js
│   ├── review.js
│   └── user.js
├── public/               # Static styles, client-side scripts, and assets
│   ├── css/
│   └── js/
├── routes/               # Express modular route endpoints
│   ├── booking.js
│   ├── listing.js
│   ├── review.js
│   └── user.js
├── utils/                # Async wrappers & custom error classes
│   ├── ExpressError.js
│   └── wrapAsync.js
├── views/                # EJS templates (bookings, listings, users, layouts)
│   ├── bookings/
│   ├── includes/
│   ├── layouts/
│   ├── listings/
│   └── users/
├── app.js                # App entry point, session setup & routes
├── cloudConfig.js        # Cloudinary & Multer configuration
├── middleware.js         # Auth guards, ownership & Joi validators
├── schema.js             # Joi validation schemas
├── package.json
└── README.md
```

---

# 🚀 Installation & Local Setup

### 1. Clone the repository

```bash
git clone https://github.com/Prachi-2407/WanderStay.git
```

### 2. Navigate to the project directory

```bash
cd WanderStay/MAJORPROJECT
```

### 3. Install dependencies

```bash
npm install
```

### 4. Create a `.env` file

Add the following environment variables:

```env
# Database Configuration
ATLASDB_URL=your_mongodb_atlas_connection_string
USE_LOCAL_DB=true  # Set to 'false' to use Atlas cloud, or 'true' for local mongodb://127.0.0.1:27017/wanderstay

# Session Secret
SECRET=your_session_secret

# Cloudinary Configuration
CLOUD_NAME=your_cloudinary_cloud_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_API_SECRET=your_cloudinary_api_secret
```

### 5. Seed sample data (Optional)

To populate your database with sample listings:

```bash
node init/index.js
```

### 6. Run the application

```bash
node app.js
```

or with automatic reload during development:

```bash
npx nodemon app.js
```

Visit:

```
http://localhost:8080
```

---

# 📸 Screenshots

<img width="1440" height="816" alt="Screenshot 2026-07-04 at 9 24 21 PM" src="https://github.com/user-attachments/assets/80842977-0888-43e4-9557-c5ebc936f0c1" />
<img width="1440" height="816" alt="Screenshot 2026-07-04 at 9 05 55 PM" src="https://github.com/user-attachments/assets/74fcf9c9-e1c7-4788-b864-f77ce8bcf457" />
<img width="1437" height="816" alt="Screenshot 2026-07-04 at 9 06 14 PM" src="https://github.com/user-attachments/assets/042e7d51-5c09-46c8-8019-258ab29faee6" />
<img width="1438" height="816" alt="Screenshot 2026-07-04 at 9 05 28 PM" src="https://github.com/user-attachments/assets/fb8eaa2e-9525-471c-9818-77bd3797ef83" />
<img width="1440" height="817" alt="Screenshot 2026-07-04 at 9 06 53 PM" src="https://github.com/user-attachments/assets/2ddd9e37-74dc-4f3c-8821-ecc12ff79fe8" />

---

# 📚 Key Learnings

- Built a scalable full-stack web application adhering to the **MVC (Model-View-Controller)** pattern.
- Implemented secure authentication and authorization using **Passport.js** and role-based route middleware.
- Designed a multi-model relational architecture connecting **Users**, **Listings**, **Reviews**, and **Bookings**.
- Implemented an end-to-end **Reservation & Booking Engine** with dynamic stay duration calculations, pricing breakdown, and 18% GST computation.
- Engineered dynamic aggregation logic to compute real-time average star ratings and profile dashboard hosting statistics.
- Integrated **Cloudinary** for image upload and **OpenStreetMap with Leaflet** for geospatial map visualization.
- Supported dual database adaptability allowing seamless toggling between local MongoDB and MongoDB Atlas cloud.
- Applied robust server-side validation using **Joi** schemas and custom Express error handling.
- Deployed the application on **Render**.

---

# 🚀 Future Enhancements

- 💳 **Online Payment Gateway**: Integrate Stripe / Razorpay for secure card and UPI transactions.
- 💬 **Host & Guest Messaging**: Real-time in-app chat for guests and property hosts.
- 🗓️ **Availability Calendar**: Date blocking to automatically disable already booked dates in the booking widget.
- 📄 **Pagination & Infinite Scroll**: Optimize rendering performance for large volumes of listings.
- 🔑 **OAuth Social Login**: One-click authentication with Google and GitHub.
- 📧 **Email Notifications**: Automated booking confirmation receipts and trip reminders.
- 📱 **Progressive Web App (PWA)**: Offline caching and mobile install capability.

---

# 👩‍💻 Author

**Prachi**

- GitHub: https://github.com/Prachi-2407

---

# 📄 License

This project is developed for learning purposes and personal portfolio use.

---

⭐ **If you like this project, consider giving it a star!**
