/* Functions specific to loading expansions */

inline function clearSamplers()
{
    SamplerA.asSampler().clearSampleMap();
    SamplerB.asSampler().clearSampleMap();
    SamplerC.asSampler().clearSampleMap();
    
    Sampler_Other.asSampler().clearSampleMap();
    
    samplerLoopPitch(0.0); //Resets loop pitch...
    
    SamplerA_Velocity.setBypassed(true);
    SamplerB_Velocity.setBypassed(true);
    SamplerC_Velocity.setBypassed(true);

    randomReleaseNoiseActive = 0;

    velocityMin = 1;
    velocityMax = 127;
}

inline function resolveComboBoxes()
{
    if (ComboBox_SamplerA.getValue() == 0);
    {
        ComboBox_SamplerA.setValue(1);
        ComboBox_SamplerA.changed();
    }
    
    if (ComboBox_SamplerB.getValue() == 0);
    {
        ComboBox_SamplerB.setValue(2);
        ComboBox_SamplerB.changed();
    }
    
    if (ComboBox_SamplerC.getValue() == 0);
    {
        ComboBox_SamplerC.setValue(3);
        ComboBox_SamplerC.changed();
    }
}

inline function clearGUI()
{
    ComboBox_SamplerA.set("items", ""); //Clears ComboBox
    ComboBox_SamplerB.set("items", ""); //Clears ComboBox
    ComboBox_SamplerC.set("items", ""); //Clears ComboBox
    
    ComboBox_SamplerA.set("text", "Select");
    ComboBox_SamplerB.set("text", "Select");
    ComboBox_SamplerC.set("text", "Select");

    Panel_SamplerDisabledB.showControl(0);
    Panel_SamplerDisabledC.showControl(0);

    // Hide extra GUI elements
    
    extrasCloudburstAcoustic.Panel_CloudburstAcousticNoises.set("visible", 0);
    extrasAchromic.Panel_AchromicSettings.set("visible", 0);
    extrasPDQBass.Panel_PDQBassSettings.set("visible", 0);
    extrasGloom.Panel_GloomExtras.set("visible", 0);      
    extrasPortal.Panel_PortalVelocity.set("visible", 0);
    
    // Clear parameters
    
    for (a in extrasAchromic.achromicParameters)
        a.set("isPluginParameter", 0);
        
    extrasPDQBass.Button_PDQBassForceDownpick.set("isPluginParameter", 0);
}

//Load Expansion from Manifest

