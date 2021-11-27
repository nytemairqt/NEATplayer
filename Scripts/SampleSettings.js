//Sample Settings Panel

//Declarations

//Samplers

const var SamplerA = Synth.getChildSynth("SamplerA");
const var SamplerB = Synth.getChildSynth("SamplerB");
const var SamplerC = Synth.getChildSynth("SamplerC");

const var SamplerA_Utility = Synth.getEffect("SamplerA_Utility");
const var SamplerB_Utility = Synth.getEffect("SamplerB_Utility");
const var SamplerC_Utility = Synth.getEffect("SamplerC_Utility");

const var SamplerA_AHDSR = Synth.getModulator("SamplerA_AHDSR");
const var SamplerA_PitchWheel = Synth.getModulator("SamplerA_PitchWheel");
const var SamplerA_PitchMod = Synth.getModulator("SamplerA_PitchMod");
const var SamplerA_LoopsPitchMod = Synth.getModulator("SamplerA_LoopsPitchMod");
const var SamplerA_TuneMod = Synth.getModulator("SamplerA_TuneMod");
const var SamplerA_SampleStart = Synth.getModulator("SamplerA_SampleStart");
const var SamplerA_Velocity = Synth.getModulator("SamplerA_Velocity");

const var SamplerB_AHDSR = Synth.getModulator("SamplerB_AHDSR");
const var SamplerB_PitchWheel = Synth.getModulator("SamplerB_PitchWheel");
const var SamplerB_PitchMod = Synth.getModulator("SamplerB_PitchMod");
const var SamplerB_LoopsPitchMod = Synth.getModulator("SamplerB_LoopsPitchMod");
const var SamplerB_TuneMod = Synth.getModulator("SamplerB_TuneMod");
const var SamplerB_SampleStart = Synth.getModulator("SamplerB_SampleStart");
const var SamplerB_Velocity = Synth.getModulator("SamplerB_Velocity");

const var SamplerC_AHDSR = Synth.getModulator("SamplerC_AHDSR");
const var SamplerC_PitchWheel = Synth.getModulator("SamplerC_PitchWheel");
const var SamplerC_PitchMod = Synth.getModulator("SamplerC_PitchMod");
const var SamplerC_LoopsPitchMod = Synth.getModulator("SamplerC_LoopsPitchMod");
const var SamplerC_TuneMod = Synth.getModulator("SamplerC_TuneMod");
const var SamplerC_SampleStart = Synth.getModulator("SamplerC_SampleStart");
const var SamplerC_Velocity = Synth.getModulator("SamplerC_Velocity");

//======================================================================================

inline function samplerLoopPitch(value)
{
    SamplerA_LoopsPitchMod.setIntensity(value);
    SamplerB_LoopsPitchMod.setIntensity(value);
    SamplerC_LoopsPitchMod.setIntensity(value);
}

//GUI Elements

const var Panel_Sample = Content.getComponent("Panel_Sample");
const var Button_SampleDisplay = Content.getComponent("Button_SampleDisplay");
const var Label_SamplePage = Content.getComponent("Label_SamplePage");

const var Button_SamplerABypass = Content.getComponent("Button_SamplerABypass");
const var Button_SamplerBBypass = Content.getComponent("Button_SamplerBBypass");
const var Button_SamplerCBypass = Content.getComponent("Button_SamplerCBypass");

const var Panel_SamplerDisabledB = Content.getComponent("Panel_SamplerDisabledB");
const var Panel_SamplerDisabledC = Content.getComponent("Panel_SamplerDisabledC");

//Sampler A

const var Slider_SamplerAGain = Content.getComponent("Slider_SamplerAGain");
const var Slider_SamplerAPan = Content.getComponent("Slider_SamplerAPan");
const var Label_SamplerAGainValue = Content.getComponent("Label_SamplerAGainValue");
const var Label_SamplerAPanValue = Content.getComponent("Label_SamplerAPanValue");

