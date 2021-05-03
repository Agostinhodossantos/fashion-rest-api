const cors = require("cors")
const express = require("express")
const app = express()

const PORT = process.env.PORT || 4000
const initRoutes = require("./routes")

var corsOptions = {
    origin: "http://localhost:8081"
}

app.use(cors(corsOptions))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

initRoutes(app)


app.listen(PORT, () => {
    console.log(`API is running in ${PORT}`)
})