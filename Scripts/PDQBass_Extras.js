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

const var Slider_PDQBassVelocityMin = Content.getComponent("Slider_PDQBassVelocityMin");
const var Slider_PDQBassVelocityMax = Content.getComponent("Slider_PDQBassVelocityMax");

const var Slider_PDQBassPMVelMin = Content.getComponent("Slider_PDQBassPMVelMin");
const var Slider_PDQBassPMVelMax = Content.getComponent("Slider_PDQBassPMVelMax");

const var Slider_PDQBassFVelMin = Content.getComponent("Slider_PDQBassFVelMin");
const var Slider_PDQBassFVelMax = Content.getComponent("Slider_PDQBassFVelMax");

const var Slider_PDQBassAPVelMin = Content.getComponent("Slider_PDQBassAPVelMin");
const var Slider_PDQBassAPVelMax = Content.getComponent("Slider_PDQBassAPVelMax");

const var Slider_PDQBassSLVelMin = Content.getComponent("Slider_PDQBassSLVelMin");
const var Slider_PDQBassSLVelMax = Content.getComponent("Slider_PDQBassSLVelMax");

//Local LAF

Slider_PDQBassVelocityMin.setLocalLookAndFeel(LAFSliderPDQBassVel);
Slider_PDQBassVelocityMax.setLocalLookAndFeel(LAFSliderPDQBassVel);
Slider_PDQBassPMVelMin.setLocalLookAndFeel(LAFSliderPDQBassVel);
Slider_PDQBassPMVelMax.setLocalLookAndFeel(LAFSliderPDQBassVel);
Slider_PDQBassFVelMin.setLocalLookAndFeel(LAFSliderPDQBassVel);
Slider_PDQBassFVelMax.setLocalLookAndFeel(LAFSliderPDQBassVel);
Slider_PDQBassAPVelMin.setLocalLookAndFeel(LAFSliderPDQBassVel);
Slider_PDQBassAPVelMax.setLocalLookAndFeel(LAFSliderPDQBassVel);
Slider_PDQBassSLVelMin.setLocalLookAndFeel(LAFSliderPDQBassVel);
Slider_PDQBassSLVelMax.setLocalLookAndFeel(LAFSliderPDQBassVel);

//Force Downpick

inline function onButton_PDQBassForceDownpick(component, value)
{
	forceDownPick = value;
}

Content.getComponent("Button_PDQBassForceDownpick").setControlCallback(onButton_PDQBassForceDownpick);

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


//Global MIDI


inline function onSlider_PDQBassVelocityMinControl(component, value)
{
	if (value >= Slider_PDQBassVelocityMax.getValue())
	    Slider_PDQBassVelocityMax.setValue(value + 1);
};

Content.getComponent("Slider_PDQBassVelocityMin").setControlCallback(onSlider_PDQBassVelocityMinControl);

inline function onSlider_PDQBassVelocityMaxControl(component, value)
{
	if (value <= Slider_PDQBassVelocityMin.getValue())
	    Slider_PDQBassVelocityMin.setValue(value - 1);
};

Content.getComponent("Slider_PDQBassVelocityMax").setControlCallback(onSlider_PDQBassVelocityMaxControl);


//Palm Mute

inline function onSlider_PDQBassPMVelMinControl(component, value)
{
	if (value >= Slider_PDQBassPMVelMax.getValue())
	{
	    Slider_PDQBassPMVelMax.setValue(value + 1);
	    Slider_PDQBassPMVelMax.changed();
	}
	velocityBasedArticulations[0] = value;

};

Content.getComponent("Slider_PDQBassPMVelMin").setControlCallback(onSlider_PDQBassPMVelMinControl);

inline function onSlider_PDQBassPMVelMaxControl(component, value)
{
	if (value <= Slider_PDQBassPMVelMin.getValue())
	{
	    Slider_PDQBassPMVelMin.setValue(value - 1);
	    Slider_PDQBassPMVelMin.changed();
	}
	velocityBasedArticulations[1] = value;
};

Content.getComponent("Slider_PDQBassPMVelMax").setControlCallback(onSlider_PDQBassPMVelMaxControl);

//Finger


inline function onSlider_PDQBassFVelMinControl(component, value)
{
	if (value >= Slider_PDQBassFVelMax.getValue())
	{
	    Slider_PDQBassFVelMax.setValue(value + 1);
	    Slider_PDQBassFVelMax.changed();
	}
	velocityBasedArticulations[2] = value;
};

Content.getComponent("Slider_PDQBassFVelMin").setControlCallback(onSlider_PDQBassFVelMinControl);

inline function onSlider_PDQBassFVelMaxControl(component, value)
{
	if (value <= Slider_PDQBassFVelMin.getValue())
	{
	    Slider_PDQBassFVelMin.setValue(value - 1);
	    Slider_PDQBassFVelMin.changed();
	}
	velocityBasedArticulations[3] = value;
};

Content.getComponent("Slider_PDQBassFVelMax").setControlCallback(onSlider_PDQBassFVelMaxControl);

//Alternate Picking


inline function onSlider_PDQBassAPVelMinControl(component, value)
{
	if (value >= Slider_PDQBassAPVelMax.getValue())
	{
	    Slider_PDQBassAPVelMax.setValue(value - 1);
	    Slider_PDQBassAPVelMax.changed();
	}
	velocityBasedArticulations[4] = value;
	alternatePickingVelocityRange[0] = value;
};

Content.getComponent("Slider_PDQBassAPVelMin").setControlCallback(onSlider_PDQBassAPVelMinControl);



inline function onSlider_PDQBassAPVelMaxControl(component, value)
{
	if (value <= Slider_PDQBassAPVelMin.getValue())
	{
	    Slider_PDQBassAPVelMin.setValue(value - 1);
	    Slider_PDQBassAPVelMin.changed();
	}
	velocityBasedArticulations[5] = value;
	alternatePickingVelocityRange[1] = value;
};

Content.getComponent("Slider_PDQBassAPVelMax").setControlCallback(onSlider_PDQBassAPVelMaxControl);


//Slapped


inline function onSlider_PDQBassSLVelMinControl(component, value)
{
	if (value >= Slider_PDQBassSLVelMax.getValue())
	{
	    Slider_PDQBassSLVelMax.setValue(value - 1);
	    Slider_PDQBassSLVelMax.changed();
	}
	velocityBasedArticulations[6] = value;
};

Content.getComponent("Slider_PDQBassSLVelMin").setControlCallback(onSlider_PDQBassSLVelMinControl);



inline function onSlider_PDQBassSLVelMaxControl(component, value)
{
	if (value <= Slider_PDQBassSLVelMin.getValue())
	{
	    Slider_PDQBassSLVelMin.setValue(value - 1);
	    Slider_PDQBassSLVelMin.changed();
	}
	velocityBasedArticulations[7] = value;
};

Content.getComponent("Slider_PDQBassSLVelMax").setControlCallback(onSlider_PDQBassSLVelMaxControl);
