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

var comboBoxRandomButtons = ["Button_RandomizeSamplerAComboBox", "Button_RandomizeSamplerBComboBox", "Button_RandomizeSamplerCComboBox"];

inline function clearGUI()
{
    ComboBox_SamplerA.set("items", ""); //Clears ComboBox
    ComboBox_SamplerB.set("items", ""); //Clears ComboBox
    ComboBox_SamplerC.set("items", ""); //Clears ComboBox
    
    ComboBox_SamplerA.set("text", "Select");
    ComboBox_SamplerB.set("text", "Select");
    ComboBox_SamplerC.set("text", "Select");
    
    Panel_CloudburstAcousticNoises.set("visible", 0);
    Panel_AchromicSettings.set("visible", 0);
    Panel_PDQBassSettings.set("visible", 0);
    Panel_GloomExtras.set("visible", 0);
    
    Panel_SamplerDisabledB.showControl(0);
    Panel_SamplerDisabledC.showControl(0);
    
    Panel_PortalVelocity.set("visible", 0);
    
    //Clear parameters
    
    for (a in achromicParameters)
        a.set("isPluginParameter", 0);
        
    Button_PDQBassForceDownpick.set("isPluginParameter", 0);
}

/*********
 * /*********
 * /*********
 * /*********
 * /********* DONT DELETE BLOOM METHOD
 * /*********
 * /*********
 * /*********
 * /*********
 */

//Bloom

inline function loadBloom()
{
        //Setting BG Image        
    backgroundImage = ("{PROJECT_FOLDER}bg_bloom.jpg");
    Image_BG.setAlpha(1);
    Image_BG.set("fileName", backgroundImage); 
    
        //Setting up Samplers    
    clearSamplers();

        //Setting Key Colours    
    colourKeysReset();
    colourKeysBloom();
    
        //Hiding othe GUI Elements    
    clearGUI();
    
    ComboBox_SamplerA.addItem("Bloom");
    ComboBox_SamplerA.addItem("Flourish");
    
    ComboBox_SamplerA.setValue(1);
    ComboBox_SamplerA.changed();

        
    switch (ComboBox_SamplerA.getValue())
    {
        case 1:
            SamplerA.asSampler().loadSampleMap("{EXP::Bloom}Bloom_SampleMap");
            SamplerA.asSampler().enableRoundRobin(true);
        break;
            
        case 2:
            SamplerA.asSampler().loadSampleMap("{EXP::Bloom}Flourish_SampleMap");
            SamplerA.asSampler().enableRoundRobin(false);
            SamplerA_Velocity.setBypassed(false);
        break;
    }
    
    Panel_SamplerDisabledB.showControl(1);
    Panel_SamplerDisabledC.showControl(1);
    restoreArp();    
};

//Load Expansion from manifest.JSON

var manifestArrayLength;

