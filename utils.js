async function middleWare(req, res, next) {
    const date = Date.now().toString();
    console.log(
        `Request Type: ${req.method}`,
        `From: "${req.socket.remoteAddress}" `,
        `Time: ${date}`
    );

    next();
}

module.exports = middleWare;
