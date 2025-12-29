const crypto = require("crypto")

const generatetring  = (num=6)=>{
    const string = crypto.randomBytes(num).toString("hex")
    return string
}

module.exports = generatetring