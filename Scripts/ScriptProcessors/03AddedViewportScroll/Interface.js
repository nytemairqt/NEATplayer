Content.makeFrontInterface(570, 300);

//Expansion Selection Panel.

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
 