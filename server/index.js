import express from "express"
import "./models/db.connect.js"
import  dotenv  from "dotenv"
import cookieParser from "cookie-parser";
import authRouter from "./routes/AuthRouter.js"
import cors from "cors"
import NoteRouter from "./routes/NoteRouter.js"
dotenv.config();

const app = express();

const PORT = process.env.PORT || 8080
app.listen(PORT ,()=>{
    console.log("SERVER STARTED!!")
    
})

app.use(express.json())
app.use(express.urlencoded({ extended: true })); 
app.use(cookieParser())
app.use(cors({
    origin: "http://localhost:5173",
    credentials:true,
    
})
)

app.use("/api/auth",authRouter)
app.use("/api/note",NoteRouter)

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500
    const message = err.message || "Internal Serer Error"
  
    return res.status(statusCode).json({
      success: false,
      statusCode,
      message,
    })
  })

  app.get('/protected-route', (req, res) => {
    console.log(req.user); // This logs the user object to the console
    res.send(req.user);     // This sends the user object in the response for visibility
  });
  
