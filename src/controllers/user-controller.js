import fs from "node:fs/promises";
import path from "node:path";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import models from "../models/index.js";

// eslint-disable-next-line node/no-process-env
const JWT_SECRET = process.env.JWT_SECRET || "secret";

export async function register(req, res) {
  const { name, email, password } = req.body;
  try {
    const hashPassword = await bcrypt.hash(password, 10);
    const findEmail = await models.User.findOne({ where: { email } });

    if (findEmail === null) {
      await models.User.create({ name, email, password: hashPassword });
      return res.status(200).json({ message: "تم إنشاء حسابك بنجاح" });
    }
    else {
      return res.status(400).json({ message: "هذا البريد الإلكتروني مستخدم مسبقًا" });
    }
  }
  catch (e) {
    return res.status(500).json(e);
  }
}

export async function login(req, res) {
  const { email, password } = req.body;
  try {
    const user = await models.User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ message: "كلمة المرور أو البريد الإلكتروني غير صحيح" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (isPasswordValid) {
      const token = jwt.sign(
        { id: user.id, email: user.email },
        JWT_SECRET,
      );
      return res.status(200).json({ accessToken: token });
    }
    else {
      return res.status(401).json({ message: "كلمة المرور أو البريد الإلكتروني غير صحيح" });
    }
  }
  catch (e) {
    return res.status(500).json(e);
  }
}

export async function getProfile(req, res) {
  try {
    const user = await models.User.findOne({
      where: { id: req.currentUser.id },
      attributes: { exclude: ["password"] },
    });

    if (!user) {
      return res.status(404).json({ message: "المستخدم غير موجود" });
    }

    return res.status(200).json(user);
  }
  catch (e) {
    return res.status(500).json(e);
  }
}

export async function uploadUserPhoto(req, res) {
  const url = `${req.protocol}://${req.get("host")}`;
  try {
    if (!req.file) {
      return res.status(400).json({ message: "لا يوجد ملف لتحميله" });
    }

    await models.User.update(
      { img_url: `${url}/public/images/${req.file.filename}` },
      { where: { id: req.currentUser.id } },
    );

    return res.status(200).json({ message: "تم إضافة الصورة بنجاح" });
  }
  catch (e) {
    return res.status(500).json(e.message);
  }
}

export async function updateProfile(req, res) {
  const { name, password } = req.body;
  try {
    const hashPassword = await bcrypt.hash(password, 10);

    await models.User.update(
      { name, password: hashPassword },
      { where: { id: req.currentUser.id } },
    );

    return res.status(200).json({ message: "تم تعديل البيانات الشخصية" });
  }
  catch (e) {
    return res.status(500).json(e);
  }
}

export async function updateUserPhoto(req, res) {
  const url = `${req.protocol}://${req.get("host")}`;

  try {
    if (!req.file) {
      return res.status(400).json({ message: "لا يوجد ملف لتحميله" });
    }

    const user = await models.User.findByPk(req.currentUser.id);

    if (!user) {
      return res.status(404).json({ message: "المستخدم غير موجود" });
    }

    if (user.img_url) {
      const oldPath = path.join(
        process.cwd(),
        "public",
        "images",
        path.basename(user.img_url),
      );

      try {
        await fs.unlink(oldPath);
        console.log("Old image deleted:", oldPath);
      }
      catch (err) {
        console.warn("No old image to delete or error deleting:", err.message);
      }
    }

    // 3. Update DB with new image URL
    const newImgUrl = `${url}/public/images/${req.file.filename}`;
    await models.User.update(
      { img_url: newImgUrl },
      { where: { id: req.currentUser.id } },
    );

    return res.status(200).json({ message: "تم تحديث الصورة بنجاح", img_url: newImgUrl });
  }
  catch (e) {
    return res.status(500).json({ message: "خطأ في تحديث الصورة", error: e.message });
  }
}
