//------------------------------------------------------------FX

include("fxImageData.js");

const var Panel_FX = Content.getComponent("Panel_FX");
const var Button_FXDisplay = Content.getComponent("Button_FXDisplay");

const var ShapeFX1 = Synth.getEffect("Shape FX1");
const var TubeDrive = Synth.getEffect("TubeDrive");
const var Filter1 = Synth.getEffect("Filter1");
const var Compressor = Synth.getEffect("Compressor");
const var Width = Synth.getEffect("Width");
const var PhaseFX1 = Synth.getEffect("Phase FX1");
const var Degrade = Synth.getEffect("Degrade");
const var SimpleReverb1 = Synth.getEffect("Simple Reverb1");
const var Delay1 = Synth.getEffect("Delay1");

const var Button_DriveTubeDriveEnable = Content.getComponent("Button_DriveTubeDriveEnable");

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

const var Label_FXTitle = Content.getComponent("Label_FXTitle");

const var ComboBox_DriveOversample1 = Content.getComponent("ComboBox_DriveOversample1");
const var ComboBox_FilterMode = Content.getComponent("ComboBox_FilterMode");

//LAF

const var listFXPanels = [Panel_FilterSettings,
Panel_EQSettings,
Panel_CompSettings,
Panel_AmpSettings,
Panel_DriveSettings,
Panel_DegradeSettings,
Panel_WidthSettings,
Panel_PhaserSettings,
Panel_ReverbSettings,
Panel_DelaySettings];

const var listFXLabels = [Content.getComponent("Label_EQTitle"),
                             Content.getComponent("Label_CompTitle"),
                             Content.getComponent("Label_FilterTitle"),
                             Content.getComponent("Label_DriveTitle"),
                             Content.getComponent("Label_ReverbTitle"),
                             Content.getComponent("Label_DelayTitle"),
                             Content.getComponent("Label_WidthTitle"),
                             Content.getComponent("Label_PhaserTitle"),
                             Content.getComponent("Label_DegradeTitle"),
                             Content.getComponent("Label_AmpTitle")];

const var listFXButtonsLeft = [Button_FilterSettings,
Button_EQSettings,
Button_CompSettings,
Button_AmpSettings,
Button_DriveSettings,
Button_DegradeSettings];

const var listFXButtonsRight = [Button_WidthSettings,
Button_PhaserSettings,
Button_ReverbSettings,
Button_DelaySettings];

const var listRandomizationButtonsFX = [Content.getComponent("Button_RandomizeFXFilterFreq"),
                                    Content.getComponent("Button_RandomizeFXFilterQ"),
                                    Content.getComponent("Button_RandomizeFXAmpLow"),
                                    Content.getComponent("Button_RandomizeFXAmpMid"),
                                    Content.getComponent("Button_RandomizeFXAmpHigh"),
                                    Content.getComponent("Button_RandomizeFXAmpDrive"),
                                    Content.getComponent("Button_RandomizeFXAmpOutput"),
                                    Content.getComponent("Button_RandomizeFXAmpCabinet"),
                                    Content.getComponent("Button_RandomizeFXDriveWaveShaperGain"),
                                    Content.getComponent("Button_RandomizeFXDriveTubeDriveGain"),
                                    Content.getComponent("Button_RandomizeFXWidenerWidth"),
                                    Content.getComponent("Button_RandomizeFXStutterRate"),
                                    Content.getComponent("Button_RandomizeFXStutterAmount"),
                                    Content.getComponent("Button_RandomizeFXPhaserRateA"),
                                    Content.getComponent("Button_RandomizeFXPhaserRateB"),
                                    Content.getComponent("Button_RandomizeFXPhaserFeedback"),
                                    Content.getComponent("Button_RandomizeFXPhaserMix"),
                                    Content.getComponent("Button_RandomizeFXDegradeBitDepth"),
                                    Content.getComponent("Button_RandomizeFXSampleHold"),
                                    Content.getComponent("Button_RandomizeFXReverbSize"),
                                    Content.getComponent("Button_RandomizeFXReverbDamping"),
                                    Content.getComponent("Button_RandomizeFXReverbWidth"),
                                    Content.getComponent("Button_RandomizeFXReverbMix"),
                                    Content.getComponent("Button_RandomizeFXDelayTimeL"),
                                    Content.getComponent("Button_RandomizeFXDelayTimeR"),
                                    Content.getComponent("Button_RandomizeFXDelayFeedbackL"),
                                    Content.getComponent("Button_RandomizeFXDelayFeedbackR"),
                                    Content.getComponent("Button_RandomizeFXDelayMix")];
                                    
