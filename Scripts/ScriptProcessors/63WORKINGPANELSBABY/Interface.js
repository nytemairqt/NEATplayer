Content.makeFrontInterface(570, 380);

include("CustomFunctions.js");
include("CustomExpansionLoading.js");
include("FXGUI.js");
include("Custom_ADSR.js");
include("ArpeggiatorScript.js");

colourKeysReset();

const var syncTimes = ["1/1", "1/2D", "1/2", "1/2T", "1/4D", "1/4", "1/4T", "1/8D", "1/8", "1/8T", "1/16D", "1/16", "1/16T", "1/32D", "1/32", "1/32T", "1/64D", "1/64", "1/64T"];

//Initialize Expansions.

const var Button_SetSamplesFolder = Content.getComponent("Button_SetSamplesFolder");
const var Button_InstallLibrary = Content.getComponent("Button_InstallLibrary");
const var Button_CloseSetFolder = Content.getComponent("Button_CloseSetFolder");

const var expHandler = Engine.createExpansionHandler();
const var SamplerRR = Synth.getChildSynth("SamplerRR");
const var Sampler_NoRR = Synth.getChildSynth("Sampler_NoRR");
const var Sampler_Loops = Synth.getChildSynth("Sampler_Loops");

const var Sampler_LoopsPitchMod = Synth.getModulator("Sampler_LoopsPitchMod");

var currentExpansion; 

const var expansionNames = [];

expansionNames.push("No Expansion");

for (e in expHandler.getExpansionList())
    expansionNames.push(e.getProperties().Name);

//Populate Expansion List TEST    

  
inline function createPanel(name, x, y)
{
    // Create a panel and store it as local variable
    // It just passes the function arguments to the actual create method
    local widget = Content.addPanel(name, x, y);
    
    Content.setPropertiesFromJSON(name, {
        "width": 185,
        "height": 55,
        "opaque": true,
        "isMomentary": true,
        "parentComponent": "Panel_ExpansionsItemHolder",
        "allowCallbacks": "Clicks & Hover"
    });
    
    widget.data.alphaValue = 1.0;

    return widget;
};

const var expButton = [];
    
for (i=1; i<expansionNames.length; i++)
{
    //Console.print(expansionNames[i] + ": " + i);
    expButton[i] = createPanel("expButton_" + expansionNames[i], 2, (i*55) - 52); 
    expButton[i].loadImage("{PROJECT_FOLDER}" + expansionNames[i] + "_button_base.png", "panel_" + expansionNames[i]); 
    expButton[i].data.imagefile = "panel_" + expansionNames[i]; 
    expButton[i].data.expansionName = expansionNames[i];
    expButton[i].setPaintRoutine(function(g) 
    {
        g.drawImage(this.data.imagefile, [0, 0, 185, 55], 0, 0); 
    });
    
    expButton[i].setMouseCallback(function(event)
    {
        if (event.clicked)
        {
            expHandler.setCurrentExpansion(this.data.expansionName);   
            load+this.data.expansionName;
        }
    });
};

currentExpansion = expHandler.getCurrentExpansion();
//currentExpansion = currentExpansion.getProperties(currentExpansion.Name);
currentExpansion = currentExpansion.Name;

Sampler_NoRR.asSampler().enableRoundRobin(false);

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

const var ComboBox_Atlas = Content.getComponent("ComboBox_Atlas");

ComboBox_Atlas.set("visible", 0);

//Expansion Selection Buttons.

const var Expansions_ButtonCloudburst = Content.getComponent("Expansions_ButtonCloudburst");
const var Expansions_ButtonBloom = Content.getComponent("Expansions_ButtonBloom");
const var Expansions_ButtonAtlas = Content.getComponent("Expansions_ButtonAtlas");
const var Expansions_ButtonBlackout = Content.getComponent("Expansions_ButtonBlackout");

inline function onComboBox_AtlasControl(component, value)
{
	Sampler_NoRR.asSampler().setActiveGroup(value);
};

