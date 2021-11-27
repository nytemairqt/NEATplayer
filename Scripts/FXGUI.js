//------------------------------------------------------------FX

const var Button_FXDisplay = Content.getComponent("Button_FXDisplay");
const var Panel_FX = Content.getComponent("Panel_FX");

const var Button_DriveTubeDriveEnable = Content.getComponent("Button_DriveTubeDriveEnable");

const var ShapeFX1 = Synth.getEffect("Shape FX1");
const var TubeDrive = Synth.getEffect("TubeDrive");
const var Filter1 = Synth.getEffect("Filter1");
const var Compressor = Synth.getEffect("Compressor");
const var Width = Synth.getEffect("Width");
const var PhaseFX1 = Synth.getEffect("Phase FX1");
const var Degrade = Synth.getEffect("Degrade");
const var SimpleReverb1 = Synth.getEffect("Simple Reverb1");
const var Delay1 = Synth.getEffect("Delay1");

const var LFOGain = Synth.getEffect("LFOGain");

const var LFOModulator1 = Synth.getModulator("LFO Modulator1");
const var LFOModulator2 = Synth.getModulator("LFO Modulator2");

//EQ as a preset:

const var ParametriqEQ1 = Synth.getEffect("Parametriq EQ1");
Engine.addModuleStateToUserPreset("Parametriq EQ1");

//Initialize FX Display.

const var FXBypassButtons = [Content.getComponent("Button_FilterBypass"),
                             Content.getComponent("Button_EQBypass"),
                             Content.getComponent("Button_CompBypass"),
                             Content.getComponent("Button_AmpEnable"),
                             Content.getComponent("Button_DriveTubeDriveEnable"),
                             Content.getComponent("Button_WidthEnable"),
                             Content.getComponent("Button_PhaserEnable"),
                             Content.getComponent("Button_DegradeEnable"),
                             Content.getComponent("Button_ReverbEnable"),
                             Content.getComponent("Button_DelayEnable")];
                             
const var FXBypassButtonsRandom = [Content.getComponent("Button_FilterBypass"),
                             Content.getComponent("Button_AmpEnable"),
                             Content.getComponent("Button_DriveTubeDriveEnable"),
                             Content.getComponent("Button_WidthEnable"),
                             Content.getComponent("Button_PhaserEnable"),
                             Content.getComponent("Button_DegradeEnable"),
                             Content.getComponent("Button_ReverbEnable"),
                             Content.getComponent("Button_DelayEnable")];                             

const var Panel_EQSettings = Content.getComponent("Panel_EQSettings");
const var Panel_CompSettings = Content.getComponent("Panel_CompSettings");
const var Panel_FilterSettings = Content.getComponent("Panel_FilterSettings");
const var Panel_DriveSettings = Content.getComponent("Panel_DriveSettings");
const var Panel_ReverbSettings = Content.getComponent("Panel_ReverbSettings");
const var Panel_DelaySettings = Content.getComponent("Panel_DelaySettings");
const var Panel_WidthSettings = Content.getComponent("Panel_WidthSettings");
const var Panel_PhaserSettings = Content.getComponent("Panel_PhaserSettings");
const var Panel_DegradeSettings = Content.getComponent("Panel_DegradeSettings");
const var Panel_AmpSettings = Content.getComponent("Panel_AmpSettings");

const var Button_FilterSettings = Content.getComponent("Button_FilterSettings");
const var Button_EQSettings = Content.getComponent("Button_EQSettings");
const var Button_CompSettings = Content.getComponent("Button_CompSettings");
const var Button_DriveSettings = Content.getComponent("Button_DriveSettings");
const var Button_ReverbSettings = Content.getComponent("Button_ReverbSettings");
const var Button_DelaySettings = Content.getComponent("Button_DelaySettings");
const var Button_WidthSettings = Content.getComponent("Button_WidthSettings");
const var Button_PhaserSettings = Content.getComponent("Button_PhaserSettings");
const var Button_DegradeSettings = Content.getComponent("Button_DegradeSettings");
const var Button_AmpSettings = Content.getComponent("Button_AmpSettings");

const var ComboBox_DriveOversample1 = Content.getComponent("ComboBox_DriveOversample1");
const var ComboBox_FilterMode = Content.getComponent("ComboBox_FilterMode");


//FX Panel

inline function onButton_FXDisplayControl(component, value)
{
    //We don't want any .changed() calls because it makes it cyclic.
    Panel_Sample.showControl(0);
    Button_SampleDisplay.setValue(0);
    Panel_Arp.showControl(0);
    Button_ArpDisplay.setValue(0);
    Panel_Movement.showControl(0);
    Button_MoveDisplay.setValue(0);
	Panel_FX.showControl(value);   
};

