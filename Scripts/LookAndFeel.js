const laf = Engine.createGlobalScriptLookAndFeel();

const var path = Content.createPath();

function LAFFXButton()
{
    g.drawLine(0, 6, 0, 0, 1.0);
    g.drawLine(0, 0, 0, 6, 1.0);
    g.drawLine(obj.area[2], obj.area[2] - 6, 0, 0, 1.0);
    g.drawLine(obj.area[2], obj.area[2], 0, 6, 1.0);
    g.drawLine(0, 6, obj.area[3], obj.area[3], 1.0);
    g.drawLine(0, 0, obj.area[3], obj.area[3] - 6, 1.0);
    g.drawLine(obj.area[2], obj.area[2] - 6, obj.area[3], obj.area[3], 1.0);
    g.drawLine(obj.area[2], obj.area[2], obj.area[3], obj.area[3] - 6, 1.0);
}

const var randomizationButtonData = [110,109,215,163,32,65,0,0,0,65,108,10,215,31,66,0,0,0,65,98,16,88,36,66,0,0,0,65,0,0,40,66,190,159,14,65,0,0,40,66,215,163,32,65,108,0,0,40,66,10,215,31,66,98,0,0,40,66,16,88,36,66,16,88,36,66,0,0,40,66,10,215,31,66,0,0,40,66,108,215,163,32,65,0,0,40,
66,98,190,159,14,65,0,0,40,66,0,0,0,65,16,88,36,66,0,0,0,65,10,215,31,66,108,0,0,0,65,215,163,32,65,98,0,0,0,65,190,159,14,65,190,159,14,65,0,0,0,65,215,163,32,65,0,0,0,65,99,101,0,0];

const var randomizationButtonFillData = [110,109,227,165,206,65,227,165,223,65,108,16,88,166,65,227,165,223,65,108,16,88,166,65,0,0,24,66,108,59,223,143,65,0,0,24,66,108,59,223,143,65,104,145,93,65,108,59,223,196,65,104,145,93,65,108,59,223,196,65,104,145,93,65,113,139,108,232,65,104,145,93,
65,115,104,249,65,180,200,120,65,108,115,104,249,65,180,200,120,65,108,115,104,249,65,180,200,120,65,113,39,49,5,66,12,2,138,65,39,49,5,66,41,92,165,65,108,39,49,5,66,41,92,165,65,108,39,49,5,66,41,92,165,65,113,39,49,5,66,33,176,203,65,55,137,227,65,
2,43,217,65,108,55,137,227,65,2,43,217,65,108,0,0,12,66,0,0,24,66,108,152,110,253,65,0,0,24,66,108,227,165,206,65,227,165,223,65,99,109,16,88,166,65,213,120,130,65,108,16,88,166,65,29,90,204,65,108,209,34,197,65,29,90,204,65,108,209,34,197,65,29,90,204,
65,113,145,237,220,65,29,90,204,65,37,6,232,65,109,231,194,65,108,37,6,232,65,109,231,194,65,108,37,6,232,65,109,231,194,65,113,197,32,243,65,188,116,185,65,197,32,243,65,80,141,166,65,108,197,32,243,65,80,141,166,65,108,197,32,243,65,80,141,166,65,113,
197,32,243,65,90,100,147,65,242,210,231,65,145,237,138,65,108,242,210,231,65,145,237,138,65,108,242,210,231,65,145,237,138,65,113,43,135,220,65,213,120,130,65,80,141,195,65,213,120,130,65,108,80,141,195,65,213,120,130,65,108,16,88,166,65,213,120,130,
65,99,101,0,0];

