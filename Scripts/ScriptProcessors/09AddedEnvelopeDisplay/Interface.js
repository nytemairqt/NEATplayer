Content.makeFrontInterface(570, 380);

//Initialize Expansions.

const var expHandler = Engine.createExpansionHandler();
const var Sampler1 = Synth.getChildSynth("Sampler1");

var backgroundImage = "";
var panelImage = "";

//Initialize Background Image.

const var Panel_BG = Content.getComponent("Panel_BG");
const var Image_BG = Content.getComponent("Image_BG");

Image_BG.setAlpha(0);

//Initialize AHDSR Display.

const var AHDSRDisplay = Content.getComponent("AHDSRDisplay");







//Expansion Selection Buttons.

const var Expansions_ButtonEXP1 = Content.getComponent("Expansions_ButtonEXP1");
const var Expansions_ButtonEXP2 = Content.getComponent("Expansions_ButtonEXP2");
const var Expansions_ButtonEXP3 = Content.getComponent("Expansions_ButtonEXP3");

inline function onExpansions_ButtonEXP1Control(component, value)
{
    Engine.setCurrentExpansion("Cloudburst");
    //Put Stuff Under This
    backgroundImage = ("{EXP::Cloudburst}bg_cloudburst.png");
    Image_BG.setAlpha(1);
    Image_BG.set("fileName", backgroundImage);        
    Sampler1.asSampler().loadSampleMap("{EXP::Cloudburst}Cloudburst_SampleMap");
};

Content.getComponent("Expansions_ButtonEXP1").setControlCallback(onExpansions_ButtonEXP1Control);


inline function onExpansions_ButtonEXP2Control(component, value)
{
    Engine.setCurrentExpansion("Bloom");
    //Put Stuff Under This
    backgroundImage = ("{EXP::Bloom}bg_bloom.png");
    Image_BG.setAlpha(1);
    Image_BG.set("fileName", backgroundImage);            
    Sampler1.asSampler().loadSampleMap("{EXP::Bloom}Bloom_SampleMap");
};

Content.getComponent("Expansions_ButtonEXP2").setControlCallback(onExpansions_ButtonEXP2Control);

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
 