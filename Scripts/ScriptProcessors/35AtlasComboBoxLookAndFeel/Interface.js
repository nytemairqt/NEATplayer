Content.makeFrontInterface(570, 380);

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

// Setup the expansion list in the combobox

const var expansionNames = [];

expansionNames.push("No Expansion");

for(e in expHandler.getExpansionList())
    expansionNames.push(e.getProperties().Name);
    

    
const var ExpansionSelector = Content.getComponent("ExpansionSelector");
ExpansionSelector.set("items", expansionNames.join("\n"));

const var Panel_BG = Content.getComponent("Panel_BG");
const var Image_BG = Content.getComponent("Image_BG");

Image_BG.setAlpha(0);

const var ComboBox_Atlas = Content.getComponent("ComboBox_Atlas");

ComboBox_Atlas.set("visible", 0);

//Expansion Selection Buttons.

const var Expansions_ButtonCloudburst = Content.getComponent("Expansions_ButtonCloudburst");
const var Expansions_ButtonBloom = Content.getComponent("Expansions_ButtonBloom");
const var Expansions_ButtonAtlas = Content.getComponent("Expansions_ButtonAtlas");

//Cloudburst

inline function onExpansions_ButtonCloudburstControl(component, value)
{
    Engine.setCurrentExpansion("Cloudburst");
    currentExpansion = "Cloudburst";
    //Put Stuff Under This
    backgroundImage = ("{EXP::Cloudburst}bg_cloudburst.png");
    Image_BG.setAlpha(1);
    Image_BG.set("fileName", backgroundImage);  
    ComboBox_Atlas.set("visible", 0);
    SamplerRR.setAttribute(12, 0);
    Sampler_NoRR.setAttribute(12, 1);       
    SamplerRR.setBypassed(1-value);
    Sampler_NoRR.setBypassed(value);    
    SamplerRR.asSampler().loadSampleMap("{EXP::Cloudburst}Cloudburst_SampleMap");
    //Engine.loadUserPreset("{EXP::Cloudburst}_init");
};

Content.getComponent("Expansions_ButtonCloudburst").setControlCallback(onExpansions_ButtonCloudburstControl);

//Bloom

inline function onExpansions_ButtonBloomControl(component, value)
{
    Engine.setCurrentExpansion("Bloom");
    currentExpansion = "Bloom";
    //Put Stuff Under This
    backgroundImage = ("{EXP::Bloom}bg_bloom.png");
    Image_BG.setAlpha(1);
    Image_BG.set("fileName", backgroundImage);  
    ComboBox_Atlas.set("visible", 0);
    SamplerRR.setAttribute(12, 0);
    Sampler_NoRR.setAttribute(12, 1);    
    SamplerRR.setBypassed(1-value);
    Sampler_NoRR.setBypassed(value);    
    SamplerRR.asSampler().loadSampleMap("{EXP::Bloom}Bloom_SampleMap");
    //Engine.loadUserPreset("{EXP::Bloom}_init");
};

Content.getComponent("Expansions_ButtonBloom").setControlCallback(onExpansions_ButtonBloomControl);

//Atlas

inline function onExpansions_ButtonAtlasControl(component, value)
{
	Engine.setCurrentExpansion("Atlas");
	currentExpansion = "Atlas";
    //Put Stuff Under This
    backgroundImage = ("{EXP::Atlas}bg_atlas.png");
    Image_BG.setAlpha(1);
    Image_BG.set("fileName", backgroundImage);     
    ComboBox_Atlas.set("visible", 1);
    SamplerRR.setBypassed(value);
    SamplerRR.setAttribute(12, 1);
    Sampler_NoRR.setAttribute(12, 0);
    Sampler_NoRR.setBypassed(1-value);
    Sampler_NoRR.asSampler().loadSampleMap("{EXP::Atlas}Atlas_SampleMap");
};

