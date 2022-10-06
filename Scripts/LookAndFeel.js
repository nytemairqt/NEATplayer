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
	 g.drawRoundedRectangle([Panel_BG.getGlobalPositionX(), Panel_BG.getGlobalPositionY() - 32, Panel_BG.getWidth() - 4, Panel_BG.getHeight() - 4], 2, 1);
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
        {
            if (obj.over)
                g.setColour(Colours.white);
            else
                g.setColour(Colours.lightblue);
            //g.setColour(Colours.lightblue);
        }
    else 
        {
            if (obj.over)
                g.setColour(Colours.grey);
            else
                g.setColour(Colours.darkgrey);
        }
    //g.drawRoundedRectangle(obj.area, 2, 1); 
    /*
    path.loadFromData(randomizationButtonFillData);
    g.fillPath(path, [a[0] + 2, a[1] + 2, a[2] - 4, a[3] - 4]);
    */
    //g.setColour(Colours.white);
    g.setFont("Arial", 10);
    g.drawAlignedText("R", obj.area, "centred");
});

//Update Button

LAFButtonUpdate.registerFunction("drawToggleButton", function(g, obj)
{
    if (obj.value)
    {
        if (obj.over)
            g.setColour(Colours.darkgrey);
        else
            g.setColour(Colours.darkgrey);
    }
    else 
    {
        if (obj.over)
        {
            g.setColour(Colours.darkgrey);
            Panel_PatchNotes.set("visible", true);
        }
        else
        {
            g.setColour(0xFB111111);
            Panel_PatchNotes.set("visible", false);
        }
    }
    g.fillRoundedRectangle(obj.area, 2.0);    
    /*
    g.setColour(Colours.lightblue);
    g.drawRoundedRectangle(obj.area, 2.0, 2.0);
    */
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
        if (obj.over)
            g.setColour(Colours.lightgrey);
        else
            g.setColour(Colours.lightblue);
    else 
        if (obj.over)
            g.setColour(Colours.grey);
        else
            g.setColour(Colours.darkgrey);        
    g.fillEllipse([obj.area[0]+1, obj.area[1]+1, obj.area[2]-2, obj.area[3]-2]);
});

//FX Settings Button

LAFButtonFXSettings.registerFunction("drawToggleButton", function(g, obj)
{
    g.setColour(0xFF0A0A0A);
    g.fillRoundedRectangle(obj.area, 4.0);
    if (obj.value)
    {
        if (obj.over)
            g.setColour(Colours.white);
        else
            g.setColour(Colours.lightgrey);
    }
    else
    {
        if (obj.over)
            g.setColour(Colours.grey);
        else
            g.setColour(Colours.darkgrey);
    }
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
    if (obj.over)
        g.setColour(Colours.white);
    else
        g.setColour(Colours.lightgrey);
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
    {
        if (obj.over)
            g.setColour(Colours.withAlpha(Colours.black, 0.05));
        else
            g.setColour(Colours.withAlpha(Colours.black, 0));      
    }
    else
    {
        if (obj.over)
            g.setColour(Colours.withAlpha(Colours.black, 0.1));
        else
            g.setColour(Colours.withAlpha(Colours.black, 0.3));         
    }    
    g.fillRoundedRectangle(obj.area, 0);    
});

//Change Page Button

LAFButtonChangePage.registerFunction("drawToggleButton", function(g, obj)
{
    if (obj.value)
        {
            if (obj.over)
                g.setColour(Colours.darkgrey);
            else
                g.setColour(Colours.darkgrey);
        }
    else 
        {
            if (obj.over)
                g.setColour(Colours.darkgrey);
            else
                g.setColour(0xFB111111);
        }
    g.fillRoundedRectangle(obj.area, 2.0);    
    g.setColour(Colours.white);
    g.setFont("Arial", 11.0);
    g.drawAlignedText(obj.text, obj.area, "centred");
});

//Setup Button

LAFButtonSetup.registerFunction("drawToggleButton", function(g, obj)
{
    if (obj.value)
    {   
        if (obj.over)
            g.setColour(Colours.darkgrey);
        else
            g.setColour(Colours.darkgrey); 
    }
    else
    {
        if (obj.over)
            g.setColour(Colours.darkgrey);
        else
            g.setColour(0xFB111111);
    }
    g.fillRoundedRectangle(obj.area, 2.0); 
    g.setColour(Colours.white);
    g.setFont("Arial", 12.0);
    g.drawAlignedText(obj.text, obj.area, "centred");
});

//Library Install Button

LAFButtonInstallLibrary.registerFunction("drawToggleButton", function(g, obj)
{
    g.setColour(0xFB111111);
    g.fillRoundedRectangle(obj.area, 2.0);   
    g.drawImage("installSingleExpansionImage", obj.area, 0, 0);
    if (obj.over)
        g.setColour(Colours.withAlpha(Colours.white, 0.03));
    else
        g.setColour(Colours.withAlpha(Colours.white, 0));
    g.fillRoundedRectangle(obj.area, 2.0);    
});

//Library Bulk Install Button

LAFButtonBulkInstall.registerFunction("drawToggleButton", function(g, obj)
{
    g.setColour(0xFB111111);
    g.fillRoundedRectangle(obj.area, 2.0);   
    g.drawImage("bulkInstallImage", obj.area, 0, 0);
    if (obj.over)
        g.setColour(Colours.withAlpha(Colours.white, 0.03));
    else
        g.setColour(Colours.withAlpha(Colours.white, 0));
    g.fillRoundedRectangle(obj.area, 2.0);      
});

//Randomize Visibility Button