Content.getComponent("Button_FXDisplay").setControlCallback(onButton_FXDisplayControl);

//Paint Routine

//Paint Routine

Panel_FX.setPaintRoutine(function(g)
{
    g.setColour(0xFB111111);
    g.fillRoundedRectangle([0, 0, this.getWidth(), this.getHeight()], 8.0);
	g.setColour(Colours.grey);
	g.drawRoundedRectangle([0, 0, this.getWidth(), this.getHeight()], 8.0, 2.0);
});

//Individual FX Pages.

//Filter.

const var Slider_FilterFreq = Content.getComponent("Slider_FilterFreq");
const var Slider_FilterQ = Content.getComponent("Slider_FilterQ");
const var Label_FilterFreqValue = Content.getComponent("Label_FilterFreqValue");
const var Label_FilterQValue = Content.getComponent("Label_FilterQValue");

inline function onSlider_FilterFreqControl(component, value)
{
	Filter1.setAttribute(Filter1.Frequency, value);
	Label_FilterFreqValue.set("text", value + "Hz");	
};

Content.getComponent("Slider_FilterFreq").setControlCallback(onSlider_FilterFreqControl);

inline function onSlider_FilterQControl(component, value)
{
	Filter1.setAttribute(Filter1.Q, value);
    Label_FilterQValue.set("text", value);
};

Content.getComponent("Slider_FilterQ").setControlCallback(onSlider_FilterQControl);




inline function onButton_FilterSettingsControl(component, value)
{
    Panel_FilterSettings.showControl(value);
};

Content.getComponent("Button_FilterSettings").setControlCallback(onButton_FilterSettingsControl);


inline function onComboBox_FilterModeControl(component, value)
{
	Filter1.setAttribute(Filter1.Mode, value+5);
};

Content.getComponent("ComboBox_FilterMode").setControlCallback(onComboBox_FilterModeControl);

//EQ.

inline function onButton_EQSettingsControl(component, value)
{
	Panel_EQSettings.showControl(value);
};

Content.getComponent("Button_EQSettings").setControlCallback(onButton_EQSettingsControl);

//Compressor.

const var Slider_CompThreshold = Content.getComponent("Slider_CompThreshold");
const var Slider_CompAttack = Content.getComponent("Slider_CompAttack");
const var Slider_CompRelease = Content.getComponent("Slider_CompRelease");
const var Slider_CompRatio = Content.getComponent("Slider_CompRatio");
const var Slider_CompMakeup = Content.getComponent("Slider_CompMakeup");
const var Slider_CompMix = Content.getComponent("Slider_CompMix");

const var Label_CompThresholdValue = Content.getComponent("Label_CompThresholdValue");
const var Label_CompAttackValue = Content.getComponent("Label_CompAttackValue");
const var Label_CompReleaseValue = Content.getComponent("Label_CompReleaseValue");
const var Label_CompRatioValue = Content.getComponent("Label_CompRatioValue");
const var Label_CompMakeupValue = Content.getComponent("Label_CompMakeupValue");
const var Label_CompMixValue = Content.getComponent("Label_CompMixValue");


inline function onSlider_CompThresholdControl(component, value)
{
	Compressor.setAttribute(Compressor.Threshold, value);
	Label_CompThresholdValue.set("text", value + "dB");
};

Content.getComponent("Slider_CompThreshold").setControlCallback(onSlider_CompThresholdControl);

inline function onSlider_CompAttackControl(component, value)
{
	Compressor.setAttribute(Compressor.Attack, value);
	Label_CompAttackValue.set("text", Math.round(value) + "ms");
};

Content.getComponent("Slider_CompAttack").setControlCallback(onSlider_CompAttackControl);

inline function onSlider_CompReleaseControl(component, value)
{
	Compressor.setAttribute(Compressor.Release, value);
	Label_CompReleaseValue.set("text", Math.round(value) + "ms");
};

Content.getComponent("Slider_CompRelease").setControlCallback(onSlider_CompReleaseControl);

inline function onSlider_CompRatioControl(component, value)
{
	Compressor.setAttribute(Compressor.Ratio, value);
	Label_CompRatioValue.set("text", value + ":1");
};

Content.getComponent("Slider_CompRatio").setControlCallback(onSlider_CompRatioControl);

inline function onSlider_CompMakeupControl(component, value)
{
	Compressor.setAttribute(Compressor.Makeup, value);
	Label_CompMakeupValue.set("text", value + "dB");
};

Content.getComponent("Slider_CompMakeup").setControlCallback(onSlider_CompMakeupControl);

inline function onSlider_CompMixControl(component, value)
{
	Compressor.setAttribute(Compressor.Mix, value);
	Label_CompMixValue.set("text", Math.round(value * 100) + "%");
};

Content.getComponent("Slider_CompMix").setControlCallback(onSlider_CompMixControl);