Content.getComponent("Expansions_ButtonAtlas").setControlCallback(onExpansions_ButtonAtlasControl);


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
	Panel_AHDSR.showControl(0);
    //ComboBox_Atlas.showControl(0);
    Panel_FX.showControl(value);
};

Content.getComponent("Button_FXDisplay").setControlCallback(onButton_FXDisplayControl);

//Individual FX Pages.

//EQ.

inline function onButton_EQSettingsControl(component, value)
{
	Panel_EQSettings.showControl(value);
};

Content.getComponent("Button_EQSettings").setControlCallback(onButton_EQSettingsControl);

//Compressor.

inline function onButton_CompSettingsControl(component, value)
{
	Panel_CompSettings.showControl(value);
};

Content.getComponent("Button_CompSettings").setControlCallback(onButton_CompSettingsControl);

//Filter.


inline function onButton_FilterSettingsControl(component, value)
{
    Panel_FilterSettings.showControl(value);
};

Content.getComponent("Button_FilterSettings").setControlCallback(onButton_FilterSettingsControl);


inline function onComboBox_FilterModeControl(component, value)
{
	Filter1.setAttribute(Filter1.Mode, value+5);
};

Content.getComponent("ComboBox_FilterMode").setControlCallback(onComboBox_FilterModeControl);


//Drive


inline function onButton_DriveSettingsControl(component, value)
{
	Panel_DriveSettings.showControl(value);
};

Content.getComponent("Button_DriveSettings").setControlCallback(onButton_DriveSettingsControl);


inline function onComboBox_DriveOversample1Control(component, value)
{
	TubeDrive.setAttribute(TubeDrive.Oversample, value-1);
};

Content.getComponent("ComboBox_DriveOversample1").setControlCallback(onComboBox_DriveOversample1Control);

inline function onButton_DriveTubeDriveEnableControl(component, value)
{
	ShapeFX1.setBypassed(1-value);
	TubeDrive.setBypassed(1-value);
};

Content.getComponent("Button_DriveTubeDriveEnable").setControlCallback(onButton_DriveTubeDriveEnableControl);


//Reverb

inline function onButton_ReverbSettingsControl(component, value)
{
	Panel_ReverbSettings.showControl(value);
};

Content.getComponent("Button_ReverbSettings").setControlCallback(onButton_ReverbSettingsControl);

//Delay

const var Delay1 = Synth.getEffect("Delay1");
const var Button_DelayLink = Content.getComponent("Button_DelayLink");
const var Button_DelaySync = Content.getComponent("Button_DelaySync");
const var Slider_DelayTimeLeftSynced = Content.getComponent("Slider_DelayTimeLeftSynced");
const var Slider_DelayTimeRightSynced = Content.getComponent("Slider_DelayTimeRightSynced");
const var Slider_DelayTimeLeftFree = Content.getComponent("Slider_DelayTimeLeftFree");
const var Slider_DelayTimeRightFree = Content.getComponent("Slider_DelayTimeRightFree");
const var Slider_DelayFeedbackLeft = Content.getComponent("Slider_DelayFeedbackLeft");
const var Slider_DelayFeedbackRight = Content.getComponent("Slider_DelayFeedbackRight");





//Syncing Sliders


inline function onSlider_DelayTimeLeftSyncedControl(component, value)
{
    Delay1.setAttribute(Delay1.DelayTimeLeft, value);    
	if (Button_DelayLink.getValue())
    {
        Slider_DelayTimeRightSynced.setValue(value);
        Slider_DelayTimeRightSynced.changed();      
    };
};

Content.getComponent("Slider_DelayTimeLeftSynced").setControlCallback(onSlider_DelayTimeLeftSyncedControl);

inline function onSlider_DelayTimeRightSyncedControl(component, value)
{
    Delay1.setAttribute(Delay1.DelayTimeRight, value);    
	if (Button_DelayLink.getValue())
    {
        Slider_DelayTimeLeftSynced.setValue(value);
        Slider_DelayTimeLeftSynced.changed();       
    };
    
};

