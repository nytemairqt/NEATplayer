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

const var Button_SamplerAComboBoxUp = Content.getComponent("Button_SamplerAComboBoxUp");
const var Button_SamplerAComboBoxDown = Content.getComponent("Button_SamplerAComboBoxDown");;

const var randomizeComboBoxA = Content.getComponent("Button_RandomizeSamplerAComboBox");
const var randomizeSampleStartA = Content.getComponent("Button_RandomizeSamplerASampleStart");

const var Label_SamplerATitle = Content.getComponent("Label_SamplerATitle");

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
const var Button_SamplerBComboBoxUp = Content.getComponent("Button_SamplerBComboBoxUp");
const var Button_SamplerBComboBoxDown = Content.getComponent("Button_SamplerBComboBoxDown");

const var randomizeComboBoxB = Content.getComponent("Button_RandomizeSamplerBComboBox");
const var randomizeSampleStartB = Content.getComponent("Button_RandomizeSamplerBSampleStart");

const var Label_SamplerBTitle = Content.getComponent("Label_SamplerBTitle");

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
const var Button_SamplerCComboBoxUp = Content.getComponent("Button_SamplerCComboBoxUp");
const var Button_SamplerCComboBoxDown = Content.getComponent("Button_SamplerCComboBoxDown");

const var randomizeComboBoxC = Content.getComponent("Button_RandomizeSamplerCComboBox");
const var randomizeSampleStartC = Content.getComponent("Button_RandomizeSamplerCSampleStart");

const var Label_SamplerCTitle = Content.getComponent("Label_SamplerCTitle");

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
	g.setColour(Colours.darkgrey);
	g.drawLine(this.getWidth() / 3, this.getWidth() / 3, 0, this.getHeight(), 1.0);
	g.drawLine(this.getWidth() / 3 * 2, this.getWidth() / 3 * 2, 0, this.getHeight(), 1.0);
});

//================================================================================================

//POSITIONING CONTROLS

const var samplerASlidersTop=[Slider_SamplerAAttack, Slider_SamplerADecay, Slider_SamplerASustain, Slider_SamplerARelease];

const var samplerASlidersBottom=[Slider_SamplerAPitchCoarse, Slider_SamplerAPitchFine, Slider_SamplerAPan, Slider_SamplerAGain];

const var samplerALabels = [Content.getComponent("Label_SamplerAAttack"),
                            Content.getComponent("Label_SamplerADecay"),
                            Content.getComponent("Label_SamplerASustain"),
                            Content.getComponent("Label_SamplerARelease"),
                            Content.getComponent("Label_SamplerAPitchCoarse"),
                            Content.getComponent("Label_SamplerAPitchFine"),
                            Content.getComponent("Label_SamplerAPan"),
                            Content.getComponent("Label_SamplerAGain")];
                            
const var samplerBLabels = [Content.getComponent("Label_SamplerBAttack"),
                            Content.getComponent("Label_SamplerBDecay"),
                            Content.getComponent("Label_SamplerBSustain"),
                            Content.getComponent("Label_SamplerBRelease"),
                            Content.getComponent("Label_SamplerBPitchCoarse"),
                            Content.getComponent("Label_SamplerBPitchFine"),
                            Content.getComponent("Label_SamplerBPan"),
                            Content.getComponent("Label_SamplerBGain")];

const var samplerCLabels = [Content.getComponent("Label_SamplerCAttack"),
                            Content.getComponent("Label_SamplerCDecay"),
                            Content.getComponent("Label_SamplerCSustain"),
                            Content.getComponent("Label_SamplerCRelease"),
                            Content.getComponent("Label_SamplerCPitchCoarse"),
                            Content.getComponent("Label_SamplerCPitchFine"),
                            Content.getComponent("Label_SamplerCPan"),
                            Content.getComponent("Label_SamplerCGain")];
                            
const var samplerARandomizationButtons = [Content.getComponent("Button_RandomizeSamplerAAttack"),
                                         Content.getComponent("Button_RandomizeSamplerADecay"),
                                         Content.getComponent("Button_RandomizeSamplerASustain"),
                                         Content.getComponent("Button_RandomizeSamplerARelease"),
                                         Content.getComponent("Button_RandomizeSamplerAPitchCoarse"),
                                         Content.getComponent("Button_RandomizeSamplerAPitchFine"),
                                         Content.getComponent("Button_RandomizeSamplerAPan"),
                                         Content.getComponent("Button_RandomizeSamplerAGain")];
                                         
