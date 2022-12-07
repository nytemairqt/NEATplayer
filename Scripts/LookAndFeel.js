//LAF Setup

const laf = Engine.createGlobalScriptLookAndFeel();

laf.loadImage("{PROJECT_FOLDER}randomizationButtonDice.png", "randomizationButtonDiceImage"); 
laf.loadImage("{PROJECT_FOLDER}randomizationVisibility.png", "randomizationButtonVisibilityImage"); 

laf.loadImage("{PROJECT_FOLDER}installSingleExpansionButton.png", "installSingleExpansionImage"); 
laf.loadImage("{PROJECT_FOLDER}installBulkExpansionButton.png", "bulkInstallImage"); 

laf.loadImage("{PROJECT_FOLDER}samplerShowADSRButtonOff.png", "samplerShowADSRButtonOff"); 
laf.loadImage("{PROJECT_FOLDER}samplerShowADSRButtonOn.png", "samplerShowADSRButtonOn"); 

/*

******KEEP AS BACKUP********

inline function reduced(obj, amount)
    {
        return [amount, amount, obj.area[2] - 2*amount, obj.area[3] - 2* amount];
    }
    
    var x = obj.area[0];
    var y = obj.area[1];
    var w = obj.area[2];
    var h = obj.area[3];
    
    var a = obj.area;

*/

const var path = Content.createPath();
include("LAFPathData.js");

Panel_BG.setPaintRoutine(function(g)
{
	 g.setColour(Colours.grey);
	 g.drawRoundedRectangle([0, 0, this.getWidth(), this.getHeight()], 4.0, 1.0);
	 //g.drawRoundedRectangle([Panel_BG.getGlobalPositionX(), Panel_BG.getGlobalPositionY() - 32, Panel_BG.getWidth() - 4, Panel_BG.getHeight() - 4], 2, 1);
});

//Slider Setup

const var sliderRing = Content.createPath();
const var sliderRing2 = Content.createPath();

sliderRing.loadFromData(ringData);

sliderRing2.startNewSubPath(0.5, 1.0);
sliderRing2.addArc([0.0, 0.0, 1.0, 1.0], -Math.PI*0.75, Math.PI * 0.75);

inline function reduced(obj, amount)
{
    return [amount, amount, obj.area[2] - 2*amount, obj.area[3] - 2* amount];
}

//Local LAF Rewrite

const var LAFButtonRandomize = Content.createLocalLookAndFeel();
const var LAFButtonUpdate = Content.createLocalLookAndFeel();
const var LAFButtonBypass = Content.createLocalLookAndFeel();
const var LAFButtonFXSettings = Content.createLocalLookAndFeel();
const var LAFButtonClose = Content.createLocalLookAndFeel();
const var LAFButtonCloseRandomizationPanel = Content.createLocalLookAndFeel();
const var LAFButtonOpenRandomizationPanel = Content.createLocalLookAndFeel();
const var LAFButtonChangePage = Content.createLocalLookAndFeel();
const var LAFButtonSetup = Content.createLocalLookAndFeel();
const var LAFButtonInstallLibrary = Content.createLocalLookAndFeel();
const var LAFButtonBulkInstall = Content.createLocalLookAndFeel();
const var LAFButtonRandomizeVisibility = Content.createLocalLookAndFeel();
const var LAFArpResetButton = Content.createLocalLookAndFeel();
const var LAFArpInvertButton = Content.createLocalLookAndFeel();
const var LAFArpMinorButton = Content.createLocalLookAndFeel();
const var LAFArpMajorButton = Content.createLocalLookAndFeel();
const var LAFButtonAppData = Content.createLocalLookAndFeel();
const var LAFButtonUpArrow = Content.createLocalLookAndFeel();
const var LAFButtonDownArrow = Content.createLocalLookAndFeel();
const var LAFButtonSamplerBypass = Content.createLocalLookAndFeel();
const var LAFButtonSamplerShowADSR = Content.createLocalLookAndFeel();
const var LAFButtonSamplerLoop = Content.createLocalLookAndFeel();
const var LAFButtonSamplerReverse = Content.createLocalLookAndFeel();
const var LAFButtonSettingsCogwheel = Content.createLocalLookAndFeel();

const var LAFSliderMain = Content.createLocalLookAndFeel();
const var LAFSliderPan = Content.createLocalLookAndFeel();
const var LAFSliderOutputGain = Content.createLocalLookAndFeel();
const var LAFSliderPDQBassVel = Content.createLocalLookAndFeel();
const var LAFSliderMovementX = Content.createLocalLookAndFeel();
const var LAFSliderMovementY = Content.createLocalLookAndFeel();
const var LAFSliderSampleOffset = Content.createLocalLookAndFeel();

const var LAFPresetBrowser = Content.createLocalLookAndFeel();

//Setup Image Loading

LAFButtonOpenRandomizationPanel.loadImage("{PROJECT_FOLDER}randomizationButtonDice.png", "randomizationButtonDiceImage"); 
LAFButtonRandomizeVisibility.loadImage("{PROJECT_FOLDER}randomizationVisibility.png", "randomizationButtonVisibilityImage"); 

LAFButtonInstallLibrary.loadImage("{PROJECT_FOLDER}installSingleExpansionButton.png", "installSingleExpansionImage"); 
LAFButtonBulkInstall.loadImage("{PROJECT_FOLDER}installBulkExpansionButton.png", "bulkInstallImage"); 

