Content.makeFrontInterface(570, 380);

include("CustomFunctions.js");
include("ArpeggiatorScript.js");
include("CustomExpansionLoading.js");
include("FXGUI.js");
include("Custom_ADSR.js");
include("loadingBar.js");


colourKeysReset();
Engine.loadAudioFilesIntoPool();

const var syncTimes = ["1/1", "1/2D", "1/2", "1/2T", "1/4D", "1/4", "1/4T", "1/8D", "1/8", "1/8T", "1/16D", "1/16", "1/16T", "1/32D", "1/32", "1/32T", "1/64D", "1/64", "1/64T"];

//Initialize Expansions.

const var Button_SetSamplesFolder = Content.getComponent("Button_SetSamplesFolder");
const var Button_InstallLibrary = Content.getComponent("Button_InstallLibrary");
const var Button_CloseSetFolder = Content.getComponent("Button_CloseSetFolder");

const var expHandler = Engine.createExpansionHandler();
const var SamplerRR = Synth.getChildSynth("SamplerRR");
const var Sampler_NoRR = Synth.getChildSynth("Sampler_NoRR");
const var Sampler_NoRR2 = Synth.getChildSynth("Sampler_NoRR2");
const var Sampler_Loops = Synth.getChildSynth("Sampler_Loops");
const var Sampler_Other = Synth.getChildSynth("Sampler_Other");

Sampler_NoRR.asSampler().enableRoundRobin(false);
Sampler_NoRR2.asSampler().enableRoundRobin(false);
Sampler_Other.asSampler().enableRoundRobin(false);

const var Sampler_NoRRGain = Synth.getEffect("Sampler_NoRRGain");
const var Sampler_NoRR2Gain = Synth.getEffect("Sampler_NoRR2Gain");
const var Sampler_NoRR2MicVolume = Synth.getEffect("Sampler_NoRR2MicVolume");
const var Sampler_NoRRMicVolume = Synth.getEffect("Sampler_NoRRMicVolume");

const var Sampler_LoopsPitchMod = Synth.getModulator("Sampler_LoopsPitchMod");

const var Panel_MicControl = Content.getComponent("Panel_MicControl");
const var Slider_GainMic1 = Content.getComponent("Slider_GainMic1");
const var Slider_GainMic2 = Content.getComponent("Slider_GainMic2");
const var Label_Mic1Value = Content.getComponent("Label_Mic1Value");
const var Label_Mic2Value = Content.getComponent("Label_Mic2Value");

inline function onSlider_GainMic1Control(component, value)
{
	Sampler_NoRRMicVolume.setAttribute(Sampler_NoRRMicVolume.Gain, value);
	Label_Mic1Value.set("text", Math.round(value) + "dB");
};

Content.getComponent("Slider_GainMic1").setControlCallback(onSlider_GainMic1Control);

inline function onSlider_GainMic2Control(component, value)
{
    Sampler_NoRR2MicVolume.setAttribute(Sampler_NoRR2MicVolume.Gain, value);
	Label_Mic2Value.set("text", Math.round(value) + "dB");
};

Content.getComponent("Slider_GainMic2").setControlCallback(onSlider_GainMic2Control);



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

const var ComboBox_OraclePickup = Content.getComponent("ComboBox_OraclePickup");
const var ComboBox_Atlas = Content.getComponent("ComboBox_Atlas");
const var ComboBox_Aetheric1 = Content.getComponent("ComboBox_Aetheric1");
const var ComboBox_Aetheric2 = Content.getComponent("ComboBox_Aetheric2");

ComboBox_Atlas.set("visible", 0);

//Custom ComboBoxes

inline function onComboBox_AtlasControl(component, value)
{
	Sampler_NoRR.asSampler().setActiveGroup(value);
};

Content.getComponent("ComboBox_Atlas").setControlCallback(onComboBox_AtlasControl);


inline function onComboBox_OraclePickupControl(component, value)
{
	Sampler_NoRR.asSampler().setActiveGroup(value);
};

Content.getComponent("ComboBox_OraclePickup").setControlCallback(onComboBox_OraclePickupControl);


inline function onComboBox_Aetheric1Control(component, value)
{
	Sampler_NoRR.asSampler().setActiveGroup(value);
};

Content.getComponent("ComboBox_Aetheric1").setControlCallback(onComboBox_Aetheric1Control);