inline function loadExpansionFromManifest()
{
    local backgroundImage = expHandler.getCurrentExpansion().getWildcardReference("background.jpg");

    Image_BG.setAlpha(1);
    Image_BG.set("fileName", backgroundImage);
    
        //Setting up Samplers
    clearSamplers();

    SamplerA.asSampler().loadSampleMap(manifest.sampleMapA);
    SamplerA.asSampler().enableRoundRobin(manifest.samplerRoundRobin[0]);
    
    //Setting Key Colours

    colourKeysReset(); //Reset

    for (i=0; i<127; i++)
    {
        //Disable Keys First
        if (i < manifest.keyRange[0] || i > manifest.keyRange[1]) 
            Engine.setKeyColour(i, Colours.withAlpha(Colours.black, .8));
        //Add our colours back in
        if (manifest.usesPitchKeys) //Pitch Keys
        {
            if (i >= 24 && i <= 48)
                Engine.setKeyColour(i, Colours.withAlpha(Colours.lime, .45));
            Engine.setKeyColour(36, Colours.withAlpha(Colours.deepskyblue, 0.5));
        }
        if (manifest.usesYellowKeys) //Yellow
            if (i >= manifest.yellowKeyRange[0] && i <= manifest.yellowKeyRange[1])
                Engine.setKeyColour(i, Colours.withAlpha(Colours.yellow, .5));
        if (manifest.usesBlueKeys) //Blue
            if (i >= manifest.blueKeyRange[0] && i <= manifest.blueKeyRange[1])
                Engine.setKeyColour(i, Colours.withAlpha(Colours.deepskyblue, .5));    
        if (manifest.usesPurpleKeys) //Purple
            if (i >= manifest.purpleKeyRange[0] && i <= manifest.purpleKeyRange[1])
                Engine.setKeyColour(i, Colours.withAlpha(0xFFCC96FF, .5));
        if (manifest.usesGreenKeys) //Green
            if (i >= manifest.greenKeyRange[0] && i <= manifest.greenKeyRange[1])
                Engine.setKeyColour(i, Colours.withAlpha(Colours.lime, .5));
    }
    
    //Hiding other GUI Elements
    clearGUI();
    
    Panel_SamplerDisabledB.showControl(manifest.samplerHidden[1]);
    Panel_SamplerDisabledC.showControl(manifest.samplerHidden[2]);

    ComboBox_SamplerA.set("text", manifest.samplerText[0]);
    ComboBox_SamplerB.set("text", manifest.samplerText[1]);
    ComboBox_SamplerC.set("text", manifest.samplerText[2]);
    
    ArpeggiatorScript.restoreArp();

    //Set Round Robins, even if Sampler is unused (important for Custom RR Script)

    SamplerB.asSampler().enableRoundRobin(manifest.samplerRoundRobin[1]);
    SamplerC.asSampler().enableRoundRobin(manifest.samplerRoundRobin[2]);

    //Check if the expansion uses the additional samplers.

    if (manifest.sampleMapB != null)
    {
        SamplerB.asSampler().loadSampleMap(manifest.sampleMapB);
        Button_SamplerBBypass.setValue(1);
        Button_SamplerBBypass.changed();
    }

    if (manifest.sampleMapC != null)
    {
        SamplerC.asSampler().loadSampleMap(manifest.sampleMapC);    
        Button_SamplerCBypass.setValue(1);
        Button_SamplerCBypass.changed();
    }

    //Extra Sampler

    if (manifest.sampleMapOther != null)
    {
        Sampler_Other.setAttribute(12, 0); //Disables Purge if Enabled
        Sampler_Other.setBypassed(0);
        Sampler_Other.asSampler().loadSampleMap(manifest.sampleMapOther);
    }

    //Release Noises 

    if (manifest.usesRandomReleaseNoise)
        randomReleaseNoiseActive = 1;

    //Set Velocities here:

    SamplerA_Velocity.setBypassed(manifest.samplerVelocityBypassed[0]);
    SamplerB_Velocity.setBypassed(manifest.samplerVelocityBypassed[1]);
    SamplerC_Velocity.setBypassed(manifest.samplerVelocityBypassed[2]);

    //Show Expansion Specific Controls

    if (manifest.usesAdditionalGUIControls)
    {
        local component_string = manifest.additionalGUIControlsIndex; //might need to move outside of scope due to local rework
        Content.getComponent(component_string).set("visible", 1);
    }

    //Custom Plugin Parameters      

    if (manifest.usesAdditionalPluginParameters)
        for (i=0; i<manifest.additionalPluginParameters.length; i++)
        {
            local component_string = manifest.additionalPluginParameters[i];
            Content.getComponent(component_string).set("isPluginParameter", 1);
        }    

    //Populate ComboBoxes

    if(manifest.usesComboBoxItems)
    {
        for (i=0; i<manifest.comboBoxItems.length; i++)
        {
            ComboBox_SamplerA.addItem(manifest.comboBoxItems[i]);
            if (manifest.sampleMapB != null)
                ComboBox_SamplerB.addItem(manifest.comboBoxItems[i]);
            if (manifest.sampleMapC != null)
                ComboBox_SamplerC.addItem(manifest.comboBoxItems[i]);
        }
    }

    resolveComboBoxes(); //Ensures ComboBoxes don't have 0 value.

    //Loop Instruments

    //Arp Steps 
    if(manifest.isLoopInstrument)
    {
        Slider_ArpSteps.setValue(manifest.numArpSteps);
        Slider_ArpSteps.changed();    
        turnArpOn();  
    }

    //Guitar Instruments

    alternatePickingVelocityRange[0] = manifest.alternatePickingVelocityRange[0];
    alternatePickingVelocityRange[1] = manifest.alternatePickingVelocityRange[1];

    //Split Archive RR Fix
    if (manifest.usesSplitSampleArchive)
    {
        SamplerA.asSampler().setActiveGroup(1);
        SamplerB.asSampler().setActiveGroup(1);
        SamplerC.asSampler().setActiveGroup(1);
    }

    if (manifest.library == "bloom")
    {
        SamplerA.asSampler().setActiveGroup(1);
        SamplerB.asSampler().setActiveGroup(1);
        ComboBox_SamplerA.set("text", "Bloom");
        ComboBox_SamplerB.set("text", "Flourish");

        ComboBox_SamplerA.addItem("Bloom");
        ComboBox_SamplerB.addItem("Flourish");

        ComboBox_SamplerA.setValue(1);
        ComboBox_SamplerB.setValue(1);
    }
}