Content.getComponent("Slider_DelayTimeRightSynced").setControlCallback(onSlider_DelayTimeRightSyncedControl);

inline function onSlider_DelayTimeLeftFreeControl(component, value)
{
    Delay1.setAttribute(Delay1.DelayTimeLeft, value);    
	if (Button_DelayLink.getValue())
    {
        Slider_DelayTimeRightFree.setValue(value);
        Slider_DelayTimeRightFree.changed();    
    };
};

Content.getComponent("Slider_DelayTimeLeftFree").setControlCallback(onSlider_DelayTimeLeftFreeControl);

inline function onSlider_DelayTimeRightFreeControl(component, value)
{
    Delay1.setAttribute(Delay1.DelayTimeRight, value);    
	if (Button_DelayLink.getValue())
    {
        Slider_DelayTimeLeftFree.setValue(value);
        Slider_DelayTimeLeftFree.changed();      
    };
};

Content.getComponent("Slider_DelayTimeRightFree").setControlCallback(onSlider_DelayTimeRightFreeControl);


inline function onSlider_DelayFeedbackLeftControl(component, value)
{
    Delay1.setAttribute(Delay1.FeedbackLeft, value);    
	if (Button_DelayLink.getValue())
    {
        Slider_DelayFeedbackRight.setValue(value);
        Slider_DelayFeedbackRight.changed();      
    };
};

Content.getComponent("Slider_DelayFeedbackLeft").setControlCallback(onSlider_DelayFeedbackLeftControl);

inline function onSlider_DelayFeedbackRightControl(component, value)
{
    Delay1.setAttribute(Delay1.FeedbackRight, value);    
	if (Button_DelayLink.getValue())
    {
        Slider_DelayFeedbackLeft.setValue(value);
        Slider_DelayFeedbackLeft.changed();      
    };
};

Content.getComponent("Slider_DelayFeedbackRight").setControlCallback(onSlider_DelayFeedbackRightControl);

inline function onButton_DelaySyncControl(component, value)
{
    Delay1.setAttribute(Delay1.TempoSync, value); 
    
    if (value)
    {
        Slider_DelayTimeLeftSynced.setValue(Delay1.getAttribute(Delay1.DelayTimeLeft));
        Slider_DelayTimeRightSynced.setValue(Delay1.getAttribute(Delay1.DelayTimeRight));    
    }
    else 
    {
        Slider_DelayTimeLeftFree.setValue(Delay1.getAttribute(Delay1.DelayTimeLeft));
        Slider_DelayTimeRightFree.setValue(Delay1.getAttribute(Delay1.DelayTimeRight));    
    };
    Slider_DelayTimeLeftSynced.set("visible", value);
    Slider_DelayTimeRightSynced.set("visible", value);
    Slider_DelayTimeLeftFree.set("visible", 1-value);
    Slider_DelayTimeRightFree.set("visible", 1-value);
    
    
};

Content.getComponent("Button_DelaySync").setControlCallback(onButton_DelaySyncControl);


inline function onButton_DelaySettingsControl(component, value)
{
	Panel_DelaySettings.showControl(value);
};

Content.getComponent("Button_DelaySettings").setControlCallback(onButton_DelaySettingsControl);

//Width

inline function onButton_WidthSettingsControl(component, value)
{
	Panel_WidthSettings.showControl(value);
};

Content.getComponent("Button_WidthSettings").setControlCallback(onButton_WidthSettingsControl);

//Phaser

inline function onButton_PhaserSettingsControl(component, value)
{
	Panel_PhaserSettings.showControl(value);
};

Content.getComponent("Button_PhaserSettings").setControlCallback(onButton_PhaserSettingsControl);

//Degrade

inline function onButton_DegradeSettingsControl(component, value)
{
	Panel_DegradeSettings.showControl(value);
};

Content.getComponent("Button_DegradeSettings").setControlCallback(onButton_DegradeSettingsControl);


