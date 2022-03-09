const var Sampler_Other = Synth.getChildSynth("Sampler_Other");
const var AHDSROther = Synth.getModulator("AHDSR Other");
Sampler_Other.asSampler().enableRoundRobin(false);

var groupNum;
reg randomNoiseCounter = 0;