const var Slider_SamplerAPitchCoarse = Content.getComponent("Slider_SamplerAPitchCoarse");
const var Slider_SamplerAPitchFine = Content.getComponent("Slider_SamplerAPitchFine");
const var Label_SamplerAPitchCoarseValue = Content.getComponent("Label_SamplerAPitchCoarseValue");
const var Label_SamplerAPitchFineValue = Content.getComponent("Label_SamplerAPitchFineValue");

const var ComboBox_SamplerA = Content.getComponent("ComboBox_SamplerA");
const var AudioWaveform_SamplerA = Content.getComponent("AudioWaveform_SamplerA");
const var Slider_SampleOffsetA = Content.getComponent("Slider_SampleOffsetA");

const var Slider_SamplerAAttack = Content.getComponent("Slider_SamplerAAttack");
const var Slider_SamplerADecay = Content.getComponent("Slider_SamplerADecay");
const var Slider_SamplerASustain = Content.getComponent("Slider_SamplerASustain");
const var Slider_SamplerARelease = Content.getComponent("Slider_SamplerARelease");

const var AHDSR_SamplerA = Content.getComponent("AHDSR_SamplerA");

const var Label_SamplerAAttackValue = Content.getComponent("Label_SamplerAAttackValue");
const var Label_SamplerADecayValue = Content.getComponent("Label_SamplerADecayValue");
const var Label_SamplerASustainValue = Content.getComponent("Label_SamplerASustainValue");
const var Label_SamplerAReleaseValue = Content.getComponent("Label_SamplerAReleaseValue");

const var Button_SamplerAReverse = Content.getComponent("Button_SamplerAReverse");



//Sampler B

const var Slider_SamplerBGain = Content.getComponent("Slider_SamplerBGain");
const var Slider_SamplerBPan = Content.getComponent("Slider_SamplerBPan");
const var Label_SamplerBGainValue = Content.getComponent("Label_SamplerBGainValue");
const var Label_SamplerBPanValue = Content.getComponent("Label_SamplerBPanValue");

const var Slider_SamplerBPitchCoarse = Content.getComponent("Slider_SamplerBPitchCoarse");
const var Slider_SamplerBPitchFine = Content.getComponent("Slider_SamplerBPitchFine");
const var Label_SamplerBPitchCoarseValue = Content.getComponent("Label_SamplerBPitchCoarseValue");
const var Label_SamplerBPitchFineValue = Content.getComponent("Label_SamplerBPitchFineValue");

const var ComboBox_SamplerB = Content.getComponent("ComboBox_SamplerB");
const var AudioWaveform_SamplerB = Content.getComponent("AudioWaveform_SamplerB");
const var Slider_SampleOffsetB = Content.getComponent("Slider_SampleOffsetB");

const var Slider_SamplerBAttack = Content.getComponent("Slider_SamplerBAttack");
const var Slider_SamplerBDecay = Content.getComponent("Slider_SamplerBDecay");
const var Slider_SamplerBSustain = Content.getComponent("Slider_SamplerBSustain");
const var Slider_SamplerBRelease = Content.getComponent("Slider_SamplerBRelease");

const var AHDSR_SamplerB = Content.getComponent("AHDSR_SamplerB");

const var Label_SamplerBAttackValue = Content.getComponent("Label_SamplerBAttackValue");
const var Label_SamplerBDecayValue = Content.getComponent("Label_SamplerBDecayValue");
const var Label_SamplerBSustainValue = Content.getComponent("Label_SamplerBSustainValue");
const var Label_SamplerBReleaseValue = Content.getComponent("Label_SamplerBReleaseValue");

const var Button_SamplerBReverse = Content.getComponent("Button_SamplerBReverse");

//Sampler C

const var Slider_SamplerCGain = Content.getComponent("Slider_SamplerCGain");
const var Slider_SamplerCPan = Content.getComponent("Slider_SamplerCPan");
const var Label_SamplerCGainValue = Content.getComponent("Label_SamplerCGainValue");
const var Label_SamplerCPanValue = Content.getComponent("Label_SamplerCPanValue");