const var randomizationButtonsVisibilityData = [110,109,0,0,128,64,0,0,200,65,113,6,129,207,65,25,4,158,64,0,0,56,66,0,0,200,65,109,0,0,128,64,0,0,200,65,113,6,129,207,65,131,64,52,66,0,0,56,66,0,0,200,65,109,0,0,112,65,0,0,200,65,98,0,0,112,65,23,217,155,65,23,217,155,65,0,0,112,65,0,0,200,65,0,0,
    112,65,98,233,38,244,65,0,0,112,65,0,0,12,66,23,217,155,65,0,0,12,66,0,0,200,65,98,0,0,12,66,233,38,244,65,233,38,244,65,0,0,12,66,0,0,200,65,0,0,12,66,98,23,217,155,65,0,0,12,66,0,0,112,65,233,38,244,65,0,0,112,65,0,0,200,65,99,109,0,0,112,65,0,0,200,
    65,98,0,0,112,65,23,217,155,65,23,217,155,65,0,0,112,65,0,0,200,65,0,0,112,65,98,233,38,244,65,0,0,112,65,0,0,12,66,23,217,155,65,0,0,12,66,0,0,200,65,98,0,0,12,66,233,38,244,65,233,38,244,65,0,0,12,66,0,0,200,65,0,0,12,66,98,23,217,155,65,0,0,12,66,
    0,0,112,65,233,38,244,65,0,0,112,65,0,0,200,65,99,109,0,0,112,65,0,0,200,65,98,0,0,112,65,23,217,155,65,23,217,155,65,0,0,112,65,0,0,200,65,0,0,112,65,98,233,38,244,65,0,0,112,65,0,0,12,66,23,217,155,65,0,0,12,66,0,0,200,65,98,0,0,12,66,233,38,244,65,
    233,38,244,65,0,0,12,66,0,0,200,65,0,0,12,66,98,23,217,155,65,0,0,12,66,0,0,112,65,233,38,244,65,0,0,112,65,0,0,200,65,99,109,0,0,184,65,0,0,200,65,98,0,0,184,65,2,43,191,65,2,43,191,65,0,0,184,65,0,0,200,65,0,0,184,65,98,254,212,208,65,0,0,184,65,0,
    0,216,65,2,43,191,65,0,0,216,65,0,0,200,65,98,0,0,216,65,254,212,208,65,254,212,208,65,0,0,216,65,0,0,200,65,0,0,216,65,98,2,43,191,65,0,0,216,65,0,0,184,65,254,212,208,65,0,0,184,65,0,0,200,65,99,109,0,0,184,65,0,0,200,65,98,0,0,184,65,2,43,191,65,2,
    43,191,65,0,0,184,65,0,0,200,65,0,0,184,65,98,254,212,208,65,0,0,184,65,0,0,216,65,2,43,191,65,0,0,216,65,0,0,200,65,98,0,0,216,65,254,212,208,65,254,212,208,65,0,0,216,65,0,0,200,65,0,0,216,65,98,2,43,191,65,0,0,216,65,0,0,184,65,254,212,208,65,0,0,
    184,65,0,0,200,65,99,109,0,0,184,65,0,0,200,65,98,0,0,184,65,2,43,191,65,2,43,191,65,0,0,184,65,0,0,200,65,0,0,184,65,98,254,212,208,65,0,0,184,65,0,0,216,65,2,43,191,65,0,0,216,65,0,0,200,65,98,0,0,216,65,254,212,208,65,254,212,208,65,0,0,216,65,0,0,
    200,65,0,0,216,65,98,2,43,191,65,0,0,216,65,0,0,184,65,254,212,208,65,0,0,184,65,0,0,200,65,99,101,0,0 ];

const var arpResetButtonStrokeData = [110,109,0,0,32,64,66,96,101,64,98,104,145,77,64,217,206,39,64,229,208,138,64,98,16,0,64,248,83,179,64,98,16,0,64,98,197,32,248,64,98,16,0,64,0,0,24,65,131,192,114,64,0,0,24,65,0,0,192,64,98,0,0,24,65,223,79,3,65,197,32,248,64,231,251,31,65,248,83,179,
64,231,251,31,65,98,106,188,148,64,231,251,31,65,213,120,113,64,236,81,26,65,25,4,70,64,145,237,16,65,101,0,0 ];

const var arpResetButtonFillData = [110,109,229,208,226,63,168,198,219,63,108,205,204,140,63,33,176,174,64,108,59,223,143,64,197,32,112,64,99,101,0,0 ];

const var openAppDataFolderButtonFillDataBack = [110,109,223,79,59,65,0,0,160,65,108,223,79,59,65,0,0,32,65,113,236,81,58,65,125,63,3,65,223,79,91,65,131,192,2,65,113,66,96,128,65,14,45,2,65,0,0,126,65,0,0,32,65,108,240,167,213,65,0,0,32,65,113,197,32,226,65,43,135,44,65,4,86,225,65,180,200,74,65,113,
199,75,195,65,37,6,75,65,119,190,103,65,180,200,74,65,113,119,190,79,65,250,126,80,65,223,79,59,65,0,0,160,65,99,101,0,0 ];

const var openAppDataFolderButtonFillDataFront = [110,109,184,30,119,65,240,167,82,65,108,190,159,219,65,240,167,82,65,98,227,165,227,65,240,167,82,65,158,239,232,65,188,116,95,65,139,108,231,65,76,55,111,65,108,174,71,220,65,82,184,177,65,98,156,196,218,65,154,153,185,65,49,8,211,65,0,0,192,65,12,2,
203,65,0,0,192,65,108,111,18,77,65,0,0,192,65,98,37,6,61,65,0,0,192,65,213,120,51,65,82,184,185,65,143,194,55,65,244,253,177,65,108,242,210,89,65,170,241,104,65,98,100,59,93,65,215,163,92,65,53,94,106,65,240,167,82,65,184,30,119,65,240,167,82,65,99,101,
0,0 ];