inline function onButton_CompSettingsControl(component, value)
{
	Panel_CompSettings.showControl(value);
};

Content.getComponent("Button_CompSettings").setControlCallback(onButton_CompSettingsControl);




//Drive

const var Slider_DriveWaveshaperGain = Content.getComponent("Slider_DriveWaveshaperGain");
const var Slider_DriveTubeGain = Content.getComponent("Slider_DriveTubeGain");

const var Label_DriveTubeGainValue = Content.getComponent("Label_DriveTubeGainValue");
const var Label_DriveWaveShaperGainValue = Content.getComponent("Label_DriveWaveShaperGainValue");

inline function onButton_DriveSettingsControl(component, value)
{
	Panel_DriveSettings.showControl(value);
};

Content.getComponent("Button_DriveSettings").setControlCallback(onButton_DriveSettingsControl);


inline function onComboBox_DriveOversample1Control(component, value)
{
	TubeDrive.setAttribute(TubeDrive.Oversample, value-1);
};

Content.getComponent("ComboBox_DriveOversample1").setControlCallback(onComboBox_DriveOversample1Control);

inline function onButton_DriveTubeDriveEnableControl(component, value)
{
	ShapeFX1.setBypassed(1-value);
	TubeDrive.setBypassed(1-value);
};

Content.getComponent("Button_DriveTubeDriveEnable").setControlCallback(onButton_DriveTubeDriveEnableControl);


inline function onSlider_DriveWaveshaperGainControl(component, value)
{
    ShapeFX1.setAttribute(ShapeFX1.Gain, value);
    Label_DriveWaveShaperGainValue.set("text", value + "db");
};

Content.getComponent("Slider_DriveWaveshaperGain").setControlCallback(onSlider_DriveWaveshaperGainControl);

inline function onSlider_DriveTubeGainControl(component, value)
{
    TubeDrive.setAttribute(TubeDrive.Gain, value);
    Label_DriveTubeGainValue.set("text", value + "db");
};

Content.getComponent("Slider_DriveTubeGain").setControlCallback(onSlider_DriveTubeGainControl);

//Phaser

const var Slider_PhaserRateA = Content.getComponent("Slider_PhaserRateA");
const var Slider_PhaserRateB = Content.getComponent("Slider_PhaserRateB");
const var Slider_PhaserFeedback = Content.getComponent("Slider_PhaserFeedback");
const var Slider_PhaserMix = Content.getComponent("Slider_PhaserMix");
const var Label_PhaserRateAAmount = Content.getComponent("Label_PhaserRateAAmount");
const var Label_PhaserRateBAmount = Content.getComponent("Label_PhaserRateBAmount");
const var Label_PhaserFeedbackAmount = Content.getComponent("Label_PhaserFeedbackAmount");
const var Label_PhaserMixAmount = Content.getComponent("Label_PhaserMixAmount");

inline function onButton_PhaserSettingsControl(component, value)
{
	Panel_PhaserSettings.showControl(value);
};

Content.getComponent("Button_PhaserSettings").setControlCallback(onButton_PhaserSettingsControl);

inline function onSlider_PhaserRateAControl(component, value)
{
	PhaseFX1.setAttribute(PhaseFX1.Frequency1, value);
	Label_PhaserRateAAmount.set("text", Math.round(value) + "Hz");
};

Content.getComponent("Slider_PhaserRateA").setControlCallback(onSlider_PhaserRateAControl);

inline function onSlider_PhaserRateBControl(component, value)
{
	PhaseFX1.setAttribute(PhaseFX1.Frequency2, value);
	Label_PhaserRateBAmount.set("text", Math.round(value) + "Hz");
};

Content.getComponent("Slider_PhaserRateB").setControlCallback(onSlider_PhaserRateBControl);

inline function onSlider_PhaserFeedbackControl(component, value)
{
	PhaseFX1.setAttribute(PhaseFX1.Feedback, value);
	Label_PhaserFeedbackAmount.set("text", Math.round(value * 100) + "%");
};

Content.getComponent("Slider_PhaserFeedback").setControlCallback(onSlider_PhaserFeedbackControl);

inline function onSlider_PhaserMixControl(component, value)
{
	PhaseFX1.setAttribute(PhaseFX1.Mix, value);
	Label_PhaserMixAmount.set("text", Math.round(value * 100) + "%");
};

Content.getComponent("Slider_PhaserMix").setControlCallback(onSlider_PhaserMixControl);





//Degrade

const var Slider_DegradeBitDepth = Content.getComponent("Slider_DegradeBitDepth");
const var Slider_DegradeSampleHold = Content.getComponent("Slider_DegradeSampleHold");
const var Label_DegradeBitDepthValue = Content.getComponent("Label_DegradeBitDepthValue");
const var Label_DegradeSampleHoldValue = Content.getComponent("Label_DegradeSampleHoldValue");