const var listRandomizationButtonsFXBypass = [Content.getComponent("Button_RandomizeFXFilterBypass"),
                                          Content.getComponent("Button_RandomizeFXAmpBypass"),
                                          Content.getComponent("Button_RandomizeFXDrive"),
                                          Content.getComponent("Button_RandomizeFXDegradeBypass"),
                                          Content.getComponent("Button_RandomizeFXWidenerBypass"),
                                          Content.getComponent("Button_RandomizeFXPhaserBypass"),
                                          Content.getComponent("Button_RandomizeFXReverbBypass"),
                                          Content.getComponent("Button_RandomizeFXDelayBypass")];


const var FXImageLineWidth = 1.25;

inline function positionFXPanel()
{
	local padding = 6;
	Panel_FX.setPosition(0, 0, Panel_BG.get("width"), Panel_BG.get("height"));

	for (l in listFXPanels)
	{
		l.setPosition((Panel_BG.get("width") / 2) - (l.get("width") / 2), (Panel_BG.get("height") / 2) - (l.get("height") / 2), 600, 300);
		l.set("borderRadius", 2.0);
		l.set("bgColour", 0x00FFFFFF);
		l.set("textColour", 0x00FFFFFF);
	}

	for (i=0; i<listFXButtonsLeft.length; i++)
	{
		listFXButtonsLeft[i].setPosition(listFXPanels[0].get("x") - (listFXButtonsLeft[0].get("width") + padding), listFXPanels[0].get("y") + ((listFXButtonsLeft[0].get("height") + padding) * i) + 2, listFXButtonsLeft[0].get("width"), listFXPanels[0].get("height") / listFXButtonsLeft.length - padding);
	}

	for (i=0; i<listFXButtonsRight.length; i++)
	{
		listFXButtonsRight[i].setPosition(listFXPanels[0].get("x") + listFXPanels[0].get("width") + padding, listFXPanels[0].get("y") + ((listFXButtonsLeft[0].get("height") + padding) * i) + 2, listFXButtonsLeft[0].get("width"), listFXPanels[0].get("height") / listFXButtonsLeft.length - padding);
	}


	for (i=0; i<listFXLabels.length; i++)
	{
		listFXLabels[i].setPosition((listFXPanels[i].get("width") / 2) - (listFXLabels[i].get("width") / 2), 8, listFXLabels[i].get("width"), listFXLabels[i].get("height"));
	}

	Label_FXTitle.set("x", (Panel_FX.get("width") / 2) - (Label_FXTitle.get("width") / 2));
}


//positionFXPanel();

//FX Panel

//Close Button

inline function onButton_CloseFXPanelControl(component, value)
{
    if (value)
            closePanels("none");
};

Content.getComponent("Button_CloseFXPanel").setControlCallback(onButton_CloseFXPanelControl);

inline function onButton_FXDisplayControl(component, value)
{
    if (value)
        closePanels(Button_FXDisplay);
	Panel_FX.showControl(value);   
};

Content.getComponent("Button_FXDisplay").setControlCallback(onButton_FXDisplayControl);

//Paint Routine

//Paint Routine