LAFButtonSamplerShowADSR.loadImage("{PROJECT_FOLDER}samplerShowADSRButtonOff.png", "samplerShowADSRButtonOff"); 
LAFButtonSamplerShowADSR.loadImage("{PROJECT_FOLDER}samplerShowADSRButtonOn.png", "samplerShowADSRButtonOn"); 

//BUTTONS

//Randomize Button

LAFButtonRandomize.registerFunction("drawToggleButton", function(g, obj)
{
    g.setColour(0xFF131313);
    g.fillRoundedRectangle(obj.area, 2);
    if (obj.value)       
		g.setColour(obj.over ? Colours.white : Colours.lightblue);
    else
    	g.setColour(obj.over ? Colours.grey : Colours.darkgrey);
    g.setFont("Arial", 10);
    g.drawAlignedText("R", obj.area, "centred");
});

//Update Button

LAFButtonUpdate.registerFunction("drawToggleButton", function(g, obj)
{
	Panel_PatchNotes.set("visible", obj.over);
    g.setColour(obj.over ? Colours.darkgrey : 0xFB111111);
    g.fillRoundedRectangle(obj.area, 2.0);        
    g.setColour(Colours.white);
    g.setFont("Arial", 14.0);
    g.drawAlignedText("Update", obj.area, "centred");
});

//Bypass Button

LAFButtonBypass.registerFunction("drawToggleButton", function(g, obj)
{
    g.setColour(Colours.grey);
    g.fillEllipse(obj.area);     
    if (obj.value)
    	g.setColour(obj.over ? Colours.lightgrey : Colours.lightblue);
    else 
    	g.setColour(obj.over ? Colours.grey : Colours.darkgrey);
    g.fillEllipse([obj.area[0]+1, obj.area[1]+1, obj.area[2]-2, obj.area[3]-2]);
});

//FX Settings Button

LAFButtonFXSettings.registerFunction("drawToggleButton", function(g, obj)
{
    g.setColour(0xFF0A0A0A);
    g.fillRoundedRectangle(obj.area, 4.0);
    if (obj.value)
		g.setColour(obj.over ? Colours.white : Colours.lightgrey);
    else
		g.setColour(obj.over ? Colours.grey : Colours.darkgrey);
    g.drawLine(0, 6, 0, 0, 1.0);
    g.drawLine(0, 0, 0, 6, 1.0);
    g.drawLine(obj.area[2], obj.area[2] - 6, 0, 0, 1.0);
    g.drawLine(obj.area[2], obj.area[2], 0, 6, 1.0);
    g.drawLine(0, 6, obj.area[3], obj.area[3], 1.0);
    g.drawLine(0, 0, obj.area[3], obj.area[3] - 6, 1.0);
    g.drawLine(obj.area[2], obj.area[2] - 6, obj.area[3], obj.area[3], 1.0);
    g.drawLine(obj.area[2], obj.area[2], obj.area[3], obj.area[3] - 6, 1.0);
});

//Close Button

LAFButtonClose.registerFunction("drawToggleButton", function(g, obj)
{
    if (obj.over)
        g.setColour(Colours.white);
    else
        g.setColour(Colours.lightgrey);
    g.setFont("Arial", 14.0);
    g.drawAlignedText("x", obj.area, "centred");    
});

//Close Randomization Panel Button

LAFButtonCloseRandomizationPanel.registerFunction("drawToggleButton", function(g, obj)
{
    g.setColour(0xFB111111);
    g.fillEllipse(obj.area);
    g.setColour(obj.over ? Colours.white : Colours.lightgrey);
    g.setFont("Arial", 14.0);
    g.drawAlignedText("x", obj.area, "centred");
});

//Open Randomization Panel Button

LAFButtonOpenRandomizationPanel.registerFunction("drawToggleButton", function(g, obj)
{
    g.setColour(0xFB111111);
    g.fillRoundedRectangle(obj.area, 2.0);
    g.drawImage("randomizationButtonDiceImage", [obj.area[0] + 2, obj.area[1] + 2, obj.area[2] - 4, obj.area[3] - 4], 0, 0); 
    if (obj.value)
		g.setColour(obj.over ? Colours.withAlpha(Colours.black, 0.05) : Colours.withAlpha(Colours.black, 0.0));  
    else
		g.setColour(obj.over ? Colours.withAlpha(Colours.black, 0.1) : Colours.withAlpha(Colours.black, 0.3));  
    g.fillRoundedRectangle(obj.area, 0);    
});

//Change Page Button

LAFButtonChangePage.registerFunction("drawToggleButton", function(g, obj)
{
    if (obj.value)
		g.setColour(Colours.darkgrey);
    else 
		g.setColour(obj.over ? Colours.darkgrey : 0xFB111111);
    g.fillRoundedRectangle(obj.area, 2.0);    
    g.setColour(Colours.white);
    g.setFont("Arial", 11.0);
    g.drawAlignedText(obj.text, obj.area, "centred");
});

//Setup Button

LAFButtonSetup.registerFunction("drawToggleButton", function(g, obj)
{
    if (obj.value)
    	g.setColour(Colours.darkgrey);        
    else
		g.setColour(obj.over ? Colours.darkgrey : 0xFB111111);
    g.fillRoundedRectangle(obj.area, 2.0); 
    g.setColour(Colours.white);
    g.setFont("Arial", 12.0);
    g.drawAlignedText(obj.text, obj.area, "centred");
});

