const laf = Engine.createGlobalScriptLookAndFeel();

laf.loadImage("{PROJECT_FOLDER}randomizationButtonDice.png", "randomizationButtonDiceImage"); 
laf.loadImage("{PROJECT_FOLDER}randomizationVisibility.png", "randomizationButtonVisibilityImage"); 

laf.loadImage("{PROJECT_FOLDER}installSingleExpansionButton.png", "installSingleExpansionImage"); 
laf.loadImage("{PROJECT_FOLDER}installBulkExpansionButton.png", "bulkInstallImage"); 

laf.loadImage("{PROJECT_FOLDER}samplerShowADSRButtonOff.png", "samplerShowADSRButtonOff"); 
laf.loadImage("{PROJECT_FOLDER}samplerShowADSRButtonOn.png", "samplerShowADSRButtonOn"); 

const var path = Content.createPath();
include("LAFPathData.js");

Panel_BG.setPaintRoutine(function(g)
{
	 g.setColour(Colours.grey);
	 g.drawRoundedRectangle([Panel_BG.getGlobalPositionX(), Panel_BG.getGlobalPositionY() - 32, Panel_BG.getWidth() - 4, Panel_BG.getHeight() - 4], 2, 1);
});


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

//Slider

const var sliderRing = Content.createPath();
const var sliderRing2 = Content.createPath();

sliderRing.loadFromData(ringData);

sliderRing2.startNewSubPath(0.5, 1.0);
sliderRing2.addArc([0.0, 0.0, 1.0, 1.0], -Math.PI*0.75, Math.PI * 0.75);

inline function reduced(obj, amount)
{
    return [amount, amount, obj.area[2] - 2*amount, obj.area[3] - 2* amount];
}

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