const var settingsCogwheelData = [ 110,109,182,243,138,66,225,186,155,66,98,0,0,131,66,80,77,161,66,160,154,115,66,76,55,165,66,88,185,95,66,207,247,166,66,108,35,219,90,66,0,0,184,66,108,221,36,53,66,0,0,184,66,108,168,70,48,66,207,247,166,66,98,96,101,28,66,76,55,165,66,0,0,10,66,80,
77,161,66,39,49,244,65,225,186,155,66,108,123,20,189,65,98,16,166,66,108,119,190,135,65,225,186,152,66,108,123,20,177,65,182,243,138,66,98,193,202,154,65,0,0,131,66,209,34,139,65,160,154,115,66,197,32,132,65,88,185,95,66,108,0,0,0,65,35,219,90,66,108,
0,0,0,65,221,36,53,66,108,197,32,132,65,168,70,48,66,98,209,34,139,65,96,101,28,66,193,202,154,65,0,0,10,66,123,20,177,65,39,49,244,65,108,119,190,135,65,123,20,189,65,108,123,20,189,65,119,190,135,65,108,39,49,244,65,123,20,177,65,98,0,0,10,66,193,202,
154,65,96,101,28,66,209,34,139,65,168,70,48,66,197,32,132,65,108,221,36,53,66,0,0,0,65,108,35,219,90,66,0,0,0,65,108,88,185,95,66,197,32,132,65,98,160,154,115,66,209,34,139,65,0,0,131,66,193,202,154,65,182,243,138,66,123,20,177,65,108,225,186,152,66,
119,190,135,65,108,98,16,166,66,123,20,189,65,108,225,186,155,66,39,49,244,65,98,80,77,161,66,0,0,10,66,76,55,165,66,96,101,28,66,207,247,166,66,168,70,48,66,108,0,0,184,66,221,36,53,66,108,0,0,184,66,35,219,90,66,108,207,247,166,66,88,185,95,66,98,76,
55,165,66,160,154,115,66,80,77,161,66,0,0,131,66,225,186,155,66,182,243,138,66,108,98,16,166,66,225,186,152,66,108,225,186,152,66,98,16,166,66,108,182,243,138,66,225,186,155,66,99,101,0,0 ];

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
    
    //set area 
    if (obj.value)       
        {
            if (obj.over)
            {
                g.setColour(Colours.white);
                g.drawRoundedRectangle(obj.area, 2, 1);
                path.loadFromData(randomizationButtonFillData);
                g.fillPath(path, [a[0] + 2, a[1] + 2, a[2] - 4, a[3] - 4]);
                
            }
            else
            {
                g.setColour(Colours.lightgrey);
                g.drawRoundedRectangle(obj.area, 2, 1); 
                path.loadFromData(randomizationButtonFillData);
                g.fillPath(path, [a[0] + 2, a[1] + 2, a[2] - 4, a[3] - 4]);
            }
        }
    else 
        {
            if (obj.over)
            {
                g.setColour(Colours.grey);
                g.drawRoundedRectangle(obj.area, 2, 1);
                path.loadFromData(randomizationButtonFillData);
                g.fillPath(path, [a[0] + 2, a[1] + 2, a[2] - 4, a[3] - 4]);
            }
            else
            {
                g.setColour(Colours.darkgrey);
                g.drawRoundedRectangle(obj.area, 2, 1); 
                path.loadFromData(randomizationButtonFillData);
                g.fillPath(path, [a[0] + 2, a[1] + 2, a[2] - 4, a[3] - 4]);
            }
        }

    break;
    
    case "LAFButtonBypass":
        g.setColour(Colours.grey);
        g.fillEllipse(obj.area);     
        if (obj.value)
            if (obj.over)
            {
                g.setColour(Colours.lightgrey);
                g.fillEllipse([a[0]+1, a[1]+1, a[2]-2, a[3]-2]);
            }
            else
            {
                g.setColour(Colours.lightblue);
                g.fillEllipse([a[0]+1, a[1]+1, a[2]-2, a[3]-2]);
            }
        else 
            if (obj.over)
            {
                g.setColour(Colours.grey);
                g.fillEllipse([a[0]+1, a[1]+1, a[2]-2, a[3]-2]);
            }
            else
            {
                g.setColour(Colours.darkgrey);
                g.fillEllipse([a[0]+1, a[1]+1, a[2]-2, a[3]-2]);
            }        

    break;    
    
    case "LAFButtonFXSettings":
        g.setColour(0xFF0A0A0A);
        g.fillRoundedRectangle(obj.area, 4.0);
        if (obj.value)
        {
            if (obj.over)
            {
                g.setColour(Colours.white);
                LAFFXButton();
            }
            else
            {
                g.setColour(Colours.lightgrey);
                LAFFXButton();
            }
        }
        else
        {
            if (obj.over)
            {
                g.setColour(Colours.grey);
                LAFFXButton();
            }
            else
            {
                g.setColour(Colours.darkgrey);
                LAFFXButton();
            }
        }
    break;  
    
    case "LAFButtonClose":
            if (obj.over)
            {
                g.setColour(Colours.darkgrey);
                g.fillRoundedRectangle(obj.area, 4.0);
                g.setColour(Colours.lightgrey);
                g.drawRoundedRectangle(obj.area, 4.0, 1.0);
                g.setColour(Colours.white);
                g.setFont("Arial", 12.0);
                g.drawAlignedText("X", obj.area, "centred");
            }
            else
            {
                g.setColour(0xFB111111);
                g.fillRoundedRectangle(obj.area, 4.0);
                g.setColour(Colours.grey);
                g.drawRoundedRectangle(obj.area, 4.0, 1.0);
                g.setColour(Colours.white);
                g.setFont("Arial", 12.0);
                g.drawAlignedText("X", obj.area, "centred");
            }
    break;
    
    case "LAFButtonClosePresetBrowser":
    if (obj.over)
            {
                g.setColour(Colours.white);
                g.setFont("Arial", 14.0);
                g.drawAlignedText("x", obj.area, "centred");
            }
            else
            {
                g.setColour(Colours.lightgrey);
                g.setFont("Arial", 14.0);
                g.drawAlignedText("x", obj.area, "centred");
            }
    break;
    
    case "LAFButtonChangePage":
    if (obj.value)
        {
            if (obj.over)
            {
                g.setColour(Colours.darkgrey);
                g.fillRoundedRectangle(obj.area, 4.0);
                g.setColour(Colours.lightgrey);
                g.drawRoundedRectangle(obj.area, 4.0, 1.0);
            }
            else
            {
                g.setColour(Colours.darkgrey);
                g.fillRoundedRectangle(obj.area, 4.0);
                g.setColour(Colours.grey);
                g.drawRoundedRectangle(obj.area, 4.0, 1.0);
            }
        }
    else 
        {
            if (obj.over)
            {
                g.setColour(Colours.darkgrey);
                g.fillRoundedRectangle(obj.area, 4.0);
                g.setColour(Colours.lightgrey);
                g.drawRoundedRectangle(obj.area, 4.0, 1.0);
            }
            else
            {
                g.setColour(0xFB111111);
                g.fillRoundedRectangle(obj.area, 4.0);
                g.setColour(Colours.grey);
                g.drawRoundedRectangle(obj.area, 4.0, 1.0);
            }
        }
    break;  
    
    case "LAFButtonSetup":
    if (obj.value)
        {
            if (obj.over)
            {
                g.setColour(Colours.darkgrey);
                g.fillRoundedRectangle(obj.area, 4.0);
                g.setColour(Colours.lightgrey);
                g.drawRoundedRectangle(obj.area, 4.0, 1.0);
            }
            else
            {
                g.setColour(Colours.darkgrey);
                g.fillRoundedRectangle(obj.area, 4.0);
                g.setColour(Colours.grey);
                g.drawRoundedRectangle(obj.area, 4.0, 1.0);
            }  
        }
    else
        {
            if (obj.over)
            {
                g.setColour(Colours.darkgrey);
                g.fillRoundedRectangle(obj.area, 4.0);
                g.setColour(Colours.lightgrey);
                g.drawRoundedRectangle(obj.area, 4.0, 1.0);
            }
            else
            {
                g.setColour(0xFB111111);
                g.fillRoundedRectangle(obj.area, 4.0);
                g.setColour(Colours.grey);
                g.drawRoundedRectangle(obj.area, 4.0, 1.0);
            }  
        }
          
    break;  
    
    case "LAFButtonRandomizeVisibility":
        path.loadFromData(randomizationButtonsVisibilityData);    
        if (obj.value)
        {
            if (obj.over)
            {
                g.setColour(0xFB111111);
                g.fillRoundedRectangle(obj.area, 3.0);
                g.setColour(Colours.grey);
                g.drawRoundedRectangle(obj.area, 3.0, 1.0);
                g.setColour(Colours.white);
                g.drawPath(path, [obj.area[0] + 3, obj.area[1], obj.area[2] - 6, obj.area[3]], 1);                
            }
            
            else
            {
                g.setColour(0xFB111111);
                g.fillRoundedRectangle(obj.area, 3.0);
                g.setColour(Colours.grey);
                g.drawRoundedRectangle(obj.area, 3.0, 1.0);
                g.setColour(Colours.lightgrey);
                g.drawPath(path, [obj.area[0] + 3, obj.area[1], obj.area[2] - 6, obj.area[3]], 1);                
            }
        }
        else
        {
            if (obj.over)
            {
                g.setColour(0xFB111111);
                g.fillRoundedRectangle(obj.area, 3.0);
                g.setColour(Colours.grey);
                g.drawRoundedRectangle(obj.area, 3.0, 1.0);
                g.setColour(Colours.lightgrey);
                g.drawPath(path, [obj.area[0] + 3, obj.area[1], obj.area[2] - 6, obj.area[3]], 1);
            }
            
            else
            {
                g.setColour(0xFB111111);
                g.fillRoundedRectangle(obj.area, 3.0);
                g.setColour(Colours.grey);
                g.drawRoundedRectangle(obj.area, 3.0, 1.0);
                g.setColour(Colours.darkgrey);
                g.drawPath(path, [obj.area[0] + 3, obj.area[1], obj.area[2] - 6, obj.area[3]], 1);                
            }            
        }
    break;
    
    case "LAFButtonZoom":
    //Need value for + or -
    if (obj.value)
        {
if (obj.over)
            {
                //Circles
                g.setColour(Colours.lightgrey);
                g.fillEllipse([obj.area[0] + 2, obj.area[1] + 2, obj.area[2] - 16, obj.area[3] - 16]);
                g.setColour(Colours.darkgrey);
                g.drawEllipse([obj.area[0] + 2, obj.area[1] + 2, obj.area[2] - 16, obj.area[3] - 16], 2);
                //Handle
                g.drawLine(obj.area[0] + 16, obj.area[2] - 7, obj.area[1] + 16, obj.area[3] - 7, 2.0);
                //Minus sign
                g.drawLine(obj.area[0] + 6, obj.area[0] + 14, obj.area[1] + 10, obj.area[1] + 10, 2.0);
            }
            else
            {
                //Circles
                g.setColour(Colours.lightgrey);
                g.fillEllipse([obj.area[0] + 2, obj.area[1] + 2, obj.area[2] - 16, obj.area[3] - 16]);
                g.setColour(0xFB363636);
                g.drawEllipse([obj.area[0] + 2, obj.area[1] + 2, obj.area[2] - 16, obj.area[3] - 16], 2);
                //Handle
                g.drawLine(obj.area[0] + 16, obj.area[2] - 7, obj.area[1] + 16, obj.area[3] - 7, 2.0);
                //Minus sign
                g.drawLine(obj.area[0] + 6, obj.area[0] + 14, obj.area[1] + 10, obj.area[1] + 10, 2.0);
            }
        }
    else 
        {
            if (obj.over)
            {
                //Circles
                g.setColour(Colours.lightgrey);
                g.fillEllipse([obj.area[0] + 2, obj.area[1] + 2, obj.area[2] - 16, obj.area[3] - 16]);
                g.setColour(Colours.darkgrey);
                g.drawEllipse([obj.area[0] + 2, obj.area[1] + 2, obj.area[2] - 16, obj.area[3] - 16], 2);
                //Handle
                g.drawLine(obj.area[0] + 16, obj.area[2] - 7, obj.area[1] + 16, obj.area[3] - 7, 2.0);
                //Plus sign
                g.drawLine(obj.area[0] + 6, obj.area[0] + 14, obj.area[1] + 10, obj.area[1] + 10, 2.0);
                g.drawLine(obj.area[0] + 10, obj.area[0] + 10, obj.area[1] + 6, obj.area[1] + 14, 2.0);
            }
            else
            {
                //Circles
                g.setColour(Colours.lightgrey);
                g.fillEllipse([obj.area[0] + 2, obj.area[1] + 2, obj.area[2] - 16, obj.area[3] - 16]);
                g.setColour(0xFB363636);
                g.drawEllipse([obj.area[0] + 2, obj.area[1] + 2, obj.area[2] - 16, obj.area[3] - 16], 2);
                //Handle
                g.drawLine(obj.area[0] + 16, obj.area[2] - 7, obj.area[1] + 16, obj.area[3] - 7, 2.0);
                //Plus sign
                g.drawLine(obj.area[0] + 6, obj.area[0] + 14, obj.area[1] + 10, obj.area[1] + 10, 2.0);
                g.drawLine(obj.area[0] + 10, obj.area[0] + 10, obj.area[1] + 6, obj.area[1] + 14, 2.0);
            }
        }
        
    break; 
    
    case "LAFArpResetButton":
            if (obj.over)
            {
                path.clear();
                path.loadFromData(arpResetButtonStrokeData);                
                g.setColour(Colours.white);
                g.drawPath(path, reduced(obj, 3.0), 2);
                path.clear();
                path.loadFromData(arpResetButtonFillData);
                g.fillPath(path, [obj.area[0] + 1, obj.area[1] + 1, obj.area[2] - 8, obj.area[3] - 8]);
            }
            
            else
            {
                path.clear();
                path.loadFromData(arpResetButtonStrokeData);                
                g.setColour(Colours.lightgrey);
                g.drawPath(path, reduced(obj, 3.0), 2);
                path.clear();
                path.loadFromData(arpResetButtonFillData);
                g.fillPath(path, [obj.area[0] + 1, obj.area[1] + 1, obj.area[2] - 8, obj.area[3] - 8]);               
            } 
    break;
    
    case "LAFArpInvertButton":
        if (obj.over)
            {              
                g.setColour(Colours.white);
                g.drawLine(obj.area[2] / 2, obj.area[2] / 2, 4, obj.area[3] - 4, 2.0);
                g.fillTriangle([3, 0, obj.area[2] / 2, obj.area[3] - 8], Math.toRadians(0));
                g.fillTriangle([3, obj.area[3] - 4, obj.area[2] / 2, obj.area[3] - 8], Math.toRadians(180));
            }
            
            else
            {                
                g.setColour(Colours.lightgrey);
                g.drawLine(obj.area[2] / 2, obj.area[2] / 2, 4, obj.area[3] - 4, 2.0);
                g.fillTriangle([3, 0, obj.area[2] / 2, obj.area[3] - 8], Math.toRadians(0));
                g.fillTriangle([3, obj.area[3] - 4, obj.area[2] / 2, obj.area[3] - 8], Math.toRadians(180));
            } 
    break;
    
    case "LAFArpMinorButton":
        if (obj.over)
            {
                g.setColour(Colours.white);
                path.clear();
                path.addArc([obj.area[0] + 2, obj.area[1] + 8, obj.area[2] - 4, obj.area[3] / 2], Math.toRadians(270.0), Math.toRadians(90.0));
                g.rotate(Math.toRadians(180.0), [obj.area[2] / 2, obj.area[3] / 2]);
                g.drawPath(path, [obj.area[0] + 2, obj.area[1] + 1, obj.area[2]-4, obj.area[3] - 10], 2.0);
                g.rotate(Math.toRadians(180.0), [obj.area[2] / 2, obj.area[3] / 2]);
                g.fillEllipse([2, 3, 3, 3]);
                g.fillEllipse([obj.area[2] - 5, 3, 3, 3]);  
            }
            else
            {
                g.setColour(Colours.lightgrey);
                path.clear();
                path.addArc([obj.area[0] + 2, obj.area[1] + 8, obj.area[2] - 4, obj.area[3] / 2], Math.toRadians(270.0), Math.toRadians(90.0));
                g.rotate(Math.toRadians(180.0), [obj.area[2] / 2, obj.area[3] / 2]);
                g.drawPath(path, [obj.area[0] + 2, obj.area[1] + 1, obj.area[2]-4, obj.area[3] - 10], 2.0);
                g.rotate(Math.toRadians(180.0), [obj.area[2] / 2, obj.area[3] / 2]);
                g.fillEllipse([2, 3, 3, 3]);
                g.fillEllipse([obj.area[2] - 5, 3, 3, 3]);
            }
    break;
    
    case "LAFArpMajorButton":
    if (obj.over)
            {
                g.setColour(Colours.white);
                path.clear();
                path.addArc([obj.area[0] + 2, obj.area[1] + 8, obj.area[2] - 4, obj.area[3] / 2], Math.toRadians(270.0), Math.toRadians(90.0));
                g.drawPath(path, [obj.area[0] + 2, obj.area[1] + 9, obj.area[2]-4, obj.area[3] - 10], 2.0);
                g.fillEllipse([2, 3, 3, 3]);
                g.fillEllipse([obj.area[2] - 5, 3, 3, 3]);   
            }
            else
            {
                g.setColour(Colours.lightgrey);
                path.clear();
                path.addArc([obj.area[0] + 2, obj.area[1] + 8, obj.area[2] - 4, obj.area[3] / 2], Math.toRadians(270.0), Math.toRadians(90.0));
                g.drawPath(path, [obj.area[0] + 2, obj.area[1] + 9, obj.area[2]-4, obj.area[3] - 10], 2.0);
                g.fillEllipse([2, 3, 3, 3]);
                g.fillEllipse([obj.area[2] - 5, 3, 3, 3]);
            }
    break;
 
    case "LAFButtonKeyboardUp":
        if (obj.over)
        {
            g.setColour(Colours.white);
            g.fillTriangle(obj.area, 0.0);
        }

        else
        {
            g.setColour(Colours.lightgrey);
            g.fillTriangle(obj.area, 0.0);
        }
    break;   
    
    case "LAFButtonKeyboardDown":
        if (obj.over)
        {
            g.setColour(Colours.white);
            g.rotate(Math.toRadians(180.0), [obj.area[2] / 2, obj.area[3] / 2]);
            g.fillTriangle(obj.area, 0.0);
        }

        else
        {
            g.setColour(Colours.lightgrey);
            g.rotate(Math.toRadians(180.0), [obj.area[2] / 2, obj.area[3] / 2]);
            g.fillTriangle(obj.area, 0.0); 
        }
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
        {
            g.setColour(Colours.white);
            g.fillTriangle(obj.area, 0);
        }
        else
        {
            g.setColour(Colours.lightgrey);
            g.fillTriangle(obj.area, 0);
        }
    break;
    
    case "LAFButtonDownArrow":
        if (obj.over)
        {
            g.setColour(Colours.white);
            g.fillTriangle(obj.area, Math.toRadians(180));
        }
        else
        {
            g.setColour(Colours.lightgrey);
            g.fillTriangle(obj.area, Math.toRadians(180));
        }
    break;
    
    case "LAFButtonSamplerABypass":
        if (obj.value)
        {
            if (obj.over)
            {
                g.setColour(Colours.white);
                g.drawRoundedRectangle(obj.area, 4.0, .5);
                g.setFont("Arial", 12.0);
                g.drawAlignedText("A", obj.area, "centred");
            }
            else
            {
                g.setColour(Colours.lightgrey);
                g.drawRoundedRectangle(obj.area, 4.0, .5);
                g.setFont("Arial", 12.0);
                g.drawAlignedText("A", obj.area, "centred");
            }
        }
        else
        {
            if (obj.over)
            {
                g.setColour(Colours.grey);
                g.drawRoundedRectangle(obj.area, 4.0, .5);
                g.setFont("Arial", 12.0);
                g.drawAlignedText("A", obj.area, "centred");
            }
            else
            {
                g.setColour(Colours.darkgrey);
                g.drawRoundedRectangle(obj.area, 4.0, .5);
                g.setFont("Arial", 12.0);
                g.drawAlignedText("A", obj.area, "centred");
            }
        }
    break;
    
    case "LAFButtonSamplerBBypass":
        if (obj.value)
        {
            if (obj.over)
            {
                g.setColour(Colours.white);
                g.drawRoundedRectangle(obj.area, 4.0, .5);
                g.setFont("Arial", 12.0);
                g.drawAlignedText("B", obj.area, "centred");
            }
            else
            {
                g.setColour(Colours.lightgrey);
                g.drawRoundedRectangle(obj.area, 4.0, .5);
                g.setFont("Arial", 12.0);
                g.drawAlignedText("B", obj.area, "centred");
            }
        }
        else
        {
            if (obj.over)
            {
                g.setColour(Colours.grey);
                g.drawRoundedRectangle(obj.area, 4.0, .5);
                g.setFont("Arial", 12.0);
                g.drawAlignedText("B", obj.area, "centred");
            }
            else
            {
                g.setColour(Colours.darkgrey);
                g.drawRoundedRectangle(obj.area, 4.0, .5);
                g.setFont("Arial", 12.0);
                g.drawAlignedText("B", obj.area, "centred");
            }
        }
    break;
    
    case "LAFButtonSamplerCBypass":
        if (obj.value)
        {
            if (obj.over)
            {
                g.setColour(Colours.white);
                g.drawRoundedRectangle(obj.area, 4.0, .5);
                g.setFont("Arial", 12.0);
                g.drawAlignedText("C", obj.area, "centred");
            }
            else
            {
                g.setColour(Colours.lightgrey);
                g.drawRoundedRectangle(obj.area, 4.0, .5);
                g.setFont("Arial", 12.0);
                g.drawAlignedText("C", obj.area, "centred");
            }
        }
        else
        {
            if (obj.over)
            {
                g.setColour(Colours.grey);
                g.drawRoundedRectangle(obj.area, 4.0, .5);
                g.setFont("Arial", 12.0);
                g.drawAlignedText("C", obj.area, "centred");
            }
            else
            {
                g.setColour(Colours.darkgrey);
                g.drawRoundedRectangle(obj.area, 4.0, .5);
                g.setFont("Arial", 12.0);
                g.drawAlignedText("C", obj.area, "centred");
            }
        }
    break;
    
    case "LAFButtonSamplerReverse":
        if (obj.value)
        {
            if (obj.over)
            {
                g.setColour(Colours.white);
                g.drawRoundedRectangle(obj.area, 4.0, .5);
                g.setFont("Arial", 9.0);
                g.drawAlignedText("REV", obj.area, "centred");
            }
            else
            {
                g.setColour(Colours.lightgrey);
                g.drawRoundedRectangle(obj.area, 4.0, .5);
                g.setFont("Arial", 9.0);
                g.drawAlignedText("REV", obj.area, "centred");
            }
        }
        else
        {
            if (obj.over)
            {
                g.setColour(Colours.grey);
                g.drawRoundedRectangle(obj.area, 4.0, .5);
                g.setFont("Arial", 9.0);
                g.drawAlignedText("REV", obj.area, "centred");
            }
            else
            {
                g.setColour(Colours.darkgrey);
                g.drawRoundedRectangle(obj.area, 4.0, .5);
                g.setFont("Arial", 9.0);
                g.drawAlignedText("REV", obj.area, "centred");
            }
        }
    break;
    
    case "LAFButtonMacroAssignA":
        g.setFont("Arial", 12);
        if (obj.value)
        {
            if (obj.over)
            {
                g.setColour(Colours.white);
                g.drawRoundedRectangle(obj.area, 4.0, 1);
                g.drawAlignedText("X", obj.area, "centred");
            }
            else
            {
                g.setColour(Colours.lightgrey);
                g.drawRoundedRectangle(obj.area, 4.0, 1);
                g.drawAlignedText("X", obj.area, "centred");
            }
        }
        else
        {
            if (obj.over)
            {
                g.setColour(Colours.grey);
                g.drawRoundedRectangle(obj.area, 4.0, 1);
                g.drawAlignedText("X", obj.area, "centred");
            }
            else
            {
                g.setColour(Colours.darkgrey);
                g.drawRoundedRectangle(obj.area, 4.0, 1);
                g.drawAlignedText("X", obj.area, "centred");
            }
        }
    break;
    
    case "LAFButtonMacroAssignB":
        g.setFont("Arial", 12);
        if (obj.value)
        {
            if (obj.over)
            {
                g.setColour(Colours.white);
                g.drawRoundedRectangle(obj.area, 4.0, 1);
                g.drawAlignedText("Y", obj.area, "centred");
            }
            else
            {
                g.setColour(Colours.lightgrey);
                g.drawRoundedRectangle(obj.area, 4.0, 1);
                g.drawAlignedText("Y", obj.area, "centred");
            }
        }
        else
        {
            if (obj.over)
            {
                g.setColour(Colours.grey);
                g.drawRoundedRectangle(obj.area, 4.0, 1);
                g.drawAlignedText("Y", obj.area, "centred");
            }
            else
            {
                g.setColour(Colours.darkgrey);
                g.drawRoundedRectangle(obj.area, 4.0, 1);
                g.drawAlignedText("Y", obj.area, "centred");
            }
        }
    break;
    
    case "LAFButtonSettingsCogwheel":
        if (obj.value)
        {
            if (obj.over)
            {
                g.setColour(Colours.white);
                path.loadFromData(settingsCogwheelData);
                g.fillPath(path, obj.area);
                g.setColour(0xE4060606);
                g.fillEllipse([3, 3, obj.area[2] - 6, obj.area[3] - 6]);
            }
            else
            {
                g.setColour(Colours.lightgrey);
                path.loadFromData(settingsCogwheelData);
                g.fillPath(path, obj.area);
                g.setColour(0xE4060606);
                g.fillEllipse([3, 3, obj.area[2] - 6, obj.area[3] - 6]);
            }
        }
        else
        {
            if (obj.over)
            {
                g.setColour(Colours.grey);
                path.loadFromData(settingsCogwheelData);
                g.fillPath(path, obj.area);
                g.setColour(0xE4060606);
                g.fillEllipse([3, 3, obj.area[2] - 6, obj.area[3] - 6]);
            }
            else
            {
                g.setColour(Colours.darkgrey);
                path.loadFromData(settingsCogwheelData);
                g.fillPath(path, obj.area);
                g.setColour(0xE4060606);
                g.fillEllipse([3, 3, obj.area[2] - 6, obj.area[3] - 6]);
            }
        }
                
    break;

    default:
    }
    
});