const var Slider_SamplerCPitchCoarse = Content.getComponent("Slider_SamplerCPitchCoarse");
const var Slider_SamplerCPitchFine = Content.getComponent("Slider_SamplerCPitchFine");
const var Label_SamplerCPitchCoarseValue = Content.getComponent("Label_SamplerCPitchCoarseValue");
const var Label_SamplerCPitchFineValue = Content.getComponent("Label_SamplerCPitchFineValue");

const var ComboBox_SamplerC = Content.getComponent("ComboBox_SamplerC");
const var AudioWaveform_SamplerC = Content.getComponent("AudioWaveform_SamplerC");
const var Slider_SampleOffsetC = Content.getComponent("Slider_SampleOffsetC");

const var Slider_SamplerCAttack = Content.getComponent("Slider_SamplerCAttack");
const var Slider_SamplerCDecay = Content.getComponent("Slider_SamplerCDecay");
const var Slider_SamplerCSustain = Content.getComponent("Slider_SamplerCSustain");
const var Slider_SamplerCRelease = Content.getComponent("Slider_SamplerCRelease");

const var AHDSR_SamplerC = Content.getComponent("AHDSR_SamplerC");

const var Label_SamplerCAttackValue = Content.getComponent("Label_SamplerCAttackValue");
const var Label_SamplerCDecayValue = Content.getComponent("Label_SamplerCDecayValue");
const var Label_SamplerCSustainValue = Content.getComponent("Label_SamplerCSustainValue");
const var Label_SamplerCReleaseValue = Content.getComponent("Label_SamplerCReleaseValue");

const var Button_SamplerCReverse = Content.getComponent("Button_SamplerCReverse");

//Sample Settings Panel

inline function onButton_SampleDisplayControl(component, value)
{
	Panel_Sample.showControl(value);
    Button_FXDisplay.setValue(0);
    Button_ArpDisplay.setValue(0);
	Panel_FX.showControl(0);   
	Panel_Arp.showControl(0);
	Panel_Movement.showControl(0);
    Button_MoveDisplay.setValue(0);
};

Content.getComponent("Button_SampleDisplay").setControlCallback(onButton_SampleDisplayControl);

Panel_Sample.setPaintRoutine(function(g)
{
    g.setColour(0xFB111111);
    g.fillRoundedRectangle([0, 0, this.getWidth(), this.getHeight()], 8.0);
	g.setColour(Colours.grey);
	g.drawRoundedRectangle([0, 0, this.getWidth(), this.getHeight()], 8.0, 2.0);
	g.setColour(Colours.darkgrey);
	g.drawLine(this.getWidth() / 3, this.getWidth() / 3, 0, this.getHeight(), 1.0);
	g.drawLine(this.getWidth() / 3 * 2, this.getWidth() / 3 * 2, 0, this.getHeight(), 1.0);
	
	//Fancy Lines
	
	g.drawLine(this.getWidth() / 3 - 15, 20, 174, 174, 1.0);
	g.drawLine(20, 10, 174, 186, 1.0);
	g.drawLine(10, 10, 186, 195, 1.0);
	
	g.drawLine(this.getWidth() / 3 * 2 - 15, this.getWidth() / 3 + 20, 174, 174, 1.0);
	g.drawLine(this.getWidth() / 3 + 20, this.getWidth() / 3 + 10, 174, 186, 1.0);
	g.drawLine(this.getWidth() / 3 + 10, this.getWidth() / 3 + 10, 186, 195, 1.0);
	
	g.drawLine(this.getWidth() / 3 * 3 - 15, this.getWidth() / 3 * 2 + 20, 174, 174, 1.0);
	g.drawLine(this.getWidth() / 3 * 2 + 20, this.getWidth() / 3 * 2 + 10, 174, 186, 1.0);
	g.drawLine(this.getWidth() / 3 * 2 + 10, this.getWidth() / 3 * 2 + 10, 186, 195, 1.0);
});