Panel_FX.setPaintRoutine(function(g)
{
    g.setColour(0xFB111111);
    g.fillRoundedRectangle([0, 0, this.getWidth(), this.getHeight()], 2.0);
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
	Label_FilterFreqValue.set("text", Math.round(value) + "Hz");	
};

Content.getComponent("Slider_FilterFreq").setControlCallback(onSlider_FilterFreqControl);

inline function onSlider_FilterQControl(component, value)
{
	Filter1.setAttribute(Filter1.Q, value);
    Label_FilterQValue.set("text", Engine.doubleToString(value, 2));
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
	Label_CompThresholdValue.set("text", Math.round(value) + "dB");

	Panel_CompImage.repaint();
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

	Panel_CompImage.repaint();
};

Content.getComponent("Slider_CompRatio").setControlCallback(onSlider_CompRatioControl);

inline function onSlider_CompMakeupControl(component, value)
{
	Compressor.setAttribute(Compressor.Makeup, value);
	Label_CompMakeupValue.set("text", Math.round(value) + "dB");

	Panel_CompImage.repaint();
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
    Label_DriveWaveShaperGainValue.set("text", Math.round(value) + "db");

    Panel_DriveImage.repaint();
};

Content.getComponent("Slider_DriveWaveshaperGain").setControlCallback(onSlider_DriveWaveshaperGainControl);

inline function onSlider_DriveTubeGainControl(component, value)
{
    TubeDrive.setAttribute(TubeDrive.Gain, value);
    Label_DriveTubeGainValue.set("text", Math.round(value) + "db");

    Panel_DriveImage.repaint();
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

    Panel_PhaserImage.repaint();
};

Content.getComponent("Slider_PhaserRateA").setControlCallback(onSlider_PhaserRateAControl);

inline function onSlider_PhaserRateBControl(component, value)
{
	PhaseFX1.setAttribute(PhaseFX1.Frequency2, value);
	Label_PhaserRateBAmount.set("text", Math.round(value) + "Hz");

    Panel_PhaserImage.repaint();
};

Content.getComponent("Slider_PhaserRateB").setControlCallback(onSlider_PhaserRateBControl);

inline function onSlider_PhaserFeedbackControl(component, value)
{
	PhaseFX1.setAttribute(PhaseFX1.Feedback, value);
	Label_PhaserFeedbackAmount.set("text", Math.round(value * 100) + "%");

    Panel_PhaserImage.repaint();
};

Content.getComponent("Slider_PhaserFeedback").setControlCallback(onSlider_PhaserFeedbackControl);

inline function onSlider_PhaserMixControl(component, value)
{
	PhaseFX1.setAttribute(PhaseFX1.Mix, value);
	Label_PhaserMixAmount.set("text", Math.round(value * 100) + "%");
	
	Panel_PhaserImage.repaint();
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
	Label_DegradeBitDepthValue.set("text", Math.round(value));

	Panel_DegradeImage.repaint();
};

Content.getComponent("Slider_DegradeBitDepth").setControlCallback(onSlider_DegradeBitDepthControl);

inline function onSlider_DegradeSampleHoldControl(component, value)
{
	Degrade.setAttribute(Degrade.SampleHold, value);
	Label_DegradeSampleHoldValue.set("text", value);

	Panel_DegradeImage.repaint();	
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

    Panel_ReverbImage.repaint();
};

Content.getComponent("Slider_ReverbSize").setControlCallback(onSlider_ReverbSizeControl);

inline function onSlider_ReverbWidthControl(component, value)
{
	SimpleReverb1.setAttribute(SimpleReverb1.Width, value);
	Label_ReverbWidthValue.set("text", Math.round(value * 100) + "%");

    Panel_ReverbImage.repaint();
};

Content.getComponent("Slider_ReverbWidth").setControlCallback(onSlider_ReverbWidthControl);

inline function onSlider_ReverbDampingControl(component, value)
{
	SimpleReverb1.setAttribute(SimpleReverb1.Damping, value);
	Label_ReverbDampingValue.set("text", Math.round(value * 100) + "%");

    Panel_ReverbImage.repaint();
};

Content.getComponent("Slider_ReverbDamping").setControlCallback(onSlider_ReverbDampingControl);

inline function onSlider_ReverbMixControl(component, value)
{
	SimpleReverb1.setAttribute(SimpleReverb1.WetLevel, value);
	Label_ReverbMixValue.set("text", Math.round(value * 100) + "%");

    Panel_ReverbImage.repaint();
};

Content.getComponent("Slider_ReverbMix").setControlCallback(onSlider_ReverbMixControl);

//Delay

const var Button_DelayLink = Content.getComponent("Button_DelayLink");
const var Button_DelaySync = Content.getComponent("Button_DelaySync");
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
	Delay1.setAttribute(Delay1.DelayTimeLeft, value);
    Panel_DelayImage.repaint();
}

inline function setDelayTimeRight(value)
{
	Delay1.setAttribute(Delay1.DelayTimeRight, value);

    Panel_DelayImage.repaint();
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

    Panel_DelayImage.repaint();
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

    Panel_DelayImage.repaint();
};

Content.getComponent("Slider_DelayFeedbackRight").setControlCallback(onSlider_DelayFeedbackRightControl);

inline function onSlider_DelayMixControl(component, value)
{
    Delay1.setAttribute(Delay1.Mix, value);
    Label_DelayMixValue.set("text", Math.round(value * 100) + "%");

    Panel_DelayImage.repaint();
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

    Panel_DelayImage.repaint();
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

    Panel_DelayImage.repaint();
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

    Panel_DelayImage.repaint();
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

    Panel_WidthImage.repaint();
};

