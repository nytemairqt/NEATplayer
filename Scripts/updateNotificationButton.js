//Crawls the web page and finds the "Latest Version", if the value is higher than "Current Version", notifies the user.

Server.setBaseURL("https://www.iamlamprey.com");

const var Button_UpdateAvailable = Content.getComponent("Button_UpdateAvailable");

const var Label_CurrentVersion = Content.getComponent("Label_CurrentVersion");

const var currentVersion = 0.14;
var latestVersion;

var responseArray;
var responseAsString;

// switch to Gumroad
// update on existing store page for now to futureproof

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


inline function onButton_UpdateAvailableControl(component, value)
{
	if (value)
	{
		//Engine.openWebsite("https://www.iamlamprey.com/pages/neat-player");
		Engine.openWebsite("https://iamlamprey.com/l/neatplayer");
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
