Content.makeFrontInterface(600, 370);

include("LookAndFeel.js");
include("CustomFunctions.js");
include("ArpeggiatorScript.js");
include("CustomExpansionLoading.js");
include("SampleSettings.js");
include("FXGUI.js");
include("Custom_ADSR.js");
include("loadingBar.js");
include("InitializeModules.js");
include("ComboBoxes.js");
include("OutputMeter.js");
include("RandomizeEverything.js");
include("extrasOracle2.js");
include("extrasAchromic.js");
include("PDQBass_Extras.js");


colourKeysReset();
Engine.loadAudioFilesIntoPool();

const var syncTimes = ["1/1", "1/2D", "1/2", "1/2T", "1/4D", "1/4", "1/4T", "1/8D", "1/8", "1/8T", "1/16D", "1/16", "1/16T", "1/32D", "1/32", "1/32T", "1/64D", "1/64", "1/64T"];

//Initialize Expansions.

const var Button_SetSamplesFolder = Content.getComponent("Button_SetSamplesFolder");
const var Button_InstallLibrary = Content.getComponent("Button_InstallLibrary");
const var Button_CloseSetFolder = Content.getComponent("Button_CloseSetFolder");

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
const var Label_PresetsSoon = Content.getComponent("Label_PresetsSoon");

FloatingTile_PresetBrowser.showControl(0);

inline function onButton_OpenPresetBrowserControl(component, value)
{
	FloatingTile_PresetBrowser.showControl(value);
};