//Slider

const var ringData = [110,109,203,161,243,65,12,2,240,65,98,96,229,189,65,90,228,19,66,152,110,74,65,94,58,21,66,180,200,178,64,166,155,245,65,98,6,129,197,191,162,69,192,65,33,176,242,191,121,233,76,65,154,153,153,64,215,163,180,64,98,158,239,55,65,74,12,194,191,168,198,
	181,65,6,129,245,191,229,208,238,65,207,247,151,64,98,152,238,19,66,240,167,54,65,16,88,21,66,221,36,181,65,184,30,245,65,164,112,238,65,98,0,0,245,65,104,145,238,65,72,225,244,65,33,176,238,65,156,196,244,65,217,206,238,65,108,180,200,233,65,227,165,
	185,65,98,92,143,252,65,250,126,146,65,109,231,244,65,236,81,68,65,215,163,211,65,172,28,6,65,98,104,145,170,65,125,63,101,64,242,210,83,65,119,190,119,64,33,176,6,65,176,114,16,65,98,63,53,102,64,170,241,98,65,201,118,118,64,209,34,178,65,143,194,15,
	65,68,139,216,65,98,102,102,80,65,156,196,246,65,209,34,151,65,156,196,251,65,201,118,188,65,139,108,232,65,108,203,161,243,65,12,2,240,65,99,101,0,0];

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
        g.setColour(0xff111118);
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
        //g.fillEllipse([obj.area[2] * obj.valueNormalized, 0, 8, 8]);
        if (obj.valueNormalized > .95)
            g.fillEllipse([(obj.area[2] * .90), 0, 8, 8]);
        else
            g.fillEllipse([(obj.area[2] * .95) * obj.valueNormalized, 0, 8, 8]);
        break;
        
        case "LAFSliderOracleSampleOffset":
        g.setColour(Colours.grey);
        g.drawRoundedRectangle(obj.area, 2.0, 1.0);
        g.setColour(Colours.lightblue);
        g.drawLine(obj.area[2] * obj.valueNormalized, obj.area[2] * obj.valueNormalized, 0, obj.area[3], 1.0);
        g.setColour(0x14595959);
        g.fillRoundedRectangle([obj.area[2] * obj.valueNormalized, 0, obj.area[2], obj.area[3]], 4.0);
        break;
        
        case "LAFSliderMovementX":
        g.setColour(0xFB111111);
        g.fillRoundedRectangle(obj.area, 4.0);
        g.setColour(Colours.darkgrey);
        g.drawRoundedRectangle(obj.area, 4.0, .75);
        g.setColour(Colours.lightgrey);
        g.drawRoundedRectangle([Math.range(obj.area[2] * obj.valueNormalized, 2, 192), obj.area[3] / 2 - 2, 6, 4], 1.0, 1.0);
        break;
        
        case "LAFSliderMovementY":
        g.setColour(0xFB111111);
        g.fillRoundedRectangle(obj.area, 4.0);
        g.setColour(Colours.darkgrey);
        g.drawRoundedRectangle(obj.area, 4.0, .75);
        g.setColour(Colours.lightgrey);
        g.drawRoundedRectangle([obj.area[2] / 2 - 2, Math.range(obj.area[3] - obj.area[3] * obj.valueNormalized, 2, 142), 4, 6], 1.0, 1.0);
        break;
    }
});

laf.registerFunction("drawPopupMenuBackground", function(g, obj)
{
    g.setColour(0xFF222222);
    g.fillRoundedRectangle([0, 0, obj.width, obj.height], 4.0);
    
    g.setColour(Colours.lightgrey);
    g.drawRoundedRectangle([0, 0, obj.width, obj.height], 4.0, 1);
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
    g.fillRoundedRectangle([obj.area[2] - 10, obj.area[1], 10, 10], 2.0);
    g.setColour(Colours.white);
    g.drawRoundedRectangle([obj.area[2] - 10, obj.area[1], 10, 10], 2.0, .5);
    g.setFont("Arial", 8.0);
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
