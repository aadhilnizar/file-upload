
function getLoginPage(req,res) {
    return res.render('login')
}

async function loginUser(req, res) {
    try {
        const user = await collection.findOne({email: req.body.email });
        if (!user)
            return res.send('User not found');

        const passmatch = await bcrypt.compare(req.body.password, user.password);
        if (passmatch) {
            return res.redirect('library')
        } else {
            return res.send('wrong email/password')
        }
    } catch(error) {
        res.status(500).send("Something went wrong");   
    }
}

module.exports = {
    loginUser,
    getLoginPage
}

  function getSignupPage(req,res) {
    return res.render('signup')
}

 async function SignupUser(req,res){
    const data ={
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        email:req.body.email,
        password:req.body.password
    }
    const existingUser=await collection.findOne({email: data.email});
    if(existingUser) {
       return res.send("<h1>User already Exists</h1>")
    }else{
        const saltRounds = 10;
        const hashedPassword= await bcrypt.hash(data.password,saltRounds);
        data.password = hashedPassword;
        const userData = await collection.insertMany(data);
        console.log(userData);
    } 
    res.redirect('/login');

}
module.exports = {
    getSignupPage,
    SignupUser
}