inline function loadExpansionFromManifest()
{
    //backgroundImage = manifest.image;
    backgroundImage = expHandler.getCurrentExpansion().getWildcardReference("background.jpg");

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
            Engine.setKeyColour(36, Colours.aquamarine);
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
    
    restoreArp();

    //Set Round Robins, even if Sampler is unused (important for Custom RR Script)

    SamplerB.asSampler().enableRoundRobin(manifest.samplerRoundRobin[1]);
    SamplerC.asSampler().enableRoundRobin(manifest.samplerRoundRobin[2]);

    //Check if the expansion uses the additional samplers.

    if (manifest.sampleMapB != null)
        SamplerB.asSampler().loadSampleMap(manifest.sampleMapB);
    if (manifest.sampleMapC != null)
        SamplerC.asSampler().loadSampleMap(manifest.sampleMapC);    

    //Extra Sampler

    if (manifest.sampleMapOther != null)
    {
        Sampler_Other.setAttribute(12, 0); //Disables Purge if Enabled
        Sampler_Other.setBypassed(0);
        Sampler_Other.asSampler().loadSampleMap(manifest.sampleMapOther);
    }

    //Release Noises 

    if (manifest.usesRandomReleaseNoises)
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
        for (i=0; i<manifest.comboBoxItems.length; i++)
        {
            ComboBox_SamplerA.addItem(manifest.comboBoxItems[i]);
            if (manifest.sampleMapB != null)
                ComboBox_SamplerB.addItem(manifest.comboBoxItems[i]);
            if (manifest.sampleMapC != null)
                ComboBox_SamplerC.addItem(manifest.comboBoxItems[i]);
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



    //Notes:
    /*
        Bloom uses two separate sample maps, might need to fix.
        PDQ Bass checks a button value to see if it should load processed or unprocessed samples.
    */
}

/*
inline function loadCloudburst()
{
    backgroundImage = ("{PROJECT_FOLDER}bg_cloudburst.jpg");
    Image_BG.setAlpha(1);
    Image_BG.set("fileName", backgroundImage);
    
        //Setting up Samplers
    clearSamplers();
    
    SamplerA.asSampler().loadSampleMap("{EXP::Cloudburst}Cloudburst_SampleMap");
    SamplerA.asSampler().enableRoundRobin(true);
    
        //Setting Key Colours
    colourKeysReset();
    colourKeysCloudburst();
    
        //Hiding othe GUI Elements
    clearGUI();
    
    Panel_SamplerDisabledB.showControl(1);
    Panel_SamplerDisabledC.showControl(1);
    
    ComboBox_SamplerA.set("text", "Cloudburst");
    ComboBox_SamplerB.set("text", "unused");
    ComboBox_SamplerC.set("text", "unused");
    
    restoreArp();
};
*/

//Cloudburst Acoustic

inline function loadCloudburstAcoustic()
{
    backgroundImage = ("{PROJECT_FOLDER}bg_cloudburstacoustic.jpg");
    Image_BG.setAlpha(1);
    Image_BG.set("fileName", backgroundImage);
    
        //Setting up Samplers
    clearSamplers();
    
    SamplerA.asSampler().loadSampleMap("{EXP::CloudburstAcoustic}CloudburstAcousticMic1_SampleMap");
    SamplerA.asSampler().enableRoundRobin(true);
    SamplerB.asSampler().loadSampleMap("{EXP::CloudburstAcoustic}CloudburstAcousticMic2_SampleMap");
    SamplerB.asSampler().enableRoundRobin(true);

        //Setting Key Colours
    colourKeysReset();
    colourKeysCloudburst();
    
        //Hiding othe GUI Elements
    clearGUI();

    Panel_SamplerDisabledC.showControl(1);
    
    ComboBox_SamplerA.set("text", "Mono");
    ComboBox_SamplerB.set("text", "XY");
    ComboBox_SamplerC.set("text", "unused");
    
    Panel_CloudburstAcousticNoises.set("visible", 1);

    restoreArp();    
};



//Atlas

inline function loadAtlas()
{
        //Setting BG Image       
    backgroundImage = ("{PROJECT_FOLDER}bg_atlas.jpg");
    Image_BG.setAlpha(1);
    Image_BG.set("fileName", backgroundImage);     
    
        //Setting Up Samplers
    clearSamplers();

    SamplerA.asSampler().loadSampleMap("{EXP::Atlas}Atlas_SampleMap");
    SamplerA.asSampler().enableRoundRobin(false);
    
    SamplerB.asSampler().loadSampleMap("{EXP::Atlas}Atlas_SampleMap");
    SamplerB.asSampler().enableRoundRobin(false);
    
    SamplerC.asSampler().loadSampleMap("{EXP::Atlas}Atlas_SampleMap");
    SamplerC.asSampler().enableRoundRobin(false);
    
    SamplerA_Velocity.setBypassed(false);
    SamplerB_Velocity.setBypassed(false);
    SamplerC_Velocity.setBypassed(false);
    
        //Colour Keys
    colourKeysReset();
    colourKeysAtlas();    
    
        //Other GUI Elements
    clearGUI();
    
    //Populating ComboBox
    
    local populateCB = ["Crystal",
                        "Dialup",
                        "Discovery",
                        "Dirty Vinyl",
                        "Drift",
                        "Droplets",
                        "Levitate",
                        "Mod Organ",
                        "Morning",
                        "Ossuary",
                        "Phenom",
                        "Reliquary",
                        "Science",
                        "Solstice",
                        "Temple",
                        "Wonky"
                        ];
                    
    for (p in populateCB)
    {
        ComboBox_SamplerA.addItem(p);
        ComboBox_SamplerB.addItem(p);
        ComboBox_SamplerC.addItem(p);
    }
    
    resolveComboBoxes();
    restoreArp();    
};

//Found Keys

inline function loadFoundKeys()
{
        //Setting BG Image       
    backgroundImage = ("{PROJECT_FOLDER}bg_foundkeys.jpg");
    Image_BG.setAlpha(1);
    Image_BG.set("fileName", backgroundImage);  
    
        //Setting Up Samplers
    clearSamplers();
    
    SamplerA.asSampler().loadSampleMap("{EXP::Found Keys}FoundKeysSampleMap");
    SamplerA.asSampler().enableRoundRobin(false);
    
    SamplerB.asSampler().loadSampleMap("{EXP::Found Keys}FoundKeysSampleMap");
    SamplerB.asSampler().enableRoundRobin(false);
    
    SamplerC.asSampler().loadSampleMap("{EXP::Found Keys}FoundKeysSampleMap");
    SamplerC.asSampler().enableRoundRobin(false);
    
    SamplerA_Velocity.setBypassed(false);
    SamplerB_Velocity.setBypassed(false);
    SamplerC_Velocity.setBypassed(false);

        //Colour Keys
    colourKeysReset();
    colourKeysFoundKeys();    
    
        //Other GUI Elements
    clearGUI();
    
    //Populating ComboBox
    
    local populateCB = ["Without",
                        "Trauma",
                        "Xenophone",
                        "Fading",
                        "White Walls",
                        "Dread Flute",
                        "Paramount",
                        "Purest",
                        "Undefined",
                        "Ghost",
                        "Radar",
                        "Priest",
                        "Cord",
                        "Shatter",
                        "Belief"];
                    
    for (p in populateCB)
    {
        ComboBox_SamplerA.addItem(p);
        ComboBox_SamplerB.addItem(p);
        ComboBox_SamplerC.addItem(p);
    }
    
    resolveComboBoxes();
    restoreArp();    
};

//Endure

inline function loadEndure()
{
        //Setting BG Image       
    backgroundImage = ("{PROJECT_FOLDER}bg_endure.jpg");
    Image_BG.setAlpha(1);
    Image_BG.set("fileName", backgroundImage);  
    
        //Setting Up Samplers
    clearSamplers();
  
    SamplerA.asSampler().loadSampleMap("{EXP::Endure}Endure_SampleMap");
    SamplerA.asSampler().enableRoundRobin(false);
    
    SamplerB.asSampler().loadSampleMap("{EXP::Endure}Endure_SampleMap");
    SamplerB.asSampler().enableRoundRobin(false);
    
    SamplerC.asSampler().loadSampleMap("{EXP::Endure}Endure_SampleMap");
    SamplerC.asSampler().enableRoundRobin(false);
    
    SamplerA_Velocity.setBypassed(false);
    SamplerB_Velocity.setBypassed(false);
    SamplerC_Velocity.setBypassed(false);

        //Colour Keys
    colourKeysReset();
    colourKeysEndure();   
    
        //Other GUI Elements
    clearGUI();
    
    //Populating ComboBox
    
    local populateCB = ["Reinforced",
                        "Encased",
                        "Girded",
                        "Impenetrable",
                        "Fortified",
                        "Plated",
                        "Carapace",
                        "Rotund",
                        "Stalwart",
                        "Vitality"
                        ];
                    
    for (p in populateCB)
    {
        ComboBox_SamplerA.addItem(p);
        ComboBox_SamplerB.addItem(p);
        ComboBox_SamplerC.addItem(p);
    }
    
    resolveComboBoxes();
    restoreArp();    
};

//Prismatic

inline function loadPrismatic()
{
        //Setting BG Image       
    backgroundImage = ("{PROJECT_FOLDER}bg_prismatic.jpg");
    Image_BG.setAlpha(1);
    Image_BG.set("fileName", backgroundImage);     
    
        //Setting Up Samplers
    clearSamplers();

    SamplerA.asSampler().loadSampleMap("{EXP::Prismatic}Prismatic_SampleMap");
    SamplerA.asSampler().enableRoundRobin(false);
    
    SamplerB.asSampler().loadSampleMap("{EXP::Prismatic}Prismatic_SampleMap");
    SamplerB.asSampler().enableRoundRobin(false);
    
    SamplerC.asSampler().loadSampleMap("{EXP::Prismatic}Prismatic_SampleMap");
    SamplerC.asSampler().enableRoundRobin(false);
    
    SamplerA_Velocity.setBypassed(false);
    SamplerB_Velocity.setBypassed(false);
    SamplerC_Velocity.setBypassed(false);

        //Colour Keys
    colourKeysReset();
    colourKeysPrismatic(); 
    
        //Other GUI Elements
    clearGUI();
    
        //Populating ComboBox
    local populateCB = ["Wasted",
                        "Heartstring",
                        "Attack!",
                        "Submission",
                        "Robot Love",
                        "Shimmering",
                        "Howler",
                        "Willow",
                        "Petite",
                        "Ro-Mania",
                        "Coming To An End",
                        "Red Planet",
                        "Lift Off",
                        "Refract",
                        "Outside"];
                    
    for (p in populateCB)
    {
        ComboBox_SamplerA.addItem(p);
        ComboBox_SamplerB.addItem(p);
        ComboBox_SamplerC.addItem(p);
    }
    
    resolveComboBoxes();
    restoreArp();    
};


//Blackout

inline function loadBlackout()
{
        //Setting Images
    backgroundImage = ("{PROJECT_FOLDER}bg_blackout.jpg");
    Image_BG.setAlpha(1);
    Image_BG.set("fileName", backgroundImage);    
    
        //Setting Up Samplers
    clearSamplers();

    SamplerA.asSampler().loadSampleMap("{EXP::Blackout}Blackout_SampleMap");
    SamplerA.asSampler().enableRoundRobin(true); 
    
    SamplerA_Velocity.setBypassed(false);
    
        //Setting Key Colours
    colourKeysReset();
    colourKeysBlackout();
    colourKeysBlackoutPitch();
    Engine.setKeyColour(36, 0xFF64EFFF);
    
        //Other GUI Elements
    clearGUI();
    
    Panel_SamplerDisabledB.showControl(1);
    Panel_SamplerDisabledC.showControl(1);
    
    ComboBox_SamplerA.set("text", "Blackout");
    ComboBox_SamplerB.set("text", "unused");
    ComboBox_SamplerC.set("text", "unused");
    
    turnArpOn(); 
};

//Blackout 2 

inline function loadBlackout2()
{
        //Setting Images
    backgroundImage = ("{PROJECT_FOLDER}bg_blackout2.jpg");
    Image_BG.setAlpha(1);
    Image_BG.set("fileName", backgroundImage);   
    
        //Setting Up Samplers
    clearSamplers();

    SamplerA.asSampler().loadSampleMap("{EXP::Blackout2}Blackout2_SampleMap");
    SamplerA.asSampler().enableRoundRobin(true);
    
    SamplerA_Velocity.setBypassed(false);
    
        //Setting Key Colours
    colourKeysReset();
    colourKeysBlackout2();
    colourKeysBlackoutPitch();
    Engine.setKeyColour(36, 0xFF64EFFF);
    
        //Other GUI Elements
    clearGUI();
    
    Panel_SamplerDisabledB.showControl(1);
    Panel_SamplerDisabledC.showControl(1);
    
    ComboBox_SamplerA.set("text", "Blackout 2");
    ComboBox_SamplerB.set("text", "unused");
    ComboBox_SamplerC.set("text", "unused");
    
    turnArpOn();     
};

//Portal

inline function loadPortal()
{
        //Setting Images
    backgroundImage = ("{PROJECT_FOLDER}bg_portal.jpg");
    Image_BG.setAlpha(1);
    Image_BG.set("fileName", backgroundImage);  
    
        //Setting Up Samplers
    clearSamplers();   

    SamplerA.asSampler().loadSampleMap("{EXP::Portal}Portal_SampleMap");
    SamplerA.asSampler().enableRoundRobin(true); 
    
        //Setting Key Colours
    colourKeysReset();
    colourKeysPortal();
    colourKeysBlackoutPitch();
    Engine.setKeyColour(36, 0xFF64EFFF);
    
        //Other GUI Elements
    clearGUI();
    
    Panel_SamplerDisabledB.showControl(1);
    Panel_SamplerDisabledC.showControl(1);
    
    ComboBox_SamplerA.set("text", "Portal");
    ComboBox_SamplerB.set("text", "unused");
    ComboBox_SamplerC.set("text", "unused");
    
    Panel_PortalVelocity.set("visible", 1);
    turnArpOn();    
};

//Oracle

inline function loadOracle()
{
        //Setting BG Image       
    backgroundImage = ("{PROJECT_FOLDER}bg_oracle.jpg");
    Image_BG.setAlpha(1);
    Image_BG.set("fileName", backgroundImage); 
    
        //Setting Up Samplers
    clearSamplers();
    
    SamplerA.asSampler().loadSampleMap("{EXP::Oracle}Oracle_SampleMap");
    SamplerA.asSampler().enableRoundRobin(false);

    ComboBox_SamplerA.setValue(1);
    ComboBox_SamplerA.changed();
    
    SamplerA_Velocity.setBypassed(false);
    
        //Colour Keys
    colourKeysReset();   
    colourKeysOracle();
    
        //Other GUI Elements
    clearGUI();
    
    Panel_SamplerDisabledB.showControl(1);
    Panel_SamplerDisabledC.showControl(1);
    
    ComboBox_SamplerA.addItem("Bridge");
    ComboBox_SamplerA.addItem("Middle");
    ComboBox_SamplerA.addItem("Neck");

    restoreArp();    
};

//Aetheric

inline function loadAetheric()
{
        //Setting BG Image       
    backgroundImage = ("{PROJECT_FOLDER}bg_aetheric.jpg");
    Image_BG.setAlpha(1);
    Image_BG.set("fileName", backgroundImage);  
    
        //Setting Up Samplers
    clearSamplers(); 
    
    Sampler_Other.setAttribute(12, 0);  
    Sampler_Other.setBypassed(0);
    Sampler_Other.asSampler().loadSampleMap("{EXP::Aetheric}AethericAmbiances_SampleMap");

    SamplerA.asSampler().enableRoundRobin(false);
    SamplerB.asSampler().enableRoundRobin(false);
    SamplerC.asSampler().enableRoundRobin(false);
    
    SamplerA_Velocity.setBypassed(false);
    SamplerB_Velocity.setBypassed(false);
    SamplerC_Velocity.setBypassed(false);

        //Colour Keys
    colourKeysReset();   
    colourKeysAetheric();
    
        //Other GUI Elements
    clearGUI();
    
        //Populating ComboBox
    local populateCB = ["Angelic A",
                        "Angelic B",
                        "Angelic C",
                        "Croon A",
                        "Croon B",
                        "Croon C",
                        "Ephemeral A",
                        "Ephemeral B",
                        "Ephemeral C",
                        "Hybrid Strings A",
                        "Hybrid Strings B",
                        "Hybrid Strings C",
                        "Mockingbird A",
                        "Mockingbird B",
                        "Mockingbird C",
                        "Nexus A",
                        "Nexus B",
                        "Nexus C",
                        "Nimbus A",
                        "Nimbus B",
                        "Nimbus C",
                        "Oculus A",
                        "Oculus B",
                        "Oculus C",
                        "Silk A",
                        "Silk B",
                        "Silk C",
                        "Wisp A",
                        "Wisp B",
                        "Wisp C"
                    ];
                    
    for (p in populateCB)
    {
        ComboBox_SamplerA.addItem(p);
        ComboBox_SamplerB.addItem(p);
        ComboBox_SamplerC.addItem(p);
    }

    SamplerA.asSampler().loadSampleMap("{EXP::Aetheric}Aetheric_SampleMap" + Math.round(ComboBox_SamplerA.getValue()));
    SamplerB.asSampler().loadSampleMap("{EXP::Aetheric}Aetheric_SampleMap" + Math.round(ComboBox_SamplerB.getValue()));
    SamplerC.asSampler().loadSampleMap("{EXP::Aetheric}Aetheric_SampleMap" + Math.round(ComboBox_SamplerC.getValue()));
    
    resolveComboBoxes(); 
    restoreArp();    
};

//Machine Tribes

inline function loadMachineTribes()
{
        //Setting Images
    backgroundImage = ("{PROJECT_FOLDER}bg_machinetribes.jpg");
    Image_BG.setAlpha(1);
    Image_BG.set("fileName", backgroundImage);  
    
        //Setting Up Samplers
    clearSamplers();

    SamplerA.asSampler().loadSampleMap("{EXP::MachineTribes}MachineTribesMainLoops_SampleMap");
    SamplerA.asSampler().enableRoundRobin(true);
    
    SamplerB.asSampler().loadSampleMap("{EXP::MachineTribes}MachineTribesPercLoops_SampleMap");
    SamplerB.asSampler().enableRoundRobin(true);
    
    SamplerC.asSampler().loadSampleMap("{EXP::MachineTribes}MachineTribesGlitchLoops_SampleMap");
    SamplerC.asSampler().enableRoundRobin(true);
    
    SamplerA_Velocity.setBypassed(false);
    SamplerB_Velocity.setBypassed(false);
    SamplerC_Velocity.setBypassed(false);
    
        //Setting Key Colours
    colourKeysReset();
    colourKeysMachineTribes();
    
        //Other GUI Elements
    clearGUI();
    
    ComboBox_SamplerA.set("text", "Main Hits");
    ComboBox_SamplerB.set("text", "Perc Loops");
    ComboBox_SamplerC.set("text", "Glitch Loops");

    Slider_ArpSteps.setValue(32);
    Slider_ArpSteps.changed();  
    turnArpOn();  
};

//Achromic

inline function loadAchromic()
{
        //Setting BG Image       
    backgroundImage = ("{PROJECT_FOLDER}bg_achromic.jpg");
    Image_BG.setAlpha(1);
    Image_BG.set("fileName", backgroundImage);  
    
        //Setting Up Samplers
    clearSamplers();
    
    SamplerA.asSampler().loadSampleMap("{EXP::Achromic}Achromic_SampleMap");
    SamplerA.asSampler().enableRoundRobin(false);
    
    SamplerB.asSampler().loadSampleMap("{EXP::Achromic}Achromic_SampleMap");
    SamplerB.asSampler().enableRoundRobin(false);

    Button_SamplerABypass.setValue(1);
    Button_SamplerABypass.changed();
    
    Button_SamplerBBypass.setValue(1);
    Button_SamplerBBypass.changed();

        //Colour Keys
    colourKeysReset();
    colourKeysAchromic();    
        //Other GUI Elements
    clearGUI(); 
    
    Panel_SamplerDisabledC.showControl(1);
    
    Panel_AchromicSettings.set("visible", 1);
    
    ComboBox_SamplerA.set("text", "Guitar 1");
    ComboBox_SamplerB.set("text", "Guitar 2");
    ComboBox_SamplerC.set("text", "unused");
    
    for (a in achromicParameters)
        a.set("isPluginParameter", 1);

    AchromicGate.setBypassed(1-Button_AchromicNoiseGate.getValue());
    restoreArp();    
};

//PDQ Bass

inline function loadPDQBass()
{
        //Setting BG Image       
    backgroundImage = ("{PROJECT_FOLDER}bg_pdqbass.jpg");
    Image_BG.setAlpha(1);
    Image_BG.set("fileName", backgroundImage);  
    
        //Setting Up Samplers
    clearSamplers();
    
    if (Button_PDQBassProcessed.getValue())
        SamplerA.asSampler().loadSampleMap("{EXP::PDQBass}PDQBassPROC_SampleMap");
    else 
        SamplerA.asSampler().loadSampleMap("{EXP::PDQBass}PDQBass_SampleMap");  
        
    SamplerA.asSampler().enableRoundRobin(false);

        //Colour Keys
    colourKeysReset();
    colourKeysPDQBass();    
    
        //Other GUI Elements
    clearGUI(); 
    
    Panel_SamplerDisabledB.showControl(1);
    Panel_SamplerDisabledC.showControl(1);
    
    ComboBox_SamplerA.set("text", "PDQ Bass");
    ComboBox_SamplerB.set("text", "unused");
    ComboBox_SamplerC.set("text", "unused");
    
    Panel_PDQBassSettings.set("visible", 1);
    Button_PDQBassForceDownpick.set("isPluginParameter", 1);
    restoreArp();    
};

//Oracle 2 

inline function loadOracle2()
{
        //Setting BG Image           
    
    backgroundImage = ("{PROJECT_FOLDER}bg_oracle2.jpg");        
    Image_BG.setAlpha(1);
    Image_BG.set("fileName", backgroundImage);       
    
        //Setting Up Samplers
    clearSamplers();
    
    SamplerA.asSampler().loadSampleMap("{EXP::Oracle2}Oracle2_SampleMap");
    SamplerA.asSampler().enableRoundRobin(false);
    
    SamplerB.asSampler().loadSampleMap("{EXP::Oracle2}Oracle2_SampleMap");
    SamplerB.asSampler().enableRoundRobin(false);
    
    SamplerC.asSampler().loadSampleMap("{EXP::Oracle2}Oracle2_SampleMap");
    SamplerC.asSampler().enableRoundRobin(false);
    
    SamplerA_Velocity.setBypassed(false);
    SamplerB_Velocity.setBypassed(false);
    SamplerC_Velocity.setBypassed(false);

        //Colour Keys
    colourKeysReset();
    colourKeysOracle2();
    
        //Other GUI Elements
    clearGUI(); 
    
    //Populating ComboBox
    local populateCB = ["Pluck Sustain",
                        "Pluck Harmonics",
                        "Pluck Bass Sustain",
                        "Pluck Acoustic Sustain",
                        "Pluck Acoustic Harmonics",
                        "Pluck Resynthed A",
                        "Pluck Resynthed B",
                        "Pluck Resynthed C",
                        "Pluck Wobbly",
                        "Pad Sustain A",
                        "Pad Sustain B",
                        "Pad Sustain C",
                        "Pad Stretched A",
                        "Pad Stretched B",
                        "Pad Stretched Harmonics",
                        "Pad Textural A ",
                        "Pad Textural B",
                        "Pad Textural C"];
                        
    for (p in populateCB)
    {
        ComboBox_SamplerA.addItem(p);
        ComboBox_SamplerB.addItem(p);
        ComboBox_SamplerC.addItem(p);
    }
    
    resolveComboBoxes();
        
    restoreArp();    
};

//Gloom

inline function loadGloom()
{
    backgroundImage = ("{PROJECT_FOLDER}bg_gloom.jpg");
    Image_BG.setAlpha(1);
    Image_BG.set("fileName", backgroundImage);
    
        //Setting up Samplers
    clearSamplers();
    
    SamplerA.asSampler().loadSampleMap("{EXP::Gloom}Gloom_SampleMap");
    SamplerA.asSampler().enableRoundRobin(true);
    
        //Setting Key Colours
    colourKeysReset();
    colourKeysGloom();
    
        //Hiding othe GUI Elements
    clearGUI();
    
    Panel_GloomExtras.set("visible", 1);
    
    Panel_SamplerDisabledB.showControl(1);
    Panel_SamplerDisabledC.showControl(1);
    
    ComboBox_SamplerA.set("text", "Gloom");
    ComboBox_SamplerB.set("text", "unused");
    ComboBox_SamplerC.set("text", "unused");
    
    restoreArp();
};