//Crawls the web page and finds the "Latest Version", if the value is higher than "Current Version", notifies the user.


namespace updateButton
{
	const JSON_URL = "https://dl.dropbox.com/s/";
	const fileVersionJSON = FileSystem.getFolder(FileSystem.Downloads).getChildFile("NEATPlayerVersion.json");

	var JSONVersionData;

	const systemStats = Engine.getSystemStats();

	inline function downloadVersionJSON()
	{
		Server.setBaseURL(JSON_URL);

		// Safety Check
		if (fileVersionJSON.isFile())
			fileVersionJSON.deleteFileOrDirectory();

		if (!Server.isOnline())
		{
			Engine.showMessageBox("No Internet Connection.", "Unable to connect to server.", 0);
			return;
		}
		else
		{
			Server.cleanFinishedDownloads();
			Server.downloadFile("7uht39ywsmg9h11/NEATPlayerVersion.json", {}, fileVersionJSON, function()
			{
				if(this.data.finished)
				{
					JSONVersionData = fileVersionJSON.loadAsObject();
					readVersionJSON();
				}
			});
		}
	}

	inline function readVersionJSON()
	{

		if (currentVersion < JSONVersionData.version)
		{
			Engine.showYesNoWindow("Update Available.", "There is a new NEAT Player version available, would you like to download?", function(response)
			{
				if (!response)
					return;
				else
				{							
					if (systemStats.OperatingSystemName.contains("Windows"))
						downloadLatestNEATPlayerVersion(0);
					else if (systemStats.OperatingSystemName.contains("Mac"))
						downloadLatestNEATPlayerVersion(1);
					else if (systemStats.OperatingSystemName.contains("Linux"))
						downloadLatestNEATPlayerVersion(2);
				}
			});
		}
	}

	inline function downloadLatestNEATPlayerVersion(OS)
	{	
		local newVersion;
		if (OS == 1) // Mac OS
		{
			Server.setBaseURL("https://dl.dropbox.com/s/");
			newVersion = FileSystem.getFolder(FileSystem.Downloads).getChildFile(JSONVersionData.macOSFileName);
			if (newVersion.isFile())
				newVersion.deleteFileOrDirectory(); 
			Server.downloadFile(JSONVersionData.macOSURL, {}, newVersion, function()
			{
				if(this.data.finished)
				{
					Engine.showYesNoWindow("Download Complete.", "The latest NEAT Player Version has been downloaded, open Downloads folder?", function(response)
					{
						if (!response)
							return;
						else
							FileSystem.getFolder(FileSystem.Downloads).getChildFile(JSONVersionData.macOSFileName).show();
					});
					fileVersionJSON.deleteFileOrDirectory(); // Delete JSON File
					Server.cleanFinishedDownloads();
				}
			});
		}
		else // Windows & Linux
		{
			Server.setBaseURL("https://dl.dropbox.com/s/");
			newVersion = FileSystem.getFolder(FileSystem.Downloads).getChildFile(JSONVersionData.windowsFileName);
			if (newVersion.isFile())
				newVersion.deleteFileOrDirectory();
			Server.downloadFile(JSONVersionData.windowsURL, {}, newVersion, function(newVersion)
			{
				if(this.data.finished)
				{
					Engine.showYesNoWindow("Download Complete.", "The latest NEAT Player Version has been downloaded, open Downloads folder?", function(response)
					{
						if (!response)
							return;
						else
							FileSystem.getFolder(FileSystem.Downloads).getChildFile(JSONVersionData.windowsFileName).show();
					});
					fileVersionJSON.deleteFileOrDirectory(); // Delete JSON File
					Server.cleanFinishedDownloads();
				}
			});			
		}
	}
}

const var Button_UpdateAvailable = Content.getComponent("Button_UpdateAvailable");

const var Label_CurrentVersion = Content.getComponent("Label_CurrentVersion");

const var currentVersion = 0.14;
var latestVersion;

var responseArray;
var responseAsString;

/*
	1. manual update button
	2. download JSON from server
	3. read JSON
	4. compare current version with JSON latest version
	5. if < latest version, download latest NP file from Dropbox 
	6. once complete notify user 
	7. delete JSON file
	8 also need to pull patch notes file
*/

//old Shopify code
/*

Server.callWithGET("/pages/neat-player", "", function(status, response)
{		
	responseArray = response.split(" ");
	
	responseAsString = responseArray.indexOf("Version:");
	
	latestVersion = responseArray[responseAsString + 1];
	
	latestVersion = latestVersion.replace(latestVersion.substring(4, 6), "");
	
	latestVersion = Math.range(latestVersion, 0.00, 9.99);
	
	if (currentVersion < latestVersion)
		Button_UpdateAvailable.set("visible", true);
	else
		Button_UpdateAvailable.set("visible", false);
	
	
	//Button_UpdateAvailable.set("visible", true); //TESTING ONLY
});
*/
Button_UpdateAvailable.set("visible", true);

var systemStats;

inline function onButton_UpdateAvailableControl(component, value)
{
	if (value)
	{
		updateButton.downloadVersionJSON();
		//Engine.openWebsite("https://www.iamlamprey.com/pages/neat-player");
		//Engine.openWebsite("https://iamlamprey.com/l/neatplayer");
		systemStats = Engine.getSystemStats();

		Panel_PatchNotes.set("visible", false);
	}
};

Content.getComponent("Button_UpdateAvailable").setControlCallback(onButton_UpdateAvailableControl);

Label_CurrentVersion.set("text", "Current Version: v" + currentVersion);

//Patch Notes Mouseover Panel

const var Panel_PatchNotes = Content.getComponent("Panel_PatchNotes");

//Patch Notes Main Panel 

var patchNotes = "";

Server.callWithGET("/p/neat-player-changelog", "", function(status, response)
{		
	//test this...
	patchNotes = response.substring(response.indexOf("main-page-title page-title h0"), response.indexOf("PREVIOUS VERSIONS"));

	patchNotes = patchNotes.replace("<li>", "");
	patchNotes = patchNotes.replace("</li>", "");
	patchNotes = patchNotes.replace("</ul>", "");
	patchNotes = patchNotes.replace("<ul>", "");
	patchNotes = patchNotes.replace("<p>", "");
	patchNotes = patchNotes.replace(patchNotes.substring(0, 90), "");	
	patchNotes = patchNotes.replace("<br>", "");
	
});

Panel_PatchNotes.setPaintRoutine(function(g)
{
	g.setColour(0xFB111111);
	g.fillRoundedRectangle(this.getLocalBounds(2), 2.0);
	g.setColour(Colours.white);
	g.setFont("Arial", 14.0);
	g.drawAlignedText("Changelog", [(this.getWidth() / 2) - 80, 10, 160, 20], "centred");
	g.drawMultiLineText(patchNotes, [20, 80], this.getWidth() - 40, "topLeft", 0.0);
});
