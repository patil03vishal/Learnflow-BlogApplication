const passport=require("passport");
const mongoose=require("mongoose");

const User=mongoose.model("users");

const GoogleStrategy = require("passport-google-oauth20").Strategy;


passport.use(
    new GoogleStrategy(
        {
            clientID:"619598599928-40esbs6b96ses3mvhis2o14kgmhv0hq8.apps.googleusercontent.com",
            clientSecret:"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",
            callbackURL:"/auth/google/callback",
        },
        async (accessToken, refreshToken, profile, done)=> {
            // console.log("Access Token", accessToken);
            // console.log("Refresh Token", refreshToken);
            // console.log("Profile", profile);

            const newUser = {
                googleID: profile.id,
                firstName: profile.name.givenName,
                lastName: profile.name.familyName,
                displayName: profile.displayName,
                email: profile.emails[0].value,
                image: profile.photos[0].value,
            };

            try {
                let user = await User.findOne({
                    googleID:profile.id
                });
                if(user){
                    // user exists
                    console.log("Exists",user);
                    done(null, user);
                }
                else{
                    //sign up first time
                    user=await User.create(newUser);
                    console.log("New",user);
                    done(null, user);
                }
            } catch (error) {
                console.log(error);
                done(error);
            }
        }
    )
);
    
passport.serializeUser((user, done) => {
    done(null, user.id);
});
  
passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (error) {
      done(error);
    }
});