//================================================================================================

//FUNCTIONALITY

//Sampler A

//Gain


inline function onSlider_SamplerAGainControl(component, value)
{
	SamplerA_Utility.setAttribute(SamplerA_Utility.Gain, value);
	Label_SamplerAGainValue.set("text", value + "dB");
};

Content.getComponent("Slider_SamplerAGain").setControlCallback(onSlider_SamplerAGainControl);

//Pan


inline function onSlider_SamplerAPanControl(component, value)
{
	SamplerA_Utility.setAttribute(SamplerA_Utility.Balance, value);
	if (value == 0)
	    Label_SamplerAPanValue.set("text", "C");
	else if (value < 0)
	    Label_SamplerAPanValue.set("text", value + "L");
	else
	    Label_SamplerAPanValue.set("text", value + "R");
};

Content.getComponent("Slider_SamplerAPan").setControlCallback(onSlider_SamplerAPanControl);

//Pitch


inline function onSlider_SamplerAPitchCoarseControl(component, value)
{
    Label_SamplerAPitchCoarseValue.set("text", value + "st");
    SamplerA_PitchMod.setIntensity(value);
};

Content.getComponent("Slider_SamplerAPitchCoarse").setControlCallback(onSlider_SamplerAPitchCoarseControl);

inline function onSlider_SamplerAPitchFineControl(component, value)
{
	Label_SamplerAPitchFineValue.set("text", value + "c");
	SamplerA_TuneMod.setIntensity(value / 100);
};

Content.getComponent("Slider_SamplerAPitchFine").setControlCallback(onSlider_SamplerAPitchFineControl);


//Audio WaveForm

//Sample Selection A


inline function onComboBox_SamplerAControl(component, value)
{
	//AudioWaveform_SamplerA.set("sampleIndex", value);
	
	if (currentExpansion == "Bloom")
    {
        switch (value)
        {
            case 1:
                SamplerA.asSampler().loadSampleMap("{EXP::Bloom}Bloom_SampleMap");
                SamplerA.asSampler().enableRoundRobin(true);
                SamplerA_Velocity.setBypassed(true);
            break;
                
            case 2:
                SamplerA.asSampler().loadSampleMap("{EXP::Bloom}Flourish_SampleMap");
                SamplerA.asSampler().enableRoundRobin(false);
                SamplerA_Velocity.setBypassed(false);
            break;
        }
    }
};

Content.getComponent("ComboBox_SamplerA").setControlCallback(onComboBox_SamplerAControl);

//Sample Start Offset A


inline function onSlider_SampleOffsetAControl(component, value)
{
	SamplerA_SampleStart.setIntensity(1-value);
};

Content.getComponent("Slider_SampleOffsetA").setControlCallback(onSlider_SampleOffsetAControl);

//AHDSR Control + Timer Setup

inline function onSlider_SamplerAAttackControl(component, value)
{
	AHDSR_SamplerA.showControl(1);
	timerAHDSRSamplerA.startTimer(1000);
	Slider_SampleOffsetA.showControl(0);
	AudioWaveform_SamplerA.showControl(0);
	
	SamplerA_AHDSR.setAttribute(SamplerA_AHDSR.Attack, value);
	Label_SamplerAAttackValue.set("text", value + "ms");
};

Content.getComponent("Slider_SamplerAAttack").setControlCallback(onSlider_SamplerAAttackControl);


inline function onSlider_SamplerADecayControl(component, value)
{
	AHDSR_SamplerA.showControl(1);
	timerAHDSRSamplerA.startTimer(1000);
	Slider_SampleOffsetA.showControl(0);
	AudioWaveform_SamplerA.showControl(0);
	
	SamplerA_AHDSR.setAttribute(SamplerA_AHDSR.Decay, value);
	Label_SamplerADecayValue.set("text", value + "ms");
};

Content.getComponent("Slider_SamplerADecay").setControlCallback(onSlider_SamplerADecayControl);

