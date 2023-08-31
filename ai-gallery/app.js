const bodyParser = require("body-parser");
const cors = require("cors");
const express = require("express");
const stability = require("./utils/stability");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 3001;

const fs = require("node:fs");

app.use(cors());

app.post(
  "/",
  bodyParser.raw({ type: ["image/jpeg", "image/png"], limit: "5mb" }),
  async (req, res) => {
    const response = await stability.imageToImage(
      req.body,
      req.query.prompt,
      req.query.image_strength,
      req.query.cfg_scale,
      req.query.style_preset
    );

    if (!response.ok) {
      throw new Error(`Non-200 response: ${await response.text()}`);
    }

    const responseJSON = await response.json();

    responseJSON.artifacts.forEach((image, index) => {
      fs.writeFileSync(
        `./out/img2img_${image.seed}.png`,
        Buffer.from(image.base64, "base64")
      );
    });

    res.sendFile(
      `${__dirname}/out/img2img_${responseJSON.artifacts[0].seed}.png`
    );
  }
);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
