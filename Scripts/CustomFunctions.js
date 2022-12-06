//GUI

inline function controlUpdate()
{
    Button_WidthEnable.changed();
    Button_StutterLFOPreFX.changed();
}

inline function disableRoundRobin()
{
    SamplerA.asSampler().enableRoundRobin(false);
    SamplerB.asSampler().enableRoundRobin(false);
    SamplerC.asSampler().enableRoundRobin(false);
}

function clearEverything()
{

    Image_BG.setAlpha(0);
    Panel_ResizeGUI.setValue(1.0);
    Panel_ResizeGUI.changed();

    expHandler.setCurrentExpansion("No Expansion");
    SamplerA.asSampler().clearSampleMap();
    SamplerB.asSampler().clearSampleMap();
    SamplerB.asSampler().clearSampleMap();
    
    samplerLoopPitch(0.0);
    
    randomRESET();
    
    clearGUI();
}



//Custom Keyboard Colours

const var keysWhite = [0, 2, 4, 5, 7, 9, 11];
const var keysBlack = [1, 3, 6, 8, 10];

var playableWhiteKeys = [];
var playableBlackKeys = [];

var voidWhiteKeys = [];
var voidBlackKeys = [];

var playableWhiteKeysAethericAmbiance = [];
var playableBlackKeysAethericAmbiance = [];

var playableWhiteKeysYellow = [];
var playableBlackKeysYellow = [];

var playableWhiteKeysBlue = [];
var playableBlackKeysBlue = [];

var achromicFXKeysWhite = [108, 110, 112, 113, 115, 117];
var achromicFXKeysBlack = [109, 111, 114, 116];

//Restores

inline function restoreKeysDefault(e)
{
    for (i=0; i < 135; i++)
    {
        Engine.setKeyColour(i, Colours.withAlpha(Colours.black, 0.0));
    }
    /*
    if (playableWhiteKeys.contains(e))
        Engine.setKeyColour(e, 0xCCBEF5F9);
    
    else if (playableBlackKeys.contains(e))
        Engine.setKeyColour(e, 0xCC33787D);
    */
}

/*
inline function restoreKeysAethericAmbience(e)
{
    if (playableWhiteKeysAethericAmbiance.contains(e))
        Engine.setKeyColour(e, 0xFFCC96FF);
    
    else if (playableBlackKeysAethericAmbiance.contains(e))
        Engine.setKeyColour(e, 0xFF4C2C6B);
}*/

inline function restoreKeysBlue(e)
{
    if (playableWhiteKeysBlue.contains(e))
        Engine.setKeyColour(e, 0xFF658FFE);
    
    else if (playableBlackKeysBlue.contains(e))
        Engine.setKeyColour(e, 0xFF1B357B);
}

inline function restoreKeysYellow(e)
{
    if (playableWhiteKeysYellow.contains(e))
        Engine.setKeyColour(e, 0xFFF9FE65);
    
    else if (playableBlackKeysYellow.contains(e))
        Engine.setKeyColour(e, 0xFF7B781B); 
}

inline function restoreKeysAchromic(e)
{
    if (achromicFXKeysWhite.contains(e))
        Engine.setKeyColour(e, 0xFF7DFF53);
    
    else if (achromicFXKeysBlack.contains(e))
        Engine.setKeyColour(e, 0xFF3A8422);
        
    else if (e == 36)
        Engine.setKeyColour(e, 0xFFDB6AFF);
        
    else if (e == 38)
        Engine.setKeyColour(e, 0xFFF2FF42);
}

//Reset

inline function colourKeysReset()
{    
    for (i=0; i<130; i++)
        Engine.setKeyColour(i, Colours.withAlpha(Colours.black, 0.0));
}

inline function colourPitchKeys()
{
    for (i=24; i<49; i++)
        Engine.setKeyColour(i, Colours.withAlpha(Colours.lime, .5));
}

