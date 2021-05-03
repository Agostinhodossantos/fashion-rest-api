const express = require("express")
const cors = require("co")
const app = express()
const PORT = process.env.PORT || 4000
const routes = require("./routes")

var corsOptions = {
    origin: "http://localhost:8081"
}

app.use(cors(corsOptions))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

routes(app)


app.listen(PORT, () => {
    console.log(`API is running in ${PORT}`)
})