inline function onButton_DegradeSettingsControl(component, value)
{
	Panel_DegradeSettings.showControl(value);
};

Content.getComponent("Button_DegradeSettings").setControlCallback(onButton_DegradeSettingsControl);

inline function onSlider_DegradeBitDepthControl(component, value)
{
	Degrade.setAttribute(Degrade.BitDepth, value);
	Label_DegradeBitDepthValue.set("text", value);
};

Content.getComponent("Slider_DegradeBitDepth").setControlCallback(onSlider_DegradeBitDepthControl);

inline function onSlider_DegradeSampleHoldControl(component, value)
{
	Degrade.setAttribute(Degrade.SampleHold, value);
	Label_DegradeSampleHoldValue.set("text", value);
};

Content.getComponent("Slider_DegradeSampleHold").setControlCallback(onSlider_DegradeSampleHoldControl);




//Reverb

const var Slider_ReverbSize = Content.getComponent("Slider_ReverbSize");
const var Slider_ReverbWidth = Content.getComponent("Slider_ReverbWidth");
const var Slider_ReverbDamping = Content.getComponent("Slider_ReverbDamping");
const var Slider_ReverbMix = Content.getComponent("Slider_ReverbMix");
const var Label_ReverbSizeValue = Content.getComponent("Label_ReverbSizeValue");
const var Label_ReverbWidthValue = Content.getComponent("Label_ReverbWidthValue");
const var Label_ReverbDampingValue = Content.getComponent("Label_ReverbDampingValue");
const var Label_ReverbMixValue = Content.getComponent("Label_ReverbMixValue");


inline function onButton_ReverbSettingsControl(component, value)
{
	Panel_ReverbSettings.showControl(value);
};

Content.getComponent("Button_ReverbSettings").setControlCallback(onButton_ReverbSettingsControl);

inline function onSlider_ReverbSizeControl(component, value)
{
	SimpleReverb1.setAttribute(SimpleReverb1.RoomSize, value);
	Label_ReverbSizeValue.set("text", Math.round(value * 100) + "%");
};

Content.getComponent("Slider_ReverbSize").setControlCallback(onSlider_ReverbSizeControl);

inline function onSlider_ReverbWidthControl(component, value)
{
	SimpleReverb1.setAttribute(SimpleReverb1.Width, value);
	Label_ReverbWidthValue.set("text", Math.round(value * 100) + "%");
};

Content.getComponent("Slider_ReverbWidth").setControlCallback(onSlider_ReverbWidthControl);

inline function onSlider_ReverbDampingControl(component, value)
{
	SimpleReverb1.setAttribute(SimpleReverb1.Damping, value);
	Label_ReverbDampingValue.set("text", Math.round(value * 100) + "%");
};

Content.getComponent("Slider_ReverbDamping").setControlCallback(onSlider_ReverbDampingControl);

inline function onSlider_ReverbMixControl(component, value)
{
	SimpleReverb1.setAttribute(SimpleReverb1.WetLevel, value);
	Label_ReverbMixValue.set("text", Math.round(value * 100) + "%");
};

Content.getComponent("Slider_ReverbMix").setControlCallback(onSlider_ReverbMixControl);

//Delay

const var Button_DelayLink = Content.getComponent("Button_DelayLink");
const var Button_DelaySync = Content.getComponent("Button_DelaySync");
const var Slider_DelayTimeLeftSynced = Content.getComponent("Slider_DelayTimeLeftSynced");
const var Slider_DelayTimeRightSynced = Content.getComponent("Slider_DelayTimeRightSynced");
const var Slider_DelayTimeLeftFree = Content.getComponent("Slider_DelayTimeLeftFree");
const var Slider_DelayTimeRightFree = Content.getComponent("Slider_DelayTimeRightFree");
const var Slider_DelayFeedbackLeft = Content.getComponent("Slider_DelayFeedbackLeft");
const var Slider_DelayFeedbackRight = Content.getComponent("Slider_DelayFeedbackRight");
const var Slider_DelayMix = Content.getComponent("Slider_DelayMix");

const var Label_DelayTimeLeftValue = Content.getComponent("Label_DelayTimeLeftValue");
const var Label_DelayTimeRightValue = Content.getComponent("Label_DelayTimeRightValue");
const var Label_DelayFeedbackLeftValue = Content.getComponent("Label_DelayFeedbackLeftValue");
const var Label_DelayFeedbackRightValue = Content.getComponent("Label_DelayFeedbackRightValue");
const var Label_DelayMixValue = Content.getComponent("Label_DelayMixValue");

//Syncing Sliders