const var samplerBRandomizationButtons = [Content.getComponent("Button_RandomizeSamplerBAttack"),
                                         Content.getComponent("Button_RandomizeSamplerBDecay"),
                                         Content.getComponent("Button_RandomizeSamplerBSustain"),
                                         Content.getComponent("Button_RandomizeSamplerBRelease"),
                                         Content.getComponent("Button_RandomizeSamplerBPitchCoarse"),
                                         Content.getComponent("Button_RandomizeSamplerBPitchFine"),
                                         Content.getComponent("Button_RandomizeSamplerBPan"),
                                         Content.getComponent("Button_RandomizeSamplerBGain")];
                                         
const var samplerCRandomizationButtons = [Content.getComponent("Button_RandomizeSamplerCAttack"),
                                         Content.getComponent("Button_RandomizeSamplerCDecay"),
                                         Content.getComponent("Button_RandomizeSamplerCSustain"),
                                         Content.getComponent("Button_RandomizeSamplerCRelease"),
                                         Content.getComponent("Button_RandomizeSamplerCPitchCoarse"),
                                         Content.getComponent("Button_RandomizeSamplerCPitchFine"),
                                         Content.getComponent("Button_RandomizeSamplerCPan"),
                                         Content.getComponent("Button_RandomizeSamplerCGain")];                            
                            

const var samplerAValues = [Label_SamplerAAttackValue, Label_SamplerADecayValue, Label_SamplerASustainValue, Label_SamplerAReleaseValue, Label_SamplerAPitchCoarseValue, Label_SamplerAPitchFineValue, Label_SamplerAPanValue, Label_SamplerAGainValue];

const var samplerBValues = [Label_SamplerBAttackValue, Label_SamplerBDecayValue, Label_SamplerBSustainValue, Label_SamplerBReleaseValue, Label_SamplerBPitchCoarseValue, Label_SamplerBPitchFineValue, Label_SamplerBPanValue, Label_SamplerBGainValue];

const var samplerCValues = [Label_SamplerCAttackValue, Label_SamplerCDecayValue, Label_SamplerCSustainValue, Label_SamplerCReleaseValue, Label_SamplerCPitchCoarseValue, Label_SamplerCPitchFineValue, Label_SamplerCPanValue, Label_SamplerCGainValue];

const var samplerBSlidersTop=[Slider_SamplerBAttack, Slider_SamplerBDecay, Slider_SamplerBSustain, Slider_SamplerBRelease];

const var samplerBSlidersBottom=[Slider_SamplerBPitchCoarse, Slider_SamplerBPitchFine, Slider_SamplerBPan, Slider_SamplerBGain];

const var samplerCSlidersTop=[Slider_SamplerCAttack, Slider_SamplerCDecay, Slider_SamplerCSustain, Slider_SamplerCRelease];

const var samplerCSlidersBottom=[Slider_SamplerCPitchCoarse, Slider_SamplerCPitchFine, Slider_SamplerCPan, Slider_SamplerCGain];