inline function onSlider_SamplerASustainControl(component, value)
{
	AHDSR_SamplerA.showControl(1);
	timerAHDSRSamplerA.startTimer(1000);
	Slider_SampleOffsetA.showControl(0);
	AudioWaveform_SamplerA.showControl(0);
	
	SamplerA_AHDSR.setAttribute(SamplerA_AHDSR.Sustain, value);
	Label_SamplerASustainValue.set("text", value + "dB");
};

Content.getComponent("Slider_SamplerASustain").setControlCallback(onSlider_SamplerASustainControl);

inline function onSlider_SamplerAReleaseControl(component, value)
{
	AHDSR_SamplerA.showControl(1);
	timerAHDSRSamplerA.startTimer(1000);
	Slider_SampleOffsetA.showControl(0);
	AudioWaveform_SamplerA.showControl(0);
	
	SamplerA_AHDSR.setAttribute(SamplerA_AHDSR.Release, value);
	Label_SamplerAReleaseValue.set("text", value + "ms");
};

Content.getComponent("Slider_SamplerARelease").setControlCallback(onSlider_SamplerAReleaseControl);


//Display Timers

const var timerAHDSRSamplerA = Engine.createTimerObject();

timerAHDSRSamplerA.setTimerCallback(function()
{
    AHDSR_SamplerA.showControl(0);
    Slider_SampleOffsetA.showControl(1);
	AudioWaveform_SamplerA.showControl(1);
});

//Reverse Sample Switch


inline function onButton_SamplerAReverseControl(component, value)
{
	SamplerA.setAttribute(SamplerA.Reversed, value);
};

Content.getComponent("Button_SamplerAReverse").setControlCallback(onButton_SamplerAReverseControl);


//Sampler B

//Gain


inline function onSlider_SamplerBGainControl(component, value)
{
	SamplerB_Utility.setAttribute(SamplerB_Utility.Gain, value);
	Label_SamplerBGainValue.set("text", value + "dB");
};

Content.getComponent("Slider_SamplerBGain").setControlCallback(onSlider_SamplerBGainControl);

//Pan

inline function onSlider_SamplerBPanControl(component, value)
{
	SamplerB_Utility.setAttribute(SamplerB_Utility.Balance, value);
	if (value == 0)
	    Label_SamplerBPanValue.set("text", "C");
	else if (value < 0)
	    Label_SamplerBPanValue.set("text", value + "L");
	else
	    Label_SamplerBPanValue.set("text", value + "R");
};

Content.getComponent("Slider_SamplerBPan").setControlCallback(onSlider_SamplerBPanControl);

//Pitch


inline function onSlider_SamplerBPitchCoarseControl(component, value)
{
    Label_SamplerBPitchCoarseValue.set("text", value + "st");
    SamplerB_PitchMod.setIntensity(value);
};

Content.getComponent("Slider_SamplerBPitchCoarse").setControlCallback(onSlider_SamplerBPitchCoarseControl);

inline function onSlider_SamplerBPitchFineControl(component, value)
{
	Label_SamplerBPitchFineValue.set("text", value + "c");
	SamplerB_TuneMod.setIntensity(value / 100);
};

Content.getComponent("Slider_SamplerBPitchFine").setControlCallback(onSlider_SamplerBPitchFineControl);


//Audio WaveForm

//Sample Selection B


inline function onComboBox_SamplerBControl(component, value)
{
	//AudioWaveform_SamplerB.set("sampleIndex", value);
};

Content.getComponent("ComboBox_SamplerB").setControlCallback(onComboBox_SamplerBControl);

//Sample Start Offset B


inline function onSlider_SampleOffsetBControl(component, value)
{
	SamplerB_SampleStart.setIntensity(1-value);
};

Content.getComponent("Slider_SampleOffsetB").setControlCallback(onSlider_SampleOffsetBControl);

//AHDSR Control + Timer Setup