//Library Install Button

LAFButtonInstallLibrary.registerFunction("drawToggleButton", function(g, obj)
{
    g.setColour(0xFB111111);
    g.fillRoundedRectangle(obj.area, 8.0);   
    g.drawImage("installSingleExpansionImage", obj.area, 0, 0);
    g.setColour(obj.over ? Colours.withAlpha(Colours.white, 0.03) : Colours.withAlpha(Colours.white, 0));
    g.fillRoundedRectangle(obj.area, 8.0);    
});

//Library Bulk Install Button

LAFButtonBulkInstall.registerFunction("drawToggleButton", function(g, obj)
{
    g.setColour(0xFB111111);
    g.fillRoundedRectangle(obj.area, 8.0);   
    g.drawImage("bulkInstallImage", obj.area, 0, 0);
    g.setColour(obj.over ? Colours.withAlpha(Colours.white, 0.03) : Colours.withAlpha(Colours.white, 0));
    g.fillRoundedRectangle(obj.area, 8.0);      
});

//Randomize Visibility Button

LAFButtonRandomizeVisibility.registerFunction("drawToggleButton", function(g, obj)
{
    g.setColour(0xFB111111);
    g.fillRoundedRectangle(obj.area, 3.0); 
    g.drawImage("randomizationButtonVisibilityImage", [obj.area[0] + 2, obj.area[1] + 2, obj.area[2] - 4, obj.area[3] - 4], 0, 0);
    if (obj.value)
		g.setColour(obj.over ? Colours.withAlpha(Colours.black, 0.05) : Colours.withAlpha(Colours.black, 0));
    else
    	g.setColour(obj.over ? Colours.withAlpha(Colours.black, 0.1) : Colours.withAlpha(Colours.black, 0.3));
    g.fillRoundedRectangle(obj.area, 0);    
});

//Arp Reset Button

LAFArpResetButton.registerFunction("drawToggleButton", function(g, obj)
{
    path.clear();
    path.loadFromData(arpResetButtonStrokeData);    
    g.setColour(obj.over ? Colours.white : Colours.lightgrey);
    g.drawPath(path, reduced(obj, 6.0), 3);
    path.clear();
    path.loadFromData(arpResetButtonFillData);        
    g.fillPath(path, [obj.area[0] + 4, obj.area[1] + 4, obj.area[2] - 14, obj.area[3] - 14]);    
});

//Arp Invert Button

LAFArpInvertButton.registerFunction("drawToggleButton", function(g, obj)
{
    var leftTrianglePosition = (obj.area[2] * 0.25) - (obj.area[2] * 0.2);
    var triangleWidth = (obj.area[2] / 3) / 2;
    var rightTrianglePosition = (obj.area[2] * 0.75) - (obj.area[2] * 0.2);
    var triangleYOffset = (obj.area[3] * 0.33) / 2;

	g.setColour(obj.over ? Colours.white : Colours.lightgrey);

    g.fillTriangle([leftTrianglePosition, 0 + triangleYOffset, obj.area[2] * 0.33, obj.area[3] * 0.33], Math.toRadians(0));
    g.drawLine(leftTrianglePosition + triangleWidth, leftTrianglePosition + triangleWidth, 10, obj.area[3] - 4, 2.0);

    g.fillTriangle([rightTrianglePosition, obj.area[3] * 0.66 - triangleYOffset, obj.area[2] / 3, obj.area[3] * 0.33], Math.toRadians(180));
    g.drawLine(rightTrianglePosition + triangleWidth, rightTrianglePosition + triangleWidth, triangleYOffset, obj.area[3] - 10, 2.0);    
});

//Arp Minor Button

LAFArpMinorButton.registerFunction("drawToggleButton", function(g, obj)
{
    path.clear();
    path.loadFromData(arpButtonMinor);    
    g.setColour(obj.over ? Colours.white : Colours.lightgrey);
    g.fillPath(path, obj.area);
    g.setColour(0xE4060606);               
    g.drawPath(path, obj.area, 1.0);    
});

//Arp Major Button

LAFArpMajorButton.registerFunction("drawToggleButton", function(g, obj)
{
    path.clear();
    path.loadFromData(arpButtonMajor);    
    g.setColour(obj.over ? Colours.white : Colours.lightgrey);
    g.fillPath(path, obj.area);
    g.setColour(0xE4060606);               
    g.drawPath(path, obj.area, 1.0);        
});

//AppData Button

LAFButtonAppData.registerFunction("drawToggleButton", function(g, obj)
{
	g.setColour(obj.over ? Colours.lightgrey : Colours.grey);
    path.clear();
    path.loadFromData(openAppDataFolderButtonFillDataBack);
    g.fillPath(path, [obj.area[0], obj.area[1], obj.area[2] - 6, obj.area[3] - 6]);
    path.clear();
    g.setColour(obj.over ? Colours.white : Colours.lightgrey);
    path.loadFromData(openAppDataFolderButtonFillDataFront);
    g.fillPath(path, [obj.area[0], obj.area[1] + 6, obj.area[2] - 6, obj.area[3] - 8]); 
});

//Up Arrow Button