inline function positionSamplerSliders()
{
	local width = Panel_BG.getWidth() / 3;
	local increment = width / 5;

	local positionSamplerA = (width / 5);	
	local positionSamplerB = width + (width / 5);
	local positionSamplerC = (width / 5) + (width * 2);
	local sliderSize = 48;
	
	local textBuffer = 16;
	local valueBuffer = 36;
	
	local bypassButtonSize = 16;
	
	local randomizationButtonSize = 10;
	
	//Sampler A
	
	for (i=0; i<samplerASlidersTop.length; i++)
		samplerASlidersTop[i].setPosition(positionSamplerA + (increment * i + 1) - sliderSize / 2, 260, sliderSize, sliderSize);
		
	for (i=0; i<samplerASlidersBottom.length; i++)
		samplerASlidersBottom[i].setPosition(positionSamplerA + (increment * i + 1) - sliderSize / 2, 370, sliderSize, sliderSize);
		
	AHDSR_SamplerA.setPosition(AudioWaveform_SamplerA.get("x"), AudioWaveform_SamplerA.get("y"), AudioWaveform_SamplerA.getWidth(), AudioWaveform_SamplerA.getHeight());
	
	ComboBox_SamplerA.set("width", 150);
	ComboBox_SamplerA.set("height", 28);
	
	ComboBox_SamplerA.set("x", (width / 2 ) - (ComboBox_SamplerA.get("width") / 2));
	ComboBox_SamplerA.set("y", AudioWaveform_SamplerA.get("y") - (padding + ComboBox_SamplerA.get("height")));
	
	Button_SamplerAComboBoxUp.set("x", ComboBox_SamplerA.get("x") + ComboBox_SamplerA.get("width") - 18);
	Button_SamplerAComboBoxDown.set("x", ComboBox_SamplerA.get("x") + ComboBox_SamplerA.get("width") - 18);
	
	Button_SamplerAComboBoxUp.set("y", ComboBox_SamplerA.get("y") + 7);
	Button_SamplerAComboBoxDown.set("y", ComboBox_SamplerA.get("y") + 15);
	
	Button_SamplerAComboBoxUp.set("width", 8);
	Button_SamplerAComboBoxUp.set("height", 6);
	
	Button_SamplerAComboBoxDown.set("width", 8);
	Button_SamplerAComboBoxDown.set("height", 6);
	
	Button_SamplerABypass.setPosition(padding, padding, bypassButtonSize, bypassButtonSize);
		
	//Labels
		
	for (i=0; i<samplerALabels.length; i++)
		{
			if (i < 4)
				samplerALabels[i].setPosition(samplerASlidersTop[i].getGlobalPositionX() - 3, samplerASlidersTop[i].getGlobalPositionY() + textBuffer, sliderSize, 20);
			else	
				samplerALabels[i].setPosition(samplerASlidersBottom[i-4].getGlobalPositionX() - 3, samplerASlidersBottom[i-4].getGlobalPositionY() + textBuffer, sliderSize, 20);
		}
		
	for (i=0; i<samplerAValues.length; i++)
		{
			if (i < 4)
				samplerAValues[i].setPosition(samplerASlidersTop[i].getGlobalPositionX() - 3, samplerASlidersTop[i].getGlobalPositionY() + valueBuffer, sliderSize, 20);
			else	
				samplerAValues[i].setPosition(samplerASlidersBottom[i-4].getGlobalPositionX() - 3, samplerASlidersBottom[i-4].getGlobalPositionY() + valueBuffer, sliderSize, 20);
		}		
	
	
		
	//Sampler B

	for (i=0; i<samplerBSlidersTop.length; i++)
		samplerBSlidersTop[i].setPosition(positionSamplerB + (increment * i + 1) - sliderSize / 2, 260, sliderSize, sliderSize);
		
	for (i=0; i<samplerBSlidersBottom.length; i++)
		samplerBSlidersBottom[i].setPosition(positionSamplerB + (increment * i + 1) - sliderSize / 2, 370, sliderSize, sliderSize);	
		
	AHDSR_SamplerB.setPosition(AudioWaveform_SamplerB.get("x"), AudioWaveform_SamplerB.get("y"), AudioWaveform_SamplerB.getWidth(), AudioWaveform_SamplerB.getHeight());
		
	for (i=0; i<samplerBLabels.length; i++)
		{
			if (i < 4)
				samplerBLabels[i].setPosition(samplerBSlidersTop[i].getGlobalPositionX() - 3, samplerBSlidersTop[i].getGlobalPositionY() + textBuffer, sliderSize, 20);
			else	
				samplerBLabels[i].setPosition(samplerBSlidersBottom[i-4].getGlobalPositionX() - 3, samplerBSlidersBottom[i-4].getGlobalPositionY() + textBuffer, sliderSize, 20);
		}		
	
for (i=0; i<samplerBValues.length; i++)
	{
		if (i < 4)
			samplerBValues[i].setPosition(samplerBSlidersTop[i].getGlobalPositionX() - 3, samplerBSlidersTop[i].getGlobalPositionY() + valueBuffer, sliderSize, 20);
		else	
			samplerBValues[i].setPosition(samplerBSlidersBottom[i-4].getGlobalPositionX() - 3, samplerBSlidersBottom[i-4].getGlobalPositionY() + valueBuffer, sliderSize, 20);
	}	
	
	ComboBox_SamplerB.set("width", 150);
	ComboBox_SamplerB.set("height", 28);

	ComboBox_SamplerB.set("x", (width / 2 ) + width - (ComboBox_SamplerB.get("width") / 2));
	ComboBox_SamplerB.set("y", AudioWaveform_SamplerB.get("y") - (padding + ComboBox_SamplerB.get("height")));
	
	Button_SamplerBComboBoxUp.set("x", ComboBox_SamplerB.get("x") + ComboBox_SamplerB.get("width") - 18);
	Button_SamplerBComboBoxDown.set("x", ComboBox_SamplerB.get("x") + ComboBox_SamplerB.get("width") - 18);
	
	Button_SamplerBComboBoxUp.set("y", ComboBox_SamplerB.get("y") + 7);
	Button_SamplerBComboBoxDown.set("y", ComboBox_SamplerB.get("y") + 15);
	
	Button_SamplerBComboBoxUp.set("width", 8);
	Button_SamplerBComboBoxUp.set("height", 6);
	
	Button_SamplerBComboBoxDown.set("width", 8);
	Button_SamplerBComboBoxDown.set("height", 6);
	
	Button_SamplerBBypass.setPosition((width + padding), padding, bypassButtonSize, bypassButtonSize);
		
	//Sampler C

	for (i=0; i<samplerCSlidersTop.length; i++)
		samplerCSlidersTop[i].setPosition(positionSamplerC + (increment * i + 1) - sliderSize / 2, 260, sliderSize, sliderSize);
		
	for (i=0; i<samplerCSlidersBottom.length; i++)
		samplerCSlidersBottom[i].setPosition(positionSamplerC + (increment * i + 1) - sliderSize / 2, 370, sliderSize, sliderSize);	
		
	AHDSR_SamplerC.setPosition(AudioWaveform_SamplerC.get("x"), AudioWaveform_SamplerC.get("y"), AudioWaveform_SamplerC.getWidth(), AudioWaveform_SamplerC.getHeight());	
		
	for (i=0; i<samplerCLabels.length; i++)
		{
			if (i < 4)
				samplerCLabels[i].setPosition(samplerCSlidersTop[i].getGlobalPositionX() - 3, samplerCSlidersTop[i].getGlobalPositionY() + textBuffer, sliderSize, 20);
			else	
				samplerCLabels[i].setPosition(samplerCSlidersBottom[i-4].getGlobalPositionX() - 3, samplerCSlidersBottom[i-4].getGlobalPositionY() + textBuffer, sliderSize, 20);
		}				
	
	for (i=0; i<samplerCValues.length; i++)
		{
			if (i < 4)
				samplerCValues[i].setPosition(samplerCSlidersTop[i].getGlobalPositionX() - 3, samplerCSlidersTop[i].getGlobalPositionY() + valueBuffer, sliderSize, 20);
			else	
				samplerCValues[i].setPosition(samplerCSlidersBottom[i-4].getGlobalPositionX() - 3, samplerCSlidersBottom[i-4].getGlobalPositionY() + valueBuffer, sliderSize, 20);
		}		
		
		ComboBox_SamplerC.set("width", 150);
		ComboBox_SamplerC.set("height", 28);
	
		ComboBox_SamplerC.set("x", (width / 2 ) + width + width - (ComboBox_SamplerC.get("width") / 2));
		ComboBox_SamplerC.set("y", AudioWaveform_SamplerC.get("y") - (padding + ComboBox_SamplerC.get("height")));
		
		Button_SamplerCComboBoxUp.set("x", ComboBox_SamplerC.get("x") + ComboBox_SamplerC.get("width") - 18);
		Button_SamplerCComboBoxDown.set("x", ComboBox_SamplerC.get("x") + ComboBox_SamplerC.get("width") - 18);
		
		Button_SamplerCComboBoxUp.set("y", ComboBox_SamplerC.get("y") + 7);
		Button_SamplerCComboBoxDown.set("y", ComboBox_SamplerC.get("y") + 15);
		
		Button_SamplerCComboBoxUp.set("width", 8);
		Button_SamplerCComboBoxUp.set("height", 6);
		
		Button_SamplerCComboBoxDown.set("width", 8);
		Button_SamplerCComboBoxDown.set("height", 6);	
		
		Button_SamplerCBypass.setPosition((width + width + padding), padding, bypassButtonSize, bypassButtonSize);
	
	//Randomization Buttons
		
	for (i=0; i<samplerARandomizationButtons.length; i++)
		{
			if (i < 4)
				samplerARandomizationButtons[i].setPosition((samplerASlidersTop[i].getGlobalPositionX() + sliderSize) - 3, samplerASlidersTop[i].getGlobalPositionY() - sliderSize, randomizationButtonSize, randomizationButtonSize);
			else	
				samplerARandomizationButtons[i].setPosition((samplerASlidersBottom[i-4].getGlobalPositionX()+ sliderSize) - 3, samplerASlidersBottom[i-4].getGlobalPositionY() - sliderSize, randomizationButtonSize, randomizationButtonSize);
		}			
		
	for (i=0; i<samplerBRandomizationButtons.length; i++)
		{
			if (i < 4)
				samplerBRandomizationButtons[i].setPosition((samplerBSlidersTop[i].getGlobalPositionX() + sliderSize) - 3, samplerBSlidersTop[i].getGlobalPositionY() - sliderSize, randomizationButtonSize, randomizationButtonSize);
			else	
				samplerBRandomizationButtons[i].setPosition((samplerBSlidersBottom[i-4].getGlobalPositionX()+ sliderSize) - 3, samplerBSlidersBottom[i-4].getGlobalPositionY() - sliderSize, randomizationButtonSize, randomizationButtonSize);
		}		
		
	for (i=0; i<samplerCRandomizationButtons.length; i++)
		{
			if (i < 4)
				samplerCRandomizationButtons[i].setPosition((samplerCSlidersTop[i].getGlobalPositionX() + sliderSize) - 3, samplerCSlidersTop[i].getGlobalPositionY() - sliderSize, randomizationButtonSize, randomizationButtonSize);
			else	
				samplerCRandomizationButtons[i].setPosition((samplerCSlidersBottom[i-4].getGlobalPositionX()+ sliderSize) - 3, samplerCSlidersBottom[i-4].getGlobalPositionY() - sliderSize, randomizationButtonSize, randomizationButtonSize);
		}			
		
	randomizeComboBoxA.setPosition(ComboBox_SamplerA.get("x") + ComboBox_SamplerA.get("width") + padding, ComboBox_SamplerA.get("y"), randomizationButtonSize, randomizationButtonSize);
	
	randomizeSampleStartA.setPosition(AudioWaveform_SamplerA.get("x") + AudioWaveform_SamplerA.get("width") - (randomizationButtonSize + padding), AudioWaveform_SamplerA.get("y") - (randomizationButtonSize + padding), randomizationButtonSize, randomizationButtonSize);
	
	randomizeComboBoxB.setPosition(ComboBox_SamplerB.get("x") + ComboBox_SamplerB.get("width") + padding, ComboBox_SamplerB.get("y"), randomizationButtonSize, randomizationButtonSize);
		
		randomizeSampleStartB.setPosition(AudioWaveform_SamplerB.get("x") + AudioWaveform_SamplerB.get("width") - (randomizationButtonSize + padding), AudioWaveform_SamplerB.get("y") - (randomizationButtonSize + padding), randomizationButtonSize, randomizationButtonSize);
		
		randomizeComboBoxC.setPosition(ComboBox_SamplerC.get("x") + ComboBox_SamplerC.get("width") + padding, ComboBox_SamplerC.get("y"), randomizationButtonSize, randomizationButtonSize);
			
			randomizeSampleStartC.setPosition(AudioWaveform_SamplerC.get("x") + AudioWaveform_SamplerC.get("width") - (randomizationButtonSize + padding), AudioWaveform_SamplerC.get("y") - (randomizationButtonSize + padding), randomizationButtonSize, randomizationButtonSize);
		
	//Other Items
	
	AudioWaveform_SamplerA.setPosition(10, 75, (Panel_BG.getWidth() / 3) - 20, 110);
	Slider_SampleOffsetA.setPosition(10, 75, (Panel_BG.getWidth() / 3) - 20, 110);
	
	AudioWaveform_SamplerB.setPosition(width + 10, 75, (Panel_BG.getWidth() / 3) - 20, 110);
	Slider_SampleOffsetB.setPosition(width + 10, 75, (Panel_BG.getWidth() / 3) - 20, 110);	
	
	AudioWaveform_SamplerC.setPosition((width + width) + 10, 75, (Panel_BG.getWidth() / 3) - 20, 110);
	Slider_SampleOffsetC.setPosition((width + width) + 10, 75, (Panel_BG.getWidth() / 3) - 20, 110);
	
	Panel_SamplerDisabledB.setPosition(width, 0, width, Panel_BG.getHeight());
	Panel_SamplerDisabledC.setPosition(width * 2, 0, width, Panel_BG.getHeight());
	
	Button_SamplerAReverse.setPosition(AudioWaveform_SamplerA.getGlobalPositionX() + AudioWaveform_SamplerA.getWidth() - 46, AudioWaveform_SamplerA.getGlobalPositionY() + AudioWaveform_SamplerA.getHeight() -24, 40, 20);
	
	Button_SamplerBReverse.setPosition(AudioWaveform_SamplerB.getGlobalPositionX() + AudioWaveform_SamplerB.getWidth() - 46, AudioWaveform_SamplerB.getGlobalPositionY() + AudioWaveform_SamplerB.getHeight() -24, 40, 20);
	
	Button_SamplerCReverse.setPosition(AudioWaveform_SamplerC.getGlobalPositionX() + AudioWaveform_SamplerC.getWidth() - 46, AudioWaveform_SamplerC.getGlobalPositionY() + AudioWaveform_SamplerC.getHeight() -24, 40, 20);
	
	Label_SamplerATitle.setPosition(ComboBox_SamplerA.get("x") + (ComboBox_SamplerA.get("width") / 2) - (Label_SamplerATitle.get("width") / 2), ComboBox_SamplerA.get("y") - (Label_SamplerATitle.get("height") + padding + padding), 100, 30);
	
	Label_SamplerBTitle.setPosition(ComboBox_SamplerB.get("x") + (ComboBox_SamplerB.get("width") / 2) - (Label_SamplerBTitle.get("width") / 2), ComboBox_SamplerB.get("y") - (Label_SamplerBTitle.get("height") + padding + padding), 100, 30);
	
	Label_SamplerCTitle.setPosition(ComboBox_SamplerC.get("x") + (ComboBox_SamplerC.get("width") / 2) - (Label_SamplerCTitle.get("width") / 2), ComboBox_SamplerC.get("y") - (Label_SamplerCTitle.get("height") + padding + padding), 100, 30);
}

