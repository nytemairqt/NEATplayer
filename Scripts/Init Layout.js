//Main Interface

const var Panel_BG = Content.getComponent("Panel_BG");
const var Image_BG = Content.getComponent("Image_BG");

//Interface Extras

const var pageButtonWidth = 120;
const var pageButtonHeight = 24;
const var padding = 6;

//Keyboard

const var FloatingTile_Keyboard = Content.getComponent("FloatingTile_Keyboard");
const var FloatingTile_ResourceUsage = Content.getComponent("FloatingTile_ResourceUsage");

var keyboardOctave = 0;
var keyboardLowKey = 0;
var keyboardHighKey = 128;

//To be deleted...

const var Button_Zoom = Content.getComponent("Button_Zoom");

const var Button_KeyboardOctaveUp = Content.getComponent("Button_KeyboardOctaveUp");
const var Button_KeyboardOctaveDown = Content.getComponent("Button_KeyboardOctaveDown");

const var Label_KeyboardOctave = Content.getComponent("Label_KeyboardOctave");

const var pageButtonListTop = [Button_CustomSettings, Button_AddLibrary, Button_OpenPresetBrowser];
const var pageButtonListBottom = [Button_OpenExpansions, Button_SampleDisplay, Button_FXDisplay, Button_ArpDisplay, Button_MoveDisplay];

const var Label_PageArray = [Content.getComponent("Label_CustomSettingsButton"),
                             Content.getComponent("Label_AddLibrary"),
                             Content.getComponent("Label_OpenPresetBrowser"),
                             Content.getComponent("Label_OpenExpansions"),
                             Content.getComponent("Label_SamplePage"),
                             Content.getComponent("Label_FXPage"),
                             Content.getComponent("Label_ArpDisplay"),
                             Content.getComponent("Label_MoveDisplay")];

const var samplerRandomizationButtons = [Content.getComponent("Button_RandomizeSamplerAAttack"),
                                         Content.getComponent("Button_RandomizeSamplerADecay"),
                                         Content.getComponent("Button_RandomizeSamplerASustain"),
                                         Content.getComponent("Button_RandomizeSamplerARelease"),
                                         Content.getComponent("Button_RandomizeSamplerAPitchCoarse"),
                                         Content.getComponent("Button_RandomizeSamplerAPitchFine"),
                                         Content.getComponent("Button_RandomizeSamplerAPan"),
                                         Content.getComponent("Button_RandomizeSamplerAGain")];

//Position Keyboard

inline function positionKeyboard()
{
	local x = frontInterfaceWidth / 2 - FloatingTile_Keyboard.getWidth() / 2;
	local y = frontInterfaceHeight - FloatingTile_Keyboard.getHeight(); 
	
	FloatingTile_Keyboard.setPosition(x, y, FloatingTile_Keyboard.getWidth(), 60);
}

//Position Buttons

inline function positionButtons()
{
	for (p = 0; p<pageButtonListTop.length; p++)
	{
		pageButtonListTop[p].setPosition((padding * p) + pageButtonWidth * p+1, 3, pageButtonWidth, pageButtonHeight);
	}
	
	for (p = 0; p<pageButtonListBottom.length; p++)
	{
		local totalWidth  = pageButtonListBottom.length * pageButtonWidth + padding;
		local x = frontInterfaceWidth / 2 - totalWidth / 2 - padding;
		
		pageButtonListBottom[p].setPosition(x + (pageButtonWidth * p) + (padding * p), FloatingTile_Keyboard.getGlobalPositionY() - pageButtonHeight - padding, pageButtonWidth, pageButtonHeight);
	}
}

//Position Main Panel

var panelBGPos = [padding, pageButtonHeight + 6, frontInterfaceWidth - padding, 460];
var panelBGPosOffset = [195, pageButtonHeight + padding, frontInterfaceWidth - padding, 460];

inline function positionPanelBG(offset)
{
	
	local y = pageButtonListTop[0].getGlobalPositionY() + pageButtonHeight + padding;
	local w = frontInterfaceWidth - padding; 
	local h = pageButtonListBottom[0].getGlobalPositionY() - (pageButtonHeight + padding * 2);
	

	if (offset)
	{
		Panel_BG.setPosition(195, y, w, h);
	}
	
	else
	{
		Panel_BG.setPosition(padding / 2, y, w, h);
	}
	
	FloatingTile_PresetBrowser.setPosition(Panel_BG.get("x"), Panel_BG.get("y"), Panel_BG.get("width"), Panel_BG.get("height"));
}

//Panels

inline function positionMainPanels()
{
	local x = 0;
	local y = 0;
	local w = Panel_BG.getWidth();
	local h = Panel_BG.getHeight();
	
	Panel_Sample.setPosition(x, y, w, h);
	
	FloatingTile_ResourceUsage.setPosition(Panel_BG.get("width") - FloatingTile_ResourceUsage.get("width"), 0, 180, 30);
	
	FloatingTile_ResourceUsage.set("FontSize", 13);
}

