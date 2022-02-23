//Randomize Everything

const var randomizationControls = [SliderPack_ArpNotes, 
SliderPack_ArpVelocity, 
SliderPack_ArpLength,
Slider_ArpSteps,
Slider_ArpSpeed,
Slider_ArpOctave,
Slider_ArpSwing,

//Add new content here

Slider_SamplerAAttack,
Slider_SamplerADecay,
Slider_SamplerASustain,
Slider_SamplerARelease,
Slider_SampleOffsetA,
Slider_SamplerAPitchCoarse,
Slider_SamplerAPitchFine,
Slider_SamplerAPan,
Slider_SamplerAGain,

Slider_SamplerBAttack,
Slider_SamplerBDecay,
Slider_SamplerBSustain,
Slider_SamplerBRelease,
Slider_SampleOffsetB,
Slider_SamplerBPitchCoarse,
Slider_SamplerBPitchFine,
Slider_SamplerBPan,
Slider_SamplerBGain,

Slider_SamplerCAttack,
Slider_SamplerCDecay,
Slider_SamplerCSustain,
Slider_SamplerCRelease,
Slider_SampleOffsetC,
Slider_SamplerCPitchCoarse,
Slider_SamplerCPitchFine,
Slider_SamplerCPan,
Slider_SamplerCGain,

Slider_FilterFreq,
Slider_FilterQ,

Slider_AmpEQLow,
Slider_AmpEQMid,
Slider_AmpEQHigh,
Slider_AmpGain,
Slider_AmpOutput,
ComboBox_AmpCabSelect,

Slider_DriveWaveshaperGain,
Slider_DriveTubeGain,

Slider_WidthAmount,

Slider_StutterLFORate,
Slider_StutterLFOAmount,

Slider_PhaserRateA,
Slider_PhaserRateB,
Slider_PhaserFeedback,
Slider_PhaserMix,

Slider_DegradeBitDepth,
Slider_DegradeSampleHold,

Slider_ReverbSize,
Slider_ReverbDamping,
Slider_ReverbWidth,
Slider_ReverbMix,

Slider_DelayTimeLeft,
Slider_DelayTimeRight,
Slider_DelayFeedbackLeft,
Slider_DelayFeedbackRight,
Slider_DelayMix
];

const var randomizationButtonsArp = [Content.getComponent("Button_RandomizeArpNotes"),
                                     Content.getComponent("Button_RandomizeArpVelocity"),
                                     Content.getComponent("Button_RandomizeArpLength"),
                                     Content.getComponent("Button_RandomizeArpSteps"),
                                     Content.getComponent("Button_RandomizeArpSpeed"),
                                     Content.getComponent("Button_RandomizeArpOctaves"),
                                     Content.getComponent("Button_RandomizeArpSwing")];
                                 
const var randomizationButtonsADSR =  [
                                        Content.getComponent("Button_RandomizeSamplerAAttack"),
                                        Content.getComponent("Button_RandomizeSamplerADecay"),
                                        Content.getComponent("Button_RandomizeSamplerASustain"),
                                        Content.getComponent("Button_RandomizeSamplerARelease"),
                                        Content.getComponent("Button_RandomizeSamplerBAttack"),
                                        Content.getComponent("Button_RandomizeSamplerBDecay"),
                                        Content.getComponent("Button_RandomizeSamplerBSustain"),
                                        Content.getComponent("Button_RandomizeSamplerBRelease"),
                                        Content.getComponent("Button_RandomizeSamplerCAttack"),
                                        Content.getComponent("Button_RandomizeSamplerCDecay"),
                                        Content.getComponent("Button_RandomizeSamplerCSustain"),
                                        Content.getComponent("Button_RandomizeSamplerCRelease")
                                      ];
                                      