//positionSamplerSliders();



//================================================================================================

//FUNCTIONALITY

//Sampler A

//Gain


inline function onSlider_SamplerAGainControl(component, value)
{
	SamplerA_Utility.setAttribute(SamplerA_Utility.Gain, value);
	Label_SamplerAGainValue.set("text", Math.round(value) + "dB");
};

Content.getComponent("Slider_SamplerAGain").setControlCallback(onSlider_SamplerAGainControl);

//Pan


inline function onSlider_SamplerAPanControl(component, value)
{
	SamplerA_Utility.setAttribute(SamplerA_Utility.Balance, value);
	if (value == 0)
	    Label_SamplerAPanValue.set("text", "C");
	else if (value < 0)
	    Label_SamplerAPanValue.set("text", Math.round(value) + "L");
	else
	    Label_SamplerAPanValue.set("text", Math.round(value) + "R");
};

Content.getComponent("Slider_SamplerAPan").setControlCallback(onSlider_SamplerAPanControl);

//Pitch


inline function onSlider_SamplerAPitchCoarseControl(component, value)
{
    Label_SamplerAPitchCoarseValue.set("text", Math.round(value) + "st");
    SamplerA_PitchMod.setIntensity(value);
};

Content.getComponent("Slider_SamplerAPitchCoarse").setControlCallback(onSlider_SamplerAPitchCoarseControl);