Content.getComponent("ComboBox_Atlas").setControlCallback(onComboBox_AtlasControl);


//Expansion Selection Navigation.

const var Viewport_ExpansionsHolder = Content.getComponent("Viewport_ExpansionsHolder");
const var Panel_ExpansionsItemHolder = Content.getComponent("Panel_ExpansionsItemHolder");

const var Button_OpenExpansions = Content.getComponent("Button_OpenExpansions");


inline function onButton_OpenExpansionsControl(component, value)
{
    if (value)
    {
	    Button_OpenExpansions.setPosition(210, 272, 47, 28);
	    Panel_BG.setPosition(200,23,568,273);
	    Viewport_ExpansionsHolder.showControl(true);	    
    }
	else
    {
        Panel_BG.setPosition(2,23,568,273);
	    Button_OpenExpansions.setPosition(11, 272, 47, 28);
	    Viewport_ExpansionsHolder.showControl(false);
    }
};

Content.getComponent("Button_OpenExpansions").setControlCallback(onButton_OpenExpansionsControl);

//Initialize GUI.

const var Button_LoopSpeedHalf = Content.getComponent("Button_LoopSpeedHalf");
const var Button_LoopSpeedDouble = Content.getComponent("Button_LoopSpeedDouble");
const var Label_LoopSpeedHalf = Content.getComponent("Label_LoopSpeedHalf");
const var Label_LoopSpeedDouble = Content.getComponent("Label_LoopSpeedDouble");

//Loop Controls

const var Arpeggiator_Loops = Synth.getMidiProcessor("Arpeggiator_Loops");


inline function onButton_LoopSpeedHalfControl(component, value)
{
    if (value)
    {
        loopSpeed = 2;
	    Arpeggiator_Loops.setAttribute(Arpeggiator_Loops.SpeedKnob, 8);
	    Button_LoopSpeedDouble.setValue(0);
    }
        else
    {
        loopSpeed = 1;
        Arpeggiator_Loops.setAttribute(Arpeggiator_Loops.SpeedKnob, 11);
    }    
};

Content.getComponent("Button_LoopSpeedHalf").setControlCallback(onButton_LoopSpeedHalfControl);


inline function onButton_LoopSpeedDoubleControl(component, value)
{
	    if (value)
    {
        loopSpeed = .5;
	    Arpeggiator_Loops.setAttribute(Arpeggiator_Loops.SpeedKnob, 14);
	    Button_LoopSpeedHalf.setValue(0);
    }
        else
    {
        loopSpeed = 1;
        Arpeggiator_Loops.setAttribute(Arpeggiator_Loops.SpeedKnob, 11);
    }
};

Content.getComponent("Button_LoopSpeedDouble").setControlCallback(onButton_LoopSpeedDoubleControl);


//Arpeggiator Controls

const var Button_ArpDisplay = Content.getComponent("Button_ArpDisplay");
const var Panel_Arp = Content.getComponent("Panel_Arp");


inline function onButton_ArpDisplayControl(component, value)
{
	Panel_FX.showControl(0);
	Button_AHDSRDisplay.setValue(0);
	Button_FXDisplay.setValue(0);
	Panel_Arp.showControl(value);
	Panel_AHDSR.showControl(0);
};

Content.getComponent("Button_ArpDisplay").setControlCallback(onButton_ArpDisplayControl);

Sampler_Loops.asSampler().enableRoundRobin(false);

var groupNum;
reg note = [];
var loopSpeed = 1;
var num;

var LoopPlayer = Engine.createTimerObject();

var bpm = Engine.getHostBpm();
var quarterNote = 60000 / bpm;
var finalPlaybackRate = Math.round(quarterNote);

LoopPlayer.setTimerCallback(function()
{
    for (i=0; i<num; i++)
        {
            Synth.playNote(note[i], 127);
        }
    if (groupNum < 16)
    {
        groupNum++;
        Sampler_Loops.asSampler().setActiveGroup(groupNum);
    }
    else
    {
        groupNum = 1;
    }    
});

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
        
        case "Bloom":
            loadBloom();
            break;
        
        case "Cloudburst":
            loadCloudburst();
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