inline function colourKeysVoid()
{
    voidWhiteKeys.clear();
    voidBlackKeys.clear();
    
    //Adding all keys to void
    for (i=0; i<10; i++)
    {
        local octave = 12;
        for (k=0; k<keysWhite.length; k++)
        {
            local key = 0 + keysWhite[k] + (octave * i);
            Engine.setKeyColour(key, 0xFFFFFFFF);
            voidWhiteKeys.push(key);  
        }

        for (k=0; k<keysBlack.length; k++)
        {
            local key = 0 + keysBlack[k] + (octave * i);
            Engine.setKeyColour(key, 0xFF1F1F1F);          
            voidBlackKeys.push(key);
        }
    }; 
}

//Blackout Pitch

inline function colourKeysBlackoutPitch()
{
    Engine.setKeyColour(24, 0xFF63FF74);
    Engine.setKeyColour(25, 0xFF216B29);
    Engine.setKeyColour(26, 0xFF63FF74);
    Engine.setKeyColour(27, 0xFF216B29);
    Engine.setKeyColour(28, 0xFF63FF74);
    Engine.setKeyColour(29, 0xFF63FF74);
    Engine.setKeyColour(30, 0xFF216B29);
    Engine.setKeyColour(31, 0xFF63FF74);
    Engine.setKeyColour(32, 0xFF216B29);
    Engine.setKeyColour(33, 0xFF63FF74);
    Engine.setKeyColour(34, 0xFF216B29);
    Engine.setKeyColour(35, 0xFF63FF74);
    Engine.setKeyColour(36, 0xFF63FF74);
    Engine.setKeyColour(37, 0xFF216B29);
    Engine.setKeyColour(38, 0xFF63FF74);
    Engine.setKeyColour(39, 0xFF216B29);
    Engine.setKeyColour(40, 0xFF63FF74);
    Engine.setKeyColour(41, 0xFF63FF74);
    Engine.setKeyColour(42, 0xFF216B29);
    Engine.setKeyColour(43, 0xFF63FF74);
    Engine.setKeyColour(43, 0xFF63FF74);
    Engine.setKeyColour(44, 0xFF216B29);
    Engine.setKeyColour(45, 0xFF63FF74);
    Engine.setKeyColour(46, 0xFF216B29);
    Engine.setKeyColour(47, 0xFF63FF74);
    Engine.setKeyColour(48, 0xFF63FF74);
    
    for (i = 24; i<49; i++)
    {
        voidWhiteKeys.remove(i);
        voidBlackKeys.remove(i);
    }
}

//Blackout

inline function colourKeysBlackout()
{ 
    playableWhiteKeys.clear(); 
    playableBlackKeys.clear();
    colourKeysVoid(); 
    
    //removing all the playable keys and adding them to playableKeys
    for (i=0; i<3; i++)
    {
        local octave = 12;
        for (k=0; k<keysWhite.length; k++)
        {
            local key = 60 + keysWhite[k] + (octave * i);
            Engine.setKeyColour(key, 0xCCBEF5F9);
            playableWhiteKeys.push(key);
            voidWhiteKeys.remove(key); 
        }

        for (k=0; k<keysBlack.length; k++)
        {
            local key = 60 + keysBlack[k] + (octave * i);
            Engine.setKeyColour(key, 0xCC33787D);          
            playableBlackKeys.push(key);
            voidBlackKeys.remove(key); 
        }
    };  
}

//Blackout 2