inline function onSlider_SamplerBAttackControl(component, value)
{
	AHDSR_SamplerB.showControl(1);
	timerAHDSRSamplerB.startTimer(1000);
	Slider_SampleOffsetB.showControl(0);
	AudioWaveform_SamplerB.showControl(0);
	
	SamplerB_AHDSR.setAttribute(SamplerB_AHDSR.Attack, value);
	Label_SamplerBAttackValue.set("text", value + "ms");
};

Content.getComponent("Slider_SamplerBAttack").setControlCallback(onSlider_SamplerBAttackControl);


inline function onSlider_SamplerBDecayControl(component, value)
{
	AHDSR_SamplerB.showControl(1);
	timerAHDSRSamplerB.startTimer(1000);
	Slider_SampleOffsetB.showControl(0);
	AudioWaveform_SamplerB.showControl(0);
	
	SamplerB_AHDSR.setAttribute(SamplerB_AHDSR.Decay, value);
	Label_SamplerBDecayValue.set("text", value + "ms");
};

Content.getComponent("Slider_SamplerBDecay").setControlCallback(onSlider_SamplerBDecayControl);

inline function onSlider_SamplerBSustainControl(component, value)
{
	AHDSR_SamplerB.showControl(1);
	timerAHDSRSamplerB.startTimer(1000);
	Slider_SampleOffsetB.showControl(0);
	AudioWaveform_SamplerB.showControl(0);
	
	SamplerB_AHDSR.setAttribute(SamplerB_AHDSR.Sustain, value);
	Label_SamplerBSustainValue.set("text", value + "dB");
};

Content.getComponent("Slider_SamplerBSustain").setControlCallback(onSlider_SamplerBSustainControl);

inline function onSlider_SamplerBReleaseControl(component, value)
{
	AHDSR_SamplerB.showControl(1);
	timerAHDSRSamplerB.startTimer(1000);
	Slider_SampleOffsetB.showControl(0);
	AudioWaveform_SamplerB.showControl(0);
	
	SamplerB_AHDSR.setAttribute(SamplerB_AHDSR.Release, value);
	Label_SamplerBReleaseValue.set("text", value + "ms");
};

Content.getComponent("Slider_SamplerBRelease").setControlCallback(onSlider_SamplerBReleaseControl);


//Display Timers

const var timerAHDSRSamplerB = Engine.createTimerObject();

timerAHDSRSamplerB.setTimerCallback(function()
{
    AHDSR_SamplerB.showControl(0);
    Slider_SampleOffsetB.showControl(1);
	AudioWaveform_SamplerB.showControl(1);
});

//Reverse Sample Switch


inline function onButton_SamplerBReverseControl(component, value)
{
	SamplerB.setAttribute(SamplerB.Reversed, value);
};

Content.getComponent("Button_SamplerBReverse").setControlCallback(onButton_SamplerBReverseControl);



//Sampler C

//Gain


inline function onSlider_SamplerCGainControl(component, value)
{
	SamplerC_Utility.setAttribute(SamplerC_Utility.Gain, value);
	Label_SamplerCGainValue.set("text", value + "dB");
};

Content.getComponent("Slider_SamplerCGain").setControlCallback(onSlider_SamplerCGainControl);

//Pan

inline function onSlider_SamplerCPanControl(component, value)
{
	SamplerC_Utility.setAttribute(SamplerC_Utility.Balance, value);
	if (value == 0)
	    Label_SamplerCPanValue.set("text", "C");
	else if (value < 0)
	    Label_SamplerCPanValue.set("text", value + "L");
	else
	    Label_SamplerCPanValue.set("text", value + "R");
};

Content.getComponent("Slider_SamplerCPan").setControlCallback(onSlider_SamplerCPanControl);

//Pitch


inline function onSlider_SamplerCPitchCoarseControl(component, value)
{
    Label_SamplerCPitchCoarseValue.set("text", value + "st");
    SamplerC_PitchMod.setIntensity(value);
};

Content.getComponent("Slider_SamplerCPitchCoarse").setControlCallback(onSlider_SamplerCPitchCoarseControl);