inline function setDelayTimeLeft(value)
{
    if (Button_DelaySync.getValue())
        Delay1.setAttribute(Delay1.DelayTimeLeft, value);
    
    else
        Delay1.setAttribute(Delay1.DelayTimeLeft, value);    
}

inline function setDelayTimeRight(value)
{
    if (Button_DelaySync.getValue())
        Delay1.setAttribute(Delay1.DelayTimeRight, value);
    
    else
        Delay1.setAttribute(Delay1.DelayTimeRight, value);    
}

inline function onSlider_DelayFeedbackLeftControl(component, value)
{
    Delay1.setAttribute(Delay1.FeedbackLeft, value);    
    Label_DelayFeedbackLeftValue.set("text", Math.round(value * 100) + "%");
	if (Button_DelayLink.getValue())
    {
        Slider_DelayFeedbackRight.setValue(value);     
        Delay1.setAttribute(Delay1.FeedbackRight, value);  
        Label_DelayFeedbackRightValue.set("text", Math.round(value * 100) + "%");
    };
};

Content.getComponent("Slider_DelayFeedbackLeft").setControlCallback(onSlider_DelayFeedbackLeftControl);

inline function onSlider_DelayFeedbackRightControl(component, value)
{
    Delay1.setAttribute(Delay1.FeedbackRight, value);    
    Label_DelayFeedbackRightValue.set("text", Math.round(value * 100) + "%");    
	if (Button_DelayLink.getValue())
    {
        Slider_DelayFeedbackLeft.setValue(value);     
        Delay1.setAttribute(Delay1.FeedbackLeft, value);  
        Label_DelayFeedbackLeftValue.set("text", Math.round(value * 100) + "%");
    };
};

Content.getComponent("Slider_DelayFeedbackRight").setControlCallback(onSlider_DelayFeedbackRightControl);

inline function onSlider_DelayMixControl(component, value)
{
    Delay1.setAttribute(Delay1.Mix, value);
    Label_DelayMixValue.set("text", Math.round(value * 100) + "%");
};

Content.getComponent("Slider_DelayMix").setControlCallback(onSlider_DelayMixControl);

//========REPLACING SLIDERS TEMP

const var Slider_DelayTimeLeft = Content.getComponent("Slider_DelayTimeLeft");
const var Slider_DelayTimeRight = Content.getComponent("Slider_DelayTimeRight");

inline function onSlider_DelayTimeLeftControl(component, value)
{
	if (Button_DelaySync.getValue())
    {
        setDelayTimeLeft(value);
        Label_DelayTimeLeftValue.set("text", syncTimes[value]);
        if (Button_DelayLink.getValue())
        {
            Slider_DelayTimeRight.setValue(value);
            setDelayTimeRight(value);
            Label_DelayTimeRightValue.set("text", syncTimes[value]);
        }
    }
    else 
    {
        setDelayTimeLeft(value);
        Label_DelayTimeLeftValue.set("text", Math.round(value) + "ms");
        if (Button_DelayLink.getValue())
        {
            Slider_DelayTimeRight.setValue(value);
            setDelayTimeRight(value);
            Label_DelayTimeRightValue.set("text", Math.round(value) + "ms");
        }
    }
};

Content.getComponent("Slider_DelayTimeLeft").setControlCallback(onSlider_DelayTimeLeftControl);

inline function onSlider_DelayTimeRightControl(component, value)
{
    if (Button_DelaySync.getValue())
    {
        setDelayTimeRight(value);
        Label_DelayTimeRightValue.set("text", syncTimes[value]);
        if (Button_DelayLink.getValue())
        {
            Slider_DelayTimeLeft.setValue(value);
            setDelayTimeLeft(value);
            Label_DelayTimeLeftValue.set("text", syncTimes[value]);
        }
    }
    else
    {
        setDelayTimeRight(value);
        Label_DelayTimeRightValue.set("text", Math.round(value) + "ms");
        if (Button_DelayLink.getValue())
        {
            Slider_DelayTimeLeft.setValue(value);
            setDelayTimeLeft(value);
            Label_DelayTimeLeftValue.set("text", Math.round(value) + "ms");
        }
    }
};

Content.getComponent("Slider_DelayTimeRight").setControlCallback(onSlider_DelayTimeRightControl);




