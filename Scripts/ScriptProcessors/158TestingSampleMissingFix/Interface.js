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
	
}
 function onNoteOff()
{
	
}
 function onController()
{
	
}
 function onTimer()
{
	
}
 function onControl(number, value)
{
	
}
 