inline function onSlider_SamplerCPitchFineControl(component, value)
{
	Label_SamplerCPitchFineValue.set("text", value + "c");
	SamplerC_TuneMod.setIntensity(value / 100);
};

Content.getComponent("Slider_SamplerCPitchFine").setControlCallback(onSlider_SamplerCPitchFineControl);


//Audio WaveForm

//Sample Selection C


inline function onComboBox_SamplerCControl(component, value)
{
	//AudioWaveform_SamplerC.set("sampleIndex", value);
};

Content.getComponent("ComboBox_SamplerC").setControlCallback(onComboBox_SamplerCControl);

//Sample Start Offset C


inline function onSlider_SampleOffsetCControl(component, value)
{
	SamplerC_SampleStart.setIntensity(1-value);
};

Content.getComponent("Slider_SampleOffsetC").setControlCallback(onSlider_SampleOffsetCControl);

//AHDSR Control + Timer Setup

inline function onSlider_SamplerCAttackControl(component, value)
{
	AHDSR_SamplerC.showControl(1);
	timerAHDSRSamplerC.startTimer(1000);
	Slider_SampleOffsetC.showControl(0);
	AudioWaveform_SamplerC.showControl(0);
	
	SamplerC_AHDSR.setAttribute(SamplerC_AHDSR.Attack, value);
	Label_SamplerCAttackValue.set("text", value + "ms");
};

Content.getComponent("Slider_SamplerCAttack").setControlCallback(onSlider_SamplerCAttackControl);


inline function onSlider_SamplerCDecayControl(component, value)
{
	AHDSR_SamplerC.showControl(1);
	timerAHDSRSamplerC.startTimer(1000);
	Slider_SampleOffsetC.showControl(0);
	AudioWaveform_SamplerC.showControl(0);
	
	SamplerC_AHDSR.setAttribute(SamplerC_AHDSR.Decay, value);
	Label_SamplerCDecayValue.set("text", value + "ms");
};

Content.getComponent("Slider_SamplerCDecay").setControlCallback(onSlider_SamplerCDecayControl);

inline function onSlider_SamplerCSustainControl(component, value)
{
	AHDSR_SamplerC.showControl(1);
	timerAHDSRSamplerC.startTimer(1000);
	Slider_SampleOffsetC.showControl(0);
	AudioWaveform_SamplerC.showControl(0);
	
	SamplerC_AHDSR.setAttribute(SamplerC_AHDSR.Sustain, value);
	Label_SamplerCSustainValue.set("text", value + "dB");
};

Content.getComponent("Slider_SamplerCSustain").setControlCallback(onSlider_SamplerCSustainControl);

inline function onSlider_SamplerCReleaseControl(component, value)
{
	AHDSR_SamplerC.showControl(1);
	timerAHDSRSamplerC.startTimer(1000);
	Slider_SampleOffsetC.showControl(0);
	AudioWaveform_SamplerC.showControl(0);
	
	SamplerC_AHDSR.setAttribute(SamplerC_AHDSR.Release, value);
	Label_SamplerCReleaseValue.set("text", value + "ms");
};

Content.getComponent("Slider_SamplerCRelease").setControlCallback(onSlider_SamplerCReleaseControl);


//Display Timers

const var timerAHDSRSamplerC = Engine.createTimerObject();

timerAHDSRSamplerC.setTimerCallback(function()
{
    AHDSR_SamplerC.showControl(0);
    Slider_SampleOffsetC.showControl(1);
	AudioWaveform_SamplerC.showControl(1);
});

//Reverse Sample Switch


inline function onButton_SamplerCReverseControl(component, value)
{
	SamplerC.setAttribute(SamplerC.Reversed, value);
};

Content.getComponent("Button_SamplerCReverse").setControlCallback(onButton_SamplerCReverseControl);

//====================================
//Combo Box Buttons

