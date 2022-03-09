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
});

Panel_TooltipDescriptions.startTimer(180);