LAFButtonRandomizeVisibility.registerFunction("drawToggleButton", function(g, obj)
{
    g.setColour(0xFB111111);
    g.fillRoundedRectangle(obj.area, 3.0); 
    g.drawImage("randomizationButtonVisibilityImage", [obj.area[0] + 2, obj.area[1] + 2, obj.area[2] - 4, obj.area[3] - 4], 0, 0);
    if (obj.value)
    {
        if (obj.over)
            g.setColour(Colours.withAlpha(Colours.black, 0.05));
        else
            g.setColour(Colours.withAlpha(Colours.black, 0));      
    }
    else
    {
        if (obj.over)
            g.setColour(Colours.withAlpha(Colours.black, 0.1));
        else
            g.setColour(Colours.withAlpha(Colours.black, 0.3));         
    }
    g.fillRoundedRectangle(obj.area, 0);    
});

//Arp Reset Button

LAFArpResetButton.registerFunction("drawToggleButton", function(g, obj)
{
    path.clear();
    path.loadFromData(arpResetButtonStrokeData);    
    if (obj.over)
    {
        g.setColour(Colours.white);
        g.drawPath(path, reduced(obj, 6.0), 3);
        path.clear();
        path.loadFromData(arpResetButtonFillData);        
        g.fillPath(path, [obj.area[0] + 4, obj.area[1] + 4, obj.area[2] - 14, obj.area[3] - 14]);
    }
    else
    {             
        g.setColour(Colours.lightgrey);
        g.drawPath(path, reduced(obj, 6.0), 3);
        path.clear();
        path.loadFromData(arpResetButtonFillData);          
        g.fillPath(path, [obj.area[0] + 4, obj.area[1] + 4, obj.area[2] - 14, obj.area[3] - 14]);             
    }     
});

//Arp Invert Button

LAFArpInvertButton.registerFunction("drawToggleButton", function(g, obj)
{
    var leftTrianglePosition = (obj.area[2] * 0.25) - (obj.area[2] * 0.2);
    var triangleWidth = (obj.area[2] / 3) / 2;
    var rightTrianglePosition = (obj.area[2] * 0.75) - (obj.area[2] * 0.2);
    var triangleYOffset = (obj.area[3] * 0.33) / 2;

    if (obj.over)           
        g.setColour(Colours.white);
    else               
        g.setColour(Colours.lightgrey);

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
    if (obj.over)
        g.setColour(Colours.white);
    else
        g.setColour(Colours.lightgrey);
    g.fillPath(path, obj.area);
    g.setColour(0xE4060606);               
    g.drawPath(path, obj.area, 1.0);    
});

//Arp Major Button

LAFArpMajorButton.registerFunction("drawToggleButton", function(g, obj)
{
    path.clear();
    path.loadFromData(arpButtonMajor);    
    if (obj.over)
        g.setColour(Colours.white);
    else
        g.setColour(Colours.lightgrey);
    g.fillPath(path, obj.area);
    g.setColour(0xE4060606);               
    g.drawPath(path, obj.area, 1.0);        
});

//AppData Button

LAFButtonAppData.registerFunction("drawToggleButton", function(g, obj)
{
    if (obj.over)
    {
        g.setColour(Colours.lightgrey);
        path.clear();
        path.loadFromData(openAppDataFolderButtonFillDataBack);
        g.fillPath(path, [obj.area[0], obj.area[1], obj.area[2] - 6, obj.area[3] - 6]);
        path.clear();
        g.setColour(Colours.white);
        path.loadFromData(openAppDataFolderButtonFillDataFront);
        g.fillPath(path, [obj.area[0], obj.area[1] + 6, obj.area[2] - 6, obj.area[3] - 8]);             
    }
    else 
    {
        g.setColour(Colours.grey);
        path.clear();
        path.loadFromData(openAppDataFolderButtonFillDataBack);
        g.fillPath(path, [obj.area[0], obj.area[1], obj.area[2] - 6, obj.area[3] - 6]);
        path.clear();
        g.setColour(Colours.lightgrey);
        path.loadFromData(openAppDataFolderButtonFillDataFront);
        g.fillPath(path, [obj.area[0], obj.area[1] + 6, obj.area[2] - 6, obj.area[3] - 8]);            
    }    
});

//Up Arrow Button

LAFButtonUpArrow.registerFunction("drawToggleButton", function(g, obj)
{
    if (obj.over)
        g.setColour(Colours.white);
    else
        g.setColour(Colours.lightgrey);
    g.fillTriangle(obj.area, 0);    
});

//Down Arrow Button

LAFButtonDownArrow.registerFunction("drawToggleButton", function(g, obj)
{
    if (obj.over)
        g.setColour(Colours.white);
    else
        g.setColour(Colours.lightgrey);
    g.fillTriangle(obj.area, Math.toRadians(180));    
});

//Sampler Bypass Button

LAFButtonSamplerBypass.registerFunction("drawToggleButton", function(g, obj)
{
        if (obj.value)
        {
            if (obj.over)
                g.setColour(Colours.white);
            else
                g.setColour(Colours.lightgrey);
        }
        else
        {
            if (obj.over)
                g.setColour(Colours.grey);
            else
                g.setColour(Colours.darkgrey);
        }
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
    if (obj.value)
    {
        g.setColour(Colours.white);
        g.drawImage("samplerShowADSRButtonOff", obj.area, 0, 0);
        if (obj.over)
        {
            g.setColour(Colours.withAlpha(Colours.black, 0.05));
        }
        else
        {
            g.setColour(Colours.withAlpha(Colours.black, 0.00));
        }
    }
    else
    {
        g.setColour(Colours.white);
        g.drawImage("samplerShowADSRButtonOn", obj.area, 0, 0);
        if (obj.over)
        {
            g.setColour(Colours.withAlpha(Colours.black, 0.05));
        }
        else
        {
            g.setColour(Colours.withAlpha(Colours.black, 0.00));
        }
    }
    g.fillRoundedRectangle(obj.area, 2.0);    
});

//Sampler Loop Button