inline function setDelayTimeSlidersToSynced()
{
        Slider_DelayTimeLeft.set("min", 0);
        Slider_DelayTimeLeft.set("max", 18);
        Slider_DelayTimeLeft.set("stepSize", 1);
        Slider_DelayTimeLeft.set("middlePosition", 9);
        Slider_DelayTimeLeft.set("defaultValue", 5);
        
        Slider_DelayTimeRight.set("min", 0);
        Slider_DelayTimeRight.set("max", 18);
        Slider_DelayTimeRight.set("stepSize", 1);
        Slider_DelayTimeRight.set("middlePosition", 9);
        Slider_DelayTimeRight.set("defaultValue", 5);
        
        //====Problematic section.
        Slider_DelayTimeLeft.setValue(Delay1.getAttribute(Delay1.DelayTimeLeft));
        Slider_DelayTimeRight.setValue(Delay1.getAttribute(Delay1.DelayTimeRight));   
        //====
        
        Label_DelayTimeLeftValue.set("text", syncTimes[Delay1.getAttribute(Delay1.DelayTimeLeft)]);
        Label_DelayTimeRightValue.set("text", syncTimes[Delay1.getAttribute(Delay1.DelayTimeRight)]);    
}

const var delaySyncTimer = Engine.createTimerObject();

delaySyncTimer.setTimerCallback(function(t)
{
    Slider_DelayTimeLeft.changed();
    Slider_DelayTimeRight.changed();
    this.stopTimer();
});

inline function setDelayTimeSlidersToFree()
{
        Slider_DelayTimeLeft.set("min", 0);
        Slider_DelayTimeLeft.set("max", 2000);
        Slider_DelayTimeLeft.set("stepSize", 1);
        Slider_DelayTimeLeft.set("middlePosition", 1050);
        Slider_DelayTimeLeft.set("defaultValue", 200);
        
        Slider_DelayTimeRight.set("min", 0);
        Slider_DelayTimeRight.set("max", 2000);
        Slider_DelayTimeRight.set("stepSize", 1);
        Slider_DelayTimeRight.set("middlePosition", 1050);
        Slider_DelayTimeRight.set("defaultValue", 200);
        
        Slider_DelayTimeLeft.setValue(Delay1.getAttribute(Delay1.DelayTimeLeft));
        Slider_DelayTimeRight.setValue(Delay1.getAttribute(Delay1.DelayTimeRight));  
        Label_DelayTimeLeftValue.set("text", Math.round(Slider_DelayTimeLeft.getValue()) + "ms");
        Label_DelayTimeRightValue.set("text", Math.round(Slider_DelayTimeRight.getValue()) + "ms");        
}

inline function onButton_DelaySyncControl(component, value)
{    
    Delay1.setAttribute(Delay1.TempoSync, value); 
    if (value)
    {
        //===NEW CODE
        setDelayTimeSlidersToSynced();
        delaySyncTimer.startTimer(60);
        //===
    }
    else 
    {
        //===NEW CODE
        setDelayTimeSlidersToFree();
        delaySyncTimer.startTimer(60);
        //===
    };  
};

Content.getComponent("Button_DelaySync").setControlCallback(onButton_DelaySyncControl);


inline function onButton_DelaySettingsControl(component, value)
{
	Panel_DelaySettings.showControl(value);
};

Content.getComponent("Button_DelaySettings").setControlCallback(onButton_DelaySettingsControl);

//Utility

const var Button_WidthEnable = Content.getComponent("Button_WidthEnable");

const var Slider_WidthAmount = Content.getComponent("Slider_WidthAmount");
const var Slider_WidthGain = Content.getComponent("Slider_WidthGain");
const var Label_WidthAmountValue = Content.getComponent("Label_WidthAmountValue");
const var Label_WidthGainValue = Content.getComponent("Label_WidthGainValue");

const var Slider_StutterLFORate = Content.getComponent("Slider_StutterLFORate");
const var Slider_StutterLFOAmount = Content.getComponent("Slider_StutterLFOAmount");
const var Slider_StutterLFORateFree = Content.getComponent("Slider_StutterLFORateFree");

const var Label_StutterLFORateValue = Content.getComponent("Label_StutterLFORateValue");
const var Label_StutterLFOAmountValue = Content.getComponent("Label_StutterLFOAmountValue");

const var Button_StutterLFOSync = Content.getComponent("Button_StutterLFOSync");
const var Button_StutterLFOPreFX = Content.getComponent("Button_StutterLFOPreFX");

inline function onButton_WidthEnableControl(component, value)
{
	Width.setBypassed(1-value);
	LFOGain.setBypassed(1-value);
	if (value)
    {
	    LFOModulator1.setBypassed(1-Button_StutterLFOPreFX.getValue());
	    LFOModulator2.setBypassed(Button_StutterLFOPreFX.getValue());
    }
	else
    {
        LFOModulator1.setBypassed(1);
        LFOModulator2.setBypassed(1);
    }
};

Content.getComponent("Button_WidthEnable").setControlCallback(onButton_WidthEnableControl);

inline function onSlider_StutterLFORateControl(component, value)
{
	if (Button_StutterLFOSync.getValue() == 1)    
    {
        LFOModulator1.setAttribute(LFOModulator1.Frequency, value);
        LFOModulator2.setAttribute(LFOModulator2.Frequency, value);
        Label_StutterLFORateValue.set("text", syncTimes[value]);
    }
};

