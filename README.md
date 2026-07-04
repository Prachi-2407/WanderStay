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

### ⭐ Reviews & Ratings
- Add ratings and reviews
- Delete reviews
- Server-side validation for review submissions

### 📷 Image Upload
- Cloud-based image storage using Cloudinary
- Secure file uploads with Multer

### 🗺️ Location Display
- View listing locations through an interactive map

### 🛡️ Authorization
- Only authenticated users can create listings and reviews
- Only listing owners can edit or delete their listings

### 🎨 User Interface
- Responsive design using Bootstrap 5
- Category-based listing filters
- Clean and user-friendly interface

---

# 🛠️ Tech Stack

## Frontend
- HTML5
- CSS3
- Bootstrap 5
- JavaScript
- EJS

## Backend
- Node.js
- Express.js

## Database
- MongoDB Atlas
- Mongoose

## Authentication
- Passport.js
- Passport Local
- Passport Local Mongoose
- Express Session

## Cloud Storage
- Cloudinary
- Multer
- Multer Storage Cloudinary

## Validation
- Joi

## Other Tools & Libraries
- Connect Flash
- Method Override
- Dotenv

---

# 📂 Project Structure

```
WanderStay/
│
├── controllers/
├── init/
├── models/
├── public/
│   ├── css/
│   └── js/
├── routes/
├── utils/
├── views/
├── app.js
├── middleware.js
├── cloudConfig.js
├── schema.js
├── package.json
└── README.md
```

---

# 🚀 Installation

### Clone the repository

```bash
git clone https://github.com/Prachi-2407/WanderStay.git
```

### Navigate to the project directory

```bash
cd WanderStay
```

### Install dependencies

```bash
npm install
```

### Create a `.env` file

Add the following environment variables:

```env
ATLASDB_URL=your_mongodb_connection_string

SECRET=your_session_secret

CLOUD_NAME=your_cloudinary_cloud_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_API_SECRET=your_cloudinary_api_secret
```

### Run the application

```bash
node app.js
```

or

```bash
nodemon app.js
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

- Built a full-stack web application following the MVC architecture.
- Implemented secure authentication and authorization using Passport.js.
- Designed RESTful APIs for listings and reviews.
- Integrated Cloudinary for image upload and storage.
- Used MongoDB Atlas with Mongoose for database management.
- Applied server-side validation using Joi.
- Managed environment variables securely using Dotenv.
- Deployed the application on Render.

---

# 🚀 Future Enhancements

- 🔍 Search listings by title or location
- ❤️ Wishlist/Favorites
- 👤 User profile page
- 📄 Pagination
- 📅 Booking functionality
- 📱 Enhanced mobile responsiveness

---

# 👩‍💻 Author

**Prachi**

- GitHub: https://github.com/Prachi-2407

---

# 📄 License

This project is developed for learning purposes and personal portfolio use.

---

⭐ **If you like this project, consider giving it a star!**
