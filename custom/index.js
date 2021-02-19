const admin = require('./node_modules/firebase-admin');
const serviceAccount = require("./serviceAccountKey.json");
// const documentNames = ["tablas_ranks", "state_progression", "stats", "category", "talents_tables", "talents_tables_pivot"]
const documentName = "talents_tables_pivot";
const data = require("./" + documentName + ".json");
const collectionKey = documentName; //name of the collection
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://the-dice-roll-default-rtdb.firebaseio.com"
});
const firestore = admin.firestore();
const settings = { timestampsInSnapshots: true };
firestore.settings(settings);
if (data && (typeof data === "object")) {
    Object.keys(data).forEach(docKey => {
        firestore.collection(collectionKey).doc(docKey).set(data[docKey]).then((res) => {
            console.log("Document " + docKey + " successfully written!");
        }).catch((error) => {
            console.error("Error writing document: ", error);
        });
    });
}