Content.getComponent("Slider_StutterLFORate").setControlCallback(onSlider_StutterLFORateControl);

inline function onSlider_StutterLFORateFreeControl(component, value)
{
	if (Button_StutterLFOSync.getValue() == 0)
    {
        LFOModulator1.setAttribute(LFOModulator1.Frequency, value);
        LFOModulator2.setAttribute(LFOModulator2.Frequency, value);
        Label_StutterLFORateValue.set("text", value + "Hz");
    }
};

Content.getComponent("Slider_StutterLFORateFree").setControlCallback(onSlider_StutterLFORateFreeControl);

inline function onSlider_StutterLFOAmountControl(component, value)
{
	LFOModulator1.setIntensity(value);
	LFOModulator2.setIntensity(value);
	Label_StutterLFOAmountValue.set("text", Math.round(value * 100) + "%");
};

Content.getComponent("Slider_StutterLFOAmount").setControlCallback(onSlider_StutterLFOAmountControl);


inline function onButton_StutterLFOPreFXControl(component, value)
{
	LFOModulator1.setBypassed(1-value);
	LFOModulator2.setBypassed(value);
};

Content.getComponent("Button_StutterLFOPreFX").setControlCallback(onButton_StutterLFOPreFXControl);


inline function onButton_StutterLFOSyncControl(component, value)
{
        LFOModulator1.setAttribute(LFOModulator1.TempoSync, value);
        LFOModulator2.setAttribute(LFOModulator1.TempoSync, value);
	    Slider_StutterLFORate.showControl(value);
	    Slider_StutterLFORateFree.showControl(1-value);
	    if (value)
        {
	        LFOModulator1.setAttribute(LFOModulator1.Frequency, Slider_StutterLFORate.getValue());
	        LFOModulator2.setAttribute(LFOModulator2.Frequency, Slider_StutterLFORate.getValue());
	        Label_StutterLFORateValue.set("text", syncTimes[Slider_StutterLFORate.getValue()]);
        }
	    else
        {
            LFOModulator1.setAttribute(LFOModulator1.Frequency, Slider_StutterLFORateFree.getValue());
	        LFOModulator2.setAttribute(LFOModulator2.Frequency, Slider_StutterLFORateFree.getValue());
	        Label_StutterLFORateValue.set("text", Slider_StutterLFORateFree.getValue() + "Hz");
        }
};

Content.getComponent("Button_StutterLFOSync").setControlCallback(onButton_StutterLFOSyncControl);

//Width

inline function onSlider_WidthAmountControl(component, value)
{
    Width.setAttribute(Width.Width, value);
    Label_WidthAmountValue.set("text", Math.round(value) + "%");
};

Content.getComponent("Slider_WidthAmount").setControlCallback(onSlider_WidthAmountControl);

inline function onSlider_WidthGainControl(component, value)
{
    Width.setAttribute(Width.Gain, value);
    Label_WidthGainValue.set("text", value + "db");
};

Content.getComponent("Slider_WidthGain").setControlCallback(onSlider_WidthGainControl);

inline function onButton_WidthSettingsControl(component, value)
{
	Panel_WidthSettings.showControl(value);
};

Content.getComponent("Button_WidthSettings").setControlCallback(onButton_WidthSettingsControl);

//Amp

const var Button_AmpEnable = Content.getComponent("Button_AmpEnable");

const var Slider_AmpEQLow = Content.getComponent("Slider_AmpEQLow");
const var Slider_AmpEQMid = Content.getComponent("Slider_AmpEQMid");
const var Slider_AmpEQHigh = Content.getComponent("Slider_AmpEQHigh");
const var Slider_AmpGain = Content.getComponent("Slider_AmpGain");
const var Slider_AmpOutput = Content.getComponent("Slider_AmpOutput");

const var ComboBox_AmpCabSelect = Content.getComponent("ComboBox_AmpCabSelect");
const var Button_AmpComboBoxUp = Content.getComponent("Button_AmpComboBoxUp");
const var Button_AmpComboBoxDown = Content.getComponent("Button_AmpComboBoxDown");

const var Label_AmpEQLowValue = Content.getComponent("Label_AmpEQLowValue");
const var Label_AmpEQMidValue = Content.getComponent("Label_AmpEQMidValue");
const var Label_AmpEQHighValue = Content.getComponent("Label_AmpEQHighValue");
const var Label_AmpGainValue = Content.getComponent("Label_AmpGainValue");
const var Label_AmpOutputValue = Content.getComponent("Label_AmpOutputValue");

const var Button_AmpCabBypass = Content.getComponent("Button_AmpCabBypass");
const var Button_AmpHQ = Content.getComponent("Button_AmpHQ");

