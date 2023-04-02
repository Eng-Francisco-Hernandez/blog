import { connect, connection } from "mongoose";

const connectionDetails = {
  isConnected: 0,
};

export async function connectToDb() {
  if (connectionDetails.isConnected === 1) return;
  const dbConnection = await connect(process.env.MONGODB_URL!);
  connectionDetails.isConnected = dbConnection.connections[0].readyState;
}

connection.on("error", (err) => {
  console.log(`Error connecting to DB: ${err}`);
});
