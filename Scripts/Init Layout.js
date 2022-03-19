//Main Interface

const var Panel_BG = Content.getComponent("Panel_BG");
const var Image_BG = Content.getComponent("Image_BG");

//Extra Image Panels

/*
These force the binary to include all of our images.
*/

const var extraImageContainer = Content.addPanel("Panel_ImageContainer", 999, 999);


const var extraImagePanels = [Content.getComponent("Panel_ImageLoader01"),
                              Content.getComponent("Panel_ImageLoader02"),
                              Content.getComponent("Panel_ImageLoader03"),
                              Content.getComponent("Panel_ImageLoader04"),
                              Content.getComponent("Panel_ImageLoader05"),
                              Content.getComponent("Panel_ImageLoader06"),
                              Content.getComponent("Panel_ImageLoader07"),
                              Content.getComponent("Panel_ImageLoader08"),
                              Content.getComponent("Panel_ImageLoader09"),
                              Content.getComponent("Panel_ImageLoader010"),
                              Content.getComponent("Panel_ImageLoader011"),
                              Content.getComponent("Panel_ImageLoader012"),
                              Content.getComponent("Panel_ImageLoader013"),
                              Content.getComponent("Panel_ImageLoader014"),
                              Content.getComponent("Panel_ImageLoader015"),
                              Content.getComponent("Panel_ImageLoader016"),
                              Content.getComponent("Panel_ImageLoader017")];

const var bgImageNames = ["{PROJECT_FOLDER}bg_achromic.jpg",
                          "{PROJECT_FOLDER}bg_aetheric.jpg",
                          "{PROJECT_FOLDER}bg_atlas.jpg",  
                          "{PROJECT_FOLDER}bg_blackout.jpg",
                          "{PROJECT_FOLDER}bg_blackout2.jpg",
                          "{PROJECT_FOLDER}bg_bloom.jpg",
                          "{PROJECT_FOLDER}bg_cloudburst.jpg",
                          "{PROJECT_FOLDER}bg_cloudburstacoustic.jpg",
                          "{PROJECT_FOLDER}bg_endure.jpg",
                          "{PROJECT_FOLDER}bg_foundkeys.jpg",
                          "{PROJECT_FOLDER}bg_gloom.jpg",
                          "{PROJECT_FOLDER}bg_machinetribes.jpg",
                          "{PROJECT_FOLDER}bg_oracle.jpg",
                          "{PROJECT_FOLDER}bg_oracle2.jpg",
                          "{PROJECT_FOLDER}bg_pdqbass.jpg",
                          "{PROJECT_FOLDER}bg_portal.jpg",                        
                          "{PROJECT_FOLDER}bg_prismatic.jpg"];

const var bgImagePrettyNames = [
                          "bg_achromic.jpg",
                          "bg_aetheric.jpg",
                          "bg_atlas.jpg",  
                          "bg_blackout.jpg",
                          "bg_blackout2.jpg",
                          "bg_bloom.jpg",
                          "bg_cloudburst.jpg",
                          "bg_cloudburstacoustic.jpg",
                          "bg_endure.jpg",
                          "bg_foundkeys.jpg",
                          "bg_gloom.jpg",
                          "bg_machinetribes.jpg",
                          "bg_oracle.jpg",
                          "bg_oracle2.jpg",
                          "bg_pdqbass.jpg",
                          "bg_portal.jpg",                        
                          "bg_prismatic.jpg"];


for (i=0; i<extraImagePanels.length; i++)
{
    extraImagePanels[i].loadImage(bgImageNames[i], bgImagePrettyNames[i]);

    extraImagePanels[i].setPaintRoutine(function(g)
    {
        g.drawImage(bgImagePrettyNames[i], [0, 0, this.getWidth(), this.getHeight()], 0, 0);
    });

    extraImagePanels[i].set("visible", false);
}

//Force Include Button Images (for MacOS)


const var extraButtonContainer = Content.addPanel("Panel_ButtonContainer", 999, 999);

const var extraButtonPanels = [Content.getComponent("Panel_ButtonLoader01"),
                              Content.getComponent("Panel_ButtonLoader02"),
                              Content.getComponent("Panel_ButtonLoader03"),
                              Content.getComponent("Panel_ButtonLoader04"),
                              Content.getComponent("Panel_ButtonLoader05"),
                              Content.getComponent("Panel_ButtonLoader06"),
                              Content.getComponent("Panel_ButtonLoader07"),
                              Content.getComponent("Panel_ButtonLoader08"),
                              Content.getComponent("Panel_ButtonLoader09"),
                              Content.getComponent("Panel_ButtonLoader010"),
                              Content.getComponent("Panel_ButtonLoader011"),
                              Content.getComponent("Panel_ButtonLoader012"),
                              Content.getComponent("Panel_ButtonLoader013"),
                              Content.getComponent("Panel_ButtonLoader014"),
                              Content.getComponent("Panel_ButtonLoader015"),
                              Content.getComponent("Panel_ButtonLoader016"),
                              Content.getComponent("Panel_ButtonLoader017")];

const var buttonImageNames = ["{PROJECT_FOLDER}Achromic_button.jpg",
                          "{PROJECT_FOLDER}Aetheric_button.jpg",
                          "{PROJECT_FOLDER}Atlas_button.jpg",  
                          "{PROJECT_FOLDER}Blackout_button.jpg",
                          "{PROJECT_FOLDER}Blackout2_button.jpg",
                          "{PROJECT_FOLDER}Bloom_button.jpg",
                          "{PROJECT_FOLDER}Cloudburst_button.jpg",
                          "{PROJECT_FOLDER}CloudburstAcoustic_button.jpg",
                          "{PROJECT_FOLDER}Endure_button.jpg",
                          "{PROJECT_FOLDER}FoundKeys_button.jpg",
                          "{PROJECT_FOLDER}Gloom_button.jpg",
                          "{PROJECT_FOLDER}MachineTribes_button.jpg",
                          "{PROJECT_FOLDER}Oracle_button.jpg",
                          "{PROJECT_FOLDER}Oracle2_button.jpg",
                          "{PROJECT_FOLDER}PDQBass_button.jpg",
                          "{PROJECT_FOLDER}Portal_button.jpg",                        
                          "{PROJECT_FOLDER}Prismatic_button.jpg"];

const var buttonImagePrettyNames = [
                          "Achromic_button.jpg",
                          "Aetheric_button.jpg",
                          "Atlas_button.jpg",  
                          "Blackout_button.jpg",
                          "Blackout2_button.jpg",
                          "Bloom_button.jpg",
                          "Cloudburst_button.jpg",
                          "CloudburstAcoustic_button.jpg",
                          "Endure_button.jpg",
                          "FoundKeys_button.jpg",
                          "Gloom_button.jpg",
                          "MachineTribes_button.jpg",
                          "Oracle_button.jpg",
                          "Oracle2_button.jpg",
                          "PDQBass_button.jpg",
                          "Portal_button.jpg",                        
                          "Prismatic_button.jpg"];


for (i=0; i<extraButtonPanels.length; i++)
{
    extraButtonPanels[i].loadImage(buttonImageNames[i], buttonImagePrettyNames[i]);

    extraButtonPanels[i].setPaintRoutine(function(g)
    {
        g.drawImage(buttonImagePrettyNames[i], [0, 0, this.getWidth(), this.getHeight()], 0, 0);
    });

    //extraButtonPanels[i].set("visible", true);
}

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
