import { Client, Account } from "appwrite"; // ✅ Import Appwrite SDK

const client = new Client()
    .setEndpoint("https://cloud.appwrite.io/v1") // Use your Appwrite endpoint
    .setProject("67a35eff00248c4845c9"); // Your Appwrite project ID

const account = new Account(client);

export { account, client }; // ✅ Export for use in other scripts