inline function onSlider_SamplerAPitchFineControl(component, value)
{
	Label_SamplerAPitchFineValue.set("text", Math.round(value) + "c");
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
	Label_SamplerAAttackValue.set("text", Math.round(value) + "ms");
};

Content.getComponent("Slider_SamplerAAttack").setControlCallback(onSlider_SamplerAAttackControl);


inline function onSlider_SamplerADecayControl(component, value)
{
	AHDSR_SamplerA.showControl(1);
	timerAHDSRSamplerA.startTimer(1000);
	Slider_SampleOffsetA.showControl(0);
	AudioWaveform_SamplerA.showControl(0);
	
	SamplerA_AHDSR.setAttribute(SamplerA_AHDSR.Decay, value);
	Label_SamplerADecayValue.set("text", Math.round(value) + "ms");
};

Content.getComponent("Slider_SamplerADecay").setControlCallback(onSlider_SamplerADecayControl);

inline function onSlider_SamplerASustainControl(component, value)
{
	AHDSR_SamplerA.showControl(1);
	timerAHDSRSamplerA.startTimer(1000);
	Slider_SampleOffsetA.showControl(0);
	AudioWaveform_SamplerA.showControl(0);
	
	SamplerA_AHDSR.setAttribute(SamplerA_AHDSR.Sustain, value);
	Label_SamplerASustainValue.set("text", Math.round(value) + "dB");
};