Content.getComponent("Slider_StutterLFORate").setControlCallback(onSlider_StutterLFORateControl);

inline function onSlider_StutterLFORateFreeControl(component, value)
{
	if (Button_StutterLFOSync.getValue() == 0)
    {
        LFOModulator1.setAttribute(LFOModulator1.Frequency, value);
        LFOModulator2.setAttribute(LFOModulator2.Frequency, value);
        Label_StutterLFORateValue.set("text", Math.round(value) + "Hz");
    }

    Panel_WidthImage.repaint();
};

Content.getComponent("Slider_StutterLFORateFree").setControlCallback(onSlider_StutterLFORateFreeControl);

inline function onSlider_StutterLFOAmountControl(component, value)
{
	LFOModulator1.setIntensity(value);
	LFOModulator2.setIntensity(value);
	Label_StutterLFOAmountValue.set("text", Math.round(value * 100) + "%");

    Panel_WidthImage.repaint();
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

    Panel_WidthImage.repaint();
};

Content.getComponent("Slider_WidthAmount").setControlCallback(onSlider_WidthAmountControl);

inline function onSlider_WidthGainControl(component, value)
{
    Width.setAttribute(Width.Gain, value);
    Label_WidthGainValue.set("text", Math.round(value) + "db");
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

	Panel_AmpImage.repaint();
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
    local fullCabName = "{PROJECT_FOLDER}Cab " + Math.round(value) + ".wav";
	Amp_Cab.setFile(fullCabName);

	Panel_AmpImage.repaint();
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
   
   Panel_AmpImage.repaint();
};

Content.getComponent("Button_AmpCabBypass").setControlCallback(onButton_AmpCabBypassControl);

//Panel Image LAFs

const var Panel_CompImage = Content.getComponent("Panel_CompImage");
const var Panel_AmpImage = Content.getComponent("Panel_AmpImage");
const var Panel_DriveImage = Content.getComponent("Panel_DriveImage");
const var Panel_DegradeImage = Content.getComponent("Panel_DegradeImage");
const var Panel_WidthImage = Content.getComponent("Panel_WidthImage");
const var Panel_PhaserImage = Content.getComponent("Panel_PhaserImage");
const var Panel_ReverbImage = Content.getComponent("Panel_ReverbImage");
const var Panel_DelayImage = Content.getComponent("Panel_DelayImage");

const var pathFXPanel = Content.createPath();

//Compressor

var compThresholdDraw;


Panel_CompImage.setPaintRoutine(function(g)
{

	compThresholdDraw = (1-Slider_CompThreshold.getValueNormalized()) * this.getHeight();

	//Input Rectangle
	g.setColour(Colours.lightgrey);

	if (Slider_CompThreshold.getValue() > -48)
		g.drawRoundedRectangle([(this.getWidth() / 2) - (this.getWidth() / 6), this.getHeight() - (this.getHeight() / 2), this.getWidth() / 3, this.getHeight() / 2 - 1], 2.0, FXImageLineWidth);
	else
		g.drawRoundedRectangle([(this.getWidth() / 2) - (this.getWidth() / 6), compThresholdDraw, this.getWidth() / 3, this.getHeight() - compThresholdDraw - 1], 2.0, FXImageLineWidth);


	//Threshold Rectangle
	g.setColour(Colours.lightblue);
	g.drawRoundedRectangle([(this.getWidth() / 2) - (this.getWidth() / 8), 0, this.getWidth() / 4, compThresholdDraw - 1], 2.0, FXImageLineWidth);

	g.setColour(0x1D99F1FF);
	g.fillRoundedRectangle([(this.getWidth() / 2) - (this.getWidth() / 8), 0, this.getWidth() / 4, compThresholdDraw - 1], 2.0);

	//Ratio Lines

	g.setColour(Colours.lightblue);
	for (i=1; i<Slider_CompRatio.getValue(); i++)
		g.drawLine((this.getWidth() / 2) - (this.getWidth() / 7) + 2, ((this.getWidth() / 2) + this.getWidth() / 7) - 4, ((1-Slider_CompThreshold.getValueNormalized()) * this.getHeight() / Slider_CompRatio.getValue() * i), ((1-Slider_CompThreshold.getValueNormalized()) * this.getHeight() / Slider_CompRatio.getValue() * i), FXImageLineWidth);


	//OutputGain
	g.setColour(0x11BFBFBF);
	g.fillRoundedRectangle([(this.getWidth() / 2) - (this.getWidth() / 6) + 2, this.getHeight() * (1-Slider_CompMakeup.getValueNormalized()), this.getWidth() / 3 - 4, this.getHeight() * Slider_CompMakeup.getValueNormalized()], 2.0);
	g.setColour(Colours.grey);
	g.drawRoundedRectangle([(this.getWidth() / 2) - (this.getWidth() / 6) + 2, this.getHeight() * (1-Slider_CompMakeup.getValueNormalized()), this.getWidth() / 3 - 4, this.getHeight() * Slider_CompMakeup.getValueNormalized()], 2.0, FXImageLineWidth);

	//Mix
	//Change Colour
});

