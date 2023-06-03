//Main Interface

const var Panel_BG = Content.getComponent("Panel_BG");
const var Image_BG = Content.getComponent("Image_BG");

//Interface Extras

const var pageButtonWidth = 120;
const var pageButtonHeight = 24;
const var padding = 6;

//Keyboard

const var FloatingTile_Keyboard = Content.getComponent("FloatingTile_Keyboard");

var keyboardOctave = 0;
var keyboardLowKey = 0;
var keyboardHighKey = 120;

const var pageButtonListTop = [NEATPlayerSettings.Button_CustomSettings, Button_AddLibrary, Button_OpenPresetBrowser];
const var pageButtonListBottom = [libraryHandler.Button_OpenExpansions, Button_SampleDisplay, Button_FXDisplay, Button_ArpDisplay, Button_MoveDisplay];

const var samplerRandomizationButtons = [Content.getComponent("Button_RandomizeSamplerAAttack"),
                                         Content.getComponent("Button_RandomizeSamplerADecay"),
                                         Content.getComponent("Button_RandomizeSamplerASustain"),
                                         Content.getComponent("Button_RandomizeSamplerARelease"),
                                         Content.getComponent("Button_RandomizeSamplerAPitchCoarse"),
                                         Content.getComponent("Button_RandomizeSamplerAPitchFine"),
                                         Content.getComponent("Button_RandomizeSamplerAPan"),
                                         Content.getComponent("Button_RandomizeSamplerAGain")];

//Extra Keyboard Stuff

FloatingTile_Keyboard.setContentData({
    "Type": "Keyboard",
    "KeyWidth": 12.0,
    "DisplayOctaveNumber": false,
    "LowKey": 12,
    "HiKey": 120,
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

//Dynamic Zoom Panel

const var Panel_ResizeGUI = Content.getComponent("Panel_ResizeGUI");
Panel_ResizeGUI.setControlCallback(onPanel_ResizeGUIControl);

Panel_ResizeGUI.data.colour = Colours.grey;

inline function onPanel_ResizeGUIControl(component, value)
{
    Settings.setZoomLevel(value);
}

Panel_ResizeGUI.setPaintRoutine(function(g)
{
    g.setColour(this.data.colour);
    g.drawLine(this.getWidth() - 4, this.getWidth() - 4, 12, this.getHeight() - 4, 2.0);
    g.drawLine(12, this.getWidth() - 4, this.getHeight() - 4, this.getHeight() - 4, 2.0);

    g.drawLine(this.getWidth() - 8, this.getWidth() - 8, 16, this.getHeight() - 8, 2.0);
    g.drawLine(16, this.getWidth() - 8, this.getHeight() - 8, this.getHeight() - 8, 2.0);
});

Panel_ResizeGUI.setMouseCallback(function(event) {
   
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
        var p1 = 1 + 1 / (this.data.width * 16) * event.dragX;
        var p2 = 1 + 1 / (this.data.height * 16) * event.dragY;
        this.setValue(Math.range(p1 * p2, .4, 1.5));
        this.changed();
    }

    if (event.hover)
        this.data.colour = Colours.lightgrey;
    else
        this.data.colour = Colours.grey;
    
    this.repaint();
});

//Open Shop

const var Button_OpenShop = Content.getComponent("Button_OpenShop");

inline function onButton_OpenShopControl(component, value)
{
    if(value)
        Engine.openWebsite("https://www.iamlamprey.com");
};

Content.getComponent("Button_OpenShop").setControlCallback(onButton_OpenShopControl);

Button_OpenShop.set("tooltip", "Opens a browser window to the Shop.");