"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProfile = void 0;
const cloudinary_1 = __importDefault(require("@lib/cloudinary"));
const errorUtils_1 = require("@lib/errorUtils");
const user_model_1 = __importDefault(require("@models/user.model"));
const updateProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { profilePicture } = req.body;
        const userId = req.user._id;
        if (!profilePicture) {
            res.status(400).json({
                message: "Изображение профиля не найдено.",
            });
        }
        const uploadResponse = yield cloudinary_1.default.uploader.upload(profilePicture);
        const updatedUser = yield user_model_1.default.findByIdAndUpdate(userId, {
            profilePicture: uploadResponse.secure_url,
        }, { new: true });
        res.status(200).json(updatedUser);
    }
    catch (error) {
        (0, errorUtils_1.handleError)(error, res, "Ошибка в updateProfile controller");
    }
});
exports.updateProfile = updateProfile;
