import mongoose from "mongoose";
export class DBUtil {
  public static connectToDB(dbName: string, dbUrl: string): Promise<string> {
    return new Promise((resolve, reject) => {
      mongoose.connect(dbUrl, {
        dbName: dbName,
      });
    });
  }
}