//Amp

Panel_AmpImage.setPaintRoutine(function(g)
{
	g.setColour(Colours.white);
	pathFXPanel.loadFromData(ampHeadData);
	g.drawPath(pathFXPanel, [this.getWidth() / 2 - (this.getWidth() * 0.25), 32, this.getWidth() * .5, this.getHeight() * .2], FXImageLineWidth);

	if (Slider_AmpGain.getValueNormalized() > .33 && Slider_AmpGain.getValueNormalized() < .66)
		{
			pathFXPanel.loadFromData(ampFlamesHalfData);
			g.drawPath(pathFXPanel, [this.getWidth() / 2 - (this.getWidth() * 0.3), 16, this.getWidth() * .63, this.getHeight() * .26], FXImageLineWidth);
		}
	if (Slider_AmpGain.getValueNormalized() > .66)
		{
			pathFXPanel.loadFromData(ampFlamesFullData);
			g.drawPath(pathFXPanel, [this.getWidth() / 2 - (this.getWidth() * 0.387), 0, this.getWidth() * .75, this.getHeight() * .33], FXImageLineWidth);
		}

	if (Button_AmpCabBypass.getValue())
		g.setColour(Colours.white);
	else
		g.setColour(Colours.darkgrey);

	switch (ComboBox_AmpCabSelect.getValue())
	{
		case 1: 
			pathFXPanel.loadFromData(cabData01);
			g.drawPath(pathFXPanel, [this.getWidth() / 2 - (this.getWidth() * 0.4), this.getHeight() * .2 + 34, this.getWidth() * .8, this.getHeight() * .8 - 35], FXImageLineWidth);
		break;

		case 2: 
			pathFXPanel.loadFromData(cabData02);
			g.drawPath(pathFXPanel, [this.getWidth() / 2 - (this.getWidth() * 0.35), this.getHeight() * .2 + 34, this.getWidth() * .7, this.getHeight() * .7 - 18], FXImageLineWidth);
		break;

		case 3: 
			pathFXPanel.loadFromData(cabData03);
			g.drawPath(pathFXPanel, [this.getWidth() / 2 - (this.getWidth() * 0.35) + 12, this.getHeight() * .2 + 34, this.getWidth() * .7, this.getHeight() * .55 - 10], FXImageLineWidth);
		break;

		case 4: 
			pathFXPanel.loadFromData(cabData04);
			g.drawPath(pathFXPanel, [this.getWidth() / 2 - (this.getWidth() * 0.275), this.getHeight() * .2 + 34, this.getWidth() * .55, this.getHeight() * .8 - 35], FXImageLineWidth);
		break;

		case 5: 
			pathFXPanel.loadFromData(cabData05);
			g.drawPath(pathFXPanel, [this.getWidth() / 2 - (this.getWidth() * 0.35) + 16, this.getHeight() * .2 + 34, this.getWidth() * .7, this.getHeight() * .45 - 10], FXImageLineWidth);
		break;

		case 6: 
			pathFXPanel.loadFromData(cabData06);
			g.drawPath(pathFXPanel, [this.getWidth() / 2 - (this.getWidth() * 0.25), this.getHeight() * .2 + 34, this.getWidth() * .5, this.getHeight() * .4 - 10], FXImageLineWidth);
		break;

		case 7: 
			pathFXPanel.loadFromData(cabData07);
			g.drawPath(pathFXPanel, [this.getWidth() / 2 - (this.getWidth() * 0.25), this.getHeight() * .2 + 34, this.getWidth() * .5, this.getHeight() * .45 - 10], FXImageLineWidth);
		break;

		case 8: 
			pathFXPanel.loadFromData(cabData01);
			g.drawPath(pathFXPanel, [this.getWidth() / 2 - (this.getWidth() * 0.4), this.getHeight() * .2 + 34, this.getWidth() * .8, this.getHeight() * .8 - 35], FXImageLineWidth);
		break;

		case 9: 
			pathFXPanel.loadFromData(cabData02);
			g.drawPath(pathFXPanel, [this.getWidth() / 2 - (this.getWidth() * 0.35), this.getHeight() * .2 + 34, this.getWidth() * .7, this.getHeight() * .7 - 18], FXImageLineWidth);
		break;

		case 10: 
			pathFXPanel.loadFromData(cabData03);
			g.drawPath(pathFXPanel, [this.getWidth() / 2 - (this.getWidth() * 0.35) + 12, this.getHeight() * .2 + 34, this.getWidth() * .7, this.getHeight() * .55 - 10], FXImageLineWidth);
		break;

		case 11: 
			pathFXPanel.loadFromData(cabData04);
			g.drawPath(pathFXPanel, [this.getWidth() / 2 - (this.getWidth() * 0.275), this.getHeight() * .2 + 34, this.getWidth() * .55, this.getHeight() * .8 - 35], FXImageLineWidth);
		break;

		case 12: 
			pathFXPanel.loadFromData(cabData05);
			g.drawPath(pathFXPanel, [this.getWidth() / 2 - (this.getWidth() * 0.35) + 16, this.getHeight() * .2 + 34, this.getWidth() * .7, this.getHeight() * .45 - 10], FXImageLineWidth);
		break;

		case 13: 
			pathFXPanel.loadFromData(cabData06);
			g.drawPath(pathFXPanel, [this.getWidth() / 2 - (this.getWidth() * 0.25), this.getHeight() * .2 + 34, this.getWidth() * .5, this.getHeight() * .4 - 10], FXImageLineWidth);
		break;

		case 14: 
			pathFXPanel.loadFromData(cabData07);
			g.drawPath(pathFXPanel, [this.getWidth() / 2 - (this.getWidth() * 0.25), this.getHeight() * .2 + 34, this.getWidth() * .5, this.getHeight() * .45 - 10], FXImageLineWidth);
		break;
	}

	
});

