const stream = require("stream");
const FormData = require("form-data");
const fetch = require("node-fetch");

const STABILITY_API_BASE_URL = "https://api.stability.ai/v1/";
const DEFAULT_ENGINE_ID = "stable-diffusion-v1-6";
const getStabilityApiUrl = async () => {
  const engines = (
    await fetch(`${STABILITY_API_BASE_URL}/v1/engines/list`, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${process.env.API_KEY}`,
      },
    })
  ).map((engine) => engine.id);

  const engineToUse = engines.includes(DEFAULT_ENGINE_ID)
    ? DEFAULT_ENGINE_ID
    : engines[0];

  return `${STABILITY_API_BASE_URL}/v1/generation/${engineToUse}/image-to-image/`;
};

const imageToImage = async (
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

  return fetch(await getStabilityApiUrl(), {
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
