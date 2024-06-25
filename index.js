import app from './app.js'
// import serverless from 'serverless-http'

// const handler = serverless(app)

// export default handler

app.listen(4000, () => {
  console.log("server running");
});