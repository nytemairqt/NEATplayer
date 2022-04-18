//Declarations

const var Panel_CustomSettings = Content.getComponent("Panel_CustomSettings");
const var Button_CustomSettings = Content.getComponent("Button_CustomSettings");
const var Button_OpenAppData = Content.getComponent("Button_OpenAppData");
const var Panel_TooltipDescriptions = Content.getComponent("Panel_TooltipDescriptions");

//Custom Settings

//Open Panel

inline function onButton_CustomSettingsControl(component, value)
{
	if (value)
		closePanels(Button_CustomSettings);

	Panel_CustomSettings.showControl(value);
};

Content.getComponent("Button_CustomSettings").setControlCallback(onButton_CustomSettingsControl);

//Close Panel

inline function onButton_CloseCustomSettingsControl(component, value)
{
	if (value)
		closePanels("none");
};

Content.getComponent("Button_CloseCustomSettings").setControlCallback(onButton_CloseCustomSettingsControl);

//Exclusive Reverse

const var Button_ExclusiveReverse = Content.getComponent("Button_ExclusiveReverse");

inline function onButton_ExclusiveReverseControl(component, value)
{
	//Engine.setAllowDuplicateSamples(1-value);
};

Content.getComponent("Button_ExclusiveReverse").setControlCallback(onButton_ExclusiveReverseControl);

//Portamento

reg lastNote = -1;
reg retrigger = -1;
reg eventId;
reg lastTuning = 0;

const var Button_PortamentoBypass = Content.getComponent("Button_PortamentoBypass");
const var Slider_PortamentoTime = Content.getComponent("Slider_PortamentoTime");
const var Label_PortamentoTimeValue = Content.getComponent("Label_PortamentoTimeValue");

inline function onSlider_PortamentoTimeControl(component, value)
{
	Label_PortamentoTimeValue.set("text", value + "ms");
};

Content.getComponent("Slider_PortamentoTime").setControlCallback(onSlider_PortamentoTimeControl);

//MIDI Devices

const var ComboBox_MIDIDevices = Content.getComponent("ComboBox_MIDIDevices");
const var Label_MIDIDevicesTitle = Content.getComponent("Label_MIDIDevicesTitle");



ComboBox_MIDIDevices.showControl(false);
Label_MIDIDevicesTitle.showControl(false);

//Uncomment the following for Standalone versions.
/*

const var midiDevices = Settings.getMidiInputDevices();

ComboBox_MIDIDevices.set("items", "");

ComboBox_MIDIDevices.addItem("None");

for (m in midiDevices)
	ComboBox_MIDIDevices.addItem(m);

inline function onComboBox_MIDIDevicesControl(component, value)
{
	local newValue = Math.round(value);
	for (m in midiDevices)
	{
		Settings.toggleMidiInput(m, false);		
	}

	if (newValue > 1)
	{
		Settings.toggleMidiInput(midiDevices[newValue - 2], true);
		Console.print(Settings.isMidiInputEnabled(midiDevices[newValue - 2]));
	}	
};

Content.getComponent("ComboBox_MIDIDevices").setControlCallback(onComboBox_MIDIDevicesControl);
*/

//Open AppData Button

inline function onButton_OpenAppDataControl(component, value)
{
	if (value)
	    FileSystem.getFolder(FileSystem.AppData).show();
};

Content.getComponent("Button_OpenAppData").setControlCallback(onButton_OpenAppDataControl);

//Tooltips

Panel_TooltipDescriptions.setPaintRoutine(function(g)
{
	var tooltipDescription = Content.getCurrentTooltip();
	
	g.setColour(Colours.lightgrey);
	g.setFont("Arial", 12.0);
	g.drawAlignedText(tooltipDescription, [0, 0, this.getWidth(), this.getHeight()], "right");
});

Panel_TooltipDescriptions.setTimerCallback(function()
{
	 this.repaint();

	 //Hides the Loading Bar if it gets stuck

	 if (currentlyLoading == false)
	 {
	 	loadingBar.data.colour = 0x00000000;
	 	loadingBar.repaint();
 	 }
});

Panel_TooltipDescriptions.startTimer(180);