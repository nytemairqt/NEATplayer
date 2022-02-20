Content.makeFrontInterface(600, 370);

include("LookAndFeel.js");
include("CustomFunctions.js");
include("ArpeggiatorScript.js");
include("CustomExpansionLoading.js");
include("SampleSettings.js");
include("MovementSettings.js");
include("FXGUI.js");
//include("Custom_ADSR.js");
include("loadingBar.js");
include("InitializeModules.js");
//include("ComboBoxes.js");
include("OutputMeter.js");
include("RandomizeEverything.js");
include("extrasOracle2.js");
include("extrasAchromic.js");
include("extrasPortal.js");
include("extrasCloudburstAcoustic.js");
include("extrasGloom.js");
include("PDQBass_Extras.js");
include("ChaosEngine.js");

Engine.setFrontendMacros(["X Pos", "X Neg", "Y Pos", "Y Neg", "Env A", "Env B", "Velocity", "Random"]);

colourKeysReset();
const var audiofiles = Engine.loadAudioFilesIntoPool();

audiofiles.sortNatural();

const var syncTimes = ["1/1", "1/2D", "1/2", "1/2T", "1/4D", "1/4", "1/4T", "1/8D", "1/8", "1/8T", "1/16D", "1/16", "1/16T", "1/32D", "1/32", "1/32T", "1/64D", "1/64", "1/64T"];

//Initialize Expansions.

const var Button_SetSamplesFolder = Content.getComponent("Button_SetSamplesFolder");
const var Button_InstallLibrary = Content.getComponent("Button_InstallLibrary");
const var Button_CloseSetFolder = Content.getComponent("Button_CloseSetFolder");
const var Panel_CustomSettings = Content.getComponent("Panel_CustomSettings");


//Expansion shit

var currentExpansion; 

const var expansionNames = [];

expansionNames.push("No Expansion");

for (e in expHandler.getExpansionList())
    expansionNames.push(e.getProperties().Name);

const var expButton = [];

const var expButtonHeight = 55;
Panel_ExpansionsItemHolder.set("height", 20);
Panel_ExpansionsItemHolder.setPosition(0, 3, 186, 20);

const var expPanelTitle = Panel_ExpansionsItemHolder.addChildPanel();
expPanelTitle.setPosition(0, 0, Panel_ExpansionsItemHolder.getWidth(), 20);
expPanelTitle.setPaintRoutine(function(g)
{
    g.fillAll(0x1B1B1B);
    g.setFont("Arial", 12.0);
    g.setColour(Colours.white);
    g.drawAlignedText("- Libraries -", [0 , 0, Panel_ExpansionsItemHolder.getWidth(), 20], "centred");
});
    
for (i=1; i<expansionNames.length; i++)
{
    Panel_ExpansionsItemHolder.set("height", 20 + expansionNames.length * expButtonHeight - 55);
    expButton[i] = Panel_ExpansionsItemHolder.addChildPanel();
    expButton[i].setPosition(0, 20 + i * expButtonHeight - 55, Panel_ExpansionsItemHolder.getWidth(), expButtonHeight);
    expButton[i].loadImage("{PROJECT_FOLDER}" + expansionNames[i] + "_button_base.png", "panel_" + expansionNames[i]); 
    expButton[i].data.imagefile = "panel_" + expansionNames[i]; 
    expButton[i].data.expansionName = expansionNames[i];
    expButton[i].set("allowCallbacks", "Clicks & Hover");
    expButton[i].setPaintRoutine(function(g) 
    {
        g.drawImage(this.data.imagefile, [2, 1, 185, 55], 0, 0); 
    });
    
    expButton[i].setLoadingCallback(function(isPreloading)
    {
        if(isPreloading)
        {       
            this.data.preload = true;
        }
        else
        {       
            this.data.preload = false;
        }
    });      
    
    expButton[i].setMouseCallback(function(event)
    {
        if (event.clicked)
        {
            //Here we add the safety check.
            
            if (this.data.preload == false)
            {
                expHandler.setCurrentExpansion(this.data.expansionName);   
                load+this.data.expansionName;
                this.setPaintRoutine(function(g) 
                {
                    g.drawImage(this.data.imagefile, [2, 1, 185, 55], 0, 110); 
                });
                Button_OpenExpansions.setValue(0);
                Button_OpenExpansions.changed();
            }
        }
        
        else if (event.mouseUp)
            this.setPaintRoutine(function(g) 
            {
                g.drawImage(this.data.imagefile, [2, 1, 185, 55], 0, 0); 
            });                  
            
        else if (event.hover)
            this.setPaintRoutine(function(g) 
            {
                g.drawImage(this.data.imagefile, [2, 1, 185, 55], 0, 220); 
            });    
            
        else
            this.setPaintRoutine(function(g) 
            {
                g.drawImage(this.data.imagefile, [2, 1, 185, 55], 0, 0); 
            });         
    });    
};

currentExpansion = expHandler.getCurrentExpansion();
currentExpansion = currentExpansion.Name;

var backgroundImage = "";
var panelImage = "";

var expansionDirectory = FileSystem.getFolder(FileSystem.Samples);
var selectExpansionFile = "";
reg hr;

const var Panel_ChangeSampleFolder = Content.getComponent("Panel_ChangeSampleFolder");

Panel_ChangeSampleFolder.showControl(0);