const var Amp_EQ = Synth.getEffect("Amp_EQ");
const var Amp = Synth.getEffect("Amp");
const var Amp_CorrectiveEQ = Synth.getEffect("Amp_CorrectiveEQ");
const var Amp_Cab = Synth.getAudioSampleProcessor("Amp_Cab");

inline function onSlider_AmpEQLowControl(component, value)
{
	//EQ Low
	Label_AmpEQLowValue.set("text", value+"dB");
	Amp_EQ.setAttribute(2 * Amp_EQ.BandOffset + Amp_EQ.Gain, value);
};

Content.getComponent("Slider_AmpEQLow").setControlCallback(onSlider_AmpEQLowControl);

inline function onSlider_AmpEQMidControl(component, value)
{
	//EQ Mid
	Label_AmpEQMidValue.set("text", value+"dB");
	Amp_EQ.setAttribute(4 * Amp_EQ.BandOffset + Amp_EQ.Gain, value);
};

Content.getComponent("Slider_AmpEQMid").setControlCallback(onSlider_AmpEQMidControl);

inline function onSlider_AmpEQHighControl(component, value)
{
	//EQ High
	Label_AmpEQHighValue.set("text", value+"dB");
	Amp_EQ.setAttribute(3 * Amp_EQ.BandOffset + Amp_EQ.Gain, value);
};

Content.getComponent("Slider_AmpEQHigh").setControlCallback(onSlider_AmpEQHighControl);

inline function onSlider_AmpGainControl(component, value)
{
	//Gain
	Amp.setAttribute(Amp.Gain, value);
	Label_AmpGainValue.set("text", value + "%");
};

Content.getComponent("Slider_AmpGain").setControlCallback(onSlider_AmpGainControl);



inline function onSlider_AmpOutputControl(component, value)
{
	//Output
	Amp.setAttribute(Amp.Output, value);
	Label_AmpOutputValue.set("text", value + "dB");
};

Content.getComponent("Slider_AmpOutput").setControlCallback(onSlider_AmpOutputControl);


inline function onComboBox_AmpCabSelectControl(component, value)
{
    local fullCabName = "{PROJECT_FOLDER}Cab " + value + ".wav";
	Amp_Cab.setFile(fullCabName);
};

Content.getComponent("ComboBox_AmpCabSelect").setControlCallback(onComboBox_AmpCabSelectControl);


inline function onButton_AmpComboBoxUpControl(component, value)
{
	if (value)
    {
        if (ComboBox_AmpCabSelect.getValue() > 1)
        {
            ComboBox_AmpCabSelect.setValue(ComboBox_AmpCabSelect.getValue() - 1);
            ComboBox_AmpCabSelect.changed();
        }
        else
        {
            ComboBox_AmpCabSelect.setValue(ComboBox_AmpCabSelect.get("max"));
            ComboBox_AmpCabSelect.changed();
        }
    }
};

Content.getComponent("Button_AmpComboBoxUp").setControlCallback(onButton_AmpComboBoxUpControl);

inline function onButton_AmpComboBoxDownControl(component, value)
{
	if (value)
    {
        if (ComboBox_AmpCabSelect.getValue() < ComboBox_AmpCabSelect.get("max"))
        {
            ComboBox_AmpCabSelect.setValue(ComboBox_AmpCabSelect.getValue() + 1);
            ComboBox_AmpCabSelect.changed();
        }
        else
        {
            ComboBox_AmpCabSelect.setValue(ComboBox_AmpCabSelect.get("min"));
            ComboBox_AmpCabSelect.changed();
        }
    }
};

Content.getComponent("Button_AmpComboBoxDown").setControlCallback(onButton_AmpComboBoxDownControl);


inline function onButton_AmpSettingsControl(component, value)
{
	Panel_AmpSettings.showControl(value);
};

Content.getComponent("Button_AmpSettings").setControlCallback(onButton_AmpSettingsControl);


inline function onButton_AmpEnableControl(component, value)
{
	Amp_EQ.setBypassed(1-value);
	Amp.setBypassed(1-value);
	Amp_CorrectiveEQ.setBypassed(1-value);
    Button_AmpCabBypass.setValue(value);
    Button_AmpCabBypass.changed();	
};

Content.getComponent("Button_AmpEnable").setControlCallback(onButton_AmpEnableControl);

var cabBypassMemory;

inline function onButton_AmpCabBypassControl(component, value)
{

	if (Button_AmpEnable.getValue() == 1)
    {
            Amp_Cab.setBypassed(1-value);
    }
    
    else 
    {
        Amp_Cab.setBypassed(1);
        Button_AmpCabBypass.setValue(0);
        Button_AmpCabBypass.changed();
    }   
   
};

Content.getComponent("Button_AmpCabBypass").setControlCallback(onButton_AmpCabBypassControl);