//Drive

Panel_DriveImage.setPaintRoutine(function(g)
{
	//Diode
	g.setColour(Colours.white);
	pathFXPanel.loadFromData(driveDiodeData);
	g.drawPath(pathFXPanel, [this.getWidth() * .2, this.getHeight() * .1, this.getWidth() * .6, this.getHeight() * .2], FXImageLineWidth);

	//Tubes
	g.setColour(Colours.white);
	pathFXPanel.loadFromData(driveTubeData);
	g.drawPath(pathFXPanel, [this.getWidth() * .2, (this.getHeight() * .1) + this.getHeight() * .3, this.getWidth() * .2, this.getHeight() * .4], FXImageLineWidth);
	g.drawPath(pathFXPanel, [this.getWidth() * .6, (this.getHeight() * .1) + this.getHeight() * .3, this.getWidth() * .2, this.getHeight() * .4], FXImageLineWidth);

	//Sparks

	
	if (Slider_DriveWaveshaperGain.getValueNormalized() > .35 )
	{
		pathFXPanel.loadFromData(driveDiodeSparksData);
		g.fillPath(pathFXPanel, [this.getWidth() * .25, 0, this.getWidth() * .5, this.getHeight() * .4]);
	}

	if (Slider_DriveTubeGain.getValueNormalized() > .35)
	{
		pathFXPanel.loadFromData(driveTubeSparksData);
		g.fillPath(pathFXPanel, [this.getWidth() * .1, this.getHeight() * .5, this.getWidth() * .8, this.getHeight() * .25]);
	}
});

//Degrade

var degradePointsX = [];
var degradePointsY = [];
var degradeColours = [];
const var degradeColoursList = [Colours.white, Colours.darkgrey, Colours.grey, Colours.lightblue, Colours.lightgrey];

for (i=0; i<140; i++)
{
	degradePointsX.push(Math.random());
	degradePointsY.push(Math.random());
	degradeColours.push(degradeColoursList[Math.randInt(0, 4)]);
}

