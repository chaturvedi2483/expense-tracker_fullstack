# 💰 ExpenseTracker - Smart Money Management

A modern, full-stack expense tracking application built with React and Node.js featuring an attractive UI and comprehensive financial management capabilities.

## ✨ Features

### 🎨 **Modern UI/UX**
- **Glass morphism design** with backdrop blur effects
- **Gradient backgrounds** and smooth animations
- **Responsive design** for all devices
- **Interactive hover effects** and micro-interactions
- **Professional color scheme** with proper contrast

### 💼 **Financial Management**
- **Income tracking** with multiple categories
- **Expense monitoring** with detailed categorization
- **Real-time balance calculation**
- **Visual charts** for financial trends
- **Transaction history** with recent activity

### 🔧 **CRUD Operations**
- **Add** new income and expense records
- **View** all transactions with filtering
- **Update** existing records with inline editing
- **Delete** records with confirmation dialogs

### 📊 **Analytics & Insights**
- **Interactive charts** showing income vs expenses
- **Min/Max range** calculations for both income and expenses
- **Balance tracking** with positive/negative indicators
- **Recent transaction history**

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud)
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd expense-tracker
```

2. **Install Backend Dependencies**
```bash
cd backend
npm install
```

3. **Install Frontend Dependencies**
```bash
cd ../frontend
npm install
```

4. **Setup Environment Variables**
Create a `.env` file in the backend directory:
```env
PORT=5000
MONGO_URL=mongodb://localhost:27017/expense-tracker
JWT_SECRET=your-super-secret-jwt-key-here-make-it-long-and-complex
```

5. **Start MongoDB**
Make sure MongoDB is running on your system.

6. **Run the Application**

**Backend (Terminal 1):**
```bash
cd backend
npm start
```

**Frontend (Terminal 2):**
```bash
cd frontend
npm start
```

7. **Access the Application**
Open your browser and navigate to `http://localhost:3000`

## 🏗️ Project Structure

```
expense-tracker/
├── backend/
│   ├── controllers/
│   │   ├── income.js
│   │   └── expense.js
│   ├── models/
│   │   ├── IncomeModel.js
│   │   └── ExpenseModel.js
│   ├── routes/
│   │   └── transactions.js
│   ├── db/
│   │   └── db.js
│   ├── app.js
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── Components/
│   │   │   ├── Dashboard/
│   │   │   ├── Income/
│   │   │   ├── Expenses/
│   │   │   ├── Form/
│   │   │   ├── Navigation/
│   │   │   └── Chart/
│   │   ├── context/
│   │   │   └── globalContext.js
│   │   ├── styles/
│   │   │   └── GlobalStyle.js
│   │   └── utils/
│   └── package.json
└── README.md
```

## 🎯 API Endpoints

### Income Endpoints
- `GET /api/v1/get-incomes` - Get all income records
- `POST /api/v1/add-income` - Add new income
- `PUT /api/v1/update-income/:id` - Update income record
- `DELETE /api/v1/delete-income/:id` - Delete income record

### Expense Endpoints
- `GET /api/v1/get-expenses` - Get all expense records
- `POST /api/v1/add-expense` - Add new expense
- `PUT /api/v1/update-expense/:id` - Update expense record
- `DELETE /api/v1/delete-expense/:id` - Delete expense record

## 🎨 UI Components

### **Dashboard**
- Financial overview with key metrics
- Interactive charts showing trends
- Recent transaction history
- Income/Expense range insights

### **Income Management**
- Add new income sources
- Edit existing income records
- Category-based organization
- Visual amount formatting

### **Expense Tracking**
- Track various expense categories
- Update expense details
- Delete with confirmation
- Mobile-responsive design

### **Navigation**
- Glass morphism sidebar
- Active state indicators
- Smooth hover animations
- User-friendly icons

## 🛠️ Technologies Used

### **Frontend**
- React 18
- Styled Components
- Chart.js & React-Chartjs-2
- React DatePicker
- Axios for API calls
- Font Awesome icons

### **Backend**
- Node.js
- Express.js
- MongoDB with Mongoose
- CORS enabled
- RESTful API design

## 📱 Responsive Design

The application is fully responsive and works seamlessly on:
- **Desktop** (1200px+)
- **Tablet** (768px - 1199px)
- **Mobile** (320px - 767px)

## 🎨 Design Features

- **Glass morphism effects** with backdrop blur
- **Gradient backgrounds** and smooth transitions
- **Hover animations** and micro-interactions
- **Professional color palette** with proper contrast
- **Modern typography** using Inter font
- **Card-based layouts** with shadows and borders

## 🚀 Deployment Options

### **Frontend Deployment**
- Netlify (recommended)
- Vercel
- GitHub Pages

### **Backend Deployment**
- Heroku
- Railway
- DigitalOcean
- AWS EC2

### **Database Options**
- MongoDB Atlas (cloud)
- Local MongoDB
- Docker container

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Font Awesome for icons
- Google Fonts for typography
- Chart.js for data visualization
- React community for excellent libraries

---

**Built with ❤️ using React and Node.js**