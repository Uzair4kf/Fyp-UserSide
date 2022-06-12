import Slider from "../models/sliderModel.js";

const getSliders = async (req, res) => {
  const sliders = await Slider.find({});

  res.json(sliders);
};

export { getSliders };