Content.getComponent("Slider_SamplerASustain").setControlCallback(onSlider_SamplerASustainControl);

inline function onSlider_SamplerAReleaseControl(component, value)
{
	AHDSR_SamplerA.showControl(1);
	timerAHDSRSamplerA.startTimer(1000);
	Slider_SampleOffsetA.showControl(0);
	AudioWaveform_SamplerA.showControl(0);
	
	SamplerA_AHDSR.setAttribute(SamplerA_AHDSR.Release, value);
	Label_SamplerAReleaseValue.set("text", Math.round(value) + "ms");
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
	Label_SamplerBGainValue.set("text", Math.round(value) + "dB");
};

Content.getComponent("Slider_SamplerBGain").setControlCallback(onSlider_SamplerBGainControl);

//Pan

inline function onSlider_SamplerBPanControl(component, value)
{
	SamplerB_Utility.setAttribute(SamplerB_Utility.Balance, value);
	if (value == 0)
	    Label_SamplerBPanValue.set("text", "C");
	else if (value < 0)
	    Label_SamplerBPanValue.set("text", Math.round(value) + "L");
	else
	    Label_SamplerBPanValue.set("text", Math.round(value) + "R");
};

Content.getComponent("Slider_SamplerBPan").setControlCallback(onSlider_SamplerBPanControl);