inline function onComboBox_Aetheric2Control(component, value)
{
	Sampler_NoRR2.asSampler().setActiveGroup(value);
};

Content.getComponent("ComboBox_Aetheric2").setControlCallback(onComboBox_Aetheric2Control);


//Expansion Selection Navigation.

const var Viewport_ExpansionsHolder = Content.getComponent("Viewport_ExpansionsHolder");


const var Button_OpenExpansions = Content.getComponent("Button_OpenExpansions");


inline function onButton_OpenExpansionsControl(component, value)
{
    if (value)
    {
	    Button_OpenExpansions.setPosition(200, 272, 47, 28);
	    Panel_BG.setPosition(192,23,568,273);
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


//Arpeggiator Controls

const var Button_ArpDisplay = Content.getComponent("Button_ArpDisplay");
const var Panel_Arp = Content.getComponent("Panel_Arp");
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

//Sampler_Loops.asSampler().enableRoundRobin(false);
Sampler_Loops.asSampler().enableRoundRobin(true);

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
        
        case "Bloom":
            loadBloom();
            break;
        
        case "Cloudburst":
            loadCloudburst();
            break;
    
        case "Oracle":
            loadOracle();
            break;
            
        case "Aetheric":
            loadAetheric();
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
    Console.print(e);
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
            Message.ignoreEvent(e);
	        break;
	        
	        case 44:
	        Sampler_LoopsPitchMod.setIntensity(-4.0);
	        colourKeysBlackoutPitch();
            Engine.setKeyColour(44, 0xFF1B9AA9);
            Message.ignoreEvent(e);
	        break;
	        
	        case 45:
	        Sampler_LoopsPitchMod.setIntensity(-3.0);
	        colourKeysBlackoutPitch();
            Engine.setKeyColour(45, 0xFF64EFFF);
            Message.ignoreEvent(e);
	        break;
	        
	        case 46:
	        Sampler_LoopsPitchMod.setIntensity(-2.0);
	        colourKeysBlackoutPitch();
            Engine.setKeyColour(46, 0xFF1B9AA9);
            Message.ignoreEvent(e);
	        break;	        
            
	        case 47:
	        Sampler_LoopsPitchMod.setIntensity(-1.0);
	        colourKeysBlackoutPitch();
            Engine.setKeyColour(47, 0xFF64EFFF);
            Message.ignoreEvent(e);
	        break;
	        
	        case 48:
	        Sampler_LoopsPitchMod.setIntensity(0.0);
	        colourKeysBlackoutPitch();
            Engine.setKeyColour(48, 0xFF64EFFF);
            Message.ignoreEvent(e);
	        break;
	        
	        case 49: 
	        Sampler_LoopsPitchMod.setIntensity(1.0);
	        colourKeysBlackoutPitch();
            Engine.setKeyColour(49, 0xFF1B9AA9);
            Message.ignoreEvent(e);
	        break;
	        
	        case 50: 
	        Sampler_LoopsPitchMod.setIntensity(2.0);
	        colourKeysBlackoutPitch();
            Engine.setKeyColour(50, 0xFF64EFFF);
            Message.ignoreEvent(e);
	        break;
	        
	        case 51: 
	        Sampler_LoopsPitchMod.setIntensity(3.0);
	        colourKeysBlackoutPitch();
            Engine.setKeyColour(51, 0xFF1B9AA9);
            Message.ignoreEvent(e);
	        break;
	        
	        case 52: 
	        Sampler_LoopsPitchMod.setIntensity(4.0);
	        colourKeysBlackoutPitch();
            Engine.setKeyColour(52, 0xFF64EFFF);
            Message.ignoreEvent(e);
	        break;	        
	        
	        case 53: 
	        Sampler_LoopsPitchMod.setIntensity(5.0);
	        colourKeysBlackoutPitch();
            Engine.setKeyColour(53, 0xFF64EFFF);
            Message.ignoreEvent(e);
	        break;
	        
            
            default:
        }
        
        if (Message.getNoteNumber() >= 60 && Message.getNoteNumber() <= 90)
        {
            Sampler_Loops.asSampler().enableRoundRobin(true);
        }
        
	    break;
    }
}
 function onNoteOff()
{
	switch (currentExpansion)
    {
        case "Blackout":
        Sampler_Loops.asSampler().enableRoundRobin(false);
        Sampler_Loops.asSampler().setActiveGroup(1);
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
 