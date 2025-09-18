📚 Book Management App

A responsive Book Management Dashboard built with React (Vite + TypeScript), Ant Design, and React Query.
It demonstrates full CRUD operations, search, filters, pagination, loading states, and a professional UI — perfect for portfolios or real-world book inventory systems.

https://book-management-app-new.vercel.app/
✨ Features

📖 Dashboard: View and manage all books.

🔍 Search & Filters: Filter by title, author, genre, and status.

➕ Add / Edit Books with validation forms.

❌ Delete Books with confirmation popup.

🌀 Loading states: Skeletons & spinners for smooth UX.

🎶 Sound effects when opening popups (optional).

⚡ React Query for API fetching, caching, and mutations.

🎨 Ant Design + custom CSS for a modern, responsive design.

🛠️ Tech Stack

Frontend: React (Vite + TypeScript)

UI Library: Ant Design

State & Data: React Query

Backend (Mock API): JSON Server / CRUDCRUD API

Styling: Ant Design + custom CSS

📂 Project Structure
book-management-app/
│── public/              # Static assets (icons, sounds, etc.)
│── src/
│   ├── api/             # API calls (CRUD functions)
│   ├── components/      # Reusable components (Table, Form, Modal)
│   ├── hooks/           # React Query custom hooks
│   ├── pages/           # Dashboard page
│   ├── types/           # TypeScript types (Book, NewBook, etc.)
│   ├── utils/           # Utilities (e.g. playSound)
│   ├── App.tsx          # Root component
│   └── main.tsx         # Entry point
│── db.json              # Mock data (for JSON Server)
│── package.json
│── vite.config.ts
│── README.md
│── .gitignore

⚙️ Getting Started
1️⃣ Clone the repo
git clone https://github.com/your-username/book-management-app.git
cd book-management-app

2️⃣ Install dependencies
npm install

3️⃣ Start mock backend (JSON Server)
npx json-server --watch db.json --port 3001

4️⃣ Run the app
npm run dev


Now open 👉 http://localhost:5173

📸 Screenshots
<img width="1208" height="1210" alt="Book_Management_App" src="https://github.com/user-attachments/assets/9e21e567-5058-4d06-b870-4f32d729ae89" />
<img width="1226" height="1210" alt="localhost_5173_ (4)" src="https://github.com/user-attachments/assets/3fe6eb38-e5e5-4de0-8ddf-ced263c224f8" />
<img width="1226" height="1210" alt="localhost_5173_ (1)" src="https://github.com/user-attachments/assets/6ea021e9-5ddf-438e-b6c8-4007eadbb6b3" />
<img width="1226" height="1210" alt="localhost_5173_ (2)" src="https://github.com/user-attachments/assets/f78fb825-860a-47e4-918b-f8c1cb7d7eb0" />

( screenshots of your dashboard, add/edit modal, delete popup, etc.)

🚀 Deployment

You can easily deploy this project on Vercel or Netlify:

Push code to GitHub.

Import repo into Vercel/Netlify.

Configure build command: npm run build

Publish → Done 🎉

🧑‍💻 Author
Made with ❤️ by MohmadSohilkhan

If you like this project, ⭐ the repo and share feedback!