//Pitch


inline function onSlider_SamplerBPitchCoarseControl(component, value)
{
    Label_SamplerBPitchCoarseValue.set("text", Math.round(value) + "st");
    SamplerB_PitchMod.setIntensity(value);
};

Content.getComponent("Slider_SamplerBPitchCoarse").setControlCallback(onSlider_SamplerBPitchCoarseControl);

inline function onSlider_SamplerBPitchFineControl(component, value)
{
	Label_SamplerBPitchFineValue.set("text", Math.round(value) + "c");
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
	Label_SamplerBAttackValue.set("text", Math.round(value) + "ms");
};

Content.getComponent("Slider_SamplerBAttack").setControlCallback(onSlider_SamplerBAttackControl);


inline function onSlider_SamplerBDecayControl(component, value)
{
	AHDSR_SamplerB.showControl(1);
	timerAHDSRSamplerB.startTimer(1000);
	Slider_SampleOffsetB.showControl(0);
	AudioWaveform_SamplerB.showControl(0);
	
	SamplerB_AHDSR.setAttribute(SamplerB_AHDSR.Decay, value);
	Label_SamplerBDecayValue.set("text", Math.round(value) + "ms");
};

Content.getComponent("Slider_SamplerBDecay").setControlCallback(onSlider_SamplerBDecayControl);

