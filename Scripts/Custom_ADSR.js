//Initialize AHDSR Display.

const var Button_AHDSRDisplay = Content.getComponent("Button_AHDSRDisplay");
const var Panel_AHDSR = Content.getComponent("Panel_AHDSR");

const var AHDSRRR = Synth.getModulator("AHDSR RR");
const var AHDSRRR2 = Synth.getModulator("AHDSR RR2");
const var AHDSRRR3 = Synth.getModulator("AHDSR RR3");
const var AHDSRNoRR = Synth.getModulator("AHDSR NoRR");
const var AHDSRNoRR2 = Synth.getModulator("AHDSR NoRR2");
const var AHDSRNoRR3 = Synth.getModulator("AHDSR NoRR3");
const var AHDSRLoops = Synth.getModulator("AHDSR Loops");
const var AHDSRLoops2 = Synth.getModulator("AHDSR Loops2");
const var AHDSRLoops3 = Synth.getModulator("AHDSR Loops3");
const var AHDSROther = Synth.getModulator("AHDSR Other");
const var AHDSR_AchromicA = Synth.getModulator("AHDSR_AchromicA");
const var AHDSR_AchromicB = Synth.getModulator("AHDSR_AchromicB");

const var AHDSRs = [AHDSRRR, AHDSRRR2, AHDSRRR3, AHDSRNoRR, AHDSRNoRR2, AHDSRNoRR3, AHDSRLoops, AHDSRLoops2, AHDSRLoops3, AHDSROther, AHDSR_AchromicA, AHDSR_AchromicB];

const var AHDSRDisplay = Content.getComponent("AHDSRDisplay");

const var Slider_Attack = Content.getComponent("Slider_Attack");
const var Slider_Decay = Content.getComponent("Slider_Decay");
const var Slider_Sustain = Content.getComponent("Slider_Sustain");
const var Slider_Release = Content.getComponent("Slider_Release");

const var Label_Attack = Content.getComponent("Label_Attack");
const var Label_Decay = Content.getComponent("Label_Decay");
const var Label_Sustain = Content.getComponent("Label_Sustain");
const var Label_Release = Content.getComponent("Label_Release");

const var Label_AttackValue = Content.getComponent("Label_AttackValue");
const var Label_DecayValue = Content.getComponent("Label_DecayValue");
const var Label_SustainValue = Content.getComponent("Label_SustainValue");
const var Label_ReleaseValue = Content.getComponent("Label_ReleaseValue");

Label_AttackValue.set("text", AHDSRRR.getAttribute(AHDSRRR.Attack));
Label_DecayValue.set("text", AHDSRRR.getAttribute(AHDSRRR.Decay));
Label_SustainValue.set("text", AHDSRRR.getAttribute(AHDSRRR.Sustain));
Label_ReleaseValue.set("text", AHDSRRR.getAttribute(AHDSRRR.Release));


inline function onButton_AHDSRDisplayControl(component, value)
{
    //We don't want any .changed() calls because it makes it cyclic.
    Panel_AHDSR.showControl(value);
    Button_FXDisplay.setValue(0);
    Button_ArpDisplay.setValue(0);
    //Button_RandomizationButtonsVisibility.set("visible", 1);
	Panel_FX.showControl(0);   
	Panel_Arp.showControl(0);
	Panel_Sample.showControl(0);
    Button_SampleDisplay.setValue(0);
};

Content.getComponent("Button_AHDSRDisplay").setControlCallback(onButton_AHDSRDisplayControl);


inline function onSlider_AttackControl(component, value)
{    
	Label_AttackValue.set("text", value + "ms");
	
	for (a in AHDSRs)
	    a.setAttribute(a.Attack, value);
};

Content.getComponent("Slider_Attack").setControlCallback(onSlider_AttackControl);


inline function onSlider_DecayControl(component, value)
{
	Label_DecayValue.set("text", value + "ms");
	
	for (a in AHDSRs)
	    a.setAttribute(a.Decay, value);
};

Content.getComponent("Slider_Decay").setControlCallback(onSlider_DecayControl);


inline function onSlider_SustainControl(component, value)
{
	Label_SustainValue.set("text", value + "dB");
	
	for (a in AHDSRs)
	    a.setAttribute(a.Sustain, value);
};

Content.getComponent("Slider_Sustain").setControlCallback(onSlider_SustainControl);


inline function onSlider_ReleaseControl(component, value)
{    
	Label_ReleaseValue.set("text", value + "ms");
	
	for (a in AHDSRs)
	    a.setAttribute(a.Release, value);
};

Content.getComponent("Slider_Release").setControlCallback(onSlider_ReleaseControl);

//AHDSRDisplay.setPosition((Panel_AHDSR.getWidth() / 2) - (AHDSRDisplay.getWidth() / 2), (Panel_AHDSR.getHeight() / 2) - AHDSRDisplay.getHeight(), AHDSRDisplay.getWidth(), AHDSRDisplay.getHeight());