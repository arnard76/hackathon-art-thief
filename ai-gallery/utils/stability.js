const stream = require("stream");
const FormData = require("form-data");
const fetch = require("node-fetch");

const STABILITY_API =
  "https://api.stability.ai/v1/generation/stable-diffusion-v1-5/image-to-image";

const imageToImage = (
  image,
  prompt,
  image_strength = 0.1,
  cfg_scale = 35,
  style_preset = "digital-art"
) => {
  const formData = new FormData();

  formData.append("init_image", image);
  formData.append("init_image_mode", "IMAGE_STRENGTH");
  formData.append("image_strength", image_strength);
  formData.append("samples", 1);
  formData.append("steps", 50);
  formData.append("seed", 100);
  formData.append("cfg_scale", cfg_scale);
  formData.append("style_preset", style_preset);
  formData.append("text_prompts[0][text]", prompt + ", brightness");
  formData.append("text_prompts[0][weight]", 1);

  const pt = new stream.PassThrough();
  formData.pipe(pt);

  return fetch(STABILITY_API, {
    method: "POST",
    headers: {
      ...formData.getHeaders(),
      Accept: "application/json",
      Authorization: `Bearer ${process.env.API_KEY}`,
    },
    duplex: "half",
    body: pt,
  });
};

module.exports = {
  imageToImage,
};