LAFButtonUpArrow.registerFunction("drawToggleButton", function(g, obj)
{
	g.setColour(obj.over ? Colours.white : Colours.lightgrey);
    g.fillTriangle(obj.area, 0);    
});

//Down Arrow Button

LAFButtonDownArrow.registerFunction("drawToggleButton", function(g, obj)
{
    g.setColour(obj.over ? Colours.white : Colours.lightgrey);
    g.fillTriangle(obj.area, Math.toRadians(180));    
});

//Sampler Bypass Button

LAFButtonSamplerBypass.registerFunction("drawToggleButton", function(g, obj)
{
        if (obj.value)
            g.setColour(obj.over ? Colours.white : Colours.lightgrey);
        else
			g.setColour(obj.over ? Colours.grey : Colours.darkgrey);
        path.clear();
        path.loadFromData(samplerPowerButtonData);
        g.drawPath(path, [obj.area[0] + 2, obj.area[1] + 2, obj.area[2] - 4, obj.area[3] - 4], 2);
        g.drawLine(obj.area[2] / 2, obj.area[2] / 2, 0, obj.area[3] / 2, 2.0);    
});

//Sampler Show ADSR Button

LAFButtonSamplerShowADSR.registerFunction("drawToggleButton", function(g, obj)
{
    g.setColour(0xFB111111);
    g.fillRoundedRectangle(obj.area, 2.0);
    g.setColour(Colours.white);
    g.setFont("Arial", 8);
    if (obj.value)
    	g.drawAlignedText("WAVE", reduced(obj, 0.5), "centred");
    else 
    	g.drawAlignedText("ADSR", reduced(obj, 0.5), "centred");
    g.setColour(obj.over ? Colours.withAlpha(Colours.black, 0.05) : Colours.withAlpha(Colours.black, 0.00));
    g.fillRoundedRectangle(obj.area, 2.0);    
    g.setColour(Colours.lightgrey);
    g.drawRoundedRectangle(obj.area, 2.0, 1.0);    
});

//Sampler Reverse Button

LAFButtonSamplerReverse.registerFunction("drawToggleButton", function(g, obj)
{
    if (obj.value)
    {
		g.setColour(obj.over ? Colours.white : Colours.lightgrey);
		g.drawRoundedRectangle(obj.area, 2.0, .5);
        g.setColour(Colours.withAlpha(Colours.lightblue, 0.2));
        g.fillRoundedRectangle(obj.area, 2.0);
    }
    else
    {
		g.setColour(obj.over ? Colours.grey : Colours.darkgrey);
		g.drawRoundedRectangle(obj.area, 2.0, .5);
    }
    g.setColour(Colours.white);
    g.setFont("Arial", 9.0);
    g.drawAlignedText("REV", obj.area, "centred");      
});

//Settings Cogwheel Button

LAFButtonSettingsCogwheel.registerFunction("drawToggleButton", function(g, obj)
{
	g.setColour(obj.over ? Colours.darkgrey : 0xFB111111);
    g.fillRoundedRectangle(obj.area, 2.0);
    g.setColour(Colours.darkgrey);
    g.drawRoundedRectangle(obj.area, 2.0, 1.0);
    g.setColour(Colours.white);
    g.setFont("Arial", 14.0);
    g.drawAlignedText("Connection Settings", obj.area, "centred");    
});

//SLIDERS

//Slider Main

LAFSliderMain.registerFunction("drawRotarySlider", function(g, obj)
{
    var ringWidth = obj.area[2] / 16;    
    
    //background
    
    g.setColour(0x33000000);
    g.fillEllipse(reduced(obj, ringWidth * 2.0));
    
    //arc
    var sliderRing3 = Content.createPath();

    sliderRing3.startNewSubPath(0.0, 0.0);
    sliderRing3.startNewSubPath(1.0, 1.0);  

    var start = -Math.PI*0.75;

    //unfilled ring
    sliderRing3.addArc([0.0, 0.0, 1.0, 1.0], start, Math.max(start, start + Math.PI * 1.5 * obj.valueNormalized));
    g.setColour(obj.hover ? Colours.darkgrey : 0xFF262626);
    g.drawPath(sliderRing2, reduced(obj, ringWidth), ringWidth * 2);

    //filled ring
    g.setColour(obj.hover? Colours.white : Colours.lightblue);
    g.drawPath(sliderRing3, reduced(obj, ringWidth), ringWidth * (1.6));
    
    g.rotate((1.0 - (obj.valueNormalized - 0.02)) * -1.5 * Math.PI, [obj.area[2] / 2, obj.area[3] / 2]);  
    
    //Center Ellipse
        
    g.setColour(obj.hover ? 0xFF2C2C2C : 0xFF1C1C1C);
    g.fillEllipse(reduced(obj, obj.area[2] * .86));

    //value line

    g.setColour(Colours.lightgrey);    
    g.drawLine(obj.area[2] * .65, obj.area[2] * .83, obj.area[3] * .65, obj.area[3] * .83, 3);     
});

//Pan Slider (unused??)

