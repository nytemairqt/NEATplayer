/* Miscellaneous functions that don't necessarily belong to any namespaces */

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
    InterfaceExtra.Panel_ResizeGUI.setValue(1.0);
    InterfaceExtra.Panel_ResizeGUI.changed();

    expHandler.setCurrentExpansion("No Expansion");
    SamplerA.asSampler().clearSampleMap();
    SamplerB.asSampler().clearSampleMap();
    SamplerB.asSampler().clearSampleMap();
    
    samplerLoopPitch(0.0);
    
    Randomize.randomRESET();
    
    clearGUI();
}

//Restore Keyboard Colours

inline function restoreKeysDefault(e)
{
    for (i=0; i < 135; i++)
    {
        Engine.setKeyColour(i, Colours.withAlpha(Colours.black, 0.0));
    }
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