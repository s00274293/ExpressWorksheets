import { connectDB} from "../config/database";
import { disconnectDB } from "../config/database";

beforeAll(async () => {
    console.log('Run once before tests');
   await connectDB();

});

afterAll(async () => {
    console.log('Run once after tests');
   await disconnectDB();
});