LAFSliderPan.registerFunction("drawRotarySlider", function(g, obj) 
{
    //base
    g.setColour(obj.hover ? 0xFFc2c2c2 : 0xFFAAAAAA);
    g.fillRoundedRectangle([0, 0, obj.area[2], obj.area[3]], 1.0);
    
    g.setColour(0xFF333333);
    g.fillRoundedRectangle([(obj.area[2] * .95) * obj.valueNormalized - 1, 0, 6, obj.area[3]], 0);
    
    //value dragger
    g.setColour(Colours.grey);
    g.fillRoundedRectangle([(obj.area[2] * .95) * obj.valueNormalized, 0, 4, obj.area[3]], 0);
});

//Output Gain Slider

LAFSliderOutputGain.registerFunction("drawRotarySlider", function(g, obj)
{
    g.setColour(Colours.lightgrey);
    g.fillRoundedRectangle([(obj.area[2] * 0.98) * obj.valueNormalized, 0, 2, obj.area[3]], 2.0);    
    
    if (obj.clicked)
    {
		g.setColour(Colours.withAlpha(Colours.black, .3));
		g.fillRoundedRectangle([obj.area[0], obj.area[1], obj.area[2], obj.area[3]], 2.0);
		g.setColour(Colours.white);

		g.setFont("Arial", 12);
		g.drawAlignedText(Engine.doubleToString(Engine.getDecibelsForGainFactor(obj.valueNormalized), 2) + " dB", [obj.area[0], obj.area[1], obj.area[2], obj.area[3]], "centred");
    }
    
    g.setColour(obj.hover ? Colours.withAlpha(Colours.lightgrey, 1.0) : Colours.withAlpha(Colours.lightgrey, 0.6));
    g.drawRoundedRectangle(obj.area, 2.0, .6);
});

//PDQ Bass Velocity Slider

LAFSliderPDQBassVel.registerFunction("drawRotarySlider", function(g, obj)
{
    g.setColour(Colours.white);
    g.fillRoundedRectangle(obj.area, 2.0);
    g.setColour(0xFB111111);
    g.setFont("Arial", 12);
    g.drawAlignedText(Math.round(obj.value), obj.area, "centred");
});

//Movement X Slider

LAFSliderMovementX.registerFunction("drawRotarySlider", function(g, obj)
{
    g.setColour(0xFB111111);
    g.fillRoundedRectangle(obj.area, 4.0);
    g.setColour(Colours.darkgrey);
    g.drawRoundedRectangle(obj.area, 4.0, .75);
    g.setColour(Colours.lightgrey);
    g.drawRoundedRectangle([Math.range(obj.area[2] * obj.valueNormalized, 3, obj.area[2] - 6), obj.area[3] / 2 - 2, 6, 4], 1.0, 1.0);
});

//Movement Y Slider

LAFSliderMovementY.registerFunction("drawRotarySlider", function(g, obj)
{
    g.setColour(0xFB111111);
    g.fillRoundedRectangle(obj.area, 4.0);
    g.setColour(Colours.darkgrey);
    g.drawRoundedRectangle(obj.area, 4.0, .75);
    g.setColour(Colours.lightgrey);
    g.drawRoundedRectangle([obj.area[2] / 2 - 2, Math.range(obj.area[3] - obj.area[3] * obj.valueNormalized, 3, obj.area[3] - 6), 4, 6], 1.0, 1.0);
});

//Sample Offset Slider

LAFSliderSampleOffset.registerFunction("drawRotarySlider", function(g, obj)
{
    g.setColour(Colours.grey);
    g.drawRoundedRectangle(obj.area, 2.0, 1.0);
    g.setColour(Colours.lightblue);
    if (obj.hover)
    {
    	g.drawLine(obj.area[2] * obj.valueNormalized, obj.area[2] * obj.valueNormalized, 0, obj.area[3], 4.0);
        g.setColour(Colours.withAlpha(Colours.lightgrey, 0.04));
        g.fillRoundedRectangle(obj.area, 1.0);
    }
    else
    	g.drawLine(obj.area[2] * obj.valueNormalized, obj.area[2] * obj.valueNormalized, 0, obj.area[3], 1.0);
    g.setColour(0xB11A1A1A);        
    g.fillRoundedRectangle([0, 0, obj.area[2] * obj.valueNormalized, obj.area[3]], 2.0);
});

//Assigning LAF Functions

//Buttons

Button_OpenExpansions.setLocalLookAndFeel(LAFButtonChangePage);
Button_SampleDisplay.setLocalLookAndFeel(LAFButtonChangePage);
Button_FXDisplay.setLocalLookAndFeel(LAFButtonChangePage);
Button_ArpDisplay.setLocalLookAndFeel(LAFButtonChangePage);
Button_MoveDisplay.setLocalLookAndFeel(LAFButtonChangePage);

Button_InstallLibrary.setLocalLookAndFeel(LAFButtonInstallLibrary);
Button_BulkInstall.setLocalLookAndFeel(LAFButtonBulkInstall);

Button_CustomSettings.setLocalLookAndFeel(LAFButtonSetup);
Button_AddLibrary.setLocalLookAndFeel(LAFButtonSetup);
Button_OpenPresetBrowser.setLocalLookAndFeel(LAFButtonSetup);

Button_OpenAppData.setLocalLookAndFeel(LAFButtonAppData);

Button_UpdateAvailable.setLocalLookAndFeel(LAFButtonUpdate);

Button_RandomizationButtonsVisibility.setLocalLookAndFeel(LAFButtonRandomizeVisibility);
Button_OpenRandomizePanel.setLocalLookAndFeel(LAFButtonOpenRandomizationPanel);

