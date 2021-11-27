Content.makeFrontInterface(570, 380);

include("CustomFunctions.js");
include("CustomExpansionLoading.js");
include("FXGUI.js");
include("Custom_ADSR.js");

colourKeysReset();

//Preset Browser

const var Button_OpenPresetBrowser = Content.getComponent("Button_OpenPresetBrowser");
const var FloatingTile_PresetBrowser = Content.getComponent("FloatingTile_PresetBrowser");

FloatingTile_PresetBrowser.showControl(0);

inline function onButton_OpenPresetBrowserControl(component, value)
{
	FloatingTile_PresetBrowser.showControl(value);
};

Content.getComponent("Button_OpenPresetBrowser").setControlCallback(onButton_OpenPresetBrowserControl);



//Initialize Expansions.

const var Button_SetSamplesFolder = Content.getComponent("Button_SetSamplesFolder");
const var Button_InstallLibrary = Content.getComponent("Button_InstallLibrary");
const var Button_CloseSetFolder = Content.getComponent("Button_CloseSetFolder");

const var expHandler = Engine.createExpansionHandler();
const var SamplerRR = Synth.getChildSynth("SamplerRR");
const var Sampler_NoRR = Synth.getChildSynth("Sampler_NoRR");
const var Sampler_Loops = Synth.getChildSynth("Sampler_Loops");

const var Sampler_LoopsPitchMod = Synth.getModulator("Sampler_LoopsPitchMod");

var currentExpansion = "";

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

//------------------------------------------------------------FX

const var Button_DriveTubeDriveEnable = Content.getComponent("Button_DriveTubeDriveEnable");

const var ShapeFX1 = Synth.getEffect("Shape FX1");
const var TubeDrive = Synth.getEffect("TubeDrive");
const var Filter1 = Synth.getEffect("Filter1");

//Tube Drive Bypass



//Initialize FX Display.


const var Button_FXDisplay = Content.getComponent("Button_FXDisplay");
const var Panel_FX = Content.getComponent("Panel_FX");

const var Panel_EQSettings = Content.getComponent("Panel_EQSettings");
const var Panel_CompSettings = Content.getComponent("Panel_CompSettings");
const var Panel_FilterSettings = Content.getComponent("Panel_FilterSettings");
const var Panel_DriveSettings = Content.getComponent("Panel_DriveSettings");
const var Panel_ReverbSettings = Content.getComponent("Panel_ReverbSettings");
const var Panel_DelaySettings = Content.getComponent("Panel_DelaySettings");
const var Panel_WidthSettings = Content.getComponent("Panel_WidthSettings");
const var Panel_PhaserSettings = Content.getComponent("Panel_PhaserSettings");
const var Panel_DegradeSettings = Content.getComponent("Panel_DegradeSettings");

const var Button_FilterSettings = Content.getComponent("Button_FilterSettings");
const var Button_EQSettings = Content.getComponent("Button_EQSettings");
const var Button_CompSettings = Content.getComponent("Button_CompSettings");
const var Button_DriveSettings = Content.getComponent("Button_DriveSettings");
const var Button_ReverbSettings = Content.getComponent("Button_ReverbSettings");
const var Button_DelaySettings = Content.getComponent("Button_DelaySettings");
const var Button_WidthSettings = Content.getComponent("Button_WidthSettings");
const var Button_PhaserSettings = Content.getComponent("Button_PhaserSettings");
const var Button_DegradeSettings = Content.getComponent("Button_DegradeSettings");

const var ComboBox_DriveOversample1 = Content.getComponent("ComboBox_DriveOversample1");
const var ComboBox_FilterMode = Content.getComponent("ComboBox_FilterMode");

inline function onButton_FXDisplayControl(component, value)
{
    Button_AHDSRDisplay.setValue(0);
    Panel_Arp.showControl(0);
    Button_ArpDisplay.setValue(0);
	Panel_AHDSR.showControl(0);
    Panel_FX.showControl(value);
};

Content.getComponent("Button_FXDisplay").setControlCallback(onButton_FXDisplayControl);





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
	    Arpeggiator_Loops.setAttribute(Arpeggiator_Loops.SpeedKnob, 8);
	    Button_LoopSpeedDouble.setValue(0);
    }
        else
    {
        Arpeggiator_Loops.setAttribute(Arpeggiator_Loops.SpeedKnob, 11);
    }    
};

Content.getComponent("Button_LoopSpeedHalf").setControlCallback(onButton_LoopSpeedHalfControl);


inline function onButton_LoopSpeedDoubleControl(component, value)
{
	    if (value)
    {
	    Arpeggiator_Loops.setAttribute(Arpeggiator_Loops.SpeedKnob, 14);
	    Button_LoopSpeedHalf.setValue(0);
    }
        else
    {
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
        }
	    break;
    }
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
 