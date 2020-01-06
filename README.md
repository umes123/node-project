# Node js/ Mongo DB Task
# I hosted my code in AWS.

1. API to do registration.  Please accept the registration data from user (email , password, DOB,username,role) 
   and save them to MONGO DB. send back any error /success as response.
  
  # Register
  
  # API endPoint: http://3.6.66.243:3000/register
  # Method      : POST
  
  # requestBody: 
  {
	"DOB": "04/02/1994",                   // must follow this format (regex implemented)
	"email": "dmoharana4@gmail.com",      // email validation implemented (regex)
	"password":"Banda@12",             // password will be stored in DB after Hashing (min 8 letter password, with at least a symbol, upper and lower case letters and a number)
	"username": "Debasish", // username is unique (If another user tries to register with same username then it will throw error)
	"role": "Admin"            // must be one of ("Admin" or "User") case sensitive
 }                       //(All the fields are required)
 
 # SuccessResponse :
{
    "message": "Registerd successfuly"
}

2. Implement the Login authentication with JWT. Accept username/password and ensure the jwt token generated and used to 
   authenticate the CRUD API calls, if user not passing JWT token then you are not authorised message should come as response.
   Once Login is successful , Send back the JWT token as {"token":xxxxxxx, message:"success"}
   
  # Login
   
  # API endPoint: http://3.6.66.243:3000/login
  # Method      : POST
    
  # requestBody: 
  {
	"password":"Banda@12",   // (If password doesn't match then it will throw error "Wrong Password")
	"username": "Debasish"   // (If user doesn't exists then it will throw error "User doesn't exist")
  }
  
  # SuccessResponse
  {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTExZjE5ODhmMjhlYjUzMWQ5YjllOTIiLCJyb2xlIjoiQWRtaW4iLCJpYXQiOjE1NzgyMzQyODd9.gbxX_2vxGGz1rXagBu3at2OqEVtgT_RqBAPf_vs_dGo",
    "message": "success"
}


3. Once user successfully login with jwt token verified , Use this token and make a API call with 
   route name (http://xx.x.x.x:PORT/balanced) which accepts the parenthesis as input. 
   ( Ex: User passes {[]} as input and system should take this and perform  balanced or unbalanced paranthesis.
   
  # isBalanced (First you have to login then hit this API)
  
  # API endPoint: http://3.6.66.243:3000/balanced   (Have to pass token in header as "access_token: token")
  # Method      : POST
  
  # requestHeaders :
   access_token:token
   
  # requestBody: 
 {
	"input": "{()}]"
 }
 
 # failureResponse :
{
    "username": "Debasish",
    "message": "Not Balanced",
    "attempts": 1
}

  # requestBody: 
 {
	"input": "{()}"
 }
 
 # SuccessResponse :
{
    "username": "Debasish",
    "message": "Balanced",
    "attempts": 2
}


4. Write an API to list all the registered users in DB (pass admin role JWT token)

  # getUserLists
   
  # API endPoint: http://3.6.66.243:3000/getAllUsers
  # Method      : GET
  
  # requestHeaders :
   access_token:token (admin User)
  
  # SuccessResponse
  {
    "Users": [
        {
            "email": "dmoharana4@gmail.com",
            "password": "$2b$10$uKScd/R0U.DG43TcatwAaOaHkvRW/ETJ17pCuLsv1E1odYkTTpkwa",
            "DOB": "04/02/1994",
            "username": "Debasish",
            "role": "Admin"
        }
    ]
}

# requestHeaders :
   access_token:token (Not admin User)
  
# FailureResponse
  {
    "error": [
        {
            "description": "You are not authorised",
            "additionalInfo": "Only Admin has access to perform this task"
        }
    ]
}


5. Write an API to delete the registered user with admin login(pass admin role JWT token )

  # removeUser
   
  # API endPoint: http://3.6.66.243:3000/removeUser
  # Method      : DELETE
  
  # requestHeaders :
   access_token:token (admin User)
  
  # SuccessResponse
  {
    "message": "User removed successfuly"
  }

# requestHeaders :
   access_token:token (Not admin User)
  
# FailureResponse
  {
    "error": [
        {
            "description": "You are not authorised",
            "additionalInfo": "Only Admin has access to perform this task"
        }
    ]
}
6. Expected clean and crispy code. if possible please setup 

On the basis of time I had , this is the way I code. 

7. miscellaneous

# If you messedUp something then don't worry
Hit this API every user will be removed from DB so you can start from the begining again

  # removeAllUser
   
  # API endPoint: http://3.6.66.243:3000/removeAllRecords
  # Method      : DELETE
 
  
  # SuccessResponse
  {
    "message": "AllDocuments deleted successfuly"
  }