Button_PortamentoBypass.setLocalLookAndFeel(LAFButtonBypass);
Button_ExclusiveReverse.setLocalLookAndFeel(LAFButtonBypass);

//Close Buttons

const var closeButtons = [Content.getComponent("Button_CloseCustomSettings"),
                          Content.getComponent("Button_CloseInstallPanel"),
                          Content.getComponent("Button_PresetBrowserClose"),
                          Content.getComponent("Button_CloseExpansions"),
                          Content.getComponent("Button_CloseSamplePanel"),
                          Content.getComponent("Button_CloseFXPanel"),
                          Content.getComponent("Button_CloseArpPanel"),
                          Content.getComponent("Button_CloseMovementPanel")];


for (c in closeButtons)
    c.setLocalLookAndFeel(LAFButtonClose);

Button_CloseRandomizationPanel.setLocalLookAndFeel(LAFButtonCloseRandomizationPanel);

//Sampler

Button_SamplerABypass.setLocalLookAndFeel(LAFButtonSamplerBypass);
Button_SamplerBBypass.setLocalLookAndFeel(LAFButtonSamplerBypass);
Button_SamplerCBypass.setLocalLookAndFeel(LAFButtonSamplerBypass);

Button_SamplerAShowADSR.setLocalLookAndFeel(LAFButtonSamplerShowADSR);
Button_SamplerBShowADSR.setLocalLookAndFeel(LAFButtonSamplerShowADSR);
Button_SamplerCShowADSR.setLocalLookAndFeel(LAFButtonSamplerShowADSR);

Button_SamplerAReverse.setLocalLookAndFeel(LAFButtonSamplerReverse);
Button_SamplerBReverse.setLocalLookAndFeel(LAFButtonSamplerReverse);
Button_SamplerCReverse.setLocalLookAndFeel(LAFButtonSamplerReverse);

Button_SamplerAComboBoxUp.setLocalLookAndFeel(LAFButtonUpArrow);
Button_SamplerAComboBoxDown.setLocalLookAndFeel(LAFButtonDownArrow);
Button_SamplerBComboBoxUp.setLocalLookAndFeel(LAFButtonUpArrow);
Button_SamplerBComboBoxDown.setLocalLookAndFeel(LAFButtonDownArrow);
Button_SamplerCComboBoxUp.setLocalLookAndFeel(LAFButtonUpArrow);
Button_SamplerCComboBoxDown.setLocalLookAndFeel(LAFButtonDownArrow);

for (r in randomizationButtonsSampler)
    r.setLocalLookAndFeel(LAFButtonRandomize);

//FX

for (f in listFXButtonsLeft)
    f.setLocalLookAndFeel(LAFButtonFXSettings);

for (f in listFXButtonsRight)
    f.setLocalLookAndFeel(LAFButtonFXSettings);

for (f in FXBypassButtons)
    f.setLocalLookAndFeel(LAFButtonSamplerBypass);

for (l in listRandomizationButtonsFXBypass)
    l.setLocalLookAndFeel(LAFButtonRandomize);

for (l in listRandomizationButtonsFX)
    l.setLocalLookAndFeel(LAFButtonRandomize);

Button_AmpCabBypass.setLocalLookAndFeel(LAFButtonBypass);
Button_AmpHQ.setLocalLookAndFeel(LAFButtonBypass);

Button_AmpComboBoxUp.setLocalLookAndFeel(LAFButtonUpArrow);
Button_AmpComboBoxDown.setLocalLookAndFeel(LAFButtonDownArrow);

Button_StutterLFOPreFX.setLocalLookAndFeel(LAFButtonBypass);
Button_StutterLFOSync.setLocalLookAndFeel(LAFButtonBypass);

Button_DelayLink.setLocalLookAndFeel(LAFButtonBypass);
Button_DelaySync.setLocalLookAndFeel(LAFButtonBypass);

//Arp

Button_ArpBypass.setLocalLookAndFeel(LAFButtonSamplerBypass);

Button_ArpNotesMinor.setLocalLookAndFeel(LAFArpMinorButton);
Button_ArpNotesMajor.setLocalLookAndFeel(LAFArpMajorButton);
Button_ArpNotesReset.setLocalLookAndFeel(LAFArpResetButton);
Button_ArpNotesInvert.setLocalLookAndFeel(LAFArpInvertButton);

Button_ArpVelocityReset.setLocalLookAndFeel(LAFArpResetButton);
Button_ArpLengthReset.setLocalLookAndFeel(LAFArpResetButton);

Button_ArpSustain.setLocalLookAndFeel(LAFButtonBypass);

Button_ArpModeUpArrow.setLocalLookAndFeel(LAFButtonUpArrow);
Button_ArpModeDownArrow.setLocalLookAndFeel(LAFButtonDownArrow);

for (r in randomizationButtonsArp)
    r.setLocalLookAndFeel(LAFButtonRandomize);

//Movement

Button_ChaosBypass.setLocalLookAndFeel(LAFButtonSamplerBypass);
Button_MovementSettings.setLocalLookAndFeel(LAFButtonSettingsCogwheel);

Button_ChaosTypeUp.setLocalLookAndFeel(LAFButtonUpArrow);
Button_ChaosTypeDown.setLocalLookAndFeel(LAFButtonDownArrow);