LAFButtonSamplerLoop.registerFunction("drawToggleButton", function(g, obj)
{
    if (obj.value)
    {
        if (obj.over)
        {
            g.setColour(Colours.white);
            g.drawRoundedRectangle(obj.area, 2.0, .5);
            g.setColour(Colours.withAlpha(Colours.lightblue, 0.2));
            g.fillRoundedRectangle(obj.area, 2.0);
        }
        else
        {
            g.setColour(Colours.lightgrey);
            g.drawRoundedRectangle(obj.area, 2.0, .5);
            g.setColour(Colours.withAlpha(Colours.lightblue, 0.2));
            g.fillRoundedRectangle(obj.area, 2.0);
        }
    }
    else
    {
        if (obj.over)
        {
            g.setColour(Colours.grey);
            g.drawRoundedRectangle(obj.area, 2.0, .5);
        }
        else
        {
            g.setColour(Colours.darkgrey);
            g.drawRoundedRectangle(obj.area, 2.0, .5);
        }
    }
    g.setColour(Colours.white);
    g.setFont("Arial", 9.0);
    g.drawAlignedText("LOOP", obj.area, "centred");  
});

//Sampler Reverse Button

LAFButtonSamplerReverse.registerFunction("drawToggleButton", function(g, obj)
{
    if (obj.value)
    {
        if (obj.over)
        {
            g.setColour(Colours.white);
            g.drawRoundedRectangle(obj.area, 2.0, .5);
            g.setColour(Colours.withAlpha(Colours.lightblue, 0.2));
            g.fillRoundedRectangle(obj.area, 2.0);
        }
        else
        {
            g.setColour(Colours.lightgrey);
            g.drawRoundedRectangle(obj.area, 2.0, .5);
            g.setColour(Colours.withAlpha(Colours.lightblue, 0.2));
            g.fillRoundedRectangle(obj.area, 2.0);
        }
    }
    else
    {
        if (obj.over)
        {
            g.setColour(Colours.grey);
            g.drawRoundedRectangle(obj.area, 2.0, .5);
        }
        else
        {
            g.setColour(Colours.darkgrey);
            g.drawRoundedRectangle(obj.area, 2.0, .5);
        }
    }
    g.setColour(Colours.white);
    g.setFont("Arial", 9.0);
    g.drawAlignedText("REV", obj.area, "centred");      
});

//Settings Cogwheel Button

