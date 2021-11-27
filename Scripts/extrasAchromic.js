//Achromic Functions

const var Button_AchromicPickAttack = Content.getComponent("Button_AchromicPickAttack");
const var Button_AchromicReleaseNoise = Content.getComponent("Button_AchromicReleaseNoise");
const var Button_AchromicNoiseGate = Content.getComponent("Button_AchromicNoiseGate");
const var Button_AchromicForceDownpick = Content.getComponent("Button_AchromicForceDownpick");

const var achromicParameters = [ Button_AchromicPickAttack, Button_AchromicReleaseNoise, Button_AchromicNoiseGate, Button_AchromicForceDownpick];

const var AchromicGate = Synth.getEffect("AchromicGate");

//Achromic

const var achromicRRNum = 6;

reg achromicCurrentRR = 1;
reg achromicPreviousRR;
reg achromicIsUppick = 0;

var achromicForceDownpick;
var achromicPickAttack;
var achromicReleaseNoise;


//Button Callbacks


inline function onButton_AchromicPickAttackControl(component, value)
{
	achromicPickAttack = value;
};

Content.getComponent("Button_AchromicPickAttack").setControlCallback(onButton_AchromicPickAttackControl);

inline function onButton_AchromicReleaseNoiseControl(component, value)
{
	achromicReleaseNoise = value;
};

Content.getComponent("Button_AchromicReleaseNoise").setControlCallback(onButton_AchromicReleaseNoiseControl);

inline function onButton_AchromicNoiseGateControl(component, value)
{
	AchromicGate.setBypassed(1-value);
};

Content.getComponent("Button_AchromicNoiseGate").setControlCallback(onButton_AchromicNoiseGateControl);

inline function onButton_AchromicForceDownpickControl(component, value)
{
	achromicForceDownpick = value;
};

Content.getComponent("Button_AchromicForceDownpick").setControlCallback(onButton_AchromicForceDownpickControl);