inline function colourKeysBlackout2()
{
    playableWhiteKeys.clear(); 
    playableBlackKeys.clear();   
    colourKeysVoid();
    
    for (i=0; i<2; i++)
    {
        local octave = 12;
        for (k=0; k<keysWhite.length; k++)
        {
            local key = 60 + keysWhite[k] + (octave * i);
            Engine.setKeyColour(key, 0xCCBEF5F9);
            playableWhiteKeys.push(key);
            voidWhiteKeys.remove(key);
        }

        for (k=0; k<keysBlack.length; k++)
        {
            local key = 60 + keysBlack[k] + (octave * i);
            Engine.setKeyColour(key, 0xCC33787D);          
            playableBlackKeys.push(key);
            voidBlackKeys.remove(key);
        }
    };
        Engine.setKeyColour(84, 0xCCBEF5F9);
        playableWhiteKeys.push(84);    
        voidWhiteKeys.remove(84);
        
        Engine.setKeyColour(85, 0xCC33787D);
        playableBlackKeys.push(85);
        voidBlackKeys.remove(85);
        
        Engine.setKeyColour(86, 0xCCBEF5F9);
        playableWhiteKeys.push(86);
        voidWhiteKeys.remove(86);
        
        Engine.setKeyColour(87, 0xCC33787D);
        playableBlackKeys.push(87);
        voidBlackKeys.remove(87);
        
        Engine.setKeyColour(88, 0xCCBEF5F9);
        playableWhiteKeys.push(88);
        voidWhiteKeys.remove(88);
        
        Engine.setKeyColour(89, 0xCCBEF5F9);
        playableWhiteKeys.push(89);
        voidWhiteKeys.remove(89);
        
        Engine.setKeyColour(90, 0xCC33787D);
        playableBlackKeys.push(90);
        voidBlackKeys.remove(90);
        
        Engine.setKeyColour(91, 0xCCBEF5F9); 
        playableWhiteKeys.push(91);
        voidWhiteKeys.remove(91);
    
}

//Portal

inline function colourKeysPortal()
{
    playableWhiteKeysBlue.clear();
    playableBlackKeysBlue.clear();
    playableWhiteKeysYellow.clear();
    playableBlackKeysYellow.clear();   
    colourKeysVoid();
    
    for (i=0; i<1; i++)
    {
        local octave = 12;  
        for (k=0; k<keysWhite.length; k++)
        {
            local key = 60 + keysWhite[k] + (octave * i);
            Engine.setKeyColour(key, 0xFF658FFE);
            playableWhiteKeysBlue.push(key);
            voidWhiteKeys.remove(key);
        }

        for (k=0; k<keysBlack.length; k++)
        {
            local key = 60 + keysBlack[k] + (octave * i);
            Engine.setKeyColour(key, 0xFF1B357B);          
            playableBlackKeysBlue.push(key);
            voidBlackKeys.remove(key);
        }   
    }
    
    Engine.setKeyColour(72, 0xFF658FFE);  
    playableWhiteKeysBlue.push(72);
    voidWhiteKeys.remove(72);
    
    Engine.setKeyColour(73, 0xFF1B357B); 
    playableBlackKeysBlue.push(73);
    voidBlackKeys.remove(73);
    
    Engine.setKeyColour(74, 0xFF658FFE);    
    playableWhiteKeysBlue.push(74);
    voidWhiteKeys.remove(74);
    
    Engine.setKeyColour(75, 0xFF1B357B);    
    playableBlackKeysBlue.push(75);
    voidBlackKeys.remove(75);
    
    
    for (i=0; i<1; i++)
    {
        local octave = 12;  
        for (k=0; k<keysWhite.length; k++)
        {
            local key = 84 + keysWhite[k] + (octave * i);
            Engine.setKeyColour(key, 0xFFF9FE65);
            playableWhiteKeysYellow.push(key);
            voidWhiteKeys.remove(key);
        }

        for (k=0; k<keysBlack.length; k++)
        {
            local key = 84 + keysBlack[k] + (octave * i);
            Engine.setKeyColour(key, 0xFF7B781B);          
            playableBlackKeysYellow.push(key);
            voidBlackKeys.remove(key);
        }   
    }    
    
    Engine.setKeyColour(96, 0xFFF9FE65);  
    playableWhiteKeysYellow.push(96);
    voidWhiteKeys.remove(96);
    
    Engine.setKeyColour(97, 0xFF7B781B); 
    playableBlackKeysYellow.push(97);
    voidBlackKeys.remove(97);
    
    Engine.setKeyColour(98, 0xFFF9FE65);    
    playableWhiteKeysYellow.push(98);
    voidWhiteKeys.remove(98);
    
    Engine.setKeyColour(99, 0xFF7B781B);    
    playableBlackKeysYellow.push(99);
    voidBlackKeys.remove(99);
}

