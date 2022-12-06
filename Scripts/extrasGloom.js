const var Panel_GloomExtras = Content.getComponent("Panel_GloomExtras");

const var Button_GloomChairCreakNoise = Content.getComponent("Button_GloomChairCreakNoise");
const var Button_GloomReleaseNoise = Content.getComponent("Button_GloomReleaseNoise");

//Random Creak Noises

inline function onButton_GloomChairCreakNoiseControl(component, value)
{
	randomNoiseActive = value;
};

Content.getComponent("Button_GloomChairCreakNoise").setControlCallback(onButton_GloomChairCreakNoiseControl);

//Random Release Noises

inline function onButton_GloomReleaseNoiseControl(component, value)
{
	pianoReleaseNoiseActive = value;
};

Content.getComponent("Button_GloomReleaseNoise").setControlCallback(onButton_GloomReleaseNoiseControl);