expHandler.setAllowedExpansionTypes([expHandler.FileBased, 
                                     expHandler.Intermediate, 
                                     expHandler.Encrypted]);
//Preset Browser

const var Button_OpenPresetBrowser = Content.getComponent("Button_OpenPresetBrowser");
const var FloatingTile_PresetBrowser = Content.getComponent("FloatingTile_PresetBrowser");
const var Button_PresetBrowserClose = Content.getComponent("Button_PresetBrowserClose");

FloatingTile_PresetBrowser.showControl(0);

inline function onButton_OpenPresetBrowserControl(component, value)
{
	FloatingTile_PresetBrowser.showControl(value);
	Button_PresetBrowserClose.showControl(value);
};

Content.getComponent("Button_OpenPresetBrowser").setControlCallback(onButton_OpenPresetBrowserControl);                                                                                                    


inline function onButton_PresetBrowserCloseControl(component, value)
{
    if (value)
    {
	    Button_OpenPresetBrowser.setValue(0);
	    Button_OpenPresetBrowser.changed();
    }
	    
};

Content.getComponent("Button_PresetBrowserClose").setControlCallback(onButton_PresetBrowserCloseControl);


//Set Sample Folder Button

inline function onButton_SetSamplesFolderControl(component, value)
{
    Panel_ChangeSampleFolder.showControl(value);
};

Content.getComponent("Button_SetSamplesFolder").setControlCallback(onButton_SetSamplesFolderControl);


inline function onButton_CloseSetFolderControl(component, value)
{
	if (value)
    {
        Panel_ChangeSampleFolder.showControl(0);
        Button_SetSamplesFolder.setValue(0);
    };
};

Content.getComponent("Button_CloseSetFolder").setControlCallback(onButton_CloseSetFolderControl);

//Install Library Button

const var Panel_InstallLibraries = Content.getComponent("Panel_InstallLibraries");
const var Button_AddLibrary = Content.getComponent("Button_AddLibrary");
const var Button_CloseInstallPanel = Content.getComponent("Button_CloseInstallPanel");
const var Button_BulkInstall = Content.getComponent("Button_BulkInstall");

inline function onButton_CloseInstallPanelControl(component, value)
{
	Button_AddLibrary.setValue(0);
	Button_AddLibrary.changed();
};

Content.getComponent("Button_CloseInstallPanel").setControlCallback(onButton_CloseInstallPanelControl);


inline function onButton_AddLibraryControl(component, value)
{
	Panel_InstallLibraries.showControl(value);
};

Content.getComponent("Button_AddLibrary").setControlCallback(onButton_AddLibraryControl);

//Install Single

var installDirectory = expansionDirectory;

inline function onButton_InstallLibraryControl(component, value)
{
    if (value)
    {         
        FileSystem.browse(installDirectory, false, "", function(result) 
        {
            hr = result;
            expHandler.installExpansionFromPackage(hr,FileSystem.getFolder(FileSystem.Samples));
            expHandler.refreshExpansions(); 
            installDirectory = result.getParentDirectory();
        });
    };
};

Content.getComponent("Button_InstallLibrary").setControlCallback(onButton_InstallLibraryControl);

//Bulk Install

var hrList = [];

inline function onButton_BulkInstallControl(component, value)
{
	if (value)
    {
        FileSystem.browseForDirectory(installDirectory, function(result)
        {
            hrList = FileSystem.findFiles(result, "*.hr1", 0);
            for (h in hrList)
            {
                expHandler.installExpansionFromPackage(h,FileSystem.getFolder(FileSystem.Samples));
                expHandler.refreshExpansions(); 
            }
        });
    }
};

Content.getComponent("Button_BulkInstall").setControlCallback(onButton_BulkInstallControl);


//Expansion Selection Navigation.

const var Viewport_ExpansionsHolder = Content.getComponent("Viewport_ExpansionsHolder");
const var Button_OpenExpansions = Content.getComponent("Button_OpenExpansions");

inline function onButton_OpenExpansionsControl(component, value)
{
    if (value)
    {
	    Panel_BG.setPosition(195,23,596,263);     
	    Viewport_ExpansionsHolder.showControl(true);	    
    }
	else
    {
        Panel_BG.setPosition(2,23,596,263);       
	    Viewport_ExpansionsHolder.showControl(false);
    }
};

Content.getComponent("Button_OpenExpansions").setControlCallback(onButton_OpenExpansionsControl);

//Open AppData Button

const var Button_OpenAppData = Content.getComponent("Button_OpenAppData");


inline function onButton_OpenAppDataControl(component, value)
{
	if (value)
	    FileSystem.getFolder(FileSystem.AppData).show();
};

Content.getComponent("Button_OpenAppData").setControlCallback(onButton_OpenAppDataControl);



//Initialize GUI.

//Load expansions