//Machine Tribes

inline function colourKeysMachineTribes()
{
    playableWhiteKeysBlue.clear();
    playableBlackKeysBlue.clear();
    playableWhiteKeysYellow.clear();
    playableBlackKeysYellow.clear();
    colourKeysVoid();
    
    for (i=0; i<3; i++)
    {
        local octave = 12;  
        for (k=0; k<keysWhite.length; k++)
        {
            local key = 48 + keysWhite[k] + (octave * i);
            Engine.setKeyColour(key, 0xFF658FFE);
            playableWhiteKeysBlue.push(key);
            voidWhiteKeys.remove(key);
        }

        for (k=0; k<keysBlack.length; k++)
        {
            local key = 48 + keysBlack[k] + (octave * i);
            Engine.setKeyColour(key, 0xFF1B357B);          
            playableBlackKeysBlue.push(key);
            voidBlackKeys.remove(key);
        }   
    }
    
    for (i=0; i<3; i++)
    {
        local octave = 12;  
        for (k=0; k<keysWhite.length; k++)
        {
            local key = 84 + keysWhite[k] + (octave * i);
            Engine.setKeyColour(key, 0xFFF9FE65);
            playableWhiteKeysYellow.push(key);
            voidWhiteKeys.remove(key);
        }

        for (k=0; k<keysBlack.length; k++)
        {
            local key = 84 + keysBlack[k] + (octave * i);
            Engine.setKeyColour(key, 0xFF7B781B);          
            playableBlackKeysYellow.push(key);
            voidBlackKeys.remove(key);
        }   
        Engine.setKeyColour(120, 0xFFFFFFFF);
    } 
}

//Bloom

inline function colourKeysBloom()
{
    playableWhiteKeys.clear(); 
    playableBlackKeys.clear();    
    colourKeysVoid();
    
    for (i=0; i<5; i++)
    {
        local octave = 12;
        for (k=0; k<keysWhite.length; k++)
        {
            local key = 36 + keysWhite[k] + (octave * i);
            Engine.setKeyColour(key, 0xCCBEF5F9);
            playableWhiteKeys.push(key);
            voidWhiteKeys.remove(key);
        }

        for (k=0; k<keysBlack.length; k++)
        {
            local key = 36 + keysBlack[k] + (octave * i);
            Engine.setKeyColour(key, 0xCC33787D);          
            playableBlackKeys.push(key);
            voidBlackKeys.remove(key);
        }      
        
        Engine.setKeyColour(96, 0xCCBEF5F9);
        playableWhiteKeys.push(96);
        voidWhiteKeys.remove(96);
    };  
}

//Cloudburst

inline function colourKeysCloudburst()
{   
    playableWhiteKeys.clear(); 
    playableBlackKeys.clear();   
    colourKeysVoid();
    
    for (i=0; i<3; i++)
    {
        local octave = 12;
        for (k=0; k<keysWhite.length; k++)
        {
            local key = 60 + keysWhite[k] + (octave * i);
            Engine.setKeyColour(key, 0xCCBEF5F9);
            playableWhiteKeys.push(key);
            voidWhiteKeys.remove(key);
        }

        for (k=0; k<keysBlack.length; k++)
        {
            local key = 60 + keysBlack[k] + (octave * i);
            Engine.setKeyColour(key, 0xCC33787D);          
            playableBlackKeys.push(key);
            voidBlackKeys.remove(key);
        }     
        
        Engine.setKeyColour(96, 0xCCBEF5F9);
        playableWhiteKeys.push(96);
        voidWhiteKeys.remove(96);
    };
}

//Atlas