Panel_DegradeImage.setPaintRoutine(function(g)
{
	
	for (i=0; i<degradePointsX.length; i++)
	{
		g.setColour(Colours.withAlpha(degradeColours[i], 1.0));
		g.drawRoundedRectangle([(degradePointsX[i] * this.getLocalBounds(32)[2]) + 32, (degradePointsY[i] * this.getLocalBounds(32)[3]) + 32, 8 + (Slider_DegradeSampleHold.getValue() * .35), 8], Math.range(Slider_DegradeBitDepth.getValue() - 4, 0.0, 9.0), FXImageLineWidth);
		g.setColour(Colours.withAlpha(degradeColours[i], .7));
		g.fillRoundedRectangle([(degradePointsX[i] * this.getLocalBounds(32)[2]) + 32, (degradePointsY[i] * this.getLocalBounds(32)[3]) + 32, 8 + (Slider_DegradeSampleHold.getValue() * .35), 8], Math.range(Slider_DegradeBitDepth.getValue() - 4, 0.0, 9.0));
	}
});

//Width

Panel_WidthImage.setPaintRoutine(function(g)
{
	//Width
	g.setColour(Colours.white);
	g.drawLine(this.getWidth() / 2, this.getWidth() / 2, 0, this.getHeight(), 1.5);

	g.drawTriangle([(this.getWidth() / 2) - ((this.getWidth() / 2) * Slider_WidthAmount.getValueNormalized()), 20, this.getWidth() * Slider_WidthAmount.getValueNormalized(), this.getHeight() - 40], Math.toRadians(180), FXImageLineWidth);

	//Stutter

	var stutterNumSteps;
	var stutterStepHeight = 4;

	//Stutter Check Sync
		if (Button_StutterLFOSync.getValue() == 1)    
    	{
    		stutterNumSteps = Math.round(Slider_StutterLFORate.getValueNormalized() * 10);
    	}
    	else
    	{
    		stutterNumSteps = Math.round(Slider_StutterLFORateFree.getValueNormalized() * 10);
    	}


    for (i=0; i<stutterNumSteps; i++)
    {
        g.setColour(Colours.withAlpha(0xFF030303, Slider_StutterLFOAmount.getValueNormalized()));
    	g.fillRoundedRectangle([0, this.getHeight() * (i / 10), this.getWidth(), stutterStepHeight], 2.0);
        g.setColour(Colours.withAlpha(Colours.darkgrey, Slider_StutterLFOAmount.getValueNormalized()));
    	g.drawRoundedRectangle([0, this.getHeight() * (i / 10), this.getWidth(), stutterStepHeight], 2.0, FXImageLineWidth);
    }
});

//Phaser

reg phaserSineWidthL;
reg phaserSineWidthR;
reg phaserYPos;
reg phaserHeight;
const var phaserNumPoints = 256;
const var phaserPathL = Content.createPath();
const var phaserPathR = Content.createPath();

Panel_PhaserImage.setPaintRoutine(function(g)
{   
	//Phaser Left
	
	//y position = panel height / 2 - (panel height * (feedback slider normalized / 2))
	phaserYPos = (this.getHeight() / 2) - (this.getHeight() * (Slider_PhaserFeedback.getValueNormalized() / 4));
	phaserHeight = (Slider_PhaserFeedback.getValueNormalized() == 0.0 ? 1 : (this.getHeight() * Slider_PhaserFeedback.getValueNormalized()) * .5);
	
	
	phaserPathL.clear();
	
	if (Slider_PhaserFeedback.getValueNormalized() == 0)	
	{
		g.setColour(Colours.white);
		g.drawLine(0, this.getWidth(), (this.getHeight() / 2) - 20, (this.getHeight() / 2) - 20, 1.0);
		g.setColour(Colours.lightblue);
		g.drawLine(0, this.getWidth(), (this.getHeight() / 2) + 20, (this.getHeight() / 2) + 20, 1.0);
	}
	else
	{
		phaserSineWidthL = (Slider_PhaserRateA.getValueNormalized() == 0 ? 0.07155949854734688 : Slider_PhaserRateA.getValueNormalized()) * 15;	
		phaserSineWidthR = (Slider_PhaserRateB.getValueNormalized() == 0 ? 0.07155949854734688 : Slider_PhaserRateB.getValueNormalized()) * 15;

		phaserPathL.clear();
		phaserPathR.clear();

		for (i=0; i < phaserNumPoints; i++)
		{
			phaserPathL.lineTo(i, Math.sin(i / phaserNumPoints * 2.0 * Math.PI * phaserSineWidthL));
			phaserPathR.lineTo(i, Math.sin(i / phaserNumPoints * 2.0 * Math.PI * phaserSineWidthR));
		}
		
		g.setColour(Colours.white);
		g.drawPath(phaserPathL, [0, phaserYPos - 20, this.getWidth(), phaserHeight], FXImageLineWidth);
		g.setColour(Colours.withAlpha(Colours.white, Slider_PhaserMix.getValueNormalized() * .5));
		g.fillPath(phaserPathL, [0, phaserYPos - 20, this.getWidth(), phaserHeight]);		
			
		g.setColour(Colours.lightblue);
		g.drawPath(phaserPathR, [0, phaserYPos + 20, this.getWidth(), phaserHeight], FXImageLineWidth);
		g.setColour(Colours.withAlpha(Colours.lightblue, Slider_PhaserMix.getValueNormalized() * .5));
		g.fillPath(phaserPathR, [0, phaserYPos + 20, this.getWidth(), phaserHeight]);
	}
});