Button_MovementSettingsClose.setLocalLookAndFeel(LAFButtonClose);

//Sliders

const var mainSliders = Content.getAllComponents("Slider*");
const var otherSliders = [Slider_SampleOffsetA, 
                          Slider_SampleOffsetB, 
                          Slider_SampleOffsetC, 
                          Slider_MovementXInvisible, 
                          Slider_MovementYInvisible, 
                          Slider_OutputGain];

for (o=0; o<otherSliders.length; o++)
    mainSliders.remove(otherSliders[o]);

for (m in mainSliders)
    m.setLocalLookAndFeel(LAFSliderMain);

Slider_OutputGain.setLocalLookAndFeel(LAFSliderOutputGain);
Slider_MovementXInvisible.setLocalLookAndFeel(LAFSliderMovementX);
Slider_MovementYInvisible.setLocalLookAndFeel(LAFSliderMovementY);

Slider_SampleOffsetA.setLocalLookAndFeel(LAFSliderSampleOffset);
Slider_SampleOffsetB.setLocalLookAndFeel(LAFSliderSampleOffset);
Slider_SampleOffsetC.setLocalLookAndFeel(LAFSliderSampleOffset);

//Extra Expansion Specific Controls

//Achromic

Button_AchromicPickAttack.setLocalLookAndFeel(LAFButtonBypass);
Button_AchromicReleaseNoise.setLocalLookAndFeel(LAFButtonBypass);
Button_AchromicNoiseGate.setLocalLookAndFeel(LAFButtonBypass);
Button_AchromicForceDownpick.setLocalLookAndFeel(LAFButtonBypass);

//Cloudburst Acoustic

Button_CloudburstAcousticNoises.setLocalLookAndFeel(LAFButtonBypass);

//Gloom

Button_GloomChairCreakNoise.setLocalLookAndFeel(LAFButtonBypass);
Button_GloomReleaseNoise.setLocalLookAndFeel(LAFButtonBypass);

//PDQ Bass

Button_PDQBassForceDownpick.setLocalLookAndFeel(LAFButtonBypass);
Button_PDQBassProcessed.setLocalLookAndFeel(LAFButtonBypass);

Slider_PDQBassVelocityMin.setLocalLookAndFeel(LAFSliderPDQBassVel);
Slider_PDQBassVelocityMax.setLocalLookAndFeel(LAFSliderPDQBassVel);
Slider_PDQBassPMVelMin.setLocalLookAndFeel(LAFSliderPDQBassVel);
Slider_PDQBassPMVelMax.setLocalLookAndFeel(LAFSliderPDQBassVel);
Slider_PDQBassFVelMin.setLocalLookAndFeel(LAFSliderPDQBassVel);
Slider_PDQBassFVelMax.setLocalLookAndFeel(LAFSliderPDQBassVel);
Slider_PDQBassAPVelMin.setLocalLookAndFeel(LAFSliderPDQBassVel);
Slider_PDQBassAPVelMax.setLocalLookAndFeel(LAFSliderPDQBassVel);
Slider_PDQBassSLVelMin.setLocalLookAndFeel(LAFSliderPDQBassVel);
Slider_PDQBassSLVelMax.setLocalLookAndFeel(LAFSliderPDQBassVel);

//Portal

Button_PortalIgnoreArpVelocity.setLocalLookAndFeel(LAFButtonBypass);

//------------------------

//Keep these global...

laf.registerFunction("drawPopupMenuBackground", function(g, obj)
{
    g.setColour(0xFF222222);
    g.fillRoundedRectangle([0, 0, obj.width, obj.height], 0.0);
});

laf.registerFunction("drawPopupMenuItem", function(g, obj)
{
        var a = obj.area;
        var h = a[3];
    
        if(obj.isSeparator)
        {
            g.setColour(Colours.white);
            g.drawLine(a[0]+10, a[0] + a[2]-10, a[1] + a[3]/2, a[1] + a[3]/2, 1.0);
            return;
        }
    
        if(obj.isTicked)
        {
            g.setColour(Colours.white);
            g.fillEllipse([a[0] + h/3, a[1] + h/3, h/3, h/3]);
        }
    
        if(obj.isHighlighted)
        {
            g.setColour(0x22FFFFFF);
            g.fillRect(obj.area);
        }
    
        g.setFont("Arial", 12.0);
        g.setColour(Colours.white);
        g.drawAlignedText(obj.text, [a[0] + h, a[1], a[2] - h, a[3]], "left");
});

//Macro Tag

laf.registerFunction("drawNumberTag", function(g, obj)
{
    g.setColour(0xE4060606);
    g.fillRoundedRectangle([obj.area[2], obj.area[1], 0, 0], 2.0);
    g.setColour(Colours.white);
    g.setFont("Arial", 12.0);
    switch (obj.macroIndex)
    {
        case 0:
        g.drawAlignedText("X", [obj.area[2] - 10, obj.area[1], 10, 10], "centred");
        break;
        
        case 1:
        g.drawAlignedText("X-", [obj.area[2] - 10, obj.area[1], 10, 10], "centred");
        break;
        
        case 2:
        g.drawAlignedText("Y", [obj.area[2] - 10, obj.area[1], 10, 10], "centred");
        break;
        
        case 3:
        g.drawAlignedText("Y-", [obj.area[2] - 10, obj.area[1], 10, 10], "centred");
        break;
        
        case 4:
        g.drawAlignedText("A", [obj.area[2] - 10, obj.area[1], 10, 10], "centred");
        break;
        
        case 5:
        g.drawAlignedText("B", [obj.area[2] - 10, obj.area[1], 10, 10], "centred");
        break;
        
        case 6:
        g.drawAlignedText("V", [obj.area[2] - 10, obj.area[1], 10, 10], "centred");
        break;
        
        case 7:
        g.drawAlignedText("R", [obj.area[2] - 10, obj.area[1], 10, 10], "centred");
        break;
    }
    
});