const var randomizationButtonsSampler = [Content.getComponent("Button_RandomizeSamplerAAttack"),
                                        Content.getComponent("Button_RandomizeSamplerADecay"),
                                        Content.getComponent("Button_RandomizeSamplerASustain"),
                                        Content.getComponent("Button_RandomizeSamplerARelease"),
                                        Content.getComponent("Button_RandomizeSamplerBAttack"),
                                        Content.getComponent("Button_RandomizeSamplerBDecay"),
                                        Content.getComponent("Button_RandomizeSamplerBSustain"),
                                        Content.getComponent("Button_RandomizeSamplerBRelease"),
                                        Content.getComponent("Button_RandomizeSamplerCAttack"),
                                        Content.getComponent("Button_RandomizeSamplerCDecay"),
                                        Content.getComponent("Button_RandomizeSamplerCSustain"),
                                        Content.getComponent("Button_RandomizeSamplerCRelease"),
                                        Content.getComponent("Button_RandomizeSamplerAComboBox"),
                                        Content.getComponent("Button_RandomizeSamplerASampleStart"),
                                        Content.getComponent("Button_RandomizeSamplerBComboBox"),
                                        Content.getComponent("Button_RandomizeSamplerBSampleStart"),
                                        Content.getComponent("Button_RandomizeSamplerCComboBox"),
                                        Content.getComponent("Button_RandomizeSamplerCSampleStart"),
                                        Content.getComponent("Button_RandomizeSamplerAPitchCoarse"),
                                        Content.getComponent("Button_RandomizeSamplerAPitchFine"),
                                        Content.getComponent("Button_RandomizeSamplerAPan"),
                                        Content.getComponent("Button_RandomizeSamplerAGain"),
                                        Content.getComponent("Button_RandomizeSamplerBPitchCoarse"),
                                        Content.getComponent("Button_RandomizeSamplerBPitchFine"),
                                        Content.getComponent("Button_RandomizeSamplerBPan"),
                                        Content.getComponent("Button_RandomizeSamplerBGain"),
                                        Content.getComponent("Button_RandomizeSamplerCPitchCoarse"),
                                        Content.getComponent("Button_RandomizeSamplerCPitchFine"),
                                        Content.getComponent("Button_RandomizeSamplerCPan"),
                                        Content.getComponent("Button_RandomizeSamplerCGain")];
                                        
