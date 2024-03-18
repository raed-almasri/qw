import moment from "moment";
import fs from "fs";
import fsExtra from "fs-extra";
import path from "path";
import { configStorage, createMulter } from "../config/multer.js";

import translate from "translate";
import sharp from "sharp";
export let moveFile = (file, dir2) => {
    var f = path.basename(file);
    var dest = path.resolve(dir2, f);

    fs.rename(file, dest, (err) => {
        if (err) throw Error(err);
    });
    return dest;
};

export let removePic = async (myPath) => {
    try {
        if (await fsExtra.pathExists(myPath)) {
            await fsExtra.remove(myPath);
            // console.log("تم حذف الملف بنجاح");
        }
    } catch (error) {
        // console.log({ error });
    }
};

export let removeAvatars = (req) => {
    //already all this picture is found
    //delete every avatar if found
    let showError = (err) => {
        if (err) {
            return err;
        }
    };
    if (req.files) {
        if (req.files.avatar1 && fs.existsSync(req.files.avatar1[0].path))
            fs.unlink(req.files.avatar1[0].path, showError);
        if (req.files.avatar2 && fs.existsSync(req.files.avatar2[0].path))
            fs.unlink(req.files.avatar2[0].path, showError);
        if (req.files.avatar && fs.existsSync(req.files.avatar[0].path))
            fs.unlink(req.files.avatar[0].path, showError);
        if (req.files.StoreStory)
            req.files.StoreStory.forEach((element) => {
                // console.log(fs.readFileSync(element.path));
                if (fs.existsSync(element.path))
                    fs.unlink(element.path, showError);
            });
    }
    if (req.file) removePic(req.file.path);
};

export let configFolder = (type, id) => {
    // ! create folder with id
    try {
        let myPath = path.join(
            __dirname,
            `../upload/images/${type}`,
            id.toString()
        );
        let myError = {};
        if (!fs.existsSync(myPath)) {
            fs.mkdir(myPath, (err) => {
                if (err) myError.error = err;
            });
            if (myError.error) return myError.error;
        }
        return myPath;
    } catch (error) {
        return { err: error.message };
    }
};

const IMAGE_PATH = path.join(path.resolve(), "images");
//  "../images"
export let configUpload = async (fieldUpload, type) => {
    try {
        let upload = null;
        if (type === "multi") {
            upload = createMulter(configStorage(IMAGE_PATH));
            //if we want more then 3 , just set number here
            upload = upload.array(fieldUpload, 4);
        } else {
            upload = createMulter(configStorage(IMAGE_PATH));
            upload = upload.single(fieldUpload);
        }
        return upload;
    } catch (error) {
        return { error };
    }
};
export let readSetting = () => {
    try {
        const data = fs.readFileSync(
            path.join(path.resolve(), "/json/setting.json"),
            "utf8"
        );
        if (data.length === 0) return null;
        const jsonData = JSON.parse(data);
        return jsonData;
    } catch (error) {
        // console.error(error);
        return null;
    }
};

import { v4 as uuidv4 } from "uuid";
export async function convertToJpeg(inputFilename, req) {
    const outputFilename = `${uuidv4()}.jpg`;
    let metadata = await sharp(inputFilename).metadata();
    await sharp(inputFilename)
        .jpeg({ quality: 40 }) // تحديد جودة الصورة المضغوطة
        .toFile(outputFilename, async (err, info) => {
            if (err) {
                // console.log(err);
            } else {
                moveFile(
                    path.resolve() + "\\" + outputFilename,
                    path.resolve() + "\\" + "images"
                );

                removePic(req.file.path);
            }
        });
    return outputFilename;
}

export const translateTo = async (msg, sourceLang, targetLang) => {
    translate.engine = "google";
    // console.log({ msg, sourceLang, targetLang });
    const text = await translate(msg, {
        from: sourceLang,
        to: targetLang,
    });

    return text;
};
export let languages = {
    Arabic: "Arabic",
    English: "English",
    Turkish: "Turkish",
};
/*


let languages = [
    ["English", "Arabic", "French"],
    ["German", "Spanish", "Italian"],
    ["Russian", "Chinese", "Japanese"],
    ["Korean", "Portuguese", "Dutch"],
    ["Swedish", "Norwegian", "Danish"],
    ["Finnish", "Turkish", "Greek"],
    ["Hebrew", "Hindi", "Urdu"],
    ["Persian", "Thai", "Polish"],
    ["Czech", "Hungarian", "Romanian"],
    ["Serbian", "Croatian", "Bulgarian"],
    ["Slovak", "Lithuanian", "Latvian"],
    ["Estonian", "Slovenian", "Maltese"],
    ["Irish", "Welsh", "Scots Gaelic"],
    ["Basque", "Catalan", "Galician"],
    ["Icelandic", "Albanian", "Macedonian"],
    ["Belarusian", "Bosnian", "Malay"],
    ["Indonesian", "Tagalog", "Vietnamese"],
    ["Esperanto", "Haitian Creole", "Latin"],
    ["Maori", "Samoan", "Tongan"],
    ["Fijian", "Hawaiian", "Cherokee"],
];*/
