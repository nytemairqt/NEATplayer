namespace updateHandler
{
	const CURRENT_VERSION = 0.17;

	const BASE_URL = "https://dl.dropbox.com/s/";
	const fileVersionJSON = FileSystem.getFolder(FileSystem.AppData).getChildFile("NEATPlayerVersion.json");
	const filePatchNotesJSON = FileSystem.getFolder(FileSystem.AppData).getChildFile("NEATPlayerPatchNotes.json");

	const systemStats = Engine.getSystemStats();

	const Button_UpdateNEATPlayer = Content.getComponent("Button_UpdateNEATPlayer");
	const Button_DownloadLatestVersion = Content.getComponent("Button_DownloadLatestVersion");
	const Button_ClosePatchNotes = Content.getComponent("Button_ClosePatchNotes");	
	const Label_CurrentVersion = Content.getComponent("Label_CurrentVersion");

	Button_UpdateNEATPlayer.set("visible", true);
	Label_CurrentVersion.set("text", "Current Version: v" + CURRENT_VERSION);

	reg JSONVersionData;
	reg JSONPatchNotes;
	reg patchNotes = [];	

	inline function downloadVersionJSON()
	{
		updateSystemStatus(1);
		Server.setBaseURL(BASE_URL);

		// Safety Check
		if (fileVersionJSON.isFile())
			fileVersionJSON.deleteFileOrDirectory();

		if (!Server.isOnline())
		{
			Engine.showMessageBox("No Server Connection.", "Unable to connect to server.", 0);
			updateSystemStatus(0);
			return;
		}
		else
		{
			Server.cleanFinishedDownloads();
			Server.downloadFile("7uht39ywsmg9h11/NEATPlayerVersion.json", {}, fileVersionJSON, function()
			{
				if(this.data.finished)
				{
					updateSystemStatus(0);
					JSONVersionData = fileVersionJSON.loadAsObject();
					readVersionJSON();
				}
			});
		}
	}

	inline function readVersionJSON()
	{
		if (CURRENT_VERSION < JSONVersionData.version)
			downloadPatchNotesJSON();
		else
			fileVersionJSON.deleteFileOrDirectory();
	}

	inline function downloadLatestNEATPlayerVersion(OS)
	{	
		local newVersion;
		if (OS == 1) // Mac OS
		{
			updateSystemStatus(2);
			Server.setBaseURL("https://dl.dropbox.com/s/");
			newVersion = FileSystem.getFolder(FileSystem.Downloads).getChildFile(JSONVersionData.macOSFileName);
			if (newVersion.isFile())
				newVersion.deleteFileOrDirectory(); 
			Server.downloadFile(JSONVersionData.macOSURL, {}, newVersion, function()
			{
				if(this.data.finished)
				{
					updateSystemStatus(0);
					Engine.showYesNoWindow("Download Complete.", "NEAT Player v" + JSONVersionData.version + " has been downloaded, open Downloads folder?", function(response)
					{
						if (!response)
						{
							Panel_PatchNotes.set("visible", false);
							return;
						}
						else
						{
							Panel_PatchNotes.set("visible", false);
							FileSystem.getFolder(FileSystem.Downloads).getChildFile(JSONVersionData.macOSFileName).show();
						}
					});
					fileVersionJSON.deleteFileOrDirectory(); // Delete JSON Files
					filePatchNotesJSON.deleteFileOrDirectory();
					Server.cleanFinishedDownloads();
				}
			});
		}
		else // Windows & Linux
		{
			updateSystemStatus(2);
			Server.setBaseURL("https://dl.dropbox.com/s/");
			newVersion = FileSystem.getFolder(FileSystem.Downloads).getChildFile(JSONVersionData.windowsFileName);
			if (newVersion.isFile())
				newVersion.deleteFileOrDirectory();
			Server.downloadFile(JSONVersionData.windowsURL, {}, newVersion, function(newVersion)
			{
				if(this.data.finished)
				{
					updateSystemStatus(0);
					Engine.showYesNoWindow("Download Complete.", "NEAT Player v" + JSONVersionData.version + " has been downloaded, open Downloads folder?", function(response)
					{
						if (!response)
						{
							Panel_PatchNotes.set("visible", false);
							return;
						}
						else
						{
							Panel_PatchNotes.set("visible", false);
							FileSystem.getFolder(FileSystem.Downloads).getChildFile(JSONVersionData.windowsFileName).show();
						}
					});
					fileVersionJSON.deleteFileOrDirectory(); // Delete JSON Files
					filePatchNotesJSON.deleteFileOrDirectory();
					Server.cleanFinishedDownloads();
				}
			});			
		}
	}

	inline function downloadPatchNotesJSON()
	{
		Server.setBaseURL(BASE_URL);

		// Safety Check
		if (filePatchNotesJSON.isFile())
			filePatchNotesJSON.deleteFileOrDirectory();

		if (!Server.isOnline())
		{
			Engine.showMessageBox("No Internet Connection.", "Unable to connect to server.", 0);
			return;
		}
		else
		{
			Server.cleanFinishedDownloads();
			Server.downloadFile("sydwkiboq5t54f7/NEATPlayerPatchNotes.json", {}, filePatchNotesJSON, function()
			{
				if(this.data.finished)
				{
					patchNotes.clear(); //Fresh Array
					JSONPatchNotes = filePatchNotesJSON.loadAsObject();

					for (n in JSONPatchNotes)
						patchNotes.push(JSONPatchNotes[n]);					

					Panel_PatchNotes.repaint();
					Panel_PatchNotes.set("visible", true);	

					if (filePatchNotesJSON.isFile())
						filePatchNotesJSON.deleteFileOrDirectory();				
				}
			});
		}
	}


	inline function onButton_DownloadLatestVersionControl(component, value)
	{
		if (value)
		{
			if (SYSTEM_STATUS != 0) // safety check
				return;
			if (systemStats.OperatingSystemName.contains("Windows"))
				downloadLatestNEATPlayerVersion(0);
			else if (systemStats.OperatingSystemName.contains("Mac"))
				downloadLatestNEATPlayerVersion(1);
			else if (systemStats.OperatingSystemName.contains("Linux"))
				downloadLatestNEATPlayerVersion(2);
		}
		
	};

	Content.getComponent("Button_DownloadLatestVersion").setControlCallback(onButton_DownloadLatestVersionControl);

	// Button Functionality

	inline function onButton_ClosePatchNotesControl(component, value)
	{
		if (value)
		{
			Panel_PatchNotes.set("visible", false);

			if (fileVersionJSON.isFile())
				fileVersionJSON.deleteFileOrDirectory();
			if (filePatchNotesJSON.isFile())
						filePatchNotesJSON.deleteFileOrDirectory();				
		}
	};

	Content.getComponent("Button_ClosePatchNotes").setControlCallback(onButton_ClosePatchNotesControl);

	inline function onButton_UpdateNEATPlayerControl(component, value)
	{
		if (value)
			downloadVersionJSON();
	};

	Content.getComponent("Button_UpdateNEATPlayer").setControlCallback(onButton_UpdateNEATPlayerControl);


	//Patch Notes Panel

	const var Panel_PatchNotes = Content.getComponent("Panel_PatchNotes");

	Panel_PatchNotes.setPaintRoutine(function(g)
	{
		g.setColour(0xFB111111);		
		g.fillRoundedRectangle(this.getLocalBounds(2), 2.0);
		g.setColour(Colours.white);
		g.setFont("Arial", 14.0);
		if (isDefined(JSONVersionData))
			g.drawAlignedText("Update v" + JSONVersionData.version, [(this.getWidth() / 2) - 80, 10, 160, 20], "centred");
		else
			g.drawAlignedText("Update", [(this.getWidth() / 2) - 80, 10, 160, 20], "centred");

		for (i=0; i<patchNotes.length; i++)
			g.drawAlignedText(patchNotes[i], [20, 40 + (20 * i), this.getWidth() - 50, 20], "left");

	});

	
}








