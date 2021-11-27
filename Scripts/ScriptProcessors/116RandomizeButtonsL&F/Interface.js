Content.makeFrontInterface(600, 370);



include("CustomFunctions.js");
include("ArpeggiatorScript.js");
include("CustomExpansionLoading.js");
include("FXGUI.js");
include("Custom_ADSR.js");
include("loadingBar.js");
include("InitializeModules.js");
include("ComboBoxes.js");
include("OutputMeter.js");
include("RandomizeEverything.js");

    

colourKeysReset();
Engine.loadAudioFilesIntoPool();

const var syncTimes = ["1/1", "1/2D", "1/2", "1/2T", "1/4D", "1/4", "1/4T", "1/8D", "1/8", "1/8T", "1/16D", "1/16", "1/16T", "1/32D", "1/32", "1/32T", "1/64D", "1/64", "1/64T"];

//Initialize Expansions.

const var Button_SetSamplesFolder = Content.getComponent("Button_SetSamplesFolder");
const var Button_InstallLibrary = Content.getComponent("Button_InstallLibrary");
const var Button_CloseSetFolder = Content.getComponent("Button_CloseSetFolder");

inline function onSlider_GainMic1Control(component, value)
{
    SamplerRR_MicVolume.setAttribute(SamplerRR_MicVolume.Gain, value);
	Sampler_NoRRMicVolume.setAttribute(Sampler_NoRRMicVolume.Gain, value);
	Sampler_LoopsGain.setAttribute(Sampler_LoopsGain.Gain, value);
	Label_Mic1Value.set("text", Math.round(value) + "dB");
};

Content.getComponent("Slider_GainMic1").setControlCallback(onSlider_GainMic1Control);

inline function onSlider_GainMic2Control(component, value)
{
    SamplerRR2_MicVolume.setAttribute(SamplerRR2_MicVolume.Gain, value);
    Sampler_NoRR2MicVolume.setAttribute(Sampler_NoRR2MicVolume.Gain, value);
    Sampler_Loops2Gain.setAttribute(Sampler_Loops2Gain.Gain, value);
	Label_Mic2Value.set("text", Math.round(value) + "dB");
};

Content.getComponent("Slider_GainMic2").setControlCallback(onSlider_GainMic2Control);


inline function onSlider_GainMic3Control(component, value)
{
    SamplerRR3_MicVolume.setAttribute(SamplerRR3_MicVolume.Gain, value);
    Sampler_NoRR3MicVolume.setAttribute(Sampler_NoRR3MicVolume.Gain, value);
    Sampler_Loops3Gain.setAttribute(Sampler_Loops3Gain.Gain, value);
	Label_Mic3Value.set("text", Math.round(value) + "dB");
};

Content.getComponent("Slider_GainMic3").setControlCallback(onSlider_GainMic3Control);

var currentExpansion; 

const var expansionNames = [];

expansionNames.push("No Expansion");

for (e in expHandler.getExpansionList())
    expansionNames.push(e.getProperties().Name);

//Populate Expansion List TEST    

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
    
    expButton[i].setMouseCallback(function(event)
    {
        if (event.clicked)
        {
            expHandler.setCurrentExpansion(this.data.expansionName);   
            load+this.data.expansionName;
            this.setPaintRoutine(function(g) 
            {
                g.drawImage(this.data.imagefile, [2, 1, 185, 55], 0, 110); 
            });
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
	//Label_PresetsSoon.set("visible", value);
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

inline function onButton_InstallLibraryControl(component, value)
{
    if (value)
    {  
        FileSystem.browse(expansionDirectory, false, "", function(result) 
    {
        hr = result;
        expHandler.installExpansionFromPackage(hr,FileSystem.getFolder(FileSystem.Samples));
        expHandler.refreshExpansions(); 
    });
    };
};

Content.getComponent("Button_InstallLibrary").setControlCallback(onButton_InstallLibraryControl);

//Initialize Background Image.

const var Panel_BG = Content.getComponent("Panel_BG");
const var Image_BG = Content.getComponent("Image_BG");

Image_BG.setAlpha(0);

//Expansion Selection Navigation.

const var Viewport_ExpansionsHolder = Content.getComponent("Viewport_ExpansionsHolder");
const var Button_OpenExpansions = Content.getComponent("Button_OpenExpansions");

inline function onButton_OpenExpansionsControl(component, value)
{
    if (value)
    {
	    Panel_BG.setPosition(192,23,596,273);
	    for (c in ComboBoxUpArrows)
	        c.setPosition(73+190, c.getGlobalPositionY(), c.getWidth(), c.getHeight());
	    for (c in ComboBoxDownArrows)
	        c.setPosition(73+190, c.getGlobalPositionY(), c.getWidth(), c.getHeight());	        
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

//Initialize GUI.

//Arpeggiator Controls

const var Button_ArpDisplay = Content.getComponent("Button_ArpDisplay");
const var Label_ArpDisplay = Content.getComponent("Label_ArpDisplay");

inline function onButton_ArpDisplayControl(component, value)
{
	Panel_FX.showControl(0);
	Button_AHDSRDisplay.setValue(0);
	Button_FXDisplay.setValue(0);
	Panel_Arp.showControl(value);
	Panel_AHDSR.showControl(0);
};

Content.getComponent("Button_ArpDisplay").setControlCallback(onButton_ArpDisplayControl);

Sampler_Loops.asSampler().enableRoundRobin(true);
Sampler_Loops2.asSampler().enableRoundRobin(true);
Sampler_Loops3.asSampler().enableRoundRobin(true);

var groupNum;

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

Content.getComponent("Button_CheckExpansion").setControlCallback(onButton_CheckExpansionControl);function onNoteOn()
{
    local e = Message.getNoteNumber();
    local v = Message.getVelocity();
    Console.print("Note: " + e);

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
        
        
        default:
    }
}
 function onNoteOff()
{
    local e = Message.getNoteNumber();    
    local num = Synth.getNumPressedKeys();   
    
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
            Sampler_Loops.asSampler().enableRoundRobin(false);
            Sampler_Loops.asSampler().setActiveGroup(1);
            restoreKeysDefault(e);
        break;
        
        case "Blackout2":
            Sampler_Loops.asSampler().enableRoundRobin(false);
            Sampler_Loops.asSampler().setActiveGroup(1);
            restoreKeysDefault(e);
        break;
        
        case "Portal":
            restoreKeysBlue(e);
            restoreKeysYellow(e);        
            Sampler_Loops.asSampler().enableRoundRobin(false);
            Sampler_Loops.asSampler().setActiveGroup(1);
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
        
        default:        
    }
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
 