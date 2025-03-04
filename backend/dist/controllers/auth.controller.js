"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.login = exports.signup = void 0;
const signup = (req, res) => {
    res.send("signup route");
};
exports.signup = signup;
const login = (req, res) => {
    res.send("login route");
};
exports.login = login;
const logout = (req, res) => {
    res.send("logout route");
};
exports.logout = logout;