inline function positionExtraPanels()
{
    Panel_CustomSettings.setPosition(Panel_BG.get("x") - 2, Panel_BG.get("y") - 2, Panel_BG.get("width") + 4, Panel_BG.get("height") + 4);    
    //Panel_InstallLibraries.setPosition(Panel_BG.get("x") - 2, Panel_BG.get("y") - 2, Panel_BG.get("width") + 4, Panel_BG.get("height") + 4);    
}

//Position Labels

inline function positionLabels()
{
	Label_PageArray[0].setPosition(pageButtonListTop[0].getGlobalPositionX() + padding, pageButtonListTop[0].getGlobalPositionY() + padding, pageButtonWidth - padding * 2, pageButtonHeight - padding * 2);
	Label_PageArray[1].setPosition(pageButtonListTop[1].getGlobalPositionX() + padding, pageButtonListTop[1].getGlobalPositionY() + padding, pageButtonWidth - padding * 2, pageButtonHeight - padding * 2);
	Label_PageArray[2].setPosition(pageButtonListTop[2].getGlobalPositionX() + padding, pageButtonListTop[2].getGlobalPositionY() + padding, pageButtonWidth - padding * 2, pageButtonHeight - padding * 2);
	
	Label_PageArray[3].setPosition(pageButtonListBottom[0].getGlobalPositionX() + padding, pageButtonListBottom[0].getGlobalPositionY() + padding, pageButtonWidth - padding * 2, pageButtonHeight - padding * 2);
	Label_PageArray[4].setPosition(pageButtonListBottom[1].getGlobalPositionX() + padding, pageButtonListBottom[1].getGlobalPositionY() + padding, pageButtonWidth - padding * 2, pageButtonHeight - padding * 2);
	Label_PageArray[5].setPosition(pageButtonListBottom[2].getGlobalPositionX() + padding, pageButtonListBottom[2].getGlobalPositionY() + padding, pageButtonWidth - padding * 2, pageButtonHeight - padding * 2);
	Label_PageArray[6].setPosition(pageButtonListBottom[3].getGlobalPositionX() + padding, pageButtonListBottom[3].getGlobalPositionY() + padding, pageButtonWidth - padding * 2, pageButtonHeight - padding * 2);
	Label_PageArray[7].setPosition(pageButtonListBottom[4].getGlobalPositionX() + padding, pageButtonListBottom[4].getGlobalPositionY() + padding, pageButtonWidth - padding * 2, pageButtonHeight - padding * 2);
}

//Position AppData Button

inline function positionAppDataButton()
{
	local x = pageButtonListTop[2].getGlobalPositionX() + pageButtonWidth + padding;
	local y = pageButtonListTop[2].getGlobalPositionY() + padding / 2;
	local w = pageButtonHeight * 1.25;
	local h = pageButtonHeight * .9;

	Button_OpenAppData.setPosition(x, y, w, h);	
}


//Extra Keyboard Stuff

Label_KeyboardOctave.set("text", keyboardOctave);
FloatingTile_Keyboard.setContentData({
    "Type": "Keyboard",
    "KeyWidth": 13.0,
    "DisplayOctaveNumber": true,
    "LowKey": 0,
    "HiKey": 127,
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

//Dynamic Zoom Panel

/*
const var Knob1 = Content.getComponent("Knob1");

inline function onKnob1Control(component, value)
{
	Engine.setZoomLevel(value);
};

Content.getComponent("Knob1").setControlCallback(onKnob1Control);

const var Panel1 = Content.getComponent("Panel1");
Panel1.setControlCallback(onPanel1Control);

inline function onPanel1Control(component, value)
{
    Knob1.setValue(value);
    Knob1.changed();
}

Panel1.setPaintRoutine(function(g)
{
    g.fillAll(Colours.black);
    
    if (this.data.inTheZone)
    {
        g.setColour(Colours.white);
        g.fillTriangle([this.getWidth() - 30, this.getHeight() - 30, 30, 30], Math.PI / 10);
    }
});

Panel1.setMouseCallback(function(event) {
   
    if (event.x >= this.getWidth() - 30 && event.y >= this.getHeight() - 30)
    {        
        if (event.clicked)
        {
            this.data.resizing = true;
            this.data.width = this.getWidth();
            this.data.height = this.getHeight();
        }
        
        this.data.inTheZone = true;
    }
    else
    {
        this.data.inTheZone = false;
    }

    if (event.mouseUp)
        this.data.resizing = false;
    
    if (this.data.resizing)
    {
        var p1 = 1 + 1 / this.data.width * event.dragX;
        var p2 = 1 + 1 / this.data.height * event.dragY;
        this.setValue(Math.range(p1 * p2, 0, 1));
        this.changed();
    }
    
    this.repaint();
});
*/