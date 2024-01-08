//did:dht
const { VerifiableCredential } = require("@web5/credentials");

/**
 * Issues DID to a user
 * @param {*} req
 * @param {*} res
 */
async function validateVC(req, res) {
  try {
    const { vcJWT } = req.body;

    const _vc = await VerifiableCredential.parseJwt({
      vcJwt: vcJWT,
    });
    console.log("VC", _vc);
    res.status(200).json({ vc: _vc });
  } catch (error) {
    console.log("Error validating VC:".error);
    res.status(500).json({ message: "Error validating VC" });
  }
}

module.exports = validateVC;