LAFButtonSettingsCogwheel.registerFunction("drawToggleButton", function(g, obj)
{
    if (obj.over)
        g.setColour(Colours.darkgrey);
    else
        g.setColour(0xFB111111);
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
	//g.setColour(obj.hover ? Colours.withAlpha(Colours.darkgrey, .6) : Colours.withAlpha(Colours.darkgrey, .4));
	//g.fillRoundedRectangle([obj.area[0], obj.area[1], obj.area[2] * obj.valueNormalized, obj.area[3]], 0.0);

    g.setColour(Colours.lightgrey);
    g.fillRoundedRectangle([(obj.area[2] * 0.98) * obj.valueNormalized, 0, 2, obj.area[3]], 2.0);    
    
    if (obj.clicked)
    {
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

//Sample Loop Edit Panels

Panel_SamplerALoopEdit.setPaintRoutine(function(g, obj)
{
    if (this.data.hover)
        g.setColour(Colours.lightblue);
    else
        g.setColour(Colours.withAlpha(Colours.lightblue, .80));
    if (this.data.active)
    {
        g.drawRoundedRectangle([this.getWidth() * this.data.loopStart, 0, 3, this.getHeight()], 1.0, 1.0);  
        g.drawRoundedRectangle([this.getWidth() * this.data.loopEnd, 0, 3, this.getHeight()], 1.0, 1.0);  
        if (Button_SamplerALoop.getValue())
        {
            g.setColour(Colours.withAlpha(Colours.lightblue, .60));
            g.fillRoundedRectangle([this.getWidth() * this.data.loopStart + 3, 3, (this.getWidth() * this.data.loopEnd) - (this.getWidth() * this.data.loopStart + 3), this.getHeight() - 6], 0.0);
        }
    }
    else
    {
        g.drawRoundedRectangle([this.getWidth() * Slider_SamplerALoopStart.getValue(), 0, 3, this.getHeight()], 1.0, 1.0);  
        g.drawRoundedRectangle([this.getWidth() * Slider_SamplerALoopEnd.getValue(), 0, 3, this.getHeight()], 1.0, 1.0);  
        if (Button_SamplerALoop.getValue())
        {
            g.setColour(Colours.withAlpha(Colours.lightblue, .60));
            g.fillRoundedRectangle([this.getWidth() * Slider_SamplerALoopStart.getValue() + 3, 3, (this.getWidth() * Slider_SamplerALoopEnd.getValue()) - (this.getWidth() * Slider_SamplerALoopStart.getValue() + 3), this.getHeight() - 6], 0.0);
        }
    }

});

Panel_SamplerBLoopEdit.setPaintRoutine(function(g)
{
    if (this.data.hover)
        g.setColour(Colours.lightblue);
    else
        g.setColour(Colours.withAlpha(Colours.lightblue, .80));
    if (this.data.active)
    {
        g.drawRoundedRectangle([this.getWidth() * this.data.loopStart, 0, 3, this.getHeight()], 1.0, 1.0);  
        g.drawRoundedRectangle([this.getWidth() * this.data.loopEnd, 0, 3, this.getHeight()], 1.0, 1.0);  
        if (Button_SamplerBLoop.getValue())
        {
            g.setColour(Colours.withAlpha(Colours.lightblue, .60));
            g.fillRoundedRectangle([this.getWidth() * this.data.loopStart + 3, 3, (this.getWidth() * this.data.loopEnd) - (this.getWidth() * this.data.loopStart + 3), this.getHeight() - 6], 0.0);
        }
    }
    else
    {
        g.drawRoundedRectangle([this.getWidth() * Slider_SamplerBLoopStart.getValue(), 0, 3, this.getHeight()], 1.0, 1.0);  
        g.drawRoundedRectangle([this.getWidth() * Slider_SamplerBLoopEnd.getValue(), 0, 3, this.getHeight()], 1.0, 1.0);  
        if (Button_SamplerBLoop.getValue())
        {
            g.setColour(Colours.withAlpha(Colours.lightblue, .60));
            g.fillRoundedRectangle([this.getWidth() * Slider_SamplerBLoopStart.getValue() + 3, 3, (this.getWidth() * Slider_SamplerBLoopEnd.getValue()) - (this.getWidth() * Slider_SamplerBLoopStart.getValue() + 3), this.getHeight() - 6], 0.0);
        }
    }
});

Panel_SamplerCLoopEdit.setPaintRoutine(function(g)
{
    if (this.data.hover)
        g.setColour(Colours.lightblue);
    else
        g.setColour(Colours.withAlpha(Colours.lightblue, .80));
    if (this.data.active)
    {
        g.drawRoundedRectangle([this.getWidth() * this.data.loopStart, 0, 3, this.getHeight()], 1.0, 1.0);  
        g.drawRoundedRectangle([this.getWidth() * this.data.loopEnd, 0, 3, this.getHeight()], 1.0, 1.0);  
        if (Button_SamplerCLoop.getValue())
        {
            g.setColour(Colours.withAlpha(Colours.lightblue, .60));
            g.fillRoundedRectangle([this.getWidth() * this.data.loopStart + 3, 3, (this.getWidth() * this.data.loopEnd) - (this.getWidth() * this.data.loopStart + 3), this.getHeight() - 6], 0.0);
        }
    }
    else
    {
        g.drawRoundedRectangle([this.getWidth() * Slider_SamplerCLoopStart.getValue(), 0, 3, this.getHeight()], 1.0, 1.0);  
        g.drawRoundedRectangle([this.getWidth() * Slider_SamplerCLoopEnd.getValue(), 0, 3, this.getHeight()], 1.0, 1.0);  
        if (Button_SamplerCLoop.getValue())
        {
            g.setColour(Colours.withAlpha(Colours.lightblue, .60));
            g.fillRoundedRectangle([this.getWidth() * Slider_SamplerCLoopStart.getValue() + 3, 3, (this.getWidth() * Slider_SamplerCLoopEnd.getValue()) - (this.getWidth() * Slider_SamplerCLoopStart.getValue() + 3), this.getHeight() - 6], 0.0);
        }
    }
});

//Sample Loop Display Panels

Panel_SamplerALoopDisplay.setPaintRoutine(function(g)
{
    if (Button_SamplerALoop.getValue())
    {
        if (Panel_SamplerALoopEdit.data.active)
        {
            g.setColour(Colours.withAlpha(Colours.lightblue, 0.07));
            g.fillRoundedRectangle([this.getWidth() * Panel_SamplerALoopEdit.data.loopStart + 3, 0, (this.getWidth() * Panel_SamplerALoopEdit.data.loopEnd) - (this.getWidth() * Panel_SamplerALoopEdit.data.loopStart + 3), this.getHeight()], 0.0);
            g.setColour(Colours.withAlpha(Colours.lightblue, 0.6));                 
            g.drawLine(this.getWidth() * Panel_SamplerALoopEdit.data.loopStart + 3, this.getWidth() * Panel_SamplerALoopEdit.data.loopStart + 3, 0, this.getHeight(), 1.0);
            g.drawLine(this.getWidth() * Panel_SamplerALoopEdit.data.loopEnd, this.getWidth() * Panel_SamplerALoopEdit.data.loopEnd, 0, this.getHeight(), 1.0);            
        }
        else
        {
            g.setColour(Colours.withAlpha(Colours.lightblue, 0.07));
            g.fillRoundedRectangle([this.getWidth() * Slider_SamplerALoopStart.getValue() + 3, 0, (this.getWidth() * Slider_SamplerALoopEnd.getValue()) - (this.getWidth() * Slider_SamplerALoopStart.getValue() + 3), this.getHeight()], 0.0);
            g.setColour(Colours.withAlpha(Colours.lightblue, 0.6));                
            g.drawLine(this.getWidth() * Slider_SamplerALoopStart.getValue() + 3, this.getWidth() * Slider_SamplerALoopStart.getValue() + 3, 0, this.getHeight(), 1.0);
            g.drawLine(this.getWidth() * Slider_SamplerALoopEnd.getValue(), this.getWidth() * Slider_SamplerALoopEnd.getValue(), 0, this.getHeight(), 1.0); 
        }

    }
});

Panel_SamplerBLoopDisplay.setPaintRoutine(function(g)
{
    if (Button_SamplerBLoop.getValue())
    {
        if (Panel_SamplerBLoopEdit.data.active)
        {
            g.setColour(Colours.withAlpha(Colours.lightblue, 0.07));
            g.fillRoundedRectangle([this.getWidth() * Panel_SamplerBLoopEdit.data.loopStart + 3, 0, (this.getWidth() * Panel_SamplerBLoopEdit.data.loopEnd) - (this.getWidth() * Panel_SamplerBLoopEdit.data.loopStart + 3), this.getHeight()], 0.0);
            g.setColour(Colours.withAlpha(Colours.lightblue, 0.6));              
            g.drawLine(this.getWidth() * Panel_SamplerBLoopEdit.data.loopStart + 3, this.getWidth() * Panel_SamplerBLoopEdit.data.loopStart + 3, 0, this.getHeight(), 1.0);
            g.drawLine(this.getWidth() * Panel_SamplerBLoopEdit.data.loopEnd, this.getWidth() * Panel_SamplerBLoopEdit.data.loopEnd, 0, this.getHeight(), 1.0);            
        }
        else
        {
            g.setColour(Colours.withAlpha(Colours.lightblue, 0.07));
            g.fillRoundedRectangle([this.getWidth() * Slider_SamplerBLoopStart.getValue() + 3, 0, (this.getWidth() * Slider_SamplerBLoopEnd.getValue()) - (this.getWidth() * Slider_SamplerBLoopStart.getValue() + 3), this.getHeight()], 0.0);
            g.setColour(Colours.withAlpha(Colours.lightblue, 0.6));              
            g.drawLine(this.getWidth() * Slider_SamplerBLoopStart.getValue() + 3, this.getWidth() * Slider_SamplerBLoopStart.getValue() + 3, 0, this.getHeight(), 1.0);
            g.drawLine(this.getWidth() * Slider_SamplerBLoopEnd.getValue(), this.getWidth() * Slider_SamplerBLoopEnd.getValue(), 0, this.getHeight(), 1.0); 
        }
    }
});

Panel_SamplerCLoopDisplay.setPaintRoutine(function(g)
{
    if (Button_SamplerCLoop.getValue())
    {
        if (Panel_SamplerCLoopEdit.data.active)
        {
            g.setColour(Colours.withAlpha(Colours.lightblue, 0.07));
            g.fillRoundedRectangle([this.getWidth() * Panel_SamplerCLoopEdit.data.loopStart + 3, 0, (this.getWidth() * Panel_SamplerCLoopEdit.data.loopEnd) - (this.getWidth() * Panel_SamplerCLoopEdit.data.loopStart + 3), this.getHeight()], 0.0);
            g.setColour(Colours.withAlpha(Colours.lightblue, 0.6));            
            g.drawLine(this.getWidth() * Panel_SamplerCLoopEdit.data.loopStart + 3, this.getWidth() * Panel_SamplerCLoopEdit.data.loopStart + 3, 0, this.getHeight(), 1.0);
            g.drawLine(this.getWidth() * Panel_SamplerCLoopEdit.data.loopEnd, this.getWidth() * Panel_SamplerCLoopEdit.data.loopEnd, 0, this.getHeight(), 1.0);            
        }
        else
        {
            g.setColour(Colours.withAlpha(Colours.lightblue, 0.07));
            g.fillRoundedRectangle([this.getWidth() * Slider_SamplerCLoopStart.getValue() + 3, 0, (this.getWidth() * Slider_SamplerCLoopEnd.getValue()) - (this.getWidth() * Slider_SamplerCLoopStart.getValue() + 3), this.getHeight()], 0.0);
            g.setColour(Colours.withAlpha(Colours.lightblue, 0.6));            
            g.drawLine(this.getWidth() * Slider_SamplerCLoopStart.getValue() + 3, this.getWidth() * Slider_SamplerCLoopStart.getValue() + 3, 0, this.getHeight(), 1.0);
            g.drawLine(this.getWidth() * Slider_SamplerCLoopEnd.getValue(), this.getWidth() * Slider_SamplerCLoopEnd.getValue(), 0, this.getHeight(), 1.0); 
        }
    }
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

Button_SamplerALoop.setLocalLookAndFeel(LAFButtonSamplerLoop);
Button_SamplerBLoop.setLocalLookAndFeel(LAFButtonSamplerLoop);
Button_SamplerCLoop.setLocalLookAndFeel(LAFButtonSamplerLoop);

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

//--------------------------

/*
laf.registerFunction("drawToggleButton", function(g, obj)
{
    inline function reduced(obj, amount)
    {
        return [amount, amount, obj.area[2] - 2*amount, obj.area[3] - 2* amount];
    }
    
    var x = obj.area[0];
    var y = obj.area[1];
    var w = obj.area[2];
    var h = obj.area[3];
    
    var a = obj.area;
    
    switch (obj.text)
    {
    case "LAFButtonRandomize":
        g.setColour(0xFF131313);
        g.fillRoundedRectangle(obj.area, 2);
        if (obj.value)       
            {
                if (obj.over)
                    g.setColour(Colours.white);
                else
                    g.setColour(Colours.lightgrey);
            }
        else 
            {
                if (obj.over)
                    g.setColour(Colours.grey);
                else
                    g.setColour(Colours.darkgrey);
            }
        g.drawRoundedRectangle(obj.area, 2, 1); 
        path.loadFromData(randomizationButtonFillData);
        g.fillPath(path, [a[0] + 2, a[1] + 2, a[2] - 4, a[3] - 4]);
    break;
    
    case "LAFButtonUpdate":
			if (obj.value)
			    {
			        if (obj.over)
			            g.setColour(Colours.darkgrey);
			        else
			            g.setColour(Colours.darkgrey);
			    }
			else 
			    {
			        if (obj.over)
                    {
			            g.setColour(Colours.darkgrey);
                        Panel_PatchNotes.set("visible", true);
                    }
			        else
                    {
			            g.setColour(0xFB111111);
                        Panel_PatchNotes.set("visible", false);
                    }
			    }
			g.fillRoundedRectangle(obj.area, 2.0);    
			g.setColour(Colours.lightblue);
			g.drawRoundedRectangle(obj.area, 2.0, 2.0);
			g.setColour(Colours.white);
			g.setFont("Arial", 14.0);
			g.drawAlignedText("Update", obj.area, "centred");
        break;    
    
    case "LAFButtonBypass":
        g.setColour(Colours.grey);
        g.fillEllipse(obj.area);     
        if (obj.value)
            if (obj.over)
                g.setColour(Colours.lightgrey);
            else
                g.setColour(Colours.lightblue);
        else 
            if (obj.over)
                g.setColour(Colours.grey);
            else
                g.setColour(Colours.darkgrey);        
            g.fillEllipse([a[0]+1, a[1]+1, a[2]-2, a[3]-2]);
    break;    
    
    case "LAFButtonFXSettings":
        g.setColour(0xFF0A0A0A);
        g.fillRoundedRectangle(obj.area, 4.0);
        if (obj.value)
        {
            if (obj.over)
                g.setColour(Colours.white);
            else
                g.setColour(Colours.lightgrey);
        }
        else
        {
            if (obj.over)
                g.setColour(Colours.grey);
            else
                g.setColour(Colours.darkgrey);
        }
        g.drawLine(0, 6, 0, 0, 1.0);
        g.drawLine(0, 0, 0, 6, 1.0);
        g.drawLine(obj.area[2], obj.area[2] - 6, 0, 0, 1.0);
        g.drawLine(obj.area[2], obj.area[2], 0, 6, 1.0);
        g.drawLine(0, 6, obj.area[3], obj.area[3], 1.0);
        g.drawLine(0, 0, obj.area[3], obj.area[3] - 6, 1.0);
        g.drawLine(obj.area[2], obj.area[2] - 6, obj.area[3], obj.area[3], 1.0);
        g.drawLine(obj.area[2], obj.area[2], obj.area[3], obj.area[3] - 6, 1.0);
    break;  
    
    case "LAFButtonClose":
	    if (obj.over)
            g.setColour(Colours.white);
        else
            g.setColour(Colours.lightgrey);
        g.setFont("Arial", 14.0);
        g.drawAlignedText("x", obj.area, "centred");
    break;

    case "LAFButtonCloseRandomizationPanel":
        g.setColour(0xFB111111);
        g.fillEllipse(obj.area);
        if (obj.over)
            g.setColour(Colours.white);
        else
            g.setColour(Colours.lightgrey);
        g.setFont("Arial", 14.0);
        g.drawAlignedText("x", obj.area, "centred");
    break;

    case "LAFOpenRandomizationPanel":
        g.setColour(0xFB111111);
        g.fillRoundedRectangle(obj.area, 2.0);
        g.drawImage("randomizationButtonDiceImage", [obj.area[0] + 2, obj.area[1] + 2, obj.area[2] - 4, obj.area[3] - 4], 0, 0); 
        if (obj.value)
        {
            if (obj.over)
                g.setColour(Colours.withAlpha(Colours.black, 0.05));
            else
                g.setColour(Colours.withAlpha(Colours.black, 0));      
        }
        else
        {
            if (obj.over)
                g.setColour(Colours.withAlpha(Colours.black, 0.1));
            else
                g.setColour(Colours.withAlpha(Colours.black, 0.3));         
        }
    g.fillRoundedRectangle(obj.area, 0);
    break;
    
    case "LAFButtonChangePage":
    if (obj.value)
        {
            if (obj.over)
                g.setColour(Colours.darkgrey);
            else
                g.setColour(Colours.darkgrey);
        }
    else 
        {
            if (obj.over)
                g.setColour(Colours.darkgrey);
            else
                g.setColour(0xFB111111);
        }
    g.fillRoundedRectangle(obj.area, 2.0);
    break;  
    
    case "LAFButtonSetup":
    if (obj.value)
        {
            if (obj.over)
                g.setColour(Colours.darkgrey);
            else
                g.setColour(Colours.darkgrey); 
        }
    else
        {
            if (obj.over)
                g.setColour(Colours.darkgrey);
            else
                g.setColour(0xFB111111);
        }
    g.fillRoundedRectangle(obj.area, 2.0);     
    break;  

    case "LAFButtonInstallLibrary":
        g.setColour(0xFB111111);
        g.fillRoundedRectangle(obj.area, 2.0);   
        g.drawImage("installSingleExpansionImage", obj.area, 0, 0);
        if (obj.over)
            g.setColour(Colours.withAlpha(Colours.white, 0.03));
        else
            g.setColour(Colours.withAlpha(Colours.white, 0));
        g.fillRoundedRectangle(obj.area, 2.0);
    break;  

    case "LAFButtonBulkInstall":
        g.setColour(0xFB111111);
        g.fillRoundedRectangle(obj.area, 2.0);   
        g.drawImage("bulkInstallImage", obj.area, 0, 0);
        if (obj.over)
            g.setColour(Colours.withAlpha(Colours.white, 0.03));
        else
            g.setColour(Colours.withAlpha(Colours.white, 0));
        g.fillRoundedRectangle(obj.area, 2.0);    
    break;  
    
    case "LAFButtonRandomizeVisibility":    
        g.setColour(0xFB111111);
        g.fillRoundedRectangle(obj.area, 3.0); 
        g.drawImage("randomizationButtonVisibilityImage", [obj.area[0] + 2, obj.area[1] + 2, obj.area[2] - 4, obj.area[3] - 4], 0, 0);
        if (obj.value)
        {
            if (obj.over)
                g.setColour(Colours.withAlpha(Colours.black, 0.05));
            else
                g.setColour(Colours.withAlpha(Colours.black, 0));      
        }
        else
        {
            if (obj.over)
                g.setColour(Colours.withAlpha(Colours.black, 0.1));
            else
                g.setColour(Colours.withAlpha(Colours.black, 0.3));         
        }
    g.fillRoundedRectangle(obj.area, 0);
    break; 
    
    case "LAFArpResetButton":
            path.clear();
            path.loadFromData(arpResetButtonStrokeData);    
            if (obj.over)
            {
                g.setColour(Colours.white);
                g.drawPath(path, reduced(obj, 6.0), 3);
                path.clear();
                path.loadFromData(arpResetButtonFillData);        
                g.fillPath(path, [obj.area[0] + 4, obj.area[1] + 4, obj.area[2] - 14, obj.area[3] - 14]);
            }
            else
            {             
                g.setColour(Colours.lightgrey);
                g.drawPath(path, reduced(obj, 6.0), 3);
                path.clear();
                path.loadFromData(arpResetButtonFillData);          
                g.fillPath(path, [obj.area[0] + 4, obj.area[1] + 4, obj.area[2] - 14, obj.area[3] - 14]);             
            } 
    break;
    
    case "LAFArpInvertButton":
        var leftTrianglePosition = (obj.area[2] * 0.25) - (obj.area[2] * 0.2);
        var triangleWidth = (obj.area[2] / 3) / 2;
        var rightTrianglePosition = (obj.area[2] * 0.75) - (obj.area[2] * 0.2);
        var triangleYOffset = (obj.area[3] * 0.33) / 2;

        if (obj.over)           
            g.setColour(Colours.white);
        else               
            g.setColour(Colours.lightgrey);
        g.fillTriangle([leftTrianglePosition, 0 + triangleYOffset, obj.area[2] * 0.33, obj.area[3] * 0.33], Math.toRadians(0));
        g.drawLine(leftTrianglePosition + triangleWidth, leftTrianglePosition + triangleWidth, 10, obj.area[3] - 4, 2.0);

        g.fillTriangle([rightTrianglePosition, obj.area[3] * 0.66 - triangleYOffset, obj.area[2] / 3, obj.area[3] * 0.33], Math.toRadians(180));
        g.drawLine(rightTrianglePosition + triangleWidth, rightTrianglePosition + triangleWidth, triangleYOffset, obj.area[3] - 10, 2.0);
    break;
    
    case "LAFArpMinorButton":
    	path.clear();
    	path.loadFromData(arpButtonMinor);    
        if (obj.over)
			g.setColour(Colours.white);
        else
            g.setColour(Colours.lightgrey);
        g.fillPath(path, obj.area);
        g.setColour(0xE4060606);               
        g.drawPath(path, obj.area, 1.0);
    break;
    
    case "LAFArpMajorButton":
    	path.clear();
    	path.loadFromData(arpButtonMajor);    
        if (obj.over)
			g.setColour(Colours.white);
        else
            g.setColour(Colours.lightgrey);
        g.fillPath(path, obj.area);
        g.setColour(0xE4060606);               
        g.drawPath(path, obj.area, 1.0);        
    break;
    
    case "LAF_ButtonAppData":
        if (obj.over)
        {
            g.setColour(Colours.lightgrey);
            path.clear();
            path.loadFromData(openAppDataFolderButtonFillDataBack);
            g.fillPath(path, [obj.area[0], obj.area[1], obj.area[2] - 6, obj.area[3] - 6]);
            path.clear();
            g.setColour(Colours.white);
            path.loadFromData(openAppDataFolderButtonFillDataFront);
            g.fillPath(path, [obj.area[0], obj.area[1] + 6, obj.area[2] - 6, obj.area[3] - 8]);             
        }
        else 
        {
            g.setColour(Colours.grey);
            path.clear();
            path.loadFromData(openAppDataFolderButtonFillDataBack);
            g.fillPath(path, [obj.area[0], obj.area[1], obj.area[2] - 6, obj.area[3] - 6]);
            path.clear();
            g.setColour(Colours.lightgrey);
            path.loadFromData(openAppDataFolderButtonFillDataFront);
            g.fillPath(path, [obj.area[0], obj.area[1] + 6, obj.area[2] - 6, obj.area[3] - 8]);            
        }
    break;
    
    case "LAFButtonUpArrow":
        if (obj.over)
            g.setColour(Colours.white);
        else
            g.setColour(Colours.lightgrey);
        g.fillTriangle(obj.area, 0);
    break;
    
    case "LAFButtonDownArrow":
        if (obj.over)
            g.setColour(Colours.white);
        else
            g.setColour(Colours.lightgrey);
        g.fillTriangle(obj.area, Math.toRadians(180));
    break;

    case "LAFButtonSamplerBypass":

        if (obj.value)
        {
            if (obj.over)
                g.setColour(Colours.white);
            else
                g.setColour(Colours.lightgrey);
        }
        else
        {
            if (obj.over)
                g.setColour(Colours.grey);
            else
                g.setColour(Colours.darkgrey);
        }
        path.clear();
        path.loadFromData(samplerPowerButtonData);
        g.drawPath(path, [obj.area[0] + 2, obj.area[1] + 2, obj.area[2] - 4, obj.area[3] - 4], 2);
        g.drawLine(obj.area[2] / 2, obj.area[2] / 2, 0, obj.area[3] / 2, 2.0);
    break;
    
    case "LAFButtonSamplerShowADSR":
        g.setColour(0xFB111111);
        g.fillRoundedRectangle(obj.area, 2.0);
        if (obj.value)
        {
            g.setColour(Colours.white);
            g.drawImage("samplerShowADSRButtonOff", obj.area, 0, 0);
            if (obj.over)
            {
                g.setColour(Colours.withAlpha(Colours.black, 0.05));
            }
            else
            {
                g.setColour(Colours.withAlpha(Colours.black, 0.00));
            }
        }
        else
        {
            g.setColour(Colours.white);
            g.drawImage("samplerShowADSRButtonOn", obj.area, 0, 0);
            if (obj.over)
            {
                g.setColour(Colours.withAlpha(Colours.black, 0.05));
            }
            else
            {
                g.setColour(Colours.withAlpha(Colours.black, 0.00));
            }
        }
        g.fillRoundedRectangle(obj.area, 2.0);
    break;
    
    case "LAFButtonSamplerReverse":
        if (obj.value)
        {
            if (obj.over)
            {
                g.setColour(Colours.white);
                g.drawRoundedRectangle(obj.area, 2.0, .5);
                g.setColour(Colours.withAlpha(Colours.lightblue, 0.2));
                g.fillRoundedRectangle(obj.area, 2.0);
            }
            else
            {
                g.setColour(Colours.lightgrey);
                g.drawRoundedRectangle(obj.area, 2.0, .5);
                g.setColour(Colours.withAlpha(Colours.lightblue, 0.2));
                g.fillRoundedRectangle(obj.area, 2.0);
            }
        }
        else
        {
            if (obj.over)
            {
                g.setColour(Colours.grey);
                g.drawRoundedRectangle(obj.area, 2.0, .5);
            }
            else
            {
                g.setColour(Colours.darkgrey);
                g.drawRoundedRectangle(obj.area, 2.0, .5);
            }
        }
        g.setColour(Colours.white);
        g.setFont("Arial", 9.0);
        g.drawAlignedText("REV", obj.area, "centred");        
    break;
    
    case "LAFButtonSettingsCogwheel":
        if (obj.over)
            g.setColour(Colours.darkgrey);
        else
            g.setColour(0xFB111111);
        g.fillRoundedRectangle(obj.area, 2.0);
        g.setColour(Colours.darkgrey);
        g.drawRoundedRectangle(obj.area, 2.0, 1.0);
        g.setColour(Colours.white);
        g.setFont("Arial", 14.0);
        g.drawAlignedText("Connection Settings", obj.area, "centred");
    break;

    default:
    }
    
});
*/

/*
laf.registerFunction("drawRotarySlider", function(g, obj)
{   
    switch (obj.text)
    {
        case "":
        
        var ringWidth = obj.area[2] / 16;    
    
        //background

        g.setColour(0x33000000);
        g.fillEllipse(reduced(obj, ringWidth * 2.0));
    
        //center black gradient 
        g.setColour(0xFF333333);
        g.fillEllipse(reduced(obj, obj.area[2] * .9));
    
        //arc
        var sliderRing3 = Content.createPath();
    
        sliderRing3.startNewSubPath(0.0, 0.0);
        sliderRing3.startNewSubPath(1.0, 1.0);  
    
        var start = -Math.PI*0.75 + 0.04;
    
        //unfilled ring
        sliderRing3.addArc([0.0, 0.0, 1.0, 1.0], start, Math.max(start + 0.08, start + Math.PI * 1.5 * obj.valueNormalized - 0.08));
        g.setColour(0xFF262626);
        g.drawPath(sliderRing2, reduced(obj, ringWidth), ringWidth * 2);
    
        //filled ring
        g.setColour(Colours.lightblue);
        g.drawPath(sliderRing3, reduced(obj, ringWidth), ringWidth * (1.6));
        g.rotate((1.0 - obj.valueNormalized) * -1.5 * Math.PI, [obj.area[2] / 2, obj.area[3] / 2]);   
    
        //light grey component (defines pointer shape)
        g.setColour(obj.hover ? 0xFFc2c2c2 : 0xFFAAAAAA);	  
        g.fillPath(sliderRing, reduced(obj, ringWidth * (1.6)));  
        break;
        
        case "LAFSliderPan":
        
            //base
            g.setColour(obj.hover ? 0xFFc2c2c2 : 0xFFAAAAAA);
            g.fillRoundedRectangle([0, 0, obj.area[2], obj.area[3]], 1.0);
            
            
            g.setColour(0xFF333333);
            g.fillRoundedRectangle([(obj.area[2] * .95) * obj.valueNormalized - 1, 0, 6, obj.area[3]], 0);
            
            //value dragger
            g.setColour(Colours.grey);
            g.fillRoundedRectangle([(obj.area[2] * .95) * obj.valueNormalized, 0, 4, obj.area[3]], 0);
        break;
        
        case "LAFSliderOutputGain":
            g.setColour(Colours.lightgrey);
            g.fillRoundedRectangle([(obj.area[2] * 0.98) * obj.valueNormalized, 0, 2, obj.area[3]], 2.0);
        break;
        
        case "LAF_SliderPDQBassVel":
            g.setColour(Colours.white);
            g.fillRoundedRectangle(obj.area, 2.0);
            g.setColour(0xFB111111);
            g.setFont("Arial", 12);
            g.drawAlignedText(Math.round(obj.value), obj.area, "centred");
        break;
        
        case "LAFSliderOracleSampleOffset":
            g.setColour(Colours.grey);
            g.drawRoundedRectangle(obj.area, 2.0, 1.0);
            g.setColour(Colours.lightblue);
            g.drawLine(obj.area[2] * obj.valueNormalized, obj.area[2] * obj.valueNormalized, 0, obj.area[3], 1.0);
            g.setColour(0xB11A1A1A);        
            g.fillRoundedRectangle([0, 0, obj.area[2] * obj.valueNormalized, obj.area[3]], 2.0);
        break;
        
        case "LAFSliderMovementX":
            g.setColour(0xFB111111);
            g.fillRoundedRectangle(obj.area, 4.0);
            g.setColour(Colours.darkgrey);
            g.drawRoundedRectangle(obj.area, 4.0, .75);
            g.setColour(Colours.lightgrey);
            //g.drawRoundedRectangle([Math.range(obj.area[2] * obj.valueNormalized, 2, 192), obj.area[3] / 2 - 2, 6, 4], 1.0, 1.0);
            g.drawRoundedRectangle([Math.range(obj.area[2] * obj.valueNormalized, 3, obj.area[2] - 6), obj.area[3] / 2 - 2, 6, 4], 1.0, 1.0);
        break;
        
        case "LAFSliderMovementY":
            g.setColour(0xFB111111);
            g.fillRoundedRectangle(obj.area, 4.0);
            g.setColour(Colours.darkgrey);
            g.drawRoundedRectangle(obj.area, 4.0, .75);
            g.setColour(Colours.lightgrey);
            g.drawRoundedRectangle([obj.area[2] / 2 - 2, Math.range(obj.area[3] - obj.area[3] * obj.valueNormalized, 3, obj.area[3] - 6), 4, 6], 1.0, 1.0);
        break;
    }
});

*/

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
