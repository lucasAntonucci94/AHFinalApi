import  express  from 'express'
import AnimalRoute from './routes/animals.route.js'
import SpecieRoute from './routes/species.route.js'
import RaceRoute from './routes/races.route.js'
import AuthRoute from './routes/auth.route.js'
import cors from 'cors'

const app = express()
app.use(cors())

app.use(express.json())
app.use('/', AnimalRoute)
app.use('/', SpecieRoute)
app.use('/', RaceRoute)
app.use('/api', AuthRoute)

app.listen(2030, function(){
    console.log('API: Se conecto al puerto 2030 correctamente. http://localhost:2030 ')
})