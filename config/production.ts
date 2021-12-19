import { env } from "process"

export = {
  port: env.PORT || 5000,
  dbUri: (`mongodb+srv://${env.DB_USER}:${process.env.DB_PASSWORD && encodeURIComponent(process.env.DB_PASSWORD)}@restcounter.6iflh.mongodb.net/RestCounter?retryWrites=true&w=majority`),
}