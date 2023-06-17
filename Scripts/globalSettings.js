namespace GlobalSettings
{
	const globalSettingsJSON = FileSystem.getFolder(FileSystem.AppData).getChildFile("NEATPlayerSettings.json");

	reg globalSettings = {"ExclusiveReverse" : 0,
						  "DynamicPurge" : 1};

	inline function save()
	{	/* saves a persistent state without depending on Presets */		

		globalSettings.ExclusiveReverse = Math.round(Button_ExclusiveReverse.getValue());
		globalSettings.DynamicPurge = Math.round(Button_DynamicPurge.getValue());
		if (globalSettingsJSON.isFile())
			globalSettingsJSON.deleteFileOrDirectory();
		globalSettingsJSON.writeObject(globalSettings);
	}

	inline function load()
	{
		if (globalSettingsJSON.isFile())
		{
			// Make sure to not call .changed() here, as it will overwrite the JSON file.
			// Instead, call the functions manually.

			globalSettings = globalSettingsJSON.loadAsObject();

			Button_DynamicPurge.setValue(globalSettings.DynamicPurge);
			dynamicPurge(globalSettings.DynamicPurge);

			Button_ExclusiveReverse.setValue(globalSettings.ExclusiveReverse);
		}
		else // ensures DynamicPurge is on for updaters
		{
			Button_DynamicPurge.setValue(globalSettings.DynamicPurge);
			dynamicPurge(globalSettings.DynamicPurge);

			Button_ExclusiveReverse.setValue(globalSettings.ExclusiveReverse);

			save(); // only called if file is missing
		}
	}

	//Declarations

	const var Panel_CustomSettings = Content.getComponent("Panel_CustomSettings");
	const var Button_CustomSettings = Content.getComponent("Button_CustomSettings");
	const var Button_OpenAppData = Content.getComponent("Button_OpenAppData");
	const var Panel_TooltipDescriptions = Content.getComponent("Panel_TooltipDescriptions");
	const var Button_CloseCustomSettings = Content.getComponent("Button_CloseCustomSettings");
	const var Button_OpenShop = Content.getComponent("Button_OpenShop");

	//Custom Settings

	//Open Shop

	inline function onButton_OpenShopControl(component, value)
	{
	    if(value)
	        Engine.openWebsite("https://www.iamlamprey.com");
	};

	Content.getComponent("Button_OpenShop").setControlCallback(onButton_OpenShopControl);
	Button_OpenShop.set("tooltip", "Opens a browser window to the Shop.");

	//Open AppData Button

	inline function onButton_OpenAppDataControl(component, value)
	{
		if (value)
		    FileSystem.getFolder(FileSystem.AppData).show();
	};

	Content.getComponent("Button_OpenAppData").setControlCallback(onButton_OpenAppDataControl);

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

	inline function onButton_ExclusiveReverseControl(component, value)
	{
		save();
	};

	Content.getComponent("Button_ExclusiveReverse").setControlCallback(onButton_ExclusiveReverseControl);

	const var Button_ExclusiveReverse = Content.getComponent("Button_ExclusiveReverse");

	// Dynamic Purge

	const var Button_DynamicPurge = Content.getComponent("Button_DynamicPurge");

	inline function onButton_DynamicPurgeControl(component, value)
	{
		dynamicPurge(value);
		save();
	};

	Content.getComponent("Button_DynamicPurge").setControlCallback(onButton_DynamicPurgeControl);

	inline function dynamicPurge(value)
	{
		local samplers = [SamplerA, SamplerB, SamplerC];
		if (value)
			for (s in samplers)
				s.setAttribute(s.Purged, 2);
		else
			for (s in samplers)
				s.setAttribute(s.Purged, 0);
	}

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

		switch (SYSTEM_STATUS)
		{
			case 0:
				break;

			case 1:
				tooltipDescription = "Checking for updates...";
				break;

			case 2:
				tooltipDescription = "Downloading latest version.";
				break;

			case 3:
				tooltipDescription = "Updating " + libraryHandler.libraryCurrentlyUpdating;
				break;

			case 4:
				tooltipDescription = "Restoring from backup...";
				break;
		}

		g.setColour(Colours.lightgrey);
		g.setFont("Arial", 12.0);
		g.drawAlignedText(tooltipDescription, [0, 0, this.getWidth(), this.getHeight()], "right");
	});

	Panel_TooltipDescriptions.setTimerCallback(function()
	{
		 this.repaint();
	});

	Panel_TooltipDescriptions.startTimer(180);

	//Standalone Version MIDI Device Control

	const var ComboBox_MIDIDevices = Content.getComponent("ComboBox_MIDIDevices");
	const var Label_MIDIDevicesTitle = Content.getComponent("Label_MIDIDevicesTitle");

	var midiDevices;

	if (!Engine.isPlugin() && !Engine.isHISE())
	{
		ComboBox_MIDIDevices.showControl(true);
		Label_MIDIDevicesTitle.showControl(true);

		midiDevices = Settings.getMidiInputDevices();

		ComboBox_MIDIDevices.set("items", "");
		ComboBox_MIDIDevices.addItem("None");

		for (m in midiDevices)
			ComboBox_MIDIDevices.addItem(m);
	}
	else
	{
		ComboBox_MIDIDevices.showControl(false);
		Label_MIDIDevicesTitle.showControl(false);
	}

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

}

GlobalSettings.load();