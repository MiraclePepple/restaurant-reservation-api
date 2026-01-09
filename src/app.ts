import express, { Request, Response, NextFunction } from 'express'
import restaurantsRouter from './routes/restaurants'
import reservationsRouter from './routes/reservations'

const app = express()

app.use(express.json())

app.use('/restaurants', restaurantsRouter)
app.use('/reservations', reservationsRouter)

//Typed error handler
app.use((
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err)
  res.status(500).json({ error: err.message || 'Internal Server Error' })
})

export default app
