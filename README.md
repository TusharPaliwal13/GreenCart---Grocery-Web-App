🛒 GreenCart – MERN Stack E-commerce Website
GreenCart is a full-stack e-commerce web application built using React, Node.js, Express, MongoDB, and Stripe, enabling users to browse products, manage cart, place orders via Cash on Delivery or online payment, and sellers to manage their products.

🚀 Live Demo
🌐 View Live Site - https://greencart-jet-five.vercel.app/

📂 Features
✅ User authentication (JWT + Cookies)
✅ Seller authentication and product management
✅ Product listing with images, offers, weights
✅ Add to Cart, remove from Cart, update quantity
✅ Save and select multiple delivery addresses
✅ Place orders with Cash on Delivery
✅ Secure online payments via Stripe Checkout
✅ View past orders
✅ Fully responsive design

🛠️ Tech Stack
Frontend: React.js, Tailwind CSS

Backend: Node.js, Express.js

Database: MongoDB with Mongoose

Authentication: JWT, Cookies (httpOnly, secure, sameSite configurations)

File Uploads: Multer + Cloudinary

Payments: Stripe Checkout API

Deployment: Vercel (Frontend + Backend), Cloudinary (Images)

⚙️ Environment Variables
Create a .env file in the root directory and add:

ini
Copy
Edit
PORT=4000
MONGODB_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
STRIPE_SECRET_KEY=your_stripe_secret_key
NODE_ENV=production

📁 Project Structure
bash
Copy
Edit
/client           // React frontend
  /components
  /pages
  /context

/server           // Express backend
  /controllers
  /models
  /routes
  /middlewares
  server.js

.env
package.json
README.md
💻 Local Setup
Clone repository

bash
Copy
Edit
git clone https://github.com/yourusername/greencart.git
cd greencart
Install dependencies

bash
Copy
Edit
# For backend
cd server
npm install

# For frontend
cd ../client
npm install
Add environment variables

Create .env in /server with values as shown above.

Run the project

bash
Copy
Edit
# Start backend
cd server
npm run dev

# Start frontend
cd ../client
npm run dev
Visit http://localhost:5173.

📸 Screenshots

Landing Page <img width="1269" height="592" alt="image" src="https://github.com/user-attachments/assets/3dddfdeb-d1ea-4f35-b787-fa15397d4ad5" />


Product Details <img width="1265" height="590" alt="image" src="https://github.com/user-attachments/assets/39186b41-01c2-48e2-b01a-335b339dca0a" />


Cart Page <img width="1262" height="542" alt="image" src="https://github.com/user-attachments/assets/0473cb0d-bd72-44b2-8113-535ffd08ea9c" />


Different Payment Methods ( Online / COD ) <img width="1262" height="541" alt="image" src="https://github.com/user-attachments/assets/aeb05367-fd47-4329-aad2-fff59c574b19" />


Stripe Checkout <img width="1278" height="572" alt="image" src="https://github.com/user-attachments/assets/12788703-c44e-469d-af52-094ece2d9555" />


Orders Dashboard <img width="1261" height="584" alt="image" src="https://github.com/user-attachments/assets/cffcc12e-bf69-41bd-ac68-dd7bee0af851" />


✨ Future Improvements
Admin dashboard for sellers

Search and filter products

Product reviews and ratings

Wishlist functionality

OTP email verification

**👨‍💻 Authors**

Tushar Paliwal
LinkedIn - https://www.linkedin.com/in/tushar-paliwal-592418138/  | GitHub - https://github.com/TusharPaliwal13

Yash Sahu 
Linkedin- https://www.linkedin.com/in/yash-sahu-9198462a2 | GitHub- https://github.com/Yashsahu22 

Sushil Lohar
Linkedin - https://www.linkedin.com/in/sushil-lohar-90a33a25a | Github - https://github.com/code-with-sushil09

Sumit Prajapat
Linkedin - | Github -



⭐ If you find this project helpful, please star it on GitHub!
