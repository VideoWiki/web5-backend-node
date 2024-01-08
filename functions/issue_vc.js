//did:dht
const { DidDhtMethod } = require("@web5/dids");
const { VerifiableCredential } = require("@web5/credentials");

/**
 * Issues DID to a user
 * @param {*} req
 * @param {*} res
 */
async function issueVC(req, res) {
  try {
    const { userDid, orgDidKeySet } = req.body;
    const orgDID = await DidDhtMethod.create({
      keySet: orgDidKeySet,
    });
    // Create a VC
    const vc = await VerifiableCredential.create({
      type: "CastAttendeeCredential",
      issuer: orgDID,
      subject: userDid,
      expirationDate: "2024-09-30T12:34:56Z",
      data: {
        tilte: "Cast Invite",
        startDate: "2023-04-01T12:34:56Z",
        castStatus: "Scheduled",
      },
    });

    // console.log("VC", vc);
    const vc_jwt_attendance = await vc.sign({ did: orgDID });
    console.log("VC JWT", vc_jwt_attendance);
    res.status(200).json({ vc_jwt_attendance });
  } catch (error) {
    console.log("Error issuing VC:".error);
    res.status(500).json({ message: "Error issuing VC" });
  }
}

module.exports = issueVC;