//Reverb

var reverbNumCircles;

Panel_ReverbImage.setPaintRoutine(function(g)
{
    reverbNumCircles = (1-Slider_ReverbDamping.getValueNormalized());
    reverbNumCircles = Math.round(reverbNumCircles * 10);

    g.setColour(Colours.withAlpha(Colours.white, .4));

    for (i=0; i<10; i++)
    {
        g.drawRoundedRectangle([0, 0, this.getWidth() * ((0.1 * Slider_ReverbWidth.getValueNormalized()) * i), this.getHeight() * ((0.1 * Slider_ReverbSize.getValueNormalized()) * i)], 2.0, FXImageLineWidth);
    }

    g.setColour(Colours.white);

    for (i=0; i<reverbNumCircles; i++)
    {
        g.drawRoundedRectangle([0, 0, this.getWidth() * ((0.1 * Slider_ReverbWidth.getValueNormalized()) * i), this.getHeight() * ((0.1 * Slider_ReverbSize.getValueNormalized()) * i)], 2.0, FXImageLineWidth);
    }

    g.setColour(Colours.withAlpha(Colours.lightblue, Slider_ReverbMix.getValueNormalized() * .4));
    g.fillRoundedRectangle([0, 0, this.getWidth() * (0.1 * Slider_ReverbWidth.getValueNormalized() * (reverbNumCircles - 1)), this.getHeight() * (0.1 * Slider_ReverbSize.getValueNormalized() * (reverbNumCircles - 1))], 2.0);
});

//Delay

var delayCircleRadius = 15;
var delayNumCirclesL;
var delayNumCirclesR;

var delayGapL;
var delayGapR;

Panel_DelayImage.setPaintRoutine(function(g)
{
    delayNumCirclesL = Math.round(Slider_DelayFeedbackLeft.getValue() * 10);
    delayNumCirclesR = Math.round(Slider_DelayFeedbackRight.getValue() * 10);

    if (Button_DelaySync.getValue())
    {
        delayGapL = Slider_DelayTimeLeft.getValue();
        delayGapL = (this.getWidth() + 60) / delayGapL;

        delayGapR = Slider_DelayTimeRight.getValue();
        delayGapR = (this.getWidth() + 60) / delayGapR;
    }
    else
    {
        delayGapL = Math.round(Slider_DelayTimeLeft.getValueNormalized() * 100);
        delayGapR = Math.round(Slider_DelayTimeRight.getValueNormalized() * 100);
    }

    g.setColour(Colours.white);

    g.drawEllipse([(this.getWidth() * .1), 20, delayCircleRadius, delayCircleRadius], FXImageLineWidth);
    g.drawEllipse([(this.getWidth() * .1), 80, delayCircleRadius, delayCircleRadius], FXImageLineWidth);

    g.setColour(Colours.withAlpha(Colours.white, Slider_DelayMix.getValue()));

    for (i=1; i<delayNumCirclesL; i++)
    {
        g.drawEllipse([((this.getWidth() * .1) + delayGapL * i), 20, delayCircleRadius, delayCircleRadius], FXImageLineWidth);
    }

    for (i=1; i<delayNumCirclesR; i++)
    {
        g.drawEllipse([((this.getWidth() * .1) + delayGapR * i), 80, delayCircleRadius, delayCircleRadius], FXImageLineWidth);
    }

});