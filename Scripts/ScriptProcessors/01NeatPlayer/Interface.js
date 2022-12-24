const var frontInterfaceWidth = 1000;
const var frontInterfaceHeight = 630;

Content.makeFrontInterface(frontInterfaceWidth, frontInterfaceHeight);

const var audiofiles = Engine.loadAudioFilesIntoPool();

audiofiles.sortNatural();

//Expansion Manifest Variable

var manifest;
const var pitchKeyValues = [-12, -11, -10, -9, -8, -7, -6, -5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

include("Init Layout.js");
include("updateNotificationButton.js");
include("libraryInstallation.js");
include("SampleSettings.js");
include("FXGUI.js");
include("ArpeggiatorScript.js");
include("MovementSettings.js");
include("ChaosEngine.js");
include("RandomizeEverything.js");
include("presetBrowser.js");
include("interfaceExtras.js");

include("OutputMeter.js");
include("CustomFunctions.js");
include("CustomExpansionLoading.js");
include("loadingBar.js");
include("InitializeModules.js");
include("librarySelect.js");

include("extrasOracle2.js");
include("extrasAchromic.js");
include("extrasPortal.js");
include("extrasCloudburstAcoustic.js");
include("extrasGloom.js");
include("PDQBass_Extras.js");
include("LookAndFeel.js");


//Push Panel Buttons

var panelButtons = [];


inline function closePanels(keepOpen)
{
    switch (keepOpen)
    {
        case "none": 
            panelButtons = [Button_CustomSettings, Button_AddLibrary, Button_OpenPresetBrowser, Button_OpenExpansions, Button_SampleDisplay, Button_FXDisplay, Button_ArpDisplay, Button_MoveDisplay];
        break;

        case Button_CustomSettings:
            panelButtons = [Button_AddLibrary, Button_OpenPresetBrowser, Button_OpenExpansions, Button_SampleDisplay, Button_FXDisplay, Button_ArpDisplay, Button_MoveDisplay];
        break;

        case Button_AddLibrary:
            panelButtons = [Button_CustomSettings, Button_OpenPresetBrowser, Button_OpenExpansions, Button_SampleDisplay, Button_FXDisplay, Button_ArpDisplay, Button_MoveDisplay];
        break;

        case Button_OpenPresetBrowser:
            panelButtons = [Button_CustomSettings, Button_AddLibrary, Button_OpenExpansions, Button_SampleDisplay, Button_FXDisplay, Button_ArpDisplay, Button_MoveDisplay];
        break;

        case Button_OpenExpansions:
            panelButtons = [Button_CustomSettings, Button_AddLibrary, Button_OpenPresetBrowser, Button_SampleDisplay, Button_FXDisplay, Button_ArpDisplay, Button_MoveDisplay];
        break;

        case Button_SampleDisplay:
            panelButtons = [Button_CustomSettings, Button_AddLibrary, Button_OpenPresetBrowser, Button_OpenExpansions, Button_FXDisplay, Button_ArpDisplay, Button_MoveDisplay];
        break;

        case Button_FXDisplay:
            panelButtons = [Button_CustomSettings, Button_AddLibrary, Button_OpenPresetBrowser, Button_OpenExpansions, Button_SampleDisplay, Button_ArpDisplay, Button_MoveDisplay];
        break;

        case Button_ArpDisplay:
            panelButtons = [Button_CustomSettings, Button_AddLibrary, Button_OpenPresetBrowser, Button_OpenExpansions, Button_SampleDisplay, Button_FXDisplay, Button_MoveDisplay];
        break;

        case Button_MoveDisplay:
            panelButtons = [Button_CustomSettings, Button_AddLibrary, Button_OpenPresetBrowser, Button_OpenExpansions, Button_SampleDisplay, Button_FXDisplay, Button_ArpDisplay];
        break;                                                     
    }

    for (p in panelButtons)
    {
        p.setValue(0);
        p.changed();
    }
}

Engine.setFrontendMacros(["X Pos", "X Neg", "Y Pos", "Y Neg", "Env A", "Env B", "Velocity", "Random"]);

colourKeysReset();

const var syncTimes = ["1/1", "1/2D", "1/2", "1/2T", "1/4D", "1/4", "1/4T", "1/8D", "1/8", "1/8T", "1/16D", "1/16", "1/16T", "1/32D", "1/32", "1/32T", "1/64D", "1/64", "1/64T"];

//Install Single

var installDirectory = expansionDirectory;

//Open AppData Button

inline function onButton_OpenAppDataControl(component, value)
{
	if (value)
	    FileSystem.getFolder(FileSystem.AppData).show();
};

Content.getComponent("Button_OpenAppData").setControlCallback(onButton_OpenAppDataControl);

//Initialize GUI.

//Load expansions

var manifest;

//NoteOn Variables

var currentRR = 1;
var previousRR;
var isUpPick = 0;
var forceDownPick = 0;
var pickAttack = 0;

var numVelocityBasedArticulations = 8;
var velocityBasedArticulations = [1, 20, 21, 52, 53, 114, 115, 127, 999, 999, 999, 999, 999, 999, 999, 999]; //999s are for future proofing
var alternatePickingVelocityRange = [1, 127];

var writingArpVelocity;
var randomNoiseActive;
var randomReleaseNoiseActive;
var pianoReleaseNoiseActive;

// Expansion Loading

function expCallback()
{ 
    currentExpansion = expHandler.getCurrentExpansion();
    manifest = currentExpansion.loadDataFile("manifest.json");
    currentExpansion = currentExpansion.getProperties();
    currentExpansion = currentExpansion.Name;
    Console.print("Current Expansion: " + currentExpansion);

    loadExpansionFromManifest();

    expHandler.getCurrentExpansion().setAllowDuplicateSamples(1-Button_ExclusiveReverse.getValue());
}

expHandler.setExpansionCallback(expCallback);


//Extra Init Calls

//Kill Notes on Transport Stop


const var th = Engine.createTransportHandler();

inline function onStop(isPlaying)
{
    if(!isPlaying)
        Engine.allNotesOff();

    if (manifest.isLoopInstrument)
    {
        SamplerA.asSampler().enableRoundRobin(false);
        SamplerA.asSampler().setActiveGroup(1);
        if (manifest.sampleMapB != null)
        {
            SamplerB.asSampler().enableRoundRobin(false);
            SamplerB.asSampler().setActiveGroup(1);
        }
        if (manifest.sampleMapC != null)
        {
            SamplerC.asSampler().enableRoundRobin(false);
            SamplerC.asSampler().setActiveGroup(1);
        }
    }
};

th.setOnTransportChange(true, onStop);

//clearEverything();





function onNoteOn()
{
    local e = Message.getNoteNumber();
    local v = Message.getVelocity();

    Console.print("Note: " + e + " Velocity: " + v);

    //Portamento Stuff
    
    if (Button_PortamentoBypass.getValue())
        {
            if (lastNote == -1)
            {
                lastNote = e;
                eventId = Message.makeArtificial();
            }
            else
            {
                if (Slider_PortamentoTime.getValue() > 0 && eventId != -1)
                {
                    Message.ignoreEvent(true);
                    Synth.addPitchFade(eventId, Slider_PortamentoTime.getValue(), lastTuning + e - lastNote, 0);
                    lastTuning = lastTuning + e - lastNote;
                }
                else 
                {
                    if (eventId != -1)
                        Synth.noteOffByEventId(eventId);
                        
                    eventId = Message.makeArtificial();
                }
                retrigger = lastNote;
                lastNote = e;
            }
        }

    //Loop Based Libraries

    if (manifest.usesPitchKeys)
        if (e >= 24 && e <= 48)
        {
            colourPitchKeys();
            Engine.setKeyColour(e, Colours.withAlpha(Colours.deepskyblue, 0.5));            
            samplerLoopPitch(pitchKeyValues[e-24]);
            Message.ignoreEvent(e);
        }

    if (manifest.isLoopInstrument && manifest.canWriteArpVelocity)
        if (writingArpVelocity && e >= manifest.blueKeyRange[0] && e <= manifest.yellowKeyRange[1]) // Between all playable keys
        {
            local notes = Slider_ArpSteps.getValue();
            for (i=0; i<Slider_ArpSteps.getValue(); i++)
            {
                SliderPack_ArpVelocity.setAllValues(v);
                SliderPack_ArpVelocity.changed();
            }
        }

    //ComboBox Based Libraries

    if (manifest.usesComboBoxItems && currentExpansion != "Aetheric") // Aetheric & Bloom have split samplemaps.
    {
        SamplerA.asSampler().setActiveGroup(ComboBox_SamplerA.getValue());
        if (manifest.sampleMapB != null)
            SamplerB.asSampler().setActiveGroup(ComboBox_SamplerB.getValue());
        if (manifest.sampleMapC != null)
            SamplerC.asSampler().setActiveGroup(ComboBox_SamplerC.getValue());
    }

    //Loop + One Shot Libraries (Machine Tribes)
    //Always use Yellow Keys for One Shots!

    if (manifest.isLoopInstrument && manifest.usesLoopsAndOneShots)
    {
        if (e >= manifest.yellowKeyRange[0] && e <= manifest.yellowKeyRange[1])
        {
            local currentRR = Arpeggiator1.getAttribute(Arpeggiator1.CurrentValue);  
            SamplerA.asSampler().enableRoundRobin(false);
            SamplerA.asSampler().setActiveGroup(1);
            Message.ignoreEvent(e);
            Synth.playNote(e, v); 
        }
    }
    
    //Random Noise Chance

    if (manifest.usesRandomNoise)
    {
        if (e >= manifest.randomNoiseKeys[0] && e <= manifest.randomNoiseKeys[1])
            Message.ignoreEvent(true);
        if (e >= manifest.keyRange[0] && e <= manifest.keyRange[1])
        {
            local randomNoise = Math.random() * randomNoiseActive;
            if (randomNoise <= manifest.randomNoiseChance)
            {
                if (randomNoiseCounter >= 8)
                {
                    Message.ignoreEvent(true);
                    Synth.playNote(Math.randInt(manifest.randomNoiseKeys[0], manifest.randomNoiseKeys[1]), v);
                    randomNoiseCounter = 0;
                }
                else
                    randomNoiseCounter += 1;                
            }
        }
    }

    //Velocity-Based Articulation Switches

    if (manifest.usesVelocityBasedArticulationSwitching)
    {
        if (v >= velocityBasedArticulations[0] && v <= velocityBasedArticulations[1]) //Velocity Range 01
            Message.setVelocity(manifest.velocityBasedArticulationRanges[0]);
        if (v >= velocityBasedArticulations[2] && v <= velocityBasedArticulations[3]) //Velocity Range 02
            Message.setVelocity(manifest.velocityBasedArticulationRanges[1]);
        if (v >= velocityBasedArticulations[4] && v <= velocityBasedArticulations[5]) //Velocity Range 03
            Message.setVelocity(manifest.velocityBasedArticulationRanges[2]);
        if (v >= velocityBasedArticulations[6] && v <= velocityBasedArticulations[7]) //Velocity Range 04
            Message.setVelocity(manifest.velocityBasedArticulationRanges[3]);
        if (v >= velocityBasedArticulations[8] && v <= velocityBasedArticulations[9]) //Velocity Range 05
            Message.setVelocity(manifest.velocityBasedArticulationRanges[4]);
        if (v >= velocityBasedArticulations[10] && v <= velocityBasedArticulations[11]) //Velocity Range 06
            Message.setVelocity(manifest.velocityBasedArticulationRanges[5]);
        if (v >= velocityBasedArticulations[12] && v <= velocityBasedArticulations[13]) //Velocity Range 07
            Message.setVelocity(manifest.velocityBasedArticulationRanges[6]);
        if (v >= velocityBasedArticulations[14] && v <= velocityBasedArticulations[15]) //Velocity Range 08
            Message.setVelocity(manifest.velocityBasedArticulationRanges[7]);
    }


    //Guitar-Based Libraries

    if (manifest.isGuitarLibrary)
    {
        if (e >= manifest._guitarHiddenNoteRange[0] && e <= manifest._guitarHiddenNoteRange[1]) //Ignore These Notes if Played
            Message.ignoreEvent(true);

        if (e == manifest._guitarResetRR) // Reset RR
            currentRR = 1;

        if (e == manifest._guitarTightMute) // Tight Mute
        {
            Message.ignoreEvent(true);
            previousRR = currentRR;
            while (previousRR == currentRR)
                currentRR = Math.randInt(1, manifest.numCustomRoundRobins);
            if (!isUpPick)
            {
                SamplerA.asSampler().setActiveGroup(currentRR);
                if (manifest._guitarIsStereo)
                    SamplerB.asSampler().setActiveGroup(previousRR);
                isUpPick = 1 - forceDownPick;
            }
            else
            {
                SamplerA.asSampler().setActiveGroup(currentRR + manifest.numCustomRoundRobins);
                if (manifest._guitarIsStereo)
                    SamplerB.asSampler().setActiveGroup(previousRR + manifest.numCustomRoundRobins);
                isUpPick = 0;
            }
            Synth.playNote(manifest._guitarPickAttackKey, v);
        }



        if (e >= manifest.keyRange[0] && e <= manifest.keyRange[1] ) //Non-Repeating RR
        {            
            if (!Button_ArpBypass.getValue())
            {                
                if (v >= alternatePickingVelocityRange[0] && v <= alternatePickingVelocityRange[1])
                {
                    previousRR = currentRR;
                    while (currentRR == previousRR)
                        currentRR = Math.randInt(1, manifest.numCustomRoundRobins);

                    if (!isUpPick)
                            {
                                if (manifest.isBassLibrary && v >= velocityBasedArticulations[4] && v <= velocityBasedArticulations[5]) //Bass Library Fix
                                    Message.setVelocity(100);
                                SamplerA.asSampler().setActiveGroup(currentRR);
                                if (manifest._guitarIsStereo)
                                    SamplerB.asSampler().setActiveGroup(previousRR);
                                isUpPick = 1 - forceDownPick;
                            }
                        else
                            {
                                if (manifest.isBassLibrary && v >= velocityBasedArticulations[4] && v <= velocityBasedArticulations[5]) //Bass Library Fix
                                {
                                    Message.setVelocity(60);
                                    SamplerA.asSampler().setActiveGroup(currentRR);
                                }
                                else 
                                    SamplerA.asSampler().setActiveGroup(currentRR + manifest.numCustomRoundRobins);
                                
                                if (manifest._guitarIsStereo)
                                    SamplerB.asSampler().setActiveGroup(previousRR + manifest.numCustomRoundRobins);
                                isUpPick = 0;
                            }     
                        }
                        if (pickAttack && !manifest.isBassLibrary) //Need to swap this for a global variable.
                            Synth.playNote(manifest._guitarPickAttackKey, v); //Trigger Pick Attack  
                }
            }
        }

        if (e >= manifest._guitarFXKeysRange[0] && e <= manifest._guitarFXKeysRange[1]) // Assorted FX Keys
        {
            SamplerA.asSampler().setActiveGroup(1);
            if (manifest._guitarIsStereo)
                SamplerB.asSampler().setActiveGroup(2);
        }

        if (e >= manifest._guitarAltDeadNotes[0] && e <= manifest._guitarAltDeadNotes[1])
            if (!Button_ArpBypass.getValue())
                {   
                    previousRR = currentRR;
                    while (previousRR == currentRR)
                        currentRR = Math.randInt(1, manifest.numCustomRoundRobins);                    
                    if (!isUpPick)
                    {
                        SamplerA.asSampler().setActiveGroup(currentRR);
                        if (manifest._guitarIsStereo)
                            SamplerB.asSampler().setActiveGroup(previousRR);
                        isUpPick = 1 - forceDownPick;
                    }
                    else
                    {
                        SamplerA.asSampler().setActiveGroup(currentRR + 6);
                        if (manifest._guitarIsStereo)
                            SamplerB.asSampler().setActiveGroup(previousRR + 6);
                        isUpPick = 0;
                    }     
                }
    }


    
    //Nested switch statement to select expansion, then select specific note played.

    /*
	switch (currentExpansion)
    {
        
        if (e >= 60 && e <= 98 && portalArpIgnoreVelocity == 1)
        {
            local notes = Slider_ArpSteps.getValue();
            for (i = 0; i < notes; i++)
            {
                SliderPack_ArpVelocity.setAllValues(v);
                SliderPack_ArpVelocity.changed();
            }
        }
        SamplerA.asSampler().enableRoundRobin(true);
	    break;   
	    
	    case "MachineTribes":
	    SamplerA.asSampler().enableRoundRobin(true);
	    SamplerB.asSampler().enableRoundRobin(true);
	    SamplerC.asSampler().enableRoundRobin(true);
	    if (e >= 84 && e <= 120)
        {
            local currentRR = Arpeggiator1.getAttribute(Arpeggiator1.CurrentValue);	 
            SamplerA.asSampler().enableRoundRobin(false);
            SamplerA.asSampler().setActiveGroup(1);
            Message.ignoreEvent(e);
            Synth.playNote(e, v); 
        }
	    break;
        
        case "CloudburstAcoustic":
            SamplerA.asSampler().enableRoundRobin(true);
            SamplerB.asSampler().enableRoundRobin(true);
            if (e > 0 && e <= 15)
            {
                Message.ignoreEvent(e);
            }
        
            else if (e >= 60 && e <= 96)
            {
                local randomNoise = Math.random() * cloudburstAcousticNoises;
                if (randomNoise > 0.95)
                {
                    local vel = Message.getVelocity();
                    local playedNote = Math.randInt(1, 2);
                    Message.ignoreEvent(e);
                    Synth.playNote(playedNote, vel);
                }
            }
        break;

        case "Cloudburst":
            SamplerA.asSampler().enableRoundRobin(true);            
        break;
        
        case "Aetheric":
            disableRoundRobin();
        break;
        
        case "Atlas":
            disableRoundRobin();
            SamplerA.asSampler().setActiveGroup(ComboBox_SamplerA.getValue());
            SamplerB.asSampler().setActiveGroup(ComboBox_SamplerB.getValue());
            SamplerC.asSampler().setActiveGroup(ComboBox_SamplerC.getValue());
        break;
        
        case "Oracle":
            disableRoundRobin();
            SamplerA.asSampler().setActiveGroup(ComboBox_SamplerA.getValue());
            if(e >= manifest.keyRange[0] && e <= manifest.keyRange[1])
            {
                Engine.setKeyColour(e, Colours.withAlpha(Colours.black, 0.10));
            }
        break;
        
        case "Found Keys":
            disableRoundRobin();
            SamplerA.asSampler().setActiveGroup(ComboBox_SamplerA.getValue());
            SamplerB.asSampler().setActiveGroup(ComboBox_SamplerB.getValue());
            SamplerC.asSampler().setActiveGroup(ComboBox_SamplerC.getValue());
        break;
        
        case "Prismatic":
            disableRoundRobin();
            SamplerA.asSampler().setActiveGroup(ComboBox_SamplerA.getValue());
            SamplerB.asSampler().setActiveGroup(ComboBox_SamplerB.getValue());
            SamplerC.asSampler().setActiveGroup(ComboBox_SamplerC.getValue());
        break;
        
        case "Endure":
            disableRoundRobin();
            SamplerA.asSampler().setActiveGroup(ComboBox_SamplerA.getValue());
            SamplerB.asSampler().setActiveGroup(ComboBox_SamplerB.getValue());
            SamplerC.asSampler().setActiveGroup(ComboBox_SamplerC.getValue());
        break;
        
        case "Achromic":
            if (e < 2)
                Message.ignoreEvent(true); //ignoring pick attack and release
            
            else if (e == 36) //Reset RR
            {
                Engine.setKeyColour(e, 0xFFA74FC3);
                achromicCurrentRR = 1;
            }
        
            else if (e == 38) //Tight mute
            {
                Engine.setKeyColour(e, 0xFFB9C32E);
                Message.ignoreEvent(e);
                if (!achromicIsUppick)
                            {
                                achromicPreviousRR = achromicCurrentRR;
                                while (achromicCurrentRR == achromicPreviousRR)
                                    {
                                        achromicCurrentRR = Math.randInt(1, 6);
                                    }
                                SamplerA.asSampler().setActiveGroup(achromicPreviousRR);
                                SamplerB.asSampler().setActiveGroup(achromicCurrentRR);
                                achromicIsUppick = 1 - achromicForceDownpick;
                            }
                        else
                            {
                                achromicPreviousRR = achromicCurrentRR;
                                while (achromicCurrentRR == achromicPreviousRR)
                                    {
                                        achromicCurrentRR = Math.randInt(1, 6);
                                    }
                                SamplerA.asSampler().setActiveGroup(achromicPreviousRR + 6);
                                SamplerB.asSampler().setActiveGroup(achromicCurrentRR + 6);
                                achromicIsUppick = 0;
                            }     
                Synth.playNote(0, v);
            }
            
            else if (e >= 41 && e <= 98) //non-repeating RR
                {
                    if (!Button_ArpBypass.getValue())
                        {
                        if (!achromicIsUppick)
                            {
                                achromicPreviousRR = achromicCurrentRR;
                                while (achromicCurrentRR == achromicPreviousRR)
                                    {
                                        achromicCurrentRR = Math.randInt(1, 6);
                                    }
                                SamplerA.asSampler().setActiveGroup(achromicPreviousRR);
                                SamplerB.asSampler().setActiveGroup(achromicCurrentRR);
                                achromicIsUppick = 1 - achromicForceDownpick;
                            }
                        else
                            {
                                achromicPreviousRR = achromicCurrentRR;
                                while (achromicCurrentRR == achromicPreviousRR)
                                    {
                                        achromicCurrentRR = Math.randInt(1, 6);
                                    }
                                SamplerA.asSampler().setActiveGroup(achromicPreviousRR + 6);
                                SamplerB.asSampler().setActiveGroup(achromicCurrentRR + 6);
                                achromicIsUppick = 0;
                            }     
                        }
                        if (achromicPickAttack)
                            Synth.playNote(0, v); //Trigger Pick Attack     
                }
            else if (e > 107 && e < 117)
            {
                SamplerA.asSampler().setActiveGroup(1);
                SamplerB.asSampler().setActiveGroup(2);
                if (achromicFXKeysWhite.contains(e))
                    Engine.setKeyColour(e, 0xFF5DC03C);
                else
                    Engine.setKeyColour(e, 0xFF214C12);
            }
            else if (e == 117)
            {
                Engine.setKeyColour(e, 0xFF5DC03C);
                if (!Button_ArpBypass.getValue())
                        {
                        if (!achromicIsUppick)
                            {
                                achromicPreviousRR = achromicCurrentRR;
                                while (achromicCurrentRR == achromicPreviousRR)
                                    {
                                        achromicCurrentRR = Math.randInt(1, 6);
                                    }
                                SamplerA.asSampler().setActiveGroup(achromicPreviousRR);
                                SamplerB.asSampler().setActiveGroup(achromicCurrentRR);
                                achromicIsUppick = 1 - achromicForceDownpick;
                            }
                        else
                            {
                                achromicPreviousRR = achromicCurrentRR;
                                while (achromicCurrentRR == achromicPreviousRR)
                                    {
                                        achromicCurrentRR = Math.randInt(1, 6);
                                    }
                                SamplerA.asSampler().setActiveGroup(achromicPreviousRR + 6);
                                SamplerB.asSampler().setActiveGroup(achromicCurrentRR + 6);
                                achromicIsUppick = 0;
                            }     
                }
            }
        break;
        
        case "PDQBass":
        
        //Velocity Control
        
        if (v < Slider_PDQBassVelocityMin.getValue())
        {
            v = Slider_PDQBassVelocityMin.getValue();
            Message.setVelocity(Slider_PDQBassVelocityMin.getValue());
        }
            
        if (v > Slider_PDQBassVelocityMax.getValue())
        {
            v = Slider_PDQBassVelocityMax.getValue();
            Message.setVelocity(Slider_PDQBassVelocityMax.getValue());
        }
            
        
        if (e >= 41 && e <= 97) //playable range
            {
                if (!Button_ArpBypass.getValue())
                    {
                        if (v > Slider_PDQBassPMVelMin.getValue() && v < Slider_PDQBassPMVelMax.getValue()) // Palm Mute
                            {
                                if (!PDQBassIsUppick)
                                {
                                    PDQBassPreviousRR = PDQBassCurrentRR;
                                    while (PDQBassCurrentRR == PDQBassPreviousRR)
                                    {
                                        PDQBassCurrentRR = Math.randInt(1, 6);
                                    }
                                    Message.setVelocity(20);
                                    SamplerA.asSampler().setActiveGroup(PDQBassCurrentRR);
                                    PDQBassIsUppick = 1 - PDQBassForceDownpick;
                                }
                                else
                                {
                                    PDQBassPreviousRR = PDQBassCurrentRR;
                                    while (PDQBassCurrentRR == PDQBassPreviousRR)
                                    {
                                        PDQBassCurrentRR = Math.randInt(1, 6);
                                    }
                                    Message.setVelocity(10);
                                    SamplerA.asSampler().setActiveGroup(PDQBassCurrentRR);
                                    PDQBassIsUppick = 1 - PDQBassForceDownpick;
                                }
                            }
                        else if (v > Slider_PDQBassFVelMin.getValue() && v < Slider_PDQBassFVelMax.getValue()) // Finger
                            {
                                PDQBassPreviousRR = PDQBassCurrentRR;
                                while (PDQBassCurrentRR == PDQBassPreviousRR)
                                {
                                    PDQBassCurrentRR = Math.randInt(1, 6);
                                }
                                Message.setVelocity(52);
                                SamplerA.asSampler().setActiveGroup(PDQBassCurrentRR);
                            }     
                       else if (v > Slider_PDQBassAPVelMin.getValue() && v < Slider_PDQBassAPVelMax.getValue()) // Alt Picking
                            {
                                if (!PDQBassIsUppick)
                                {
                                    PDQBassPreviousRR = PDQBassCurrentRR;
                                    while (PDQBassCurrentRR == PDQBassPreviousRR)
                                    {
                                        PDQBassCurrentRR = Math.randInt(1, 6);
                                    }
                                    Message.setVelocity(80);
                                    SamplerA.asSampler().setActiveGroup(PDQBassCurrentRR);
                                    PDQBassIsUppick = 1 - PDQBassForceDownpick;
                                }
                                else
                                {
                                    PDQBassPreviousRR = PDQBassCurrentRR;
                                    while (PDQBassCurrentRR == PDQBassPreviousRR)
                                    {
                                        PDQBassCurrentRR = Math.randInt(1, 6);
                                    }
                                    Message.setVelocity(114);
                                    SamplerA.asSampler().setActiveGroup(PDQBassCurrentRR);
                                    PDQBassIsUppick = 1 - PDQBassForceDownpick;
                                }
                            }
                        else if (v > Slider_PDQBassSLVelMin.getValue() && v < Slider_PDQBassSLVelMax.getValue()) // Slap
                        {
                            PDQBassPreviousRR = PDQBassCurrentRR;
                                while (PDQBassCurrentRR == PDQBassPreviousRR)
                                {
                                    PDQBassCurrentRR = Math.randInt(1, 6);
                                }
                                Message.setVelocity(127);
                                SamplerA.asSampler().setActiveGroup(PDQBassCurrentRR);
                        }
                    }
            }
        break;
        
        case "Oracle2":
            disableRoundRobin();
            SamplerA.asSampler().setActiveGroup(ComboBox_SamplerA.getValue());
            SamplerB.asSampler().setActiveGroup(ComboBox_SamplerB.getValue());
            SamplerC.asSampler().setActiveGroup(ComboBox_SamplerC.getValue());
        break;
        
        case "Gloom":
            SamplerA.asSampler().enableRoundRobin(true);
            if (e > 0 && e <= 5)
                Message.ignoreEvent(e);
            
            //chair creaking.
            else if (e >= 36 && e <= 120) 
            {
                local randomNoise = Math.random() * Button_GloomChairCreakNoise.getValue();
                if (randomNoise > .55)
                {
                    if (randomNoiseCounter >= 8)
                    {
                        local vel = Message.getVelocity();
                        local playedNote = Math.randInt(0, 2);
                        Synth.playNote(playedNote, vel);
                        randomNoiseCounter = 0;
                    }
                    else
                        randomNoiseCounter += 1;
                }
            }
        break;
        
        
        default:
    }*/

//} Might not need this scope.

  function onNoteOff()
{
    local e = Message.getNoteNumber();    
    local v = Message.getVelocity();
    local num = Synth.getNumPressedKeys();   
    local activeGroup;
    
    //Portamento Stuff
    
    if (Button_PortamentoBypass.getValue())
    {
        Message.ignoreEvent(true);
        
        if (eventId != -1 && e == lastNote)
        {
            if (Synth.isKeyDown(retrigger))
            {
                Synth.addPitchFade(eventId, Slider_PortamentoTime.getValue(), 0, 0);
                lastTuning = 0;
                lastNote = retrigger;
                retrigger = -1;
            }
            else 
            {
                Synth.noteOffByEventId(eventId);
                eventId = -1;
            }
        }
        
        if (!Synth.getNumPressedKeys())
        {
            lastNote = -1;
            lastTuning = 0; 
        }
    }
    else if (eventId != -1 && eventId != undefined)
    {
        Synth.noteOffByEventId(eventId);
        eventId = -1;
        lastNote = -1;
        lastTuning = 0;
    }

    //Reset Key Colours

    if (e >= manifest.keyRange[0] && e <= manifest.keyRange[1])
        Engine.setKeyColour(e, Colours.withAlpha(Colours.black, 0.0));

    //Loop Based

    if (manifest.isLoopInstrument)
        if (e >= 24 & e <= 48)
        {
                Message.ignoreEvent(e);
                activeGroup = SamplerA.asSampler().getActiveRRGroup();
                SamplerA.asSampler().enableRoundRobin(false);
                SamplerA.asSampler().setActiveGroup(activeGroup);
                SamplerA.asSampler().enableRoundRobin(true);
        }
            else
        {
            if (num > 1)
            {
                SamplerA.asSampler().enableRoundRobin(false);
                SamplerA.asSampler().setActiveGroup(SamplerA.asSampler().getActiveRRGroup());
                SamplerA.asSampler().enableRoundRobin(true);          
            }
            else
            {
                SamplerA.asSampler().enableRoundRobin(false);
                SamplerA.asSampler().setActiveGroup(0);
                SamplerA.asSampler().enableRoundRobin(true);  
            }
        }    

    if (manifest.isLoopInstrument && manifest.usesLoopsAndOneShots)    
        if (num < 1)
        {
            SamplerA.asSampler().enableRoundRobin(false);
            SamplerA.asSampler().setActiveGroup(0);
            SamplerB.asSampler().enableRoundRobin(false);
            SamplerB.asSampler().setActiveGroup(0);
            SamplerC.asSampler().enableRoundRobin(false);
            SamplerC.asSampler().setActiveGroup(0);   
            SamplerA.asSampler().enableRoundRobin(true);
            SamplerB.asSampler().enableRoundRobin(true);
            SamplerC.asSampler().enableRoundRobin(true);
        }
            else 
        {                      
            local currentRR1 = SamplerA.asSampler().getActiveRRGroup();
            local currentRR2 = SamplerB.asSampler().getActiveRRGroup();
            local currentRR3 = SamplerC.asSampler().getActiveRRGroup();
            SamplerA.asSampler().enableRoundRobin(false);
            SamplerB.asSampler().enableRoundRobin(false);
            SamplerC.asSampler().enableRoundRobin(false);            
            SamplerA.asSampler().setActiveGroup(currentRR1);
            SamplerB.asSampler().setActiveGroup(currentRR2);
            SamplerC.asSampler().setActiveGroup(currentRR3);
            SamplerA.asSampler().enableRoundRobin(true);
            SamplerB.asSampler().enableRoundRobin(true);
            SamplerC.asSampler().enableRoundRobin(true);   
        }

    // Piano Release Noises
    if (manifest.usesPianoReleaseNoise)
    {
        if (e >= manifest.keyRange[0] && e <= manifest.keyRange[1])
        {
            if (num == 1)
                Synth.playNote(Math.randInt(manifest.pianoReleaseNoiseKeys[0], manifest.pianoReleaseNoiseKeys[1]), Math.randInt(64, 127));
        }
    }

    //Random Release Noises
    if (manifest.usesRandomReleaseNoise)
        if (e >= manifest.keyRange[0] && e <= manifest.keyRange[1])
        {
            local randomReleaseNoise = Math.random() * randomReleaseNoiseActive;
            if (randomReleaseNoise <= manifest.randomReleaseNoiseChance)
                Synth.playNote(Math.randInt(manifest.randomReleaseNoiseKeys[0], manifest.randomReleaseNoiseKeys[1]), Math.randInt(1, 127));
        }   
    
}

  function onController()
{
    local val = Message.getControllerValue() / 127;
    
    switch (Message.getControllerNumber())
    {
        case 64:
            
            if (Button_ArpBypass.getValue() == 1)
            {
                Button_ArpSustain.setValue(val);
                Button_ArpSustain.changed();
                Message.ignoreEvent(1);
            }
            else
            {
                Message.ignoreEvent(1);
                Synth.sendController(64, val * 127);
            }
        break;
        
        default:
    }
    

}
  function onTimer()
{
	
}
 function onControl(number, value)
{
	
}
 