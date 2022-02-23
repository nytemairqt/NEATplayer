const var Sampler_Other = Synth.getChildSynth("Sampler_Other");
const var AHDSROther = Synth.getModulator("AHDSR Other");
Sampler_Other.asSampler().enableRoundRobin(false);

var groupNum;
reg randomNoiseCounter = 0;

const var Panel_AchromicSettings = Content.getComponent("Panel_AchromicSettings");

//Initialize Background Image.

//const var Panel_BG = Content.getComponent("Panel_BG");
//const var Image_BG = Content.getComponent("Image_BG");

Image_BG.setAlpha(0);