function expCallback()
{ 
    currentExpansion = expHandler.getCurrentExpansion();
    currentExpansion = currentExpansion.getProperties();
    currentExpansion = currentExpansion.Name;
    Console.print("Current Expansion: " + currentExpansion);
    
    switch (currentExpansion)
    {
        case "No Expansion":
        break;
    
        case "Atlas":
            loadAtlas();
            break;
        
        case "Blackout":
            loadBlackout();
            break;
            
        case "Blackout2":
            loadBlackout2();
            break;            
        
        case "Bloom":
            loadBloom();
            break;
        
        case "Cloudburst":
            loadCloudburst();
            break;
            
        case "CloudburstAcoustic":
            loadCloudburstAcoustic();
            break;            
    
        case "Oracle":
            loadOracle();
            break;
            
        case "Aetheric":
            loadAetheric();
            break;
            
        case "Found Keys":
            loadFoundKeys();
            break;
            
        case "Prismatic":
            loadPrismatic();
            break; 
            
        case "Endure":
            loadEndure();
            break;
            
        case "Portal":
            loadPortal();
            break;
            
        case "MachineTribes":
            loadMachineTribes();
            break;
            
        case "Achromic":
            loadAchromic();
            break;
            
        case "PDQBass":
            loadPDQBass();
            break;
            
        case "Oracle2":
            loadOracle2();
            break;
            
        case "Gloom":
            loadGloom();
            break;
            
        default:
    };    
}

expHandler.setExpansionCallback(expCallback);


//Zoom UI Button

const var Button_Zoom = Content.getComponent("Button_Zoom");

inline function onButton_ZoomControl(component, value)
{
	if (value)
    {
        Settings.setZoomLevel(1.5);
    }
    else 
    {
        Settings.setZoomLevel(1.0);
    }	    
};

Content.getComponent("Button_Zoom").setControlCallback(onButton_ZoomControl);

//Custom Keyboard

const var FloatingTile_Keyboard = Content.getComponent("FloatingTile_Keyboard");

const var Button_KeyboardOctaveUp = Content.getComponent("Button_KeyboardOctaveUp");
const var Button_KeyboardOctaveDown = Content.getComponent("Button_KeyboardOctaveDown");

const var Label_KeyboardOctave = Content.getComponent("Label_KeyboardOctave");

var keyboardOctave = 0;
var keyboardLowKey = 24;
var keyboardHighKey = 96;

Label_KeyboardOctave.set("text", keyboardOctave);
FloatingTile_Keyboard.setContentData({
    "Type": "Keyboard",
    "KeyWidth": 12,
    "DisplayOctaveNumber": true,
    "LowKey": keyboardLowKey,
    "HiKey": keyboardHighKey,
    "CustomGraphics": false,
    "DefaultAppearance": true,
    "BlackKeyRatio": 0.699999988079071,
    "ToggleMode": false,
    "MidiChannel": 1,
    "UseVectorGraphics": true,
    "UseFlatStyle": false,
    "MPEKeyboard": false,
    "MPEStartChannel": 2,
    "MPEEndChannel": 16
});

inline function onButton_KeyboardOctaveUpControl(component, value)
{
    if (value)
    {
        if (keyboardOctave == 2)
        {
            
        }
        else 
        {
            keyboardOctave += 1;
            keyboardLowKey += 12;
            keyboardHighKey += 12;
            Label_KeyboardOctave.set("text", keyboardOctave);
            FloatingTile_Keyboard.setContentData({
                  "Type": "Keyboard",
                  "KeyWidth": 12,
                  "DisplayOctaveNumber": true,
                  "LowKey": keyboardLowKey,
                  "HiKey": keyboardHighKey,
                  "CustomGraphics": false,
                  "DefaultAppearance": true,
                  "BlackKeyRatio": 0.699999988079071,
                  "ToggleMode": false,
                  "MidiChannel": 1,
                  "UseVectorGraphics": true,
                  "UseFlatStyle": false,
                  "MPEKeyboard": false,
                  "MPEStartChannel": 2,
                  "MPEEndChannel": 16
});
        }
    }
};

Content.getComponent("Button_KeyboardOctaveUp").setControlCallback(onButton_KeyboardOctaveUpControl);

inline function onButton_KeyboardOctaveDownControl(component, value)
{
    if (value)
    {
        if (keyboardOctave == -2)
        {
            
        }
        else
        {
            keyboardOctave -= 1;
            keyboardLowKey -= 12;
            keyboardHighKey += 12;
            Label_KeyboardOctave.set("text", keyboardOctave);
            FloatingTile_Keyboard.setContentData({
                  "Type": "Keyboard",
                  "KeyWidth": 12,
                  "DisplayOctaveNumber": true,
                  "LowKey": keyboardLowKey,
                  "HiKey": keyboardHighKey,
                  "CustomGraphics": false,
                  "DefaultAppearance": true,
                  "BlackKeyRatio": 0.699999988079071,
                  "ToggleMode": false,
                  "MidiChannel": 1,
                  "UseVectorGraphics": true,
                  "UseFlatStyle": false,
                  "MPEKeyboard": false,
                  "MPEStartChannel": 2,
                  "MPEEndChannel": 16
});            
        }
    }
};

Content.getComponent("Button_KeyboardOctaveDown").setControlCallback(onButton_KeyboardOctaveDownControl);

//Extra Init Calls

//Kill Notes on Transport Stop


const var th = Engine.createTransportHandler();