const var Array = [];
                                        
                                      
const var randomizationButtonsFX = [Content.getComponent("Button_RandomizeFXFilterFreq"),
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
                                    
const var randomizationButtonsFXBypass = [Content.getComponent("Button_RandomizeFXFilterBypass"),
                                          Content.getComponent("Button_RandomizeFXAmpBypass"),
                                          Content.getComponent("Button_RandomizeFXDrive"),
                                          Content.getComponent("Button_RandomizeFXWidenerBypass"),
                                          Content.getComponent("Button_RandomizeFXPhaserBypass"),
                                          Content.getComponent("Button_RandomizeFXDegradeBypass"),
                                          Content.getComponent("Button_RandomizeFXReverbBypass"),
                                          Content.getComponent("Button_RandomizeFXDelayBypass")];
                                          
                                    
const var randomizationButtonsSamplerExtras = [Content.getComponent("Button_RandomizeSamplerASampleStart"),
                   Content.getComponent("Button_RandomizeSamplerAPitchCoarse"),
                   Content.getComponent("Button_RandomizeSamplerAPitchFine"),
                   Content.getComponent("Button_RandomizeSamplerAPan"),
                   Content.getComponent("Button_RandomizeSamplerAGain"),
                   Content.getComponent("Button_RandomizeSamplerBSampleStart"),
                   Content.getComponent("Button_RandomizeSamplerBPitchCoarse"),
                   Content.getComponent("Button_RandomizeSamplerBPitchFine"),
                   Content.getComponent("Button_RandomizeSamplerBPan"),
                   Content.getComponent("Button_RandomizeSamplerBGain"),
                   Content.getComponent("Button_RandomizeSamplerCSampleStart"),
                   Content.getComponent("Button_RandomizeSamplerCPitchCoarse"),
                   Content.getComponent("Button_RandomizeSamplerCPitchFine"),
                   Content.getComponent("Button_RandomizeSamplerCPan"),
                   Content.getComponent("Button_RandomizeSamplerCGain")];
                                      
                                 
const var randomizationButtonsComboBoxes = [Content.getComponent("Button_RandomizeSamplerAComboBox"),
                                            Content.getComponent("Button_RandomizeSamplerBComboBox"),
                                            Content.getComponent("Button_RandomizeSamplerCComboBox")];

//Create individual functions for buttons.


inline function randomArp()
{
    
    for (i=3; i<6; i++)
    {
        if (randomizationButtonsArp[i].getValue() == 1)
        { 
            local control = randomizationControls[i];
            control.setValue(Math.randInt(control.get("min"), control.get("max")));
            control.changed();
        }
    }
    if (randomizationButtonsArp[6].getValue() == 1) 
    {
        randomizationControls[6].setValue(Math.random());
        randomizationControls[6].changed();
    }
    randomizeArpNotes();
    randomizeArpVelocity();
    randomizeArpLength();    
}

inline function randomizeArpNotes()
{
        if (randomizationButtonsArp[0].getValue() == 1)
        {        
            for (s=0; s<SliderPack_ArpNotes.getNumSliders(); s++)
            {
                SliderPack_ArpNotes.setSliderAtIndex(s, Math.randInt(-24,24));
                SliderPack_ArpNotes.changed();             
            }       
        }
}

inline function randomizeArpVelocity()
{
        if (randomizationButtonsArp[1].getValue() == 1)
        {        
            for (s=0; s<SliderPack_ArpVelocity.getNumSliders(); s++)
            {
                SliderPack_ArpVelocity.setSliderAtIndex(s, Math.randInt(1,127));
                SliderPack_ArpVelocity.changed();             
            }    
        }
}

inline function randomizeArpLength()
{
        if (randomizationButtonsArp[2].getValue() == 1)
        {        
            for (s=0; s<SliderPack_ArpLength.getNumSliders(); s++)
            {
                SliderPack_ArpLength.setSliderAtIndex(s, Math.randInt(1,127));
                SliderPack_ArpLength.changed();             
            }   
        }
}

inline function randomSamplerExtras()
{   

    //Sampler A
    //Sample Start Offset
        if (randomizationButtonsSamplerExtras[0].getValue())
        {    
            Slider_SampleOffsetA.setValue(Math.random());
            Slider_SampleOffsetA.changed();
        }
    
    //Pitch Coarse
        if (randomizationButtonsSamplerExtras[1].getValue())
        {    
            Slider_SamplerAPitchCoarse.setValue(Math.randInt(-12, 12));
            Slider_SamplerAPitchCoarse.changed();
        }
    
    //Pitch Fine
        if (randomizationButtonsSamplerExtras[2].getValue())
        {    
            Slider_SamplerAPitchFine.setValue(Math.randInt(-100, 100));
            Slider_SamplerAPitchFine.changed();
        }
    
    //Pan
        if (randomizationButtonsSamplerExtras[3].getValue())
        {    
            Slider_SamplerAPan.setValue(Math.randInt(-100, 100));
            Slider_SamplerAPan.changed();
        }
        
    //Gain
        if (randomizationButtonsSamplerExtras[4].getValue())
        {    
            Slider_SamplerAGain.setValue(Math.randInt(-100, 0));
            Slider_SamplerAGain.changed();
        }
        
    //Sampler B
    //Sample Start Offset
        if (randomizationButtonsSamplerExtras[5].getValue())
        {    
            Slider_SampleOffsetB.setValue(Math.random());
            Slider_SampleOffsetB.changed();
        }
    
    //Pitch Coarse
        if (randomizationButtonsSamplerExtras[6].getValue())
        {    
            Slider_SamplerBPitchCoarse.setValue(Math.randInt(-12, 12));
            Slider_SamplerBPitchCoarse.changed();
        }
    
    //Pitch Fine
        if (randomizationButtonsSamplerExtras[7].getValue())
        {    
            Slider_SamplerBPitchFine.setValue(Math.randInt(-100, 100));
            Slider_SamplerBPitchFine.changed();
        }
    
    //Pan
        if (randomizationButtonsSamplerExtras[8].getValue())
        {    
            Slider_SamplerBPan.setValue(Math.randInt(-100, 100));
            Slider_SamplerBPan.changed();
        }
        
    //Gain
        if (randomizationButtonsSamplerExtras[9].getValue())
        {    
            Slider_SamplerBGain.setValue(Math.randInt(-100, 0));
            Slider_SamplerBGain.changed();
        }
        
    //Sampler C
    //Sample Start Offset
        if (randomizationButtonsSamplerExtras[10].getValue())
        {    
            Slider_SampleOffsetC.setValue(Math.random());
            Slider_SampleOffsetC.changed();
        }
    
    //Pitch Coarse
        if (randomizationButtonsSamplerExtras[11].getValue())
        {    
            Slider_SamplerCPitchCoarse.setValue(Math.randInt(-12, 12));
            Slider_SamplerCPitchCoarse.changed();
        }
    
    //Pitch Fine
        if (randomizationButtonsSamplerExtras[12].getValue())
        {    
            Slider_SamplerCPitchFine.setValue(Math.randInt(-100, 100));
            Slider_SamplerCPitchFine.changed();
        }
    
    //Pan
        if (randomizationButtonsSamplerExtras[13].getValue())
        {    
            Slider_SamplerCPan.setValue(Math.randInt(-100, 100));
            Slider_SamplerCPan.changed();
        }
        
    //Gain
        if (randomizationButtonsSamplerExtras[14].getValue())
        {    
            Slider_SamplerCGain.setValue(Math.randInt(-100, 0));
            Slider_SamplerCGain.changed();
        }
        
}

inline function randomPad()
{   

    //Sampler A
    //Attack
        if (randomizationButtonsADSR[0].getValue() == 1)
        {    
            Slider_SamplerAAttack.setValue(Math.randInt(5, 20000));
            Slider_SamplerAAttack.changed();
        }
    
    //Decay
        if (randomizationButtonsADSR[1].getValue() == 1)
        {    
            Slider_SamplerADecay.setValue(Math.randInt(5, 5000));
            Slider_SamplerADecay.changed();
        }
    
    //Sustain
        if (randomizationButtonsADSR[2].getValue() == 1)
        {    
            Slider_SamplerASustain.setValue(0);
            Slider_SamplerASustain.changed();
        }
    
    //Release
        if (randomizationButtonsADSR[3].getValue() == 1)
        {    
            Slider_SamplerARelease.setValue(Math.randInt(5, 20000));
            Slider_SamplerARelease.changed();
        }
        
    //Sampler B
    //Attack
        if (randomizationButtonsADSR[4].getValue() == 1)
        {    
            Slider_SamplerBAttack.setValue(Math.randInt(5, 20000));
            Slider_SamplerBAttack.changed();
        }
    
    //Decay
        if (randomizationButtonsADSR[5].getValue() == 1)
        {    
            Slider_SamplerBDecay.setValue(Math.randInt(5, 5000));
            Slider_SamplerBDecay.changed();
        }
    
    //Sustain
        if (randomizationButtonsADSR[6].getValue() == 1)
        {    
            Slider_SamplerBSustain.setValue(0);
            Slider_SamplerBSustain.changed();
        }
    
    //Release
        if (randomizationButtonsADSR[7].getValue() == 1)
        {    
            Slider_SamplerBRelease.setValue(Math.randInt(5, 20000));
            Slider_SamplerBRelease.changed();
        }
        
    //Sampler C
    //Attack
        if (randomizationButtonsADSR[8].getValue() == 1)
        {    
            Slider_SamplerCAttack.setValue(Math.randInt(5, 20000));
            Slider_SamplerCAttack.changed();
        }
    
    //Decay
        if (randomizationButtonsADSR[9].getValue() == 1)
        {    
            Slider_SamplerCDecay.setValue(Math.randInt(5, 5000));
            Slider_SamplerCDecay.changed();
        }
    
    //Sustain
        if (randomizationButtonsADSR[10].getValue() == 1)
        {    
            Slider_SamplerCSustain.setValue(0);
            Slider_SamplerCSustain.changed();
        }
    
    //Release
        if (randomizationButtonsADSR[11].getValue() == 1)
        {    
            Slider_SamplerCRelease.setValue(Math.randInt(5, 20000));
            Slider_SamplerCRelease.changed();
        }
}

inline function randomStab()
{   
    //Sampler A
    //Attack

        if (randomizationButtonsADSR[0].getValue() == 1)
    {
        Slider_SamplerAAttack.setValue(Math.randInt(5, 150));
        Slider_SamplerAAttack.changed();
    }

    
    //Decay
        if (randomizationButtonsADSR[1].getValue() == 1)
    { 
        Slider_SamplerADecay.setValue(Math.randInt(5, 5000));
        Slider_SamplerADecay.changed();
    }
    
    //Sustain
        if (randomizationButtonsADSR[2].getValue() == 1)
    {
        Slider_SamplerASustain.setValue(Math.randInt(-100, 0));
        Slider_SamplerASustain.changed();
    }
    
    //Release
        if (randomizationButtonsADSR[3].getValue() == 1)
    {
        Slider_SamplerARelease.setValue(Math.randInt(5, 2000));
        Slider_SamplerARelease.changed();    
    }
    
    //Sampler B
    //Attack

        if (randomizationButtonsADSR[4].getValue() == 1)
    {
        Slider_SamplerBAttack.setValue(Math.randInt(5, 150));
        Slider_SamplerBAttack.changed();
    }

    
    //Decay
        if (randomizationButtonsADSR[5].getValue() == 1)
    { 
        Slider_SamplerBDecay.setValue(Math.randInt(5, 5000));
        Slider_SamplerBDecay.changed();
    }
    
    //Sustain
        if (randomizationButtonsADSR[6].getValue() == 1)
    {
        Slider_SamplerBSustain.setValue(Math.randInt(-100, 0));
        Slider_SamplerBSustain.changed();
    }
    
    //Release
        if (randomizationButtonsADSR[7].getValue() == 1)
    {
        Slider_SamplerBRelease.setValue(Math.randInt(5, 2000));
        Slider_SamplerBRelease.changed();    
    }
    
    //Sampler A
    //Attack

        if (randomizationButtonsADSR[8].getValue() == 1)
    {
        Slider_SamplerCAttack.setValue(Math.randInt(5, 150));
        Slider_SamplerCAttack.changed();
    }

    
    //Decay
        if (randomizationButtonsADSR[9].getValue() == 1)
    { 
        Slider_SamplerCDecay.setValue(Math.randInt(5, 5000));
        Slider_SamplerCDecay.changed();
    }
    
    //Sustain
        if (randomizationButtonsADSR[10].getValue() == 1)
    {
        Slider_SamplerCSustain.setValue(Math.randInt(-100, 0));
        Slider_SamplerCSustain.changed();
    }
    
    //Release
        if (randomizationButtonsADSR[11].getValue() == 1)
    {
        Slider_SamplerCRelease.setValue(Math.randInt(5, 2000));
        Slider_SamplerCRelease.changed();    
    }
}



inline function randomFX()
{
    
    local outputCompensation;
    
    //bypass buttons
    
    if (randomizationButtonsFXBypass[0].getValue() == 1)
    {
        FXBypassButtons[0].setValue(Math.random());
        FXBypassButtons[0].changed();
    }
    
    if (randomizationButtonsFXBypass[1].getValue() == 1)
    {
        FXBypassButtons[3].setValue(Math.round(Math.random()));
        FXBypassButtons[3].changed();
    }
    
    if (randomizationButtonsFXBypass[2].getValue() == 1)
    {
        FXBypassButtons[4].setValue(Math.round(Math.random()));
        FXBypassButtons[4].changed();
    }
    
    if (randomizationButtonsFXBypass[3].getValue() == 1)
    {
        FXBypassButtons[5].setValue(Math.random());
        FXBypassButtons[5].changed();
    }
    
    if (randomizationButtonsFXBypass[4].getValue() == 1)
    {
        FXBypassButtons[6].setValue(Math.random());
        FXBypassButtons[6].changed();
    }
    
    if (randomizationButtonsFXBypass[5].getValue() == 1)
    {
        FXBypassButtons[7].setValue(Math.random());
        FXBypassButtons[7].changed();
    }   
    
    if (randomizationButtonsFXBypass[6].getValue() == 1)
    {
        FXBypassButtons[8].setValue(Math.random());
        FXBypassButtons[8].changed();
    }   
    
    if (randomizationButtonsFXBypass[7].getValue() == 1)
    {
        FXBypassButtons[9].setValue(Math.random());
        FXBypassButtons[9].changed();
    }   
    

    //filter
    
    if (randomizationButtonsFX[0].getValue() == 1)
    {
        Slider_FilterFreq.setValue(Math.randInt(350, 20000));
        Slider_FilterFreq.changed();
    }
    if (randomizationButtonsFX[1].getValue() == 1)
    {
        local randomFloat = 0.0;
        randomFloat = Math.randInt(1, 4) - Math.range(Math.random(), 0.0, 0.7);
        randomFloat = Engine.doubleToString(randomFloat, 2);
        randomFloat = Math.range(randomFloat, 0.3, 4.0);
        Slider_FilterQ.setValue(randomFloat);
        Slider_FilterQ.changed();
    }
    

    
    //amp
    if (randomizationButtonsFX[2].getValue() == 1) //EQ LOW
    {
        Slider_AmpEQLow.setValue(Math.randInt(Slider_AmpEQLow.get("min"), Slider_AmpEQLow.get("max")));
        Slider_AmpEQLow.changed();
    }
    
    if (randomizationButtonsFX[3].getValue() == 1) //EQ MID
    {
        Slider_AmpEQMid.setValue(Math.randInt(Slider_AmpEQMid.get("min"), Slider_AmpEQMid.get("max")));
        Slider_AmpEQMid.changed();
    }
    
    if (randomizationButtonsFX[4].getValue() == 1) //EQ HIGH
    {
        Slider_AmpEQHigh.setValue(Math.randInt(Slider_AmpEQHigh.get("min"), Slider_AmpEQHigh.get("max")));
        Slider_AmpEQHigh.changed();
    }    
    
    if (randomizationButtonsFX[5].getValue() == 1) //DRIVE
    {
        Slider_AmpGain.setValue(Math.randInt(0, 100));
        Slider_AmpGain.changed();    
    }
    
    if (randomizationButtonsFX[6].getValue() == 1) //OUTPUT 
    {
        Slider_AmpOutput.setValue(Math.randInt(-100, 0));
        Slider_AmpOutput.changed();    
    }
    
    if (randomizationButtonsFX[7].getValue() == 1) //CABINET 
    {    
        ComboBox_AmpCabSelect.setValue(Math.randInt(1, 14));
        ComboBox_AmpCabSelect.changed();  
    }
    
    //drive
    
    if (randomizationButtonsFX[8].getValue() == 1)  
    {    
        Slider_DriveWaveshaperGain.setValue(Math.randInt(0, 12));
        Slider_DriveWaveshaperGain.changed();
    }
    
    if (randomizationButtonsFX[9].getValue() == 1)  
    {        
        Slider_DriveTubeGain.setValue(Math.randInt(0, 12));
        Slider_DriveTubeGain.changed();
    }

    //utility
    if (randomizationButtonsFX[10].getValue() == 1)  
    { 
        Slider_WidthAmount.setValue(Math.randInt(0, 200));
        Slider_WidthAmount.changed();
    }
    
    if (randomizationButtonsFX[11].getValue() == 1)  
    { 
        if (Button_StutterLFOSync.getValue() == 1)
        {
            Slider_StutterLFORate.setValue(Math.randInt(0, 18));
            Slider_StutterLFORate.changed();
        }
        else 
        {
            Slider_StutterLFORateFree.setValue(Math.randInt(0.5, 40));
            Slider_StutterLFORateFree.changed();
        }
    }
    
    if (randomizationButtonsFX[12].getValue() == 1)  
    { 
        Slider_StutterLFOAmount.setValue(Math.random());
        Slider_StutterLFOAmount.changed();
    }    
    
    
    //phaser
    
    if (randomizationButtonsFX[13].getValue() == 1)  
    { 
        Slider_PhaserRateA.setValue(Math.randInt(20, 20000));
        Slider_PhaserRateA.changed();
    }
    
    if (randomizationButtonsFX[14].getValue() == 1)  
    { 
        Slider_PhaserRateB.setValue(Math.randInt(20, 20000));
        Slider_PhaserRateB.changed();
    }    
    
    if (randomizationButtonsFX[15].getValue() == 1)  
    { 
        Slider_PhaserFeedback.setValue(Math.random());
        Slider_PhaserFeedback.changed();
    }    
    
    if (randomizationButtonsFX[16].getValue() == 1)  
    { 
        Slider_PhaserMix.setValue(Math.random());
        Slider_PhaserMix.changed();
    }     
    
      
    
    //degrade
    
    if (randomizationButtonsFX[17].getValue() == 1)  
    { 
        Slider_DegradeBitDepth.setValue(Math.randInt(4, 16));
        Slider_DegradeBitDepth.changed();        
    }
    
    if (randomizationButtonsFX[18].getValue() == 1)  
    { 
        Slider_DegradeSampleHold.setValue(Math.randInt(1, 24));
        Slider_DegradeSampleHold.changed();
    }

    //reverb
    
    if (randomizationButtonsFX[19].getValue() == 1)  
    { 
        Slider_ReverbSize.setValue(Math.random());
        Slider_ReverbSize.changed();
    }    
    
    if (randomizationButtonsFX[20].getValue() == 1)  
    { 
        Slider_ReverbDamping.setValue(Math.random());
        Slider_ReverbDamping.changed();
    }
    
    if (randomizationButtonsFX[21].getValue() == 1)  
    { 
        Slider_ReverbWidth.setValue(Math.random());
        Slider_ReverbWidth.changed();
    }
    
    if (randomizationButtonsFX[22].getValue() == 1)  
    { 
        Slider_ReverbMix.setValue(Math.random());
        Slider_ReverbMix.changed();
    }    

    //delay
    
    if (randomizationButtonsFX[23].getValue() == 1) 
    { 
        Slider_DelayTimeLeft.setValue(Math.randInt(Slider_DelayTimeLeft.get("min"), Slider_DelayTimeLeft.get("max")));
        Slider_DelayTimeLeft.changed();
    }
    
    if (randomizationButtonsFX[24].getValue() == 1) 
    {     
        Slider_DelayTimeRight.setValue(Math.randInt(Slider_DelayTimeRight.get("min"), Slider_DelayTimeRight.get("max")));
        Slider_DelayTimeRight.changed();
    }    
    
    if (randomizationButtonsFX[25].getValue() == 1) 
    {         
        Slider_DelayFeedbackLeft.setValue(Math.range(Math.random(), 0, 0.5));
        Slider_DelayFeedbackLeft.changed();
    }
    
    if (randomizationButtonsFX[26].getValue() == 1) 
    {         
        Slider_DelayFeedbackRight.setValue(Math.range(Math.random(), 0, 0.5));
        Slider_DelayFeedbackRight.changed();
    }    

    if (randomizationButtonsFX[27].getValue() == 1) 
    {       
        Slider_DelayMix.setValue(Math.range(Math.random(), 0, 0.5));    
        Slider_DelayMix.changed();
    }
}


//Randomize Panel

const var Panel_RandomizeContainer = Content.getComponent("Panel_RandomizeContainer");

//Open the panel

inline function onButton_OpenRandomizePanelControl(component, value)
{
    Panel_RandomizeContainer.set("visible", value);    
};

Content.getComponent("Button_OpenRandomizePanel").setControlCallback(onButton_OpenRandomizePanelControl);

//Populate the panel

const var randomButtons = ["Button_RandomRESET", "Button_RandomAll", "Button_RandomPatch", "Button_RandomStab", "Button_RandomPad", "Button_RandomArp", "Button_RandomFX"];
var randomButtonsYOffset = 0;

inline function randomComboBoxes()
{
    if (randomizationButtonsComboBoxes[0].getValue())
    {
        ComboBox_SamplerA.setValue(Math.randInt(ComboBox_SamplerA.get("min"), ComboBox_SamplerA.get("max") + 1));
        ComboBox_SamplerA.changed();
    }
    
    if (randomizationButtonsComboBoxes[1].getValue())
    {
        ComboBox_SamplerB.setValue(Math.randInt(ComboBox_SamplerB.get("min"), ComboBox_SamplerB.get("max") + 1));
        ComboBox_SamplerB.changed();
    }
    
    if (randomizationButtonsComboBoxes[2].getValue())
    {
        ComboBox_SamplerC.setValue(Math.randInt(ComboBox_SamplerC.get("min"), ComboBox_SamplerC.get("max") + 1));
        ComboBox_SamplerC.changed();
    }
    
    randomSamplerExtras();
}

inline function randomAll()
{
    local chance = Math.random();
    if (chance < 0.5)
        randomStab();
    else
        randomPad();
    randomArp();
    randomFX();
    randomComboBoxes();
    randomSamplerExtras();
}

inline function randomRESET()
{
    for (r=3; r<randomizationControls.length; r++)
    {
        local val = randomizationControls[r].get("defaultValue");
        randomizationControls[r].setValue(val);
        randomizationControls[r].changed();
    }
    
    Button_ArpNotesReset.setValue(1);
    Button_ArpNotesReset.changed();
    Button_ArpVelocityReset.setValue(1);
    Button_ArpVelocityReset.changed();
    Button_ArpLengthReset.setValue(1);
    Button_ArpLengthReset.changed();
    
    for (b in FXBypassButtons)
    {
        b.setValue(0);
        b.changed();
    }    
}

inline function createRandomButton(name, count)
{
    local widget = Content.addPanel(name);
    
    local xPos = 0;
    local yPos = Panel_RandomizeContainer.getHeight() / 7 * count;

    switch (name)
    {
        case "Button_RandomRESET":
        widget.data.name = "RESET";  
        widget.data.func = randomRESET;   
        break;
        
        case "Button_RandomAll":
        widget.data.name = "ALL";  
        widget.data.func = randomAll;   
        break;
        
        case "Button_RandomPatch":
        widget.data.name = "PATCH";  
        widget.data.func = randomComboBoxes;   
        break;
        
        case "Button_RandomArp":
        widget.data.name = "ARP";     
        widget.data.func = randomArp;           
        break;
        
        case "Button_RandomStab":
        widget.data.name = "STAB";      
        widget.data.func = randomStab; 
        break;
        
        case "Button_RandomPad":
        widget.data.name = "PAD";     
        widget.data.func = randomPad; 
        break;
        
        case "Button_RandomFX":
        widget.data.name = "FX";      
        widget.data.func = randomFX; 
        break;
        
        default:
    }

        widget.setPaintRoutine(function(g)
        {     
            g.fillAll(colours.darkgrey);
            g.setColour(colours.darkgrey);
            g.fillRoundedRectangle([0,0,this.getWidth(),this.getHeight()], 4.0);
            g.setColour(Colours.white);
            g.setFont("Arial", 11);
            g.drawAlignedText(this.data.name, [0, 0, this.getWidth(), this.getHeight()], "centred");
        });     
        
        widget.setMouseCallback(function(event)
        {
            if (event.clicked)
            {
                this.data.func();
            }
                
            else if (event.hover)
            {
                this.setPaintRoutine(function(g)
                {     
                    g.setColour(Colours.darkgrey);
                    g.fillRoundedRectangle([0,0,this.getWidth(),this.getHeight()], 4.0);
                    g.setColour(Colours.white);
                    g.setFont("Arial", 11);
                    g.drawAlignedText(this.data.name, [0, 0, this.getWidth(), this.getHeight()], "centred");
                });    
            }
            else 
            {
                this.setPaintRoutine(function(g)
                {     
                    g.fillAll(colours.darkgrey);
                    g.setColour(colours.darkgrey);
                    g.fillRoundedRectangle([0,0,this.getWidth(),this.getHeight()], 4.0);
                    g.setColour(Colours.white);
                    g.setFont("Arial", 11);
                    g.drawAlignedText(this.data.name, [0, 0, this.getWidth(), this.getHeight()], "centred");
                });                                 
            }    
        });
    
    widget.setPosition(xPos, yPos, randomizeButtonWidth, randomizeButtonHeight);
    
    //Set size
    Content.setPropertiesFromJSON(name, 
	{
		"width": Panel_RandomizeContainer.getWidth(),
		"height": (Panel_RandomizeContainer.getHeight() / 5) - 1,
		"allowCallbacks": "Clicks & Hover",
		"opaque": 0,
		"saveInPreset": 0,
		"parentComponent": "Panel_RandomizeContainer",
	});    
}

for (r = 0; r<randomButtons.length; r++)
{
    createRandomButton(randomButtons[r], r);
}



//Randomization Buttons Visibility


const var Button_RandomizationButtonsVisibility = Content.getComponent("Button_RandomizationButtonsVisibility");


inline function onButton_RandomizationButtonsVisibilityControl(component, value)
{
    for (r in randomizationButtonsArp)
    {
        r.showControl(value);
        Content.setPropertiesFromJSON(r, 
        {
            "visible": value,
        });   
    }
            
    for (r in randomizationButtonsSampler)
    {
        r.showControl(value);
        Content.setPropertiesFromJSON(r, 
        {
            "visible": value,
        });   
    }
            
    for (r in randomizationButtonsFX)
    {
        r.showControl(value);
        Content.setPropertiesFromJSON(r, 
        {
            "visible": value,
        });   
    }
    
    for (r in randomizationButtonsFXBypass)
    {
        r.showControl(value);
        Content.setPropertiesFromJSON(r, 
        {
            "visible": value,
        });   
    }    
};

Content.getComponent("Button_RandomizationButtonsVisibility").setControlCallback(onButton_RandomizationButtonsVisibilityControl);
 