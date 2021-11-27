Content.makeFrontInterface(570, 380);

//Initialize Expansions.

const var expHandler = Engine.createExpansionHandler();
const var SamplerRR = Synth.getChildSynth("SamplerRR");
const var Sampler_NoRR = Synth.getChildSynth("Sampler_NoRR");

Sampler_NoRR.asSampler().enableRoundRobin(false);

var backgroundImage = "";
var panelImage = "";

//Initialize Background Image.

const var Panel_BG = Content.getComponent("Panel_BG");
const var Image_BG = Content.getComponent("Image_BG");

Image_BG.setAlpha(0);

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


//Expansion Selection Buttons.

const var Expansions_ButtonCloudburst = Content.getComponent("Expansions_ButtonCloudburst");
const var Expansions_ButtonBloom = Content.getComponent("Expansions_ButtonBloom");
const var Expansions_ButtonAtlas = Content.getComponent("Expansions_ButtonAtlas");

//Cloudburst

inline function onExpansions_ButtonCloudburstControl(component, value)
{
    Engine.setCurrentExpansion("Cloudburst");
    //Put Stuff Under This
    backgroundImage = ("{EXP::Cloudburst}bg_cloudburst.png");
    Image_BG.setAlpha(1);
    Image_BG.set("fileName", backgroundImage);        
    SamplerRR.asSampler().loadSampleMap("{EXP::Cloudburst}Cloudburst_SampleMap");
};

Content.getComponent("Expansions_ButtonCloudburst").setControlCallback(onExpansions_ButtonCloudburstControl);

//Bloom

inline function onExpansions_ButtonBloomControl(component, value)
{
    Engine.setCurrentExpansion("Bloom");
    //Put Stuff Under This
    backgroundImage = ("{EXP::Bloom}bg_bloom.png");
    Image_BG.setAlpha(1);
    Image_BG.set("fileName", backgroundImage);            
    SamplerRR.asSampler().loadSampleMap("{EXP::Bloom}Bloom_SampleMap");
};

Content.getComponent("Expansions_ButtonBloom").setControlCallback(onExpansions_ButtonBloomControl);

//Atlas

const var ComboBox_Atlas = Content.getComponent("ComboBox_Atlas");

inline function onExpansions_ButtonAtlasControl(component, value)
{
	Engine.setCurrentExpansion("Bloom");
    //Put Stuff Under This
    backgroundImage = ("{EXP::Bloom}bg_bloom.png");
    Image_BG.setAlpha(1);
    Image_BG.set("fileName", backgroundImage);            
    //Sampler1.asSampler().loadSampleMap("{EXP::Bloom}Bloom_SampleMap");
};

Content.getComponent("Expansions_ButtonAtlas").setControlCallback(onExpansions_ButtonAtlasControl);


inline function onComboBox_AtlasControl(component, value)
{
	Sampler_NoRR.asSampler().setActiveGroup(value-1);
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
 