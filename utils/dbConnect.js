import mongoose from 'mongoose';

// const dbConnect = handler => async (req, res) => {
//     if (mongoose.connections[0].readyState) {
//       // Use current db connection
//       return handler(req, res);
//     }
//     // Use new db connection
//     await mongoose.connect(process.env.MONGODB_URI, {
//       useUnifiedTopology: true,
//       useFindAndModify: false,
//       useCreateIndex: true,
//       useNewUrlParser: true
//     });
//     return handler(req, res);
//   };

//   export default dbConnect;

const connection = {};

async function dbConnect() {
  if (connection.isConnected) {
    return;
  }
  const db = mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  connection.isConnected = mongoose.connection.readyState;
}
export default dbConnect;