//Alert Window Popups

laf.registerFunction("drawAlertWindowIcon", function(g, obj)
{
    if(obj.type == "Question")
    {
            g.setColour(Colours.lightgrey);
            path.clear();
            path.loadFromData(openAppDataFolderButtonFillDataBack);
            g.fillPath(path, [obj.area[0], obj.area[1] + 4, obj.area[2] - 40, obj.area[3] - 56]);
            path.clear();
            g.setColour(Colours.white);
            path.loadFromData(openAppDataFolderButtonFillDataFront);
            g.fillPath(path, [obj.area[0], obj.area[1] + 16, obj.area[2] - 40, obj.area[3] - 64]);  
    }
});

//Preset Browser

FloatingTile_PresetBrowser.setLocalLookAndFeel(LAFPresetBrowser);
var presetBrowserSelectedExpansion;
var presetBrowserExpansionImage;
const var presetBrowserPath = Content.createPath();

inline function loadPresetBrowserImages(LAFObject)
{
    for (e in expHandler.getExpansionList())
    {
        local img = e.getWildcardReference("background.jpg");
        if (isDefined(img))
            LAFObject.loadImage(img, e.getProperties().Name);
    }
}

loadPresetBrowserImages(LAFPresetBrowser);

LAFPresetBrowser.registerFunction("drawPresetBrowserBackground", function(g, obj)
{
    g.fillAll(Colours.withAlpha(Colours.black, .8));
});

LAFPresetBrowser.registerFunction("drawPresetBrowserColumnBackground", function(g, obj)
{
    if (obj.columnIndex != -1)
    {
        g.fillAll(Colours.withAlpha(Colours.black, .8));
    }
});

LAFPresetBrowser.registerFunction("drawPresetBrowserListItem", function(g, obj)
{
    if (obj.columnIndex == -1)
    {
        g.drawImage(obj.text, obj.area, 0, 0);

        //Add Padding
        g.setColour(Colours.withAlpha(Colours.black, 1.0));
        g.drawRoundedRectangle(obj.area, 4.0, 4.0);

        //Add Chamfer
        g.setColour(Colours.withAlpha(Colours.black, .8));
        g.fillTriangle([-20, -32, 130, 70], Math.toRadians(90));
        g.setColour(Colours.withAlpha(Colours.black, .4));
        g.fillTriangle([10, -32, 130, 70], Math.toRadians(90));
        g.setColour(Colours.withAlpha(Colours.black, .2));
		g.fillTriangle([40, -32, 130, 70], Math.toRadians(90));

        //Colour Background for Text

        g.setColour(Colours.withAlpha(Colours.black, 1.0));
        //g.fillRoundedRectangle([2, 4, obj.area[2] * .4, obj.area[3] - 6], 2.0);
        g.setColour(Colours.lightgrey);
        g.setFont("Arial", 13.0);
        g.drawAlignedText(obj.text, [2, 4, obj.area[2] * .4, obj.area[3] - 8], "left");
    }
    else
    {
        //Fill Background
        g.setColour(Colours.withAlpha(Colours.darkgrey, .6));
        g.fillRoundedRectangle([10, 3, obj.area[2] - 20, obj.area[3] - 5], 4.0);

        g.setColour(Colours.withAlpha(Colours.black, .2));
        g.fillRoundedRectangle([10, 3, obj.area[2] - 20, obj.area[3] - 5], 4.0);
        
        //Add Chamfer
        g.setColour(Colours.withAlpha(Colours.black, .8));
        g.fillTriangle([-20, -32, 130, 70], Math.toRadians(90));
        g.setColour(Colours.withAlpha(Colours.black, .4));
        g.fillTriangle([10, -32, 130, 70], Math.toRadians(90));
        g.setColour(Colours.withAlpha(Colours.black, .2));
		g.fillTriangle([40, -32, 130, 70], Math.toRadians(90));

        //Draw Text
        g.setColour(Colours.white);
        g.setFont("Arial", 13.0);
        g.drawAlignedText(obj.text, obj.area, "left");

        //Arrow Icon

        if (obj.columnIndex == 0)
        {
            g.setColour(Colours.withAlpha(Colours.white, .4));
            g.fillRoundedRectangle([obj.area[2] - 30, obj.area[3] / 2 - 2, 7, 4], 0.0);
            g.fillTriangle([obj.area[2] - 23, obj.area[3] / 2 - 5, 10, 10], Math.toRadians(90));
        }

        if (obj.hover)
        {
            g.setColour(Colours.withAlpha(Colours.white, .05));
            g.fillRoundedRectangle([10, 3, obj.area[2] - 20, obj.area[3] - 5], 4.0);
        }
    } 
});