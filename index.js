const express = require('express')
const path = require('path')
const ejs = require('ejs')
const bcrypt = require('bcrypt')
const multer = require('multer')
const fs = require('fs');
const app = express();
const AuthRoutes = require("./routes/auth.routes");
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.set('view engine','ejs');
const collection = require('./config')
const uploads = require('./middlewares/fileupload');

app.use(express.static(path.join(__dirname, 'public')));

app.use("/uploads", express.static(path.join(__dirname, "uploads")));
        
app.use("/auth", AuthRoutes);
app.get('/upload',(req,res)=>{
    res.render('upload')
})

// app.post('/signup',async (req,res)=>{
    // const data ={
    //     firstName:req.body.firstName,
    //     lastName:req.body.lastName,
    //     email:req.body.email,
    //     password:req.body.password
    // }
    // const existingUser=await collection.findOne({email: data.email});
    // if(existingUser) {
    //    return res.send("<h1>User already Exists</h1>")
    // }else{
    //     const saltRounds = 10;
    //     const hashedPassword= await bcrypt.hash(data.password,saltRounds);
    //     data.password = hashedPassword;
    //     const userData = await collection.insertMany(data);
    //     console.log(userData);
    // } 
    // res.redirect('/');
// })



app.get('/reset-password',(req,res)=>{
    res.render('forgot-password')
});

app.get('/email',(req,res)=>{
    res.render('email')
})

// app.post('/email', async (req, res) => {
//     const { email} = req.body;

    
//         // Find the user
//         const user = await collection.findOne({ email });
//         if (!user) {
//             return res.status(404).send('User not found');
//         } else {
//             app.get('/password',(req,res)=>{
//                 console.log('redirecting to pass page');
                
//             })
//             res.render('password',{email})
           
//         }
//     });

// app.post('/password', async (req, res) => {
//     const { email, newPassword } = req.body;

//     try {
//         // Find the user
//         const user = await user.findOne({ email });
//         if (!user) {
//             return res.status(404).send('User not found');
//         }

//         // Hash the new password
//         const hashedPassword = await bcrypt.hash(newPassword, 10);

//         // Update the user's password
//         user.password = hashedPassword;
//         await user.save();

//         res.send('Password updated successfully');
//     } catch (error) {
//         res.status(500).send('Error updating password');
//     }
// });

app.post('/email', async (req, res) => {
    const { email } = req.body;

    // Find the user by email
    const user = await collection.findOne({ email });
    if (!user) {
        return res.status(404).send('User not found');
    }

    // Render the password update form
    res.render('password', { email });
});

// Route to handle password update
app.post('/password', async (req, res) => {
    const { email, newPassword } = req.body;

    try {
        // Find the user by email
        const user = await collection.findOne({ email });
        if (!user) {
            return res.status(404).send('User not found');
        }

        // Hash the new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Update the user's password
        user.password = hashedPassword;
        await user.save();

        res.send('Password updated successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error updating password');
    }
});



// Set up storage for multer


// Initialize multer with the defined storage


// Route to handle multiple file uploads
app.post('/upload', uploads.array('files', 10), (req, res) => {
    const files = req.files;

    if (!files || files.length === 0) {
        return res.status(400).json({ error: 'No files uploaded' });
    }

    res.status(200).json({
        message: 'File upload successful',
        files: files.map(file => file.filename)
        
        
    });
    
});


app.listen(5000, () => console.log("Server Running at port 5000"));

