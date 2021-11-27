Content.makeFrontInterface(570, 300);

//Initialize Expansions.

const var expHandler = Engine.createExpansionHandler();

const var Sampler1 = Synth.getChildSynth("Sampler1");


//Expansion Selection Buttons.

const var Expansions_ButtonEXP1 = Content.getComponent("Expansions_ButtonEXP1");
const var Expansions_ButtonEXP2 = Content.getComponent("Expansions_ButtonEXP2");
const var Expansions_ButtonEXP3 = Content.getComponent("Expansions_ButtonEXP3");


inline function onExpansions_ButtonEXP1Control(component, value)
{
    Engine.setCurrentExpansion("Cloudburst");
    Sampler1.asSampler().loadSampleMap("{EXP::Cloudburst}Cloudburst_SampleMap");

};

Content.getComponent("Expansions_ButtonEXP1").setControlCallback(onExpansions_ButtonEXP1Control);


inline function onExpansions_ButtonEXP2Control(component, value)
{
    Engine.setCurrentExpansion("Bloom");
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
	    Button_OpenExpansions.setPosition(200, 270, 47, 28);
	    Viewport_ExpansionsHolder.showControl(true);	    
    }
	else
    {
	    Button_OpenExpansions.setPosition(5, 270, 47, 28);
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
 