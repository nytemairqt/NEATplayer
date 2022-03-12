//Preset Browser

const var FloatingTile_PresetBrowser = Content.getComponent("FloatingTile_PresetBrowser");
const var Button_OpenPresetBrowser = Content.getComponent("Button_OpenPresetBrowser");
const var Button_PresetBrowserClose = Content.getComponent("Button_PresetBrowserClose");

FloatingTile_PresetBrowser.showControl(0);

//Open

inline function onButton_OpenPresetBrowserControl(component, value)
{
    if (value)
        closePanels(Button_OpenPresetBrowser);

    FloatingTile_PresetBrowser.showControl(value);
    Button_PresetBrowserClose.showControl(value);
};

Content.getComponent("Button_OpenPresetBrowser").setControlCallback(onButton_OpenPresetBrowserControl);                                                                                                    

//Close

inline function onButton_PresetBrowserCloseControl(component, value)
{

    if (value)
        closePanels("none");        
};

Content.getComponent("Button_PresetBrowserClose").setControlCallback(onButton_PresetBrowserCloseControl);