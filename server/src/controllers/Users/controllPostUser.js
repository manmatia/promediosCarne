const { Users } = require("../../db.js");


const controllPostUser = async (req) => {
  const { clerkId, user, fullName } = req.body;


  let emailAddress = user.emailAddresses[0].emailAddress;
  
 
  const [newUser] = await Users.findOrCreate({
    where: {
      clerkId,
      fullName,
      emailAddress,
    },
  });



  return newUser;
};

module.exports = controllPostUser;