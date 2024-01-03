import express, {Application, Response} from 'express'

const app: Application = express()
const port = process.env.PORT || 8080

app.get('/isAlive', (res: Response) => {
    res.status(200).json("OK")
})

app.get('/isReady', (res: Response) => {
    res.status(200).json("OK")
})

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`)
})