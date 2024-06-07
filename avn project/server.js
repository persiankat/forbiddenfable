const express = require('express');
const multer = require('multer');
const path = require('path');
const app = express();
const PORT = 3000;

// Set up storage engine for Multer
const storage = multer.diskStorage({
    destination: './uploads/',
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

// Initialize upload variable
const upload = multer({
    storage: storage,
    limits: { fileSize: 1000000 }, // 1MB limit
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
    }
}).single('image');

// Check file type
function checkFileType(file, cb) {
    const filetypes = /jpeg|jpg|png|gif/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb('Error: Images Only!');
    }
}

// Serve static files
app.use(express.static('./public'));
app.use('/uploads', express.static('uploads'));

// Route to upload page
app.get('/upload', (req, res) => res.sendFile(path.join(__dirname, 'public', 'upload.html')));

// Handle image upload
app.post('/upload', (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            res.send(`Error: ${err}`);
        } else {
            if (req.file == undefined) {
                res.send('Error: No File Selected!');
            } else {
                res.send(`File Uploaded! <a href="/">Go Back</a>`);
            }
        }
    });
});

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
