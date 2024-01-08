//did:dht
const { DidDhtMethod } = require("@web5/dids");

/**
 * Issues DID to a user
 * @param {*} req
 * @param {*} res
 */
async function issueDID(req, res) {
  try {
    const didKeySet = req.body;
    //Creates a DID using the DHT method and publishes the DID Document to the DHT
    let didDht;
    if (
      didKeySet.verificationMethodKeys !== undefined &&
      didKeySet.verificationMethodKeys.length > 0
    ) {
      didDht = await DidDhtMethod.create({ publish: true, keySet: didKeySet });
    } else {
      didDht = await DidDhtMethod.create({ publish: true });
    }

    //DID string
    const did = didDht.did;

    //DID Document
    const didDocument = didDht.document;

    //Cryptographic keys associated with DID
    const keys = didDht.keySet;

    console.log("User DID", did);

    res.status(200).json({ did, didDocument, keys });
  } catch (error) {
    console.log("Error Creating DID:".error);
    res.status(500).json({ message: "Error creating DID" });
  }
}

module.exports = issueDID;