//Initialize AHDSR Display.

const var Button_AHDSRDisplay = Content.getComponent("Button_AHDSRDisplay");
const var Panel_AHDSR = Content.getComponent("Panel_AHDSR");

const var AHDSREnvelope1 = Synth.getModulator("AHDSR Envelope1");
const var AHDSREnvelope2 = Synth.getModulator("AHDSR Envelope2");

const var AHDSRDisplay = Content.getComponent("AHDSRDisplay");

const var Slider_Attack = Content.getComponent("Slider_Attack");
const var Slider_Decay = Content.getComponent("Slider_Decay");
const var Slider_Sustain = Content.getComponent("Slider_Sustain");
const var Slider_Release = Content.getComponent("Slider_Release");

const var Label_Attack = Content.getComponent("Label_Attack");
const var Label_Decay = Content.getComponent("Label_Decay");
const var Label_Sustain = Content.getComponent("Label_Sustain");
const var Label_Release = Content.getComponent("Label_Release");

const var Label_AttackValue = Content.getComponent("Label_AttackValue");
const var Label_DecayValue = Content.getComponent("Label_DecayValue");
const var Label_SustainValue = Content.getComponent("Label_SustainValue");
const var Label_ReleaseValue = Content.getComponent("Label_ReleaseValue");

Label_AttackValue.set("text", AHDSREnvelope1.getAttribute(AHDSREnvelope1.Attack));
Label_DecayValue.set("text", AHDSREnvelope1.getAttribute(AHDSREnvelope1.Decay));
Label_SustainValue.set("text", AHDSREnvelope1.getAttribute(AHDSREnvelope1.Sustain));
Label_ReleaseValue.set("text", AHDSREnvelope1.getAttribute(AHDSREnvelope1.Release));


inline function onButton_AHDSRDisplayControl(component, value)
{
	Panel_AHDSR.showControl(value);
	Panel_FX.showControl(0);
	switch (currentExpansion)
    {
        case "Atlas":
	    ComboBox_Atlas.showControl(1);
	    break;
	    
	    case "Bloom":
	    ComboBox_Atlas.showControl(0);
	    break;
	    
	    case "Cloudburst":
	    ComboBox_Atlas.showControl(0);
	    break;	    
    }
};

Content.getComponent("Button_AHDSRDisplay").setControlCallback(onButton_AHDSRDisplayControl);


inline function onSlider_AttackControl(component, value)
{
    AHDSREnvelope1.setAttribute(AHDSREnvelope1.Attack, value);
    AHDSREnvelope2.setAttribute(AHDSREnvelope1.Attack, value);
	Label_AttackValue.set("text", value);
};

Content.getComponent("Slider_Attack").setControlCallback(onSlider_AttackControl);


inline function onSlider_DecayControl(component, value)
{
    AHDSREnvelope1.setAttribute(AHDSREnvelope1.Decay, value);
    AHDSREnvelope2.setAttribute(AHDSREnvelope1.Decay, value);
	Label_DecayValue.set("text", value);
};

Content.getComponent("Slider_Decay").setControlCallback(onSlider_DecayControl);


inline function onSlider_SustainControl(component, value)
{
    AHDSREnvelope1.setAttribute(AHDSREnvelope1.Sustain, value);
    AHDSREnvelope2.setAttribute(AHDSREnvelope1.Sustain, value);
	Label_SustainValue.set("text", value);
};

Content.getComponent("Slider_Sustain").setControlCallback(onSlider_SustainControl);


inline function onSlider_ReleaseControl(component, value)
{
    AHDSREnvelope1.setAttribute(AHDSREnvelope1.Release, value);
    AHDSREnvelope2.setAttribute(AHDSREnvelope1.Release, value);
	Label_ReleaseValue.set("text", value);
};

Content.getComponent("Slider_Release").setControlCallback(onSlider_ReleaseControl);

Engine.setCurrentExpansion(currentExpansion);

//Initialize GUI.
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
 