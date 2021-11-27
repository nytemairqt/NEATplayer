const var PDQBassRRNum = 6;

reg PDQBassCurrentRR = 1;
reg PDQBassPreviousRR;
reg PDQBassIsUppick = 0;

var PDQBassForceDownpick;
var PDQBassPickAttack;
var PDQBassReleaseNoise;

const var Panel_PDQBassSettings = Content.getComponent("Panel_PDQBassSettings");
const var Button_PDQBassForceDownpick = Content.getComponent("Button_PDQBassForceDownpick");

const var Button_PDQBassProcessed = Content.getComponent("Button_PDQBassProcessed");



//Velocity Controls

const var Label_PDQBassVelocityMin = Content.getComponent("Label_PDQBassVelocityMin");
const var Slider_PDQBassVelocityMin = Content.getComponent("Slider_PDQBassVelocityMin");
const var Label_PDQBassVelocityMax = Content.getComponent("Label_PDQBassVelocityMax");
const var Slider_PDQBassVelocityMax = Content.getComponent("Slider_PDQBassVelocityMax");

const var Label_PDQBassPMVelMin = Content.getComponent("Label_PDQBassPMVelMin");
const var Slider_PDQBassPMVelMin = Content.getComponent("Slider_PDQBassPMVelMin");
const var Label_PDQBassPMVelMax = Content.getComponent("Label_PDQBassPMVelMax");
const var Slider_PDQBassPMVelMax = Content.getComponent("Slider_PDQBassPMVelMax");

const var Label_PDQBassFVelMin = Content.getComponent("Label_PDQBassFVelMin");
const var Slider_PDQBassFVelMin = Content.getComponent("Slider_PDQBassFVelMin");
const var Label_PDQBassFVelMax = Content.getComponent("Label_PDQBassFVelMax");
const var Slider_PDQBassFVelMax = Content.getComponent("Slider_PDQBassFVelMax");

const var Label_PDQBassAPVelMin = Content.getComponent("Label_PDQBassAPVelMin");
const var Slider_PDQBassAPVelMin = Content.getComponent("Slider_PDQBassAPVelMin");
const var Label_PDQBassAPVelMax = Content.getComponent("Label_PDQBassAPVelMax");
const var Slider_PDQBassAPVelMax = Content.getComponent("Slider_PDQBassAPVelMax");

const var Label_PDQBassSLVelMin = Content.getComponent("Label_PDQBassSLVelMin");
const var Slider_PDQBassSLVelMin = Content.getComponent("Slider_PDQBassSLVelMin");
const var Label_PDQBassSLVelMax = Content.getComponent("Label_PDQBassSLVelMax");
const var Slider_PDQBassSLVelMax = Content.getComponent("Slider_PDQBassSLVelMax");

//Proc or DI


inline function onButton_PDQBassProcessedControl(component, value)
{
    if (currentExpansion == "PDQBass")
    {
        if (!value)
            SamplerA.asSampler().loadSampleMap("{EXP::PDQBass}PDQBass_SampleMap");
        else
            SamplerA.asSampler().loadSampleMap("{EXP::PDQBass}PDQBassPROC_SampleMap");
    }
};

Content.getComponent("Button_PDQBassProcessed").setControlCallback(onButton_PDQBassProcessedControl);


/*

*/
//Global MIDI


inline function onSlider_PDQBassVelocityMinControl(component, value)
{
	Label_PDQBassVelocityMin.set("text", value);
	if (value >= Slider_PDQBassVelocityMax.getValue())
    {
	    Slider_PDQBassVelocityMax.setValue(value + 1);
	    Label_PDQBassVelocityMax.set("text", value + 1);
    }
};

Content.getComponent("Slider_PDQBassVelocityMin").setControlCallback(onSlider_PDQBassVelocityMinControl);

inline function onSlider_PDQBassVelocityMaxControl(component, value)
{
	Label_PDQBassVelocityMax.set("text", value);
	if (value <= Slider_PDQBassVelocityMin.getValue())
    {
	    Slider_PDQBassVelocityMin.setValue(value - 1);
	    Label_PDQBassVelocityMin.set("text", value - 1);
    }
};

Content.getComponent("Slider_PDQBassVelocityMax").setControlCallback(onSlider_PDQBassVelocityMaxControl);


//Palm Mute

inline function onSlider_PDQBassPMVelMinControl(component, value)
{
	Label_PDQBassPMVelMin.set("text", value);
	if (value >= Slider_PDQBassPMVelMax.getValue())
    {
	    Slider_PDQBassPMVelMax.setValue(value + 1);
	    Label_PDQBassPMVelMax.set("text", value + 1);
    }
};

Content.getComponent("Slider_PDQBassPMVelMin").setControlCallback(onSlider_PDQBassPMVelMinControl);

inline function onSlider_PDQBassPMVelMaxControl(component, value)
{
	Label_PDQBassPMVelMax.set("text", value);
	if (value <= Slider_PDQBassPMVelMin.getValue())
    {
	    Slider_PDQBassPMVelMin.setValue(value - 1);
	    Label_PDQBassPMVelMin.set("text", value - 1);
    }
};

Content.getComponent("Slider_PDQBassPMVelMax").setControlCallback(onSlider_PDQBassPMVelMaxControl);

//Finger


inline function onSlider_PDQBassFVelMinControl(component, value)
{
	Label_PDQBassFVelMin.set("text", value);
	if (value >= Slider_PDQBassFVelMax.getValue())
    {
	    Slider_PDQBassFVelMax.setValue(value + 1);
	    Label_PDQBassFVelMax.set("text", value + 1);
    }
};

Content.getComponent("Slider_PDQBassFVelMin").setControlCallback(onSlider_PDQBassFVelMinControl);

inline function onSlider_PDQBassFVelMaxControl(component, value)
{
	Label_PDQBassFVelMax.set("text", value);
	if (value <= Slider_PDQBassFVelMin.getValue())
    {
	    Slider_PDQBassFVelMin.setValue(value - 1);
	    Label_PDQBassFVelMin.set("text", value - 1);
    }
};

Content.getComponent("Slider_PDQBassFVelMax").setControlCallback(onSlider_PDQBassFVelMaxControl);

//Alt. Pick

inline function onSlider_PDQBassAPVelMinControl(component, value)
{
	Label_PDQBassAPVelMin.set("text", value);
};

Content.getComponent("Slider_PDQBassAPVelMin").setControlCallback(onSlider_PDQBassAPVelMinControl);

inline function onSlider_PDQBassAPVelMaxControl(component, value)
{
	Label_PDQBassAPVelMax.set("text", value);
};

Content.getComponent("Slider_PDQBassAPVelMax").setControlCallback(onSlider_PDQBassAPVelMaxControl);

//Slapped

inline function onSlider_PDQBassSLVelMinControl(component, value)
{
	Label_PDQBassSLVelMin.set("text", value);
};

Content.getComponent("Slider_PDQBassSLVelMin").setControlCallback(onSlider_PDQBassSLVelMinControl);

inline function onSlider_PDQBassSLVelMaxControl(component, value)
{
	Label_PDQBassSLVelMax.set("text", value);
};

Content.getComponent("Slider_PDQBassSLVelMax").setControlCallback(onSlider_PDQBassSLVelMaxControl);