function onNoteOn()
{
    local e = Message.getNoteNumber();
    //Console.print(e);
    //Nested switch statement to select expansion, then select specific note played.
	switch (currentExpansion)
    {
        case "Blackout":    
        //NOTE: All loops are 110BPM and root C.
	    switch (Message.getNoteNumber())
        {      
	        case 43:
	        Sampler_LoopsPitchMod.setIntensity(-5.0);
	        colourKeysBlackoutPitch();
            Engine.setKeyColour(43, 0xFF64EFFF);
	        break;
	        
	        case 44:
	        Sampler_LoopsPitchMod.setIntensity(-4.0);
	        colourKeysBlackoutPitch();
            Engine.setKeyColour(44, 0xFF1B9AA9);	        
	        break;
	        
	        case 45:
	        Sampler_LoopsPitchMod.setIntensity(-3.0);
	        colourKeysBlackoutPitch();
            Engine.setKeyColour(45, 0xFF64EFFF);	        
	        break;
	        
	        case 46:
	        Sampler_LoopsPitchMod.setIntensity(-2.0);
	        colourKeysBlackoutPitch();
            Engine.setKeyColour(46, 0xFF1B9AA9);	        
	        break;	        
            
	        case 47:
	        Sampler_LoopsPitchMod.setIntensity(-1.0);
	        colourKeysBlackoutPitch();
            Engine.setKeyColour(47, 0xFF64EFFF);	        
	        break;
	        
	        case 48:
	        Sampler_LoopsPitchMod.setIntensity(0.0);
	        colourKeysBlackoutPitch();
            Engine.setKeyColour(48, 0xFF64EFFF);	        
	        break;
	        
	        case 49: 
	        Sampler_LoopsPitchMod.setIntensity(1.0);
	        colourKeysBlackoutPitch();
            Engine.setKeyColour(49, 0xFF1B9AA9);	        
	        break;
	        
	        case 50: 
	        Sampler_LoopsPitchMod.setIntensity(2.0);
	        colourKeysBlackoutPitch();
            Engine.setKeyColour(50, 0xFF64EFFF);	        
	        break;
	        
	        case 51: 
	        Sampler_LoopsPitchMod.setIntensity(3.0);
	        colourKeysBlackoutPitch();
            Engine.setKeyColour(51, 0xFF1B9AA9);	        
	        break;
	        
	        case 52: 
	        Sampler_LoopsPitchMod.setIntensity(4.0);
	        colourKeysBlackoutPitch();
            Engine.setKeyColour(52, 0xFF64EFFF);	        
	        break;	        
	        
	        case 53: 
	        Sampler_LoopsPitchMod.setIntensity(5.0);
	        colourKeysBlackoutPitch();
            Engine.setKeyColour(53, 0xFF64EFFF);	        
	        break;
	        
            
            default:
        }
        
        if (Message.getNoteNumber() >= 60 && Message.getNoteNumber() <= 90)
        {
            bpm = Engine.getHostBpm();
            quarterNote = 60000 / bpm;
            finalPlaybackRate = Math.round(quarterNote);
            num = Synth.getNumPressedKeys();

            Console.print("_______________________________");
            Console.print("Pressed Keys: " + num);        
            
            for (i=0; i<num; i++)
            {
                note.push(Message.getNoteNumber());
                Console.print("Key " + (i+1) + ": " + note[i]);
            }
            LoopPlayer.startTimer(finalPlaybackRate * loopSpeed);
        }
        
	    break;
    }
}
 function onNoteOff()
{
	switch (currentExpansion)
    {
        case "Blackout":
            if (Synth.getNumPressedKeys() < 2)
            {
                LoopPlayer.stopTimer();
                groupNum = 1;
                note.clear();
            }
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
 