Content.getComponent("Button_OpenPresetBrowser").setControlCallback(onButton_OpenPresetBrowserControl);                                                                                                    

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
	    Panel_BG.setPosition(195,23,596,273);
	    for (c in ComboBoxUpArrows)
	        c.setPosition(73+193, c.getGlobalPositionY(), c.getWidth(), c.getHeight());
	    for (c in ComboBoxDownArrows)
	        c.setPosition(73+193, c.getGlobalPositionY(), c.getWidth(), c.getHeight());	        
	    Viewport_ExpansionsHolder.showControl(true);	    
    }
	else
    {
        Panel_BG.setPosition(2,23,596,273);
	    for (c in ComboBoxUpArrows)
	        c.setPosition(73, c.getGlobalPositionY(), c.getWidth(), c.getHeight());
	    for (c in ComboBoxDownArrows)
	        c.setPosition(73, c.getGlobalPositionY(), c.getWidth(), c.getHeight());        
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
                Sampler_Loops.asSampler().enableRoundRobin(false);
                Sampler_Loops.asSampler().setActiveGroup(1);
                break;
            
            case "Blackout2":
                colourKeysBlackout2();
                Sampler_Loops.asSampler().enableRoundRobin(false);
                Sampler_Loops.asSampler().setActiveGroup(1);
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
                Sampler_Loops.asSampler().enableRoundRobin(false);
                Sampler_Loops.asSampler().setActiveGroup(1);
                break;
            
            case "MachineTribes":
                colourKeysMachineTribes();
                Sampler_Loops.asSampler().enableRoundRobin(false);
                Sampler_Loops.asSampler().setActiveGroup(1);
                Sampler_Loops2.asSampler().enableRoundRobin(false);
                Sampler_Loops2.asSampler().setActiveGroup(1);
                Sampler_Loops3.asSampler().enableRoundRobin(false);
                Sampler_Loops3.asSampler().setActiveGroup(1); 
                break;
                
            case "Achromic":
                colourKeysAchromic();
            break;
            
            case "PDQBass":
                colourKeysPDQBass();
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






function onNoteOn()
{
    local e = Message.getNoteNumber();
    local v = Message.getVelocity();
    Console.print("Note: " + e + " = " + Engine.getMidiNoteName(e) + " Velocity: " + v);
    //Console.print("Note: " + e + " Velocity: " + v);

    //Console.print("Velocity: " + v);    
    
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
        //NOTE: All loops are 110BPM and root C.
	    switch (Message.getNoteNumber())
        {               
            case 24:
	        Sampler_LoopsPitchMod.setIntensity(-12.0);
	        colourKeysBlackoutPitch();
            Engine.setKeyColour(24, 0xFF64EFFF);
            Message.ignoreEvent(e);
	        break;
            
            case 25:
	        Sampler_LoopsPitchMod.setIntensity(-11.0);
	        colourKeysBlackoutPitch();
            Engine.setKeyColour(25, 0xFF1B9AA9);
            Message.ignoreEvent(e);
	        break;
            
            case 26:
	        Sampler_LoopsPitchMod.setIntensity(-10.0);
	        colourKeysBlackoutPitch();
            Engine.setKeyColour(26, 0xFF64EFFF);
            Message.ignoreEvent(e);
	        break;
            
            case 27:
	        Sampler_LoopsPitchMod.setIntensity(-9.0);
	        colourKeysBlackoutPitch();
            Engine.setKeyColour(27, 0xFF1B9AA9);
            Message.ignoreEvent(e);
	        break;
            
            case 28:
	        Sampler_LoopsPitchMod.setIntensity(-8.0);
	        colourKeysBlackoutPitch();
            Engine.setKeyColour(28, 0xFF64EFFF);
            Message.ignoreEvent(e);
	        break;
            
            case 29:
	        Sampler_LoopsPitchMod.setIntensity(-7.0);
	        colourKeysBlackoutPitch();
            Engine.setKeyColour(29, 0xFF64EFFF);
            Message.ignoreEvent(e);
	        break;
            
            case 30:
	        Sampler_LoopsPitchMod.setIntensity(-6.0);
	        colourKeysBlackoutPitch();
            Engine.setKeyColour(30, 0xFF1B9AA9);
            Message.ignoreEvent(e);
	        break;
            
	        case 31:
	        Sampler_LoopsPitchMod.setIntensity(-5.0);
	        colourKeysBlackoutPitch();
            Engine.setKeyColour(31, 0xFF64EFFF);
            Message.ignoreEvent(e);
	        break;
	        
	        case 32:
	        Sampler_LoopsPitchMod.setIntensity(-4.0);
	        colourKeysBlackoutPitch();
            Engine.setKeyColour(32, 0xFF1B9AA9);
            Message.ignoreEvent(e);
	        break;
	        
	        case 33:
	        Sampler_LoopsPitchMod.setIntensity(-3.0);
	        colourKeysBlackoutPitch();
            Engine.setKeyColour(33, 0xFF64EFFF);
            Message.ignoreEvent(e);
	        break;
	        
	        case 34:
	        Sampler_LoopsPitchMod.setIntensity(-2.0);
	        colourKeysBlackoutPitch();
            Engine.setKeyColour(34, 0xFF1B9AA9);
            Message.ignoreEvent(e);
	        break;	        
            
	        case 35:
	        Sampler_LoopsPitchMod.setIntensity(-1.0);
	        colourKeysBlackoutPitch();
            Engine.setKeyColour(35, 0xFF64EFFF);
            Message.ignoreEvent(e);
	        break;
	        
	        case 36:
	        Sampler_LoopsPitchMod.setIntensity(0.0);
	        colourKeysBlackoutPitch();
            Engine.setKeyColour(36, 0xFF64EFFF);
            Message.ignoreEvent(e);
	        break;
	        
	        case 37: 
	        Sampler_LoopsPitchMod.setIntensity(1.0);
	        colourKeysBlackoutPitch();
            Engine.setKeyColour(37, 0xFF1B9AA9);
            Message.ignoreEvent(e);
	        break;
	        
	        case 38: 
	        Sampler_LoopsPitchMod.setIntensity(2.0);
	        colourKeysBlackoutPitch();
            Engine.setKeyColour(38, 0xFF64EFFF);
            Message.ignoreEvent(e);
	        break;
	        
	        case 39: 
	        Sampler_LoopsPitchMod.setIntensity(3.0);
	        colourKeysBlackoutPitch();
            Engine.setKeyColour(39, 0xFF1B9AA9);
            Message.ignoreEvent(e);
	        break;
	        
	        case 40: 
	        Sampler_LoopsPitchMod.setIntensity(4.0);
	        colourKeysBlackoutPitch();
            Engine.setKeyColour(40, 0xFF64EFFF);
            Message.ignoreEvent(e);
	        break;	        
	        
	        case 41: 
	        Sampler_LoopsPitchMod.setIntensity(5.0);
	        colourKeysBlackoutPitch();
            Engine.setKeyColour(41, 0xFF64EFFF);
            Message.ignoreEvent(e);
	        break;
	        
	        case 42: 
	        Sampler_LoopsPitchMod.setIntensity(6.0);
	        colourKeysBlackoutPitch();
            Engine.setKeyColour(42, 0xFF1B9AA9);
            Message.ignoreEvent(e);
	        break;
	        
	        case 43: 
	        Sampler_LoopsPitchMod.setIntensity(7.0);
	        colourKeysBlackoutPitch();
            Engine.setKeyColour(43, 0xFF64EFFF);
            Message.ignoreEvent(e);
	        break;
	        
	        case 44: 
	        Sampler_LoopsPitchMod.setIntensity(8.0);
	        colourKeysBlackoutPitch();
            Engine.setKeyColour(44, 0xFF1B9AA9);
            Message.ignoreEvent(e);
	        break;
	        
	        case 45: 
	        Sampler_LoopsPitchMod.setIntensity(9.0);
	        colourKeysBlackoutPitch();
            Engine.setKeyColour(45, 0xFF64EFFF);
            Message.ignoreEvent(e);
	        break;
	        
	        case 46: 
	        Sampler_LoopsPitchMod.setIntensity(10.0);
	        colourKeysBlackoutPitch();
            Engine.setKeyColour(46, 0xFF1B9AA9);
            Message.ignoreEvent(e);
	        break;
	        
	        case 47: 
	        Sampler_LoopsPitchMod.setIntensity(11.0);
	        colourKeysBlackoutPitch();
            Engine.setKeyColour(47, 0xFF64EFFF);
            Message.ignoreEvent(e);
	        break;
	        
	        case 48: 
	        Sampler_LoopsPitchMod.setIntensity(12.0);
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
            Sampler_Loops.asSampler().enableRoundRobin(true);
        }
        
        case "Blackout2":
        
        switch (Message.getNoteNumber())
        {               
            case 24:
	        Sampler_LoopsPitchMod.setIntensity(-12.0);
	        colourKeysBlackoutPitch();
            Engine.setKeyColour(24, 0xFF64EFFF);
            Message.ignoreEvent(e);
	        break;
            
            case 25:
	        Sampler_LoopsPitchMod.setIntensity(-11.0);
	        colourKeysBlackoutPitch();
            Engine.setKeyColour(25, 0xFF1B9AA9);
            Message.ignoreEvent(e);
	        break;
            
            case 26:
	        Sampler_LoopsPitchMod.setIntensity(-10.0);
	        colourKeysBlackoutPitch();
            Engine.setKeyColour(26, 0xFF64EFFF);
            Message.ignoreEvent(e);
	        break;
            
            case 27:
	        Sampler_LoopsPitchMod.setIntensity(-9.0);
	        colourKeysBlackoutPitch();
            Engine.setKeyColour(27, 0xFF1B9AA9);
            Message.ignoreEvent(e);
	        break;
            
            case 28:
	        Sampler_LoopsPitchMod.setIntensity(-8.0);
	        colourKeysBlackoutPitch();
            Engine.setKeyColour(28, 0xFF64EFFF);
            Message.ignoreEvent(e);
	        break;
            
            case 29:
	        Sampler_LoopsPitchMod.setIntensity(-7.0);
	        colourKeysBlackoutPitch();
            Engine.setKeyColour(29, 0xFF64EFFF);
            Message.ignoreEvent(e);
	        break;
            
            case 30:
	        Sampler_LoopsPitchMod.setIntensity(-6.0);
	        colourKeysBlackoutPitch();
            Engine.setKeyColour(30, 0xFF1B9AA9);
            Message.ignoreEvent(e);
	        break;
            
	        case 31:
	        Sampler_LoopsPitchMod.setIntensity(-5.0);
	        colourKeysBlackoutPitch();
            Engine.setKeyColour(31, 0xFF64EFFF);
            Message.ignoreEvent(e);
	        break;
	        
	        case 32:
	        Sampler_LoopsPitchMod.setIntensity(-4.0);
	        colourKeysBlackoutPitch();
            Engine.setKeyColour(32, 0xFF1B9AA9);
            Message.ignoreEvent(e);
	        break;
	        
	        case 33:
	        Sampler_LoopsPitchMod.setIntensity(-3.0);
	        colourKeysBlackoutPitch();
            Engine.setKeyColour(33, 0xFF64EFFF);
            Message.ignoreEvent(e);
	        break;
	        
	        case 34:
	        Sampler_LoopsPitchMod.setIntensity(-2.0);
	        colourKeysBlackoutPitch();
            Engine.setKeyColour(34, 0xFF1B9AA9);
            Message.ignoreEvent(e);
	        break;	        
            
	        case 35:
	        Sampler_LoopsPitchMod.setIntensity(-1.0);
	        colourKeysBlackoutPitch();
            Engine.setKeyColour(35, 0xFF64EFFF);
            Message.ignoreEvent(e);
	        break;
	        
	        case 36:
	        Sampler_LoopsPitchMod.setIntensity(0.0);
	        colourKeysBlackoutPitch();
            Engine.setKeyColour(36, 0xFF64EFFF);
            Message.ignoreEvent(e);
	        break;
	        
	        case 37: 
	        Sampler_LoopsPitchMod.setIntensity(1.0);
	        colourKeysBlackoutPitch();
            Engine.setKeyColour(37, 0xFF1B9AA9);
            Message.ignoreEvent(e);
	        break;
	        
	        case 38: 
	        Sampler_LoopsPitchMod.setIntensity(2.0);
	        colourKeysBlackoutPitch();
            Engine.setKeyColour(38, 0xFF64EFFF);
            Message.ignoreEvent(e);
	        break;
	        
	        case 39: 
	        Sampler_LoopsPitchMod.setIntensity(3.0);
	        colourKeysBlackoutPitch();
            Engine.setKeyColour(39, 0xFF1B9AA9);
            Message.ignoreEvent(e);
	        break;
	        
	        case 40: 
	        Sampler_LoopsPitchMod.setIntensity(4.0);
	        colourKeysBlackoutPitch();
            Engine.setKeyColour(40, 0xFF64EFFF);
            Message.ignoreEvent(e);
	        break;	        
	        
	        case 41: 
	        Sampler_LoopsPitchMod.setIntensity(5.0);
	        colourKeysBlackoutPitch();
            Engine.setKeyColour(41, 0xFF64EFFF);
            Message.ignoreEvent(e);
	        break;
	        
	        case 42: 
	        Sampler_LoopsPitchMod.setIntensity(6.0);
	        colourKeysBlackoutPitch();
            Engine.setKeyColour(42, 0xFF1B9AA9);
            Message.ignoreEvent(e);
	        break;
	        
	        case 43: 
	        Sampler_LoopsPitchMod.setIntensity(7.0);
	        colourKeysBlackoutPitch();
            Engine.setKeyColour(43, 0xFF64EFFF);
            Message.ignoreEvent(e);
	        break;
	        
	        case 44: 
	        Sampler_LoopsPitchMod.setIntensity(8.0);
	        colourKeysBlackoutPitch();
            Engine.setKeyColour(44, 0xFF1B9AA9);
            Message.ignoreEvent(e);
	        break;
	        
	        case 45: 
	        Sampler_LoopsPitchMod.setIntensity(9.0);
	        colourKeysBlackoutPitch();
            Engine.setKeyColour(45, 0xFF64EFFF);
            Message.ignoreEvent(e);
	        break;
	        
	        case 46: 
	        Sampler_LoopsPitchMod.setIntensity(10.0);
	        colourKeysBlackoutPitch();
            Engine.setKeyColour(46, 0xFF1B9AA9);
            Message.ignoreEvent(e);
	        break;
	        
	        case 47: 
	        Sampler_LoopsPitchMod.setIntensity(11.0);
	        colourKeysBlackoutPitch();
            Engine.setKeyColour(47, 0xFF64EFFF);
            Message.ignoreEvent(e);
	        break;
	        
	        case 48: 
	        Sampler_LoopsPitchMod.setIntensity(12.0);
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
            Sampler_Loops.asSampler().enableRoundRobin(true);
        }
        
	    break;        
	    
	    case "Portal":
        
        switch (Message.getNoteNumber())
        {               
            case 24:
	        Sampler_LoopsPitchMod.setIntensity(-12.0);
	        colourKeysBlackoutPitch();
            Engine.setKeyColour(24, 0xFF64EFFF);
            Message.ignoreEvent(e);
	        break;
            
            case 25:
	        Sampler_LoopsPitchMod.setIntensity(-11.0);
	        colourKeysBlackoutPitch();
            Engine.setKeyColour(25, 0xFF1B9AA9);
            Message.ignoreEvent(e);
	        break;
            
            case 26:
	        Sampler_LoopsPitchMod.setIntensity(-10.0);
	        colourKeysBlackoutPitch();
            Engine.setKeyColour(26, 0xFF64EFFF);
            Message.ignoreEvent(e);
	        break;
            
            case 27:
	        Sampler_LoopsPitchMod.setIntensity(-9.0);
	        colourKeysBlackoutPitch();
            Engine.setKeyColour(27, 0xFF1B9AA9);
            Message.ignoreEvent(e);
	        break;
            
            case 28:
	        Sampler_LoopsPitchMod.setIntensity(-8.0);
	        colourKeysBlackoutPitch();
            Engine.setKeyColour(28, 0xFF64EFFF);
            Message.ignoreEvent(e);
	        break;
            
            case 29:
	        Sampler_LoopsPitchMod.setIntensity(-7.0);
	        colourKeysBlackoutPitch();
            Engine.setKeyColour(29, 0xFF64EFFF);
            Message.ignoreEvent(e);
	        break;
            
            case 30:
	        Sampler_LoopsPitchMod.setIntensity(-6.0);
	        colourKeysBlackoutPitch();
            Engine.setKeyColour(30, 0xFF1B9AA9);
            Message.ignoreEvent(e);
	        break;
            
	        case 31:
	        Sampler_LoopsPitchMod.setIntensity(-5.0);
	        colourKeysBlackoutPitch();
            Engine.setKeyColour(31, 0xFF64EFFF);
            Message.ignoreEvent(e);
	        break;
	        
	        case 32:
	        Sampler_LoopsPitchMod.setIntensity(-4.0);
	        colourKeysBlackoutPitch();
            Engine.setKeyColour(32, 0xFF1B9AA9);
            Message.ignoreEvent(e);
	        break;
	        
	        case 33:
	        Sampler_LoopsPitchMod.setIntensity(-3.0);
	        colourKeysBlackoutPitch();
            Engine.setKeyColour(33, 0xFF64EFFF);
            Message.ignoreEvent(e);
	        break;
	        
	        case 34:
	        Sampler_LoopsPitchMod.setIntensity(-2.0);
	        colourKeysBlackoutPitch();
            Engine.setKeyColour(34, 0xFF1B9AA9);
            Message.ignoreEvent(e);
	        break;	        
            
	        case 35:
	        Sampler_LoopsPitchMod.setIntensity(-1.0);
	        colourKeysBlackoutPitch();
            Engine.setKeyColour(35, 0xFF64EFFF);
            Message.ignoreEvent(e);
	        break;
	        
	        case 36:
	        Sampler_LoopsPitchMod.setIntensity(0.0);
	        colourKeysBlackoutPitch();
            Engine.setKeyColour(36, 0xFF64EFFF);
            Message.ignoreEvent(e);
	        break;
	        
	        case 37: 
	        Sampler_LoopsPitchMod.setIntensity(1.0);
	        colourKeysBlackoutPitch();
            Engine.setKeyColour(37, 0xFF1B9AA9);
            Message.ignoreEvent(e);
	        break;
	        
	        case 38: 
	        Sampler_LoopsPitchMod.setIntensity(2.0);
	        colourKeysBlackoutPitch();
            Engine.setKeyColour(38, 0xFF64EFFF);
            Message.ignoreEvent(e);
	        break;
	        
	        case 39: 
	        Sampler_LoopsPitchMod.setIntensity(3.0);
	        colourKeysBlackoutPitch();
            Engine.setKeyColour(39, 0xFF1B9AA9);
            Message.ignoreEvent(e);
	        break;
	        
	        case 40: 
	        Sampler_LoopsPitchMod.setIntensity(4.0);
	        colourKeysBlackoutPitch();
            Engine.setKeyColour(40, 0xFF64EFFF);
            Message.ignoreEvent(e);
	        break;	        
	        
	        case 41: 
	        Sampler_LoopsPitchMod.setIntensity(5.0);
	        colourKeysBlackoutPitch();
            Engine.setKeyColour(41, 0xFF64EFFF);
            Message.ignoreEvent(e);
	        break;
	        
	        case 42: 
	        Sampler_LoopsPitchMod.setIntensity(6.0);
	        colourKeysBlackoutPitch();
            Engine.setKeyColour(42, 0xFF1B9AA9);
            Message.ignoreEvent(e);
	        break;
	        
	        case 43: 
	        Sampler_LoopsPitchMod.setIntensity(7.0);
	        colourKeysBlackoutPitch();
            Engine.setKeyColour(43, 0xFF64EFFF);
            Message.ignoreEvent(e);
	        break;
	        
	        case 44: 
	        Sampler_LoopsPitchMod.setIntensity(8.0);
	        colourKeysBlackoutPitch();
            Engine.setKeyColour(44, 0xFF1B9AA9);
            Message.ignoreEvent(e);
	        break;
	        
	        case 45: 
	        Sampler_LoopsPitchMod.setIntensity(9.0);
	        colourKeysBlackoutPitch();
            Engine.setKeyColour(45, 0xFF64EFFF);
            Message.ignoreEvent(e);
	        break;
	        
	        case 46: 
	        Sampler_LoopsPitchMod.setIntensity(10.0);
	        colourKeysBlackoutPitch();
            Engine.setKeyColour(46, 0xFF1B9AA9);
            Message.ignoreEvent(e);
	        break;
	        
	        case 47: 
	        Sampler_LoopsPitchMod.setIntensity(11.0);
	        colourKeysBlackoutPitch();
            Engine.setKeyColour(47, 0xFF64EFFF);
            Message.ignoreEvent(e);
	        break;
	        
	        case 48: 
	        Sampler_LoopsPitchMod.setIntensity(12.0);
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
        
        Sampler_Loops.asSampler().enableRoundRobin(true);
	    break;    
	    
	    case "MachineTribes":
	    Sampler_Loops.asSampler().enableRoundRobin(true);
	    Sampler_Loops2.asSampler().enableRoundRobin(true);
	    Sampler_Loops3.asSampler().enableRoundRobin(true);
	    if (e >= 84 && e <= 120)
        {
            local currentRR = Arpeggiator1.getAttribute(Arpeggiator1.CurrentValue);	                
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
            Sampler_NoRR.asSampler().setActiveGroup(ComboBox_Aetheric1.getValue());
            Sampler_NoRR2.asSampler().setActiveGroup(ComboBox_Aetheric2.getValue());
            Sampler_NoRR3.asSampler().setActiveGroup(ComboBox_Aetheric3.getValue());
        break;
        
        case "Atlas":
            Sampler_NoRR.asSampler().setActiveGroup(ComboBox_Atlas.getValue());
        break;
        
        case "Oracle":
            Sampler_NoRR.asSampler().setActiveGroup(ComboBox_OraclePickup.getValue());
        break;
        
        case "Found Keys":
            Sampler_NoRR.asSampler().setActiveGroup(ComboBox_FoundKeys.getValue());
        break;
        
        case "Prismatic":
            Sampler_NoRR.asSampler().setActiveGroup(ComboBox_Prismatic.getValue());
        break;
        
        case "Endure":
            Sampler_NoRR.asSampler().setActiveGroup(ComboBox_Endure.getValue());
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
                            Sampler_AchromicA.asSampler().setActiveGroup(achromicPreviousRR);
                            Sampler_AchromicB.asSampler().setActiveGroup(achromicCurrentRR);
                            achromicIsUppick = 1 - achromicForceDownpick;
                        }
                    else
                        {
                            achromicPreviousRR = achromicCurrentRR;
                            while (achromicCurrentRR == achromicPreviousRR)
                                {
                                    achromicCurrentRR = Math.randInt(1, 6);
                                }
                            Sampler_AchromicA.asSampler().setActiveGroup(achromicPreviousRR + 6);
                            Sampler_AchromicB.asSampler().setActiveGroup(achromicCurrentRR + 6);
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
                            Sampler_AchromicA.asSampler().setActiveGroup(achromicPreviousRR);
                            Sampler_AchromicB.asSampler().setActiveGroup(achromicCurrentRR);
                            achromicIsUppick = 1 - achromicForceDownpick;
                        }
                    else
                        {
                            achromicPreviousRR = achromicCurrentRR;
                            while (achromicCurrentRR == achromicPreviousRR)
                                {
                                    achromicCurrentRR = Math.randInt(1, 6);
                                }
                            Sampler_AchromicA.asSampler().setActiveGroup(achromicPreviousRR + 6);
                            Sampler_AchromicB.asSampler().setActiveGroup(achromicCurrentRR + 6);
                            achromicIsUppick = 0;
                        }     
                    }
                    if (achromicPickAttack)
                        Synth.playNote(0, v); //Trigger Pick Attack     
            }
        else if (e > 107 && e < 117)
        {
            Sampler_AchromicA.asSampler().setActiveGroup(1);
            Sampler_AchromicB.asSampler().setActiveGroup(2);
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
                            Sampler_AchromicA.asSampler().setActiveGroup(achromicPreviousRR);
                            Sampler_AchromicB.asSampler().setActiveGroup(achromicCurrentRR);
                            achromicIsUppick = 1 - achromicForceDownpick;
                        }
                    else
                        {
                            achromicPreviousRR = achromicCurrentRR;
                            while (achromicCurrentRR == achromicPreviousRR)
                                {
                                    achromicCurrentRR = Math.randInt(1, 6);
                                }
                            Sampler_AchromicA.asSampler().setActiveGroup(achromicPreviousRR + 6);
                            Sampler_AchromicB.asSampler().setActiveGroup(achromicCurrentRR + 6);
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
            
        
        if (e >= 53 && e <= 97) //playable range
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
                                        PDQBassCurrentRR = Math.randInt(1, 5);
                                    }
                                    Sampler_NoRR.asSampler().setActiveGroup(PDQBassCurrentRR);
                                    PDQBassIsUppick = 1 - PDQBassForceDownpick;
                                }
                                else
                                {
                                    PDQBassPreviousRR = PDQBassCurrentRR;
                                    while (PDQBassCurrentRR == PDQBassPreviousRR)
                                    {
                                        PDQBassCurrentRR = Math.randInt(6, 10);
                                    }
                                    Sampler_NoRR.asSampler().setActiveGroup(PDQBassCurrentRR);
                                    PDQBassIsUppick = 1 - PDQBassForceDownpick;
                                }
                            }
                        else if (v > Slider_PDQBassFVelMin.getValue() && v < Slider_PDQBassFVelMax.getValue()) // Finger
                            {
                                PDQBassPreviousRR = PDQBassCurrentRR;
                                while (PDQBassCurrentRR == PDQBassPreviousRR)
                                {
                                    PDQBassCurrentRR = Math.randInt(11, 15);
                                }
                                Sampler_NoRR.asSampler().setActiveGroup(PDQBassCurrentRR);
                            }     
                       else if (v > Slider_PDQBassAPVelMin.getValue() && v < Slider_PDQBassAPVelMax.getValue()) // Alt Picking
                            {
                                if (!PDQBassIsUppick)
                                {
                                    PDQBassPreviousRR = PDQBassCurrentRR;
                                    while (PDQBassCurrentRR == PDQBassPreviousRR)
                                    {
                                        PDQBassCurrentRR = Math.randInt(16, 20);
                                    }
                                    Sampler_NoRR.asSampler().setActiveGroup(PDQBassCurrentRR);
                                    PDQBassIsUppick = 1 - PDQBassForceDownpick;
                                }
                                else
                                {
                                    PDQBassPreviousRR = PDQBassCurrentRR;
                                    while (PDQBassCurrentRR == PDQBassPreviousRR)
                                    {
                                        PDQBassCurrentRR = Math.randInt(21, 25);
                                    }
                                    Sampler_NoRR.asSampler().setActiveGroup(PDQBassCurrentRR);
                                    PDQBassIsUppick = 1 - PDQBassForceDownpick;
                                }
                            }
                        else if (v > Slider_PDQBassSLVelMin.getValue() && v < Slider_PDQBassSLVelMax.getValue()) // Slap
                        {
                            PDQBassPreviousRR = PDQBassCurrentRR;
                                while (PDQBassCurrentRR == PDQBassPreviousRR)
                                {
                                    PDQBassCurrentRR = Math.randInt(26, 30);
                                }
                                Sampler_NoRR.asSampler().setActiveGroup(PDQBassCurrentRR);
                        }
                    }
            }
        break;
        
        case "Oracle2":
            Sampler_Oracle2A.asSampler().setActiveGroup(ComboBox_Oracle2A.getValue());
            Sampler_Oracle2B.asSampler().setActiveGroup(ComboBox_Oracle2B.getValue());
        break;
        
        
        default:
    }
}
 function onNoteOff()
{
    local e = Message.getNoteNumber();    
    local num = Synth.getNumPressedKeys();   
    local activeGroup;
    
    if (voidWhiteKeys.contains(e))
    {
        Engine.setKeyColour(e, Colours.white);
    }
    
    if (voidBlackKeys.contains(e))
    {
        Engine.setKeyColour(e, 0xFF1F1F1F);
    }
    
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
                activeGroup = Sampler_Loops.asSampler().getActiveRRGroup();
                Sampler_Loops.asSampler().enableRoundRobin(false);
                Sampler_Loops.asSampler().setActiveGroup(activeGroup);
                Sampler_Loops.asSampler().enableRoundRobin(true);
        }
            else
        {
            if (num > 1)
            {
                Sampler_Loops.asSampler().enableRoundRobin(false);
                Sampler_Loops.asSampler().setActiveGroup(Sampler_Loops.asSampler().getActiveRRGroup());
                Sampler_Loops.asSampler().enableRoundRobin(true);
                restoreKeysDefault(e);            
            }
            else
            {
                Sampler_Loops.asSampler().enableRoundRobin(false);
                Sampler_Loops.asSampler().setActiveGroup(1);
                Sampler_Loops.asSampler().enableRoundRobin(true);
                restoreKeysDefault(e);     
            }
        }
        break;
        
        case "Blackout2":
            if (e >= 24 & e <= 48)
        {
                Message.ignoreEvent(e);
                activeGroup = Sampler_Loops.asSampler().getActiveRRGroup();
                Sampler_Loops.asSampler().enableRoundRobin(false);
                Sampler_Loops.asSampler().setActiveGroup(activeGroup);
                Sampler_Loops.asSampler().enableRoundRobin(true);
        }
            else
        {
            if (num > 1)
            {
                Sampler_Loops.asSampler().enableRoundRobin(false);
                Sampler_Loops.asSampler().setActiveGroup(Sampler_Loops.asSampler().getActiveRRGroup());
                Sampler_Loops.asSampler().enableRoundRobin(true);
                restoreKeysDefault(e);            
            }
            else
            {
                Sampler_Loops.asSampler().enableRoundRobin(false);
                Sampler_Loops.asSampler().setActiveGroup(1);
                Sampler_Loops.asSampler().enableRoundRobin(true);
                restoreKeysDefault(e);     
            }          
        }
        break;
        
        case "Portal":
        if (e >= 24 & e <= 48)
        {
                Message.ignoreEvent(e);
                activeGroup = Sampler_Loops.asSampler().getActiveRRGroup();
                Sampler_Loops.asSampler().enableRoundRobin(false);
                Sampler_Loops.asSampler().setActiveGroup(activeGroup);
                Sampler_Loops.asSampler().enableRoundRobin(true);
        }
            else
        {
            if (num > 1)
            {
                Sampler_Loops.asSampler().enableRoundRobin(false);
                Sampler_Loops.asSampler().setActiveGroup(Sampler_Loops.asSampler().getActiveRRGroup());
                Sampler_Loops.asSampler().enableRoundRobin(true);
                restoreKeysBlue(e);
                restoreKeysYellow(e);            
            }
            else
            {
                Sampler_Loops.asSampler().enableRoundRobin(false);
                Sampler_Loops.asSampler().setActiveGroup(1);
                Sampler_Loops.asSampler().enableRoundRobin(true);
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
            Sampler_Loops.asSampler().enableRoundRobin(false);
            Sampler_Loops.asSampler().setActiveGroup(1);
            Sampler_Loops2.asSampler().enableRoundRobin(false);
            Sampler_Loops2.asSampler().setActiveGroup(1);
            Sampler_Loops3.asSampler().enableRoundRobin(false);
            Sampler_Loops3.asSampler().setActiveGroup(1);   
            Sampler_Loops.asSampler().enableRoundRobin(true);
            Sampler_Loops2.asSampler().enableRoundRobin(true);
            Sampler_Loops3.asSampler().enableRoundRobin(true);
        }
            else 
        {	                   
            local currentRR1 = Sampler_Loops.asSampler().getActiveRRGroup();
            local currentRR2 = Sampler_Loops2.asSampler().getActiveRRGroup();
            local currentRR3 = Sampler_Loops3.asSampler().getActiveRRGroup();
            Sampler_Loops.asSampler().enableRoundRobin(false);
            Sampler_Loops2.asSampler().enableRoundRobin(false);
            Sampler_Loops3.asSampler().enableRoundRobin(false);            
            Sampler_Loops.asSampler().setActiveGroup(currentRR1);
            Sampler_Loops2.asSampler().setActiveGroup(currentRR2);
            Sampler_Loops3.asSampler().setActiveGroup(currentRR3);
            Sampler_Loops.asSampler().enableRoundRobin(true);
            Sampler_Loops2.asSampler().enableRoundRobin(true);
            Sampler_Loops3.asSampler().enableRoundRobin(true);                
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
 