inline function onStop(isPlaying)
{
    if(!isPlaying)
        Engine.allNotesOff();
        //restoreKeysDefault(e);
        
        switch (currentExpansion)
        {
            case "No Expansion":
            break;
    
            case "Atlas":
                colourKeysAtlas();
                break;
        
            case "Blackout":
                colourKeysBlackout();
                SamplerA.asSampler().enableRoundRobin(false);
                SamplerA.asSampler().setActiveGroup(1);
                break;
            
            case "Blackout2":
                colourKeysBlackout2();
                SamplerA.asSampler().enableRoundRobin(false);
                SamplerA.asSampler().setActiveGroup(1);
                break;            
        
            case "Bloom":
                colourKeysBloom();
                break;
        
            case "Cloudburst":
                colourKeysCloudburst();
                break;
            
            case "CloudburstAcoustic":
                colourKeysCloudburst();
                break;            
    
            case "Oracle":
                colourKeysOracle();
                break;
            
            case "Aetheric":
                colourKeysAetheric();
                break;
            
            case "Found Keys":
                colourKeysFoundKeys();
                break;
            
            case "Prismatic":
                colourKeysPrismatic();
                break; 
            
            case "Endure":
                colourKeysEndure();
                break;
            
            case "Portal":
                colourKeysPortal();
                SamplerA.asSampler().enableRoundRobin(false);
                SamplerA.asSampler().setActiveGroup(1);
                break;
            
            case "MachineTribes":
                colourKeysMachineTribes();
                SamplerA.asSampler().enableRoundRobin(false);
                SamplerA.asSampler().setActiveGroup(1);
                SamplerB.asSampler().enableRoundRobin(false);
                SamplerB.asSampler().setActiveGroup(1);
                SamplerC.asSampler().enableRoundRobin(false);
                SamplerC.asSampler().setActiveGroup(1); 
                break;
                
            case "Achromic":
                colourKeysAchromic();
            break;
            
            case "PDQBass":
                colourKeysPDQBass();
            break;
            
            case "Oracle2":
                colourKeysOracle2();
            break;
            
            case "Gloom":
                colourKeysGloom();                
            break;

            default:
        };    
};

th.setOnTransportChange(true, onStop);

//DEBUG

const var Button_ClearSamplers = Content.getComponent("Button_ClearSamplers");
const var Button_CheckExpansion = Content.getComponent("Button_CheckExpansion");

inline function onButton_ClearSamplersControl(component, value)
{
    if (value)
        clearSamplers();
};

Content.getComponent("Button_ClearSamplers").setControlCallback(onButton_ClearSamplersControl);


inline function onButton_CheckExpansionControl(component, value)
{
    if (value)
    Console.print("Current Expansion: " + currentExpansion);
};

Content.getComponent("Button_CheckExpansion").setControlCallback(onButton_CheckExpansionControl);

//Custom Settings

const var Button_CustomSettings = Content.getComponent("Button_CustomSettings");

inline function onButton_CustomSettingsControl(component, value)
{
	Panel_CustomSettings.showControl(value);
};

Content.getComponent("Button_CustomSettings").setControlCallback(onButton_CustomSettingsControl);

inline function onButton_CloseCustomSettingsControl(component, value)
{
	if (value)
    {
	    Panel_CustomSettings.showControl(0);
	    Button_CustomSettings.setValue(0);
    }
};

Content.getComponent("Button_CloseCustomSettings").setControlCallback(onButton_CloseCustomSettingsControl);

//Portamento

reg lastNote = -1;
reg retrigger = -1;
reg eventId;
reg lastTuning = 0;

const var Button_PortamentoBypass = Content.getComponent("Button_PortamentoBypass");
const var Slider_PortamentoTime = Content.getComponent("Slider_PortamentoTime");
const var Label_PortamentoTimeValue = Content.getComponent("Label_PortamentoTimeValue");


inline function onSlider_PortamentoTimeControl(component, value)
{
	Label_PortamentoTimeValue.set("text", value + "ms");
};

Content.getComponent("Slider_PortamentoTime").setControlCallback(onSlider_PortamentoTimeControl);