inline function onSlider_SamplerBSustainControl(component, value)
{
	AHDSR_SamplerB.showControl(1);
	timerAHDSRSamplerB.startTimer(1000);
	Slider_SampleOffsetB.showControl(0);
	AudioWaveform_SamplerB.showControl(0);
	
	SamplerB_AHDSR.setAttribute(SamplerB_AHDSR.Sustain, value);
	Label_SamplerBSustainValue.set("text", Math.round(value) + "dB");
};

Content.getComponent("Slider_SamplerBSustain").setControlCallback(onSlider_SamplerBSustainControl);

inline function onSlider_SamplerBReleaseControl(component, value)
{
	AHDSR_SamplerB.showControl(1);
	timerAHDSRSamplerB.startTimer(1000);
	Slider_SampleOffsetB.showControl(0);
	AudioWaveform_SamplerB.showControl(0);
	
	SamplerB_AHDSR.setAttribute(SamplerB_AHDSR.Release, value);
	Label_SamplerBReleaseValue.set("text", Math.round(value) + "ms");
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
	Label_SamplerCGainValue.set("text", Math.round(value) + "dB");
};

Content.getComponent("Slider_SamplerCGain").setControlCallback(onSlider_SamplerCGainControl);

//Pan

inline function onSlider_SamplerCPanControl(component, value)
{
	SamplerC_Utility.setAttribute(SamplerC_Utility.Balance, value);
	if (value == 0)
	    Label_SamplerCPanValue.set("text", "C");
	else if (value < 0)
	    Label_SamplerCPanValue.set("text", Math.round(value) + "L");
	else
	    Label_SamplerCPanValue.set("text", Math.round(value) + "R");
};

Content.getComponent("Slider_SamplerCPan").setControlCallback(onSlider_SamplerCPanControl);

//Pitch


inline function onSlider_SamplerCPitchCoarseControl(component, value)
{
    Label_SamplerCPitchCoarseValue.set("text", Math.round(value) + "st");
    SamplerC_PitchMod.setIntensity(value);
};

Content.getComponent("Slider_SamplerCPitchCoarse").setControlCallback(onSlider_SamplerCPitchCoarseControl);

inline function onSlider_SamplerCPitchFineControl(component, value)
{
	Label_SamplerCPitchFineValue.set("text", Math.round(value) + "c");
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
	Label_SamplerCAttackValue.set("text", Math.round(value) + "ms");
};

Content.getComponent("Slider_SamplerCAttack").setControlCallback(onSlider_SamplerCAttackControl);


inline function onSlider_SamplerCDecayControl(component, value)
{
	AHDSR_SamplerC.showControl(1);
	timerAHDSRSamplerC.startTimer(1000);
	Slider_SampleOffsetC.showControl(0);
	AudioWaveform_SamplerC.showControl(0);
	
	SamplerC_AHDSR.setAttribute(SamplerC_AHDSR.Decay, value);
	Label_SamplerCDecayValue.set("text", Math.round(value) + "ms");
};

Content.getComponent("Slider_SamplerCDecay").setControlCallback(onSlider_SamplerCDecayControl);

inline function onSlider_SamplerCSustainControl(component, value)
{
	AHDSR_SamplerC.showControl(1);
	timerAHDSRSamplerC.startTimer(1000);
	Slider_SampleOffsetC.showControl(0);
	AudioWaveform_SamplerC.showControl(0);
	
	SamplerC_AHDSR.setAttribute(SamplerC_AHDSR.Sustain, value);
	Label_SamplerCSustainValue.set("text", Math.round(value) + "dB");
};

Content.getComponent("Slider_SamplerCSustain").setControlCallback(onSlider_SamplerCSustainControl);

inline function onSlider_SamplerCReleaseControl(component, value)
{
	AHDSR_SamplerC.showControl(1);
	timerAHDSRSamplerC.startTimer(1000);
	Slider_SampleOffsetC.showControl(0);
	AudioWaveform_SamplerC.showControl(0);
	
	SamplerC_AHDSR.setAttribute(SamplerC_AHDSR.Release, value);
	Label_SamplerCReleaseValue.set("text", Math.round(value) + "ms");
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