# 💳 Subscription Tracker

A modern backend project to **track your subscriptions**, **calculate renewal dates**, and **send smart email reminders** — built with ❤️ using **Node.js, Express, MongoDB & Upstash Workflows**.

---

## ⚙️ Features
- 🧾 Add, view, update, and cancel subscriptions
- 🔐 Secure user authentication using JWT
- 📅 Auto-calculate renewal dates based on plan frequency
- ⏰ Automated reminder workflow with **Upstash Workflows**
- 📧 Beautiful HTML reminder emails using **Nodemailer + Day.js**
- 🧠 Clean architecture with modular controllers, routes, and utils
- 🧰 Fully environment-configurable and dev-ready setup

---

## 🧠 Tech Stack
- **Backend:** Node.js + Express
- **Database:** MongoDB (Mongoose ODM)
- **Auth:** JSON Web Tokens (JWT)
- **Scheduler:** Upstash Workflows
- **Mailer:** Nodemailer
- **Date Handling:** Day.js

---

## 🚀 Getting Started

### 1️⃣ Clone the Repo
git clone https://github.com/badalsahani20/Subscription-Tracker.git
cd Subscription-Tracker

### 2️⃣ Install Dependencies
npm install

### 3️⃣ Set Up Environment
Create a `.env` file and fill in:
PORT=5500
DB_URI=mongodb://localhost:27017/subscriptions
JWT_SECRET=your_secret
QSTASH_URL=https://qstash.upstash.io
QSTASH_TOKEN=your_qstash_token
SERVER_URL=http://localhost:5500
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_email_password

### 4️⃣ Run the Dev Server
npm run dev

Server will start on **http://localhost:5500**

---

## 💌 Email Reminder Flow
1. When a new subscription is added, a workflow triggers reminder jobs.
2. Emails are sent **7, 5, 2, and 1 day** before renewal.
3. Templates are fully dynamic — showing plan name, price, and payment info.
4. All reminders handled automatically via **Upstash Workflows** ⚡

---

## 🧾 Example Reminder Email
> “Hello Badal, your Spotify Premium plan renews on Nov 27.
> You’ll be charged ₹129 via UPI.
> Manage or cancel anytime before renewal.”

Clean, modern, and professional 💙

---

## 🧑‍💻 Author
**Badal Sahani**
💻 Java & Spring Boot Developer | MERN Stack Explorer
🔗 GitHub: https://github.com/badalsahani20

---

## 🪄 Summary
✔ Complete backend project
✔ Fully working workflows & email system
✔ Ready for deployment

✨ *“Never miss another renewal again — stay SubDub’d!”*