inline function colourKeysAtlas()
{
    playableWhiteKeys.clear(); 
    playableBlackKeys.clear(); 
    colourKeysVoid();
    
    for (i=0; i<4; i++)
    {
        local octave = 12;
        for (k=0; k<keysWhite.length; k++)
        {
            local key = 36 + keysWhite[k] + (octave * i);
            Engine.setKeyColour(key, 0xCCBEF5F9);
            playableWhiteKeys.push(key);
            voidWhiteKeys.remove(key);
        }

        for (k=0; k<keysBlack.length; k++)
        {
            local key = 36 + keysBlack[k] + (octave * i);
            Engine.setKeyColour(key, 0xCC33787D);          
            playableBlackKeys.push(key);
            voidBlackKeys.remove(key);
        }             
        
        Engine.setKeyColour(84, 0xCCBEF5F9);
        playableWhiteKeys.push(84);
        voidWhiteKeys.remove(84);
    };
}    

//Prismatic

inline function colourKeysPrismatic()
{
    playableWhiteKeys.clear(); 
    playableBlackKeys.clear(); 
    colourKeysVoid();
    
    for (i=0; i<5; i++)
    {
        local octave = 12;
        for (k=0; k<keysWhite.length; k++)
        {
            local key = 36 + keysWhite[k] + (octave * i);
            Engine.setKeyColour(key, 0xCCBEF5F9);
            playableWhiteKeys.push(key);
            voidWhiteKeys.remove(key);
        }

        for (k=0; k<keysBlack.length; k++)
        {
            local key = 36 + keysBlack[k] + (octave * i);
            Engine.setKeyColour(key, 0xCC33787D);          
            playableBlackKeys.push(key);
            voidBlackKeys.remove(key);
        }             
        
        Engine.setKeyColour(96, 0xCCBEF5F9);
        playableWhiteKeys.push(96);
        voidWhiteKeys.remove(96);
    };
}    

inline function colourKeysFoundKeys()
{
    playableWhiteKeys.clear(); 
    playableBlackKeys.clear();    
    colourKeysVoid();
    
    for (i=0; i<4; i++)
    {
        local octave = 12;
        for (k=0; k<keysWhite.length; k++)
        {
            local key = 36 + keysWhite[k] + (octave * i);
            Engine.setKeyColour(key, 0xCCBEF5F9);
            playableWhiteKeys.push(key);
            voidWhiteKeys.remove(key);
        }

        for (k=0; k<keysBlack.length; k++)
        {
            local key = 36 + keysBlack[k] + (octave * i);
            Engine.setKeyColour(key, 0xCC33787D);          
            playableBlackKeys.push(key);
            voidBlackKeys.remove(key);
        }          
        
        Engine.setKeyColour(84, 0xCCBEF5F9);
        playableWhiteKeys.push(84);
        voidWhiteKeys.remove(84);
    };
}    


inline function colourKeysEndure()
{
    playableWhiteKeys.clear(); 
    playableBlackKeys.clear();     
    colourKeysVoid();
    
    for (i=0; i<4; i++)
    {
        local octave = 12;
        for (k=0; k<keysWhite.length; k++)
        {
            local key = 24 + keysWhite[k] + (octave * i);
            Engine.setKeyColour(key, 0xCCBEF5F9);
            playableWhiteKeys.push(key);
            voidWhiteKeys.remove(key);
        }

        for (k=0; k<keysBlack.length; k++)
        {
            local key = 24 + keysBlack[k] + (octave * i);
            Engine.setKeyColour(key, 0xCC33787D);          
            playableBlackKeys.push(key);
            voidBlackKeys.remove(key);
        }          
        
        Engine.setKeyColour(72, 0xCCBEF5F9);
        playableWhiteKeys.push(72);
        voidWhiteKeys.remove(72);
    };
}    
    
