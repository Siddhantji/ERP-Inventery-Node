const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const userRoutes = require('./routes/user.route');
const companyRoutes = require("./routes/company.route");
const bankRoutes = require("./routes/bank.routes");
const warehouseRoutes = require('./routes/wareHouse.route');
const reportRoutes = require('./routes/report.routes');



dotenv.config();

const app = express(); 

app.use(cors({ origin: '*', optionsSuccessStatus: 200 }));
app.use('/uploads', express.static('uploads'));
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('MongoDB connected');
}).catch(err => {
    console.error('MongoDB connection error:', err);
});

// Multer setup
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = 'uploads/';
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
        }
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        const fileName = `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`;
        cb(null, fileName);
    }
});

const fileFilter = (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|gif|pdf|doc|docx|csv/;
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = fileTypes.test(file.mimetype);
    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb('Error: Allowed file types are jpeg, jpg, png, gif, pdf, doc, docx, csv!');
    }
};

const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, 
    fileFilter: fileFilter
});

// Routes
const tenderRoutes = require('./routes/tenderRoutes');
const vendorRouter = require('./routes/vendorRoutes');
const productRoutes = require('./routes/productRoutes')
const clientRouter = require('./routes/clientRoutes');
const proposalRoutes = require('./routes/proposalRoutes');
const inventoryRoutes = require('./routes/inventoryRoutes');
const purchaseOrderRoutes = require('./routes/purchaseOrderRoutes');
const quotationRoutes = require('./routes/qoutationRoutes');
const dashboardRoutes=require('./routes/dashboardRoute');
const replenishmentRoues = require('./routes/replenishment.routes');
 

app.get("/", (req, res) => {
  res.send(`
    <html>
      <head><title>Inventory</title></head>
      <body>
        <h1>Welcome to Inventory</h1>
      </body>
    </html>
  `);
});

app.use('/api/tenders', tenderRoutes);
app.use('/api/vendor', vendorRouter);
app.use('/api/client', clientRouter);
app.use('/api/products',productRoutes);
app.use('/api/inventory',inventoryRoutes);
app.use("/api/proposals",proposalRoutes); 
app.use('/api/purchase-orders', purchaseOrderRoutes); 
app.use('/api/quotations', quotationRoutes); 
app.use('/api/users', userRoutes);
app.use('/api/dashboard',dashboardRoutes);
app.use("/api/company", companyRoutes);
app.use("/api/bank", bankRoutes);
app.use("/api/warehouse", warehouseRoutes);
app.use("/api/report", reportRoutes);
app.use("/api/replenishment", replenishmentRoues);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`);
});


