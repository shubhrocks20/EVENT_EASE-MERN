
---

# EVENT_EASE_MERN

## Overview

EVENT_EASE_MERN is a full-stack web application developed as a minor project for a B.Tech undergraduate program. This project addresses the challenge faced by college societies, groups, and cells in organizing and promoting events. Traditionally, these events rely on Google Forms and WhatsApp for dissemination. EVENT_EASE_MERN provides a dedicated platform for both students and teachers to manage events efficiently.

## Deployment

The application is deployed and can be accessed at [EVENT_EASE_MERN](https://event-ease-mern-frontend.onrender.com/).

## Features

- **User Authentication:** Secure login using college Wi-Fi credentials.
- **Event Management:** Create, update, delete, and view events.
- **Student Dashboard:** View upcoming events, participate with a single click, and track attended events.
- **Teacher Dashboard:** Organize events, check participant lists, and mark attendance.
- **Image Upload:** Utilize Cloudinary for event image uploads.
- **Responsive Design:** Optimized for both desktop and mobile devices using Tailwind CSS.

## Tech Stack

- **Frontend:** React, Redux, Tailwind CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** JWT, bcrypt
- **Image Upload:** Cloudinary
- **Styling:** Tailwind CSS

## ScreenShots 📷
![Screenshot 2024-05-18 121856](https://github.com/shubhrocks20/EVENT_EASE-MERN/assets/94545975/0345c9c1-7f11-42d3-a1f6-68f2aabca913)
![Screenshot 2024-05-18 121915](https://github.com/shubhrocks20/EVENT_EASE-MERN/assets/94545975/f9622050-d7e2-4932-854e-a38c6daaf1be)
![Screenshot 2024-05-18 121941](https://github.com/shubhrocks20/EVENT_EASE-MERN/assets/94545975/c8148cad-135a-4dd2-a423-5aa1e8239483)




## Installation

### Prerequisites

- Node.js
- MongoDB

### Steps

1. **Clone the repository:**
   ```bash
   git clone https://github.com/shubhrocks20/EVENT_EASE_MERN.git
   cd EVENT_EASE_MERN
   ```

2. **Install dependencies for both frontend and backend:**
   ```bash
   cd backend
   npm install
   cd ../frontend
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env` file in the `backend` directory and add the following:
   ```
   MONGO_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   ```

4. **Run the application:**
   ```bash
   cd backend
   npm start
   cd ../frontend
   npm start
   ```

   The backend server will run on `http://localhost:5000` and the frontend on `http://localhost:3000`.

## Usage

- **Register:** Create a new account using college Wi-Fi credentials.
- **Login:** Access your account using your credentials.
- **Create Event:** Teachers can fill out the event form to create a new event and upload images.
- **Manage Events:** View, update, or delete events.
- **Join Events:** Students can browse and join available events with a single click.

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Open a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact

For any inquiries or feedback, please reach out via [your email].

---