inline function colourKeysOracle()
{
    playableWhiteKeys.clear(); 
    playableBlackKeys.clear();    
    colourKeysVoid();
    
    for (i=0; i<3; i++)
    {
        local octave = 12;
        for (k=0; k<keysWhite.length; k++)
        {
            local key = 48 + keysWhite[k] + (octave * i);
            Engine.setKeyColour(key, 0xCCBEF5F9);
            playableWhiteKeys.push(key);
            voidWhiteKeys.remove(key);
        }

        for (k=0; k<keysBlack.length; k++)
        {
            local key = 48 + keysBlack[k] + (octave * i);
            Engine.setKeyColour(key, 0xCC33787D);          
            playableBlackKeys.push(key);
            voidBlackKeys.remove(key);
        }    
        Engine.setKeyColour(84, 0xCCBEF5F9);
        playableWhiteKeys.push(84);
        voidWhiteKeys.remove(84);
        
        Engine.setKeyColour(85, 0xCC33787D);
        playableBlackKeys.push(85);
        voidBlackKeys.remove(85);
    };    
}

inline function colourKeysAetheric()
{
    playableWhiteKeys.clear(); 
    playableBlackKeys.clear();     
    colourKeysVoid();
    
    for (i=0; i<3; i++)
    {
        local octave = 12;
        for (k=0; k<keysWhite.length; k++)
        {
            local key = 60 + keysWhite[k] + (octave * i);
            Engine.setKeyColour(key, 0xCCBEF5F9);
            playableWhiteKeys.push(key);
            voidWhiteKeys.remove(key);
            
        }

        for (k=0; k<keysBlack.length; k++)
        {
            local key = 60 + keysBlack[k] + (octave * i);
            Engine.setKeyColour(key, 0xCC33787D);          
            playableBlackKeys.push(key);
            voidBlackKeys.remove(key);
        }    
    };
    Engine.setKeyColour(96, 0xCCBEF5F9);          
    playableWhiteKeys.push(96);      
    
    Engine.setKeyColour(48, 0xFFCC96FF);
    playableWhiteKeysAethericAmbiance.push(48);
    Engine.setKeyColour(49, 0xFF4C2C6B);
    playableBlackKeysAethericAmbiance.push(49);
    Engine.setKeyColour(50, 0xFFCC96FF);
    playableWhiteKeysAethericAmbiance.push(50);
    Engine.setKeyColour(51, 0xFF4C2C6B); 
    playableBlackKeysAethericAmbiance.push(51);
    Engine.setKeyColour(52, 0xFFCC96FF);   
    playableWhiteKeysAethericAmbiance.push(52);
    Engine.setKeyColour(53, 0xFFCC96FF);      
    playableWhiteKeysAethericAmbiance.push(53);
    Engine.setKeyColour(54, 0xFF4C2C6B);  
    playableBlackKeysAethericAmbiance.push(54);
}    

inline function colourKeysAchromic()
{
    playableWhiteKeys.clear(); 
    playableBlackKeys.clear();     
    colourKeysVoid();
    
    for (i=0; i<4; i++)
    {
        local octave = 12;
        for (k=0; k<keysWhite.length; k++)
        {
            local key = 48 + keysWhite[k] + (octave * i);
            Engine.setKeyColour(key, 0xCCBEF5F9);
            playableWhiteKeys.push(key);
            voidWhiteKeys.remove(key);
        }

        for (k=0; k<keysBlack.length; k++)
        {
            local key = 48 + keysBlack[k] + (octave * i);
            Engine.setKeyColour(key, 0xCC33787D);          
            playableBlackKeys.push(key);
            voidBlackKeys.remove(key);
        }    
    };
    
    local extraKeysWhite = [41, 43, 45, 47, 96, 98];
    local extraKeysBlack = [42, 44, 46, 97];

    
    for (e in extraKeysWhite)
    {
        Engine.setKeyColour(e, 0xCCBEF5F9);
        playableWhiteKeys.push(e);
        voidWhiteKeys.remove(e);
    }
    
    for (e in extraKeysBlack)
    {
        Engine.setKeyColour(e, 0xCC33787D);
        playableBlackKeys.push(e);
        voidBlackKeys.remove(e);
    }
    
    for (a in achromicFXKeysWhite)
    {
        Engine.setKeyColour(a, 0xFF7DFF53);
        voidWhiteKeys.remove(a);
    }
    
    for (a in achromicFXKeysBlack)
    {
        Engine.setKeyColour(a, 0xFF3A8422);
        voidBlackKeys.remove(a);
    }
    
    Engine.setKeyColour(36, 0xFFDB6AFF);
    Engine.setKeyColour(38, 0xFFF2FF42);
    voidWhiteKeys.remove(36);
    voidWhiteKeys.remove(38);
}    