inline function onButton_SamplerAComboBoxUpControl(component, value)
{
	if (value)
	    if (ComboBox_SamplerA.getValue() > ComboBox_SamplerA.get("min"))
	        ComboBox_SamplerA.setValue(ComboBox_SamplerA.getValue() - 1);
	    else
	        ComboBox_SamplerA.setValue(ComboBox_SamplerA.get("max"));
	        
	ComboBox_SamplerA.changed();
};

Content.getComponent("Button_SamplerAComboBoxUp").setControlCallback(onButton_SamplerAComboBoxUpControl);

inline function onButton_SamplerAComboBoxDownControl(component, value)
{
    if (value)
	    if (ComboBox_SamplerA.getValue() < ComboBox_SamplerA.get("max"))
	        ComboBox_SamplerA.setValue(ComboBox_SamplerA.getValue() + 1);
	    else
	        ComboBox_SamplerA.setValue(ComboBox_SamplerA.get("min"));
	        
	ComboBox_SamplerA.changed();
};

Content.getComponent("Button_SamplerAComboBoxDown").setControlCallback(onButton_SamplerAComboBoxDownControl);

inline function onButton_SamplerBComboBoxUpControl(component, value)
{
	if (value)
	    if (ComboBox_SamplerB.getValue() > ComboBox_SamplerB.get("min"))
	        ComboBox_SamplerB.setValue(ComboBox_SamplerB.getValue() - 1);
	    else
	        ComboBox_SamplerB.setValue(ComboBox_SamplerB.get("max"));
	        
	ComboBox_SamplerB.changed();
};

Content.getComponent("Button_SamplerBComboBoxUp").setControlCallback(onButton_SamplerBComboBoxUpControl);

inline function onButton_SamplerBComboBoxDownControl(component, value)
{
    if (value)
	    if (ComboBox_SamplerB.getValue() < ComboBox_SamplerB.get("max"))
	        ComboBox_SamplerB.setValue(ComboBox_SamplerB.getValue() + 1);
	    else
	        ComboBox_SamplerB.setValue(ComboBox_SamplerB.get("min"));
	        
	ComboBox_SamplerB.changed();
};

Content.getComponent("Button_SamplerBComboBoxDown").setControlCallback(onButton_SamplerBComboBoxDownControl);

inline function onButton_SamplerCComboBoxUpControl(component, value)
{
	if (value)
	    if (ComboBox_SamplerC.getValue() > ComboBox_SamplerC.get("min"))
	        ComboBox_SamplerC.setValue(ComboBox_SamplerC.getValue() - 1);
	    else
	        ComboBox_SamplerC.setValue(ComboBox_SamplerC.get("max"));
	        
	ComboBox_SamplerC.changed();
};

Content.getComponent("Button_SamplerCComboBoxUp").setControlCallback(onButton_SamplerCComboBoxUpControl);

inline function onButton_SamplerCComboBoxDownControl(component, value)
{
    if (value)
	    if (ComboBox_SamplerC.getValue() < ComboBox_SamplerC.get("max"))
	        ComboBox_SamplerC.setValue(ComboBox_SamplerC.getValue() + 1);
	    else
	        ComboBox_SamplerC.setValue(ComboBox_SamplerC.get("min"));
	        
	ComboBox_SamplerC.changed();
};

Content.getComponent("Button_SamplerCComboBoxDown").setControlCallback(onButton_SamplerCComboBoxDownControl);

//Disabled Sampler Panels

Panel_SamplerDisabledB.setPaintRoutine(function(g)
{
	g.fillAll(0xEB000000);
	g.setColour(Colours.white);
	g.setFont("Arial", 12.0);
	g.drawAlignedText("DISABLED", [0, 0, this.getWidth(), this.getHeight()], "centred");
});

Panel_SamplerDisabledC.setPaintRoutine(function(g)
{
	g.fillAll(0xEB000000);
	g.setColour(Colours.white);
	g.setFont("Arial", 12.0);
	g.drawAlignedText("DISABLED", [0, 0, this.getWidth(), this.getHeight()], "centred");
});