for (c in Panel_BG.getChildPanelList())
{
    Console.print(c);
}

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
    
    //Check to see if within playable range.
    
    if (playableWhiteKeys.contains(e))
    {
        Engine.setKeyColour(e, 0xCC6FC4CA);
    }
    
    else if (playableBlackKeys.contains(e))
    {
        Engine.setKeyColour(e, 0xEE124145);
    }
    
    else if (playableWhiteKeysAethericAmbiance.contains(e))
    {
        Engine.setKeyColour(e, 0xFF9C63D3);
    }
    
    else if (playableBlackKeysAethericAmbiance.contains(e))
    {
        Engine.setKeyColour(e, 0xFF361B51);
    }
    
    else if (playableWhiteKeysYellow.contains(e))
    {
        Engine.setKeyColour(e, 0xFFD6DA4C);
    }
    
    else if (playableBlackKeysYellow.contains(e))
    {
        Engine.setKeyColour(e, 0xFF646112);
    }  
    
    else if (playableWhiteKeysBlue.contains(e))
    {
        Engine.setKeyColour(e, 0xFF466CD2);
    }   
    
    else if (playableBlackKeysBlue.contains(e))
    {
        Engine.setKeyColour(e, 0xFF0C2055);
    }    
    
    else if (voidWhiteKeys.contains(e))
    {
        Engine.setKeyColour(e, Colours.lightgrey);
    }
    
    else if (voidBlackKeys.contains(e))
    {
        Engine.setKeyColour(e, Colours.black);
    }
    
    //Nested switch statement to select expansion, then select specific note played.
	switch (currentExpansion)
    {
        case "Blackout":    
	    switch (Message.getNoteNumber())
        {               
            case 24:
            samplerLoopPitch(-12.0);
	        colourKeysBlackoutPitch();
            Engine.setKeyColour(24, 0xFF64EFFF);
            Message.ignoreEvent(e);
	        break;
            
            case 25:
	        samplerLoopPitch(-11.0);
	        colourKeysBlackoutPitch();
            Engine.setKeyColour(25, 0xFF1B9AA9);
            Message.ignoreEvent(e);
	        break;
            
            case 26:
	        samplerLoopPitch(-10.0);
	        colourKeysBlackoutPitch();
            Engine.setKeyColour(26, 0xFF64EFFF);
            Message.ignoreEvent(e);
	        break;
            
            case 27:
	        samplerLoopPitch(-9.0);
	        colourKeysBlackoutPitch();
            Engine.setKeyColour(27, 0xFF1B9AA9);
            Message.ignoreEvent(e);
	        break;
            
            case 28:
	        samplerLoopPitch(-8.0);
	        colourKeysBlackoutPitch();
            Engine.setKeyColour(28, 0xFF64EFFF);
            Message.ignoreEvent(e);
	        break;
            
            case 29:
	        samplerLoopPitch(-7.0);
	        colourKeysBlackoutPitch();
            Engine.setKeyColour(29, 0xFF64EFFF);
            Message.ignoreEvent(e);
	        break;
            
            case 30:
	        samplerLoopPitch(-6.0);
	        colourKeysBlackoutPitch();
            Engine.setKeyColour(30, 0xFF1B9AA9);
            Message.ignoreEvent(e);
	        break;
            
	        case 31:
	        samplerLoopPitch(-5.0);
	        colourKeysBlackoutPitch();
            Engine.setKeyColour(31, 0xFF64EFFF);
            Message.ignoreEvent(e);
	        break;
	        
	        case 32:
	        samplerLoopPitch(-4.0);
	        colourKeysBlackoutPitch();
            Engine.setKeyColour(32, 0xFF1B9AA9);
            Message.ignoreEvent(e);
	        break;
	        
	        case 33:
	        samplerLoopPitch(-3.0);
	        colourKeysBlackoutPitch();
            Engine.setKeyColour(33, 0xFF64EFFF);
            Message.ignoreEvent(e);
	        break;
	        
	        case 34:
	        samplerLoopPitch(-2.0);
	        colourKeysBlackoutPitch();
            Engine.setKeyColour(34, 0xFF1B9AA9);
            Message.ignoreEvent(e);
	        break;	        
            
	        case 35:
	        samplerLoopPitch(-1.0);
	        colourKeysBlackoutPitch();
            Engine.setKeyColour(35, 0xFF64EFFF);
            Message.ignoreEvent(e);
	        break;
	        
	        case 36:
	        samplerLoopPitch(0.0);
	        colourKeysBlackoutPitch();
            Engine.setKeyColour(36, 0xFF64EFFF);
            Message.ignoreEvent(e);
	        break;
	        
	        case 37: 
	        samplerLoopPitch(1.0);
	        colourKeysBlackoutPitch();
            Engine.setKeyColour(37, 0xFF1B9AA9);
            Message.ignoreEvent(e);
	        break;
	        
	        case 38: 
	        samplerLoopPitch(2.0);
	        colourKeysBlackoutPitch();
            Engine.setKeyColour(38, 0xFF64EFFF);
            Message.ignoreEvent(e);
	        break;
	        
	        case 39: 
	        samplerLoopPitch(3.0);
	        colourKeysBlackoutPitch();
            Engine.setKeyColour(39, 0xFF1B9AA9);
            Message.ignoreEvent(e);
	        break;
	        
	        case 40: 
	        samplerLoopPitch(4.0);
	        colourKeysBlackoutPitch();
            Engine.setKeyColour(40, 0xFF64EFFF);
            Message.ignoreEvent(e);
	        break;	        
	        
	        case 41: 
	        samplerLoopPitch(5.0);
	        colourKeysBlackoutPitch();
            Engine.setKeyColour(41, 0xFF64EFFF);
            Message.ignoreEvent(e);
	        break;
	        
	        case 42: 
	        samplerLoopPitch(6.0);
	        colourKeysBlackoutPitch();
            Engine.setKeyColour(42, 0xFF1B9AA9);
            Message.ignoreEvent(e);
	        break;
	        
	        case 43: 
	        samplerLoopPitch(7.0);
	        colourKeysBlackoutPitch();
            Engine.setKeyColour(43, 0xFF64EFFF);
            Message.ignoreEvent(e);
	        break;
	        
	        case 44: 
	        samplerLoopPitch(8.0);
	        colourKeysBlackoutPitch();
            Engine.setKeyColour(44, 0xFF1B9AA9);
            Message.ignoreEvent(e);
	        break;
	        
	        case 45: 
	        samplerLoopPitch(9.0);
	        colourKeysBlackoutPitch();
            Engine.setKeyColour(45, 0xFF64EFFF);
            Message.ignoreEvent(e);
	        break;
	        
	        case 46: 
	        samplerLoopPitch(10.0);
	        colourKeysBlackoutPitch();
            Engine.setKeyColour(46, 0xFF1B9AA9);
            Message.ignoreEvent(e);
	        break;
	        
	        case 47: 
	        samplerLoopPitch(11.0);
	        colourKeysBlackoutPitch();
            Engine.setKeyColour(47, 0xFF64EFFF);
            Message.ignoreEvent(e);
	        break;
	        
	        case 48: 
	        samplerLoopPitch(12.0);
	        colourKeysBlackoutPitch();
            Engine.setKeyColour(48, 0xFF64EFFF);
            Message.ignoreEvent(e);
	        break;
	        
            //0xFF64EFFF white key
            //0xFF1B9AA9 black key
	        
            default:
        }
        if (Message.getNoteNumber() >= 60 && Message.getNoteNumber() <= 90)
        {
            SamplerA.asSampler().enableRoundRobin(true);
        }
        break;
        
        case "Blackout2":
        switch (Message.getNoteNumber())
        {               
            case 24:
	        samplerLoopPitch(-12.0);
	        colourKeysBlackoutPitch();
            Engine.setKeyColour(24, 0xFF64EFFF);
            Message.ignoreEvent(e);
	        break;
            
            case 25:
	        samplerLoopPitch(-11.0);
	        colourKeysBlackoutPitch();
            Engine.setKeyColour(25, 0xFF1B9AA9);
            Message.ignoreEvent(e);
	        break;
            
            case 26:
	        samplerLoopPitch(-10.0);
	        colourKeysBlackoutPitch();
            Engine.setKeyColour(26, 0xFF64EFFF);
            Message.ignoreEvent(e);
	        break;
            
            case 27:
	        samplerLoopPitch(-9.0);
	        colourKeysBlackoutPitch();
            Engine.setKeyColour(27, 0xFF1B9AA9);
            Message.ignoreEvent(e);
	        break;
            
            case 28:
	        samplerLoopPitch(-8.0);
	        colourKeysBlackoutPitch();
            Engine.setKeyColour(28, 0xFF64EFFF);
            Message.ignoreEvent(e);
	        break;
            
            case 29:
	        samplerLoopPitch(-7.0);
	        colourKeysBlackoutPitch();
            Engine.setKeyColour(29, 0xFF64EFFF);
            Message.ignoreEvent(e);
	        break;
            
            case 30:
	        samplerLoopPitch(-6.0);
	        colourKeysBlackoutPitch();
            Engine.setKeyColour(30, 0xFF1B9AA9);
            Message.ignoreEvent(e);
	        break;
            
	        case 31:
	        samplerLoopPitch(-5.0);
	        colourKeysBlackoutPitch();
            Engine.setKeyColour(31, 0xFF64EFFF);
            Message.ignoreEvent(e);
	        break;
	        
	        case 32:
	        samplerLoopPitch(-4.0);
	        colourKeysBlackoutPitch();
            Engine.setKeyColour(32, 0xFF1B9AA9);
            Message.ignoreEvent(e);
	        break;
	        
	        case 33:
	        samplerLoopPitch(-3.0);
	        colourKeysBlackoutPitch();
            Engine.setKeyColour(33, 0xFF64EFFF);
            Message.ignoreEvent(e);
	        break;
	        
	        case 34:
	        samplerLoopPitch(-2.0);
	        colourKeysBlackoutPitch();
            Engine.setKeyColour(34, 0xFF1B9AA9);
            Message.ignoreEvent(e);
	        break;	        
            
	        case 35:
	        samplerLoopPitch(-1.0);
	        colourKeysBlackoutPitch();
            Engine.setKeyColour(35, 0xFF64EFFF);
            Message.ignoreEvent(e);
	        break;
	        
	        case 36:
	        samplerLoopPitch(0.0);
	        colourKeysBlackoutPitch();
            Engine.setKeyColour(36, 0xFF64EFFF);
            Message.ignoreEvent(e);
	        break;
	        
	        case 37: 
	        samplerLoopPitch(1.0);
	        colourKeysBlackoutPitch();
            Engine.setKeyColour(37, 0xFF1B9AA9);
            Message.ignoreEvent(e);
	        break;
	        
	        case 38: 
	        samplerLoopPitch(2.0);
	        colourKeysBlackoutPitch();
            Engine.setKeyColour(38, 0xFF64EFFF);
            Message.ignoreEvent(e);
	        break;
	        
	        case 39: 
	        samplerLoopPitch(3.0);
	        colourKeysBlackoutPitch();
            Engine.setKeyColour(39, 0xFF1B9AA9);
            Message.ignoreEvent(e);
	        break;
	        
	        case 40: 
	        samplerLoopPitch(4.0);
	        colourKeysBlackoutPitch();
            Engine.setKeyColour(40, 0xFF64EFFF);
            Message.ignoreEvent(e);
	        break;	        
	        
	        case 41: 
	        samplerLoopPitch(5.0);
	        colourKeysBlackoutPitch();
            Engine.setKeyColour(41, 0xFF64EFFF);
            Message.ignoreEvent(e);
	        break;
	        
	        case 42: 
	        samplerLoopPitch(6.0);
	        colourKeysBlackoutPitch();
            Engine.setKeyColour(42, 0xFF1B9AA9);
            Message.ignoreEvent(e);
	        break;
	        
	        case 43: 
	        samplerLoopPitch(7.0);
	        colourKeysBlackoutPitch();
            Engine.setKeyColour(43, 0xFF64EFFF);
            Message.ignoreEvent(e);
	        break;
	        
	        case 44: 
	        samplerLoopPitch(8.0);
	        colourKeysBlackoutPitch();
            Engine.setKeyColour(44, 0xFF1B9AA9);
            Message.ignoreEvent(e);
	        break;
	        
	        case 45: 
	        samplerLoopPitch(9.0);
	        colourKeysBlackoutPitch();
            Engine.setKeyColour(45, 0xFF64EFFF);
            Message.ignoreEvent(e);
	        break;
	        
	        case 46: 
	        samplerLoopPitch(10.0);
	        colourKeysBlackoutPitch();
            Engine.setKeyColour(46, 0xFF1B9AA9);
            Message.ignoreEvent(e);
	        break;
	        
	        case 47: 
	        samplerLoopPitch(11.0);
	        colourKeysBlackoutPitch();
            Engine.setKeyColour(47, 0xFF64EFFF);
            Message.ignoreEvent(e);
	        break;
	        
	        case 48: 
	        samplerLoopPitch(12.0);
	        colourKeysBlackoutPitch();
            Engine.setKeyColour(48, 0xFF64EFFF);
            Message.ignoreEvent(e);
	        break;
	        
            //0xFF64EFFF white key
            //0xFF1B9AA9 black key
	        
            default:
        }
        if (Message.getNoteNumber() >= 60 && Message.getNoteNumber() <= 90)
        {
            SamplerA.asSampler().enableRoundRobin(true);
        }
	    break;        
	    
	    case "Portal":
        switch (Message.getNoteNumber())
        {               
            case 24:
	        samplerLoopPitch(-12.0);
	        colourKeysBlackoutPitch();
            Engine.setKeyColour(24, 0xFF64EFFF);
            Message.ignoreEvent(e);
	        break;
            
            case 25:
	        samplerLoopPitch(-11.0);
	        colourKeysBlackoutPitch();
            Engine.setKeyColour(25, 0xFF1B9AA9);
            Message.ignoreEvent(e);
	        break;
            
            case 26:
	        samplerLoopPitch(-10.0);
	        colourKeysBlackoutPitch();
            Engine.setKeyColour(26, 0xFF64EFFF);
            Message.ignoreEvent(e);
	        break;
            
            case 27:
	        samplerLoopPitch(-9.0);
	        colourKeysBlackoutPitch();
            Engine.setKeyColour(27, 0xFF1B9AA9);
            Message.ignoreEvent(e);
	        break;
            
            case 28:
	        samplerLoopPitch(-8.0);
	        colourKeysBlackoutPitch();
            Engine.setKeyColour(28, 0xFF64EFFF);
            Message.ignoreEvent(e);
	        break;
            
            case 29:
	        samplerLoopPitch(-7.0);
	        colourKeysBlackoutPitch();
            Engine.setKeyColour(29, 0xFF64EFFF);
            Message.ignoreEvent(e);
	        break;
            
            case 30:
	        samplerLoopPitch(-6.0);
	        colourKeysBlackoutPitch();
            Engine.setKeyColour(30, 0xFF1B9AA9);
            Message.ignoreEvent(e);
	        break;
            
	        case 31:
	        samplerLoopPitch(-5.0);
	        colourKeysBlackoutPitch();
            Engine.setKeyColour(31, 0xFF64EFFF);
            Message.ignoreEvent(e);
	        break;
	        
	        case 32:
	        samplerLoopPitch(-4.0);
	        colourKeysBlackoutPitch();
            Engine.setKeyColour(32, 0xFF1B9AA9);
            Message.ignoreEvent(e);
	        break;
	        
	        case 33:
	        samplerLoopPitch(-3.0);
	        colourKeysBlackoutPitch();
            Engine.setKeyColour(33, 0xFF64EFFF);
            Message.ignoreEvent(e);
	        break;
	        
	        case 34:
	        samplerLoopPitch(-2.0);
	        colourKeysBlackoutPitch();
            Engine.setKeyColour(34, 0xFF1B9AA9);
            Message.ignoreEvent(e);
	        break;	        
            
	        case 35:
	        samplerLoopPitch(-1.0);
	        colourKeysBlackoutPitch();
            Engine.setKeyColour(35, 0xFF64EFFF);
            Message.ignoreEvent(e);
	        break;
	        
	        case 36:
	        samplerLoopPitch(0.0);
	        colourKeysBlackoutPitch();
            Engine.setKeyColour(36, 0xFF64EFFF);
            Message.ignoreEvent(e);
	        break;
	        
	        case 37: 
	        samplerLoopPitch(1.0);
	        colourKeysBlackoutPitch();
            Engine.setKeyColour(37, 0xFF1B9AA9);
            Message.ignoreEvent(e);
	        break;
	        
	        case 38: 
	        samplerLoopPitch(2.0);
	        colourKeysBlackoutPitch();
            Engine.setKeyColour(38, 0xFF64EFFF);
            Message.ignoreEvent(e);
	        break;
	        
	        case 39: 
	        samplerLoopPitch(3.0);
	        colourKeysBlackoutPitch();
            Engine.setKeyColour(39, 0xFF1B9AA9);
            Message.ignoreEvent(e);
	        break;
	        
	        case 40: 
	        samplerLoopPitch(4.0);
	        colourKeysBlackoutPitch();
            Engine.setKeyColour(40, 0xFF64EFFF);
            Message.ignoreEvent(e);
	        break;	        
	        
	        case 41: 
	        samplerLoopPitch(5.0);
	        colourKeysBlackoutPitch();
            Engine.setKeyColour(41, 0xFF64EFFF);
            Message.ignoreEvent(e);
	        break;
	        
	        case 42: 
	        samplerLoopPitch(6.0);
	        colourKeysBlackoutPitch();
            Engine.setKeyColour(42, 0xFF1B9AA9);
            Message.ignoreEvent(e);
	        break;
	        
	        case 43: 
	        samplerLoopPitch(7.0);
	        colourKeysBlackoutPitch();
            Engine.setKeyColour(43, 0xFF64EFFF);
            Message.ignoreEvent(e);
	        break;
	        
	        case 44: 
	        samplerLoopPitch(8.0);
	        colourKeysBlackoutPitch();
            Engine.setKeyColour(44, 0xFF1B9AA9);
            Message.ignoreEvent(e);
	        break;
	        
	        case 45: 
	        samplerLoopPitch(9.0);
	        colourKeysBlackoutPitch();
            Engine.setKeyColour(45, 0xFF64EFFF);
            Message.ignoreEvent(e);
	        break;
	        
	        case 46: 
	        samplerLoopPitch(10.0);
	        colourKeysBlackoutPitch();
            Engine.setKeyColour(46, 0xFF1B9AA9);
            Message.ignoreEvent(e);
	        break;
	        
	        case 47: 
	        samplerLoopPitch(11.0);
	        colourKeysBlackoutPitch();
            Engine.setKeyColour(47, 0xFF64EFFF);
            Message.ignoreEvent(e);
	        break;
	        
	        case 48: 
	        samplerLoopPitch(12.0);
	        colourKeysBlackoutPitch();
            Engine.setKeyColour(48, 0xFF64EFFF);
            Message.ignoreEvent(e);
	        break;
	        
            //0xFF64EFFF white key
            //0xFF1B9AA9 black key
	        
            default:
        }
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
        
        case "Aetheric":
            disableRoundRobin();
            SamplerA.asSampler().setActiveGroup(ComboBox_SamplerA.getValue());
            SamplerB.asSampler().setActiveGroup(ComboBox_SamplerB.getValue());
            SamplerC.asSampler().setActiveGroup(ComboBox_SamplerC.getValue());
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
            if (e > 0 && e <= 5)
            {
                Message.ignoreEvent(e);
            }
            
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
    }
}
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
    
    if (voidWhiteKeys.contains(e))
        Engine.setKeyColour(e, Colours.white);
    
    if (voidBlackKeys.contains(e))
        Engine.setKeyColour(e, 0xFF1F1F1F);
    
	switch (currentExpansion)
    {
        case "Bloom":
            restoreKeysDefault(e);
        break;
        
        case "Cloudburst":
            restoreKeysDefault(e);
        break;
        
        case "Atlas":
            restoreKeysDefault(e);
        break;
        
        case "Found Keys":
            restoreKeysDefault(e);
        break;
        
        case "Endure":
            restoreKeysDefault(e);
        break;
        
        case "Oracle":
            restoreKeysDefault(e);
        break;       
        
        case "Aetheric":
            restoreKeysDefault(e);
            restoreKeysAethericAmbience(e);
        break;
            
        case "Blackout":
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
                restoreKeysDefault(e);            
            }
            else
            {
                SamplerA.asSampler().enableRoundRobin(false);
                SamplerA.asSampler().setActiveGroup(1);
                SamplerA.asSampler().enableRoundRobin(true);
                restoreKeysDefault(e);     
            }
        }
        break;
        
        case "Blackout2":
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
                restoreKeysDefault(e);            
            }
            else
            {
                SamplerA.asSampler().enableRoundRobin(false);
                SamplerA.asSampler().setActiveGroup(1);
                SamplerA.asSampler().enableRoundRobin(true);
                restoreKeysDefault(e);     
            }          
        }
        break;
        
        case "Portal":
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
                restoreKeysBlue(e);
                restoreKeysYellow(e);            
            }
            else
            {
                SamplerA.asSampler().enableRoundRobin(false);
                SamplerA.asSampler().setActiveGroup(1);
                SamplerA.asSampler().enableRoundRobin(true);
                restoreKeysBlue(e);
                restoreKeysYellow(e);     
            }
        }        
        break;
        
        case "MachineTribes":
            restoreKeysBlue(e);
            restoreKeysYellow(e);
            if (num < 1)
        {
            SamplerA.asSampler().enableRoundRobin(false);
            SamplerA.asSampler().setActiveGroup(1);
            SamplerB.asSampler().enableRoundRobin(false);
            SamplerB.asSampler().setActiveGroup(1);
            SamplerC.asSampler().enableRoundRobin(false);
            SamplerC.asSampler().setActiveGroup(1);   
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
        break;
        
        case "CloudburstAcoustic":
            restoreKeysDefault(e);
            local randomNoise = Math.random() * cloudburstAcousticNoises;
            if (randomNoise > 0.955)
            {
                local vel = Math.randInt(1,127);
                local playedNote = Math.randInt(12, 13);
                Synth.playNote(playedNote, vel);
            }
        break;
        
        case "Prismatic":
            restoreKeysDefault(e);
        break;
        
        case "Achromic":
            restoreKeysDefault(e);
            restoreKeysAchromic(e);
            if (achromicReleaseNoise)
                if (Math.random() < 0.3)
                    Synth.playNote(1, 127);
        break;
        
        case "PDQBass":
            restoreKeysDefault(e);
        break;
        
        case "Oracle2":
            restoreKeysDefault(e);
        break;
        
        case "Gloom":
            restoreKeysDefault(e);
            if (num == 1)
                Synth.playNote(Math.randInt(3,4), Math.randInt(64, 127));
        break;
        
        default:        
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
 