inline function colourKeysPDQBass()
{
    playableWhiteKeys.clear(); 
    playableBlackKeys.clear();     
    colourKeysVoid();
    
    for (i=0; i<3; i++)
    {
        local octave = 12;
        for (k=0; k<keysWhite.length; k++)
        {
            local key = 48 + keysWhite[k] + (octave * i);
            Engine.setKeyColour(key, 0xCCBEF5F9);
            playableWhiteKeys.push(key);
            voidWhiteKeys.remove(key);
        }

        for (k=0; k<keysBlack.length; k++)
        {
            local key = 48 + keysBlack[k] + (octave * i);
            Engine.setKeyColour(key, 0xCC33787D);          
            playableBlackKeys.push(key);
            voidBlackKeys.remove(key);
        }    
    };
    
    local extraKeysWhite = [47, 45, 43, 41, 84];
    local extraKeysBlack = [42, 44, 46, 85];

    
    for (e in extraKeysWhite)
    {
        Engine.setKeyColour(e, 0xCCBEF5F9);
        playableWhiteKeys.push(e);
        voidWhiteKeys.remove(e);
    }
    
    for (e in extraKeysBlack)
    {
        Engine.setKeyColour(e, 0xCC33787D);
        playableBlackKeys.push(e);
        voidBlackKeys.remove(e);
    }
    
    Engine.setKeyColour(36, 0xFFDB6AFF);
    voidWhiteKeys.remove(36);
}    

inline function colourKeysOracle2()
{
    playableWhiteKeys.clear(); 
    playableBlackKeys.clear();    
    colourKeysVoid();
    
    for (i=0; i<10; i++)
    {
        local octave = 12;
        for (k=0; k<keysWhite.length; k++)
        {
            local key = 0 + keysWhite[k] + (octave * i);
            Engine.setKeyColour(key, 0xCCBEF5F9);
            playableWhiteKeys.push(key);
            voidWhiteKeys.remove(key);
        }

        for (k=0; k<keysBlack.length; k++)
        {
            local key = 0 + keysBlack[k] + (octave * i);
            Engine.setKeyColour(key, 0xCC33787D);          
            playableBlackKeys.push(key);
            voidBlackKeys.remove(key);
        }    
        Engine.setKeyColour(84, 0xCCBEF5F9);
        playableWhiteKeys.push(84);
        voidWhiteKeys.remove(84);
        
        Engine.setKeyColour(85, 0xCC33787D);
        playableBlackKeys.push(85);
        voidBlackKeys.remove(85);
    };    
}

inline function colourKeysGloom()
{
    playableWhiteKeys.clear(); 
    playableBlackKeys.clear();    
    colourKeysVoid();
    
    for (i=0; i<7; i++)
    {
        local octave = 12;
        for (k=0; k<keysWhite.length; k++)
        {
            local key = 24 + keysWhite[k] + (octave * i);
            Engine.setKeyColour(key, 0xCCBEF5F9);
            playableWhiteKeys.push(key);
            voidWhiteKeys.remove(key);
        }

        for (k=0; k<keysBlack.length; k++)
        {
            local key = 24 + keysBlack[k] + (octave * i);
            Engine.setKeyColour(key, 0xCC33787D);          
            playableBlackKeys.push(key);
            voidBlackKeys.remove(key);
        }    
        
        Engine.setKeyColour(108, 0xCCBEF5F9);
        playableWhiteKeys.push(108);
        voidWhiteKeys.remove(108);
    };    
}