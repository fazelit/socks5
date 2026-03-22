const socks = require("socksv5");

const USER = process.env.PROXY_USER || "user";
const PASS = process.env.PROXY_PASS || "pass";

const srv = socks.createServer((info, accept, deny) => {
    accept();
});

srv.useAuth(
    socks.auth.UserPassword((user, password, cb) => {
        if (user === USER && password === PASS) {
            cb(true);
        } else {
            cb(false);
        }
    })
);

const PORT = process.env.PORT || 3000;

srv.listen(PORT, "0.0.0.0", () => {
    console.log("SOCKS5 proxy running on " + PORT);
});
