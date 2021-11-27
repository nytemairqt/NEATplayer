Content.makeFrontInterface(570, 300);

//Expansion Selection Panel.

const var Panel_ExpansionSelector = Content.getComponent("Panel_ExpansionSelector");
const var Panel_ExpansionsItemHolder = Content.getComponent("Panel_ExpansionsItemHolder");

/*Scroll wheel logic
    On scroll wheel
    internal panel y += 40 * scrol wheel direction;
    
    
Y bar logic
    on Y bar clicked
        internal panel = y position

        
        have to add range functionality so they dont clip past the first lib
*/

const var Button_ExpansionsUp = Content.getComponent("Button_ExpansionsUp");
const var Button_ExpansionsDown = Content.getComponent("Button_ExpansionsDown");
const var Button_OpenExpansions = Content.getComponent("Button_OpenExpansions");


inline function onButton_OpenExpansionsControl(component, value)
{
    if (value)
    {
	    Button_OpenExpansions.setPosition(200, 270, 47, 28);
        Panel_ExpansionSelector.showControl(true);
        Panel_ExpansionsItemHolder.showControl(true);
        Button_ExpansionsUp.showControl(true);
        Button_ExpansionsDown.showControl(true);
    }
	else
    {
	    Button_OpenExpansions.setPosition(5, 270, 47, 28);
        Panel_ExpansionSelector.showControl(false);
        Panel_ExpansionsItemHolder.showControl(false);
        Button_ExpansionsUp.showControl(false);
        Button_ExpansionsDown.showControl(false);        
    }
};

Content.getComponent("Button_OpenExpansions").setControlCallback(onButton_OpenExpansionsControl);


inline function onButton_ExpansionsUpControl(component, value)
{
    local p = Panel_ExpansionsItemHolder;
    local y = p.getGlobalPositionY();
	p.setPosition(5, y - 20, p.getWidth(), p.getHeight());
};

Content.getComponent("Button_ExpansionsUp").setControlCallback(onButton_ExpansionsUpControl);


inline function onButton_ExpansionsDownControl(component, value)
{
    local p = Panel_ExpansionsItemHolder;
    local y = p.getGlobalPositionY();
	p.setPosition(5, y + 20, p.getWidth(), p.getHeight());
};

Content.getComponent("Button_ExpansionsDown").setControlCallback(onButton_ExpansionsDownControl);


Panel_ExpansionSelector.setPaintRoutine(function(g)
{
   g.fillAll(Colours.black);
});
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
 